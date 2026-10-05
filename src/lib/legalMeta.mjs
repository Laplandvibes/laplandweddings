/**
 * Legal pages: <title> and meta description per locale. ONE source: scripts/prerender-meta.mjs writes the
 * prerendered HTML from this object and src/pages/legal/*.tsx render the same values in the browser, so
 * Google, social cards and the browser tab show one text. Descriptions stay within 70-160 characters so
 * the prerender neither clamps nor extends them.
 *
 * Plain ESM (.mjs): scripts/prerender-meta.mjs runs under Node 20 in CI. Types: legalMeta.d.mts.
 */
export const LEGAL_META = {
  "/privacy": {
    "en": {
      "title": "Privacy Policy",
      "description": "Privacy policy for laplandweddings.online: how we handle enquiry data and analytics."
    },
    "fi": {
      "title": "Tietosuojaseloste",
      "description": "Tietosuojaseloste laplandweddings.online: miten käsittelemme tiedustelutietoja ja analytiikkaa."
    },
    "de": {
      "title": "Datenschutzerklärung",
      "description": "Datenschutzerklärung für laplandweddings.online: wie wir Anfragedaten und Analytik handhaben."
    },
    "ja": {
      "title": "プライバシーポリシー",
      "description": "laplandweddings.online のプライバシーポリシー：お問い合わせデータとアクセス解析の扱い、保存期間、そしてお客様の権利について説明します。"
    },
    "es": {
      "title": "Política de privacidad",
      "description": "Política de privacidad de laplandweddings.online: cómo tratamos los datos de consulta y la analítica."
    },
    "pt-BR": {
      "title": "Política de privacidade",
      "description": "Política de privacidade de laplandweddings.online: como tratamos os dados de consulta e a analítica."
    },
    "zh-CN": {
      "title": "隐私政策",
      "description": "laplandweddings.online 隐私政策：我们如何处理您的询价数据与网站分析信息、这些数据会保存多长时间，以及您享有哪些权利。"
    },
    "ko": {
      "title": "개인정보 처리방침",
      "description": "laplandweddings.online 개인정보 처리방침: 문의 데이터와 분석 정보의 처리 방식, 보관 기간, 그리고 이용자의 권리를 설명합니다."
    },
    "fr": {
      "title": "Politique de confidentialité",
      "description": "Politique de confidentialité de laplandweddings.online : comment nous traitons les données de demande et l’analytique."
    },
    "it": {
      "title": "Informativa sulla privacy",
      "description": "Informativa sulla privacy di laplandweddings.online: come trattiamo i dati delle richieste e l’analitica."
    },
    "nl": {
      "title": "Privacyverklaring",
      "description": "Privacybeleid voor laplandweddings.online: hoe wij omgaan met aanvraaggegevens en analyses."
    },
    "sv": {
      "title": "Integritetspolicy",
      "description": "Integritetspolicy för laplandweddings.online: hur vi hanterar förfrågningsdata och analys."
    }
  },
  "/terms": {
    "en": {
      "title": "Terms of Use",
      "description": "Terms of use for laplandweddings.online: what the guide is, how venue and price information is sourced, affiliate links, and the limits of our liability."
    },
    "fi": {
      "title": "Käyttöehdot",
      "description": "Käyttöehdot: mitä laplandweddings.online on, miten hääpaikka- ja hintatiedot on koottu, mitä kumppanilinkit ovat ja miten vastuu on rajattu."
    },
    "de": {
      "title": "Nutzungsbedingungen",
      "description": "Nutzungsbedingungen für laplandweddings.online: was der Guide ist, woher Location- und Preisangaben stammen, Affiliate-Links und Haftungsgrenzen."
    },
    "ja": {
      "title": "利用規約",
      "description": "laplandweddings.online の利用規約：本ガイドの内容、会場・料金情報の出典、アフィリエイトリンク、および責任の範囲について説明します。"
    },
    "es": {
      "title": "Términos de uso",
      "description": "Términos de uso de laplandweddings.online: qué es la guía, de dónde salen los datos de lugares y precios, enlaces de afiliados y límites de responsabilidad."
    },
    "pt-BR": {
      "title": "Termos de uso",
      "description": "Termos de uso de laplandweddings.online: o que é o guia, de onde vêm os dados de locais e preços, links de afiliados e limites de responsabilidade."
    },
    "zh-CN": {
      "title": "使用条款",
      "description": "laplandweddings.online 使用条款：本指南的性质、场地与价格信息的来源、联盟链接的说明，以及我们承担责任的范围与相关限制。"
    },
    "ko": {
      "title": "이용약관",
      "description": "laplandweddings.online 이용약관: 가이드의 성격, 웨딩 장소 및 가격 정보의 출처, 제휴 링크, 그리고 책임의 범위를 설명합니다."
    },
    "fr": {
      "title": "Conditions d’utilisation",
      "description": "Conditions d’utilisation : nature du guide laplandweddings.online, origine des données sur les lieux et les prix, liens affiliés et limites de responsabilité."
    },
    "it": {
      "title": "Condizioni d’uso",
      "description": "Condizioni d’uso di laplandweddings.online: cos’è la guida, da dove provengono i dati su location e prezzi, link di affiliazione e limiti di responsabilità."
    },
    "nl": {
      "title": "Gebruiksvoorwaarden",
      "description": "Gebruiksvoorwaarden van laplandweddings.online: wat de gids is, herkomst van locatie- en prijsinformatie, affiliate-links en onze aansprakelijkheidsgrenzen."
    },
    "sv": {
      "title": "Användarvillkor",
      "description": "Användarvillkor för laplandweddings.online: vad guiden är, varifrån uppgifter om vigselplatser och priser kommer, affiliatelänkar och ansvarsbegränsningar."
    }
  },
  "/cookie-policy": {
    "en": {
      "title": "Cookie Policy",
      "description": "Which cookies laplandweddings.online sets, what they are for, how long they last and how to change or withdraw your consent at any time."
    },
    "fi": {
      "title": "Evästekäytäntö",
      "description": "Mitä evästeitä laplandweddings.online käyttää, mihin ne on tarkoitettu, kuinka kauan ne säilyvät ja miten suostumuksen voi muuttaa tai perua milloin tahansa."
    },
    "de": {
      "title": "Cookie-Richtlinie",
      "description": "Welche Cookies laplandweddings.online setzt, wozu sie dienen, wie lange sie gespeichert bleiben und wie Sie Ihre Einwilligung jederzeit ändern oder widerrufen."
    },
    "ja": {
      "title": "クッキーポリシー",
      "description": "laplandweddings.online が使用するクッキーの種類、その目的、保存期間、そして同意をいつでも変更・撤回する方法を説明します。"
    },
    "es": {
      "title": "Política de cookies y consentimiento",
      "description": "Qué cookies utiliza laplandweddings.online, para qué sirven, cuánto duran y cómo gestionar o retirar su consentimiento en cualquier momento."
    },
    "pt-BR": {
      "title": "Política de cookies",
      "description": "Quais cookies o laplandweddings.online usa, para que servem, por quanto tempo ficam e como gerenciar ou retirar seu consentimento a qualquer momento."
    },
    "zh-CN": {
      "title": "Cookie 政策",
      "description": "laplandweddings.online 使用哪些 Cookie、各自的用途是什么、会保存多长时间，以及您如何随时更改或撤回自己的同意。"
    },
    "ko": {
      "title": "쿠키 정책",
      "description": "laplandweddings.online이 사용하는 쿠키의 종류와 목적, 보관 기간, 그리고 언제든지 동의를 변경하거나 철회하는 방법을 안내합니다."
    },
    "fr": {
      "title": "Politique relative aux cookies",
      "description": "Quels cookies laplandweddings.online utilise, à quoi ils servent, combien de temps ils sont conservés et comment modifier ou retirer votre consentement."
    },
    "it": {
      "title": "Informativa sui cookie",
      "description": "Quali cookie utilizza laplandweddings.online, a cosa servono, quanto durano e come modificare o revocare il consenso in qualsiasi momento."
    },
    "nl": {
      "title": "Cookiebeleid",
      "description": "Welke cookies laplandweddings.online plaatst, waarvoor ze dienen, hoe lang ze bewaard blijven en hoe u uw toestemming op elk moment kunt wijzigen of intrekken."
    },
    "sv": {
      "title": "Cookiepolicy",
      "description": "Vilka cookies laplandweddings.online använder, vad de är till för, hur länge de sparas och hur du när som helst ändrar eller återkallar ditt samtycke."
    }
  }
};
