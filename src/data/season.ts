import type { Localized } from './localized';
import type { ImageCredit } from '../components/ImgCredit';

/**
 * TALVIKUVAT LOKAKUUN ALUSTA (Vesa 20.9.2026: "lokakuun alusta talvikuvat").
 *
 * Sivustolla on kahdenlaisia kuvia: kesäisiä omia valokuvia heinäkuun reissulta
 * (vihreä tunturi, sula järvi, ruska) ja talvisia (lumi, jää, revontulet). Lokakuun
 * alusta huhtikuun loppuun näytetään talvikuva, touko–syyskuussa kesäkuva.
 *
 * Miksi 1.10. eikä esimerkiksi ensilumi: pari selaa sivustoa 6–12 kuukautta ennen
 * häitä, ja lokakuussa katsotaan talvikautta. Sääasema ei ratkaise vaan se, minkä
 * kauden hääpäivää lukija suunnittelee.
 *
 * 🔴 Kaksi rajoitusta, jotka on hyvä tietää:
 *   1. Vaihto tapahtuu SELAIMESSA renderöinnin aikaan. Prerenderöity <head> (og:image)
 *      on staattinen, joten some-jakokuva ei vaihdu kauden mukaan. Se on tietoinen
 *      valinta: og-kuva vaihdetaan käsin, jos se halutaan kausikohtaiseksi.
 *   2. Kävijän oma kellonaika ratkaisee. Väärin asetettu kello näyttää väärän kauden;
 *      se on harmitonta eikä sitä yritetä korjata palvelinajalla.
 *
 * Etusivun heron oma kytkin (touko–elokuu = keskiyön aurinko) on eri asia: se koskee
 * revontulivideota, joka voi pyöriä jo syyskuussa. Älä yhdistä näitä kahta.
 */
export function isWinterSeason(now: Date = new Date()): boolean {
  /* Katseluvipu: ?kausi=talvi tai ?kausi=kesa näyttää toisen kauden kuvat heti,
     jotta vaihtoa ei tarvitse odottaa lokakuuhun nähdäkseen miltä se näyttää.
     Ei vaikuta mihinkään muuhun eikä jää muistiin — pelkkä osoitteen parametri. */
  if (typeof window !== 'undefined') {
    const forced = new URLSearchParams(window.location.search).get('kausi');
    if (forced === 'talvi' || forced === 'winter') return true;
    if (forced === 'kesa' || forced === 'kesä' || forced === 'summer') return false;
  }
  const m = now.getMonth() + 1;
  return m >= 10 || m <= 4;
}

/** Yhden pinnan kuva kausineen: lähde, tekijätiedot ja alt-teksti kulkevat yhdessä. */
export interface SeasonalImage {
  src: string;
  /** avif/webp srcset samalla tiedostonimellä, jos generoitu */
  avifSrcSet?: string;
  webpSrcSet?: string;
  /**
   * srcsetin sizes, oletus 100vw. Panoraamalle (CC BY-SA -kuvaa ei rajata, 25.9.2026)
   * object-cover skaalaa kuvan heron KORKEUDEN mukaan, joten piirretty leveys on
   * korkeus × kuvasuhde eikä 100vw — ilman tätä selain valitsee liian pienen kuvan.
   */
  sizes?: string;
  objectPosition?: string;
  credit?: ImageCredit;
  alt: Localized<string>;
}

/**
 * Valitse kauden mukainen kuva. Testattavuuden vuoksi päivän voi antaa.
 * Talvikuva saa puuttua: silloin näytetään kesäkuva ympäri vuoden. Se on
 * tarkoituksellista — puuttuva talvikuva ei saa rikkoa sivua, vaan näkyä siinä,
 * ettei kuva vaihdu (ja jäädä siten kiinni katselmuksessa).
 */
export function seasonal(winter: SeasonalImage | undefined, summer: SeasonalImage, now?: Date): SeasonalImage {
  return isWinterSeason(now) && winter ? winter : summer;
}
