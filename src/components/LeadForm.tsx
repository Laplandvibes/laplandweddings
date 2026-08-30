import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import { weddingTypes } from '../data/weddingTypes';
import { locations } from '../data/locations';
import { pickLocalized, type Localized } from '../data/localized';

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

const L11: Record<'countryPlaceholder' | 'datePlaceholder' | 'venueWish' | 'venueWishPlaceholder' | 'venueWishHelp', Localized<string>> = {
  venueWish: {
    en: 'A venue you already have in mind',
    fi: 'Onko jokin paikka jo mielessänne',
    de: 'Ein Ort, den Sie bereits im Sinn haben',
    ja: 'すでに希望されている会場',
    es: 'Un lugar que ya tengáis en mente',
    'pt-BR': 'Um local que vocês já tenham em mente',
    'zh-CN': '您心中已有的场地',
    ko: '이미 마음에 둔 장소',
    fr: 'Un lieu que vous avez déjà en tête',
    it: 'Una location che ha già in mente',
    nl: 'Een locatie die u al op het oog heeft',
    sv: 'En plats ni redan har i tankarna',
  },
  venueWishPlaceholder: {
    en: 'e.g. Arctic SnowHotel, or a place not listed here',
    fi: 'esim. Arctic SnowHotel, tai paikka jota ei ole listassa',
    de: 'z. B. Arctic SnowHotel oder ein Ort, der hier nicht steht',
    ja: '例：Arctic SnowHotel、または掲載のない会場',
    es: 'p. ej. Arctic SnowHotel, o un lugar que no aparece aquí',
    'pt-BR': 'ex.: Arctic SnowHotel, ou um local que não está na lista',
    'zh-CN': '例如：Arctic SnowHotel，或未列在此处的场地',
    ko: '예: Arctic SnowHotel, 또는 목록에 없는 장소',
    fr: 'p. ex. Arctic SnowHotel, ou un lieu absent de cette liste',
    it: 'es. Arctic SnowHotel, o un luogo non presente in elenco',
    nl: 'bijv. Arctic SnowHotel, of een plek die hier niet staat',
    sv: 't.ex. Arctic SnowHotel, eller en plats som inte finns här',
  },
  venueWishHelp: {
    en: 'If you name a place, it goes to the planners exactly as you wrote it. Nobody will talk you into somewhere else.',
    fi: 'Jos nimeätte paikan, se menee suunnittelijoille juuri niin kuin sen kirjoititte. Kukaan ei ala tyrkyttää toista paikkaa.',
    de: 'Wenn Sie einen Ort nennen, geht er genau so an die Hochzeitsplaner, wie Sie ihn geschrieben haben. Niemand wird Ihnen etwas anderes einreden.',
    ja: '会場名をご記入いただくと、書かれたとおりの形でプランナーに伝わります。別の会場を勧められることはありません。',
    ko: '장소를 적어 주시면 쓰신 그대로 플래너에게 전달됩니다. 다른 곳을 권유받는 일은 없습니다.',
    es: 'Si indicáis un lugar, llega a los organizadores tal y como lo escribisteis. Nadie os intentará convencer de otro sitio.',
    'pt-BR': 'Se indicarem um local, ele chega aos organizadores exatamente como foi escrito. Ninguém vai tentar convencê-los de outro lugar.',
    'zh-CN': '若您写下场地名称，它会原样转达给策划师。不会有人劝您改选别处。',
    fr: 'Si vous nommez un lieu, il est transmis aux wedding planners tel que vous l’avez écrit. Personne ne tentera de vous en proposer un autre.',
    it: 'Se indica una location, arriva ai wedding planner esattamente come l’ha scritta. Nessuno proverà a dirottarLa altrove.',
    nl: 'Noemt u een locatie, dan gaat die precies zo naar de weddingplanners als u hem opschreef. Niemand praat u een andere plek aan.',
    sv: 'Om ni namnger en plats går den vidare till bröllopsplanerarna precis som ni skrev den. Ingen försöker övertala er till något annat.',
  },
  countryPlaceholder: {
    en: 'e.g. Finland',
    fi: 'esim. Suomi',
    de: 'z. B. Finnland',
    ja: '例：フィンランド',
    es: 'p. ej. Finlandia',
    'pt-BR': 'ex.: Finlândia',
    'zh-CN': '例如：芬兰',
    ko: '예: 핀란드',
    fr: 'p. ex. Finlande',
    it: 'es. Finlandia',
    nl: 'bijv. Finland', sv: 't.ex. Finland',
  },
  datePlaceholder: {
    en: 'e.g. February 2027',
    fi: 'esim. helmikuu 2027',
    de: 'z. B. Februar 2027',
    ja: '例：2027年2月',
    es: 'p. ej. febrero de 2027',
    'pt-BR': 'ex.: fevereiro de 2027',
    'zh-CN': '例如：2027 年 2 月',
    ko: '예: 2027년 2월',
    fr: 'p. ex. février 2027',
    it: 'es. febbraio 2027',
    nl: 'bijv. februari 2027', sv: 't.ex. februari 2027',
  },
};

interface LeadFormProps {
  presetWeddingType?: string;
  presetLocation?: string;
  presetVenue?: string;
}

const LEAD_INBOX = 'info@laplandvibes.com';
const ENDPOINT = '/api/lead';

const MAX_FILES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;     // 5 MB
const MAX_VIDEO_SIZE = 25 * 1024 * 1024;    // 25 MB
const MAX_TOTAL_SIZE = 38 * 1024 * 1024;    // 38 MB

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
  'video/mp4', 'video/quicktime', 'video/webm',
];

interface AttachedFile {
  file: File;
  url: string;
  isVideo: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} kB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function LeadForm({ presetWeddingType, presetLocation, presetVenue }: LeadFormProps) {
  const { lang, dataLang, tr } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // [LV-FUNNEL] view = lomake vieritetty näkyviin (kerran), start = 1. fokus,
  // blocked kerran per submit-yritys (natiivi invalid laukeaa per kenttä).
  const funnelData = { lang };
  const formRef = useRef<HTMLFormElement | null>(null);
  const startTracked = useRef(false);
  const blockedTracked = useRef(false);
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        track('quote_view', funnelData);
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
    track('quote_start', funnelData);
  };

  function addFiles(newFiles: FileList | File[]) {
    setError(null);
    const incoming = Array.from(newFiles);
    if (files.length + incoming.length > MAX_FILES) {
      setError(tr.form.attachmentsTooMany);
      return;
    }
    const additions: AttachedFile[] = [];
    let totalSize = files.reduce((acc, f) => acc + f.file.size, 0);
    for (const file of incoming) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(tr.form.attachmentsBadType);
        return;
      }
      const isVideo = file.type.startsWith('video/');
      const limit = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
      if (file.size > limit) {
        setError(tr.form.attachmentsTooBig);
        return;
      }
      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        setError(tr.form.attachmentsTotalTooBig);
        return;
      }
      additions.push({ file, url: URL.createObjectURL(file), isVideo });
    }
    setFiles((prev) => [...prev, ...additions]);
  }

  function removeFile(idx: number) {
    setFiles((prev) => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== idx);
    });
  }

  function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    // Replace File entries from input[type=file] with our managed files (so we can validate)
    data.delete('files');
    for (const f of files) data.append('files', f.file, f.file.name);
    data.set('lang', lang);

    track('quote_submit', funnelData);
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data });
      if (!res.ok) throw new Error('failed');
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!json.ok) throw new Error(json.error || 'failed');
      setSubmitted(true);
      track('quote_success', funnelData);
      // Cleanup blob URLs
      files.forEach((f) => URL.revokeObjectURL(f.url));
      setFiles([]);
    } catch {
      track('quote_error', funnelData);
      // Fallback: open user's mail client without attachments
      const payload: Record<string, string> = {};
      data.forEach((v, k) => {
        if (typeof v === 'string') payload[k] = v;
      });
      const subject = `Wedding enquiry: ${payload.weddingType || 'open'} (${payload.location || 'open'})`;
      const lines = [
        `Name: ${payload.yourName || ''}`,
        `Partner: ${payload.partnerName || ''}`,
        `Email: ${payload.email || ''}`,
        `Phone: ${payload.phone || ''}`,
        `Country: ${payload.country || ''}`,
        `Guests: ${payload.guests || ''}`,
        `Preferred date: ${payload.preferredDate || ''}`,
        `Date flexibility: ${payload.flexibility || ''}`,
        `Wedding type: ${payload.weddingType || ''}`,
        `Region: ${payload.location || ''}`,
        payload.venue ? `Venue interest: ${payload.venue}` : '',
        payload.ceremonyType ? `Ceremony: ${payload.ceremonyType}` : '',
        payload.accommodation ? `Accommodation in budget: ${payload.accommodation}` : '',
        `Budget: ${payload.budget || ''}`,
        `Language preference: ${lang}`,
        files.length ? `Attachments: ${files.length} file(s), please send separately to ${LEAD_INBOX}` : '',
        '',
        'Message:',
        payload.message || '',
      ].filter(Boolean).join('\n');
      const mailto = `mailto:${LEAD_INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
      window.location.href = mailto;
      setError(tr.form.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-night-light/60 border border-aurora-green/40 rounded-2xl p-8 text-center">
        <p className="text-2xl font-heading tracking-wide text-white mb-2">{tr.form.success}</p>
        <p className="text-gray-400 text-sm">{LEAD_INBOX}</p>
      </div>
    );
  }

  /* The form card is always a cream surface, so `bg-night-light` fields ended up
     the same colour as the card they sit on and `border-white/10` was invisible
     against it: the inputs read as flat beige rectangles with no edges (Vesa
     2026-07-29: "lomakkeen kontrasti ja tyyli ei ole kyllä houkutteleva").
     Fields are now explicitly white with a warm visible border, so they look
     like something you can type into. */
  const t1 = 'block text-sm font-semibold text-gray-200 mb-1.5';
  // 16px input font prevents iOS auto-zoom; min-h-12 = 48px target for tap area
  const t2 =
    'w-full min-h-[48px] rounded-lg bg-white border border-[#DDD0C4] hover:border-[#C4B2A2] ' +
    'focus:border-[#C9466A] focus:ring-2 focus:ring-[#C9466A]/25 px-3.5 py-2.5 text-base ' +
    'text-[#1F1612] placeholder-[#8C7F74] outline-none transition-colors';
  // Native <select>s: hide the OS arrow and draw our own chevron in the field.
  const t2select = `${t2} appearance-none pr-10`;
  const selectChevron = (
    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C7F74]" aria-hidden="true" />
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      // [LV-FUNNEL] required-kentät estävät submitin natiivisti ennen
      // handleSubmitia — invalid-capture kertoo MIKÄ kenttä pysäytti.
      onInvalidCapture={(e) => {
        if (blockedTracked.current) return;
        blockedTracked.current = true;
        window.setTimeout(() => { blockedTracked.current = false; }, 400);
        const t = e.target as HTMLInputElement;
        track('quote_blocked', { ...funnelData, reason: t.name || t.id || 'field' });
      }}
      className="max-w-3xl mx-auto bg-night-light/60 border border-white/10 rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5"
    >
      {/* Honeypot — bots fill this, humans do not. Renamed from "company":
          browser/password-manager autofill fills "company" even when hidden,
          which silently dropped real couples' enquiries. */}
      <input
        type="text"
        name="lp_hpot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        data-1p-ignore="true"
        data-lpignore="true"
        data-form-type="other"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="yourName" className={t1}>{tr.form.yourName} *</label>
          <input id="yourName" name="yourName" required onFocus={trackStart} className={t2} />
        </div>
        <div>
          <label htmlFor="partnerName" className={t1}>{tr.form.partnerName}</label>
          <input id="partnerName" name="partnerName" onFocus={trackStart} className={t2} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={t1}>{tr.form.email} *</label>
          <input id="email" name="email" type="email" required onFocus={trackStart} className={t2} />
        </div>
        <div>
          <label htmlFor="phone" className={t1}>{tr.form.phone}</label>
          <input id="phone" name="phone" type="tel" onFocus={trackStart} className={t2} />
          <p className="text-xs text-gray-500 mt-1">{tr.form.phoneHelp}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className={t1}>{tr.form.country}</label>
          <input id="country" name="country" placeholder={pickLocalized(L11.countryPlaceholder, lang)} onFocus={trackStart} className={t2} />
        </div>
        <div>
          <label htmlFor="guests" className={t1}>{tr.form.guests}</label>
          <input id="guests" name="guests" type="number" min="0" max="500" placeholder="0" onFocus={trackStart} className={t2} />
          <p className="text-xs text-gray-500 mt-1">{tr.form.guestsHelp}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredDate" className={t1}>{tr.form.preferredDate}</label>
          <input id="preferredDate" name="preferredDate" placeholder={pickLocalized(L11.datePlaceholder, lang)} onFocus={trackStart} className={t2} />
          <p className="text-xs text-gray-500 mt-1">{tr.form.preferredDateHelp}</p>
        </div>
        <div>
          <label htmlFor="flexibility" className={t1}>{tr.form.flexibility}</label>
          <div className="relative">
            <select id="flexibility" name="flexibility" onFocus={trackStart} className={t2select} defaultValue="flexMonth">
              <option value="flexFixed">{tr.form.flexFixed}</option>
              <option value="flexWeek">{tr.form.flexWeek}</option>
              <option value="flexMonth">{tr.form.flexMonth}</option>
              <option value="flexAny">{tr.form.flexAny}</option>
            </select>
            {selectChevron}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="weddingType" className={t1}>{tr.form.weddingType}</label>
          <div className="relative">
            <select id="weddingType" name="weddingType" onFocus={trackStart} className={t2select} defaultValue={presetWeddingType || ''}>
              <option value="">{tr.form.noPreference}</option>
              {weddingTypes.map((w) => (
                <option key={w.slug} value={w.slug}>{w.name[dataLang]}</option>
              ))}
            </select>
            {selectChevron}
          </div>
        </div>
        <div>
          <label htmlFor="location" className={t1}>{tr.form.location}</label>
          <div className="relative">
            <select id="location" name="location" onFocus={trackStart} className={t2select} defaultValue={presetLocation || ''}>
              <option value="">{tr.form.noPreference}</option>
              {locations.map((l) => (
                <option key={l.slug} value={l.slug}>{l.name[dataLang]}</option>
              ))}
            </select>
            {selectChevron}
          </div>
        </div>
      </div>

      {/* Venue wish. Used to be a hidden input that only existed on a venue
          page, so a couple arriving from the venue index or the home page had
          nowhere to name the place they had already fallen for, and the lead
          reached the planners without it. Vesa 2026-07-28: "jos asiakas haluaa
          johonkin tiettyyn paikkaan niin sekin on väärin jos ehdotamme sitten
          toista paikkaa." Now always visible, prefilled when we know it, and
          carried verbatim into the lead and the qualification email. */}
      <div>
        <label htmlFor="venue" className={t1}>{pickLocalized(L11.venueWish, lang)}</label>
        <input
          id="venue"
          name="venue"
          defaultValue={presetVenue || ''}
          placeholder={pickLocalized(L11.venueWishPlaceholder, lang)}
          onFocus={trackStart}
          className={t2}
        />
        <p className="text-xs text-gray-500 mt-1">{pickLocalized(L11.venueWishHelp, lang)}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ceremonyType" className={t1}>{tr.form.ceremonyType}</label>
          <div className="relative">
            <select id="ceremonyType" name="ceremonyType" onFocus={trackStart} className={t2select} defaultValue="">
              <option value="">{tr.form.noPreference}</option>
              <option value="legal">{tr.form.ceremonyLegal}</option>
              <option value="symbolic">{tr.form.ceremonySymbolic}</option>
              <option value="unsure">{tr.form.ceremonyUnsure}</option>
            </select>
            {selectChevron}
          </div>
          <p className="text-xs text-gray-500 mt-1">{tr.form.ceremonyHelp}</p>
        </div>
        <div>
          <label htmlFor="accommodation" className={t1}>{tr.form.accommodation}</label>
          <div className="relative">
            <select id="accommodation" name="accommodation" onFocus={trackStart} className={t2select} defaultValue="">
              <option value="">{tr.form.noPreference}</option>
              <option value="include">{tr.form.accInclude}</option>
              <option value="separate">{tr.form.accSeparate}</option>
              <option value="unsure">{tr.form.accUnsure}</option>
            </select>
            {selectChevron}
          </div>
          <p className="text-xs text-gray-500 mt-1">{tr.form.accommodationHelp}</p>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={t1}>{tr.form.budget}</label>
        <div className="relative">
          <select id="budget" name="budget" onFocus={trackStart} className={t2select} defaultValue="budget2">
            <option value="budget1">{tr.form.budget1}</option>
            <option value="budget2">{tr.form.budget2}</option>
            <option value="budget3">{tr.form.budget3}</option>
            <option value="budget4">{tr.form.budget4}</option>
            <option value="budget5">{tr.form.budget5}</option>
          </select>
          {selectChevron}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={t1}>{tr.form.message}</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          onFocus={trackStart}
          className={t2}
          placeholder={tr.form.messagePlaceholder}
        />
      </div>

      {/* Inspiration attachments */}
      <div>
        <label className={t1}>{tr.form.attachments}</label>
        <p className="text-xs text-gray-400 mb-2">{tr.form.attachmentsHelp}</p>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed transition-colors px-5 py-8 text-center"
          style={{
            background: dragOver ? 'rgba(201,70,106,0.12)' : '#F8EFE5',
            borderColor: dragOver ? '#C9466A' : '#DCCEC0',
          }}
        >
          <p className="text-sm font-semibold" style={{ color: '#1F1612' }}>{tr.form.attachmentsDrop}</p>
          <p className="text-xs mt-1" style={{ color: '#5A4F48' }}>{tr.form.attachmentsBrowse}</p>
          <input
            ref={fileInputRef}
            type="file"
            name="files"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,video/webm"
            onChange={onFileInputChange}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {files.map((f, i) => (
              <li key={i} className="relative rounded-lg overflow-hidden" style={{ background: '#F8EFE5', border: '1px solid #DCCEC0' }}>
                <div className="aspect-square flex items-center justify-center overflow-hidden" style={{ background: '#EFE2D6' }}>
                  {f.isVideo ? (
                    <video src={f.url} className="w-full h-full object-cover" muted playsInline />
                  ) : (
                    <img src={f.url} alt={f.file.name} className="w-full h-full object-cover"  loading="lazy" decoding="async" width="800" height="600"/>
                  )}
                </div>
                <div className="p-2 flex items-center justify-between gap-1">
                  <span className="text-[10px] truncate flex-1" title={f.file.name} style={{ color: '#5A4F48' }}>
                    {formatBytes(f.file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="text-[10px] hover:underline px-1 font-semibold"
                    style={{ color: '#C9466A' }}
                  >
                    {tr.form.attachmentsRemove}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm" style={{ color: '#1F1612' }}>
        <input type="checkbox" name="consent" required onFocus={trackStart} className="mt-1 w-4 h-4 rounded text-rose focus:ring-rose" style={{ accentColor: '#C9466A' }} />
        <span>{tr.form.consent}</span>
      </label>

      {error && <p className="text-rose text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-rose hover:bg-pink disabled:opacity-60 text-white font-semibold rounded-full transition-colors shadow-lg shadow-rose/30"
      >
        {submitting ? tr.form.submitting : tr.form.submit}
      </button>
    </form>
  );
}
