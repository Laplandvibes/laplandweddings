/**
 * Cloudflare Pages Function: POST /api/partner
 *
 * Receives a partner-network application from the PartnerForm component and
 * emails it via Resend to info@laplandvibes.com. JSON payload (no attachments).
 *
 * Env vars (Cloudflare Pages → Settings → Environment Variables):
 *   RESEND_API_KEY  — Resend API key (laplandvibe Pro account)
 *   LEAD_FROM       — verified Resend sender, e.g. "LaplandWeddings <noreply@laplandvibes.com>"
 *   PARTNER_TO      — defaults to "info@laplandvibes.com"
 */

interface Env {
  RESEND_API_KEY?: string;
  LEAD_FROM?: string;
  PARTNER_TO?: string;
}

interface PartnerPayload {
  lp_hpot?: string;        // honeypot — must stay empty (non-autofill name)
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  regions?: string;
  years?: string;
  services?: string[] | string;
  message?: string;
  lang?: string;
  consent?: boolean;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function bad(message: string, status = 400): Response {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const SERVICE_LABELS: Record<string, string> = {
  fullPlanning: 'Full planning / coordination',
  venue: 'Venue',
  ceremony: 'Ceremony / officiant',
  catering: 'Catering & drinks',
  photography: 'Photography / video',
  accommodation: 'Accommodation',
  transfers: 'Transfers / logistics',
  decor: 'Décor / florals',
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    return bad('Server not configured (RESEND_API_KEY missing)', 500);
  }

  let body: PartnerPayload;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid JSON');
  }

  // Honeypot — bots fill the hidden field, humans never see it. Drop silently as success.
  if (body.lp_hpot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const businessName = (body.businessName || '').trim();
  const contactName = (body.contactName || '').trim();
  const email = (body.email || '').trim();

  if (!businessName) return bad('Business name is required');
  if (!contactName) return bad('Contact name is required');
  if (!email) return bad('Email is required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('Email is invalid');
  if (!body.consent) return bad('Consent required');

  const phone = (body.phone || '').trim();
  const website = (body.website || '').trim();
  const regions = (body.regions || '').trim();
  const years = (body.years || '').trim();
  const message = (body.message || '').trim();
  const lang = body.lang === 'fi' ? 'fi' : 'en';
  const services = Array.isArray(body.services) ? body.services : (body.services ? [body.services] : []);
  const serviceList = services.map((s) => SERVICE_LABELS[s] || s).filter(Boolean);

  const from = env.LEAD_FROM || 'LaplandWeddings <noreply@laplandvibes.com>';
  const to = env.PARTNER_TO || 'info@laplandvibes.com';
  const subject = `Partner application — ${businessName}`;

  const row = (label: string, value: string) => value ? `
    <tr>
      <td style="padding:9px 0;width:150px;font-size:11px;letter-spacing:0.14em;color:#8B7E73;text-transform:uppercase;font-weight:600;vertical-align:top;border-top:1px solid #F1ECE3">${label}</td>
      <td style="padding:9px 0;font-size:15px;color:#1F1612;vertical-align:top;line-height:1.5;border-top:1px solid #F1ECE3">${value}</td>
    </tr>` : '';

  const websiteCell = website
    ? `<a href="${/^https?:\/\//.test(website) ? escapeHtml(website) : 'https://' + escapeHtml(website)}" style="color:#EC4899;text-decoration:none">${escapeHtml(website)}</a>`
    : '';

  const firstName = escapeHtml(contactName.split(/\s+/)[0] || 'them');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Partner application</title></head>
<body style="margin:0;padding:0;background:#F4F2EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1F1612">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F4F2EE;padding:28px 14px">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #E6E1D8;border-radius:14px;overflow:hidden">
        <tr><td style="padding:24px 30px 18px;border-bottom:1px solid #EFEAE1">
          <p style="margin:0 0 12px;font-size:14px;font-weight:800;letter-spacing:0.04em">
            <span style="color:#EC4899">#</span><span style="color:#1F1612">LAPLAND</span><span style="color:#EC4899">WEDDINGS</span>
          </p>
          <p style="margin:0;font-size:11px;letter-spacing:0.22em;color:#EC4899;font-weight:700;text-transform:uppercase">Partner application</p>
          <p style="margin:8px 0 3px;font-size:23px;font-weight:800;color:#1F1612;letter-spacing:0.01em">${escapeHtml(businessName)}</p>
          <p style="margin:0;font-size:14px;color:#5A4F48">${escapeHtml(contactName)} · <a href="mailto:${escapeHtml(email)}" style="color:#EC4899;text-decoration:none">${escapeHtml(email)}</a>${phone ? ` · ${escapeHtml(phone)}` : ''}</p>
        </td></tr>
        <tr><td style="padding:18px 30px 4px">
          <a href="mailto:${escapeHtml(email)}?subject=Re%3A%20Your%20LaplandWeddings%20partner%20application" style="display:inline-block;padding:11px 24px;background:#EC4899;color:#FFFFFF;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700">Reply to ${firstName} →</a>
        </td></tr>
        <tr><td style="padding:14px 30px 8px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            ${row('Regions served', escapeHtml(regions))}
            ${row('Years (Lapland weddings)', escapeHtml(years))}
            ${row('Website / Instagram', websiteCell)}
            ${row('Services covered', serviceList.length ? escapeHtml(serviceList.join(' · ')) : '')}
            ${row('Language', lang === 'fi' ? 'Finnish 🇫🇮' : 'English 🇬🇧')}
          </table>
        </td></tr>
        ${message ? `<tr><td style="padding:4px 30px 24px">
          <p style="margin:12px 0 8px;font-size:11px;letter-spacing:0.22em;color:#EC4899;font-weight:700;text-transform:uppercase;border-top:1px solid #EFEAE1;padding-top:16px">Their message</p>
          <div style="padding:16px 18px;background:#FBF6F0;border-left:3px solid #EC4899;border-radius:8px;font-size:15px;color:#1F1612;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
        </td></tr>` : ''}
        <tr><td style="padding:15px 30px;background:#FBF8F3;border-top:1px solid #EFEAE1;text-align:center">
          <p style="margin:0;font-size:11px;color:#8B7E73">laplandweddings.online · partner application · reply-to set to the applicant</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject, html }),
  });

  if (!resendRes.ok) {
    const text = await resendRes.text();
    return new Response(JSON.stringify({ ok: false, error: 'Email gateway failed', detail: text }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
