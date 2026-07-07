/**
 * Cloudflare Pages Function: POST /api/newsletter
 *
 * Subscribes the email to the shared LaplandVibes Resend audience and
 * sends a welcome email with the DVV checklist PDF link.
 *
 * Returns { ok: true } on success — the client then unlocks the checklist
 * content. The submitter receives the welcome email containing the
 * permanent /checklist/dvv-foreign-couples URL.
 *
 * Env vars (Cloudflare Pages → Settings → Environment Variables):
 *   RESEND_API_KEY        — laplandvibe Pro account
 *   RESEND_AUDIENCE_ID    — shared LV audience (default: 3b9d288a-d18d-45cb-b9ee-dad6a4c97da4)
 *   LEAD_FROM             — verified Resend sender, e.g. "LaplandWeddings <noreply@laplandvibes.com>"
 */

interface Env {
  RESEND_API_KEY?: string;
  RESEND_AUDIENCE_ID?: string;
  LEAD_FROM?: string;
}

const DEFAULT_AUDIENCE_ID = '3b9d288a-d18d-45cb-b9ee-dad6a4c97da4';

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

function welcomeHtml(lang: string, firstName: string): string {
  const isFi = lang === 'fi';
  const checklistUrl = `https://laplandweddings.online${isFi ? '/fi' : ''}/checklist/dvv-foreign-couples/`;
  const greeting = firstName ? (isFi ? `Hei ${escapeHtml(firstName)}` : `Hello ${escapeHtml(firstName)}`) : (isFi ? 'Tervetuloa' : 'Welcome');

  if (isFi) {
    return `<!doctype html><html lang="fi"><body style="margin:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.4)">
      <tr><td style="background:linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#7C2D5E 100%);padding:38px 32px 30px;color:#F8FAFC;text-align:center">
        <p style="margin:0;font-size:30px;letter-spacing:0.05em;font-weight:700">
          <span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#EC4899">WEDDINGS</span>
        </p>
        <p style="margin:14px 0 0;font-size:12px;letter-spacing:0.3em;color:#EC4899;text-transform:uppercase;font-weight:600">DVV-tarkistuslista on valmis</p>
      </td></tr>
      <tr><td style="padding:34px 32px">
        <h1 style="margin:0 0 14px;font-size:26px;color:#0F172A;font-weight:700">${greeting} 👋</h1>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#334155">Kiitos kun liityit listalle. Saat säännöllisesti uutiskirjeitä: avoimet venuet, sesonkivinkit, tarjoukset ja Lapin häämarkkinan parhaat puolet.</p>
        <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#334155;font-weight:600">DVV-tarkistuslista on tässä:</p>
        <p style="text-align:center;margin:0 0 24px"><a href="${checklistUrl}" style="display:inline-block;padding:14px 28px;background:#EC4899;color:#FFFFFF;text-decoration:none;border-radius:999px;font-size:15px;font-weight:700">Avaa DVV-tarkistuslista →</a></p>
        <p style="margin:0 0 0;font-size:14px;line-height:1.6;color:#64748B">Sivu on optimoitu A4-printtiin — paina selaimesi Tulosta ja tallenna PDF:nä matkalle.</p>
      </td></tr>
      <tr><td style="background:#0F172A;padding:18px 32px;text-align:center"><p style="margin:0;font-size:11px;color:#64748B">Lapeso Oy · LaplandVibes-verkosto</p></td></tr>
    </table>
  </td></tr></table></body></html>`;
  }

  return `<!doctype html><html lang="en"><body style="margin:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:24px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.4)">
      <tr><td style="background:linear-gradient(135deg,#0F172A 0%,#1E293B 50%,#7C2D5E 100%);padding:38px 32px 30px;color:#F8FAFC;text-align:center">
        <p style="margin:0;font-size:30px;letter-spacing:0.05em;font-weight:700">
          <span style="color:#EC4899">#</span><span style="color:#E2E8F0">LAPLAND</span><span style="color:#EC4899">WEDDINGS</span>
        </p>
        <p style="margin:14px 0 0;font-size:12px;letter-spacing:0.3em;color:#EC4899;text-transform:uppercase;font-weight:600">Your DVV checklist is ready</p>
      </td></tr>
      <tr><td style="padding:34px 32px">
        <h1 style="margin:0 0 14px;font-size:26px;color:#0F172A;font-weight:700">${greeting} 👋</h1>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#334155">Thanks for joining the list. Regular updates: open venues, season tips, offers, and the inside track on Lapland’s wedding market.</p>
        <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#334155;font-weight:600">Your DVV checklist is here:</p>
        <p style="text-align:center;margin:0 0 24px"><a href="${checklistUrl}" style="display:inline-block;padding:14px 28px;background:#EC4899;color:#FFFFFF;text-decoration:none;border-radius:999px;font-size:15px;font-weight:700">Open the DVV checklist →</a></p>
        <p style="margin:0 0 0;font-size:14px;line-height:1.6;color:#64748B">The page is print-optimised for A4 — hit your browser’s Print and save as PDF for your travel folder.</p>
      </td></tr>
      <tr><td style="background:#0F172A;padding:18px 32px;text-align:center"><p style="margin:0;font-size:11px;color:#64748B">Lapeso Oy · LaplandVibes network</p></td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    return bad('Server not configured (RESEND_API_KEY missing)', 500);
  }

  let body: { email?: string; firstName?: string; lang?: string; consent?: boolean };
  try {
    body = await request.json();
  } catch {
    return bad('Invalid JSON');
  }

  const email = (body.email || '').trim();
  const firstName = (body.firstName || '').trim().slice(0, 40);
  const lang = body.lang === 'fi' ? 'fi' : 'en';

  if (!email) return bad('Email required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('Invalid email');
  if (!body.consent) return bad('Consent required');

  const audienceId = env.RESEND_AUDIENCE_ID || DEFAULT_AUDIENCE_ID;
  const from = env.LEAD_FROM || 'LaplandWeddings <noreply@laplandvibes.com>';

  // 1) Add to Resend audience (idempotent — Resend ignores duplicates with 200/201)
  const audienceRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, first_name: firstName, unsubscribed: false }),
  });

  if (!audienceRes.ok && audienceRes.status !== 422) {
    // 422 typically means already subscribed — treat as success
    const text = await audienceRes.text();
    return new Response(JSON.stringify({ ok: false, error: 'Audience add failed', detail: text }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 2) Send welcome email with checklist link (best-effort)
  const subject = lang === 'fi'
    ? 'Tervetuloa — DVV-tarkistuslista on tässä'
    : 'Welcome — your DVV checklist is here';

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: 'info@laplandvibes.com',
      subject,
      html: welcomeHtml(lang, firstName),
    }),
  }).catch(() => {/* silent */});

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
