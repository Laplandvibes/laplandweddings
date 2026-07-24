import { useLang } from '../i18n/LangContext';

/**
 * FTC / DSA-compliant affiliate disclosure. Render once on any page that
 * contains affiliate CTAs (venue cards with Hotels.com bookings, Trip.com
 * flights, etc.).
 */
const TEXT: Record<string, string> = {
  en: 'LaplandWeddings is part of the LaplandVibes network. This site contains partner links (e.g. Trip.com, EconomyBookings): if you click and book, we earn a small commission at no extra cost to you. It funds the site. Thank you for using our links.',
  fi: 'LaplandWeddings on osa LaplandVibes-verkostoa. Sivuilla on kumppanilinkkejä (mm. Trip.com, EconomyBookings): kun klikkaat ja varaat, saamme pienen palkkion ilman lisäkustannusta sinulle. Tämä rahoittaa sivustomme. Kiitos kun käytät linkkejämme.',
  de: 'LaplandWeddings ist Teil des LaplandVibes-Netzwerks. Diese Seite enthält Partnerlinks (z. B. Trip.com, EconomyBookings): Wenn Sie klicken und buchen, erhalten wir eine kleine Provision ohne Mehrkosten für Sie. Damit finanzieren wir die Seite. Danke, dass Sie unsere Links verwenden.',
  ja: 'LaplandWeddings は LaplandVibes ネットワークの一部です。このサイトにはパートナーリンク（Trip.com、EconomyBookings など）が含まれています。クリックしてご予約いただくと、お客様への追加費用なしで当社に少額の手数料が支払われます。サイトの運営費用となります。リンクのご利用ありがとうございます。',
  es: 'LaplandWeddings forma parte de la red LaplandVibes. Este sitio contiene enlaces de socios (Trip.com, EconomyBookings, etc.): si hace clic y reserva, recibimos una pequeña comisión sin coste adicional para usted. Así financiamos el sitio. Gracias por usar nuestros enlaces.',
  'pt-BR': 'LaplandWeddings faz parte da rede LaplandVibes. Este site contém links de parceiros (Trip.com, EconomyBookings, etc.): se você clicar e reservar, recebemos uma pequena comissão sem custo adicional para você. Isso financia o site. Obrigado por usar nossos links.',
  'zh-CN': 'LaplandWeddings 是 LaplandVibes 网络的一部分。本站包含合作伙伴链接（如 Trip.com、EconomyBookings）：如果您点击并预订，我们将获得少量佣金，不会增加您的费用。这资助了本站。感谢您使用我们的链接。',
  ko: 'LaplandWeddings는 LaplandVibes 네트워크의 일부입니다. 이 사이트에는 파트너 링크(Trip.com, EconomyBookings 등)가 포함되어 있습니다. 클릭하여 예약하시면 추가 비용 없이 저희가 약간의 수수료를 받습니다. 이는 사이트 운영에 사용됩니다. 링크를 이용해 주셔서 감사합니다.',
  fr: "LaplandWeddings fait partie du réseau LaplandVibes. Ce site contient des liens partenaires (Trip.com, EconomyBookings, etc.) : si vous cliquez et réservez, nous touchons une petite commission sans frais supplémentaires pour vous. Cela finance le site. Merci d'utiliser nos liens.",
  it: 'LaplandWeddings fa parte della rete LaplandVibes. Questo sito contiene link partner (Trip.com, EconomyBookings, ecc.): se clicca e prenota, riceviamo una piccola commissione senza costi aggiuntivi per Lei. In questo modo finanziamo il sito. Grazie per aver utilizzato i nostri link.',
  nl: 'LaplandWeddings maakt deel uit van het LaplandVibes-netwerk. Deze site bevat partnerlinks (bijv. Trip.com, EconomyBookings): als u klikt en boekt, ontvangen wij een kleine commissie zonder extra kosten voor u. Dit financiert de site. Bedankt voor het gebruik van onze links.',
  sv: 'LaplandWeddings är en del av LaplandVibes-nätverket. Sajten innehåller partnerlänkar (t.ex. Trip.com, EconomyBookings): om du klickar och bokar får vi en liten provision utan extra kostnad för dig. Det finansierar sajten. Tack för att du använder våra länkar.',
};

export default function AffiliateDisclosure() {
  const { lang } = useLang();
  const text = TEXT[lang] ?? TEXT.en;
  return (
    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto px-4 text-center">
      {text}
    </p>
  );
}
