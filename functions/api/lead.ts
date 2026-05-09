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

  // Honeypot — if a hidden field "company" is filled, drop silently as if successful
  const honey = form.get('company');
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
    weddingType, location, venue, budget,
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

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

interface LeadEmailData {
  yourName: string; partnerName: string; email: string; phone: string;
  country: string; guests: string; preferredDate: string; flexibility: string;
  weddingType: string; location: string; venue: string; budget: string;
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

  const budgetInfo = budgetLabels[d.budget] || { label: d.budget || '—', tier: 0 };
  const tierColor = budgetInfo.tier >= 4 ? '#22D3EE' : budgetInfo.tier >= 3 ? '#EC4899' : '#94A3B8';
  const tierBadge = budgetInfo.tier >= 4 ? 'PREMIUM' : budgetInfo.tier >= 3 ? 'MID-RANGE' : budgetInfo.tier >= 1 ? 'STANDARD' : '';

  const couple = d.partnerName ? `${escapeHtml(d.yourName)} &amp; ${escapeHtml(d.partnerName)}` : escapeHtml(d.yourName);
  const flex = flexLabels[d.flexibility] || '';
  const wt = typeLabels[d.weddingType] || (d.weddingType ? escapeHtml(d.weddingType) : '—');
  const loc = locationLabels[d.location] || (d.location ? escapeHtml(d.location) : '—');

  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;width:140px;font-size:11px;letter-spacing:0.18em;color:#94A3B8;text-transform:uppercase;font-weight:600;vertical-align:top">${label}</td>
      <td style="padding:10px 0;font-size:15px;color:#0F172A;vertical-align:top;line-height:1.5">${value}</td>
    </tr>`;

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
                <p style="margin:0;font-size:11px;letter-spacing:0.3em;color:#22D3EE;font-weight:700;text-transform:uppercase">New Lead</p>
                <p style="margin:6px 0 0;font-size:22px;font-weight:700;letter-spacing:0.04em">
                  <span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#F43F5E">WEDDINGS</span>
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
            ${detailRow('Region', loc)}
            ${d.venue ? detailRow('Venue', `<strong>${escapeHtml(d.venue)}</strong>`) : ''}
            ${detailRow('Guests', d.guests || '—')}
            ${detailRow('Preferred date', `${escapeHtml(d.preferredDate || '—')}${flex ? ` · <span style="color:#64748B">${flex}</span>` : ''}`)}
            ${detailRow('Budget', `<span style="color:${tierColor};font-weight:700">${escapeHtml(budgetInfo.label)}</span>`)}
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

  // Hero image — romantic Lapland wedding scene, hosted on the same domain so
  // mail clients trust the source. Replace with an AI-generated brand asset
  // once available; for now we use the public marketing cover that the home
  // hero also uses, ensuring brand consistency across web + email.
  const heroImage = 'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg';
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
        ['1', 'Tänään · tarkistamme tiedustelusi', 'Tiimimme käy läpi pyyntönne tunnin sisällä ja valitsee suunnittelijat, joiden tyyli, hinta-asema ja erikoisalat sopivat parhaiten teille.'],
        ['2', 'Päivien sisällä · 1–3 räätälöityä tarjousta', 'Suunnittelijat lähettävät teille suoraan ehdotuksensa: paketit, esimerkkihäänsä, valokuvat, hinnat ja vapaa kalenteri. Vertailette rauhassa.'],
        ['3', 'Te päätätte', 'Kun yksi tuntuu oikealta, hän hoitaa kaiken — DVV-paperit, vihkijän, valokuvaajan, yöpymiset, vieraiden majoituksen, kuljetukset, kaikki.'],
      ]
    : [
        ['1', 'Today · we review your enquiry', 'Our team reviews your request within an hour and shortlists planners whose style, price tier, and specialty fit you best.'],
        ['2', 'Within days · 1–3 personalised proposals', 'Planners send their packages, real wedding examples, photos, pricing, and availability — directly to your inbox. Compare freely.'],
        ['3', 'You decide', 'When one feels right, they handle everything — DVV paperwork, officiant, photographer, your stay, your guests’ accommodation, transfers, all of it.'],
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
    ? 'Mikäli sinulla on välittömiä kysymyksiä, vastaa vain tähän viestiin — me luemme jokaisen vastauksen henkilökohtaisesti.'
    : 'If you have immediate questions, just reply to this email — we read every response personally.';

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
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;color:#22D3EE;text-transform:uppercase;font-weight:700">${eyebrow}</p>
          <p style="margin:0;font-size:30px;letter-spacing:0.05em;font-weight:700;line-height:1">
            <span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#F43F5E">WEDDINGS</span>
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
                  <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#EC4899,#F43F5E);color:#FFFFFF;font-weight:700;text-align:center;line-height:34px;font-size:15px;box-shadow:0 4px 12px rgba(236,72,153,0.35)">${n}</div>
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
                 style="display:inline-block;padding:12px 26px;background:#F43F5E;color:#FFFFFF;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none;letter-spacing:0.02em;box-shadow:0 6px 18px rgba(244,63,94,0.45)">
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
