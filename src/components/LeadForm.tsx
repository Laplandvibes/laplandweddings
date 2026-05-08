import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { useLang } from '../i18n/LangContext';
import { weddingTypes } from '../data/weddingTypes';
import { locations } from '../data/locations';

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
  const { lang, tr } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data });
      if (!res.ok) throw new Error('failed');
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!json.ok) throw new Error(json.error || 'failed');
      setSubmitted(true);
      // Cleanup blob URLs
      files.forEach((f) => URL.revokeObjectURL(f.url));
      setFiles([]);
    } catch {
      // Fallback: open user's mail client without attachments
      const payload: Record<string, string> = {};
      data.forEach((v, k) => {
        if (typeof v === 'string') payload[k] = v;
      });
      const subject = `Wedding enquiry — ${payload.weddingType || 'open'} (${payload.location || 'open'})`;
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
        `Budget: ${payload.budget || ''}`,
        `Language preference: ${lang}`,
        files.length ? `Attachments: ${files.length} file(s) — please send separately to ${LEAD_INBOX}` : '',
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
        <p className="text-2xl font-heading text-white mb-2">{tr.form.success}</p>
        <p className="text-gray-400 text-sm">{LEAD_INBOX}</p>
      </div>
    );
  }

  const t1 = 'block text-sm font-medium text-gray-200 mb-1.5';
  // 16px input font prevents iOS auto-zoom; min-h-12 = 48px target for tap area
  const t2 = 'w-full min-h-[48px] rounded-lg bg-night-light border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose px-3.5 py-2.5 text-base text-white placeholder-gray-500 outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-night-light/60 border border-white/10 rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5">
      {/* Honeypot — bots fill this, humans do not */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="yourName" className={t1}>{tr.form.yourName} *</label>
          <input id="yourName" name="yourName" required className={t2} />
        </div>
        <div>
          <label htmlFor="partnerName" className={t1}>{tr.form.partnerName}</label>
          <input id="partnerName" name="partnerName" className={t2} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={t1}>{tr.form.email} *</label>
          <input id="email" name="email" type="email" required className={t2} />
        </div>
        <div>
          <label htmlFor="phone" className={t1}>{tr.form.phone}</label>
          <input id="phone" name="phone" type="tel" className={t2} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className={t1}>{tr.form.country}</label>
          <input id="country" name="country" placeholder={lang === 'fi' ? 'esim. Suomi' : 'e.g. Finland'} className={t2} />
        </div>
        <div>
          <label htmlFor="guests" className={t1}>{tr.form.guests}</label>
          <input id="guests" name="guests" type="number" min="0" max="500" placeholder="0" className={t2} />
          <p className="text-xs text-gray-500 mt-1">{tr.form.guestsHelp}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredDate" className={t1}>{tr.form.preferredDate}</label>
          <input id="preferredDate" name="preferredDate" placeholder={lang === 'fi' ? 'esim. helmikuu 2027' : 'e.g. February 2027'} className={t2} />
          <p className="text-xs text-gray-500 mt-1">{tr.form.preferredDateHelp}</p>
        </div>
        <div>
          <label htmlFor="flexibility" className={t1}>{tr.form.flexibility}</label>
          <select id="flexibility" name="flexibility" className={t2} defaultValue="flexMonth">
            <option value="flexFixed">{tr.form.flexFixed}</option>
            <option value="flexWeek">{tr.form.flexWeek}</option>
            <option value="flexMonth">{tr.form.flexMonth}</option>
            <option value="flexAny">{tr.form.flexAny}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="weddingType" className={t1}>{tr.form.weddingType}</label>
          <select id="weddingType" name="weddingType" className={t2} defaultValue={presetWeddingType || ''}>
            <option value="">{tr.form.noPreference}</option>
            {weddingTypes.map((w) => (
              <option key={w.slug} value={w.slug}>{w.name[lang]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className={t1}>{tr.form.location}</label>
          <select id="location" name="location" className={t2} defaultValue={presetLocation || ''}>
            <option value="">{tr.form.noPreference}</option>
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>{l.name[lang]}</option>
            ))}
          </select>
        </div>
      </div>

      {presetVenue && <input type="hidden" name="venue" value={presetVenue} />}

      <div>
        <label htmlFor="budget" className={t1}>{tr.form.budget}</label>
        <select id="budget" name="budget" className={t2} defaultValue="budget2">
          <option value="budget1">{tr.form.budget1}</option>
          <option value="budget2">{tr.form.budget2}</option>
          <option value="budget3">{tr.form.budget3}</option>
          <option value="budget4">{tr.form.budget4}</option>
          <option value="budget5">{tr.form.budget5}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={t1}>{tr.form.message}</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={t2}
          placeholder={tr.form.messagePlaceholder}
        />
      </div>

      {/* Inspiration attachments */}
      <div>
        <label className={t1}>{tr.form.attachments}</label>
        <p className="text-xs text-gray-500 mb-2">{tr.form.attachmentsHelp}</p>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed transition-colors px-5 py-8 text-center ${dragOver ? 'border-rose bg-rose/10' : 'border-white/15 hover:border-white/30 bg-night-light/40'}`}
        >
          <p className="text-sm font-medium text-gray-200">{tr.form.attachmentsDrop}</p>
          <p className="text-xs text-gray-500 mt-1">{tr.form.attachmentsBrowse}</p>
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
              <li key={i} className="relative bg-night-light/60 border border-white/10 rounded-lg overflow-hidden">
                <div className="aspect-square bg-night flex items-center justify-center overflow-hidden">
                  {f.isVideo ? (
                    <video src={f.url} className="w-full h-full object-cover" muted playsInline />
                  ) : (
                    <img src={f.url} alt={f.file.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-2 flex items-center justify-between gap-1">
                  <span className="text-[10px] text-gray-400 truncate flex-1" title={f.file.name}>
                    {formatBytes(f.file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="text-[10px] text-rose hover:underline px-1"
                  >
                    {tr.form.attachmentsRemove}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-400">
        <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 rounded border-white/20 bg-night-light text-rose focus:ring-rose" />
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
