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

  const subject = `Wedding enquiry — ${weddingType || 'open'} (${location || 'open'})`;

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#0F172A;margin:0 0 12px">New wedding enquiry</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;color:#1F2937;border-collapse:collapse">
      <tr><td style="padding:6px 12px;color:#64748B">Name</td><td style="padding:6px 12px"><strong>${escapeHtml(yourName)}</strong>${partnerName ? ` & ${escapeHtml(partnerName)}` : ''}</td></tr>
      <tr><td style="padding:6px 12px;color:#64748B">Email</td><td style="padding:6px 12px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:6px 12px;color:#64748B">Phone</td><td style="padding:6px 12px">${escapeHtml(phone)}</td></tr>` : ''}
      ${country ? `<tr><td style="padding:6px 12px;color:#64748B">Country</td><td style="padding:6px 12px">${escapeHtml(country)}</td></tr>` : ''}
      <tr><td style="padding:6px 12px;color:#64748B">Guests</td><td style="padding:6px 12px">${escapeHtml(guests || '—')}</td></tr>
      <tr><td style="padding:6px 12px;color:#64748B">Date</td><td style="padding:6px 12px">${escapeHtml(preferredDate || '—')} (${escapeHtml(flexibility || 'flexMonth')})</td></tr>
      <tr><td style="padding:6px 12px;color:#64748B">Wedding type</td><td style="padding:6px 12px">${escapeHtml(weddingType || '—')}</td></tr>
      <tr><td style="padding:6px 12px;color:#64748B">Region</td><td style="padding:6px 12px">${escapeHtml(location || '—')}</td></tr>
      ${venue ? `<tr><td style="padding:6px 12px;color:#64748B">Venue interest</td><td style="padding:6px 12px">${escapeHtml(venue)}</td></tr>` : ''}
      <tr><td style="padding:6px 12px;color:#64748B">Budget</td><td style="padding:6px 12px">${escapeHtml(budget || '—')}</td></tr>
      <tr><td style="padding:6px 12px;color:#64748B">Lang</td><td style="padding:6px 12px">${escapeHtml(langPref)}</td></tr>
      <tr><td style="padding:6px 12px;color:#64748B">Attachments</td><td style="padding:6px 12px">${attachments.length} file(s)${attachments.length ? ` (${(totalSize / 1024 / 1024).toFixed(1)} MB)` : ''}</td></tr>
    </table>
    ${message ? `<div style="margin-top:16px;padding:12px;background:#F8FAFC;border-left:3px solid #EC4899;font-family:system-ui,sans-serif;font-size:14px;color:#1F2937;white-space:pre-wrap">${escapeHtml(message)}</div>` : ''}
    <p style="font-family:system-ui,sans-serif;font-size:12px;color:#94A3B8;margin-top:24px">Source: laplandweddings.online · routed via Cloudflare Pages Function /api/lead</p>
  `;

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
  const confirmSubject = langPref === 'fi'
    ? 'Kiitos tiedustelustasi — LaplandWeddings'
    : 'Thanks for your enquiry — LaplandWeddings';
  const confirmHtml = langPref === 'fi'
    ? `<div style="font-family:system-ui,sans-serif;color:#1F2937;max-width:560px;margin:0 auto;padding:20px"><h2 style="color:#0F172A">Kiitos${yourName ? `, ${escapeHtml(yourName.split(' ')[0])}` : ''}!</h2><p>Saimme tiedustelusi Lapin häistä ja olemme yhteydessä 1–7 päivän sisällä. Välitämme tietosi 1–3 hääsuunnittelijalle, jotka parhaiten vastaavat toiveitanne.</p><p>Mikäli sinulla on lisäkysymyksiä, vastaa vain tähän viestiin.</p><p style="color:#94A3B8;font-size:12px;margin-top:24px">— LaplandWeddings · osa LaplandVibes-verkostoa</p></div>`
    : `<div style="font-family:system-ui,sans-serif;color:#1F2937;max-width:560px;margin:0 auto;padding:20px"><h2 style="color:#0F172A">Thank you${yourName ? `, ${escapeHtml(yourName.split(' ')[0])}` : ''}!</h2><p>We received your Lapland wedding enquiry and will be in touch within 1–7 days. We will route your details to 1–3 wedding planners best matched to your wishes.</p><p>If you have follow-up questions, just reply to this email.</p><p style="color:#94A3B8;font-size:12px;margin-top:24px">— LaplandWeddings · part of the LaplandVibes network</p></div>`;

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
