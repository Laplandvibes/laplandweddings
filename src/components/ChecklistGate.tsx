import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';

const STORAGE_KEY = 'laplandweddings_checklist_unlocked';

type GateKey =
  | 'eyebrow' | 'title' | 'sub'
  | 'bulletA' | 'bulletB' | 'bulletC' | 'bulletD'
  | 'firstNameLabel' | 'emailLabel' | 'emailPlaceholder'
  | 'consent' | 'submit' | 'submitting' | 'privacy';

const GATE: Record<GateKey, Localized<string>> = {
  eyebrow: {
    en: 'Free lead magnet',
    fi: 'Maksuton lead magnet',
    de: 'Kostenloser Lead-Magnet',
    ja: '無料の特典コンテンツ',
    es: 'Recurso gratuito',
    'pt-BR': 'Material gratuito',
    'zh-CN': '免费资源',
    ko: '무료 리드 마그넷',
    fr: 'Ressource gratuite',
    it: 'Risorsa gratuita',
    nl: 'Gratis weggever', sv: 'Free lead magnet',
  },
  title: {
    en: 'Unlock the DVV checklist — one email, that’s it',
    fi: 'Lukitse DVV-tarkistuslista — yksi sähköposti riittää',
    de: 'DVV-Checkliste freischalten — eine E-Mail genügt',
    ja: 'DVVチェックリストを入手 — メールアドレスだけでOK',
    es: 'Desbloquea la lista de verificación DVV — solo tu correo',
    'pt-BR': 'Libere a checklist do DVV — só um e-mail',
    'zh-CN': '解锁 DVV 清单 — 只需一个邮箱',
    ko: 'DVV 체크리스트 받기 — 이메일 하나면 끝',
    fr: 'Débloquez la checklist DVV — un e-mail suffit',
    it: 'Sblocca la checklist DVV — basta un’email',
    nl: 'Ontgrendel de DVV-checklist — één e-mail, meer niet', sv: 'Unlock the DVV checklist — one email, that’s it',
  },
  sub: {
    en: 'Get every step and link instantly, plus regular updates from inside Lapland’s wedding market — venues, season tips, offers. Unsubscribe anytime.',
    fi: 'Saat heti kaikki vaiheet ja linkit, plus säännöllisiä uutiskirjeitä Lapin häämarkkinasta — venuet, sesonkivinkit ja tarjoukset. Voit perua koska tahansa.',
    de: 'Erhalten Sie sofort alle Schritte und Links sowie regelmäßige Updates aus dem Hochzeitsmarkt Lapplands — Locations, Saisontipps, Angebote. Jederzeit abbestellbar.',
    ja: 'すべての手順とリンクをすぐに入手でき、さらにラップランドのウェディング市場の最新情報（会場、シーズンのヒント、特典）を定期的にお届けします。いつでも配信停止可能です。',
    es: 'Recibe todos los pasos y enlaces al instante, además de novedades del mercado de bodas de Laponia: lugares, consejos de temporada y ofertas. Cancela cuando quieras.',
    'pt-BR': 'Receba todas as etapas e links na hora, além de novidades do mercado de casamentos da Lapônia — locais, dicas de temporada e ofertas. Cancele quando quiser.',
    'zh-CN': '立即获取每个步骤和链接，并定期收到拉普兰婚礼市场的资讯——场地、季节贴士与优惠。可随时退订。',
    ko: '모든 단계와 링크를 즉시 받고, 라플란드 웨딩 시장의 소식(웨딩 장소, 시즌 팁, 혜택)도 정기적으로 받아보세요. 언제든 구독을 취소할 수 있습니다.',
    fr: 'Recevez instantanément toutes les étapes et les liens, ainsi que des nouvelles régulières du marché du mariage en Laponie : lieux, conseils de saison, offres. Désinscription à tout moment.',
    it: 'Ricevi subito tutti i passaggi e i link, oltre ad aggiornamenti regolari dal mercato dei matrimoni in Lapponia: location, consigli stagionali, offerte. Disiscriviti quando vuoi.',
    nl: 'Ontvang direct elke stap en link, plus regelmatige updates uit de huwelijksmarkt van Lapland — locaties, seizoenstips, aanbiedingen. Schrijf je op elk moment uit.', sv: 'Get every step and link instantly, plus regular updates from inside Lapland’s wedding market — venues, season tips, offers. Unsubscribe anytime.',
  },
  bulletA: {
    en: 'One-page checklist — every document and witness',
    fi: 'Yksisivuinen tarkistuslista — kaikki paperit ja todistajat',
    de: 'Einseitige Checkliste — alle Dokumente und Trauzeugen',
    ja: '1ページのチェックリスト — 必要書類と証人をすべて網羅',
    es: 'Lista de una página: todos los documentos y testigos',
    'pt-BR': 'Checklist de uma página — todos os documentos e testemunhas',
    'zh-CN': '一页清单——所有文件和证婚人',
    ko: '한 장짜리 체크리스트 — 모든 서류와 증인',
    fr: 'Checklist d’une page — chaque document et témoin',
    it: 'Checklist di una pagina: tutti i documenti e i testimoni',
    nl: 'Checklist van één pagina — elk document en getuige', sv: 'One-page checklist — every document and witness',
  },
  bulletB: {
    en: 'Timeline: 8 weeks before → after the wedding',
    fi: 'Aikataulu: 8 viikkoa ennen → vihkimisen jälkeen',
    de: 'Zeitplan: 8 Wochen vorher → nach der Hochzeit',
    ja: 'スケジュール：8週間前 → 結婚式後まで',
    es: 'Cronograma: 8 semanas antes → después de la boda',
    'pt-BR': 'Cronograma: 8 semanas antes → depois do casamento',
    'zh-CN': '时间线：婚礼前 8 周 → 婚礼之后',
    ko: '일정: 결혼식 8주 전 → 결혼식 후',
    fr: 'Calendrier : 8 semaines avant → après le mariage',
    it: 'Tempistiche: 8 settimane prima → dopo il matrimonio',
    nl: 'Tijdlijn: 8 weken vooraf → na de bruiloft', sv: 'Timeline: 8 weeks before → after the wedding',
  },
  bulletC: {
    en: 'Direct links to the DVV official pages',
    fi: 'Linkit suoraan DVV:n virallisille sivuille',
    de: 'Direkte Links zu den offiziellen DVV-Seiten',
    ja: 'DVV公式ページへの直接リンク',
    es: 'Enlaces directos a las páginas oficiales del DVV',
    'pt-BR': 'Links diretos para as páginas oficiais do DVV',
    'zh-CN': '直接链接到 DVV 官方页面',
    ko: 'DVV 공식 페이지로 바로 가는 링크',
    fr: 'Liens directs vers les pages officielles du DVV',
    it: 'Link diretti alle pagine ufficiali del DVV',
    nl: 'Directe links naar de officiële DVV-pagina’s', sv: 'Direct links to the DVV official pages',
  },
  bulletD: {
    en: 'Print on A4 or save as PDF',
    fi: 'Voi tulostaa A4:lle tai tallentaa PDF:nä',
    de: 'Auf A4 drucken oder als PDF speichern',
    ja: 'A4で印刷、またはPDFで保存',
    es: 'Imprime en A4 o guarda como PDF',
    'pt-BR': 'Imprima em A4 ou salve como PDF',
    'zh-CN': '可打印为 A4 或保存为 PDF',
    ko: 'A4로 인쇄하거나 PDF로 저장',
    fr: 'Imprimez en A4 ou enregistrez en PDF',
    it: 'Stampa in A4 o salva come PDF',
    nl: 'Print op A4 of bewaar als pdf', sv: 'Print on A4 or save as PDF',
  },
  firstNameLabel: {
    en: 'First name (optional)',
    fi: 'Etunimi (vapaaehtoinen)',
    de: 'Vorname (optional)',
    ja: '名（任意）',
    es: 'Nombre (opcional)',
    'pt-BR': 'Nome (opcional)',
    'zh-CN': '名字（选填）',
    ko: '이름 (선택)',
    fr: 'Prénom (facultatif)',
    it: 'Nome (facoltativo)',
    nl: 'Voornaam (optioneel)', sv: 'First name (optional)',
  },
  emailLabel: {
    en: 'Email address *',
    fi: 'Sähköpostiosoite *',
    de: 'E-Mail-Adresse *',
    ja: 'メールアドレス *',
    es: 'Correo electrónico *',
    'pt-BR': 'Endereço de e-mail *',
    'zh-CN': '电子邮箱 *',
    ko: '이메일 주소 *',
    fr: 'Adresse e-mail *',
    it: 'Indirizzo email *',
    nl: 'E-mailadres *', sv: 'Email address *',
  },
  emailPlaceholder: {
    en: 'you@email.com',
    fi: 'sinun@email.fi',
    de: 'name@email.de',
    ja: 'you@email.com',
    es: 'tu@email.com',
    'pt-BR': 'voce@email.com',
    'zh-CN': 'you@email.com',
    ko: 'you@email.com',
    fr: 'vous@email.com',
    it: 'tu@email.com',
    nl: 'jij@email.com', sv: 'you@email.com',
  },
  consent: {
    en: 'I agree that I may be contacted about Lapland-wedding topics. I can unsubscribe anytime.',
    fi: 'Hyväksyn että minuun voidaan ottaa yhteyttä Lapin häämarkkinaan liittyvistä asioista. Voin perua koska tahansa.',
    de: 'Ich bin damit einverstanden, zu Themen rund um Hochzeiten in Lappland kontaktiert zu werden. Ich kann mich jederzeit abmelden.',
    ja: 'ラップランドのウェディングに関する連絡を受け取ることに同意します。いつでも配信停止できます。',
    es: 'Acepto que se me contacte sobre temas de bodas en Laponia. Puedo darme de baja en cualquier momento.',
    'pt-BR': 'Concordo em ser contatado sobre assuntos de casamentos na Lapônia. Posso cancelar a qualquer momento.',
    'zh-CN': '我同意就拉普兰婚礼相关话题接收联系。我可以随时退订。',
    ko: '라플란드 웨딩 관련 안내를 받는 데 동의합니다. 언제든 구독을 취소할 수 있습니다.',
    fr: 'J’accepte d’être contacté·e au sujet des mariages en Laponie. Je peux me désinscrire à tout moment.',
    it: 'Acconsento a essere contattato su temi legati ai matrimoni in Lapponia. Posso annullare l’iscrizione in qualsiasi momento.',
    nl: 'Ik ga ermee akkoord benaderd te worden over onderwerpen rond trouwen in Lapland. Ik kan me altijd uitschrijven.', sv: 'I agree that I may be contacted about Lapland-wedding topics. I can unsubscribe anytime.',
  },
  submit: {
    en: 'Open the checklist →',
    fi: 'Avaa tarkistuslista →',
    de: 'Checkliste öffnen →',
    ja: 'チェックリストを開く →',
    es: 'Abrir la lista →',
    'pt-BR': 'Abrir a checklist →',
    'zh-CN': '打开清单 →',
    ko: '체크리스트 열기 →',
    fr: 'Ouvrir la checklist →',
    it: 'Apri la checklist →',
    nl: 'Open de checklist →', sv: 'Open the checklist →',
  },
  submitting: {
    en: 'Sending…',
    fi: 'Lähetetään…',
    de: 'Wird gesendet…',
    ja: '送信中…',
    es: 'Enviando…',
    'pt-BR': 'Enviando…',
    'zh-CN': '发送中…',
    ko: '전송 중…',
    fr: 'Envoi…',
    it: 'Invio…',
    nl: 'Verzenden…', sv: 'Sending…',
  },
  privacy: {
    en: 'Your details are safe with the LaplandVibes network. We never share your email with third parties.',
    fi: 'Tietosi ovat turvassa LaplandVibes-verkostossa. Emme jaa sähköpostiasi kolmansille osapuolille.',
    de: 'Ihre Daten sind im LaplandVibes-Netzwerk sicher. Wir geben Ihre E-Mail niemals an Dritte weiter.',
    ja: 'お客様の情報はLaplandVibesネットワークで安全に保護されます。メールアドレスを第三者と共有することはありません。',
    es: 'Tus datos están seguros en la red LaplandVibes. Nunca compartimos tu correo con terceros.',
    'pt-BR': 'Seus dados estão seguros na rede LaplandVibes. Nunca compartilhamos seu e-mail com terceiros.',
    'zh-CN': '您的信息在 LaplandVibes 网络中是安全的。我们绝不会与第三方分享您的邮箱。',
    ko: '귀하의 정보는 LaplandVibes 네트워크에서 안전하게 보호됩니다. 이메일을 제3자와 공유하지 않습니다.',
    fr: 'Vos données sont en sécurité au sein du réseau LaplandVibes. Nous ne partageons jamais votre e-mail avec des tiers.',
    it: 'I tuoi dati sono al sicuro nella rete LaplandVibes. Non condividiamo mai la tua email con terze parti.',
    nl: 'Je gegevens zijn veilig binnen het LaplandVibes-netwerk. We delen je e-mail nooit met derden.', sv: 'Your details are safe with the LaplandVibes network. We never share your email with third parties.',
  },
};

const GATE_ERROR: Localized<string> = {
  en: 'Submission failed. Please try again.',
  fi: 'Lähetys ei mennyt läpi. Kokeile vielä kerran.',
  de: 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.',
  ja: '送信に失敗しました。もう一度お試しください。',
  es: 'El envío falló. Inténtalo de nuevo.',
  'pt-BR': 'Falha no envio. Tente novamente.',
  'zh-CN': '提交失败，请重试。',
  ko: '전송에 실패했습니다. 다시 시도해 주세요.',
  fr: 'L’envoi a échoué. Veuillez réessayer.',
  it: 'Invio non riuscito. Riprova.',
  nl: 'Verzenden mislukt. Probeer het opnieuw.', sv: 'Submission failed. Please try again.',
};

interface Props {
  children: ReactNode;
}

/**
 * Gates the DVV checklist behind a one-time email signup. Once submitted,
 * sets a localStorage flag and reveals the children. The signup hits
 * `/api/newsletter` which subscribes to the LV Resend audience and sends
 * a welcome email with the same checklist URL.
 */
export default function ChecklistGate({ children }: Props) {
  const { lang } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lang, consent }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'failed');
      }
      window.localStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
    } catch {
      setError(pickLocalized(GATE_ERROR, lang));
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) return <>{children}</>;

  const t = Object.fromEntries(
    (Object.keys(GATE) as GateKey[]).map((k) => [k, pickLocalized(GATE[k], lang)]),
  ) as Record<GateKey, string>;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-night-light/70 border border-white/10 rounded-3xl p-7 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-3 text-rose mb-5">
          <Lock className="w-5 h-5" />
          <p className="uppercase tracking-[0.25em] text-[11px] font-semibold">{t.eyebrow}</p>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-3">{t.title}</h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">{t.sub}</p>

        <ul className="space-y-2 mb-7">
          {[t.bulletA, t.bulletB, t.bulletC, t.bulletD].map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-aurora-green flex-shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-gray-300 mb-1.5">{t.firstNameLabel}</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full min-h-[48px] rounded-lg bg-night border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose px-3.5 py-2.5 text-base text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">{t.emailLabel}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full min-h-[48px] rounded-lg bg-night border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose pl-10 pr-3.5 py-2.5 text-base text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>
          </div>
          <label className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-night-light text-rose focus:ring-rose"
            />
            <span>{t.consent}</span>
          </label>

          {error && <p className="text-rose text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 bg-rose hover:bg-pink disabled:opacity-60 text-white font-semibold rounded-full transition-colors shadow-lg shadow-rose/30"
          >
            {submitting ? t.submitting : t.submit}
          </button>

          <p className="text-[11px] text-gray-500 leading-relaxed text-center">{t.privacy}</p>
        </form>
      </div>
    </div>
  );
}
