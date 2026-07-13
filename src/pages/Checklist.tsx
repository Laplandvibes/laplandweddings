import { useEffect } from 'react';
import { Printer } from 'lucide-react';
import SEO from '../components/SEO';
import ChecklistGate from '../components/ChecklistGate';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';

/**
 * Printable DVV Marriage Licence Checklist for Foreign Couples Marrying in Lapland.
 *
 * Lead-magnet content: a one-page checklist couples can print or save as PDF
 * via browser print. Optimised print CSS injected via <style> below.
 */

interface ChecklistItem {
  sec: 'A' | 'B' | 'C' | 'D';
  do: string;
  why: string;
  link?: { url: string; label: string };
}

interface ChecklistContent {
  seoTitle: string;
  seoDesc: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  printBtn: string;
  intro: string;
  sectionA: string;
  sectionB: string;
  sectionC: string;
  sectionD: string;
  printNote: string;
  footerNote: string;
  items: ChecklistItem[];
}

// The DVV link (URL + label) points to the official English DVV page and is kept
// verbatim across locales — it is a proper-noun reference to a government resource.
const DVV_LINK = { url: 'https://dvv.fi/en/examination-of-impediments-to-marriage', label: 'DVV — Examination of impediments' };

const CONTENT: Localized<ChecklistContent> = {
  en: {
    seoTitle: 'DVV Wedding Checklist for Foreign Couples | LaplandWeddings',
    seoDesc: 'A one-page checklist for foreign couples planning to marry in Finnish Lapland. DVV paperwork, witnesses, officiant — print as PDF.',
    eyebrow: 'Lead magnet',
    title: 'Marrying in Lapland — DVV checklist for foreign couples',
    subtitle: 'A one-page checklist covering every document and step required when a foreign couple wants to marry in Finnish Lapland. Print or save as PDF for your travel folder.',
    printBtn: 'Print or save as PDF',
    intro: 'Finland makes foreign weddings simple — paperwork takes 3–5 weeks via the DVV. Begin the process at least 2 months before the wedding.',
    sectionA: 'A · 8 weeks before',
    sectionB: 'B · 4–6 weeks before',
    sectionC: 'C · The wedding week',
    sectionD: 'D · After the wedding',
    printNote: 'This page is optimised for A4 print. Hit Print or save as PDF.',
    footerNote: 'Part of the LaplandVibes network · info@laplandvibes.com · Updated 2026',
    items: [
      { sec: 'A', do: 'Request the Examination of Impediments from DVV', why: 'Needed before the ceremony can be performed. Free of charge.', link: DVV_LINK },
      { sec: 'A', do: 'Request a Certificate of No Impediment from your home country', why: 'Required in most countries. Include apostille and a sworn translation if the document is not in English, Finnish or Swedish.' },
      { sec: 'A', do: 'Engage a Lapland wedding planner or venue', why: 'They confirm the officiant, witnesses and paperwork plan.' },
      { sec: 'B', do: 'Send the CNI + impediments examination to DVV', why: 'DVV confirms you may marry. 3–5 weeks for foreign couples.' },
      { sec: 'B', do: 'Confirm the officiant and their language skills', why: 'An English-speaking officiant is normally arranged by your planner.' },
      { sec: 'B', do: 'Secure 2 witnesses', why: 'Finnish law requires exactly two. They do not need to be Finnish. Most venues arrange them on site.' },
      { sec: 'C', do: 'Confirm airport transfers and guest accommodation', why: 'Lapland cold can surprise — a warm arrival point matters for guests.' },
      { sec: 'C', do: 'Confirm the ceremony timing with the venue', why: 'Snow chapels operate at –3 to –7 °C — keep ceremonies 15–30 min.' },
      { sec: 'D', do: 'Collect 2 official marriage certificates in English', why: 'Required for home-country registration. From DVV.' },
      { sec: 'D', do: 'Get an apostille from the DVV', why: 'Required for recognition in your home country.' },
      { sec: 'D', do: 'Register the marriage in your home country', why: 'In EU countries usually within a month. After this the marriage is globally valid.' },
    ],
  },
  fi: {
    seoTitle: 'DVV-tarkistuslista — vihille Lapissa | LaplandWeddings',
    seoDesc: 'Yksisivuinen tarkistuslista ulkomaalaiselle pareille jotka aikovat vihille Suomen Lapissa. DVV-paperit, todistajat, vihkijä — printtaa PDF:nä.',
    eyebrow: 'Lead magnet',
    title: 'Vihille Lapissa — DVV-tarkistuslista ulkomaalaisille pareille',
    subtitle: 'Tämä yksisivuinen tarkistuslista käy läpi kaikki paperit ja askeleet, jotka tarvitaan kun ulkomaalainen pari haluaa vihille Suomen Lapissa. Printtaa tai tallenna PDF:nä matkalle.',
    printBtn: 'Tulosta tai tallenna PDF',
    intro: 'Suomi sallii ulkomaalaisten avioliiton helposti — paperit kestävät 3–5 viikkoa DVV:n kautta. Aloita prosessi vähintään 2 kuukautta ennen vihkimistä.',
    sectionA: 'A · Aloitus 8 viikkoa ennen',
    sectionB: 'B · 4–6 viikkoa ennen',
    sectionC: 'C · Vihkimisviikko',
    sectionD: 'D · Vihkimisen jälkeen',
    printNote: 'Tämä sivu on optimoitu tulostettavaksi A4-arkille. Paina Tulosta tai tallenna PDF.',
    footerNote: 'Osa LaplandVibes-verkostoa · info@laplandvibes.com · Päivitetty 2026',
    items: [
      { sec: 'A', do: 'Hae avioliiton esteiden tutkinta DVV:ltä', why: 'Tarvitset tämän jotta vihkimys voidaan toimittaa. Maksuton.', link: DVV_LINK },
      { sec: 'A', do: 'Pyydä Certificate of No Impediment kotimaastasi', why: 'Useimmissa maissa vaadittavat lisäpaperit. Apostille-leima ja valallinen käännös, jos kieli ei ole englanti, suomi tai ruotsi.' },
      { sec: 'A', do: 'Ota yhteyttä hääsuunnittelijaan tai venueen', why: 'He varmistavat vihkijän, todistajat ja paperisuunnitelman.' },
      { sec: 'B', do: 'Lähetä CNI + esteiden tutkinta DVV:lle', why: 'DVV vahvistaa että voitte vihkiä. 3–5 viikkoa ulkomaalaisille.' },
      { sec: 'B', do: 'Vahvista vihkijä ja hänen kielitaito', why: 'Englanninkielinen vihkijä järjestyy yleensä suunnittelijan kautta.' },
      { sec: 'B', do: 'Varmista 2 todistajaa', why: 'Suomen laki vaatii kaksi. Ei tarvitse olla suomalaisia. Useimmat venuet järjestävät paikan päältä.' },
      { sec: 'C', do: 'Tarkista lentokenttäkuljetukset ja vieraiden majoitukset', why: 'Lapin pakkanen voi yllättää — vieraille lämmin saapumispiste tärkeä.' },
      { sec: 'C', do: 'Vahvista vihkimys-aikataulu venuelta', why: 'Lumikappelit ovat lämpötilassa -3…-7 °C — seremoniat 15–30 min.' },
      { sec: 'D', do: 'Hae 2 virallista vihkimistodistusta englanniksi', why: 'Tarvitaan kotimaan rekisteröintiin. DVV:ltä.' },
      { sec: 'D', do: 'Apostille-leima DVV:llä', why: 'Tunnustaa avioliiton kotimaassasi.' },
      { sec: 'D', do: 'Rekisteröi avioliitto kotimaassasi', why: 'EU-maissa yleensä kuukauden sisällä. Tämän jälkeen avioliitto pätee globaalisti.' },
    ],
  },
  de: {
    seoTitle: 'DVV-Checkliste für ausländische Paare | LaplandWeddings',
    seoDesc: 'Eine einseitige Checkliste für ausländische Paare, die im finnischen Lappland heiraten möchten. DVV-Unterlagen, Trauzeugen, Trauredner — als PDF drucken.',
    eyebrow: 'Lead-Magnet',
    title: 'Heiraten in Lappland — DVV-Checkliste für ausländische Paare',
    subtitle: 'Eine einseitige Checkliste mit allen Dokumenten und Schritten, die ein ausländisches Paar für eine Hochzeit im finnischen Lappland benötigt. Drucken oder als PDF für Ihre Reiseunterlagen speichern.',
    printBtn: 'Drucken oder als PDF speichern',
    intro: 'Finnland macht Hochzeiten für Ausländer einfach — der Papierkram dauert über die DVV 3–5 Wochen. Beginnen Sie mindestens 2 Monate vor der Hochzeit.',
    sectionA: 'A · 8 Wochen vorher',
    sectionB: 'B · 4–6 Wochen vorher',
    sectionC: 'C · Die Hochzeitswoche',
    sectionD: 'D · Nach der Hochzeit',
    printNote: 'Diese Seite ist für den A4-Druck optimiert. Klicken Sie auf Drucken oder speichern Sie sie als PDF.',
    footerNote: 'Teil des LaplandVibes-Netzwerks · info@laplandvibes.com · Aktualisiert 2026',
    items: [
      { sec: 'A', do: 'Ehefähigkeitsprüfung bei der DVV beantragen', why: 'Erforderlich, bevor die Trauung durchgeführt werden kann. Kostenlos.', link: DVV_LINK },
      { sec: 'A', do: 'Ehefähigkeitszeugnis aus dem Heimatland anfordern', why: 'In den meisten Ländern erforderlich. Mit Apostille und beglaubigter Übersetzung, falls das Dokument nicht auf Englisch, Finnisch oder Schwedisch ist.' },
      { sec: 'A', do: 'Hochzeitsplaner oder Location in Lappland beauftragen', why: 'Sie bestätigen Trauredner, Trauzeugen und den Plan für die Unterlagen.' },
      { sec: 'B', do: 'Ehefähigkeitszeugnis + Ehefähigkeitsprüfung an die DVV senden', why: 'Die DVV bestätigt, dass Sie heiraten dürfen. 3–5 Wochen für ausländische Paare.' },
      { sec: 'B', do: 'Trauredner und dessen Sprachkenntnisse bestätigen', why: 'Ein englischsprachiger Trauredner wird in der Regel über Ihren Planer organisiert.' },
      { sec: 'B', do: '2 Trauzeugen sicherstellen', why: 'Das finnische Recht verlangt genau zwei. Sie müssen nicht finnisch sein. Die meisten Locations stellen sie vor Ort.' },
      { sec: 'C', do: 'Flughafentransfers und Gästeunterkünfte bestätigen', why: 'Die Kälte Lapplands kann überraschen — ein warmer Ankunftsort ist für Gäste wichtig.' },
      { sec: 'C', do: 'Zeitplan der Zeremonie mit der Location bestätigen', why: 'Schneekapellen liegen bei –3 bis –7 °C — halten Sie Zeremonien auf 15–30 Min.' },
      { sec: 'D', do: '2 offizielle Heiratsurkunden auf Englisch besorgen', why: 'Erforderlich für die Registrierung im Heimatland. Von der DVV.' },
      { sec: 'D', do: 'Apostille von der DVV einholen', why: 'Erforderlich für die Anerkennung in Ihrem Heimatland.' },
      { sec: 'D', do: 'Die Ehe in Ihrem Heimatland registrieren', why: 'In EU-Ländern in der Regel innerhalb eines Monats. Danach ist die Ehe weltweit gültig.' },
    ],
  },
  ja: {
    seoTitle: '外国人カップル向けDVVウェディング・チェックリスト | LaplandWeddings',
    seoDesc: 'フィンランド領ラップランドで結婚を予定する外国人カップルのための1ページのチェックリスト。DVV手続き、証人、司式者 — PDFで印刷可能。',
    eyebrow: '特典コンテンツ',
    title: 'ラップランドで結婚 — 外国人カップル向けDVVチェックリスト',
    subtitle: '外国人カップルがフィンランド領ラップランドで結婚する際に必要な書類とステップをすべて網羅した1ページのチェックリスト。印刷するか、旅行用フォルダにPDFで保存できます。',
    printBtn: '印刷またはPDFで保存',
    intro: 'フィンランドでは外国人の結婚手続きが簡単です — DVVを通じた手続きには3〜5週間かかります。挙式の少なくとも2か月前に手続きを始めましょう。',
    sectionA: 'A · 8週間前',
    sectionB: 'B · 4〜6週間前',
    sectionC: 'C · 挙式の週',
    sectionD: 'D · 挙式の後',
    printNote: 'このページはA4印刷向けに最適化されています。印刷を押すか、PDFで保存してください。',
    footerNote: 'LaplandVibesネットワークの一部 · info@laplandvibes.com · 2026年更新',
    items: [
      { sec: 'A', do: 'DVVに婚姻障害調査（Examination of Impediments）を申請する', why: '挙式を行う前に必要です。無料。', link: DVV_LINK },
      { sec: 'A', do: '母国で婚姻要件具備証明書（CNI）を取得する', why: 'ほとんどの国で必要です。書類が英語・フィンランド語・スウェーデン語以外の場合は、アポスティーユと宣誓翻訳を添付してください。' },
      { sec: 'A', do: 'ラップランドのウェディングプランナーまたは会場に依頼する', why: '司式者、証人、書類計画を確認してくれます。' },
      { sec: 'B', do: 'CNIと婚姻障害調査をDVVに送付する', why: 'DVVが結婚可能であることを確認します。外国人カップルは3〜5週間。' },
      { sec: 'B', do: '司式者とその語学力を確認する', why: '英語が話せる司式者は通常プランナーが手配します。' },
      { sec: 'B', do: '証人2名を確保する', why: 'フィンランドの法律では正確に2名が必要です。フィンランド人である必要はありません。多くの会場が現地で手配します。' },
      { sec: 'C', do: '空港送迎とゲストの宿泊を確認する', why: 'ラップランドの寒さは予想外のことも — ゲストには暖かい到着地点が重要です。' },
      { sec: 'C', do: '会場と挙式のスケジュールを確認する', why: 'スノーチャペルは－3〜－7℃ — 挙式は15〜30分に。' },
      { sec: 'D', do: '英語の公式婚姻証明書を2通取得する', why: '母国での登録に必要です。DVVから。' },
      { sec: 'D', do: 'DVVでアポスティーユを取得する', why: '母国での承認に必要です。' },
      { sec: 'D', do: '母国で婚姻を登録する', why: 'EU諸国では通常1か月以内。これ以降、婚姻は世界中で有効になります。' },
    ],
  },
  es: {
    seoTitle: 'Checklist DVV para parejas extranjeras | LaplandWeddings',
    seoDesc: 'Una lista de una página para parejas extranjeras que planean casarse en la Laponia finlandesa. Trámites del DVV, testigos, oficiante — imprime como PDF.',
    eyebrow: 'Recurso gratuito',
    title: 'Casarse en Laponia — lista de verificación DVV para parejas extranjeras',
    subtitle: 'Una lista de una página con todos los documentos y pasos necesarios cuando una pareja extranjera quiere casarse en la Laponia finlandesa. Imprime o guarda como PDF para tu carpeta de viaje.',
    printBtn: 'Imprimir o guardar como PDF',
    intro: 'Finlandia facilita las bodas de extranjeros: los trámites tardan de 3 a 5 semanas a través del DVV. Empieza el proceso al menos 2 meses antes de la boda.',
    sectionA: 'A · 8 semanas antes',
    sectionB: 'B · 4–6 semanas antes',
    sectionC: 'C · La semana de la boda',
    sectionD: 'D · Después de la boda',
    printNote: 'Esta página está optimizada para impresión en A4. Pulsa Imprimir o guárdala como PDF.',
    footerNote: 'Parte de la red LaplandVibes · info@laplandvibes.com · Actualizado 2026',
    items: [
      { sec: 'A', do: 'Solicita al DVV el Examen de Impedimentos', why: 'Necesario antes de poder celebrar la ceremonia. Gratuito.', link: DVV_LINK },
      { sec: 'A', do: 'Solicita un Certificado de No Impedimento en tu país de origen', why: 'Requerido en la mayoría de los países. Incluye apostilla y traducción jurada si el documento no está en inglés, finés o sueco.' },
      { sec: 'A', do: 'Contrata a un organizador de bodas o lugar en Laponia', why: 'Confirman el oficiante, los testigos y el plan de documentación.' },
      { sec: 'B', do: 'Envía el CNI + el examen de impedimentos al DVV', why: 'El DVV confirma que podéis casaros. 3–5 semanas para parejas extranjeras.' },
      { sec: 'B', do: 'Confirma el oficiante y sus conocimientos de idiomas', why: 'Tu organizador suele encargarse de un oficiante de habla inglesa.' },
      { sec: 'B', do: 'Asegura 2 testigos', why: 'La ley finlandesa exige exactamente dos. No tienen que ser finlandeses. La mayoría de los lugares los proporcionan in situ.' },
      { sec: 'C', do: 'Confirma los traslados al aeropuerto y el alojamiento de los invitados', why: 'El frío de Laponia puede sorprender: un punto de llegada cálido es importante para los invitados.' },
      { sec: 'C', do: 'Confirma el horario de la ceremonia con el lugar', why: 'Las capillas de nieve están a –3 a –7 °C: mantén las ceremonias en 15–30 min.' },
      { sec: 'D', do: 'Obtén 2 certificados de matrimonio oficiales en inglés', why: 'Necesarios para el registro en tu país de origen. Del DVV.' },
      { sec: 'D', do: 'Consigue una apostilla del DVV', why: 'Necesaria para el reconocimiento en tu país de origen.' },
      { sec: 'D', do: 'Registra el matrimonio en tu país de origen', why: 'En los países de la UE, normalmente en un mes. Después, el matrimonio es válido en todo el mundo.' },
    ],
  },
  'pt-BR': {
    seoTitle: 'Checklist do DVV para casais estrangeiros | LaplandWeddings',
    seoDesc: 'Uma checklist de uma página para casais estrangeiros que planejam se casar na Lapônia finlandesa. Documentação do DVV, testemunhas, celebrante.',
    eyebrow: 'Material gratuito',
    title: 'Casar na Lapônia — checklist do DVV para casais estrangeiros',
    subtitle: 'Uma checklist de uma página com todos os documentos e etapas necessários quando um casal estrangeiro quer se casar na Lapônia finlandesa. Imprima ou salve como PDF para sua pasta de viagem.',
    printBtn: 'Imprimir ou salvar como PDF',
    intro: 'A Finlândia facilita casamentos de estrangeiros — a documentação leva de 3 a 5 semanas pelo DVV. Comece o processo pelo menos 2 meses antes do casamento.',
    sectionA: 'A · 8 semanas antes',
    sectionB: 'B · 4–6 semanas antes',
    sectionC: 'C · A semana do casamento',
    sectionD: 'D · Depois do casamento',
    printNote: 'Esta página é otimizada para impressão em A4. Clique em Imprimir ou salve como PDF.',
    footerNote: 'Parte da rede LaplandVibes · info@laplandvibes.com · Atualizado 2026',
    items: [
      { sec: 'A', do: 'Solicite ao DVV o Exame de Impedimentos', why: 'Necessário antes de a cerimônia poder ser realizada. Gratuito.', link: DVV_LINK },
      { sec: 'A', do: 'Solicite um Certificado de Nada Consta (CNI) no seu país de origem', why: 'Exigido na maioria dos países. Inclua apostila e tradução juramentada se o documento não estiver em inglês, finlandês ou sueco.' },
      { sec: 'A', do: 'Contrate um organizador de casamento ou local na Lapônia', why: 'Eles confirmam o celebrante, as testemunhas e o plano de documentação.' },
      { sec: 'B', do: 'Envie o CNI + o exame de impedimentos ao DVV', why: 'O DVV confirma que vocês podem se casar. 3–5 semanas para casais estrangeiros.' },
      { sec: 'B', do: 'Confirme o celebrante e seus conhecimentos de idiomas', why: 'Um celebrante que fale inglês normalmente é providenciado pelo seu organizador.' },
      { sec: 'B', do: 'Garanta 2 testemunhas', why: 'A lei finlandesa exige exatamente duas. Não precisam ser finlandesas. A maioria dos locais providencia no local.' },
      { sec: 'C', do: 'Confirme os transfers do aeroporto e a hospedagem dos convidados', why: 'O frio da Lapônia pode surpreender — um ponto de chegada aquecido é importante para os convidados.' },
      { sec: 'C', do: 'Confirme o horário da cerimônia com o local', why: 'Capelas de neve ficam a –3 a –7 °C — mantenha as cerimônias em 15–30 min.' },
      { sec: 'D', do: 'Obtenha 2 certidões de casamento oficiais em inglês', why: 'Necessárias para o registro no país de origem. Do DVV.' },
      { sec: 'D', do: 'Obtenha uma apostila do DVV', why: 'Necessária para o reconhecimento no seu país de origem.' },
      { sec: 'D', do: 'Registre o casamento no seu país de origem', why: 'Em países da UE, geralmente em até um mês. Depois disso, o casamento é válido globalmente.' },
    ],
  },
  'zh-CN': {
    seoTitle: '外国情侣 DVV 婚礼清单 | LaplandWeddings',
    seoDesc: '为计划在芬兰拉普兰结婚的外国情侣准备的一页清单。DVV 手续、证婚人、主婚人——可打印为 PDF。',
    eyebrow: '免费资源',
    title: '在拉普兰结婚——外国情侣 DVV 清单',
    subtitle: '一页清单，涵盖外国情侣在芬兰拉普兰结婚所需的所有文件和步骤。可打印或保存为 PDF 放入旅行资料夹。',
    printBtn: '打印或保存为 PDF',
    intro: '芬兰让外国人结婚变得简单——通过 DVV 办理手续需 3–5 周。请至少在婚礼前 2 个月开始流程。',
    sectionA: 'A · 婚礼前 8 周',
    sectionB: 'B · 婚礼前 4–6 周',
    sectionC: 'C · 婚礼当周',
    sectionD: 'D · 婚礼之后',
    printNote: '本页面已针对 A4 打印进行优化。点击打印或保存为 PDF。',
    footerNote: 'LaplandVibes 网络的一部分 · info@laplandvibes.com · 2026 年更新',
    items: [
      { sec: 'A', do: '向 DVV 申请婚姻障碍审查（Examination of Impediments）', why: '举行仪式前必须办理。免费。', link: DVV_LINK },
      { sec: 'A', do: '在你的祖国申请无障碍证明（CNI）', why: '大多数国家都需要。如文件非英语、芬兰语或瑞典语，需附加海牙认证和宣誓翻译。' },
      { sec: 'A', do: '聘请拉普兰的婚礼策划师或场地', why: '他们会确认主婚人、证婚人和文件方案。' },
      { sec: 'B', do: '将 CNI 与婚姻障碍审查一并提交给 DVV', why: 'DVV 确认你们可以结婚。外国情侣需 3–5 周。' },
      { sec: 'B', do: '确认主婚人及其语言能力', why: '会讲英语的主婚人通常由你的策划师安排。' },
      { sec: 'B', do: '落实 2 名证婚人', why: '芬兰法律要求恰好两名。无需是芬兰人。多数场地会在现场安排。' },
      { sec: 'C', do: '确认机场接送和宾客住宿', why: '拉普兰的严寒可能让人措手不及——温暖的到达点对宾客很重要。' },
      { sec: 'C', do: '与场地确认仪式时间', why: '雪教堂温度为 –3 至 –7 °C——仪式控制在 15–30 分钟。' },
      { sec: 'D', do: '领取 2 份英文官方结婚证书', why: '回国登记所需。由 DVV 出具。' },
      { sec: 'D', do: '在 DVV 办理海牙认证', why: '在你的祖国获得认可所需。' },
      { sec: 'D', do: '在你的祖国登记婚姻', why: '欧盟国家通常一个月内完成。此后婚姻在全球有效。' },
    ],
  },
  ko: {
    seoTitle: '외국인 커플을 위한 DVV 웨딩 체크리스트 | LaplandWeddings',
    seoDesc: '핀란드 라플란드에서 결혼을 계획하는 외국인 커플을 위한 한 장짜리 체크리스트. DVV 서류, 증인, 주례 — PDF로 인쇄 가능.',
    eyebrow: '무료 리드 마그넷',
    title: '라플란드에서 결혼하기 — 외국인 커플을 위한 DVV 체크리스트',
    subtitle: '외국인 커플이 핀란드 라플란드에서 결혼할 때 필요한 모든 서류와 단계를 담은 한 장짜리 체크리스트. 인쇄하거나 여행 폴더에 PDF로 저장하세요.',
    printBtn: '인쇄 또는 PDF로 저장',
    intro: '핀란드는 외국인 결혼 절차가 간편합니다 — DVV를 통한 서류 처리에 3~5주가 걸립니다. 결혼식 최소 2개월 전에 절차를 시작하세요.',
    sectionA: 'A · 8주 전',
    sectionB: 'B · 4~6주 전',
    sectionC: 'C · 결혼식 주간',
    sectionD: 'D · 결혼식 후',
    printNote: '이 페이지는 A4 인쇄에 최적화되어 있습니다. 인쇄를 누르거나 PDF로 저장하세요.',
    footerNote: 'LaplandVibes 네트워크의 일부 · info@laplandvibes.com · 2026년 업데이트',
    items: [
      { sec: 'A', do: 'DVV에 혼인장애 심사(Examination of Impediments)를 신청하세요', why: '예식을 진행하기 전에 필요합니다. 무료.', link: DVV_LINK },
      { sec: 'A', do: '본국에서 혼인요건구비증명서(CNI)를 발급받으세요', why: '대부분의 국가에서 요구됩니다. 서류가 영어·핀란드어·스웨덴어가 아니면 아포스티유와 공증 번역을 첨부하세요.' },
      { sec: 'A', do: '라플란드 웨딩 플래너나 웨딩 장소를 섭외하세요', why: '주례, 증인, 서류 계획을 확정해 줍니다.' },
      { sec: 'B', do: 'CNI와 혼인장애 심사를 DVV에 보내세요', why: 'DVV가 결혼 가능 여부를 확인합니다. 외국인 커플은 3~5주.' },
      { sec: 'B', do: '주례와 그의 언어 능력을 확인하세요', why: '영어가 가능한 주례는 보통 플래너가 마련해 줍니다.' },
      { sec: 'B', do: '증인 2명을 확보하세요', why: '핀란드 법은 정확히 두 명을 요구합니다. 핀란드인일 필요는 없습니다. 대부분의 장소가 현장에서 마련해 줍니다.' },
      { sec: 'C', do: '공항 이동과 하객 숙소를 확인하세요', why: '라플란드의 추위는 의외일 수 있습니다 — 하객에게는 따뜻한 도착 지점이 중요합니다.' },
      { sec: 'C', do: '웨딩 장소와 예식 일정을 확인하세요', why: '스노우 채플은 –3~–7 °C입니다 — 예식은 15~30분으로 유지하세요.' },
      { sec: 'D', do: '영문 공식 혼인증명서 2부를 받으세요', why: '본국 등록에 필요합니다. DVV에서.' },
      { sec: 'D', do: 'DVV에서 아포스티유를 받으세요', why: '본국에서 인정받는 데 필요합니다.' },
      { sec: 'D', do: '본국에 혼인을 등록하세요', why: 'EU 국가에서는 보통 한 달 이내. 이후 혼인은 전 세계적으로 유효합니다.' },
    ],
  },
  fr: {
    seoTitle: 'Checklist DVV pour les couples étrangers | LaplandWeddings',
    seoDesc: 'Une checklist d’une page pour les couples étrangers qui prévoient de se marier en Laponie finlandaise. Formalités DVV, témoins, officiant — à imprimer en PDF.',
    eyebrow: 'Ressource gratuite',
    title: 'Se marier en Laponie — checklist DVV pour les couples étrangers',
    subtitle: 'Une checklist d’une page couvrant tous les documents et étapes nécessaires lorsqu’un couple étranger souhaite se marier en Laponie finlandaise. Imprimez-la ou enregistrez-la en PDF pour votre dossier de voyage.',
    printBtn: 'Imprimer ou enregistrer en PDF',
    intro: 'La Finlande facilite les mariages d’étrangers — les formalités prennent 3 à 5 semaines via le DVV. Commencez la procédure au moins 2 mois avant le mariage.',
    sectionA: 'A · 8 semaines avant',
    sectionB: 'B · 4–6 semaines avant',
    sectionC: 'C · La semaine du mariage',
    sectionD: 'D · Après le mariage',
    printNote: 'Cette page est optimisée pour l’impression A4. Cliquez sur Imprimer ou enregistrez-la en PDF.',
    footerNote: 'Membre du réseau LaplandVibes · info@laplandvibes.com · Mis à jour en 2026',
    items: [
      { sec: 'A', do: 'Demandez l’examen des empêchements au DVV', why: 'Nécessaire avant que la cérémonie puisse être célébrée. Gratuit.', link: DVV_LINK },
      { sec: 'A', do: 'Demandez un certificat de non-empêchement (CNI) dans votre pays d’origine', why: 'Requis dans la plupart des pays. Joignez une apostille et une traduction assermentée si le document n’est pas en anglais, finnois ou suédois.' },
      { sec: 'A', do: 'Engagez un wedding planner ou un lieu en Laponie', why: 'Ils confirment l’officiant, les témoins et le plan des documents.' },
      { sec: 'B', do: 'Envoyez le CNI + l’examen des empêchements au DVV', why: 'Le DVV confirme que vous pouvez vous marier. 3 à 5 semaines pour les couples étrangers.' },
      { sec: 'B', do: 'Confirmez l’officiant et ses compétences linguistiques', why: 'Un officiant anglophone est généralement organisé par votre planner.' },
      { sec: 'B', do: 'Assurez-vous d’avoir 2 témoins', why: 'La loi finlandaise en exige exactement deux. Ils ne doivent pas forcément être finlandais. La plupart des lieux les fournissent sur place.' },
      { sec: 'C', do: 'Confirmez les transferts depuis l’aéroport et l’hébergement des invités', why: 'Le froid de la Laponie peut surprendre — un point d’arrivée chauffé est important pour les invités.' },
      { sec: 'C', do: 'Confirmez l’horaire de la cérémonie avec le lieu', why: 'Les chapelles de neige sont à –3 à –7 °C — limitez les cérémonies à 15–30 min.' },
      { sec: 'D', do: 'Obtenez 2 actes de mariage officiels en anglais', why: 'Nécessaires pour l’enregistrement dans votre pays d’origine. Auprès du DVV.' },
      { sec: 'D', do: 'Obtenez une apostille du DVV', why: 'Nécessaire pour la reconnaissance dans votre pays d’origine.' },
      { sec: 'D', do: 'Enregistrez le mariage dans votre pays d’origine', why: 'Dans les pays de l’UE, généralement sous un mois. Ensuite, le mariage est valable dans le monde entier.' },
    ],
  },
  it: {
    seoTitle: 'Checklist DVV per coppie straniere | LaplandWeddings',
    seoDesc: 'Una checklist di una pagina per le coppie straniere che vogliono sposarsi nella Lapponia finlandese. Documenti DVV, testimoni, celebrante — da stampare in PDF.',
    eyebrow: 'Risorsa gratuita',
    title: 'Sposarsi in Lapponia — checklist DVV per coppie straniere',
    subtitle: 'Una checklist di una pagina con tutti i documenti e i passaggi necessari quando una coppia straniera vuole sposarsi nella Lapponia finlandese. Stampala o salvala in PDF per la tua cartella di viaggio.',
    printBtn: 'Stampa o salva in PDF',
    intro: 'La Finlandia rende semplici i matrimoni per gli stranieri — la documentazione richiede 3–5 settimane tramite il DVV. Inizia la procedura almeno 2 mesi prima del matrimonio.',
    sectionA: 'A · 8 settimane prima',
    sectionB: 'B · 4–6 settimane prima',
    sectionC: 'C · La settimana del matrimonio',
    sectionD: 'D · Dopo il matrimonio',
    printNote: 'Questa pagina è ottimizzata per la stampa in A4. Premi Stampa o salvala in PDF.',
    footerNote: 'Parte della rete LaplandVibes · info@laplandvibes.com · Aggiornato 2026',
    items: [
      { sec: 'A', do: 'Richiedi al DVV l’esame degli impedimenti', why: 'Necessario prima che la cerimonia possa essere celebrata. Gratuito.', link: DVV_LINK },
      { sec: 'A', do: 'Richiedi un certificato di nulla osta (CNI) nel tuo Paese di origine', why: 'Richiesto nella maggior parte dei Paesi. Allega apostille e traduzione giurata se il documento non è in inglese, finlandese o svedese.' },
      { sec: 'A', do: 'Ingaggia un wedding planner o una location in Lapponia', why: 'Confermano il celebrante, i testimoni e il piano dei documenti.' },
      { sec: 'B', do: 'Invia il CNI + l’esame degli impedimenti al DVV', why: 'Il DVV conferma che potete sposarvi. 3–5 settimane per le coppie straniere.' },
      { sec: 'B', do: 'Conferma il celebrante e le sue competenze linguistiche', why: 'Un celebrante che parla inglese viene normalmente organizzato dal tuo planner.' },
      { sec: 'B', do: 'Assicurati 2 testimoni', why: 'La legge finlandese ne richiede esattamente due. Non devono essere finlandesi. La maggior parte delle location li fornisce sul posto.' },
      { sec: 'C', do: 'Conferma i transfer dall’aeroporto e l’alloggio degli ospiti', why: 'Il freddo della Lapponia può sorprendere — un punto d’arrivo caldo è importante per gli ospiti.' },
      { sec: 'C', do: 'Conferma l’orario della cerimonia con la location', why: 'Le cappelle di neve sono a –3 / –7 °C — mantieni le cerimonie su 15–30 min.' },
      { sec: 'D', do: 'Ottieni 2 certificati di matrimonio ufficiali in inglese', why: 'Necessari per la registrazione nel Paese di origine. Dal DVV.' },
      { sec: 'D', do: 'Ottieni un’apostille dal DVV', why: 'Necessaria per il riconoscimento nel tuo Paese di origine.' },
      { sec: 'D', do: 'Registra il matrimonio nel tuo Paese di origine', why: 'Nei Paesi UE di solito entro un mese. Dopodiché il matrimonio è valido a livello globale.' },
    ],
  },
  nl: {
    seoTitle: 'DVV-checklist voor buitenlandse stellen | LaplandWeddings',
    seoDesc: 'Een checklist van één pagina voor buitenlandse stellen die in Fins Lapland willen trouwen. DVV-papierwerk, getuigen, voltrekker — print als pdf.',
    eyebrow: 'Gratis weggever',
    title: 'Trouwen in Lapland — DVV-checklist voor buitenlandse stellen',
    subtitle: 'Een checklist van één pagina met elk document en elke stap die nodig is wanneer een buitenlands stel in Fins Lapland wil trouwen. Print of bewaar als pdf voor je reismap.',
    printBtn: 'Printen of opslaan als pdf',
    intro: 'Finland maakt trouwen voor buitenlanders eenvoudig — het papierwerk duurt 3–5 weken via de DVV. Begin het proces minstens 2 maanden voor de bruiloft.',
    sectionA: 'A · 8 weken vooraf',
    sectionB: 'B · 4–6 weken vooraf',
    sectionC: 'C · De trouwweek',
    sectionD: 'D · Na de bruiloft',
    printNote: 'Deze pagina is geoptimaliseerd voor A4-print. Klik op Printen of bewaar als pdf.',
    footerNote: 'Onderdeel van het LaplandVibes-netwerk · info@laplandvibes.com · Bijgewerkt 2026',
    items: [
      { sec: 'A', do: 'Vraag bij de DVV het onderzoek naar huwelijksbeletselen aan', why: 'Nodig voordat de ceremonie kan worden voltrokken. Gratis.', link: DVV_LINK },
      { sec: 'A', do: 'Vraag in je eigen land een verklaring van geen huwelijksbeletsel (CNI) aan', why: 'In de meeste landen vereist. Voeg een apostille en beëdigde vertaling toe als het document niet in het Engels, Fins of Zweeds is.' },
      { sec: 'A', do: 'Schakel een trouwplanner of locatie in Lapland in', why: 'Zij bevestigen de voltrekker, de getuigen en het papierwerkplan.' },
      { sec: 'B', do: 'Stuur de CNI + het onderzoek naar beletselen naar de DVV', why: 'De DVV bevestigt dat jullie mogen trouwen. 3–5 weken voor buitenlandse stellen.' },
      { sec: 'B', do: 'Bevestig de voltrekker en diens taalvaardigheid', why: 'Een Engelstalige voltrekker wordt meestal door je planner geregeld.' },
      { sec: 'B', do: 'Zorg voor 2 getuigen', why: 'De Finse wet vereist precies twee. Ze hoeven niet Fins te zijn. De meeste locaties regelen ze ter plaatse.' },
      { sec: 'C', do: 'Bevestig de luchthaventransfers en de accommodatie van gasten', why: 'De kou in Lapland kan verrassen — een warm aankomstpunt is belangrijk voor gasten.' },
      { sec: 'C', do: 'Bevestig de timing van de ceremonie met de locatie', why: 'Sneeuwkapellen zijn –3 tot –7 °C — houd ceremonies op 15–30 min.' },
      { sec: 'D', do: 'Haal 2 officiële huwelijksakten in het Engels op', why: 'Nodig voor registratie in je eigen land. Van de DVV.' },
      { sec: 'D', do: 'Vraag een apostille aan bij de DVV', why: 'Nodig voor erkenning in je eigen land.' },
      { sec: 'D', do: 'Registreer het huwelijk in je eigen land', why: 'In EU-landen meestal binnen een maand. Daarna is het huwelijk wereldwijd geldig.' },
    ],
  }, sv: {
    seoTitle: 'DVV Wedding Checklist for Foreign Couples | LaplandWeddings',
    seoDesc: 'A one-page checklist for foreign couples planning to marry in Finnish Lapland. DVV paperwork, witnesses, officiant — print as PDF.',
    eyebrow: 'Lead magnet',
    title: 'Marrying in Lapland — DVV checklist for foreign couples',
    subtitle: 'A one-page checklist covering every document and step required when a foreign couple wants to marry in Finnish Lapland. Print or save as PDF for your travel folder.',
    printBtn: 'Print or save as PDF',
    intro: 'Finland makes foreign weddings simple — paperwork takes 3–5 weeks via the DVV. Begin the process at least 2 months before the wedding.',
    sectionA: 'A · 8 weeks before',
    sectionB: 'B · 4–6 weeks before',
    sectionC: 'C · The wedding week',
    sectionD: 'D · After the wedding',
    printNote: 'This page is optimised for A4 print. Hit Print or save as PDF.',
    footerNote: 'Part of the LaplandVibes network · info@laplandvibes.com · Updated 2026',
    items: [
      { sec: 'A', do: 'Request the Examination of Impediments from DVV', why: 'Needed before the ceremony can be performed. Free of charge.', link: DVV_LINK },
      { sec: 'A', do: 'Request a Certificate of No Impediment from your home country', why: 'Required in most countries. Include apostille and a sworn translation if the document is not in English, Finnish or Swedish.' },
      { sec: 'A', do: 'Engage a Lapland wedding planner or venue', why: 'They confirm the officiant, witnesses and paperwork plan.' },
      { sec: 'B', do: 'Send the CNI + impediments examination to DVV', why: 'DVV confirms you may marry. 3–5 weeks for foreign couples.' },
      { sec: 'B', do: 'Confirm the officiant and their language skills', why: 'An English-speaking officiant is normally arranged by your planner.' },
      { sec: 'B', do: 'Secure 2 witnesses', why: 'Finnish law requires exactly two. They do not need to be Finnish. Most venues arrange them on site.' },
      { sec: 'C', do: 'Confirm airport transfers and guest accommodation', why: 'Lapland cold can surprise — a warm arrival point matters for guests.' },
      { sec: 'C', do: 'Confirm the ceremony timing with the venue', why: 'Snow chapels operate at –3 to –7 °C — keep ceremonies 15–30 min.' },
      { sec: 'D', do: 'Collect 2 official marriage certificates in English', why: 'Required for home-country registration. From DVV.' },
      { sec: 'D', do: 'Get an apostille from the DVV', why: 'Required for recognition in your home country.' },
      { sec: 'D', do: 'Register the marriage in your home country', why: 'In EU countries usually within a month. After this the marriage is globally valid.' },
    ],
  },
};

export default function Checklist() {
  const { lang, localePath } = useLang();

  // Inject print CSS once on mount
  useEffect(() => {
    const id = 'checklist-print-style';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `
        @media print {
          html, body { background: white !important; color: #0F172A !important; }
          header, footer, nav, [data-print-hide] { display: none !important; }
          main { padding: 0 !important; }
          .checklist-print {
            background: white !important;
            color: #0F172A !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          .checklist-print h1, .checklist-print h2, .checklist-print h3 {
            color: #0F172A !important;
            page-break-after: avoid;
          }
          .checklist-print p, .checklist-print li, .checklist-print td {
            color: #1F2937 !important;
          }
          .checklist-print .step {
            page-break-inside: avoid;
            border-top: 1px solid #E2E8F0 !important;
            background: white !important;
          }
          .checklist-print a { color: #0F172A !important; text-decoration: underline; }
          .checklist-print .step-num {
            background: #FCE7F3 !important;
            color: #BE185D !important;
            border: 1px solid #F9A8D4 !important;
          }
          @page { margin: 18mm 14mm; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const print = () => window.print();

  const t = pickLocalized(CONTENT, lang);

  const sections: Array<{ key: 'A' | 'B' | 'C' | 'D'; title: string }> = [
    { key: 'A', title: t.sectionA },
    { key: 'B', title: t.sectionB },
    { key: 'C', title: t.sectionC },
    { key: 'D', title: t.sectionD },
  ];

  return (
    <>
      <SEO title={t.seoTitle} description={t.seoDesc} path="/checklist/dvv-foreign-couples" />

      <ChecklistGate>
      <div className="checklist-print bg-white text-night max-w-4xl mx-auto px-5 sm:px-10 py-12 sm:py-16">
        {/* Print toolbar (hidden in print) */}
        <div className="flex flex-wrap items-center gap-3 mb-8" data-print-hide>
          <button
            onClick={print}
            className="inline-flex items-center gap-2 bg-rose hover:bg-pink text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            {t.printBtn}
          </button>
          <p className="text-xs text-gray-500">{t.printNote}</p>
        </div>

        {/* Header */}
        <p className="uppercase tracking-[0.3em] text-[11px] sm:text-xs text-aurora-pink font-semibold mb-2">
          {t.eyebrow}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl text-night mb-3 leading-tight tracking-wide">
          {t.title}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">{t.subtitle}</p>

        <div className="bg-pink/5 border-l-4 border-rose px-5 py-4 rounded-r-lg mb-10">
          <p className="text-[15px] text-gray-800 leading-relaxed">{t.intro}</p>
        </div>

        {/* Sections */}
        {sections.map((sec) => {
          const items = t.items.filter((it) => it.sec === sec.key);
          return (
            <section key={sec.key} className="mb-10">
              <h2 className="font-heading text-2xl text-night mb-4 tracking-wide border-b border-gray-200 pb-2">
                {sec.title}
              </h2>
              <ul className="space-y-4">
                {items.map((it, i) => (
                  <li key={i} className="step flex gap-4 pt-2">
                    <span className="step-num shrink-0 w-7 h-7 rounded-full bg-rose/15 text-rose font-bold text-sm flex items-center justify-center mt-0.5">
                      ☐
                    </span>
                    <div className="flex-1">
                      <p className="text-base sm:text-[17px] font-semibold text-night mb-1.5 leading-snug">{it.do}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{it.why}</p>
                      {it.link && (
                        <a
                          href={it.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-aurora-pink hover:underline mt-1.5 inline-block"
                        >
                          {it.link.label} →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 mt-10 text-xs text-gray-500 leading-relaxed">
          <p className="font-semibold text-night mb-1">LaplandWeddings.online</p>
          <p>{t.footerNote}</p>
        </div>

        {/* Back-to-site CTA (hidden in print) */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center" data-print-hide>
          <a
            href={localePath('/')}
            className="inline-flex items-center px-6 py-3 bg-night text-white font-semibold rounded-full hover:bg-night-light transition-colors"
          >
            ← LaplandWeddings.online
          </a>
        </div>
      </div>
      </ChecklistGate>
    </>
  );
}
