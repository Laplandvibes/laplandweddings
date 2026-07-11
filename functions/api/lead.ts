/**
 * Cloudflare Pages Function: POST /api/lead
 *
 * Receives a multipart/form-data wedding-enquiry from the LeadForm component,
 * validates payload + attachments, and emails the result via Resend to
 * info@laplandvibes.com (the LaplandVibes ecosystem-wide inbox).
 *
 * Optional confirmation email is sent back to the couple if their email is provided.
 *
 * Env vars (set in Cloudflare Pages → Settings → Environment Variables):
 *   RESEND_API_KEY   — Resend API key (laplandvibe Pro account)
 *   LEAD_FROM        — verified Resend sender, e.g. "noreply@laplandvibes.com"
 *                      (must be on a domain you have verified DKIM/SPF for)
 *   LEAD_TO          — defaults to "info@laplandvibes.com"
 *
 * Limits:
 *   - Max 5 attachments
 *   - Max 5 MB per image, 25 MB per video
 *   - Max 40 MB total payload (Resend hard limit)
 */

interface Env {
  RESEND_API_KEY?: string;
  LEAD_FROM?: string;
  LEAD_TO?: string;
  /** From-address for the ~1h qualification follow-up (replies land here). */
  QUAL_FROM?: string;
}

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'video/mp4',
  'video/quicktime',
  'video/webm',
];

const MAX_FILES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;       // 5 MB
const MAX_VIDEO_SIZE = 25 * 1024 * 1024;      // 25 MB
const MAX_TOTAL_SIZE = 38 * 1024 * 1024;      // ~38 MB (leave headroom under Resend's 40 MB)

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as number[]);
  }
  return btoa(binary);
}

function badRequest(message: string): Response {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ ok: false, error: 'Server not configured (RESEND_API_KEY missing)' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.startsWith('multipart/form-data')) {
    return badRequest('Expected multipart/form-data');
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch (err) {
    return badRequest('Invalid form data');
  }

  // Honeypot — if the hidden field is filled, drop silently as if successful.
  // Field renamed from "company" → "lp_hpot": autofill filled "company" on real
  // human submissions and we were silently dropping genuine enquiries. We do NOT
  // also check the old "company" name — cached old clients send an autofilled
  // "company" and must NOT be dropped; the rare bot on a stale page is acceptable.
  const honey = form.get('lp_hpot');
  if (honey) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const get = (key: string): string => String(form.get(key) || '').trim();

  const yourName = get('yourName');
  const email = get('email');

  if (!yourName) return badRequest('Name is required');
  if (!email) return badRequest('Email is required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest('Email is invalid');

  const partnerName = get('partnerName');
  const phone = get('phone');
  const country = get('country');
  const guests = get('guests');
  const preferredDate = get('preferredDate');
  const flexibility = get('flexibility');
  const weddingType = get('weddingType');
  const location = get('location');
  const venue = get('venue');
  const ceremonyType = get('ceremonyType');
  const accommodation = get('accommodation');
  const budget = get('budget');
  const message = get('message');
  const langPref = get('lang') || 'en';

  // Collect attachments. CF Pages Functions FormData entries are string | (File-like).
  // We duck-type the File-like by checking for required properties.
  type FileLike = {
    name?: string;
    size: number;
    type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
  };
  const isFileLike = (v: unknown): v is FileLike =>
    !!v && typeof v === 'object' && 'arrayBuffer' in v && 'size' in v && 'type' in v &&
    typeof (v as FileLike).size === 'number' && (v as FileLike).size > 0;

  const fileEntries: FileLike[] = (form.getAll('files') as unknown[]).filter(isFileLike);
  if (fileEntries.length > MAX_FILES) {
    return badRequest(`Too many attachments (max ${MAX_FILES})`);
  }

  let totalSize = 0;
  const attachments: Array<{ filename: string; content: string }> = [];

  for (const file of fileEntries) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return badRequest(`Unsupported file type: ${file.type}`);
    }
    const isVideo = file.type.startsWith('video/');
    const limit = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > limit) {
      return badRequest(`File "${file.name || 'unnamed'}" exceeds the ${isVideo ? '25 MB' : '5 MB'} limit`);
    }
    totalSize += file.size;
    if (totalSize > MAX_TOTAL_SIZE) {
      return badRequest('Combined attachments exceed 38 MB');
    }
    const buffer = await file.arrayBuffer();
    attachments.push({
      filename: file.name || `attachment-${attachments.length + 1}`,
      content: arrayBufferToBase64(buffer),
    });
  }

  const subject = `New lead — ${weddingType || 'open'} · ${location || 'open'} · ${budget || '?'}`;

  const html = renderLeadNotificationEmail({
    yourName, partnerName, email, phone, country,
    guests, preferredDate, flexibility,
    weddingType, location, venue, ceremonyType, accommodation, budget,
    langPref, message,
    attachmentCount: attachments.length,
    totalSizeMb: totalSize / 1024 / 1024,
  });

  const from = env.LEAD_FROM || 'LaplandWeddings <noreply@laplandvibes.com>';
  const to = env.LEAD_TO || 'info@laplandvibes.com';

  const resendBody = {
    from,
    to: [to],
    reply_to: email,
    subject,
    html,
    attachments: attachments.length ? attachments : undefined,
  };

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resendBody),
  });

  if (!resendRes.ok) {
    const text = await resendRes.text();
    return new Response(JSON.stringify({ ok: false, error: 'Email gateway failed', detail: text }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send confirmation to the couple (best-effort — don't fail the request if this fails)
  const firstName = yourName ? yourName.trim().split(/\s+/)[0] : '';
  const greetingFi = firstName ? `Hei ${escapeHtml(firstName)}` : 'Kiitos';
  const greetingEn = firstName ? `Hello ${escapeHtml(firstName)}` : 'Thank you';

  const confirmSubject = langPref === 'fi'
    ? 'Saimme tiedustelusi — LaplandWeddings'
    : 'We received your enquiry — LaplandWeddings';

  const confirmHtml = renderConfirmEmail({ lang: langPref, greeting: langPref === 'fi' ? greetingFi : greetingEn });

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: to,
      subject: confirmSubject,
      html: confirmHtml,
    }),
  }).catch(() => {/* ignore — main email already sent */});

  // Qualification follow-up (Vesa 2026-07-10): ~1 hour after submission the
  // couple gets a short, personalised set of easy questions built from their
  // own answers. A reply = a genuinely warm lead we can forward to partners;
  // silence filters out the cold ones. Sent via Resend scheduled_at (server-
  // side schedule — fires even when nothing of ours is running). From-address
  // is info@ so replies land straight in the monitored inbox.
  try {
    const qual = buildQualificationEmail({
      lang: langPref, firstName, yourName, partnerName, country,
      weddingType, location, venue, ceremonyType, accommodation, budget,
      guests, preferredDate, flexibility, message,
    });
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.QUAL_FROM || 'Vesa | LaplandWeddings <info@laplandvibes.com>',
        to: [email],
        subject: qual.subject,
        html: qual.html,
        text: qual.text,
        scheduled_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      }),
    });
  } catch { /* best-effort — lead notification + confirmation already delivered */ }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// ---------------------------------------------------------------------------
// Qualification follow-up email (scheduled ~1h after submission)
// ---------------------------------------------------------------------------

/** Form slugs → human labels for the two languages the mail ships in. */
const TYPE_LABELS: Record<string, [string, string]> = {
  // slug: [en, fi]
  'elopement': ['an elopement for the two of you', 'kahdenkeskinen vihkiminen'],
  'northern-lights': ['a Northern Lights ceremony', 'revontulivihkiminen'],
  'snow-chapel': ['a snow chapel ceremony', 'lumikappelivihkiminen'],
  'glass-igloo': ['a glass igloo wedding', 'lasi-igluhäät'],
  'midnight-sun': ['a Midnight Sun wedding', 'yöttömän yön häät'],
  'vow-renewal': ['a vow renewal', 'valojen uusiminen'],
};
const REGION_LABELS: Record<string, [string, string]> = {
  'rovaniemi': ['Rovaniemi', 'Rovaniemi'],
  'levi': ['Levi & Kittilä', 'Levi ja Kittilä'],
  'yllas': ['Ylläs', 'Ylläs'],
  'saariselka': ['Saariselkä & Inari', 'Saariselkä ja Inari'],
  'ruka': ['Ruka & Kuusamo', 'Ruka ja Kuusamo'],
  'pyha-luosto': ['Pyhä-Luosto', 'Pyhä-Luosto'],
  'kilpisjarvi': ['Kilpisjärvi', 'Kilpisjärvi'],
};
const BUDGET_LABELS: Record<string, string> = {
  'budget1': 'alle 5 000 € / under €5,000',
  'budget2': '5 000–15 000 €',
  'budget3': '15 000–30 000 €',
  'budget4': '30 000–60 000 €',
};

export function buildQualificationEmail(f: {
  lang: string; firstName: string; yourName: string; partnerName: string;
  country: string; weddingType: string; location: string; venue: string;
  ceremonyType: string; accommodation: string; budget: string;
  guests: string; preferredDate: string; flexibility: string; message: string;
}): { subject: string; html: string; text: string } {
  const isFi = f.lang === 'fi';
  const li = (en: string, fi: string) => (isFi ? fi : en);
  const rd = (m: Record<string, [string, string]>, k: string): string => (m[k] ? m[k][isFi ? 1 : 0] : (k || '').trim());
  const typeLabel = rd(TYPE_LABELS, f.weddingType);
  const regionLabel = rd(REGION_LABELS, f.location);
  const budgetLabel = BUDGET_LABELS[f.budget] || '';
  const hasRegion = !!(regionLabel || f.venue);
  const hasGuests = !!f.guests.trim() && !/^0+$/.test(f.guests.trim());
  const legalPlanned = /legal|virallinen|laillinen/i.test(f.ceremonyType);
  const accomIncluded = /include/i.test(f.accommodation);
  const accomSeparate = /separate|booking/i.test(f.accommodation);

  // Original-request recap (EN/FI). The answers used to arrive detached from the
  // form data (guests, date, budget, region), so forwarding a lead lost half the
  // picture. We now carry a readable recap inside the follow-up (visible box +
  // reply template) → one reply = a complete, forward-ready lead.
  const budgetReadable: Record<string, [string, string]> = {
    budget1: ['under €5,000', 'alle 5 000 €'],
    budget2: ['€5,000–15,000', '5 000–15 000 €'],
    budget3: ['€15,000–30,000', '15 000–30 000 €'],
    budget4: ['€30,000–60,000', '30 000–60 000 €'],
    budget5: ['over €60,000', 'yli 60 000 €'],
  };
  const flexReadable: Record<string, [string, string]> = {
    flexFixed: ['fixed date', 'kiinteä päivä'],
    flexWeek: ['±1 week', '±1 viikko'],
    flexMonth: ['±1 month', '±1 kuukausi'],
    flexAny: ['flexible — whenever auroras appear', 'joustava — kun revontulet näkyvät'],
  };
  const ceremonyReadable: Record<string, [string, string]> = {
    legal: ['legally binding in Finland', 'virallinen Suomessa'],
    symbolic: ['symbolic / blessing', 'symbolinen / siunaus'],
    unsure: ['still undecided', 'vielä auki'],
  };
  const coupleName = f.partnerName ? `${f.yourName} & ${f.partnerName}` : f.yourName;
  const whereVal = [regionLabel, f.venue].filter(Boolean).join(' · ');
  const dateVal = f.preferredDate
    ? `${f.preferredDate}${flexReadable[f.flexibility] ? ` (${flexReadable[f.flexibility][isFi ? 1 : 0]})` : ''}`
    : rd(flexReadable, f.flexibility);
  const recap: Array<[string, string]> = [];
  if (coupleName) recap.push([li('Couple', 'Pari'), coupleName]);
  if (f.country) recap.push([li('From', 'Kotimaa'), f.country]);
  if (typeLabel) recap.push([li('Wedding', 'Häät'), typeLabel]);
  if (whereVal) recap.push([li('Where', 'Missä'), whereVal]);
  if (hasGuests) recap.push([li('Guests', 'Vieraita'), f.guests]);
  if (dateVal) recap.push([li('Date', 'Ajankohta'), dateVal]);
  const budgetVal = rd(budgetReadable, f.budget);
  if (budgetVal) recap.push([li('Budget', 'Budjetti'), budgetVal]);
  const ceremonyVal = ceremonyReadable[f.ceremonyType]?.[isFi ? 1 : 0] || '';
  if (ceremonyVal) recap.push([li('Ceremony', 'Vihkiminen'), ceremonyVal]);

  // Each question carries a short label used in the pre-filled reply template
  // (mailto body) so answering is fill-in-the-blanks easy.
  const questions: Array<{ full: string; short: string }> = [];

  // 1) What should the day include — always (the core qualifier).
  questions.push({
    full: li(
      'Besides the ceremony itself, what would you like the day to include — a photographer, a dinner, huskies or reindeer, an aurora evening, a sauna?',
      'Mitä toivoisitte päivän sisältävän vihkimisen lisäksi — valokuvaaja, illallinen, huskyt tai porot, revontuli-ilta, sauna?',
    ),
    short: li('The day should include', 'Päivään toivomme'),
  });

  // 2) Guest count — critical for planners (a budget is meaningless without it:
  //    an elopement vs 36 guests at the same € is a different wedding). Only
  //    asked when the form didn't already capture it.
  if (!hasGuests) {
    questions.push({
      full: li(
        'How many of you will there be — just the two of you, or with guests (roughly how many)?',
        'Kuinka monta teitä on — pelkästään te kaksi, vai vieraita mukana (suunnilleen kuinka monta)?',
      ),
      short: li('Guests (just us / about how many)', 'Vieraita (vain me / suunnilleen montako)'),
    });
  }

  // 3) Budget scope — phrased from what they told us.
  if (budgetLabel && accomIncluded) {
    questions.push({
      full: li(
        `Your budget (${budgetLabel}) — is that for the wedding day itself, or the whole trip including flights and stay for everyone?`,
        `Budjettinne (${budgetLabel}) — koskeeko se itse hääpäivää, vai koko matkaa lentoineen ja majoituksineen kaikille?`,
      ),
      short: li('Budget is for (the wedding day / the whole trip)', 'Budjetti koskee (hääpäivää / koko matkaa)'),
    });
  } else if (budgetLabel && accomSeparate) {
    questions.push({
      full: li(
        `Just to confirm: your budget (${budgetLabel}) is for the wedding itself, with travel and accommodation booked separately?`,
        `Varmistetaan vielä: budjettinne (${budgetLabel}) koskee itse häitä, ja matkat ja majoitus hoituvat erikseen?`,
      ),
      short: li('Budget is for the wedding only (yes / no)', 'Budjetti koskee vain häitä (kyllä / ei)'),
    });
  } else {
    questions.push({
      full: li(
        'Do you have a rough budget range in mind — and should it include flights and accommodation?',
        'Onko teillä suuntaa antavaa budjettihaarukkaa — ja sisältyisivätkö siihen lennot ja majoitus?',
      ),
      short: li('Rough budget (and does it include flights + stay)', 'Budjettihaarukka (ja sisältyvätkö lennot + majoitus)'),
    });
  }

  // 4) Region — only if they left it open.
  if (!hasRegion) {
    questions.push({
      full: li(
        'Is there a part of Lapland you are drawn to — Rovaniemi, Levi, Saariselkä, or somewhere quieter?',
        'Vetääkö jokin Lapin kolkka puoleensa — Rovaniemi, Levi, Saariselkä vai jokin rauhallisempi paikka?',
      ),
      short: li('Preferred area', 'Toivottu alue'),
    });
  }

  // 5) Legal vs symbolic.
  questions.push(legalPlanned
    ? {
        full: li(
          'A legally binding ceremony in Finland needs a bit of DVV paperwork (we guide you through it) — is legally-binding-in-Finland definitely the plan, or would a symbolic ceremony here plus the legal part at home also work?',
          'Virallinen vihkiminen Suomessa vaatii hieman DVV-paperitöitä (autamme niissä) — onko virallinen vihkiminen Suomessa varma suunnitelma, vai kävisikö myös seremonia täällä ja viralliset paperit kotimaassa?',
        ),
        short: li('Ceremony (legal in Finland / symbolic)', 'Vihkiminen (virallinen Suomessa / seremonia)'),
      }
    : {
        full: li(
          'Would you like a legally binding ceremony in Finland (we guide you through the DVV paperwork), or a symbolic ceremony with the legal part done at home?',
          'Haluaisitteko virallisen vihkimisen Suomessa (autamme DVV-paperitöissä) vai seremonian, jossa viralliset paperit hoidetaan kotimaassa?',
        ),
        short: li('Ceremony (legal in Finland / symbolic)', 'Vihkiminen (virallinen Suomessa / seremonia)'),
      });

  // 6) Date firmness OR their story — whichever adds more.
  if (f.preferredDate) {
    questions.push({
      full: li(
        `How firm is your date (${f.preferredDate}) — and roughly how many days will you stay in Lapland?`,
        `Kuinka lukkoon lyöty ajankohtanne (${f.preferredDate}) on — ja suunnilleen kuinka monta päivää viivytte Lapissa?`,
      ),
      short: li('Date firmness + length of stay', 'Ajankohdan varmuus + matkan kesto'),
    });
  }
  if ((f.message || '').trim().length < 80 && questions.length < 5) {
    questions.push({
      full: li(
        'And tell us a little about you two — how do you picture the day feeling?',
        'Ja kertokaa hieman itsestänne — miltä unelmienne hääpäivä tuntuisi?',
      ),
      short: li('About you two / your vision', 'Teistä kahdesta / visionne'),
    });
  }

  const qs = questions.slice(0, 5);

  // Pre-filled reply template: one tap opens a compose window with numbered
  // blanks (mailto body). Short labels keep the URL well under client limits.
  const replySubject = li('Answers — our Lapland wedding', 'Vastaukset — Lapin-häämme');
  const replyTemplate = qs.map((q, i) => `${i + 1}. ${q.short}:\n`).join('\n');
  // The recap rides along at the bottom of the reply so a submitted answer email
  // is self-contained (original enquiry + answers) and forwards to a planner as-is.
  const recapPlain = recap.map(([k, v]) => `${k}: ${v}`).join('\n');
  const recapDivider = li(
    '— — — your enquiry (our planners see this — no need to edit) — — —',
    '— — — tiedustelunne (suunnittelijat näkevät tämän — ei tarvitse muokata) — — —',
  );
  const mailtoBody =
    replyTemplate + '\n' + li('Anything else on your mind:', 'Muuta mielessä:') + '\n\n' +
    recapDivider + '\n' + recapPlain + '\n';
  const mailtoHref =
    'mailto:info@laplandvibes.com' +
    `?subject=${encodeURIComponent(replySubject)}` +
    `&body=${encodeURIComponent(mailtoBody)}`;
  const answerCta = li('Answer the questions', 'Vastaa kysymyksiin');
  const answerHint = li(
    'The button opens a reply with the questions pre-filled — or simply hit reply and answer in your own words.',
    'Nappi avaa viestipohjan, jossa kysymykset ovat valmiina — tai vastaa yksinkertaisesti tähän viestiin omin sanoin.',
  );

  // Planning links — the network sites most useful while they wait.
  const planTitle = li('Helpful while you plan', 'Avuksi suunnitteluun');
  const planLinks: Array<[string, string, string]> = [
    ['https://laplandstays.com', li('Stays', 'Majoitus'), li('glass igloos, cabins & hotels for you and your guests', 'lasi-iglut, mökit ja hotellit teille ja vieraillenne')],
    ['https://laplandactivities.fi', li('Activities', 'Aktiviteetit'), li('huskies, reindeer, snowmobiles & aurora tours', 'huskyt, porot, moottorikelkat ja revontuliretket')],
    ['https://laplandtransport.com', li('Getting there', 'Matkustaminen'), li('flights, transfers & getting around Lapland', 'lennot, siirtymät ja liikkuminen Lapissa')],
  ];

  const greeting = f.firstName
    ? li(`Hi ${f.firstName},`, `Hei ${f.firstName},`)
    : li('Hi,', 'Hei,');

  const openerBits: string[] = [];
  if (typeLabel) openerBits.push(typeLabel);
  if (regionLabel) openerBits.push(li(`around ${regionLabel}`, `${regionLabel} -alueella`));
  else if (f.venue) openerBits.push(li(`at ${f.venue}`, `${f.venue} -paikassa`));
  const opener = openerBits.length
    ? li(
        `I read your enquiry — ${openerBits.join(', ')} sounds lovely, and we would be glad to help make it happen.`,
        `Luin tiedustelunne — ${openerBits.join(', ')} kuulostaa ihanalta, ja autamme mielellämme sen toteuttamisessa.`,
      )
    : li(
        'I read your enquiry, and we would be glad to help make your Lapland wedding happen.',
        'Luin tiedustelunne, ja autamme mielellämme Lapin-häidenne toteuttamisessa.',
      );

  const why = li(
    'To match you with the right planners (up to three, and only ones that genuinely fit), a few quick questions — short answers are perfectly fine:',
    'Jotta osaamme valita teille juuri oikeat suunnittelijat (enintään kolme, ja vain aidosti sopivia), muutama nopea kysymys — lyhyet vastaukset riittävät mainiosti:',
  );
  const outro = li(
    'Just hit reply — I read every answer personally. As soon as we hear back, we forward your wishes to the planners that fit, and they contact you directly with real proposals.',
    'Vastaa suoraan tähän viestiin — luen jokaisen vastauksen itse. Heti kun kuulemme teistä, välitämme toiveenne sopiville suunnittelijoille, ja he ottavat teihin suoraan yhteyttä konkreettisin ehdotuksin.',
  );
  // Expectation management (Vesa 2026-07-10): the service language is English
  // (+ Finnish) — say it out loud so no one expects planners to speak e.g. German.
  const langNote = li(
    'We work with you and our planners in English (and Finnish).',
    'Palvelemme teitä englanniksi ja suomeksi — myös suunnittelijamme toimivat näillä kielillä.',
  );
  const subject = li(
    'Your Lapland wedding — a few quick questions',
    'Lapin-häänne — muutama nopea kysymys',
  );

  const text =
`${greeting}

${opener}

${why}

${qs.map((q, i) => `${i + 1}. ${q.full}`).join('\n')}

${li('To make answering easy, copy this, fill in the blanks and hit reply:', 'Vastaaminen helpoksi: kopioi tämä, täytä kohdat ja paina vastaa:')}

${replyTemplate}
${recapDivider}
${recapPlain}

${outro}

${langNote}

${planTitle}:
${planLinks.map(([url, name, desc]) => `- ${name} — ${desc}: ${url}`).join('\n')}

${li('Warmly,', 'Lämpimin terveisin,')}
Vesa Pesola
LaplandWeddings — ${li('part of the LaplandVibes network', 'osa LaplandVibes-verkostoa')}
info@laplandvibes.com · laplandweddings.online`;

  const esc = escapeHtml;
  const html = `<!doctype html>
<html lang="${f.lang === 'fi' ? 'fi' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>LaplandWeddings</title></head>
<body style="margin:0;padding:0;background:#F6F8FB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#1F2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F6F8FB;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0">
        <tr><td style="background:#0F172A;padding:14px 28px">
          <span style="font-size:16px;font-weight:700;letter-spacing:0.05em"><span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#EC4899">WEDDINGS</span></span>
        </td></tr>
        <tr><td style="padding:26px 28px 8px;font-size:15px;line-height:1.65">
          <p style="margin:0 0 14px">${esc(greeting)}</p>
          <p style="margin:0 0 14px">${esc(opener)}</p>
          <p style="margin:0 0 6px">${esc(why)}</p>
          <ol style="margin:0 0 18px;padding-left:22px">
            ${qs.map((q) => `<li style="margin:0 0 10px">${esc(q.full)}</li>`).join('\n            ')}
          </ol>
          <!-- Ready-made answer sheet: one tap opens a pre-filled reply -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 8px"><tr>
            <td style="border-radius:10px;background:#EC4899">
              <a href="${mailtoHref}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:10px">${esc(answerCta)} →</a>
            </td>
          </tr></table>
          <p style="margin:0 0 20px;font-size:13px;color:#64748B">${esc(answerHint)}</p>

          <!-- Enquiry recap: rides along so a plain reply is a complete, forward-ready lead -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:4px 0 20px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px">
            <tr><td style="padding:12px 16px 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94A3B8">${esc(li('Your enquiry so far', 'Tiedustelunne tähän mennessä'))}</td></tr>
            <tr><td style="padding:0 16px 12px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${recap.map(([k, v]) => `<tr><td style="padding:3px 0;width:96px;font-size:12px;color:#94A3B8;vertical-align:top">${esc(k)}</td><td style="padding:3px 0;font-size:13px;color:#334155;vertical-align:top">${esc(v)}</td></tr>`).join('\n                ')}
              </table>
            </td></tr>
          </table>

          <p style="margin:0 0 10px">${esc(outro)}</p>
          <p style="margin:0 0 18px;font-size:13px;color:#64748B">${esc(langNote)}</p>

          <!-- Planning links: stays / activities / transport -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 22px;background:#F6F8FB;border:1px solid #E2E8F0;border-radius:10px">
            <tr><td style="padding:14px 18px 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B">${esc(planTitle)}</td></tr>
            ${planLinks.map(([url, name, desc]) => `<tr><td style="padding:4px 18px 10px;font-size:14px"><a href="${url}" style="color:#EC4899;font-weight:700;text-decoration:none">${esc(name)}</a> <span style="color:#475569">— ${esc(desc)}</span></td></tr>`).join('\n            ')}
          </table>

          <p style="margin:0 0 24px">${esc(li('Warmly,', 'Lämpimin terveisin,'))}<br>
            <strong>Vesa Pesola</strong><br>
            <span style="color:#64748B;font-size:13px">LaplandWeddings — ${esc(li('part of the LaplandVibes network', 'osa LaplandVibes-verkostoa'))}<br>
            info@laplandvibes.com · laplandweddings.online</span></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

interface LeadEmailData {
  yourName: string; partnerName: string; email: string; phone: string;
  country: string; guests: string; preferredDate: string; flexibility: string;
  weddingType: string; location: string; venue: string;
  ceremonyType: string; accommodation: string; budget: string;
  langPref: string; message: string;
  attachmentCount: number; totalSizeMb: number;
}

function renderLeadNotificationEmail(d: LeadEmailData): string {
  const budgetLabels: Record<string, { label: string; tier: number }> = {
    budget1: { label: 'Under €5 000', tier: 1 },
    budget2: { label: '€5 000 – €15 000', tier: 2 },
    budget3: { label: '€15 000 – €30 000', tier: 3 },
    budget4: { label: '€30 000 – €60 000', tier: 4 },
    budget5: { label: 'Over €60 000', tier: 5 },
  };
  const flexLabels: Record<string, string> = {
    flexFixed: 'Fixed date',
    flexWeek: '±1 week',
    flexMonth: '±1 month',
    flexAny: 'Whenever auroras come out',
  };
  const typeLabels: Record<string, string> = {
    'northern-lights': 'Northern Lights',
    'snow-chapel': 'Snow Chapel',
    'glass-igloo': 'Glass Igloo',
    'midnight-sun': 'Midnight Sun',
    'elopement': 'Elopement / 2-person',
    'vow-renewal': 'Vow Renewal',
  };
  const locationLabels: Record<string, string> = {
    'rovaniemi': 'Rovaniemi',
    'saariselka': 'Saariselkä & Inari',
    'levi': 'Levi & Kittilä',
    'yllas': 'Ylläs',
    'pyha-luosto': 'Pyhä-Luosto',
    'kilpisjarvi': 'Kilpisjärvi',
  };
  const ceremonyLabels: Record<string, string> = {
    legal: 'Legally binding in Finland — needs DVV paperwork',
    symbolic: 'Symbolic / blessing — no paperwork',
    unsure: 'Not sure yet — wants advice',
  };
  const accommodationLabels: Record<string, string> = {
    include: 'Include in budget',
    separate: 'Booking separately',
    unsure: 'Not sure',
  };

  const budgetInfo = budgetLabels[d.budget] || { label: d.budget || '—', tier: 0 };
  const tierColor = budgetInfo.tier >= 4 ? '#EC4899' : budgetInfo.tier >= 3 ? '#EC4899' : '#94A3B8';
  const tierBadge = budgetInfo.tier >= 4 ? 'PREMIUM' : budgetInfo.tier >= 3 ? 'MID-RANGE' : budgetInfo.tier >= 1 ? 'STANDARD' : '';

  const couple = d.partnerName ? `${escapeHtml(d.yourName)} &amp; ${escapeHtml(d.partnerName)}` : escapeHtml(d.yourName);
  const flex = flexLabels[d.flexibility] || '';
  const wt = typeLabels[d.weddingType] || (d.weddingType ? escapeHtml(d.weddingType) : '');
  const loc = locationLabels[d.location] || (d.location ? escapeHtml(d.location) : '');
  const ceremony = ceremonyLabels[d.ceremonyType] || '';
  const accom = accommodationLabels[d.accommodation] || '';

  // Render a row only when there is real content — empty fields are hidden, not shown as "—".
  const detailRow = (label: string, value: string) => value ? `
    <tr>
      <td style="padding:10px 0;width:140px;font-size:11px;letter-spacing:0.18em;color:#94A3B8;text-transform:uppercase;font-weight:600;vertical-align:top">${label}</td>
      <td style="padding:10px 0;font-size:15px;color:#0F172A;vertical-align:top;line-height:1.5">${value}</td>
    </tr>` : '';

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>New lead — LaplandWeddings</title></head>
<body style="margin:0;padding:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1F2937">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0F172A;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.4)">

        <!-- Hero band -->
        <tr><td style="background:linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#7C2D5E 100%);padding:28px 32px;color:#F8FAFC">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="vertical-align:middle">
                <p style="margin:0;font-size:11px;letter-spacing:0.3em;color:#EC4899;font-weight:700;text-transform:uppercase">New Lead</p>
                <p style="margin:6px 0 0;font-size:22px;font-weight:700;letter-spacing:0.04em">
                  <span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#EC4899">WEDDINGS</span>
                </p>
              </td>
              ${tierBadge ? `<td align="right" style="vertical-align:middle">
                <span style="display:inline-block;padding:6px 12px;background:${tierColor};color:#0F172A;font-size:10px;font-weight:800;letter-spacing:0.18em;border-radius:20px">${tierBadge}</span>
              </td>` : ''}
            </tr>
          </table>
        </td></tr>

        <!-- Couple summary -->
        <tr><td style="padding:28px 32px 0">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.2em;color:#EC4899;font-weight:700;text-transform:uppercase">Couple</p>
          <p style="margin:0 0 4px;font-size:24px;font-weight:700;color:#0F172A;letter-spacing:-0.01em">${couple}</p>
          <p style="margin:0;font-size:14px;color:#475569">
            ${d.country ? `📍 ${escapeHtml(d.country)} · ` : ''}
            <a href="mailto:${escapeHtml(d.email)}" style="color:#0F172A;text-decoration:underline">${escapeHtml(d.email)}</a>
            ${d.phone ? ` · 📞 <a href="tel:${escapeHtml(d.phone)}" style="color:#0F172A;text-decoration:none">${escapeHtml(d.phone)}</a>` : ''}
          </p>
        </td></tr>

        <!-- Quick CTA -->
        <tr><td style="padding:18px 32px 0">
          <a href="mailto:${escapeHtml(d.email)}?subject=Re%3A%20Your%20Lapland%20wedding%20enquiry" style="display:inline-block;padding:12px 22px;background:#EC4899;color:#FFFFFF;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:0.02em;box-shadow:0 4px 14px rgba(236,72,153,0.35)">→ Reply to ${escapeHtml(d.yourName.split(/\s+/)[0] || 'couple')}</a>
        </td></tr>

        <!-- Wedding details -->
        <tr><td style="padding:24px 32px 8px">
          <p style="margin:14px 0 0;font-size:11px;letter-spacing:0.25em;color:#EC4899;font-weight:700;text-transform:uppercase;border-top:1px solid #E2E8F0;padding-top:18px">Wedding details</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            ${detailRow('Type', wt)}
            ${detailRow('Ceremony', ceremony)}
            ${detailRow('Region', loc)}
            ${d.venue ? detailRow('Venue', `<strong>${escapeHtml(d.venue)}</strong>`) : ''}
            ${detailRow('Guests', d.guests ? escapeHtml(d.guests) : '')}
            ${detailRow('Preferred date', d.preferredDate ? `${escapeHtml(d.preferredDate)}${flex ? ` · <span style="color:#64748B">${flex}</span>` : ''}` : (flex ? `<span style="color:#64748B">${flex}</span>` : ''))}
            ${detailRow('Budget', `<span style="color:${tierColor};font-weight:700">${escapeHtml(budgetInfo.label)}</span>`)}
            ${detailRow('Accommodation', accom)}
            ${detailRow('Language', d.langPref === 'fi' ? 'Finnish 🇫🇮' : 'English 🇬🇧')}
            ${d.attachmentCount > 0 ? detailRow('Attachments', `📎 ${d.attachmentCount} file(s) · ${d.totalSizeMb.toFixed(1)} MB`) : ''}
          </table>
        </td></tr>

        ${d.message ? `<tr><td style="padding:8px 32px 24px">
          <p style="margin:14px 0 8px;font-size:11px;letter-spacing:0.25em;color:#EC4899;font-weight:700;text-transform:uppercase;border-top:1px solid #E2E8F0;padding-top:18px">Their message</p>
          <div style="padding:18px 20px;background:linear-gradient(135deg,#FCE7F3 0%,#FDF2F8 100%);border-left:3px solid #EC4899;border-radius:8px;font-size:15px;color:#1F2937;line-height:1.6;white-space:pre-wrap">${escapeHtml(d.message)}</div>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#0F172A;padding:18px 32px;text-align:center">
          <p style="margin:0;font-size:11px;color:#64748B;letter-spacing:0.05em">
            <a href="https://laplandweddings.online" style="color:#94A3B8;text-decoration:none">laplandweddings.online</a>
            &nbsp;·&nbsp; routed via Cloudflare Pages Function
            &nbsp;·&nbsp; reply-to is set to the couple
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function renderConfirmEmail({ lang, greeting }: { lang: string; greeting: string }): string {
  const isFi = lang === 'fi';
  const attr = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Hero image — own brand asset hosted on our domain (JPG for broadest
  // mail-client support; never hotlink third-party photography).
  const heroImage = 'https://laplandweddings.online/images/heroes/home-cover.jpg';
  const heroAlt = isFi
    ? 'Hääpari Lapin lumimaisemassa, revontulet horisontissa'
    : 'Wedding couple in a Lapland snowscape with the Northern Lights on the horizon';

  const eyebrow = isFi ? 'Vahvistus tiedustelusta' : 'Enquiry confirmed';
  const heroLine = isFi
    ? 'Tiimi on jo aloittanut työn toiveidenne parissa.'
    : 'Our team has already started working on your wishes.';

  const valueProps = isFi
    ? [
        ['Maksuton ja sitoumukseton', 'Et maksa meille mitään. Voit valita yhden suunnittelijan, kaikki tai et yhtäkään — vapaasti.'],
        ['1–3 räätälöityä tarjousta 7 päivässä', 'Et joudu kontaktoimaan suunnittelijoita yksi kerrallaan. Me hoidamme sen — säästät 8–12 tuntia tutkimisaikaa.'],
        ['Vain Lapin parhaita', 'Verkostossamme on vain vakiintuneita Suomi/UK-pohjaisia toimijoita, joilla on todistettu kokemus Lapin häistä.'],
      ]
    : [
        ['Free & no obligation', 'You pay us nothing. Pick one planner, all of them, or none — entirely your call.'],
        ['1–3 personalised proposals in 7 days', 'You will not be contacting planners one by one. We do the legwork — saving you 8–12 hours of research.'],
        ['Only Lapland’s best', 'Our network includes only established Finland/UK-based operators with a proven track record of Lapland weddings.'],
      ];

  const stepsTitle = isFi ? 'Mitä seuraavaksi' : 'What happens next';
  const steps = isFi
    ? [
        ['1', 'Ensin · sovitamme tiedustelunne', 'Käymme pyyntönne läpi ja valitsemme verkostostamme enintään kolme suunnittelijaa, joiden tyyli, hintataso ja erikoisalat sopivat teille parhaiten.'],
        ['2', '1–7 päivän sisällä · suunnittelijat ottavat yhteyttä suoraan teihin', 'Valitut suunnittelijat lähettävät ehdotuksensa suoraan sähköpostiinne: paketit, esimerkkihäät, valokuvat, hinnat ja vapaat päivät. Vertailette rauhassa — meille ei tarvitse tehdä mitään.'],
        ['3', 'Te päätätte', 'Kun yksi tuntuu oikealta, jatkatte suoraan hänen kanssaan — hän hoitaa kaiken DVV-papereista vihkijään, valokuvaajaan, yöpymisiin ja vieraiden kuljetuksiin.'],
      ]
    : [
        ['1', 'First · we match your enquiry', 'We review your request and shortlist up to three planners from our network whose style, price tier, and specialty fit you best.'],
        ['2', 'Within 1–7 days · planners contact you directly', 'The matched planners send their proposals straight to your inbox: packages, real wedding examples, photos, pricing, and availability. Compare freely — there is nothing you need to do.'],
        ['3', 'You decide', 'When one feels right, you continue directly with them — they handle everything from DVV paperwork to officiant, photographer, your stay, and your guests’ transfers.'],
      ];

  const networkLabel = isFi ? 'Finnish Lapland Network' : 'Finnish Lapland Network';
  const networkTitle = isFi ? 'Suunnittele matkanne yhdellä brändillä' : 'Plan your whole trip under one brand';
  const networkP = isFi
    ? 'LaplandWeddings on osa LaplandVibes-verkostoa — Suomen Lapin laajin matkasivustokokonaisuus. Vieraille majoitusta, aktiviteetteja, ravintoloita, autovuokrausta.'
    : 'LaplandWeddings is part of LaplandVibes — the largest Finnish Lapland travel network. Lodging, activities, dining, and car rental for you and your guests.';

  const networkLinks: Array<[string, string, string]> = [
    [isFi ? 'Majoitus' : 'Stays', 'https://laplandstays.com', isFi ? 'Lasi-iglut, hotellit, mökit vieraille' : 'Glass igloos, hotels, cabins for guests'],
    [isFi ? 'Aktiviteetit' : 'Activities', 'https://laplandactivities.online', isFi ? 'Husky, poro, moottorikelkka, revontuliretket' : 'Husky, reindeer, snowmobile, aurora tours'],
    [isFi ? 'Ravintolat' : 'Dining', 'https://laplanddining.com', isFi ? 'Lapin keittiö, fine dining, polttarit' : 'Lapland cuisine, fine dining, hen & stag nights'],
    [isFi ? 'Autovuokraus' : 'Car rental', 'https://laplandcarrental.com', isFi ? 'Suoraan lentokentältä' : 'Straight from the airport'],
  ];

  const ctaTitle = isFi ? 'Selaa Lapin hääpaikkoja sillä välin' : 'Browse Lapland venues while you wait';
  const ctaP = isFi
    ? 'Yli 20 vahvistettua hääpaikkaa, jokaisella oma sivu kapasiteetein, hintoineen ja kuvineen.'
    : '20+ verified venues, each with its own page — capacities, pricing, and photos.';
  const ctaButton = isFi ? 'Selaa hääpaikkoja' : 'Browse venues';

  const ps = isFi
    ? 'Teidän ei tarvitse tehdä mitään — valitut suunnittelijat ottavat teihin yhteyttä suoraan. Sillä välin voitte ladata maksuttoman <a href="https://laplandweddings.online/fi/checklist/dvv-foreign-couples/" style="color:#EC4899;font-weight:600">Lapin häiden muistilistan</a>, jonka mukana saatte myös suunnitteluvinkkimme sähköpostiinne.'
    : 'There is nothing you need to do — the matched planners will contact you directly. In the meantime, grab our free <a href="https://laplandweddings.online/checklist/dvv-foreign-couples/" style="color:#EC4899;font-weight:600">Lapland wedding checklist</a>, which also signs you up for our occasional planning tips.';

  const sig = isFi
    ? 'Lapeso Oy · LaplandVibes-verkosto'
    : 'Lapeso Oy · LaplandVibes network';

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LaplandWeddings</title>
</head>
<body style="margin:0;padding:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#1F2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0F172A;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,0.5)">

        <!-- Hero image with overlaid logo + eyebrow -->
        <tr><td style="position:relative;padding:0">
          <div style="position:relative;line-height:0">
            <img src="${heroImage}" alt="${attr(heroAlt)}" width="600" style="display:block;width:100%;height:auto;max-height:360px;object-fit:cover" />
          </div>
        </td></tr>
        <tr><td style="background:linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#7C2D5E 100%);padding:28px 32px 26px;color:#F8FAFC;text-align:center">
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;color:#EC4899;text-transform:uppercase;font-weight:700">${eyebrow}</p>
          <p style="margin:0;font-size:30px;letter-spacing:0.05em;font-weight:700;line-height:1">
            <span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#EC4899">WEDDINGS</span>
          </p>
          <p style="margin:14px 0 0;font-size:14px;color:#CBD5E1;line-height:1.5">${heroLine}</p>
        </td></tr>

        <!-- Greeting + intro -->
        <tr><td style="padding:36px 32px 8px">
          <h1 style="margin:0 0 12px;font-size:24px;color:#0F172A;font-weight:700;letter-spacing:-0.01em">${greeting} 👋</h1>
          <p style="margin:0;font-size:16px;line-height:1.65;color:#334155">
            ${isFi
              ? 'Saimme häät-tiedustelusi Lappiin — kiitos luottamuksesta. Verkostomme yhdistää teidät <strong>Lapin kokeneimpiin hääsuunnittelijoihin</strong>, jotka ovat vastuussa kaikesta DVV-papereista vihkijään, kuljetuksiin ja vieraiden majoitukseen.'
              : 'We received your Lapland wedding enquiry — thank you for trusting us. Our network connects you with <strong>Lapland’s most experienced wedding planners</strong>, who handle everything from DVV paperwork to officiants, transfers, and your guests’ accommodation.'}
          </p>
        </td></tr>

        <!-- Value props (3 boxes) -->
        <tr><td style="padding:24px 32px 8px">
          ${valueProps.map(([title, desc]) => `
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:10px">
              <tr>
                <td valign="top" width="28" style="width:28px;padding:4px 0 0">
                  <div style="width:20px;height:20px;border-radius:50%;background:#10B981;text-align:center;line-height:20px;color:#FFFFFF;font-size:13px;font-weight:700">✓</div>
                </td>
                <td valign="top" style="padding-left:12px;padding-bottom:6px">
                  <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:#0F172A;letter-spacing:-0.005em">${title}</p>
                  <p style="margin:0;font-size:14px;line-height:1.55;color:#475569">${desc}</p>
                </td>
              </tr>
            </table>
          `).join('')}
        </td></tr>

        <!-- Steps -->
        <tr><td style="padding:24px 32px 8px">
          <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.25em;color:#EC4899;font-weight:700;text-transform:uppercase">${stepsTitle}</p>
          ${steps.map(([n, t, p]) => `
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:18px">
              <tr>
                <td valign="top" width="44" style="padding:0;width:44px">
                  <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#EC4899,#EC4899);color:#FFFFFF;font-weight:700;text-align:center;line-height:34px;font-size:15px;box-shadow:0 4px 12px rgba(236,72,153,0.35)">${n}</div>
                </td>
                <td valign="top" style="padding-left:16px">
                  <p style="margin:4px 0 6px;font-size:15px;font-weight:700;color:#0F172A;letter-spacing:-0.005em">${t}</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#475569">${p}</p>
                </td>
              </tr>
            </table>
          `).join('')}
        </td></tr>

        <!-- Mid CTA: browse venues -->
        <tr><td style="padding:8px 32px 24px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0F172A;border-radius:12px">
            <tr><td style="padding:22px 22px 22px;text-align:center">
              <p style="margin:0 0 6px;font-size:17px;font-weight:700;color:#F8FAFC;letter-spacing:-0.01em">${ctaTitle}</p>
              <p style="margin:0 0 16px;font-size:14px;color:#94A3B8;line-height:1.5">${ctaP}</p>
              <a href="https://laplandweddings.online/venues/"
                 style="display:inline-block;padding:12px 26px;background:#EC4899;color:#FFFFFF;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none;letter-spacing:0.02em;box-shadow:0 6px 18px rgba(236,72,153,0.45)">
                ${ctaButton} →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Network band — clean 2x2 grid -->
        <tr><td style="padding:8px 32px 32px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,#EFF6FF 0%,#FCE7F3 100%);border-radius:12px;border:1px solid rgba(0,47,108,0.10)">
            <tr><td style="padding:24px 22px 8px">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.22em;color:#002F6C;font-weight:700;text-transform:uppercase">${networkLabel}</p>
              <p style="margin:0 0 6px;font-size:18px;font-weight:700;color:#0F172A;letter-spacing:-0.01em">${networkTitle}</p>
              <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.55">${networkP}</p>
            </td></tr>
            <tr><td style="padding:0 14px 18px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${networkLinks.reduce<string[][]>((rows, link, i) => {
                  if (i % 2 === 0) rows.push([]);
                  rows[rows.length - 1]!.push(link as unknown as string);
                  return rows;
                }, []).map(row => `
                  <tr>
                    ${row.map(item => {
                      const [name, url, sub] = item as unknown as [string, string, string];
                      return `<td valign="top" width="50%" style="padding:6px 8px;width:50%">
                        <a href="${url}" style="display:block;padding:14px 14px;background:#FFFFFF;border-radius:10px;border:1px solid rgba(0,47,108,0.10);text-decoration:none">
                          <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#002F6C">${name} →</p>
                          <p style="margin:0;font-size:12px;color:#64748B;line-height:1.45">${sub}</p>
                        </a>
                      </td>`;
                    }).join('')}
                  </tr>
                `).join('')}
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- PS -->
        <tr><td style="padding:0 32px 28px">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#475569"><em>${ps}</em></p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0F172A;padding:22px 32px;text-align:center">
          <p style="margin:0 0 8px;font-size:12px;color:#94A3B8;letter-spacing:0.05em">${sig}</p>
          <p style="margin:0;font-size:12px;color:#64748B">
            <a href="https://laplandweddings.online" style="color:#94A3B8;text-decoration:none">laplandweddings.online</a>
            &nbsp;·&nbsp;
            <a href="mailto:info@laplandvibes.com" style="color:#94A3B8;text-decoration:none">info@laplandvibes.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
