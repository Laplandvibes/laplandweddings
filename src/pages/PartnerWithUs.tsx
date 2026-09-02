import type { MouseEvent } from 'react';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import PartnerForm from '../components/PartnerForm';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';
import { Inbox, Megaphone, ShieldCheck, Handshake, Globe, Languages, Sun } from 'lucide-react';

/**
 * B2B partner-recruitment page. Localized across all 11 site locales.
 *
 * NOTE (2026-06-12): kept `noindex` and intentionally absent from nav + sitemap +
 * prerender map until Vesa signs off on the public pricing. Reachable only via
 * direct URL /partner-with-us for review. To promote: remove noindex here, add
 * '/partner-with-us' to scripts/generate-sitemap.mjs enPaths + scripts/prerender-meta.mjs
 * top map, and add a nav/footer link.
 *
 * Visitor reach is stated qualitatively + with true facts (25+ sites, 12 languages,
 * year-round) — no fabricated numbers. Add real traffic figures here when available.
 */

type Stat = { stat: Localized<string>; label: Localized<string> };
type Card = { title: Localized<string>; body: Localized<string> };
type Step = { n: string; title: Localized<string>; body: Localized<string> };

const conceptStats: { icon: typeof Globe; data: Stat }[] = [
  {
    icon: Globe,
    data: {
      stat: { en: '25+', fi: '25+', de: '25+', ja: '25+', es: '25+', 'pt-BR': '25+', 'zh-CN': '25+', ko: '25+', fr: '25+', it: '25+', nl: '25+' , sv: '25+'},
      label: {
        en: 'Lapland travel sites: stays, activities, dining, transport',
        fi: 'matkasivustoa Lapista: majoitus, aktiviteetit, ravintolat, kuljetus',
        de: 'Lappland-Reiseseiten: Unterkünfte, Aktivitäten, Gastronomie, Transport',
        ja: 'のラップランド旅行サイト：宿泊、アクティビティ、レストラン、交通',
        es: 'sitios de viajes de Laponia: alojamiento, actividades, gastronomía, transporte',
        'pt-BR': 'sites de viagem da Lapônia: hospedagem, atividades, gastronomia, transporte',
        'zh-CN': '个拉普兰旅游网站，住宿、活动、餐饮、交通',
        ko: '개의 라플란드 여행 사이트: 숙박, 액티비티, 다이닝, 교통',
        fr: 'sites de voyage en Laponie : hébergements, activités, restauration, transport',
        it: 'siti di viaggio sulla Lapponia: alloggi, attività, ristorazione, trasporti',
        nl: 'reissites over Lapland: verblijf, activiteiten, eten, vervoer', sv: 'Reseajter för Lappland: boende, aktiviteter, mat och transport',
      },
    },
  },
  {
    icon: Languages,
    data: {
      stat: { en: '12', fi: '12', de: '12', ja: '12', es: '12', 'pt-BR': '12', 'zh-CN': '12', ko: '12', fr: '12', it: '12', nl: '12' , sv: '12'},
      label: {
        en: 'languages: couples from the UK, Asia and Central Europe find you',
        fi: 'kieltä: parit Britanniasta, Aasiasta ja Keski-Euroopasta löytävät teidät',
        de: 'Sprachen: So finden Paare aus Großbritannien, Asien und Mitteleuropa zu Ihnen',
        ja: 'の言語：イギリス、アジア、中央ヨーロッパのカップルがあなたを見つけます',
        es: 'idiomas: parejas del Reino Unido, Asia y Europa Central le encuentran',
        'pt-BR': 'idiomas: casais do Reino Unido, da Ásia e da Europa Central encontram você',
        'zh-CN': '种语言，来自英国、亚洲和中欧的情侣能找到你',
        ko: '개 언어: 영국, 아시아, 중부 유럽의 커플이 여러분을 찾습니다',
        fr: 'langues : des couples du Royaume-Uni, d’Asie et d’Europe centrale vous trouvent',
        it: 'lingue: coppie da Regno Unito, Asia ed Europa centrale La trovano',
        nl: 'talen: stellen uit het VK, Azië en Centraal-Europa vinden u', sv: 'språk: par från Storbritannien, Asien och Centraleuropa hittar dig',
      },
    },
  },
  {
    icon: Sun,
    data: {
      stat: {
        en: 'Year-round', fi: 'Ympäri vuoden', de: 'Ganzjährig', ja: '通年',
        es: 'Todo el año', 'pt-BR': 'O ano todo', 'zh-CN': '全年', ko: '연중',
        fr: 'Toute l’année', it: 'Tutto l’anno', nl: 'Het hele jaar', sv: 'Året runt',
      },
      label: {
        en: 'Under the Northern Lights in winter, the midnight sun in summer. Weddings every month.',
        fi: 'Talvella revontulien alla, kesällä keskiyön auringossa. Häitä Lapissa joka kuukausi.',
        de: 'Im Winter unter den Polarlichtern, im Sommer in der Mitternachtssonne. Hochzeiten in jedem Monat.',
        ja: '冬はオーロラの下、夏は白夜のもとで、毎月どこかで結婚式が。',
        es: 'Bajo la aurora boreal en invierno, el sol de medianoche en verano: bodas cada mes.',
        'pt-BR': 'Sob a aurora boreal no inverno, o sol da meia-noite no verão. Casamentos todos os meses.',
        'zh-CN': '冬季在北极光下，夏季在午夜阳光中，每个月都有婚礼。',
        ko: '겨울에는 오로라 아래에서, 여름에는 백야 속에서, 매달 결혼식이 열립니다.',
        fr: 'Sous les aurores boréales en hiver, le soleil de minuit en été. Des mariages chaque mois.',
        it: 'Sotto l’aurora boreale d’inverno, il sole di mezzanotte d’estate. Matrimoni ogni mese.',
        nl: 'Onder het noorderlicht in de winter, de middernachtzon in de zomer. Elke maand bruiloften.', sv: 'Under norrskenet på vintern, midnattssolen på sommaren. Bröllop varje månad.',
      },
    },
  },
];

const valueProps: { icon: typeof Inbox; data: Card }[] = [
  {
    icon: Inbox,
    data: {
      title: {
        en: 'Qualified couples, ready to book', fi: 'Valmiiksi laadukkaita pareja',
        de: 'Qualifizierte Paare, bereit zu buchen', ja: '予約意欲の高い、質の高いカップル',
        es: 'Parejas cualificadas, listas para reservar', 'pt-BR': 'Casais qualificados, prontos para reservar',
        'zh-CN': '已筛选、准备预订的情侣', ko: '예약 준비가 된 검증된 커플',
        fr: 'Des couples qualifiés, prêts à réserver', it: 'Coppie qualificate, pronte a prenotare',
        nl: 'Gekwalificeerde stellen, klaar om te boeken', sv: 'Kvalificerade par, redo att boka',
      },
      body: {
        en: 'Every lead carries the budget, dates, guest count, ceremony type and region, often inspiration photos too. You get a couple actively looking for what you offer.',
        fi: 'Jokainen liidi sisältää budjetin, päivät, vieraiden määrän, seremoniatyypin ja alueen, usein myös inspiraatiokuvat. Saat parin, joka etsii juuri sinun palveluitasi.',
        de: 'Jeder Lead enthält Budget, Termine, Gästezahl, Zeremonientyp und Region, oft auch Inspirationsfotos. Sie erhalten ein Paar, das aktiv nach Ihrem Angebot sucht.',
        ja: 'すべてのリードに予算、日程、ゲスト数、挙式タイプ、地域、そしてしばしばインスピレーション写真も含まれます。あなたの提供するものを積極的に探しているカップルが得られます。',
        es: 'Cada lead incluye presupuesto, fechas, número de invitados, tipo de ceremonia y región, a menudo también fotos de inspiración. Usted recibe una pareja que busca activamente lo que ofrece.',
        'pt-BR': 'Cada lead traz orçamento, datas, número de convidados, tipo de cerimônia e região, muitas vezes também fotos de inspiração. Você recebe um casal que procura ativamente o que você oferece.',
        'zh-CN': '每条线索都包含预算、日期、宾客人数、仪式类型和地区，往往还有灵感照片。你得到的是一对正在主动寻找你所提供服务的情侣。',
        ko: '모든 리드에는 예산, 날짜, 하객 수, 예식 유형, 지역이 담겨 있으며, 종종 영감을 주는 사진도 포함됩니다. 여러분이 제공하는 것을 적극적으로 찾는 커플을 얻습니다.',
        fr: 'Chaque lead comporte le budget, les dates, le nombre d’invités, le type de cérémonie et la région, souvent aussi des photos d’inspiration. Vous obtenez un couple qui recherche activement ce que vous proposez.',
        it: 'Ogni lead riporta budget, date, numero di ospiti, tipo di cerimonia e regione, spesso anche foto di ispirazione. Ottiene una coppia che cerca attivamente ciò che offre.',
        nl: 'Elke lead bevat het budget, de data, het aantal gasten, het ceremonietype en de regio, vaak ook inspiratiefoto’s. U krijgt een stel dat actief op zoek is naar wat u biedt.', sv: 'Every lead carries the budget, dates, guest count, ceremony type and region, often inspiration photos too. You get a couple actively looking for what you offer.',
      },
    },
  },
  {
    icon: Megaphone,
    data: {
      title: {
        en: 'We handle the marketing', fi: 'Me hoidamme markkinoinnin',
        de: 'Wir übernehmen das Marketing', ja: 'マーケティングは私たちが担当',
        es: 'Nosotros nos encargamos del marketing', 'pt-BR': 'Nós cuidamos do marketing',
        'zh-CN': '营销由我们负责', ko: '마케팅은 저희가 맡습니다',
        fr: 'Nous gérons le marketing', it: 'Al marketing pensiamo noi',
        nl: 'Wij regelen de marketing', sv: 'Vi sköter marknadsföringen',
      },
      body: {
        en: 'The LaplandVibes network and SEO bring couples to one form in 12 languages. You focus on the wedding. The visibility costs you nothing.',
        fi: 'LaplandVibes-verkosto ja hakukoneoptimointi tuovat parit yhdelle lomakkeelle 12 kielellä. Sinä keskityt häihin. Näkyvyys ei maksa sinulle mitään.',
        de: 'Das LaplandVibes-Netzwerk und SEO bringen Paare in 12 Sprachen zu einem Formular. Sie konzentrieren sich auf die Hochzeit. Die Sichtbarkeit kostet Sie nichts.',
        ja: 'LaplandVibesネットワークとSEOが、12言語でカップルを1つのフォームへ誘導します。あなたは結婚式に集中。露出のコストはゼロです。',
        es: 'La red LaplandVibes y el SEO llevan a las parejas a un único formulario en 12 idiomas. Usted se centra en la boda. La visibilidad no le cuesta nada.',
        'pt-BR': 'A rede LaplandVibes e o SEO levam os casais a um único formulário em 12 idiomas. Você foca no casamento. A visibilidade não custa nada.',
        'zh-CN': 'LaplandVibes 网络与 SEO 用 12 种语言把情侣引导到同一个表单。你专注于婚礼，曝光对你来说毫无成本。',
        ko: 'LaplandVibes 네트워크와 SEO가 12개 언어로 커플을 하나의 양식으로 모읍니다. 여러분은 결혼식에 집중하세요. 노출 비용은 들지 않습니다.',
        fr: 'Le réseau LaplandVibes et le SEO amènent les couples vers un seul formulaire en 12 langues. Vous vous concentrez sur le mariage. La visibilité ne vous coûte rien.',
        it: 'La rete LaplandVibes e la SEO portano le coppie a un unico modulo in 12 lingue. Lei pensa al matrimonio. La visibilità non Le costa nulla.',
        nl: 'Het LaplandVibes-netwerk en SEO brengen stellen naar één formulier in 12 talen. U richt zich op de bruiloft. De zichtbaarheid kost u niets.', sv: 'The LaplandVibes network and SEO bring couples to one form in 12 languages. You focus on the wedding. The visibility costs you nothing.',
      },
    },
  },
  {
    icon: ShieldCheck,
    data: {
      title: {
        en: 'A low bar to start', fi: 'Matala kynnys aloittaa',
        de: 'Ein niedriger Einstieg', ja: '始めやすい低いハードル',
        es: 'Una barrera baja para empezar', 'pt-BR': 'Uma barreira baixa para começar',
        'zh-CN': '低门槛起步', ko: '시작하기 쉬운 낮은 문턱',
        fr: 'Un faible seuil pour démarrer', it: 'Una soglia bassa per iniziare',
        nl: 'Een lage drempel om te beginnen', sv: 'Låg tröskel att komma igång',
      },
      body: {
        en: 'First lead free, no monthly fee, no setup cost. You see the quality before you pay a cent.',
        fi: 'Ensimmäinen liidi maksutta, ei kuukausimaksuja, ei perustamismaksua. Näet laadun ennen kuin maksat senttiäkään.',
        de: 'Erster Lead kostenlos, keine monatliche Gebühr, keine Einrichtungskosten. Sie sehen die Qualität, bevor Sie einen Cent zahlen.',
        ja: '最初のリードは無料、月額料金なし、初期費用なし。1セントも払う前に品質を確認できます。',
        es: 'Primer lead gratis, sin cuota mensual, sin coste de configuración. Usted ve la calidad antes de pagar un céntimo.',
        'pt-BR': 'Primeiro lead grátis, sem mensalidade, sem custo de configuração. Você vê a qualidade antes de pagar um centavo.',
        'zh-CN': '首条线索免费，无月费，无开通费用。你在付出一分钱之前就能看到质量。',
        ko: '첫 리드 무료, 월 요금 없음, 설정 비용 없음. 한 푼도 내기 전에 품질을 확인합니다.',
        fr: 'Premier lead gratuit, pas de frais mensuels, pas de frais de mise en route. Vous évaluez la qualité avant de payer un centime.',
        it: 'Primo lead gratis, nessun canone mensile, nessun costo di attivazione. Valuti la qualità prima di pagare un centesimo.',
        nl: 'Eerste lead gratis, geen maandelijkse kosten, geen opstartkosten. U ziet de kwaliteit voordat u een cent betaalt.', sv: 'First lead free, no monthly fee, no setup cost. You see the quality before you pay a cent.',
      },
    },
  },
  {
    icon: Handshake,
    data: {
      title: {
        en: 'You own the relationship', fi: 'Asiakassuhde on teidän',
        de: 'Die Kundenbeziehung gehört Ihnen', ja: '顧客との関係はあなたのもの',
        es: 'La relación es suya', 'pt-BR': 'O relacionamento é seu',
        'zh-CN': '客户关系归你所有', ko: '고객 관계는 여러분의 것',
        fr: 'La relation client vous appartient', it: 'La relazione con il cliente è Sua',
        nl: 'De klantrelatie is van u', sv: 'Du äger kundrelationen',
      },
      body: {
        en: 'We route the lead; you contact the couple directly, quote, and close. The couple is your client from first hello to last dance.',
        fi: 'Me välitämme liidin; te otatte pariin yhteyttä suoraan, teette tarjouksen ja suljette kaupan. Pari on teidän asiakkaanne alusta loppuun.',
        de: 'Wir leiten den Lead weiter; Sie kontaktieren das Paar direkt, machen ein Angebot und schließen ab. Das Paar ist vom ersten Hallo bis zum letzten Tanz Ihr Kunde.',
        ja: 'リードは私たちが取り次ぎ、あなたがカップルに直接連絡し、見積もりを出し、成約します。最初の挨拶から最後のダンスまで、カップルはあなたの顧客です。',
        es: 'Nosotros derivamos el lead; usted contacta a la pareja directamente, presupuesta y cierra. La pareja es su cliente desde el primer hola hasta el último baile.',
        'pt-BR': 'Nós encaminhamos o lead; você contata o casal diretamente, faz a proposta e fecha. O casal é seu cliente do primeiro olá à última dança.',
        'zh-CN': '我们转交线索；你直接联系情侣、报价并成交。从初次问候到最后一支舞，这对情侣都是你的客户。',
        ko: '리드는 저희가 전달하고, 커플과의 연락·견적·계약은 여러분이 직접 진행합니다. 첫 인사부터 마지막 춤까지 커플은 여러분의 고객입니다.',
        fr: 'Nous transmettons le lead ; vous contactez le couple directement, faites le devis et concluez. Le couple est votre client du premier bonjour à la dernière danse.',
        it: 'Noi inoltriamo il lead; Lei contatta la coppia direttamente, fa il preventivo e chiude. La coppia è Suo cliente dal primo saluto all’ultimo ballo.',
        nl: 'Wij sturen de lead door; u neemt rechtstreeks contact op met het stel, offreert en sluit af. Het stel is uw klant van de eerste begroeting tot de laatste dans.', sv: 'We route the lead; you contact the couple directly, quote, and close. The couple is your client from first hello to last dance.',
      },
    },
  },
];

const steps: Step[] = [
  {
    n: '1',
    title: {
      en: 'Apply to join', fi: 'Hae mukaan', de: 'Bewerben Sie sich', ja: '参加申し込み',
      es: 'Solicite unirse', 'pt-BR': 'Candidate-se', 'zh-CN': '申请加入', ko: '가입 신청',
      fr: 'Postulez pour rejoindre', it: 'Si candidi per entrare', nl: 'Meld u aan', sv: 'Ansök om att gå med',
    },
    body: {
      en: 'Fill in the form below. We confirm you can deliver the whole wedding, in-house or through established partners.',
      fi: 'Täytä hakemus alla. Varmistamme, että pystytte hoitamaan koko häät, joko itse tai vakiintunein kumppanisuhtein.',
      de: 'Füllen Sie das Formular unten aus. Wir bestätigen, dass Sie die gesamte Hochzeit umsetzen können, selbst oder über etablierte Partner.',
      ja: '下のフォームにご記入ください。自社または確立されたパートナーを通じて、結婚式全体を手配できることを確認します。',
      es: 'Rellene el formulario de abajo. Confirmamos que puede encargarse de toda la boda, por sí mismo o a través de socios consolidados.',
      'pt-BR': 'Preencha o formulário abaixo. Confirmamos que você consegue realizar o casamento inteiro, por conta própria ou por meio de parceiros estabelecidos.',
      'zh-CN': '填写下方表单。我们会确认你能完成整场婚礼，由自己或通过成熟的合作伙伴。',
      ko: '아래 양식을 작성하세요. 자체적으로 또는 확립된 파트너를 통해 결혼식 전체를 진행할 수 있는지 확인합니다.',
      fr: 'Remplissez le formulaire ci-dessous. Nous confirmons que vous pouvez assurer tout le mariage, en interne ou via des partenaires établis.',
      it: 'Compili il modulo qui sotto. Confermiamo che può gestire l’intero matrimonio, internamente o tramite partner consolidati.',
      nl: 'Vul het formulier hieronder in. Wij bevestigen dat u de hele bruiloft kunt verzorgen, zelf of via gevestigde partners.', sv: 'Fill in the form below. We confirm you can deliver the whole wedding, in-house or through established partners.',
    },
  },
  {
    n: '2',
    title: {
      en: 'Receive matched leads', fi: 'Saat sopivia liidejä', de: 'Passende Leads erhalten', ja: '適合したリードを受け取る',
      es: 'Reciba leads adecuados', 'pt-BR': 'Receba leads compatíveis', 'zh-CN': '接收匹配的线索', ko: '맞춤 리드 받기',
      fr: 'Recevez des leads adaptés', it: 'Riceva lead pertinenti', nl: 'Ontvang passende leads', sv: 'Få matchade leads',
    },
    body: {
      en: 'We send each enquiry to up to three partners, matched by region, style and price tier.',
      fi: 'Lähetämme enintään kolmelle kumppanille per tiedustelu, sovitettuna alueen, tyylin ja hintatason mukaan.',
      de: 'Wir senden jede Anfrage an bis zu drei Partner, abgestimmt auf Region, Stil und Preisklasse.',
      ja: '各問い合わせを最大3つのパートナーへ、地域、スタイル、価格帯に合わせてお送りします。',
      es: 'Enviamos cada consulta a un máximo de tres socios, emparejados por región, estilo y nivel de precio.',
      'pt-BR': 'Enviamos cada solicitação para até três parceiros, combinados por região, estilo e faixa de preço.',
      'zh-CN': '我们将每条咨询发送给最多三位合作伙伴，按地区、风格和价格档位匹配。',
      ko: '각 문의를 지역, 스타일, 가격대에 맞춰 최대 세 파트너에게 보냅니다.',
      fr: 'Nous envoyons chaque demande à un maximum de trois partenaires, selon la région, le style et la gamme de prix.',
      it: 'Inviamo ogni richiesta a un massimo di tre partner, abbinati per regione, stile e fascia di prezzo.',
      nl: 'We sturen elke aanvraag naar maximaal drie partners, afgestemd op regio, stijl en prijsklasse.', sv: 'Vi skickar varje förfrågan till upp till tre partner, matchade efter region, stil och prisklass.',
    },
  },
  {
    n: '3',
    title: {
      en: 'Win the couple', fi: 'Voita pari', de: 'Gewinnen Sie das Paar', ja: 'カップルを獲得',
      es: 'Gane a la pareja', 'pt-BR': 'Conquiste o casal', 'zh-CN': '赢得这对情侣', ko: '커플을 사로잡으세요',
      fr: 'Conquérez le couple', it: 'Conquisti la coppia', nl: 'Win het stel voor u', sv: 'Vinn paret',
    },
    body: {
      en: 'You contact the couple directly, quote, and close. You run the wedding from start to finish.',
      fi: 'Otat pariin yhteyttä suoraan, teet tarjouksen ja suljet kaupan. Sinä hoidat häät alusta loppuun.',
      de: 'Sie kontaktieren das Paar direkt, machen ein Angebot und schließen ab. Sie führen die Hochzeit von Anfang bis Ende durch.',
      ja: 'あなたがカップルに直接連絡し、見積もりを出し、成約します。結婚式を最初から最後まで取り仕切ります。',
      es: 'Usted contacta a la pareja directamente, presupuesta y cierra. Usted lleva la boda de principio a fin.',
      'pt-BR': 'Você contata o casal diretamente, faz a proposta e fecha. Você conduz o casamento do início ao fim.',
      'zh-CN': '你直接联系情侣、报价并成交。你从头到尾负责这场婚礼。',
      ko: '커플과 직접 연락해 견적을 내고 계약합니다. 결혼식을 처음부터 끝까지 진행합니다.',
      fr: 'Vous contactez le couple directement, faites le devis et concluez. Vous gérez le mariage du début à la fin.',
      it: 'Lei contatta la coppia direttamente, fa il preventivo e chiude. È Lei a gestire il matrimonio dall’inizio alla fine.',
      nl: 'U neemt rechtstreeks contact op met het stel, offreert en sluit af. U runt de bruiloft van begin tot eind.', sv: 'You contact the couple directly, quote, and close. You run the wedding from start to finish.',
    },
  },
];

const expectations: Card[] = [
  {
    title: {
      en: 'The full palette', fi: 'Koko paletti hallussa', de: 'Die ganze Palette', ja: 'すべてを網羅',
      es: 'La paleta completa', 'pt-BR': 'A paleta completa', 'zh-CN': '完整的服务', ko: '전체를 아우르는 역량',
      fr: 'La palette complète', it: 'L’intera gamma', nl: 'Het volledige palet', sv: 'Hela paletten',
    },
    body: {
      en: 'You can deliver the whole wedding: venue, ceremony, catering, photography, accommodation and transfers, in-house or through trusted partners.',
      fi: 'Pystytte hoitamaan koko häät, hääpaikka, vihkiminen, ruoka, valokuvaus, majoitus, kuljetukset, joko itse tai luotettavien kumppaneiden kautta.',
      de: 'Sie können die gesamte Hochzeit umsetzen, Location, Zeremonie, Catering, Fotografie, Unterkunft, Transfers, selbst oder über vertrauenswürdige Partner.',
      ja: '結婚式全体を、会場、挙式、ケータリング、写真、宿泊、送迎、自社または信頼できるパートナーを通じて手配できる。',
      es: 'Puede encargarse de toda la boda, lugar, ceremonia, catering, fotografía, alojamiento, traslados, por sí mismo o a través de socios de confianza.',
      'pt-BR': 'Você consegue realizar o casamento inteiro, local, cerimônia, buffet, fotografia, hospedagem, transfers, por conta própria ou por meio de parceiros de confiança.',
      'zh-CN': '你能完成整场婚礼，场地、仪式、餐饮、摄影、住宿、接送，由自己或通过可信合作伙伴。',
      ko: '결혼식 전체를, 웨딩 장소, 예식, 케이터링, 사진, 숙박, 이동, 자체적으로 또는 신뢰할 수 있는 파트너를 통해 진행할 수 있다.',
      fr: 'Vous pouvez assurer tout le mariage, lieu, cérémonie, traiteur, photographie, hébergement, transferts, en interne ou via des partenaires de confiance.',
      it: 'Lei può gestire l’intero matrimonio, location, cerimonia, catering, fotografia, alloggio, transfer, internamente o tramite partner fidati.',
      nl: 'U kunt de hele bruiloft verzorgen, locatie, ceremonie, catering, fotografie, accommodatie, transfers, zelf of via vertrouwde partners.', sv: 'You can deliver the whole wedding: venue, ceremony, catering, photography, accommodation and transfers, in-house or through trusted partners.',
    },
  },
  {
    title: {
      en: 'Proven Lapland track record', fi: 'Todistettu kokemus Lapista', de: 'Nachgewiesene Erfahrung in Lappland', ja: 'ラップランドでの実績',
      es: 'Trayectoria demostrada en Laponia', 'pt-BR': 'Histórico comprovado na Lapônia', 'zh-CN': '拉普兰的实绩记录', ko: '검증된 라플란드 경험',
      fr: 'Une expérience avérée en Laponie', it: 'Comprovata esperienza in Lapponia', nl: 'Bewezen staat van dienst in Lapland', sv: 'Bevisad erfarenhet från Lappland',
    },
    body: {
      en: 'An established Finland- or UK-based operator with real Lapland weddings behind you.',
      fi: 'Vakiintunut Suomessa tai UK:ssa toimiva yritys, jolla on takana oikeita Lapin häitä.',
      de: 'Ein etabliertes Unternehmen mit Sitz in Finnland oder Großbritannien und echten Lappland-Hochzeiten im Rücken.',
      ja: 'フィンランドまたはイギリスを拠点とする、実際のラップランドの結婚式実績を持つ確立された事業者。',
      es: 'Un operador consolidado con sede en Finlandia o el Reino Unido y bodas reales en Laponia a sus espaldas.',
      'pt-BR': 'Um operador consolidado com sede na Finlândia ou no Reino Unido e casamentos reais na Lapônia no seu histórico.',
      'zh-CN': '一家位于芬兰或英国的成熟运营方，拥有真实的拉普兰婚礼经验。',
      ko: '핀란드 또는 영국에 기반을 둔, 실제 라플란드 웨딩 경험을 갖춘 자리 잡은 업체.',
      fr: 'Un prestataire établi basé en Finlande ou au Royaume-Uni, avec de vrais mariages en Laponie à votre actif.',
      it: 'Un operatore affermato con sede in Finlandia o nel Regno Unito e veri matrimoni in Lapponia alle spalle.',
      nl: 'Een gevestigde aanbieder uit Finland of het VK met echte Laplandse bruiloften op uw naam.', sv: 'En etablerad aktör i Finland eller Storbritannien med riktiga lappländska bröllop bakom sig.',
    },
  },
  {
    title: {
      en: 'Fast and professional', fi: 'Nopea ja ammattimainen', de: 'Schnell und professionell', ja: '迅速かつプロフェッショナル',
      es: 'Rápido y profesional', 'pt-BR': 'Rápido e profissional', 'zh-CN': '迅速且专业', ko: '빠르고 전문적',
      fr: 'Rapide et professionnel', it: 'Veloce e professionale', nl: 'Snel en professioneel', sv: 'Snabb och professionell',
    },
    body: {
      en: 'You respond to a lead within 1–7 days and handle the couple end to end, DVV paperwork included.',
      fi: 'Vastaatte liidiin 1–7 päivän sisällä ja hoidatte parin alusta loppuun ammattitaidolla, DVV-paperit mukaan lukien.',
      de: 'Sie antworten auf einen Lead innerhalb von 1–7 Tagen und betreuen das Paar von Anfang bis Ende, inklusive DVV-Unterlagen.',
      ja: 'リードに1〜7日以内に対応し、DVV書類を含めてカップルを最初から最後まで担当する。',
      es: 'Usted responde a un lead en 1–7 días y se encarga de la pareja de principio a fin, incluidos los trámites del DVV.',
      'pt-BR': 'Você responde a um lead em 1–7 dias e cuida do casal do início ao fim, incluindo a documentação do DVV.',
      'zh-CN': '你在 1–7 天内回应线索，并从头到尾服务这对情侣，包括 DVV 文件。',
      ko: '리드에 1~7일 내로 응답하고 DVV 서류를 포함해 커플을 처음부터 끝까지 책임진다.',
      fr: 'Vous répondez à un lead sous 1 à 7 jours et accompagnez le couple de bout en bout, formalités DVV comprises.',
      it: 'Lei risponde a un lead entro 1–7 giorni e segue la coppia dall’inizio alla fine, documenti DVV inclusi.',
      nl: 'U reageert binnen 1–7 dagen op een lead en begeleidt het stel van begin tot eind, inclusief DVV-papierwerk.', sv: 'You respond to a lead within 1–7 days and handle the couple end to end, DVV paperwork included.',
    },
  },
];

const terms: Card[] = [
  {
    title: {
      en: 'A clear agreement', fi: 'Sopimus pohjana', de: 'Eine klare Vereinbarung', ja: '明確な合意',
      es: 'Un acuerdo claro', 'pt-BR': 'Um acordo claro', 'zh-CN': '清晰的协议', ko: '명확한 계약',
      fr: 'Un accord clair', it: 'Un accordo chiaro', nl: 'Een heldere overeenkomst', sv: 'Ett tydligt avtal',
    },
    body: {
      en: 'Every partnership starts from a simple written agreement we walk through together before your first lead. No monthly fees, no lock-in: just fair terms on both sides.',
      fi: 'Kumppanuus perustuu selkeään sopimukseen, jonka käymme yhdessä läpi ennen ensimmäistä liidiä. Ei kuukausimaksuja eikä sitoutumista: vain reilut ehdot puolin ja toisin.',
      de: 'Jede Partnerschaft beginnt mit einer einfachen schriftlichen Vereinbarung, die wir vor Ihrem ersten Lead gemeinsam durchgehen. Keine monatlichen Gebühren, keine Bindung: nur faire Bedingungen für beide Seiten.',
      ja: 'すべてのパートナーシップは、最初のリードの前に一緒に確認するシンプルな書面合意から始まります。月額料金なし、拘束なし。双方にとって公正な条件だけ。',
      es: 'Toda colaboración parte de un acuerdo escrito sencillo que repasamos juntos antes de su primer lead. Sin cuotas mensuales, sin permanencia: solo condiciones justas para ambas partes.',
      'pt-BR': 'Toda parceria começa com um acordo escrito simples que revisamos juntos antes do seu primeiro lead. Sem mensalidades, sem fidelidade: apenas condições justas para os dois lados.',
      'zh-CN': '每段合作都从一份简单的书面协议开始，在你收到第一条线索前我们会一起过一遍。无月费、无锁定，只有对双方公平的条款。',
      ko: '모든 파트너십은 첫 리드 전에 함께 검토하는 간단한 서면 계약에서 시작됩니다. 월 요금도, 약정도 없습니다. 양측 모두에게 공정한 조건만 있습니다.',
      fr: 'Chaque partenariat part d’un accord écrit simple que nous parcourons ensemble avant votre premier lead. Pas de frais mensuels, pas d’engagement : juste des conditions équitables des deux côtés.',
      it: 'Ogni collaborazione parte da un semplice accordo scritto che esaminiamo insieme prima del Suo primo lead. Nessun canone mensile, nessun vincolo: solo condizioni eque per entrambe le parti.',
      nl: 'Elke samenwerking start vanuit een eenvoudige schriftelijke overeenkomst die we samen doornemen vóór uw eerste lead. Geen maandelijkse kosten, geen vaste binding: alleen eerlijke voorwaarden aan beide kanten.', sv: 'Every partnership starts from a simple written agreement we walk through together before your first lead. No monthly fees, no lock-in: just fair terms on both sides.',
    },
  },
  {
    title: {
      en: 'Quality and responsibility', fi: 'Laatu ja vastuu', de: 'Qualität und Verantwortung', ja: '品質と責任',
      es: 'Calidad y responsabilidad', 'pt-BR': 'Qualidade e responsabilidade', 'zh-CN': '质量与责任', ko: '품질과 책임',
      fr: 'Qualité et responsabilité', it: 'Qualità e responsabilità', nl: 'Kwaliteit en verantwoordelijkheid', sv: 'Kvalitet och ansvar',
    },
    body: {
      en: 'We improve lead quality continuously, but couples enter their own details and we cannot guarantee every lead. Once a lead is delivered, the couple is yours to serve and yours to answer for. You own the relationship end to end.',
      fi: 'Parannamme liidien laatua jatkuvasti, mutta pari täyttää tietonsa itse, emmekä voi taata jokaisen liidin laatua. Kun liidi on toimitettu, parin palvelu ja vastuu siirtyvät sinulle. Omistat asiakassuhteen alusta loppuun.',
      de: 'Wir verbessern die Lead-Qualität laufend, aber Paare geben ihre Daten selbst ein, und wir können nicht jeden Lead garantieren. Sobald ein Lead übergeben ist, gehen die Betreuung des Paares, und die Verantwortung dafür, auf Sie über. Sie besitzen die Beziehung von Anfang bis Ende.',
      ja: 'リードの品質は継続的に改善していますが、情報はカップル自身が入力するため、すべてのリードを保証することはできません。リードが引き渡された時点で、カップルへの対応とその責任はあなたに移ります。関係は最初から最後まであなたのものです。',
      es: 'Mejoramos continuamente la calidad de los leads, pero las parejas introducen sus propios datos y no podemos garantizar cada lead. Una vez entregado el lead, atender a la pareja, y la responsabilidad de ello, pasa a usted. La relación es suya de principio a fin.',
      'pt-BR': 'Melhoramos a qualidade dos leads continuamente, mas os casais inserem os próprios dados e não podemos garantir cada lead. Depois que o lead é entregue, atender o casal, e a responsabilidade por isso, passa a ser sua. O relacionamento é seu do início ao fim.',
      'zh-CN': '我们持续提升线索质量，但资料由情侣自行填写，我们无法保证每一条线索。线索一经交付，服务情侣及相应责任便转交给你。这段关系自始至终归你所有。',
      ko: '리드 품질을 지속적으로 개선하지만, 정보는 커플이 직접 입력하므로 모든 리드를 보장할 수는 없습니다. 리드가 전달되면 커플 응대와 그 책임은 여러분에게 넘어갑니다. 관계는 처음부터 끝까지 여러분의 것입니다.',
      fr: 'Nous améliorons en continu la qualité des leads, mais les couples saisissent eux-mêmes leurs informations et nous ne pouvons garantir chaque lead. Une fois le lead transmis, le service au couple, et la responsabilité qui en découle, vous revient. La relation vous appartient de bout en bout.',
      it: 'Miglioriamo costantemente la qualità dei lead, ma sono le coppie a inserire i propri dati e non possiamo garantire ogni lead. Una volta consegnato il lead, la cura della coppia, e la relativa responsabilità, passa a Lei. La relazione è Sua dall’inizio alla fine.',
      nl: 'We verbeteren de leadkwaliteit voortdurend, maar stellen vullen hun eigen gegevens in en we kunnen niet elke lead garanderen. Zodra een lead is geleverd, gaan de bediening van het stel, en de verantwoordelijkheid daarvoor, naar u over. De relatie is van begin tot eind van u.', sv: 'We improve lead quality continuously, but couples enter their own details and we cannot guarantee every lead. Once a lead is delivered, the couple is yours to serve and yours to answer for. You own the relationship end to end.',
    },
  },
  {
    title: {
      en: 'Report and credit', fi: 'Reklamaatio ja hyvitys', de: 'Melden und gutschreiben', ja: '報告とクレジット',
      es: 'Avísenos y reciba un crédito', 'pt-BR': 'Reporte e receba crédito', 'zh-CN': '反馈与抵扣', ko: '신고와 크레딧',
      fr: 'Signaler et créditer', it: 'Segnali e riceva un credito', nl: 'Melden en crediteren', sv: 'Rapportering och kreditering',
    },
    body: {
      en: 'If a lead turns out to be clearly invalid (wrong contact details, or not a genuine enquiry), tell us and we credit it against your next lead. You only ever pay for real couples.',
      fi: 'Jos liidi osoittautuu selvästi virheelliseksi, väärät yhteystiedot tai ei aito tiedustelu, ilmoita meille, ja hyvitämme sen seuraavasta liidistä. Maksat vain aidoista pareista.',
      de: 'Stellt sich ein Lead als eindeutig ungültig heraus, falsche Kontaktdaten oder keine echte Anfrage, sagen Sie uns Bescheid, und wir rechnen ihn auf Ihren nächsten Lead an. Sie zahlen immer nur für echte Paare.',
      ja: 'リードが明らかに無効と判明した場合、連絡先が誤っている、または本物の問い合わせでない、お知らせいただければ次のリードで相殺します。お支払いは本物のカップルの分だけです。',
      es: 'Si un lead resulta claramente inválido, datos de contacto erróneos o no es una consulta genuina, avísenos y lo abonamos en su próximo lead. Usted solo paga por parejas reales.',
      'pt-BR': 'Se um lead se mostrar claramente inválido, dados de contato errados ou não for uma solicitação genuína, avise-nos e abatemos no seu próximo lead. Você só paga por casais reais.',
      'zh-CN': '如果某条线索明显无效，联系方式错误或并非真实咨询，请告知我们，我们会在你的下一条线索中予以抵扣。你只为真实的情侣付费。',
      ko: '리드가 명백히 잘못된 경우, 연락처 오류이거나 진짜 문의가 아닌 경우, 알려주시면 다음 리드에서 차감해 드립니다. 여러분은 오직 실제 커플에 대해서만 비용을 냅니다.',
      fr: 'Si un lead s’avère clairement invalide, coordonnées erronées ou demande non authentique, signalez-le-nous et nous le créditons sur votre prochain lead. Vous ne payez que pour de vrais couples.',
      it: 'Se un lead risulta chiaramente non valido, contatti errati o richiesta non autentica, ce lo segnali e lo accreditiamo sul Suo prossimo lead. Lei paga solo per coppie reali.',
      nl: 'Blijkt een lead duidelijk ongeldig, verkeerde contactgegevens of geen echte aanvraag, laat het ons weten en we crediteren het op uw volgende lead. U betaalt alleen voor echte stellen.', sv: 'If a lead turns out to be clearly invalid (wrong contact details, or not a genuine enquiry), tell us and we credit it against your next lead. You only ever pay for real couples.',
    },
  },
];

type CKey =
  | 'seoTitle' | 'seoDesc'
  | 'heroEyebrow' | 'heroTitle' | 'heroSubtitle' | 'heroImageAlt' | 'heroCta'
  | 'conceptEyebrow' | 'conceptTitle' | 'conceptSubtitle' | 'conceptFooter'
  | 'whyEyebrow' | 'whyTitle' | 'whySubtitle'
  | 'howEyebrow' | 'howTitle'
  | 'priceEyebrow' | 'priceTitle' | 'priceSubtitle'
  | 'sharedLead' | 'exclusiveLead' | 'perLead' | 'sharedBody' | 'fromPrice' | 'exclusiveBody' | 'priceFooter'
  | 'termsEyebrow' | 'termsTitle' | 'termsSubtitle'
  | 'criteriaEyebrow' | 'criteriaTitle' | 'criteriaSubtitle'
  | 'applyEyebrow' | 'applyTitle' | 'applySubtitle';

const C: Record<CKey, Localized<string>> = {
  seoTitle: {
    en: 'Become a partner: Lapland wedding leads year-round | LaplandWeddings',
    fi: 'Liity kumppaniksi: Lapin hääliidejä | LaplandWeddings',
    de: 'Partner werden: Lappland-Hochzeitsleads | LaplandWeddings',
    ja: 'パートナーになる：通年でラップランドの結婚式リードを | LaplandWeddings',
    es: 'Hágase socio: leads de bodas en Laponia | LaplandWeddings',
    'pt-BR': 'Torne-se parceiro: leads de casamento | LaplandWeddings',
    'zh-CN': '成为合作伙伴，全年拉普兰婚礼线索 | LaplandWeddings',
    ko: '파트너 되기: 연중 라플란드 웨딩 리드 | LaplandWeddings',
    fr: 'Devenir partenaire : leads de mariage | LaplandWeddings',
    it: 'Diventare partner: lead di matrimoni | LaplandWeddings',
    nl: 'Word partner: Laplandse trouwleads | LaplandWeddings', sv: 'Bli partner: bröllopsleads från Lappland året runt | LaplandWeddings',
  },
  seoDesc: {
    en: 'Become a LaplandWeddings partner: qualified Lapland wedding leads year-round, pay only for the leads you receive, no monthly fee. First lead free.',
    fi: 'Liity LaplandWeddings-kumppaniksi: valmiita Lapin hääliidejä ympäri vuoden, maksat vain saamistasi liideistä, ei kuukausimaksuja. Ensimmäinen liidi maksutta.',
    de: 'Werden Sie LaplandWeddings-Partner: qualifizierte Lappland-Hochzeitsleads das ganze Jahr, zahlen Sie nur für erhaltene Leads, keine monatliche Gebühr.',
    ja: 'LaplandWeddingsのパートナーに：通年で質の高いラップランドの結婚式リード、受け取ったリードの分だけお支払い、月額料金なし。最初のリードは無料。',
    es: 'Hágase socio de LaplandWeddings: leads de bodas de Laponia cualificados todo el año, paga solo por los leads que recibe, sin cuota mensual. Primer lead gratis.',
    'pt-BR': 'Torne-se parceiro da LaplandWeddings: leads qualificados de casamentos na Lapônia o ano todo, pague só pelos leads que receber, sem mensalidade.',
    'zh-CN': '成为 LaplandWeddings 合作伙伴：全年获得高质量拉普兰婚礼线索，只为你收到的线索付费，无月费。首条线索免费。',
    ko: 'LaplandWeddings 파트너가 되세요: 연중 검증된 라플란드 웨딩 리드, 받은 리드만큼만 지불, 월 요금 없음. 첫 리드 무료.',
    fr: 'Devenez partenaire LaplandWeddings : des leads de mariage en Laponie qualifiés toute l’année, payez uniquement les leads reçus, sans frais mensuels.',
    it: 'Diventi partner LaplandWeddings: lead qualificati di matrimoni in Lapponia tutto l’anno, paghi solo i lead che riceve, nessun canone mensile. Primo lead gratis.',
    nl: 'Word LaplandWeddings-partner: gekwalificeerde Laplandse trouwleads het hele jaar, betaal alleen voor ontvangen leads, geen maandelijkse kosten.', sv: 'Bli LaplandWeddings-partner: kvalificerade bröllopsleads från Lappland året runt, betala bara för de leads du får, ingen månadsavgift. Första leadet gratis.',
  },
  heroEyebrow: {
    en: 'For wedding professionals', fi: 'Kumppaneille', de: 'Für Hochzeitsprofis', ja: 'ウェディングのプロの方へ',
    es: 'Para profesionales de bodas', 'pt-BR': 'Para profissionais de casamento', 'zh-CN': '致婚礼从业者', ko: '웨딩 전문가를 위해',
    fr: 'Pour les professionnels du mariage', it: 'Per i professionisti del wedding', nl: 'Voor trouwprofessionals', sv: 'För bröllopsproffs',
  },
  heroTitle: {
    en: 'Become a LaplandWeddings partner', fi: 'Liity LaplandWeddings-kumppaniksi',
    de: 'Werden Sie LaplandWeddings-Partner', ja: 'LaplandWeddingsのパートナーになる',
    es: 'Hágase socio de LaplandWeddings', 'pt-BR': 'Torne-se parceiro da LaplandWeddings',
    'zh-CN': '成为 LaplandWeddings 合作伙伴', ko: 'LaplandWeddings 파트너가 되세요',
    fr: 'Devenez partenaire LaplandWeddings', it: 'Diventi partner LaplandWeddings',
    nl: 'Word LaplandWeddings-partner', sv: 'Bli partner till LaplandWeddings',
  },
  heroSubtitle: {
    en: 'Qualified Lapland wedding leads straight to your inbox, from Northern Lights to Midnight Sun, all year round. You pay only for the leads you receive.',
    fi: 'Valmiita Lapin hääliidejä suoraan sähköpostiisi, revontulista keskiyön aurinkoon, ympäri vuoden. Maksat vain saamistasi liideistä.',
    de: 'Qualifizierte Lappland-Hochzeitsleads direkt in Ihr Postfach, von den Polarlichtern bis zur Mitternachtssonne, das ganze Jahr. Sie zahlen nur für erhaltene Leads.',
    ja: '質の高いラップランドの結婚式リードを直接受信箱へ、オーロラから白夜まで、一年中。受け取ったリードの分だけお支払いいただきます。',
    es: 'Leads de bodas de Laponia cualificados directamente en su bandeja de entrada, de la aurora boreal al sol de medianoche, todo el año. Usted paga solo por los leads que recibe.',
    'pt-BR': 'Leads qualificados de casamentos na Lapônia direto na sua caixa de entrada, da aurora boreal ao sol da meia-noite, o ano todo. Você paga só pelos leads que recebe.',
    'zh-CN': '高质量的拉普兰婚礼线索直达你的收件箱，从北极光到午夜阳光，全年不断。你只为收到的线索付费。',
    ko: '검증된 라플란드 웨딩 리드를 받은 편지함으로 바로, 오로라부터 백야까지, 일 년 내내. 받은 리드만큼만 지불합니다.',
    fr: 'Des leads de mariage en Laponie qualifiés directement dans votre boîte de réception, des aurores boréales au soleil de minuit, toute l’année. Vous ne payez que les leads reçus.',
    it: 'Lead qualificati di matrimoni in Lapponia direttamente nella Sua casella, dall’aurora boreale al sole di mezzanotte, tutto l’anno. Lei paga solo i lead che riceve.',
    nl: 'Gekwalificeerde Laplandse trouwleads rechtstreeks in uw inbox, van noorderlicht tot middernachtzon, het hele jaar door. U betaalt alleen voor ontvangen leads.', sv: 'Qualified Lapland wedding leads straight to your inbox, from Northern Lights to Midnight Sun, all year round. You pay only for the leads you receive.',
  },
  heroImageAlt: {
    en: 'Wedding couple under the Northern Lights in Lapland',
    fi: 'Hääpari revontulien alla Lapissa',
    de: 'Hochzeitspaar unter den Polarlichtern in Lappland',
    ja: 'ラップランドのオーロラの下の結婚式カップル',
    es: 'Pareja de novios bajo la aurora boreal en Laponia',
    'pt-BR': 'Casal de noivos sob a aurora boreal na Lapônia',
    'zh-CN': '拉普兰北极光下的新婚夫妇',
    ko: '라플란드 오로라 아래의 신혼부부',
    fr: 'Couple de mariés sous les aurores boréales en Laponie',
    it: 'Coppia di sposi sotto l’aurora boreale in Lapponia',
    nl: 'Bruidspaar onder het noorderlicht in Lapland', sv: 'Brudpar under norrskenet i Lappland',
  },
  heroCta: {
    en: 'Apply to join the network', fi: 'Hae mukaan verkostoon', de: 'Dem Netzwerk beitreten', ja: 'ネットワークに参加申し込み',
    es: 'Solicite unirse a la red', 'pt-BR': 'Candidate-se à rede', 'zh-CN': '申请加入网络', ko: '네트워크 가입 신청',
    fr: 'Postuler pour rejoindre le réseau', it: 'Si candidi per entrare nella rete', nl: 'Meld u aan voor het netwerk', sv: 'Ansök om att gå med i nätverket',
  },
  conceptEyebrow: {
    en: 'What is LaplandVibes', fi: 'Mikä on LaplandVibes', de: 'Was ist LaplandVibes', ja: 'LaplandVibesとは',
    es: 'Qué es LaplandVibes', 'pt-BR': 'O que é a LaplandVibes', 'zh-CN': '什么是 LaplandVibes', ko: 'LaplandVibes란',
    fr: 'Qu’est-ce que LaplandVibes', it: 'Cos’è LaplandVibes', nl: 'Wat is LaplandVibes', sv: 'Vad är LaplandVibes',
  },
  conceptTitle: {
    en: 'Finnish Lapland’s largest travel network',
    fi: 'Suomen Lapin laajin matkailuverkosto',
    de: 'Das größte Reisenetzwerk im finnischen Lappland',
    ja: 'フィンランド領ラップランド最大の旅行ネットワーク',
    es: 'La mayor red de viajes de la Laponia finlandesa',
    'pt-BR': 'A maior rede de viagens da Lapônia finlandesa',
    'zh-CN': '芬兰拉普兰最大的旅游网络',
    ko: '핀란드 라플란드 최대 여행 네트워크',
    fr: 'Le plus grand réseau de voyage de la Laponie finlandaise',
    it: 'La più grande rete di viaggi della Lapponia finlandese',
    nl: 'Het grootste reisnetwerk van Fins Lapland', sv: 'Finska Lapplands största resenätverk',
  },
  conceptSubtitle: {
    en: 'LaplandWeddings is part of the LaplandVibes network. When a traveller plans a Lapland trip (lodging, a husky safari, dinner, flights), they land on our sites. Those dreaming of a wedding are funnelled to one form, and that form comes to you.',
    fi: 'LaplandWeddings on osa LaplandVibes-verkostoa. Kun matkailija suunnittelee Lapin-reissua, majoitusta, huskysafaria, ravintolaa, lentoa, hän päätyy verkostomme sivuille. Häistä haaveilevat ohjataan yhdelle lomakkeelle, ja se lomake tulee sinulle.',
    de: 'LaplandWeddings ist Teil des LaplandVibes-Netzwerks. Wenn ein Reisender eine Lappland-Reise plant, Unterkunft, eine Husky-Safari, Dinner, Flüge, landet er auf unseren Seiten. Wer von einer Hochzeit träumt, wird zu einem Formular geführt, und dieses Formular kommt zu Ihnen.',
    ja: 'LaplandWeddingsはLaplandVibesネットワークの一部です。旅行者がラップランド旅行、宿泊、ハスキーサファリ、ディナー、フライトを計画すると、私たちのサイトにたどり着きます。結婚式を夢見る人は1つのフォームに導かれ、そのフォームがあなたに届きます。',
    es: 'LaplandWeddings forma parte de la red LaplandVibes. Cuando un viajero planea un viaje a Laponia, alojamiento, un safari de huskies, una cena, vuelos, aterriza en nuestros sitios. Quienes sueñan con una boda son dirigidos a un único formulario, y ese formulario llega a usted.',
    'pt-BR': 'A LaplandWeddings faz parte da rede LaplandVibes. Quando um viajante planeja uma viagem à Lapônia, hospedagem, um safári de huskies, jantar, voos, ele chega aos nossos sites. Quem sonha com um casamento é direcionado a um único formulário, e esse formulário chega até você.',
    'zh-CN': 'LaplandWeddings 是 LaplandVibes 网络的一部分。当旅行者规划拉普兰之旅时，住宿、哈士奇雪橇之旅、晚餐、机票，他们会进入我们的网站。梦想举办婚礼的人会被引导到同一个表单，而这个表单会送到你手中。',
    ko: 'LaplandWeddings는 LaplandVibes 네트워크의 일부입니다. 여행자가 라플란드 여행, 숙박, 허스키 사파리, 저녁 식사, 항공편 을 계획할 때 우리 사이트에 도달합니다. 결혼을 꿈꾸는 이들은 하나의 양식으로 모이고, 그 양식이 여러분에게 전달됩니다.',
    fr: 'LaplandWeddings fait partie du réseau LaplandVibes. Lorsqu’un voyageur planifie un séjour en Laponie, hébergement, safari husky, dîner, vols, il arrive sur nos sites. Ceux qui rêvent d’un mariage sont orientés vers un seul formulaire, et ce formulaire vous parvient.',
    it: 'LaplandWeddings fa parte della rete LaplandVibes. Quando un viaggiatore pianifica un viaggio in Lapponia, alloggio, un husky-safari, cena, voli, approda sui nostri siti. Chi sogna un matrimonio viene indirizzato a un unico modulo, e quel modulo arriva a Lei.',
    nl: 'LaplandWeddings maakt deel uit van het LaplandVibes-netwerk. Wanneer een reiziger een Laplandreis plant, verblijf, een husky-safari, diner, vluchten, belandt die op onze sites. Wie van een bruiloft droomt, wordt naar één formulier geleid, en dat formulier komt bij u.', sv: 'LaplandWeddings is part of the LaplandVibes network. When a traveller plans a Lapland trip (lodging, a husky safari, dinner, flights), they land on our sites. Those dreaming of a wedding are funnelled to one form, and that form comes to you.',
  },
  conceptFooter: {
    en: 'The network draws a steady flow of travellers from around the world all year, and the Lapland wedding market grows every season.',
    fi: 'Verkostossa käy ympäri vuoden runsaasti matkailijoita kaikkialta maailmasta, ja Lapin häämarkkina kasvaa joka kausi.',
    de: 'Das Netzwerk zieht das ganze Jahr über einen steten Strom von Reisenden aus aller Welt an, und der Lappland-Hochzeitsmarkt wächst mit jeder Saison.',
    ja: 'ネットワークには一年を通じて世界中から旅行者が絶えず訪れます。そしてラップランドの結婚式市場は毎シーズン成長しています。',
    es: 'La red atrae un flujo constante de viajeros de todo el mundo durante todo el año, y el mercado de bodas de Laponia crece cada temporada.',
    'pt-BR': 'A rede atrai um fluxo constante de viajantes do mundo todo o ano inteiro, e o mercado de casamentos da Lapônia cresce a cada temporada.',
    'zh-CN': '该网络全年吸引来自世界各地络绎不绝的旅行者，而拉普兰婚礼市场每个季节都在增长。',
    ko: '이 네트워크는 연중 전 세계에서 꾸준히 여행자를 끌어모읍니다. 그리고 라플란드 웨딩 시장은 시즌마다 성장합니다.',
    fr: 'Le réseau attire un flux constant de voyageurs du monde entier toute l’année, et le marché du mariage en Laponie grandit à chaque saison.',
    it: 'La rete attira un flusso costante di viaggiatori da tutto il mondo tutto l’anno, e il mercato dei matrimoni in Lapponia cresce a ogni stagione.',
    nl: 'Het netwerk trekt het hele jaar een gestage stroom reizigers van over de hele wereld, en de Laplandse huwelijksmarkt groeit elk seizoen.', sv: 'The network draws a steady flow of travellers from around the world all year, and the Lapland wedding market grows every season.',
  },
  whyEyebrow: {
    en: 'Why join', fi: 'Miksi liittyä', de: 'Warum mitmachen', ja: '参加する理由',
    es: 'Por qué unirse', 'pt-BR': 'Por que entrar', 'zh-CN': '为何加入', ko: '가입 이유',
    fr: 'Pourquoi rejoindre', it: 'Perché unirsi', nl: 'Waarom meedoen', sv: 'Varför gå med',
  },
  whyTitle: {
    en: 'Leads, not lead-hunting', fi: 'Liidejä, ei liidien metsästystä',
    de: 'Leads, kein Lead-Jagen', ja: 'リードを、リード探しではなく',
    es: 'Leads, no caza de leads', 'pt-BR': 'Leads, não caça a leads',
    'zh-CN': '获得线索，而非追逐线索', ko: '리드를, 리드 사냥이 아니라',
    fr: 'Des leads, pas de la chasse aux leads', it: 'Lead, non caccia ai lead',
    nl: 'Leads, geen leadjacht', sv: 'Leads, inte leadsjakt',
  },
  whySubtitle: {
    en: 'You do what you do best. We bring the couples to your door.',
    fi: 'Sinä teet sen minkä osaat parhaiten. Me tuomme parit ovellesi.',
    de: 'Sie tun, was Sie am besten können. Wir bringen die Paare zu Ihnen.',
    ja: 'あなたは得意なことに集中。カップルは私たちがお届けします。',
    es: 'Usted hace lo que mejor sabe hacer. Nosotros llevamos las parejas hasta su puerta.',
    'pt-BR': 'Você faz o que sabe fazer de melhor. Nós levamos os casais até a sua porta.',
    'zh-CN': '你做你最擅长的，我们把情侣带到你门前。',
    ko: '여러분은 가장 잘하는 일을 하세요. 커플은 저희가 문 앞까지 데려다드립니다.',
    fr: 'Vous faites ce que vous faites de mieux; nous amenons les couples jusqu’à votre porte.',
    it: 'Lei fa ciò che sa fare meglio; noi portiamo le coppie alla Sua porta.',
    nl: 'U doet waar u het beste in bent; wij brengen de stellen naar u toe.', sv: 'Du gör det du är bäst på. Vi för paren till din dörr.',
  },
  howEyebrow: {
    en: 'How it works', fi: 'Näin se toimii', de: 'So funktioniert es', ja: '仕組み',
    es: 'Cómo funciona', 'pt-BR': 'Como funciona', 'zh-CN': '运作方式', ko: '진행 방식',
    fr: 'Comment ça marche', it: 'Come funziona', nl: 'Hoe het werkt', sv: 'Så fungerar det',
  },
  howTitle: {
    en: 'Three steps', fi: 'Kolme askelta', de: 'Drei Schritte', ja: '3つのステップ',
    es: 'Tres pasos', 'pt-BR': 'Três passos', 'zh-CN': '三个步骤', ko: '세 단계',
    fr: 'Trois étapes', it: 'Tre passaggi', nl: 'Drie stappen', sv: 'Tre steg',
  },
  priceEyebrow: {
    en: 'Pricing', fi: 'Hinnoittelu', de: 'Preise', ja: '料金',
    es: 'Precios', 'pt-BR': 'Preços', 'zh-CN': '价格', ko: '요금',
    fr: 'Tarifs', it: 'Prezzi', nl: 'Prijzen', sv: 'Priser',
  },
  priceTitle: {
    en: 'Your first lead is free', fi: 'Ensimmäinen liidi maksutta',
    de: 'Ihr erster Lead ist kostenlos', ja: '最初のリードは無料',
    es: 'Su primer lead es gratis', 'pt-BR': 'Seu primeiro lead é grátis',
    'zh-CN': '你的首条线索免费', ko: '첫 리드는 무료입니다',
    fr: 'Votre premier lead est gratuit', it: 'Il Suo primo lead è gratis',
    nl: 'Uw eerste lead is gratis', sv: 'Ditt första lead är gratis',
  },
  priceSubtitle: {
    en: 'No monthly fees, no setup cost. Pick the model that suits you.',
    fi: 'Ei kuukausimaksuja, ei perustamismaksua. Valitse malli, joka sopii sinulle.',
    de: 'Keine monatlichen Gebühren, keine Einrichtungskosten. Wählen Sie das Modell, das zu Ihnen passt.',
    ja: '月額料金なし、初期費用なし。あなたに合ったモデルをお選びください。',
    es: 'Sin cuotas mensuales, sin coste de configuración. Elija el modelo que le convenga.',
    'pt-BR': 'Sem mensalidades, sem custo de configuração. Escolha o modelo que combina com você.',
    'zh-CN': '无月费，无开通费用。选择适合你的方案。',
    ko: '월 요금 없음, 설정 비용 없음. 여러분에게 맞는 모델을 선택하세요.',
    fr: 'Pas de frais mensuels, pas de frais de mise en route. Choisissez le modèle qui vous convient.',
    it: 'Nessun canone mensile, nessun costo di attivazione. Scelga il modello più adatto a Lei.',
    nl: 'Geen maandelijkse kosten, geen opstartkosten. Kies het model dat bij u past.', sv: 'Inga månadsavgifter, ingen startkostnad. Välj den modell som passar dig.',
  },
  sharedLead: {
    en: 'Shared lead', fi: 'Jaettu liidi', de: 'Geteilter Lead', ja: '共有リード',
    es: 'Lead compartido', 'pt-BR': 'Lead compartilhado', 'zh-CN': '共享线索', ko: '공유 리드',
    fr: 'Lead partagé', it: 'Lead condiviso', nl: 'Gedeelde lead', sv: 'Delat lead',
  },
  exclusiveLead: {
    en: 'Exclusive lead', fi: 'Eksklusiivinen liidi', de: 'Exklusiver Lead', ja: '専有リード',
    es: 'Lead exclusivo', 'pt-BR': 'Lead exclusivo', 'zh-CN': '独家线索', ko: '독점 리드',
    fr: 'Lead exclusif', it: 'Lead esclusivo', nl: 'Exclusieve lead', sv: 'Exklusivt lead',
  },
  perLead: {
    en: 'lead', fi: 'liidi', de: 'Lead', ja: 'リード',
    es: 'lead', 'pt-BR': 'lead', 'zh-CN': '条线索', ko: '리드',
    fr: 'lead', it: 'lead', nl: 'lead', sv: 'lead',
  },
  sharedBody: {
    en: 'You pay only for the leads you receive: real couples actively looking for what you offer. Each lead is shared with at most three partners, so the competition stays fair. Your first lead is free.',
    fi: 'Maksat vain saamistasi liideistä: valmiita pareja, jotka etsivät juuri sinun palveluitasi. Sama liidi jaetaan enintään kolmen kumppanin kesken, joten kilpailu pysyy reiluna. Ensimmäinen liidi maksutta.',
    de: 'Sie zahlen nur für erhaltene Leads: echte Paare, die aktiv nach Ihrem Angebot suchen. Jeder Lead wird mit höchstens drei Partnern geteilt, sodass der Wettbewerb fair bleibt. Ihr erster Lead ist kostenlos.',
    ja: '受け取ったリードの分だけお支払い：あなたの提供するものを積極的に探す本物のカップルです。各リードは最大3つのパートナーで共有されるため、競争はフェアに保たれます。最初のリードは無料です。',
    es: 'Usted paga solo por los leads que recibe: parejas reales que buscan activamente lo que ofrece. Cada lead se comparte con un máximo de tres socios, así la competencia es justa. Su primer lead es gratis.',
    'pt-BR': 'Você paga só pelos leads que recebe: casais reais procurando ativamente o que você oferece. Cada lead é compartilhado com no máximo três parceiros, então a concorrência é justa. Seu primeiro lead é grátis.',
    'zh-CN': '你只为收到的线索付费，都是正在主动寻找你所提供服务的真实情侣。每条线索最多与三位合作伙伴共享，竞争因此保持公平。你的首条线索免费。',
    ko: '받은 리드만큼만 지불합니다: 여러분이 제공하는 것을 적극적으로 찾는 실제 커플입니다. 각 리드는 최대 세 파트너와 공유되어 경쟁이 공정하게 유지됩니다. 첫 리드는 무료입니다.',
    fr: 'Vous ne payez que les leads reçus: de vrais couples qui recherchent activement ce que vous proposez. Chaque lead est partagé avec trois partenaires au maximum, la concurrence reste donc équitable. Votre premier lead est gratuit.',
    it: 'Lei paga solo i lead che riceve: coppie reali che cercano attivamente ciò che offre. Ogni lead è condiviso con al massimo tre partner, così la concorrenza resta equa. Il Suo primo lead è gratis.',
    nl: 'U betaalt alleen voor ontvangen leads: echte stellen die actief op zoek zijn naar wat u biedt. Elke lead wordt met maximaal drie partners gedeeld, zodat de concurrentie eerlijk blijft. Uw eerste lead is gratis.', sv: 'You pay only for the leads you receive: real couples actively looking for what you offer. Each lead is shared with at most three partners, so the competition stays fair. Your first lead is free.',
  },
  fromPrice: {
    en: 'from €75', fi: 'alk. €75', de: 'ab 75 €', ja: '75ユーロ〜',
    es: 'desde 75 €', 'pt-BR': 'a partir de € 75', 'zh-CN': '75 欧元起', ko: '75유로부터',
    fr: 'à partir de 75 €', it: 'da 75 €', nl: 'vanaf € 75', sv: 'från 75 €',
  },
  exclusiveBody: {
    en: 'The couple is yours alone; the same lead goes to no one else. Straightforward: you know exactly what you pay, and you give the couple your full attention with no competition.',
    fi: 'Saat parin yksin; sama liidi ei mene kenellekään muulle. Suoraviivaista: tiedät tarkalleen mitä maksat ja saat täyden huomion parille ilman kilpailua.',
    de: 'Das Paar gehört Ihnen allein; derselbe Lead geht an niemanden sonst. Unkompliziert: Sie wissen genau, was Sie zahlen, und widmen dem Paar Ihre volle Aufmerksamkeit ohne Konkurrenz.',
    ja: 'カップルはあなただけのもの。同じリードは他の誰にも渡りません。明快です：支払う金額が正確に分かり、競争なしでカップルに全力を注げます。',
    es: 'La pareja es solo suya; el mismo lead no va a nadie más. Sencillo: usted sabe exactamente lo que paga y dedica a la pareja toda su atención sin competencia.',
    'pt-BR': 'O casal é só seu; o mesmo lead não vai para mais ninguém. Simples: você sabe exatamente quanto paga e dá ao casal toda a sua atenção, sem concorrência.',
    'zh-CN': '这对情侣只属于你，同一条线索不会发给其他任何人。简单明了：你确切知道自己要付多少，并能毫无竞争地全心服务这对情侣。',
    ko: '커플은 오직 여러분만의 것입니다. 같은 리드는 다른 누구에게도 가지 않습니다. 간단명료합니다: 지불 금액을 정확히 알고, 경쟁 없이 커플에게 온전히 집중할 수 있습니다.',
    fr: 'Le couple n’est qu’à vous; le même lead ne va à personne d’autre. Simple : vous savez exactement ce que vous payez et accordez au couple toute votre attention, sans concurrence.',
    it: 'La coppia è solo Sua; lo stesso lead non va a nessun altro. Semplice: sa esattamente quanto paga e dedica alla coppia la massima attenzione senza concorrenza.',
    nl: 'Het stel is alleen van u; dezelfde lead gaat naar niemand anders. Eenvoudig: u weet precies wat u betaalt en geeft het stel uw volle aandacht zonder concurrentie.', sv: 'The couple is yours alone; the same lead goes to no one else. Straightforward: you know exactly what you pay, and you give the couple your full attention with no competition.',
  },
  priceFooter: {
    en: 'Simple pricing: you always pay per lead, never per sale. No monthly fees, no percentage tracking, no lock-in. Cancel at any time.',
    fi: 'Selkeää hinnoittelua: maksat aina liideistä, et myynnistä. Ei kuukausimaksuja, ei prosenttiseurantaa, ei sitoutumista. Voit perua milloin tahansa.',
    de: 'Einfache Preise: Sie zahlen immer pro Lead, nie pro Verkauf. Keine monatlichen Gebühren, kein Prozent-Tracking, keine Bindung, jederzeit kündbar.',
    ja: 'シンプルな料金：支払いは常にリード単位で、売上単位ではありません。月額料金なし、歩合の追跡なし、拘束なし、いつでも解約可能。',
    es: 'Precios sencillos: siempre paga por lead, nunca por venta. Sin cuotas mensuales, sin seguimiento de porcentajes, sin permanencia. Puede cancelar cuando quiera.',
    'pt-BR': 'Preços simples: você sempre paga por lead, nunca por venda. Sem mensalidades, sem acompanhamento de percentual, sem fidelidade. Cancele quando quiser.',
    'zh-CN': '简单定价：你始终按线索付费，绝不按成交付费。无月费、无百分比追踪、无锁定，可随时取消。',
    ko: '간단한 요금: 항상 리드 단위로 지불하며, 판매 단위로는 절대 아닙니다. 월 요금 없음, 비율 추적 없음, 약정 없음, 언제든 해지 가능.',
    fr: 'Tarifs simples : vous payez toujours au lead, jamais à la vente. Pas de frais mensuels, pas de suivi de pourcentage, pas d’engagement, annulable à tout moment.',
    it: 'Prezzi semplici: si paga sempre a lead, mai a vendita. Nessun canone mensile, nessun tracciamento percentuale, nessun vincolo. Disdica quando vuole.',
    nl: 'Eenvoudige prijzen: u betaalt altijd per lead, nooit per verkoop. Geen maandelijkse kosten, geen percentagetracking, geen vaste binding, altijd opzegbaar.', sv: 'Simple pricing: you always pay per lead, never per sale. No monthly fees, no percentage tracking, no lock-in. Cancel at any time.',
  },
  termsEyebrow: {
    en: 'How we work together', fi: 'Pelisäännöt', de: 'Wie wir zusammenarbeiten', ja: '協働の進め方',
    es: 'Cómo trabajamos juntos', 'pt-BR': 'Como trabalhamos juntos', 'zh-CN': '我们如何合作', ko: '함께 일하는 방식',
    fr: 'Comment nous collaborons', it: 'Come lavoriamo insieme', nl: 'Hoe we samenwerken', sv: 'Så samarbetar vi',
  },
  termsTitle: {
    en: 'Fair, transparent terms', fi: 'Reilut, läpinäkyvät ehdot',
    de: 'Faire, transparente Bedingungen', ja: '公正で透明な条件',
    es: 'Condiciones justas y transparentes', 'pt-BR': 'Condições justas e transparentes',
    'zh-CN': '公平、透明的条款', ko: '공정하고 투명한 조건',
    fr: 'Des conditions justes et transparentes', it: 'Condizioni eque e trasparenti',
    nl: 'Eerlijke, transparante voorwaarden', sv: 'Rättvisa, transparenta villkor',
  },
  termsSubtitle: {
    en: 'Clear ground rules from day one: you know exactly what you pay for, what you commit to, and how we handle the rare bad lead.',
    fi: 'Selkeät pelisäännöt alusta alkaen: tiedät tarkalleen mistä maksat, mihin sitoudut ja miten epäselvät tilanteet hoidetaan.',
    de: 'Klare Grundregeln von Anfang an: Sie wissen genau, wofür Sie zahlen, welche Verpflichtungen Sie eingehen und wie wir mit dem seltenen ungültigen Lead umgehen.',
    ja: '初日から明確な基本ルール：何にお金を払い、何に同意し、まれにある不適切なリードをどう扱うかが正確に分かります。',
    es: 'Reglas claras desde el primer día: usted sabe exactamente por qué paga, a qué se compromete y cómo gestionamos el raro lead fallido.',
    'pt-BR': 'Regras claras desde o primeiro dia: você sabe exatamente pelo que paga, com o que se compromete e como lidamos com o raro lead inválido.',
    'zh-CN': '从第一天起就有清晰的规则，你确切知道你为什么付费、承诺了什么，以及我们如何处理偶尔出现的无效线索。',
    ko: '첫날부터 명확한 기본 원칙: 무엇에 대해 지불하는지, 무엇을 약속하는지, 드물게 발생하는 잘못된 리드를 어떻게 처리하는지 정확히 알 수 있습니다.',
    fr: 'Des règles claires dès le premier jour: vous savez exactement ce que vous payez, ce à quoi vous vous engagez et comment nous gérons le rare lead invalide.',
    it: 'Regole chiare fin dal primo giorno: Lei sa esattamente per che cosa paga, a che cosa si impegna e come gestiamo il raro lead non valido.',
    nl: 'Heldere basisregels vanaf dag één: u weet precies waarvoor u betaalt, waaraan u zich verbindt en hoe we de zeldzame ongeldige lead afhandelen.', sv: 'Clear ground rules from day one: you know exactly what you pay for, what you commit to, and how we handle the rare bad lead.',
  },
  criteriaEyebrow: {
    en: 'Who we partner with', fi: 'Kumppanikriteerit', de: 'Mit wem wir zusammenarbeiten', ja: 'パートナーの条件',
    es: 'Con quién colaboramos', 'pt-BR': 'Com quem fazemos parceria', 'zh-CN': '我们与谁合作', ko: '우리가 함께하는 파트너',
    fr: 'Avec qui nous nous associons', it: 'Con chi collaboriamo', nl: 'Met wie we samenwerken', sv: 'Vilka vi samarbetar med',
  },
  criteriaTitle: {
    en: 'We partner with operators who cover the full palette',
    fi: 'Etsimme toimijoita, jotka kattavat koko paletin',
    de: 'Wir arbeiten mit Anbietern zusammen, die die gesamte Palette abdecken',
    ja: 'すべてを網羅できる事業者と提携します',
    es: 'Colaboramos con operadores que cubren toda la paleta',
    'pt-BR': 'Fazemos parceria com operadores que cobrem toda a paleta',
    'zh-CN': '我们与能提供全套服务的运营方合作',
    ko: '전체를 아우르는 업체와 협력합니다',
    fr: 'Nous nous associons à des prestataires qui couvrent toute la palette',
    it: 'Collaboriamo con operatori che coprono l’intera gamma',
    nl: 'We werken samen met aanbieders die het volledige palet dekken', sv: 'Vi samarbetar med aktörer som täcker hela paletten',
  },
  criteriaSubtitle: {
    en: 'A couple wants one trusted partner who handles everything. So we look for operators who can do exactly that, in-house or through established relationships.',
    fi: 'Pari haluaa yhden luotettavan kumppanin, joka hoitaa kaiken. Siksi etsimme toimijoita, jotka pystyvät siihen, itse tai vakiintunein kumppanisuhtein.',
    de: 'Ein Paar möchte einen vertrauenswürdigen Partner, der sich um alles kümmert. Deshalb suchen wir Anbieter, die genau das können, selbst oder über etablierte Beziehungen.',
    ja: 'カップルはすべてを任せられる信頼できるパートナーを1つ求めています。だからこそ、それを実現できる事業者を、自社または確立された関係を通じて、探しています。',
    es: 'Una pareja quiere un único socio de confianza que se encargue de todo. Por eso buscamos operadores capaces de hacer exactamente eso, por sí mismos o a través de relaciones consolidadas.',
    'pt-BR': 'Um casal quer um único parceiro de confiança que cuide de tudo. Por isso procuramos operadores capazes de fazer exatamente isso, por conta própria ou por meio de relações estabelecidas.',
    'zh-CN': '情侣想要一个值得信赖、能搞定一切的合作伙伴。因此我们寻找能够做到这一点的运营方，由自己或通过成熟的合作关系。',
    ko: '커플은 모든 것을 처리해 줄 신뢰할 수 있는 파트너 한 곳을 원합니다. 그래서 바로 그것을, 자체적으로 또는 확립된 관계를 통해, 해낼 수 있는 업체를 찾습니다.',
    fr: 'Un couple veut un seul partenaire de confiance qui s’occupe de tout. Nous recherchons donc des prestataires capables de faire exactement cela, en interne ou via des relations établies.',
    it: 'Una coppia vuole un unico partner di fiducia che gestisca tutto. Perciò cerchiamo operatori in grado di farlo, internamente o tramite relazioni consolidate.',
    nl: 'Een stel wil één vertrouwde partner die alles regelt. Daarom zoeken we aanbieders die precies dat kunnen, zelf of via gevestigde relaties.', sv: 'A couple wants one trusted partner who handles everything. So we look for operators who can do exactly that, in-house or through established relationships.',
  },
  applyEyebrow: {
    en: 'Apply', fi: 'Hae mukaan', de: 'Bewerben', ja: '申し込み',
    es: 'Solicitar', 'pt-BR': 'Candidatar-se', 'zh-CN': '申请', ko: '신청',
    fr: 'Postuler', it: 'Candidarsi', nl: 'Aanmelden', sv: 'Ansök',
  },
  applyTitle: {
    en: 'Join the network', fi: 'Liity verkostoon', de: 'Dem Netzwerk beitreten', ja: 'ネットワークに参加',
    es: 'Únase a la red', 'pt-BR': 'Entre na rede', 'zh-CN': '加入网络', ko: '네트워크에 가입하기',
    fr: 'Rejoindre le réseau', it: 'Entri nella rete', nl: 'Word lid van het netwerk', sv: 'Gå med i nätverket',
  },
  applySubtitle: {
    en: 'Tell us about yourself. We reply within a few days. Approved partners receive their first lead free.',
    fi: 'Kerro itsestäsi. Vastaamme muutaman päivän sisällä. Hyväksytyt kumppanit saavat ensimmäisen liidin maksutta.',
    de: 'Erzählen Sie uns von sich. Wir antworten innerhalb weniger Tage. Angenommene Partner erhalten ihren ersten Lead kostenlos.',
    ja: '貴社についてお聞かせください。数日以内に返信します。承認されたパートナーは最初のリードを無料で受け取れます。',
    es: 'Cuéntenos sobre usted. Respondemos en unos días. Los socios aprobados reciben su primer lead gratis.',
    'pt-BR': 'Conte-nos sobre você. Respondemos em poucos dias. Parceiros aprovados recebem o primeiro lead grátis.',
    'zh-CN': '介绍一下你自己，我们会在几天内回复。通过审核的合作伙伴将免费获得首条线索。',
    ko: '여러분에 대해 알려주세요. 며칠 내로 회신드립니다. 승인된 파트너는 첫 리드를 무료로 받습니다.',
    fr: 'Parlez-nous de vous. Nous répondons sous quelques jours. Les partenaires acceptés reçoivent leur premier lead gratuitement.',
    it: 'Ci parli di Lei. Rispondiamo entro pochi giorni. I partner approvati ricevono il primo lead gratis.',
    nl: 'Vertel ons over jezelf. We reageren binnen enkele dagen. Goedgekeurde partners ontvangen hun eerste lead gratis.', sv: 'Tell us about yourself. We reply within a few days. Approved partners receive their first lead free.',
  },
};

export default function PartnerWithUs() {
  const { lang } = useLang();
  const c = (k: CKey) => pickLocalized(C[k], lang);

  // Robust in-page scroll to the application form — works regardless of the
  // browser's native hash behaviour or the SPA router.
  const scrollToApply = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.replaceState(null, '', '#apply'); } catch { /* ignore */ }
    }
  };

  return (
    <>
      <SEO
        noindex
        title={c('seoTitle')}
        description={c('seoDesc')}
        path="/partner-with-us"
      />

      <PageHero
        compact
        eyebrow={c('heroEyebrow')}
        title={c('heroTitle')}
        subtitle={c('heroSubtitle')}
        image="/images/heroes/aurora-elope-hero.webp"
        imageAlt={c('heroImageAlt')}
      >
        <a
          href="#apply"
          onClick={scrollToApply}
          className="inline-flex items-center justify-center mt-6 px-7 py-3.5 bg-rose hover:bg-pink text-white font-semibold rounded-full transition-colors shadow-lg shadow-rose/30"
        >
          {c('heroCta')}
        </a>
      </PageHero>

      {/* What is LaplandVibes — the concept + reach */}
      <Section
        eyebrow={c('conceptEyebrow')}
        title={c('conceptTitle')}
        subtitle={c('conceptSubtitle')}
      >
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {conceptStats.map(({ icon: Icon, data }) => {
            const label = pickLocalized(data.label, lang);
            return (
              <div key={label} className="bg-night-light border border-line-light rounded-2xl p-7 text-center">
                <span className="inline-flex w-12 h-12 rounded-full border border-gold/45 bg-gold/10 items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="font-heading text-3xl text-white mb-2 tracking-wide">{pickLocalized(data.stat, lang)}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{label}</p>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed text-center max-w-2xl mx-auto mt-7">
          {c('conceptFooter')}
        </p>
      </Section>

      {/* Why join */}
      <Section
        className="bg-night-light/40"
        eyebrow={c('whyEyebrow')}
        title={c('whyTitle')}
        subtitle={c('whySubtitle')}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {valueProps.map(({ icon: Icon, data }) => {
            const title = pickLocalized(data.title, lang);
            return (
              <article key={title} className="bg-night-light border border-line-light rounded-2xl p-7">
                <span className="inline-flex w-12 h-12 rounded-full border border-gold/45 bg-gold/10 items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl text-white tracking-wide mb-2">{title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{pickLocalized(data.body, lang)}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* How it works */}
      <Section
        eyebrow={c('howEyebrow')}
        title={c('howTitle')}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.n} className="text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose to-pink text-white font-heading tracking-wide text-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 shadow-lg shadow-rose/30">
                {step.n}
              </div>
              <h3 className="font-heading text-xl text-white tracking-wide mb-2">{pickLocalized(step.title, lang)}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{pickLocalized(step.body, lang)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section
        className="bg-night-light/40"
        eyebrow={c('priceEyebrow')}
        title={c('priceTitle')}
        subtitle={c('priceSubtitle')}
      >
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <article className="bg-night-light border border-white/10 rounded-2xl p-7">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{c('sharedLead')}</p>
            <p className="font-heading tracking-wide text-4xl text-white mb-1">€35<span className="text-lg text-gray-400 font-body"> / {c('perLead')}</span></p>
            <p className="text-sm text-gray-300 leading-relaxed mt-3">
              {c('sharedBody')}
            </p>
          </article>
          <article className="bg-night-light border border-gold/30 rounded-2xl p-7">
            <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">{c('exclusiveLead')}</p>
            <p className="font-heading tracking-wide text-4xl text-white mb-1">{c('fromPrice')}<span className="text-lg text-gray-400 font-body"> / {c('perLead')}</span></p>
            <p className="text-sm text-gray-300 leading-relaxed mt-3">
              {c('exclusiveBody')}
            </p>
          </article>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed text-center max-w-2xl mx-auto mt-6">
          {c('priceFooter')}
        </p>
      </Section>

      {/* Fair terms — agreement basis, liability, complaint→credit */}
      <Section
        eyebrow={c('termsEyebrow')}
        title={c('termsTitle')}
        subtitle={c('termsSubtitle')}
      >
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {terms.map((term) => {
            const title = pickLocalized(term.title, lang);
            return (
              <div key={title} className="bg-night-light border border-line-light rounded-2xl p-7">
                <h3 className="font-heading text-lg text-white tracking-wide mb-2">{title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{pickLocalized(term.body, lang)}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* What we look for */}
      <Section
        eyebrow={c('criteriaEyebrow')}
        title={c('criteriaTitle')}
        subtitle={c('criteriaSubtitle')}
      >
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {expectations.map((item) => {
            const title = pickLocalized(item.title, lang);
            return (
              <div key={title} className="bg-night-light border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-aurora-green text-lg">✓</span>
                  <h3 className="font-heading text-lg text-white tracking-wide">{title}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{pickLocalized(item.body, lang)}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Apply */}
      <Section
        id="apply"
        className="bg-night-light/40"
        eyebrow={c('applyEyebrow')}
        title={c('applyTitle')}
        subtitle={c('applySubtitle')}
      >
        <div className="max-w-3xl mx-auto">
          <PartnerForm />
        </div>
      </Section>
    </>
  );
}
