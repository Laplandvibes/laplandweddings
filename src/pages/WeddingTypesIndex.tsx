
import PageHero from '../components/PageHero';
import ImgCredit from '../components/ImgCredit';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { STATIC_META } from '../lib/staticMeta.mjs';
import { useLang } from '../i18n/LangContext';
import { weddingTypes } from '../data/weddingTypes';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'imageAlt', Localized<string>> = {
  imageAlt: {
    en: 'The ice hall of Kemi SnowCastle in blue light',
    fi: 'Kemin LumiLinnan jääsali sinisessä valossa',
    de: 'Der Eissaal des SnowCastle in Kemi in blauem Licht',
    ja: '青い光に照らされたケミのスノーキャッスルの氷のホール',
    es: 'La sala de hielo del SnowCastle de Kemi bajo luz azul',
    'pt-BR': 'O salão de gelo do SnowCastle de Kemi sob luz azul',
    'zh-CN': '蓝光下的凯米雪堡冰厅',
    ko: '푸른 조명 속 케미 눈성의 얼음 홀',
    fr: 'La salle de glace du SnowCastle de Kemi sous une lumière bleue',
    it: 'La sala di ghiaccio dello SnowCastle di Kemi in luce blu',
    nl: 'De ijszaal van het SnowCastle in Kemi in blauw licht',
    sv: 'Issalen i Kemis snöslott i blått ljus',
  },
};

export default function WeddingTypesIndex() {
  const { lang, dataLang, tr } = useLang();
  return (
    <>
      <SEO
        title={STATIC_META['/wedding-types'][lang].title}
        description={STATIC_META['/wedding-types'][lang].description}
        path="/wedding-types"
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowTypes', lang)}
        title={tr.types.indexTitle}
        subtitle={tr.types.indexIntro}
        image="/images/heroes/kemi-lumilinna-jaasali.jpg"
        credit={{ name: 'Art of Backpacking', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:SnowCastle,_Kemi,_Finland.jpg', cropped: true, caption: {
        en: 'Pictured: Kemi SnowCastle',
        fi: 'Kuvassa Kemin LumiLinna',
        de: 'Im Bild: SnowCastle Kemi',
        ja: '写真：ケミのスノーキャッスル',
        es: 'En la imagen: SnowCastle de Kemi',
        'pt-BR': 'Na foto: SnowCastle de Kemi',
        'zh-CN': '图为凯米雪堡',
        ko: '사진: 케미 눈성',
        fr: 'Sur la photo : SnowCastle de Kemi',
        it: 'Nella foto: SnowCastle di Kemi',
        nl: 'Op de foto: SnowCastle Kemi',
        sv: 'På bilden: Kemis snöslott',
      } }}
        lang={lang}
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {weddingTypes.map((wt) => (
            <L
              key={wt.slug}
              to={`/wedding-types/${wt.slug}`}
              className="group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <ImgCredit credit={wt.heroCredit} lang={lang} plain />
                <img
                  src={wt.heroImage}
                  alt={wt.name[dataLang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 decoding="async" width="800" height="600"/>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Price range removed 2026-07-29 (Vesa): the figures were
                    invented and the units were inconsistent between cards. */}
                <div className="mb-2">
                  <h3 className="font-heading text-2xl text-white tracking-wide group-hover:text-rose transition-colors min-w-0 break-words">{wt.name[dataLang]}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{wt.tagline[dataLang]}</p>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{wt.description[dataLang]}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                  <span>{wt.bestSeason[dataLang]}</span>
                  <span>{pickLocalized(wt.capacity, lang)}</span>
                </div>
              </div>
            </L>
          ))}
        </div>
      </Section>
    </>
  );
}
