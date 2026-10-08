import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';
import L from './L';
import FounderByline from '../shared/FounderByline';
import { NEWSLETTER_FUNCTION_URL, NEWSLETTER_SUPABASE_PUBLISHABLE_KEY } from '../lib/newsletter';

/**
 * [LV-FUNNEL 2026-08-21] Lomakesuppilon eventit Umamiin — paikallinen apuri,
 * ei jaettua importtia (vendoroitu sync on refresh-only). Ei saa koskaan
 * rikkoa lomaketta. Standardi: memory _procedural/lv_form_funnel_events.md.
 */
function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch { /* ignore */ }
}

// Onnistumistekstit sanasta sanaan jaetusta popupista (shared/NewsletterPopup.tsx), jotta
// lomake ja popup sanovat saman: tilaus odottaa vahvistusta sähköpostista, tai osoite oli
// jo vahvistettu (palvelin vastaa alreadySubscribed eikä lähetä viestiä). Vanha "olet
// listalla" oli väärin: vahvistamaton tilaaja ei saa vielä mitään (8.10.2026).
const L11: Record<'successHeadline' | 'successBody' | 'alreadyHeadline' | 'alreadyBody' | 'failed', Localized<string>> = {
  successHeadline: {
    en: 'Almost there.',
    fi: 'Melkein valmista.',
    de: 'Fast geschafft.',
    ja: 'あと少しです。',
    es: 'Ya casi.',
    'pt-BR': 'Quase lá.',
    'zh-CN': '就快好了。',
    ko: '거의 다 됐습니다.',
    fr: 'Presque fini.',
    it: 'Ci siamo quasi.',
    nl: 'Bijna klaar.',
    sv: 'Nästan klart.',
  },
  successBody: {
    en: 'Confirm your subscription from the email we just sent you.',
    fi: 'Käy vahvistamassa tilaus sähköpostiisi tulleesta viestistä.',
    de: 'Bestätigen Sie Ihr Abo über die E-Mail, die wir Ihnen gerade geschickt haben.',
    ja: 'いまお送りしたメールから登録を確認してください。',
    es: 'Confirme su suscripción desde el correo que acabamos de enviarle.',
    'pt-BR': 'Confirme sua inscrição no e-mail que acabamos de enviar.',
    'zh-CN': '请在我们刚发送的邮件中确认订阅。',
    ko: '방금 보내드린 이메일에서 구독을 확인해 주세요.',
    fr: 'Confirmez votre inscription depuis l\'e-mail que nous venons de vous envoyer.',
    it: 'Confermi l\'iscrizione dall\'e-mail che Le abbiamo appena inviato.',
    nl: 'Bevestig uw aanmelding via de e-mail die we net hebben gestuurd.',
    sv: 'Bekräfta din prenumeration i mejlet vi just skickade.',
  },
  alreadyHeadline: {
    en: 'Already on the list!',
    fi: 'Olit jo listalla.',
    de: 'Schon auf der Liste!',
    ja: 'すでに登録済みです!',
    es: '¡Ya estaba en la lista!',
    'pt-BR': 'Já está na lista!',
    'zh-CN': '您已在订阅列表中!',
    ko: '이미 구독 중입니다!',
    fr: 'Déjà inscrit·e !',
    it: 'È già nella lista!',
    nl: 'Al op de lijst!',
    sv: 'Du står redan på listan!',
  },
  alreadyBody: {
    en: "You were already subscribed. You'll hear from me when there's something worth telling.",
    fi: 'Tilauksesi oli jo voimassa. Kuulet minusta, kun on kerrottavaa.',
    de: 'Sie waren bereits angemeldet. Sie hören von mir, wenn es etwas zu erzählen gibt.',
    ja: 'すでにご登録いただいています。お伝えしたいことがあるときにご連絡します。',
    es: 'Su suscripción ya estaba activa. Sabrá de mí cuando haya algo que contar.',
    'pt-BR': 'Sua inscrição já estava ativa. Você vai saber de mim quando houver algo para contar.',
    'zh-CN': '您的订阅已经生效。有值得分享的内容时，我会告诉您。',
    ko: '이미 구독하고 계십니다. 전할 소식이 있을 때 연락드릴게요.',
    fr: 'Votre inscription était déjà active. Vous aurez de mes nouvelles quand il y aura quelque chose à raconter.',
    it: 'La Sua iscrizione era già attiva. Le scrivo quando c\'è qualcosa da raccontare.',
    nl: 'U was al aangemeld. U hoort van mij als er iets te vertellen valt.',
    sv: 'Din prenumeration var redan aktiv. Du hör av mig när det finns något att berätta.',
  },
  failed: {
    en: 'Subscription failed. Please try again.',
    fi: 'Lähetys ei mennyt läpi. Kokeile vielä kerran.',
    de: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    ja: '登録に失敗しました。もう一度お試しください。',
    es: 'La suscripción falló. Inténtelo de nuevo.',
    'pt-BR': 'A inscrição falhou. Tente novamente.',
    'zh-CN': '订阅失败，请重试。',
    ko: '구독에 실패했습니다. 다시 시도해 주세요.',
    fr: 'L’inscription a échoué. Veuillez réessayer.',
    it: 'Iscrizione non riuscita. Riprovi.',
    nl: 'Aanmelden mislukt. Probeer het opnieuw.',
    sv: 'Prenumerationen misslyckades. Försök igen.',
  },
};

/** Consent copy lives here (not in the shared translation files) so this component owns its own gate. */
const CONSENT_COPY: Record<'checkbox' | 'privacyLabel', Localized<string>> = {
  checkbox: {
    en: 'Yes, send the LaplandVibes newsletter (travel tips, seasonal updates and offers) to this email address. I confirm I am 18 or over.',
    fi: 'LaplandVibes saa lähettää minulle uutiskirjettä (matkailuvinkkejä, sesonkitietoa ja tarjouksia) antamaani sähköpostiosoitteeseen. Olen täyttänyt 18 vuotta.',
    de: 'Ja, LaplandVibes darf mir den Newsletter mit Reisetipps, Saisoninfos und Angeboten an diese E-Mail-Adresse senden. Ich bin mindestens 18 Jahre alt.',
    ja: '入力したメールアドレス宛に、LaplandVibesがニュースレター（旅のヒント、シーズン情報、キャンペーン情報）を送ることに同意します。私は18歳以上です。',
    es: 'Acepto recibir en mi correo el boletín de LaplandVibes (consejos de viaje, información de temporada y ofertas) y confirmo que tengo al menos 18 años.',
    'pt-BR': 'Aceito receber a newsletter do LaplandVibes no e-mail informado, com dicas de viagem, informações de temporada e ofertas. Tenho 18 anos ou mais.',
    'zh-CN': '我同意 LaplandVibes 向我填写的邮箱发送订阅邮件，内容包括拉普兰旅行建议、季节资讯和优惠信息，并确认本人已年满18周岁。',
    ko: '입력한 이메일 주소로 LaplandVibes가 보내는 여행 팁·시즌 정보·프로모션 소식 뉴스레터 수신에 동의하며, 만 18세 이상임을 확인합니다.',
    fr: "J'accepte de recevoir la newsletter LaplandVibes (conseils voyage, infos saisonnières, offres) à cette adresse e-mail et je confirme avoir 18 ans ou plus.",
    it: 'Sì, desidero ricevere la newsletter di LaplandVibes (consigli di viaggio, novità stagionali e offerte) all’indirizzo indicato. Ho almeno 18 anni.',
    nl: 'Ja, LaplandVibes mag de nieuwsbrief met reistips, seizoensinfo en aanbiedingen naar dit e-mailadres sturen. Ik ben 18 jaar of ouder.',
    sv: 'Ja, jag vill ha nyhetsbrevet från LaplandVibes med restips, säsongsinfo och erbjudanden till min e-postadress. Jag är minst 18 år.',
  },
  privacyLabel: {
    en: 'Privacy Policy',
    fi: 'Tietosuojaseloste',
    de: 'Datenschutzerklärung',
    ja: 'プライバシーポリシー',
    es: 'Política de privacidad',
    'pt-BR': 'Política de Privacidade',
    'zh-CN': '隐私政策',
    ko: '개인정보처리방침',
    fr: 'Politique de confidentialité',
    it: 'Informativa sulla privacy',
    nl: 'Privacyverklaring',
    sv: 'Integritetspolicy',
  },
};

export default function NewsletterSignup() {
  const { lang, tr } = useLang();
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'already' | 'error'>('idle');

  const consentText = pickLocalized(CONSENT_COPY.checkbox, lang);

  // [LV-FUNNEL] view = osio vieritetty näkyviin (kerran), start = 1. fokus,
  // blocked kerran per submit-yritys (natiivi invalid laukeaa per kenttä).
  const funnelData = { surface: 'inline', lang };
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const startTracked = useRef(false);
  const blockedTracked = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        track('nl_view', funnelData);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const trackStart = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track('nl_start', funnelData);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !consented) {
      track('nl_blocked', { ...funnelData, reason: !email ? 'email' : 'consent' });
      return;
    }
    setStatus('loading');
    track('nl_submit', funnelData);
    try {
      // Sama jaettu putki ja sama kenttärakenne kuin popupissa
      // (shared/NewsletterPopup.tsx): palvelin vaatii consent + ageConfirmed
      // + consentText, ja sivusto, kieli ja kanava kulkevat omissa kentissään.
      const res = await fetch(NEWSLETTER_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NEWSLETTER_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          email,
          source: 'laplandweddings-inline',
          site: 'laplandweddings',
          language: lang,
          channel: 'inline',
          consent: true,
          ageConfirmed: true,
          consentText,
        }),
      });
      if (!res.ok) throw new Error('failed');
      // Jo vahvistettu osoite: palvelin ei lähetä viestiä, joten ei luvata sitä (sama kuin popup).
      const data = (await res.json().catch(() => ({}))) as { alreadySubscribed?: boolean };
      if (data.alreadySubscribed) {
        setStatus('already');
        track('nl_success', { ...funnelData, already: true });
      } else {
        setStatus('ok');
        track('nl_success', funnelData);
      }
      setEmail('');
    } catch {
      setStatus('error');
      track('nl_error', funnelData);
    }
  }

  return (
    <div ref={sectionRef} className="bg-gradient-to-br from-aurora-purple/20 via-rose/15 to-aurora-pink/20 rounded-3xl p-6 sm:p-10 border border-white/10">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="font-heading text-2xl sm:text-3xl text-white mb-2.5 sm:mb-3 tracking-wide [text-wrap:balance]">
          {tr.home.newsletterTitle}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">{tr.home.newsletterSub}</p>
        {status === 'ok' || status === 'already' ? (
          <div role="status">
            <p className="text-aurora-green font-semibold">
              {pickLocalized(status === 'ok' ? L11.successHeadline : L11.alreadyHeadline, lang)}
            </p>
            <p className="mt-1.5 text-sm sm:text-base text-gray-300 leading-relaxed">
              {pickLocalized(status === 'ok' ? L11.successBody : L11.alreadyBody, lang)}
            </p>
          </div>
        ) : (
          <><FounderByline tone="pink" />
          <form
            onSubmit={submit}
            // [LV-FUNNEL] required-kentät estävät submitin natiivisti ennen
            // submit-handleria — invalid-capture kertoo MIKÄ kenttä pysäytti.
            onInvalidCapture={(e) => {
              if (blockedTracked.current) return;
              blockedTracked.current = true;
              window.setTimeout(() => { blockedTracked.current = false; }, 400);
              const t = e.target as HTMLInputElement;
              track('nl_blocked', { ...funnelData, reason: t.type === 'checkbox' ? 'consent' : 'email' });
            }}
            className="max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                required
                value={email}
                onFocus={trackStart}
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
            </div>
            <label className="mt-3 sm:mt-4 flex items-start gap-3 text-left text-xs text-gray-400 leading-relaxed">
              <input
                type="checkbox"
                required
                checked={consented}
                onFocus={trackStart}
                onChange={(e) => setConsented(e.target.checked)}
                className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-white/20 bg-night-light text-rose focus:ring-rose"
              />
              <span>
                {consentText}{' '}
                <L to="/privacy" className="text-rose underline underline-offset-2 hover:text-pink">
                  {pickLocalized(CONSENT_COPY.privacyLabel, lang)}
                </L>
              </span>
            </label>
          </form></>
        )}
        {status === 'error' && (
          <p className="text-rose text-sm mt-3">{pickLocalized(L11.failed, lang)}</p>
        )}
      </div>
    </div>
  );
}
