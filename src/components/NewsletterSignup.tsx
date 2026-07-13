import { useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';

const NEWSLETTER_ENDPOINT = (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_NEWSLETTER_ENDPOINT
  || 'https://laplandvibes-newsletter.vercel.app/api/subscribe';

const L11: Record<'thanks' | 'failed', Localized<string>> = {
  thanks: {
    en: 'Thanks! You are on the list.',
    fi: 'Kiitos! Olet listalla.',
    de: 'Danke! Sie sind auf der Liste.',
    ja: 'ありがとうございます！登録が完了しました。',
    es: '¡Gracias! Ya estás en la lista.',
    'pt-BR': 'Obrigado! Você está na lista.',
    'zh-CN': '谢谢！您已加入订阅列表。',
    ko: '감사합니다! 목록에 등록되었습니다.',
    fr: 'Merci ! Vous êtes inscrit·e à la liste.',
    it: 'Grazie! Sei nella lista.',
    nl: 'Bedankt! Je staat op de lijst.',
    sv: 'Tack! Du är med på listan.',
  },
  failed: {
    en: 'Subscription failed. Please try again.',
    fi: 'Lähetys ei mennyt läpi. Kokeile vielä kerran.',
    de: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    ja: '登録に失敗しました。もう一度お試しください。',
    es: 'La suscripción falló. Inténtalo de nuevo.',
    'pt-BR': 'A inscrição falhou. Tente novamente.',
    'zh-CN': '订阅失败，请重试。',
    ko: '구독에 실패했습니다. 다시 시도해 주세요.',
    fr: 'L’inscription a échoué. Veuillez réessayer.',
    it: 'Iscrizione non riuscita. Riprova.',
    nl: 'Aanmelden mislukt. Probeer het opnieuw.',
    sv: 'Prenumerationen misslyckades. Försök igen.',
  },
};

export default function NewsletterSignup() {
  const { lang, tr } = useLang();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'laplandweddings.online', lang }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-gradient-to-br from-aurora-purple/20 via-rose/15 to-aurora-pink/20 rounded-3xl p-6 sm:p-10 border border-white/10">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="font-heading text-2xl sm:text-3xl text-white mb-2.5 sm:mb-3 tracking-wide [text-wrap:balance]">
          {tr.home.newsletterTitle}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">{tr.home.newsletterSub}</p>
        {status === 'ok' ? (
          <p className="text-aurora-green font-semibold">{pickLocalized(L11.thanks, lang)}</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xl mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tr.home.newsletterEmail}
              className="flex-1 min-h-[48px] rounded-full bg-night-light border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose px-5 py-3 text-base text-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full disabled:opacity-60 shadow-lg shadow-rose/30"
            >
              {status === 'loading' ? '…' : tr.home.newsletterCta}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-rose text-sm mt-3">{pickLocalized(L11.failed, lang)}</p>
        )}
      </div>
    </div>
  );
}
