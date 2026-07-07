import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import "react-dom";
import { Head, ViteReactSSG } from "vite-react-ssg";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Briefcase, Download, Menu, Newspaper, Printer, X } from "lucide-react";
//#region src/i18n/translations.ts
var t = {
	fi: {
		nav: {
			home: "Etusivu",
			locations: "Paikkakunnat",
			types: "Häätyypit",
			venues: "Hääpaikat",
			planners: "Suunnittelijat",
			practical: "Käytännön opas",
			pricing: "Hinta-arviot",
			contact: "Ota yhteyttä",
			blog: "Blogi"
		},
		cta: {
			getQuote: "Pyydä tarjous",
			getThreeQuotes: "Pyydä 3 tarjousta",
			planYourWedding: "Suunnittele häät",
			seeVenues: "Katso hääpaikat",
			seeAllVenues: "Kaikki hääpaikat",
			seeAllPlanners: "Kaikki suunnittelijat",
			learnMore: "Lue lisää",
			readGuide: "Lue opas",
			visitWebsite: "Käy sivulla",
			bookStay: "Varaa yöpyminen"
		},
		home: {
			heroTitle: "Häät Lapissa — kaikki yhdellä sivulla",
			heroSubtitle: "Lasi-iglut · Lumikappelit · Revontulet · Keskiyön aurinko. Suomeksi ja englanniksi. Liidi suoraan Lapin kokeneimmille suunnittelijoille.",
			whyTitle: "Miksi Lappi häämatkakohteena",
			whyP: "Lapissa on vihille kahdestaan 1 600 €:sta alkaen ja 100 hengen luksusjuhlia 50 000 € hinnalla. Suomi sallii ulkomaalaisten avioliiton helposti — paperit kestävät 3–5 viikkoa DVV:n kautta. Verkostomme toimittaa sinulle 3 räätälöityä tarjousta paikallisilta suunnittelijoilta yhdellä lomakkeella.",
			audienceTitle: "Suomeksi suomalaisille pareille — englanniksi kansainvälisille",
			audienceFi: "Suomalainen pari? Saat kotimaiset hääsuunnittelijat ja kovat hinta-arviot. Ei mainosenglantia.",
			audienceEn: "International couple? Get Finnish wedding planners experienced with foreign legal paperwork — DVV done for you.",
			typesTitle: "Mistä häistä unelmoitte",
			locationsTitle: "Mihin Lappiin",
			plannersTitle: "Lapin kokeneimmat hääsuunnittelijat",
			plannersIntro: "Olemme tutkineet Lapin häämarkkinaa ja koonneet 7 vakiintuneinta suunnittelijaa yhdelle sivulle. Pyydä lomakkeella 3 räätälöityä tarjousta — me hoidamme välityksen.",
			newsletterTitle: "Saat sähköpostiisi Lapin hääaiheisia oppaita",
			newsletterSub: "Yksi sähköposti kuussa: avoimet venuet, sesonkivinkit, ja PDF-opas DVV-papereista. Voit perua koska tahansa.",
			newsletterEmail: "sähköpostiosoite@example.com",
			newsletterCta: "Tilaa kuukausiposti"
		},
		sections: {
			bestFor: "Parhaiten sopii",
			considerations: "Huomioitavaa",
			season: "Sesonki",
			capacity: "Kapasiteetti",
			priceFrom: "Hinta alkaen",
			priceRange: "Hintahaarukka",
			languages: "Kielet",
			strengths: "Vahvuudet",
			features: "Erityispiirteet",
			weddingSpaces: "Hääsmoitukseen tilat",
			website: "Verkkosivu",
			contact: "Yhteystiedot",
			gallery: "Galleria",
			airport: "Lentokenttä",
			airportDistance: "Etäisyys lentokentästä",
			yearRound: "Avoinna ympäri vuoden",
			seasonalOnly: "Sesonkikohde",
			verifiedListing: "Vahvistettu listaus"
		},
		locations: {
			indexTitle: "Lapin paikkakunnat häille",
			indexIntro: "Kuusi tunnettua aluetta, jokaisella oma erityispiirteensä. Klikkaa paikkakuntaa nähdäksesi paikalliset hääpaikat, sesongit ja palvelut."
		},
		types: {
			indexTitle: "Häätyypit Lapissa",
			indexIntro: "Lasi-iglu-yöt, lumikappelit, revontulet, keskiyön aurinko, elopementit ja lupausten uusiminen — kuusi pääsuuntaa joista valita."
		},
		venues: {
			indexTitle: "Vahvistetut hääpaikat Lapissa",
			indexIntro: "Yli 20 hääpaikkaa, kaikki tarkistettu: tilat, kapasiteetit ja yhteystiedot. Valitse sijainnin, häätyypin tai hintaluokan mukaan.",
			filterByLocation: "Suodata paikkakunnan mukaan",
			filterByType: "Suodata häätyypin mukaan",
			filterByPrice: "Suodata hintatason mukaan",
			allLocations: "Kaikki paikkakunnat",
			allTypes: "Kaikki häätyypit",
			allPrices: "Kaikki hintaluokat",
			noResults: "Ei tuloksia näillä suodattimilla."
		},
		planners: {
			indexTitle: "Lapin hääsuunnittelijat",
			indexIntro: "Olemme keränneet seitsemän vakiintuneinta hääsuunnittelijaa Lapissa ja Suomessa. Lähetä yksi lomake → me toimitamme 3 räätälöityä tarjousta.",
			threeQuotesTitle: "Pyydä 3 tarjousta yhdellä lomakkeella",
			threeQuotesP: "Tarvitset vain 5 minuuttia. Saat 1–7 päivän sisällä 3 hääsuunnittelijan tarjoukset, vertaile ja valitse. Maksuton ja sitoumukseton."
		},
		practical: {
			title: "Häät Lapissa — käytännön opas",
			subtitle: "Avioliittolupa, paperit, sesongit, lentoyhteydet ja vieraiden majoitus."
		},
		pricing: {
			title: "Hinta-arviot Lapin häille",
			subtitle: "Yhteenveto markkinahinnoista per häätyyppi ja vieraiden määrä. Kaikki hinnat ovat ilmoittavien yritysten julkisia hintoja vuoden 2026 alusta."
		},
		contact: {
			title: "Ota yhteyttä",
			subtitle: "Vastaamme 1–2 työpäivän sisällä. Kuvaa lyhyesti unelmasi — välitämme sen sopiville suunnittelijoille.",
			formTitle: "Pyydä 3 tarjousta",
			formSub: "Maksuton ja sitoumukseton. Vastaus 1–7 päivän sisällä."
		},
		form: {
			yourName: "Nimesi",
			partnerName: "Kumppanin nimi",
			email: "Sähköpostiosoite",
			phone: "Puhelin (ei pakollinen)",
			country: "Maasi",
			guests: "Vieraiden määrä",
			guestsHelp: "0 = vain te kaksi (elopement)",
			preferredDate: "Toivottu hääpäivä",
			preferredDateHelp: "Voitte antaa kuukauden tai vuoden tarkkuudella",
			flexibility: "Päivän jousto",
			flexFixed: "Tarkka päivä",
			flexWeek: "±1 viikko",
			flexMonth: "±1 kuukausi",
			flexAny: "Mitä tahansa, kunhan revontulet näkyvät",
			weddingType: "Häätyyppi",
			location: "Mihin paikkakuntaan",
			noPreference: "Ei mieltymystä",
			budget: "Budjetti (€)",
			budget1: "alle 5 000 €",
			budget2: "5 000 – 15 000 €",
			budget3: "15 000 – 30 000 €",
			budget4: "30 000 – 60 000 €",
			budget5: "yli 60 000 €",
			message: "Kerro lisää unelmistanne",
			messagePlaceholder: "Esim. revontuli-vihkiminen, vieraat lentäisi UK:sta, haluamme husky-safari-mukana...",
			consent: "Hyväksyn että tieto välitetään 1–3 hääsuunnittelijalle ja LaplandVibes-tiimille. Voin perua koska tahansa.",
			attachments: "Inspiraatiokuvat ja -videot (vapaaehtoinen)",
			attachmentsHelp: "Vedä tiedostot tähän tai klikkaa selataksesi. Pinterest-kuvat, mood board, lyhyet videot. Max 5 tiedostoa, kuvat ≤ 5 MB, videot ≤ 25 MB.",
			attachmentsDrop: "Pudota tiedostot tähän",
			attachmentsBrowse: "tai klikkaa selataksesi",
			attachmentsRemove: "Poista",
			attachmentsTooMany: "Maksimissaan 5 tiedostoa.",
			attachmentsTooBig: "Tiedosto liian iso (max 5 MB kuva / 25 MB video).",
			attachmentsTotalTooBig: "Tiedostojen yhteenlaskettu koko ylittää 38 MB.",
			attachmentsBadType: "Vain kuvat (JPG/PNG/WebP/HEIC) ja videot (MP4/MOV/WebM) ovat sallittuja.",
			submit: "Lähetä — saat 3 tarjousta",
			submitting: "Lähetetään…",
			success: "Kiitos! Otamme yhteyttä 1–2 työpäivän sisällä.",
			error: "Lähetys ei mennyt läpi. Kokeile vielä kerran tai laita sähköposti suoraan info@laplandvibes.com."
		},
		footerLine: "LaplandVibes-verkostosta · ei suunnittelutoimisto, vaan vertaamme parhaat puolestasi."
	},
	en: {
		nav: {
			home: "Home",
			locations: "Locations",
			types: "Wedding Types",
			venues: "Venues",
			planners: "Planners",
			practical: "Practical Guide",
			pricing: "Pricing",
			contact: "Contact",
			blog: "Blog"
		},
		cta: {
			getQuote: "Request a quote",
			getThreeQuotes: "Get 3 quotes",
			planYourWedding: "Plan your wedding",
			seeVenues: "See venues",
			seeAllVenues: "All venues",
			seeAllPlanners: "All planners",
			learnMore: "Learn more",
			readGuide: "Read the guide",
			visitWebsite: "Visit website",
			bookStay: "Book a stay"
		},
		home: {
			heroTitle: "Lapland Weddings — everything in one place",
			heroSubtitle: "Glass igloos · Snow chapels · Northern Lights · Midnight Sun. In Finnish and English. Get matched with Lapland’s most experienced planners.",
			whyTitle: "Why Lapland for your wedding",
			whyP: "In Lapland you can elope for as little as €1 600 or host a 100-guest luxury celebration for €50 000. Finland makes foreign weddings simple — paperwork takes 3–5 weeks via the DVV. Our network gets you 3 personalised quotes from local planners with one form.",
			audienceTitle: "In Finnish for Finns — in English for international couples",
			audienceFi: "A Finnish couple? Get Finnish-speaking planners and clear price ranges in your own language.",
			audienceEn: "International couple? Get Finnish wedding planners experienced with foreign legal paperwork — DVV done for you.",
			typesTitle: "What kind of wedding are you dreaming of",
			locationsTitle: "Pick your part of Lapland",
			plannersTitle: "Lapland’s most experienced planners",
			plannersIntro: "We have researched Lapland’s wedding market and curated 7 of the most established planners. Send the form and we will deliver 3 personalised quotes — at no cost to you.",
			newsletterTitle: "Get Lapland wedding guides in your inbox",
			newsletterSub: "One email a month: open venues, season tips, and a PDF guide on DVV paperwork. Unsubscribe anytime.",
			newsletterEmail: "your-email@example.com",
			newsletterCta: "Subscribe"
		},
		sections: {
			bestFor: "Best for",
			considerations: "Things to consider",
			season: "Season",
			capacity: "Capacity",
			priceFrom: "From",
			priceRange: "Price range",
			languages: "Languages",
			strengths: "Strengths",
			features: "Highlights",
			weddingSpaces: "Wedding spaces",
			website: "Website",
			contact: "Contact",
			gallery: "Gallery",
			airport: "Airport",
			airportDistance: "Distance from airport",
			yearRound: "Open year-round",
			seasonalOnly: "Seasonal",
			verifiedListing: "Verified listing"
		},
		locations: {
			indexTitle: "Lapland regions for weddings",
			indexIntro: "Six well-known regions, each with its own character. Click a region to see its venues, seasons and services."
		},
		types: {
			indexTitle: "Lapland wedding types",
			indexIntro: "Glass igloo nights, snow chapels, Northern Lights, Midnight Sun, elopements and vow renewals — six main directions to choose from."
		},
		venues: {
			indexTitle: "Verified Lapland wedding venues",
			indexIntro: "Over 20 wedding venues, all verified: spaces, capacities, and contacts. Filter by region, wedding type, or price tier.",
			filterByLocation: "Filter by region",
			filterByType: "Filter by wedding type",
			filterByPrice: "Filter by price tier",
			allLocations: "All regions",
			allTypes: "All types",
			allPrices: "All prices",
			noResults: "No results with those filters."
		},
		planners: {
			indexTitle: "Lapland wedding planners",
			indexIntro: "We have collected the seven most established Lapland wedding planners. Send one form → we deliver 3 personalised quotes.",
			threeQuotesTitle: "Get 3 quotes with a single form",
			threeQuotesP: "Five minutes is all it takes. Within 1–7 days you receive 3 wedding planner quotes — compare and choose. Free and no commitment."
		},
		practical: {
			title: "Getting married in Lapland — practical guide",
			subtitle: "Marriage licence, paperwork, seasons, flights, and guest accommodation."
		},
		pricing: {
			title: "Lapland wedding price ranges",
			subtitle: "A summary of market prices by wedding type and guest count. All prices are public listings from operating companies as of early 2026."
		},
		contact: {
			title: "Get in touch",
			subtitle: "We respond within 1–2 business days. Tell us briefly about your dream — we route it to the right planners.",
			formTitle: "Get 3 quotes",
			formSub: "Free and with no commitment. Reply within 1–7 days."
		},
		form: {
			yourName: "Your name",
			partnerName: "Partner’s name",
			email: "Email",
			phone: "Phone (optional)",
			country: "Your country",
			guests: "Number of guests",
			guestsHelp: "0 = just the two of you (elopement)",
			preferredDate: "Preferred wedding date",
			preferredDateHelp: "Month or year is fine",
			flexibility: "Date flexibility",
			flexFixed: "Fixed date",
			flexWeek: "±1 week",
			flexMonth: "±1 month",
			flexAny: "Any night the lights come out",
			weddingType: "Wedding type",
			location: "Region",
			noPreference: "No preference",
			budget: "Budget (€)",
			budget1: "Under €5 000",
			budget2: "€5 000 – €15 000",
			budget3: "€15 000 – €30 000",
			budget4: "€30 000 – €60 000",
			budget5: "Over €60 000",
			message: "Tell us more about your dream",
			messagePlaceholder: "E.g. Northern Lights ceremony, guests flying from the UK, want a husky safari included...",
			consent: "I agree that my details may be shared with 1–3 wedding planners and the LaplandVibes team. I can withdraw anytime.",
			attachments: "Inspiration photos and videos (optional)",
			attachmentsHelp: "Drag files here or click to browse. Pinterest pins, mood boards, short videos. Max 5 files, images ≤ 5 MB, videos ≤ 25 MB.",
			attachmentsDrop: "Drop files here",
			attachmentsBrowse: "or click to browse",
			attachmentsRemove: "Remove",
			attachmentsTooMany: "Maximum 5 files.",
			attachmentsTooBig: "File too large (max 5 MB image / 25 MB video).",
			attachmentsTotalTooBig: "Combined attachments exceed 38 MB.",
			attachmentsBadType: "Only images (JPG/PNG/WebP/HEIC) and videos (MP4/MOV/WebM) are allowed.",
			submit: "Send — get 3 quotes",
			submitting: "Sending…",
			success: "Thank you! We will be in touch within 1–2 business days.",
			error: "Submission failed. Try again or email info@laplandvibes.com directly."
		},
		footerLine: "Part of the LaplandVibes Network · We are not a planner — we compare the best for you."
	}
};
//#endregion
//#region src/i18n/LangContext.tsx
var LangContext = createContext(null);
var FI_PREFIX = "/fi";
/** Strips a leading /fi prefix from a path, returning the canonical (EN) path. */
function stripPrefix(path) {
	if (path === FI_PREFIX) return "/";
	if (path.startsWith(FI_PREFIX + "/")) return path.slice(3);
	return path;
}
/** Builds a path including the /fi prefix when lang === 'fi'. Always starts with /. */
function buildPath(lang, path) {
	const clean = stripPrefix(path.startsWith("/") ? path : "/" + path);
	if (lang === "fi") return clean === "/" ? FI_PREFIX : FI_PREFIX + clean;
	return clean;
}
function detectLangFromPath(pathname) {
	return pathname === FI_PREFIX || pathname.startsWith(FI_PREFIX + "/") ? "fi" : "en";
}
function LangProvider({ children }) {
	const location = useLocation();
	const navigate = useNavigate();
	const lang = detectLangFromPath(location.pathname);
	useEffect(() => {
		if (typeof document !== "undefined") document.documentElement.lang = lang;
	}, [lang]);
	const value = useMemo(() => ({
		lang,
		setLang: (next) => {
			if (next === lang) return;
			navigate(buildPath(next, stripPrefix(location.pathname)) + location.search + location.hash, { replace: false });
		},
		tr: t[lang],
		localePath: (path) => buildPath(lang, path)
	}), [
		lang,
		location.pathname,
		location.search,
		location.hash,
		navigate
	]);
	return /* @__PURE__ */ jsx(LangContext.Provider, {
		value,
		children
	});
}
function useLang() {
	const ctx = useContext(LangContext);
	if (!ctx) throw new Error("useLang must be inside LangProvider");
	return ctx;
}
/** Localise language labels ("Suomi" → "Finnish" in English mode, etc.) */
function localiseLanguage(label, lang) {
	if (lang === "fi") return {
		English: "Englanti",
		Deutsch: "Saksa",
		Français: "Ranska",
		Español: "Espanja",
		Suomi: "Suomi"
	}[label] || label;
	return {
		Suomi: "Finnish",
		Deutsch: "German",
		Français: "French",
		Español: "Spanish",
		English: "English"
	}[label] || label;
}
//#endregion
//#region src/components/L.tsx
/**
* Drop-in replacement for `<Link>` that prefixes internal paths with `/fi`
* automatically when the current language is Finnish. External URLs and
* non-string `to` values pass through untouched.
*/
function L({ to, ...rest }) {
	const { localePath } = useLang();
	if (typeof to === "string" && to.startsWith("/") && !to.startsWith("//")) return /* @__PURE__ */ jsx(Link, {
		to: localePath(to),
		...rest
	});
	return /* @__PURE__ */ jsx(Link, {
		to,
		...rest
	});
}
/** NavLink variant with the same /fi-prefix behaviour. */
function NL({ to, ...rest }) {
	const { localePath } = useLang();
	if (typeof to === "string" && to.startsWith("/") && !to.startsWith("//")) return /* @__PURE__ */ jsx(NavLink, {
		to: localePath(to),
		...rest
	});
	return /* @__PURE__ */ jsx(NavLink, {
		to,
		...rest
	});
}
//#endregion
//#region src/components/Navigation.tsx
function Navigation() {
	const [open, setOpen] = useState(false);
	const { lang, setLang, tr } = useLang();
	const items = [
		{
			to: "/locations",
			label: tr.nav.locations
		},
		{
			to: "/wedding-types",
			label: tr.nav.types
		},
		{
			to: "/venues",
			label: tr.nav.venues
		},
		{
			to: "/planners",
			label: tr.nav.planners
		},
		{
			to: "/practical-guide",
			label: tr.nav.practical
		},
		{
			to: "/pricing",
			label: tr.nav.pricing
		}
	];
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-40 backdrop-blur-md bg-night/85 border-b border-white/10",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3",
			children: [
				/* @__PURE__ */ jsxs(L, {
					to: "/",
					className: "font-heading text-lg sm:text-2xl tracking-wider whitespace-nowrap",
					onClick: () => setOpen(false),
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-pink",
							children: "#"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-gray-200",
							children: "LAPLAND"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-rose",
							children: "WEDDINGS"
						})
					]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden lg:flex items-center gap-1",
					children: items.map((it) => /* @__PURE__ */ jsx(NL, {
						to: it.to,
						className: ({ isActive }) => `px-3 py-2 rounded-full text-sm font-medium transition-all ${isActive ? "bg-rose/20 text-rose" : "text-gray-300 hover:text-white hover:bg-white/5"}`,
						children: it.label
					}, it.to))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-0.5",
							children: ["fi", "en"].map((code) => /* @__PURE__ */ jsx("button", {
								onClick: () => setLang(code),
								className: `px-2.5 sm:px-3 min-h-[36px] sm:min-h-0 py-1 text-[11px] sm:text-xs font-semibold rounded-full transition-colors ${lang === code ? "bg-rose text-white" : "text-gray-400 hover:text-white"}`,
								"aria-pressed": lang === code,
								children: code.toUpperCase()
							}, code))
						}),
						/* @__PURE__ */ jsx(L, {
							to: "/contact",
							className: "hidden md:inline-flex items-center px-4 py-2 bg-rose hover:bg-pink text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-rose/30",
							children: tr.cta.getThreeQuotes
						}),
						/* @__PURE__ */ jsx("button", {
							className: "lg:hidden p-2.5 -mr-2 text-white/80 hover:text-white",
							onClick: () => setOpen(!open),
							"aria-label": "Menu",
							children: open ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ jsx("div", {
			className: "lg:hidden border-t border-white/10 bg-night-light",
			children: /* @__PURE__ */ jsxs("nav", {
				className: "px-4 py-3 flex flex-col gap-1",
				children: [
					items.map((it) => /* @__PURE__ */ jsx(NL, {
						to: it.to,
						onClick: () => setOpen(false),
						className: ({ isActive }) => `px-3 py-3 rounded-lg text-sm font-medium ${isActive ? "bg-rose/20 text-rose" : "text-gray-300 hover:bg-white/5"}`,
						children: it.label
					}, it.to)),
					/* @__PURE__ */ jsx(L, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "mt-2 inline-flex items-center justify-center px-4 py-3 bg-rose text-white font-semibold rounded-full",
						children: tr.cta.getThreeQuotes
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-0.5 mt-2 self-start",
						children: ["fi", "en"].map((code) => /* @__PURE__ */ jsx("button", {
							onClick: () => setLang(code),
							className: `px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${lang === code ? "bg-rose text-white" : "text-gray-400"}`,
							children: code.toUpperCase()
						}, code))
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/Footer.tsx
var BLUE = "#002F6C";
var WHITE = "#F8FAFC";
var PINK = "#EC4899";
var defaultPillarLinks = [
	{
		name: "Northern Lights",
		href: "https://laplandnorthernlights.com"
	},
	{
		name: "Husky Safaris",
		href: "https://laplandhuskysafaris.com"
	},
	{
		name: "Ski Resorts",
		href: "https://laplandskiresorts.com"
	},
	{
		name: "Where to Stay",
		href: "https://laplandstays.com"
	},
	{
		name: "Things to Do",
		href: "https://laplandactivities.online"
	},
	{
		name: "Nature & Parks",
		href: "https://laplandnature.com"
	}
];
var siteGroups = [
	{
		title: "Stay",
		links: [
			{
				name: "Hotel Deals",
				url: "https://laplandhoteldeals.com"
			},
			{
				name: "Stays & Cabins",
				url: "https://laplandstays.com"
			},
			{
				name: "Where to Stay",
				url: "https://stayinlapland.com"
			},
			{
				name: "Family Friendly",
				url: "https://laplandkids.com"
			}
		]
	},
	{
		title: "Eat & Drink",
		links: [
			{
				name: "Local Food",
				url: "https://laplandfood.com"
			},
			{
				name: "Fine Dining",
				url: "https://laplanddining.com"
			},
			{
				name: "Bars & Pubs",
				url: "https://laplandbars.com"
			}
		]
	},
	{
		title: "Do",
		links: [
			{
				name: "Activities",
				url: "https://laplandactivities.online"
			},
			{
				name: "Husky Safaris",
				url: "https://laplandhuskysafaris.com"
			},
			{
				name: "Ski Resorts",
				url: "https://laplandskiresorts.com"
			},
			{
				name: "Snowmobile Tours",
				url: "https://laplandsnowmobile.com"
			},
			{
				name: "Spa & Wellness",
				url: "https://laplandwellness.com"
			},
			{
				name: "Nightlife",
				url: "https://laplandnightlife.com"
			}
		]
	},
	{
		title: "Explore",
		links: [
			{
				name: "Nature & Parks",
				url: "https://laplandnature.com"
			},
			{
				name: "Travel Guide",
				url: "https://laplandvisit.com"
			},
			{
				name: "Christmas in Lapland",
				url: "https://laplandchristmas.com"
			},
			{
				name: "Gifts & Souvenirs",
				url: "https://laplandgifts.com"
			},
			{
				name: "Travel Blog",
				url: "https://lapland.blog"
			}
		]
	},
	{
		title: "Essentials",
		links: [
			{
				name: "Deals & Offers",
				url: "https://laplanddeals.com"
			},
			{
				name: "Transport",
				url: "https://laplandtransport.com"
			},
			{
				name: "Car Rental",
				url: "https://laplandcarrental.com"
			},
			{
				name: "Work in Lapland",
				url: "https://laplandwork.fi"
			}
		]
	}
];
var socials = [
	{
		label: "YouTube",
		href: "https://youtube.com/@laplandvibes",
		icon: /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "w-4 h-4 sm:w-5 sm:h-5",
			children: [/* @__PURE__ */ jsx("path", { d: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" }), /* @__PURE__ */ jsx("polygon", {
				points: "9.75 15.02 15.5 12 9.75 8.98 9.75 15.02",
				fill: "#fff",
				opacity: "0.9"
			})]
		})
	},
	{
		label: "Facebook",
		href: "https://facebook.com/laplandvibes",
		icon: /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "w-4 h-4 sm:w-5 sm:h-5",
			children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
		})
	},
	{
		label: "Instagram",
		href: "https://instagram.com/laplandvibesofficial",
		icon: /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: "w-4 h-4 sm:w-5 sm:h-5",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "2",
					y: "2",
					width: "20",
					height: "20",
					rx: "5",
					ry: "5"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "4"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "17.5",
					cy: "6.5",
					r: "1",
					fill: "currentColor",
					stroke: "none"
				})
			]
		})
	},
	{
		label: "TikTok",
		href: "https://tiktok.com/@laplandvibesofficial",
		icon: /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "w-4 h-4 sm:w-5 sm:h-5",
			children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z" })
		})
	},
	{
		label: "Pinterest",
		href: "https://pinterest.com/laplandvibes",
		icon: /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "w-4 h-4 sm:w-5 sm:h-5",
			children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" })
		})
	},
	{
		label: "X / Twitter",
		href: "https://x.com/laplandvibes",
		icon: /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "w-4 h-4 sm:w-5 sm:h-5",
			children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
		})
	}
];
function SharedFooter({ pillarLinks = defaultPillarLinks, onPillarClick }) {
	return /* @__PURE__ */ jsxs("footer", { children: [
		/* @__PURE__ */ jsx("div", {
			"aria-hidden": "true",
			style: {
				height: "100px",
				background: `linear-gradient(to bottom, transparent, ${BLUE})`
			}
		}),
		/* @__PURE__ */ jsx("div", {
			style: { background: BLUE },
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-8 sm:mb-12",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex-1 h-px",
							style: { background: "rgba(248,250,252,0.25)" }
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-normal tracking-wide",
							style: {
								background: "rgba(248,250,252,0.08)",
								border: "1px solid rgba(248,250,252,0.3)",
								color: WHITE
							},
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative flex-shrink-0 overflow-hidden",
								style: {
									width: 20,
									height: 13,
									borderRadius: 2,
									background: WHITE,
									border: "1px solid rgba(0,47,108,0.5)"
								},
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute left-0 right-0",
									style: {
										top: 4,
										height: 4,
										background: BLUE
									}
								}), /* @__PURE__ */ jsx("div", {
									className: "absolute top-0 bottom-0",
									style: {
										left: 5,
										width: 4,
										background: BLUE
									}
								})]
							}), "Finnish Lapland Network"]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex-1 h-px",
							style: { background: "rgba(248,250,252,0.25)" }
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
						className: "font-heading tracking-wide text-3xl md:text-5xl",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-vibe-pink",
								children: "#"
							}),
							/* @__PURE__ */ jsx("span", {
								style: { color: WHITE },
								children: "LAPLAND"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-vibe-pink",
								children: "VIBES"
							})
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[13px] sm:text-sm font-normal mt-2 tracking-wide",
						style: { color: "rgba(248,250,252,0.75)" },
						children: "The definitive digital home for Finnish Lapland travel."
					})] }), /* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-2.5 sm:gap-3 flex-wrap",
						children: socials.map((s) => /* @__PURE__ */ jsx("a", {
							href: s.href,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": s.label,
							className: "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200",
							style: {
								background: "rgba(248,250,252,0.12)",
								border: "1px solid rgba(248,250,252,0.3)",
								color: WHITE
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.background = "#EC4899";
								e.currentTarget.style.borderColor = "#EC4899";
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.background = "rgba(248,250,252,0.12)";
								e.currentTarget.style.borderColor = "rgba(248,250,252,0.3)";
							},
							children: s.icon
						}, s.label))
					})]
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			style: { background: WHITE },
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-9 sm:py-10",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[10px] font-normal uppercase tracking-[0.25em] mb-4 sm:mb-5",
					style: { color: BLUE },
					children: "Lapland Travel Guide"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2",
					children: pillarLinks.map((link) => /* @__PURE__ */ jsx("a", {
						href: link.href,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => onPillarClick?.(link.name),
						className: "text-[13px] sm:text-sm font-semibold px-3 sm:px-4 py-2.5 sm:py-2 rounded-full transition-all duration-200 hover:scale-105 whitespace-nowrap inline-flex items-center justify-center min-h-[44px] sm:min-h-0 shadow-sm",
						style: {
							background: PINK,
							border: `1.5px solid ${PINK}`,
							color: "#FFFFFF"
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.background = "#DB2777";
							e.currentTarget.style.borderColor = "#DB2777";
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.background = PINK;
							e.currentTarget.style.borderColor = PINK;
						},
						children: link.name
					}, link.href))
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			style: { background: BLUE },
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-14",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12",
					children: siteGroups.map((group) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "text-[10px] font-semibold mb-4 sm:mb-5 pb-2.5 sm:pb-3 uppercase tracking-[0.2em] border-b",
						style: {
							color: WHITE,
							borderColor: "rgba(248,250,252,0.25)"
						},
						children: group.title
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2.5 sm:space-y-3.5",
						children: group.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: link.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[13px] sm:text-sm font-normal leading-snug transition-colors duration-200",
							style: { color: "rgba(248,250,252,0.85)" },
							onMouseEnter: (e) => e.currentTarget.style.color = "#EC4899",
							onMouseLeave: (e) => e.currentTarget.style.color = "rgba(248,250,252,0.85)",
							children: link.name
						}) }, link.name))
					})] }, group.title))
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			style: { background: WHITE },
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-14",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[10px] font-normal uppercase tracking-[0.25em] mb-5 pb-3 border-b",
								style: {
									color: BLUE,
									borderColor: "rgba(0,47,108,0.2)"
								},
								children: "About LaplandVibes"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-normal leading-relaxed mb-5",
								style: { color: "#374151" },
								children: "The definitive guide to Finnish Lapland — from the auroras to the midnight sun. Curated experiences, insider tips, and everything you need to plan your Arctic adventure, built by people who know Lapland deeply."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 text-xs font-normal px-3 py-1.5 rounded-full",
								style: {
									background: "rgba(16,185,129,0.10)",
									border: "1px solid rgba(16,185,129,0.25)",
									color: "#059669"
								},
								children: [/* @__PURE__ */ jsx("span", {
									className: "w-1.5 h-1.5 rounded-full shrink-0",
									style: { background: "#10b981" }
								}), "Content reviewed by local Lapland experts"]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl flex flex-col transition-all duration-200 overflow-hidden",
								style: {
									background: WHITE,
									border: `2px solid ${BLUE}`
								},
								onMouseEnter: (e) => e.currentTarget.style.borderColor = "#EC4899",
								onMouseLeave: (e) => e.currentTarget.style.borderColor = BLUE,
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-1 w-full",
									style: { background: "linear-gradient(90deg, #EC4899, #f472b6)" }
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-5 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ jsx(AlertCircle, {
											className: "w-5 h-5 mb-3 shrink-0",
											style: { color: "#EC4899" }
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-heading text-lg mb-2 tracking-wide",
											style: { color: BLUE },
											children: "Spotted an Error?"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-normal leading-relaxed mb-5 flex-1",
											style: { color: "#374151" },
											children: "See something that needs fixing? Tell us — we'll correct it immediately."
										}),
										/* @__PURE__ */ jsx("a", {
											href: "mailto:info@laplandvibes.com",
											className: "inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm",
											style: {
												background: "#EC4899",
												border: "2px solid #EC4899",
												color: "#FFFFFF"
											},
											onMouseEnter: (e) => {
												e.currentTarget.style.background = "#DB2777";
												e.currentTarget.style.borderColor = "#DB2777";
											},
											onMouseLeave: (e) => {
												e.currentTarget.style.background = "#EC4899";
												e.currentTarget.style.borderColor = "#EC4899";
											},
											children: "Report an Error →"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl flex flex-col transition-all duration-200 overflow-hidden",
								style: {
									background: WHITE,
									border: `2px solid ${BLUE}`
								},
								onMouseEnter: (e) => e.currentTarget.style.borderColor = "#EC4899",
								onMouseLeave: (e) => e.currentTarget.style.borderColor = BLUE,
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-1 w-full",
									style: { background: "linear-gradient(90deg, #EC4899, #f472b6)" }
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-5 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ jsx(Briefcase, {
											className: "w-5 h-5 mb-3 shrink-0",
											style: { color: "#EC4899" }
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-heading text-lg mb-2 tracking-wide",
											style: { color: BLUE },
											children: "Partner With Us"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-normal leading-relaxed mb-5 flex-1",
											style: { color: "#374151" },
											children: "Advertise or collaborate across 21+ Lapland sites."
										}),
										/* @__PURE__ */ jsx("a", {
											href: "mailto:info@laplandvibes.com",
											className: "inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm",
											style: {
												background: "#EC4899",
												border: "2px solid #EC4899",
												color: "#FFFFFF"
											},
											onMouseEnter: (e) => {
												e.currentTarget.style.background = "#DB2777";
												e.currentTarget.style.borderColor = "#DB2777";
											},
											onMouseLeave: (e) => {
												e.currentTarget.style.background = "#EC4899";
												e.currentTarget.style.borderColor = "#EC4899";
											},
											children: "Get in Touch →"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl flex flex-col transition-all duration-200 overflow-hidden",
								style: {
									background: WHITE,
									border: `2px solid ${BLUE}`
								},
								onMouseEnter: (e) => e.currentTarget.style.borderColor = "#EC4899",
								onMouseLeave: (e) => e.currentTarget.style.borderColor = BLUE,
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-1 w-full",
									style: { background: "linear-gradient(90deg, #EC4899, #f472b6)" }
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-5 flex flex-col flex-1",
									children: [
										/* @__PURE__ */ jsx(Newspaper, {
											className: "w-5 h-5 mb-3 shrink-0",
											style: { color: "#EC4899" }
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-heading text-lg mb-2 tracking-wide",
											style: { color: BLUE },
											children: "Press & Media"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-normal leading-relaxed mb-5 flex-1",
											style: { color: "#374151" },
											children: "Editorial partnerships and press kits."
										}),
										/* @__PURE__ */ jsx("a", {
											href: "mailto:info@laplandvibes.com",
											className: "inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm",
											style: {
												background: "#EC4899",
												border: "2px solid #EC4899",
												color: "#FFFFFF"
											},
											onMouseEnter: (e) => {
												e.currentTarget.style.background = "#DB2777";
												e.currentTarget.style.borderColor = "#DB2777";
											},
											onMouseLeave: (e) => {
												e.currentTarget.style.background = "#EC4899";
												e.currentTarget.style.borderColor = "#EC4899";
											},
											children: "Press Enquiries →"
										})
									]
								})]
							})
						]
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			style: {
				background: BLUE,
				borderTop: "1px solid rgba(248,250,252,0.15)"
			},
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-5 sm:py-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "text-xs font-normal",
							style: { color: WHITE },
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" #LaplandVibes — Part of the #LaplandVibes Network"
							]
						}),
						/* @__PURE__ */ jsx("a", {
							href: "https://yrityspaketit.fi",
							target: "_blank",
							rel: "noopener noreferrer sponsored",
							className: "text-xs font-normal transition-colors duration-200",
							style: { color: WHITE },
							onMouseEnter: (e) => e.currentTarget.style.color = "#EC4899",
							onMouseLeave: (e) => e.currentTarget.style.color = WHITE,
							children: "Website by Yrityspaketit.fi"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-normal",
							children: [[
								{
									to: "/privacy",
									label: "Privacy Policy"
								},
								{
									to: "/cookie-policy",
									label: "Cookie Policy"
								},
								{
									to: "/terms",
									label: "Terms of Use"
								}
							].map(({ to, label }) => /* @__PURE__ */ jsx(L, {
								to,
								className: "transition-colors duration-200 inline-flex items-center min-h-[44px] px-1",
								style: { color: WHITE },
								onMouseEnter: (e) => e.currentTarget.style.color = "#EC4899",
								onMouseLeave: (e) => e.currentTarget.style.color = WHITE,
								children: label
							}, to)), /* @__PURE__ */ jsx("a", {
								href: "mailto:info@laplandvibes.com",
								className: "transition-colors duration-200 inline-flex items-center min-h-[44px] px-1",
								style: { color: WHITE },
								onMouseEnter: (e) => e.currentTarget.style.color = "#EC4899",
								onMouseLeave: (e) => e.currentTarget.style.color = WHITE,
								children: "Contact"
							})]
						})
					]
				})
			})
		})
	] });
}
//#endregion
//#region src/components/CookieBanner.tsx
function CookieBanner({ consentKey = "laplandweddings_cookie_consent" }) {
	const [visible, setVisible] = useState(false);
	const [dismissing, setDismissing] = useState(false);
	useEffect(() => {
		if (!localStorage.getItem(consentKey)) {
			const t = setTimeout(() => setVisible(true), 1e3);
			return () => clearTimeout(t);
		}
	}, [consentKey]);
	const dismiss = (value) => {
		setDismissing(true);
		setTimeout(() => {
			localStorage.setItem(consentKey, value);
			setVisible(false);
			setDismissing(false);
		}, 850);
	};
	const accept = () => {
		dismiss("accepted");
		window.gtag?.("consent", "update", { analytics_storage: "granted" });
	};
	const decline = () => dismiss("declined");
	if (!visible) return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "lv-pole fixed bottom-0 z-[9997] pointer-events-none",
			children: [/* @__PURE__ */ jsx("div", {
				className: "lv-finial absolute rounded-full",
				style: {
					left: "50%",
					transform: "translateX(-50%)",
					background: "radial-gradient(circle at 35% 35%, #e2e8f0, #64748b)",
					boxShadow: "0 1px 4px rgba(0,0,0,0.45)"
				}
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0",
				style: { background: "linear-gradient(to bottom, #94a3b8 0%, #64748b 50%, #475569 100%)" }
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "lv-banner fixed z-[9999]",
			style: { animation: dismissing ? "cookieFlagLower 0.8s ease-in forwards" : "cookieFlagRise 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" },
			role: "dialog",
			"aria-label": "Cookie consent",
			"aria-modal": "true",
			children: /* @__PURE__ */ jsx("div", {
				style: {
					transformOrigin: "left center",
					animation: "cookieFlagFlutter 3.5s ease-in-out 1.6s infinite"
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "lv-card",
					style: { position: "relative" },
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "lv-rope",
							style: {
								position: "absolute",
								top: 6,
								left: -9,
								transformOrigin: "left center",
								transform: "rotate(2deg)"
							}
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lv-rope",
							style: {
								position: "absolute",
								bottom: 6,
								left: -9,
								transformOrigin: "left center",
								transform: "rotate(-2deg)"
							}
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "overflow-hidden rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-[#002F6C]/40 h-full grid",
							style: {
								gridTemplateColumns: "5fr 3fr 10fr",
								gridTemplateRows: "4fr 3fr 4fr"
							},
							children: [
								/* @__PURE__ */ jsx("div", { className: "bg-white" }),
								"               ",
								/* @__PURE__ */ jsx("div", { className: "bg-[#002F6C]" }),
								/* @__PURE__ */ jsx("div", {
									className: "bg-white flex items-center px-3",
									children: /* @__PURE__ */ jsx("p", {
										className: "lv-label text-[#002F6C] font-extrabold tracking-[0.22em] uppercase",
										children: "Cookies"
									})
								}),
								/* @__PURE__ */ jsx("div", { className: "bg-[#002F6C]" }),
								/* @__PURE__ */ jsx("div", { className: "bg-[#002F6C]" }),
								/* @__PURE__ */ jsx("div", {
									className: "bg-[#002F6C] flex items-center px-3",
									children: /* @__PURE__ */ jsxs("p", {
										className: "lv-body text-white leading-[1.35]",
										children: [
											"We use cookies to improve your experience.",
											" ",
											/* @__PURE__ */ jsx(Link, {
												to: "/cookie-policy",
												className: "underline opacity-80 hover:opacity-100 transition-opacity",
												children: "Cookie Policy"
											})
										]
									})
								}),
								/* @__PURE__ */ jsx("div", { className: "bg-white" }),
								"               ",
								/* @__PURE__ */ jsx("div", { className: "bg-[#002F6C]" }),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-white flex items-center justify-start gap-2 px-3",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: decline,
										className: "lv-btn text-[#002F6C] font-semibold border border-[#002F6C]/35 rounded-sm hover:bg-[#002F6C]/10 transition-colors cursor-pointer",
										children: "Decline"
									}), /* @__PURE__ */ jsx("button", {
										onClick: accept,
										className: "lv-btn bg-[#002F6C] text-white font-bold rounded-sm hover:bg-[#001a4a] transition-colors cursor-pointer",
										children: "Accept"
									})]
								})
							]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("style", { children: `
        /* ── Mobile ── (fixed pixel bottoms so mobile browser chrome resize does not displace the flag) */
        .lv-pole   { width: 4px; left: 14px; height: 274px; }
        .lv-finial { top: -5px; width: 10px; height: 10px; }
        .lv-banner { left: 24px; bottom: 140px; }
        .lv-card   { width: min(220px, 55vw); aspect-ratio: 18/11; }
        .lv-rope   { width: 8px; height: 1.5px; background: #334155; border-radius: 1px; }
        .lv-label  { font-size: 7px; letter-spacing: 0.15em; }
        .lv-body   { font-size: 6.5px; }
        .lv-btn    { font-size: 7.5px; padding: 3px 7px; }

        /* ── Desktop ── */
        @media (min-width: 768px) {
          .lv-pole   { width: 5px; left: 45px; height: 488px; }
          .lv-finial { top: -6px; width: 12px; height: 12px; }
          .lv-banner { left: 56px; bottom: 280px; }
          .lv-card   { width: 340px; }
          .lv-rope   { width: 10px; height: 2px; }
          .lv-label  { font-size: 9.5px; letter-spacing: 0.2em; }
          .lv-body   { font-size: 10px; }
          .lv-btn    { font-size: 10px; padding: 5px 12px; }
        }

        @keyframes cookieFlagRise {
          from { transform: translateY(100vh); }
          to   { transform: translateY(0); }
        }
        @keyframes cookieFlagLower {
          from { transform: translateY(0); }
          to   { transform: translateY(100vh); }
        }
        @keyframes cookieFlagFlutter {
          0%, 100% { transform: skewY(0deg); }
          20%      { transform: skewY(-1.3deg); }
          55%      { transform: skewY(0.7deg); }
          80%      { transform: skewY(-0.5deg); }
        }
      ` })
	] });
}
//#endregion
//#region src/components/ScrollToTop.tsx
function ScrollToTop() {
	const { pathname, hash } = useLocation();
	useEffect(() => {
		if (hash) return;
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [pathname, hash]);
	return null;
}
//#endregion
//#region src/components/Layout.tsx
/**
* App shell — wraps every route with the LangProvider and the chrome
* (Navigation, Footer, CookieBanner). Rendered via React Router data
* router so vite-react-ssg can prerender each child route to static HTML.
*/
function Layout() {
	return /* @__PURE__ */ jsx(LangProvider, { children: /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-night text-gray-200",
		children: [
			/* @__PURE__ */ jsx(ScrollToTop, {}),
			/* @__PURE__ */ jsx(Navigation, {}),
			/* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
			/* @__PURE__ */ jsx(SharedFooter, {}),
			/* @__PURE__ */ jsx(CookieBanner, {})
		]
	}) });
}
//#endregion
//#region src/components/PageHero.tsx
function PageHero({ eyebrow, title, subtitle, image, imageAlt, children, compact }) {
	return /* @__PURE__ */ jsxs("section", {
		className: `relative ${compact ? "min-h-[42vh] sm:min-h-[55vh]" : "min-h-[60vh] sm:min-h-[75vh]"} flex items-center overflow-hidden`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0",
			children: [/* @__PURE__ */ jsx("img", {
				src: image,
				alt: imageAlt,
				className: "w-full h-full object-cover",
				loading: "eager",
				fetchPriority: "high"
			}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-night/80 via-night/55 to-night/95" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-20 text-center",
			children: [
				eyebrow && /* @__PURE__ */ jsx("p", {
					className: "uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-sm text-aurora-pink font-semibold mb-3 sm:mb-4",
					children: eyebrow
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-heading text-[34px] leading-[1.1] sm:text-5xl md:text-6xl text-white mb-3 sm:mb-6 tracking-wide [text-wrap:balance]",
					children: title
				}),
				subtitle && /* @__PURE__ */ jsx("p", {
					className: "text-[15px] sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed [text-wrap:pretty]",
					children: subtitle
				}),
				children && /* @__PURE__ */ jsx("div", {
					className: "mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3 max-w-md sm:max-w-none mx-auto",
					children
				})
			]
		})]
	});
}
//#endregion
//#region src/components/Section.tsx
function Section({ id, eyebrow, title, subtitle, children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		id,
		className: `py-10 sm:py-20 ${className}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-5 sm:px-6",
			children: [(eyebrow || title || subtitle) && /* @__PURE__ */ jsxs("div", {
				className: "text-center mb-8 sm:mb-14 max-w-3xl mx-auto",
				children: [
					eyebrow && /* @__PURE__ */ jsx("p", {
						className: "uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-aurora-pink font-semibold mb-2.5 sm:mb-3",
						children: eyebrow
					}),
					title && /* @__PURE__ */ jsx("h2", {
						className: "font-heading text-[26px] leading-tight sm:text-4xl text-white mb-3 sm:mb-4 tracking-wide [text-wrap:balance]",
						children: title
					}),
					subtitle && /* @__PURE__ */ jsx("p", {
						className: "text-[15px] sm:text-lg text-gray-400 leading-relaxed [text-wrap:pretty]",
						children: subtitle
					})
				]
			}), children]
		})
	});
}
//#endregion
//#region src/components/SEO.tsx
var SITE = "https://laplandweddings.online";
var DEFAULT_IMAGE = "https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg";
function buildEn(path) {
	if (path === "/fi") return SITE + "/";
	if (path.startsWith("/fi/")) return SITE + path.slice(3);
	return SITE + path;
}
function buildFi(path) {
	if (path === "/" || path === "") return SITE + "/fi";
	if (path.startsWith("/fi")) return SITE + path;
	return SITE + "/fi" + path;
}
/**
* SEO meta — uses `<Head>` from vite-react-ssg so meta tags are rendered
* server-side during static prerender (visible to all crawlers including
* Bing, Yandex, social cards).
*/
function SEO({ title, description, path, image, type = "website", jsonLd, noindex }) {
	const { lang } = useLang();
	const enUrl = buildEn(path);
	const fiUrl = buildFi(path);
	const currentUrl = lang === "fi" ? fiUrl : enUrl;
	const og = image || DEFAULT_IMAGE;
	return /* @__PURE__ */ jsxs(Head, { children: [
		/* @__PURE__ */ jsx("title", { children: title }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "robots",
			content: noindex ? "noindex,nofollow" : "index,follow"
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: currentUrl
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "alternate",
			hrefLang: "en",
			href: enUrl
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "alternate",
			hrefLang: "fi",
			href: fiUrl
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "alternate",
			hrefLang: "x-default",
			href: enUrl
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: type
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: currentUrl
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: og
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale",
			content: lang === "fi" ? "fi_FI" : "en_GB"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:locale:alternate",
			content: lang === "fi" ? "en_GB" : "fi_FI"
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: "LaplandWeddings"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: og
		}),
		jsonLd && /* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		})
	] });
}
//#endregion
//#region src/components/NewsletterSignup.tsx
var NEWSLETTER_ENDPOINT = "https://laplandvibes-newsletter.vercel.app/api/subscribe";
function NewsletterSignup() {
	const { lang, tr } = useLang();
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");
	async function submit(e) {
		e.preventDefault();
		if (!email) return;
		setStatus("loading");
		try {
			if (!(await fetch(NEWSLETTER_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					source: "laplandweddings.online",
					lang
				})
			})).ok) throw new Error("failed");
			setStatus("ok");
			setEmail("");
		} catch {
			setStatus("error");
		}
	}
	return /* @__PURE__ */ jsx("div", {
		className: "bg-gradient-to-br from-aurora-purple/20 via-rose/15 to-aurora-pink/20 rounded-3xl p-6 sm:p-10 border border-white/10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl mx-auto text-center",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "font-heading text-2xl sm:text-3xl text-white mb-2.5 sm:mb-3 tracking-wide [text-wrap:balance]",
					children: tr.home.newsletterTitle
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed",
					children: tr.home.newsletterSub
				}),
				status === "ok" ? /* @__PURE__ */ jsx("p", {
					className: "text-aurora-green font-semibold",
					children: lang === "fi" ? "Kiitos! Olet listalla." : "Thanks! You are on the list."
				}) : /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xl mx-auto",
					children: [/* @__PURE__ */ jsx("input", {
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: tr.home.newsletterEmail,
						className: "flex-1 min-h-[48px] rounded-full bg-night-light border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose px-5 py-3 text-base text-white placeholder-gray-500 outline-none"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: status === "loading",
						className: "inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full disabled:opacity-60 shadow-lg shadow-rose/30",
						children: status === "loading" ? "…" : tr.home.newsletterCta
					})]
				}),
				status === "error" && /* @__PURE__ */ jsx("p", {
					className: "text-rose text-sm mt-3",
					children: lang === "fi" ? "Lähetys ei mennyt läpi. Kokeile vielä kerran." : "Subscription failed. Please try again."
				})
			]
		})
	});
}
//#endregion
//#region src/data/locations.ts
var locations = [
	{
		slug: "rovaniemi",
		name: {
			fi: "Rovaniemi",
			en: "Rovaniemi"
		},
		region: {
			fi: "Lappi · Joulupukin kotikaupunki",
			en: "Lapland · Home of Santa Claus"
		},
		airport: "RVN",
		airportDistanceKm: 10,
		intro: {
			fi: "Lapin pääkaupunki ja kansainvälisen lentokentän ansiosta helpoin saapua. Joulupukin Pajakylä, Arctic SnowHotel jääkappeleineen sekä Apukka Resortin lasi-iglut tekevät Rovaniemestä Lapin monipuolisimman häämatkakohteen.",
			en: "The capital of Lapland and the easiest gateway thanks to its international airport. Santa Claus Village, the Arctic SnowHotel ice chapel, and the glass igloos at Apukka Resort make Rovaniemi the most versatile Lapland wedding destination."
		},
		highlight: {
			fi: "Suorat lennot Helsingistä, Lontoosta, Frankfurtista ja Pariisista — vieraat saapuvat vaivatta.",
			en: "Direct flights from Helsinki, London, Frankfurt and Paris — guests arrive effortlessly."
		},
		bestFor: {
			fi: [
				"Talvihäät jääkappelissa",
				"Häät joulupukin pajakylän tuntumassa",
				"Helppo saavutettavuus kansainvälisille vieraille"
			],
			en: [
				"Winter weddings in an ice chapel",
				"Weddings near Santa Claus Village",
				"Easy access for international guests"
			]
		},
		venueSlugs: [
			"arctic-snowhotel",
			"apukka-resort",
			"arctic-treehouse",
			"santas-hotel-santamus",
			"nova-skyland"
		],
		heroImage: "https://arctictreehousehotel.com/wp-content/uploads/2025/05/Arctic-treehouse-hotel-summer-august-1600x960.jpg",
		heroAlt: {
			fi: "Rovaniemen lumiset metsät iltahämärässä",
			en: "Snowy forests of Rovaniemi at twilight"
		},
		seasonNote: {
			fi: "Lumi maassa marraskuusta huhtikuuhun. Revontulia odotettavissa syyskuusta maaliskuuhun pilvettöminä öinä.",
			en: "Snow on the ground from November to April. Northern Lights expected from September to March on clear nights."
		}
	},
	{
		slug: "saariselka",
		name: {
			fi: "Saariselkä & Inari",
			en: "Saariselkä & Inari"
		},
		region: {
			fi: "Pohjois-Lappi · Urho Kekkosen kansallispuiston laidalla",
			en: "Northern Lapland · Edge of Urho Kekkonen National Park"
		},
		airport: "IVL",
		airportDistanceKm: 30,
		intro: {
			fi: "Pohjois-Lapin sydän, jossa revontulet näkyvät tilastollisesti useammin kuin millään muulla matkailualueella. Kakslauttasen lasi-iglut ja jääkappeli ovat alueen tunnetuimmat häätilat. Inarinjärvi tuo historiaa ja saamelaiskulttuuria juhliin.",
			en: "The heart of Northern Lapland, where the Northern Lights statistically appear more often than anywhere else in the tourism area. Kakslauttanen’s glass igloos and ice chapel are the area’s most famous wedding venues. Lake Inari adds history and Sámi culture to your celebration."
		},
		highlight: {
			fi: "Korkein revontulitodennäköisyys koko Lapissa — keskimäärin 200 yötä vuodessa.",
			en: "Highest Northern Lights probability in all of Lapland — about 200 nights per year."
		},
		bestFor: {
			fi: [
				"Revontulihäät",
				"Lasi-iglu-hääyö",
				"Saamelaiskulttuuri ja Inarinjärvi"
			],
			en: [
				"Northern Lights weddings",
				"Glass igloo wedding nights",
				"Sámi culture and Lake Inari"
			]
		},
		venueSlugs: [
			"kakslauttanen",
			"northern-lights-village-saariselka",
			"wilderness-hotel-muotka",
			"wilderness-hotel-inari",
			"wilderness-hotel-juutua"
		],
		heroImage: "https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg",
		heroAlt: {
			fi: "Lasi-iglu revontulien alla Saariselällä",
			en: "Glass igloo under Northern Lights in Saariselkä"
		},
		seasonNote: {
			fi: "Kaamos kestää joulukuusta tammikuuhun, mutta revontulet näkyvät päivänvalossakin pimeimpinä viikkoina. Keskiyön aurinko 23.5.–24.7.",
			en: "Polar night lasts from December to January, but Northern Lights appear even during daytime in the darkest weeks. Midnight Sun May 23 – July 24."
		}
	},
	{
		slug: "levi",
		name: {
			fi: "Levi & Kittilä",
			en: "Levi & Kittilä"
		},
		region: {
			fi: "Tunturi-Lappi · Suomen suurin hiihtokeskus",
			en: "Fell Lapland · Finland’s largest ski resort"
		},
		airport: "KTT",
		airportDistanceKm: 14,
		intro: {
			fi: "Levin alueella yhdistyvät hiihtokeskuksen palvelut, Lainion lumikylä ja Northern Lights Ranchin lasiseinämökit, joista revontulet näkee suoraan vuoteesta. Kittilän lentokentälle suorat lennot Lontoosta — siksi brittien suosikki.",
			en: "Levi brings together a full ski-resort infrastructure, the Lainio Snow Village, and Northern Lights Ranch where the auroras are visible straight through your cabin’s glass wall. Kittilä Airport has direct flights from London, which is why Levi is the British favourite."
		},
		highlight: {
			fi: "Suorat lennot Lontoosta, Manchesterista ja Birminghamista koko sesongin.",
			en: "Direct flights from London, Manchester and Birmingham throughout the season."
		},
		bestFor: {
			fi: [
				"Lumikappelihäät Lainiossa",
				"Northern Lights Ranchin Snow Chapel",
				"Hiihto- ja laskettelumatkailijoiden häät"
			],
			en: [
				"Snow chapel weddings at Lainio",
				"Snow Chapel at Northern Lights Ranch",
				"Weddings combined with skiing"
			]
		},
		venueSlugs: [
			"snow-village-lainio",
			"levi-ice-castle",
			"northern-lights-ranch",
			"levin-iglut",
			"northern-lights-village-levi",
			"hotelli-hullu-poro",
			"levi-panorama"
		],
		heroImage: "https://theranch.fi/wp-content/uploads/2025/02/hero-private-event-theranch.webp",
		heroAlt: {
			fi: "Levin tunturit auringonlaskussa",
			en: "Levi fells at sunset"
		},
		seasonNote: {
			fi: "Lumikappelit ovat avoinna joulukuusta huhtikuuhun. Pisin sesonki Suomessa.",
			en: "Snow chapels open from December to April. The longest season in Finland."
		}
	},
	{
		slug: "yllas",
		name: {
			fi: "Ylläs",
			en: "Ylläs"
		},
		region: {
			fi: "Tunturi-Lappi · Pallas-Yllästunturin kansallispuisto",
			en: "Fell Lapland · Pallas-Yllästunturi National Park"
		},
		airport: "KTT",
		airportDistanceKm: 50,
		intro: {
			fi: "Hiljaisempi vaihtoehto Levin viereen. Ylläsjärven Saaga on saanut wedding-mainetta TripAdvisorissa, ja Lainion lumikylä sijaitsee Yllästä lähinnä. Sopii pareille jotka haluavat tunturi-rauhaa ilman hiihtokeskuksen vilskettä.",
			en: "A quieter alternative next to Levi. Lapland Hotels Saaga has earned wedding fame on TripAdvisor, and the Lainio Snow Village sits closest to Ylläs. Best for couples wanting fell tranquility without ski resort bustle."
		},
		highlight: {
			fi: "Suomen puhtainta ilmaa, hiljaisin tunturikohde häille.",
			en: "Finland’s cleanest air, the quietest fell destination for weddings."
		},
		bestFor: {
			fi: [
				"Pieni ja intiimi häät",
				"Tunturikylpyläjuhlat",
				"Luonnonrauha vieraille"
			],
			en: [
				"Small and intimate weddings",
				"Fell-top spa celebrations",
				"Wilderness peace for guests"
			]
		},
		venueSlugs: ["lapland-hotels-saaga", "snow-village-lainio"],
		heroImage: "https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg",
		heroAlt: {
			fi: "Ylläksen tunturin lumihuiput",
			en: "Snow-covered Ylläs fell peaks"
		},
		seasonNote: {
			fi: "Ruskakausi syyskuun puolivälissä on Ylläksen kauneinta aikaa kesähäille.",
			en: "The autumn ruska in mid-September is Ylläs’ most beautiful time for autumn weddings."
		}
	},
	{
		slug: "pyha-luosto",
		name: {
			fi: "Pyhä-Luosto",
			en: "Pyhä-Luosto"
		},
		region: {
			fi: "Itä-Lappi · Pyhä-Luoston kansallispuisto",
			en: "Eastern Lapland · Pyhä-Luosto National Park"
		},
		airport: "RVN",
		airportDistanceKm: 110,
		intro: {
			fi: "Lapin parhaiten varjeltu salaisuus. Hotel Aurora Pyhä on pohjoisin tähtibongauspaikka maailmassa, ja Lapland Hotels Pyhä tarjoaa amethystikaivoksen jonka hääpari voi varata yksityiskäyttöön.",
			en: "Lapland’s best-kept secret. Hotel Aurora Pyhä is the northernmost stargazing site in the world, and Lapland Hotels Pyhä offers an amethyst mine couples can book privately."
		},
		highlight: {
			fi: "Ainutlaatuinen amethyst-kaivosvihkiminen.",
			en: "A one-of-a-kind amethyst mine wedding ceremony."
		},
		bestFor: {
			fi: [
				"Tähtibongaus + revontulet",
				"Amethystikaivos-vihkiminen",
				"Etäinen, vähän vieraita"
			],
			en: [
				"Stargazing + Northern Lights",
				"Amethyst mine ceremonies",
				"Remote, intimate ceremonies"
			]
		},
		venueSlugs: ["hotel-aurora-pyha", "lapland-hotels-pyha"],
		heroImage: "https://visitpyha.fi/wp-content/uploads/2025/09/IMG20240120111651-scaled.jpg",
		heroAlt: {
			fi: "Pyhän tunturin metsät",
			en: "Forests of Pyhä fell"
		},
		seasonNote: {
			fi: "Joulukuu–maaliskuu on parasta revontuliaikaa. Kesäkuu–elokuu vaellushäille.",
			en: "December–March for the best Northern Lights. June–August for hiking weddings."
		}
	},
	{
		slug: "kilpisjarvi",
		name: {
			fi: "Kilpisjärvi",
			en: "Kilpisjärvi"
		},
		region: {
			fi: "Käsivarsi · Norjan ja Ruotsin rajalla",
			en: "The Arm of Finland · At the Norwegian and Swedish borders"
		},
		airport: "KTT",
		airportDistanceKm: 220,
		intro: {
			fi: "Suomen pohjoisin ja korkein paikka, jossa on Lapin parhaat revontulinäkymät tunturiston yllä. Tundrea Igloos tarjoaa lasikatollisia mökkejä järvenrannassa.",
			en: "Finland’s northernmost and highest point, with Lapland’s best Northern Lights views above the fells. Tundrea Igloos offers glass-roof cabins on the lake shore."
		},
		highlight: {
			fi: "Kolmen valtakunnan rajapyykkivihkiminen Suomessa, Norjassa ja Ruotsissa samaan aikaan.",
			en: "Three-country border ceremony — be married in Finland, Norway and Sweden at the same point."
		},
		bestFor: {
			fi: [
				"Adventure-elopement",
				"Kolmen maan rajavihkiminen",
				"Eksklusiivinen pieni häät"
			],
			en: [
				"Adventure elopements",
				"Three-country border ceremonies",
				"Exclusive small weddings"
			]
		},
		venueSlugs: ["tundrea-kilpisjarvi"],
		heroImage: "https://tundrea.com/wp-content/uploads/2021/09/IMG_6429-HDR-2-scaled-e1660643559657.jpg",
		heroAlt: {
			fi: "Kilpisjärven tunturit kesällä",
			en: "Kilpisjärvi fells in summer"
		},
		seasonNote: {
			fi: "Tunturikesä on kompakti — kesäkuun loppu elokuun alkuun. Talvella tie auki Kilpisjärvelle ympäri vuoden.",
			en: "The fell summer is compact — late June to early August. Road open to Kilpisjärvi year-round in winter."
		}
	}
];
//#endregion
//#region src/data/weddingTypes.ts
var weddingTypes = [
	{
		slug: "northern-lights",
		name: {
			fi: "Revontulihäät",
			en: "Northern Lights Wedding"
		},
		tagline: {
			fi: "Vihkiminen aurora borealiksen alla",
			en: "Exchange vows under the aurora borealis"
		},
		description: {
			fi: "Revontulet ovat Lapin tunnetuin häätoive — eikä turhaan. Pohjois-Lapin korkeilla leveysasteilla revontulet näkyvät pilvettöminä öinä keskimäärin 200 kertaa vuodessa. Vihkiminen pidetään tyypillisesti varhaisessa illassa lähellä venuea, jotta revontulet ehtivät ilmestyä juhlien aikana. Kakslauttanen, Northern Lights Ranch ja Apukka Resort ovat osaavimpia revontuli-pareiden kanssa.",
			en: "The Northern Lights are Lapland’s most-requested wedding wish — and for good reason. At Northern Lapland’s high latitudes, the aurora appears on clear nights about 200 times per year. The ceremony is typically held in early evening close to the venue so the lights can emerge during the celebration. Kakslauttanen, Northern Lights Ranch and Apukka Resort are the most experienced with aurora couples."
		},
		bestSeason: {
			fi: "Syyskuu–maaliskuu, paras lokakuu–helmikuu",
			en: "September–March, best October–February"
		},
		priceRange: "€2 500 – €40 000",
		capacity: "2–60 vierasta",
		highlights: {
			fi: [
				"Aurora-hälytysjärjestelmät yhteistyö-venueilla",
				"Lasi-iglu yöksi (revontulet katosta)",
				"Valokuvaaja jolla revontulikalibrointi",
				"Polttariperinteet revontulien alla"
			],
			en: [
				"Aurora alert systems at partner venues",
				"Glass igloo for the night (lights through the roof)",
				"Photographer with aurora-calibrated equipment",
				"After-party traditions under the lights"
			]
		},
		considerations: {
			fi: [
				"Revontulet eivät ole taatusti — kysy hääpaikalta varasuunnitelma",
				"Pakkanen voi olla -25 °C — pukukohtainen suunnittelu",
				"Pilvinen yö syö revontulet — pidä hääpäivä joustavana ±2 päivää"
			],
			en: [
				"Auroras are not guaranteed — require a weather backup from the venue",
				"Temperatures can hit -25 °C — plan attire accordingly",
				"Cloudy nights hide the lights — keep the wedding date flexible by ±2 days"
			]
		},
		venueSlugs: [
			"kakslauttanen",
			"northern-lights-ranch",
			"apukka-resort",
			"arctic-snowhotel",
			"northern-lights-village-saariselka"
		],
		heroImage: "https://mariahedengren.com/wp-content/uploads/2024/11/YK02-Aurora-Village-Ivalo.jpg",
		icon: "✨"
	},
	{
		slug: "snow-chapel",
		name: {
			fi: "Lumikappelihäät",
			en: "Snow Chapel Wedding"
		},
		tagline: {
			fi: "Vihille puhtaaksi veistetyssä lumi- tai jääkappelissa",
			en: "Marry in a chapel carved from pure snow and ice"
		},
		description: {
			fi: "Lumikappelit rakennetaan joka talvi uudelleen joulukuun alusta huhtikuuhun. Seinät, alttari ja istuimet veistetään kristallinkirkkaasta jäästä. Kappelit ovat kylmempiä kuin ulkona (-3 °C…-7 °C), joten seremoniat ovat lyhyitä (15–30 min) ja vieraat istuvat lampaantaljojen päällä. Kapasiteetit vaihtelevat: Lainion Snow Village 50, Northern Lights Ranch 60, Arctic SnowHotel 30, Levi Ice Castle 50.",
			en: "Snow chapels are rebuilt every winter from early December to April. Walls, altar and seating are carved from crystal-clear ice. The chapels are colder than outside (-3 °C…-7 °C), so ceremonies are short (15–30 min) and guests sit on sheepskins. Capacities vary: Lainio Snow Village 50, Northern Lights Ranch 60, Arctic SnowHotel 30, Levi Ice Castle 50."
		},
		bestSeason: {
			fi: "Joulukuu–huhtikuu (kappelit avoinna)",
			en: "December–April (chapels open)"
		},
		priceRange: "€1 500 – €15 000",
		capacity: "2–60 vierasta",
		highlights: {
			fi: [
				"Joka kappeli rakennetaan vuosittain uudelleen — ainutkertainen",
				"Vihkiminen + lasinen jäätyikkä-toivotus",
				"Vieraat lampaantaljoissa ja viltteihin käärittyinä",
				"Useimmilla kappeleilla oma vihkijä-järjestely paikalla"
			],
			en: [
				"Each chapel is rebuilt every year — truly unique",
				"Ceremony + ice-glass toasts",
				"Guests on sheepskins and wrapped in blankets",
				"Most chapels include officiant arrangement on site"
			]
		},
		considerations: {
			fi: [
				"Kappelit avoinna vain joulukuusta huhtikuuhun — varaus lukitaan jopa vuotta etukäteen",
				"Sisälämpötila pakkasella — vihkimekko + lämmin alusasu",
				"Sähköttömät kappelit → valaistus on kynttilä + lyhty, valokuvaajan tekninen taito ratkaisee"
			],
			en: [
				"Chapels open only December–April — bookings often locked a year ahead",
				"Sub-zero indoor temperature — wedding dress with thermal underlayer",
				"No electric lighting → candles and lanterns only; photographer’s technical skill is critical"
			]
		},
		venueSlugs: [
			"snow-village-lainio",
			"northern-lights-ranch",
			"arctic-snowhotel",
			"levi-ice-castle",
			"kakslauttanen"
		],
		heroImage: "https://theranch.fi/wp-content/uploads/2025/02/wedding-gallery-1-theranch.jpg",
		icon: "❄"
	},
	{
		slug: "glass-igloo",
		name: {
			fi: "Lasi-iglu-häät",
			en: "Glass Igloo Wedding"
		},
		tagline: {
			fi: "Hääyö revontulien alla lämpöisessä lasikuvussa",
			en: "Wedding night beneath the lights in a heated glass dome"
		},
		description: {
			fi: "Lasi-iglu ei ole varsinaista vihkimistilaa, vaan ainutlaatuinen ensimmäinen yhteinen yö. Useimmat parit yhdistävät vihkimisen jäätai hirsikappelissa lasi-iglu-yhöeen. Iglujen pohjalämmitys ja sähkölämmitetty lasi pitää näkymän kirkkaana -30 °C:ssä. Levin Iglut, Apukka Kammi, Kakslauttanen, Arctic SnowHotel ja NLV Saariselkä ovat top-tier tason vaihtoehtoja.",
			en: "A glass igloo is not the ceremony space itself but a unique first night together. Most couples combine an ice or log chapel ceremony with a glass igloo overnight. Underfloor heating and electrically heated glass keep the view clear at -30 °C. Levin Iglut, Apukka Kammi, Kakslauttanen, Arctic SnowHotel and NLV Saariselkä are top-tier options."
		},
		bestSeason: {
			fi: "Marraskuu–huhtikuu lumelle ja revontulille",
			en: "November–April for snow and Northern Lights"
		},
		priceRange: "€300 – €1 200 / yö",
		capacity: "2 hengen yöpyminen",
		highlights: {
			fi: [
				"Aurora-hälytys herättää keskellä yötä jos revontulet ilmestyvät",
				"Pohjalämmitys + sähkölämmitetty lasikatto",
				"Sauna ja amme yleensä mukana premium-mallissa",
				"Aamiainen iglussa tai pääravintolassa"
			],
			en: [
				"Aurora alarm wakes you mid-night if the lights appear",
				"Underfloor heating + electrically heated glass roof",
				"Sauna and tub usually included in premium models",
				"Breakfast in the igloo or main restaurant"
			]
		},
		considerations: {
			fi: [
				"Iglu on hääyö, ei juhlatila — vihkimisen järjestäjä toinen",
				"Yhteen iglun mahtuu vain pari (4 hengen iglutyyppejä rajoitetusti)",
				"Lasi peilaa sisävalon → revontulia varten valot pois"
			],
			en: [
				"Igloo is for the wedding night, not the ceremony — venue arranged separately",
				"Single igloo holds the couple only (4-person igloos limited)",
				"Glass mirrors interior light → lights off to see auroras"
			]
		},
		venueSlugs: [
			"kakslauttanen",
			"levin-iglut",
			"apukka-resort",
			"arctic-snowhotel",
			"northern-lights-village-saariselka",
			"tundrea-kilpisjarvi"
		],
		heroImage: "https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg",
		icon: "🏔"
	},
	{
		slug: "midnight-sun",
		name: {
			fi: "Keskiyön auringon häät",
			en: "Midnight Sun Wedding"
		},
		tagline: {
			fi: "Vihille kun aurinko ei laske",
			en: "Marry when the sun never sets"
		},
		description: {
			fi: "Pohjois-Lapissa aurinko ei laske horisontin alle 23.5.–24.7. — vihkiminen voidaan pitää keskellä yötä luonnonvalossa. Saariselkä, Inari ja Kilpisjärvi ovat täydellisiä. Sää on lämmin (15–25 °C päivällä), joten ulkohäät metsässä, järvenrannassa tai tunturilla onnistuvat ilman lumipukuja. Kasvavin trendi 2025–2027.",
			en: "In Northern Lapland the sun does not set below the horizon from 23 May to 24 July — the ceremony can be held at midnight in natural light. Saariselkä, Inari and Kilpisjärvi are perfect. Weather is warm (15–25 °C in daytime), so outdoor weddings in forests, lakeside or on the fells work without snow gear. The fastest-growing trend for 2025–2027."
		},
		bestSeason: {
			fi: "23. toukokuuta – 24. heinäkuuta",
			en: "May 23 – July 24"
		},
		priceRange: "€2 000 – €25 000",
		capacity: "2–80 vierasta",
		highlights: {
			fi: [
				"24h luonnonvalo — kuvaussessio milloin tahansa",
				"Lämmin sää — perinteinen morsiuspuku ilman ekstrapakkasta",
				"Hyttysmäärä huipussaan kesä–heinäkuussa — torjunta tärkeää",
				"Halvempi sesonki kuin talvi — premium-iglut 40–50 % alennuksessa"
			],
			en: [
				"24h natural light — photoshoot anytime",
				"Warm weather — wear a traditional dress with no thermal layers",
				"Mosquito peak in June–July — repellent essential",
				"Cheaper season than winter — premium igloos at 40–50 % off"
			]
		},
		considerations: {
			fi: [
				"Hyttyset peak — heinäkuu helpoin, elokuussa hyttyset jo vähissä",
				"Ei revontulia kesällä — tämä on eri estetiikka",
				"Ei lunta tai lumikappelia — wow-tekijä on auringonvalo"
			],
			en: [
				"Mosquitos peak — July easiest, fewer mosquitos by August",
				"No Northern Lights in summer — different aesthetic",
				"No snow or snow chapel — the wow factor is the sunlight"
			]
		},
		venueSlugs: [
			"kakslauttanen",
			"wilderness-hotel-inari",
			"tundrea-kilpisjarvi",
			"apukka-resort",
			"lapland-hotels-saaga"
		],
		heroImage: "https://mariahedengren.com/wp-content/uploads/2023/09/HG00-Lapland-wedding-photographer.jpg",
		icon: "☀"
	},
	{
		slug: "elopement",
		name: {
			fi: "Elopement / Kahdestaan vihille",
			en: "Elopement / Two-Person Wedding"
		},
		tagline: {
			fi: "Pelkästään te kaksi, vihkijä ja valokuvaaja",
			en: "Just the two of you, the officiant and a photographer"
		},
		description: {
			fi: "Suomen helpoin häämuoto: vain hääpari, vihkijä ja kaksi todistajaa. Kaikki paperitehtävät hoituu DVV:n kautta, ja monet plannerit (Lapland Romance, Adventure Wedding) tarjoavat avaimet käteen -elopement -paketteja 1 600 €:sta alkaen. Elopement vie 1–2 päivää ja antaa parille kaksin juhlavuoden hetken Lapin maisemassa.",
			en: "Finland’s easiest wedding form: just the couple, the officiant and two witnesses. All paperwork goes through DVV, and many planners (Lapland Romance, Adventure Wedding) offer turnkey elopement packages from €1 600. Elopement takes 1–2 days and gives the couple their wedding moment alone in the Lapland landscape."
		},
		bestSeason: {
			fi: "Ympäri vuoden — paras joulukuussa, helmikuussa ja kesäkuussa",
			en: "Year-round — best in December, February and June"
		},
		priceRange: "€1 600 – €5 000",
		capacity: "2 hengen",
		highlights: {
			fi: [
				"Kustannus 1/10 perinteisistä häistä",
				"DVV-paperit hoituu 3–5 viikossa",
				"Avaimet käteen -paketit valokuvaaja ja vihkijä mukana",
				"Ei painetta vieraille — paras lokaatiovalinta"
			],
			en: [
				"Cost 1/10 of a traditional wedding",
				"DVV paperwork done in 3–5 weeks",
				"Turnkey packages with photographer and officiant",
				"No guest pressure — pick the best location"
			]
		},
		considerations: {
			fi: [
				"DVV-paperit on aloitettava 2 kuukautta ennen vihkimistä",
				"Vain 2 todistajaa pakollinen — haetaan paikan päältä",
				"Useimmat hääpaikat ottavat elopement-pareja vain arkipäivisin"
			],
			en: [
				"DVV paperwork must start 2 months before the ceremony",
				"Only 2 witnesses required — found locally",
				"Most venues take elopement couples mid-week, off-peak"
			]
		},
		venueSlugs: [
			"kakslauttanen",
			"apukka-resort",
			"tundrea-kilpisjarvi",
			"wilderness-hotel-muotka"
		],
		heroImage: "https://mariahedengren.com/wp-content/uploads/2018/04/63-Lapland-winter-elopement.jpg",
		icon: "💍"
	},
	{
		slug: "vow-renewal",
		name: {
			fi: "Lupausten uusiminen",
			en: "Vow Renewal"
		},
		tagline: {
			fi: "Uudistakaa lupauksenne Lapin lumessa",
			en: "Renew your vows in the Lapland snow"
		},
		description: {
			fi: "Lupausten uusiminen ei vaadi mitään juridisia papereita — vain seremonia ja hääpari. Useimmat plannerit tarjoavat \"renewal\"-paketteja 50 % alennuksella verrattuna virallisiin häihin. Sopii hyvin pitkien parisuhteiden virstanpylväiseen tai uusiin perheisiin (uusperheen aloitus). Tällä on merkittävä trendi USA:ssa, eivätkä paperisotalupaukset paina.",
			en: "Renewing vows requires no legal paperwork — just a ceremony and the couple. Most planners offer \"renewal\" packages at 50 % off official weddings. Excellent for long-relationship milestones or new families (blended-family launches). Major US trend, with no paperwork pressure."
		},
		bestSeason: {
			fi: "Ympäri vuoden, paras 5/10/25/50 vuotta yhdessä",
			en: "Year-round, best at the 5/10/25/50-year milestone"
		},
		priceRange: "€800 – €3 500",
		capacity: "2–30 vierasta",
		highlights: {
			fi: [
				"Ei DVV-papereita",
				"Vapaa muoto — voitte itse kirjoittaa lupaukset",
				"Sopii uusperheille (lapsen siunaus mukana)",
				"Halvempi kuin viralliset häät"
			],
			en: [
				"No DVV paperwork",
				"Free format — you write the vows",
				"Works for blended families (child blessing included)",
				"Cheaper than an official wedding"
			]
		},
		considerations: {
			fi: [
				"Ei juridista vaikutusta — paperi-avioliitto on jo voimassa",
				"Tarvitaan vihkijä-tuntuinen henkilö (ei pakko olla virallinen)",
				"Valokuvaus-arvo on kuitenkin sama kuin häissä — investoikaa siihen"
			],
			en: [
				"No legal effect — paper marriage already in force",
				"Need someone with officiant presence (not legally required)",
				"Photography value equals a real wedding — invest there"
			]
		},
		venueSlugs: [
			"kakslauttanen",
			"apukka-resort",
			"lapland-hotels-saaga",
			"wilderness-hotel-muotka"
		],
		heroImage: "https://mariahedengren.com/wp-content/uploads/2018/04/51-best-wedding-photographer-Lapland.jpg",
		icon: "💞"
	}
];
//#endregion
//#region src/data/planners.ts
/**
* Lähde: RESEARCH-MARKET.md (julkisesti vahvistetut toimijat).
* Kaikki tiedot kerätty yritysten omilta sivuilta — ei sopimusta yhteenkään toistaiseksi.
* Tarjoukset välitetään plannereille emailitse kunnes B2B-deal allekirjoitetaan.
*/
var planners = [
	{
		slug: "lapland-romance",
		name: "Lapland Romance",
		homeBase: {
			fi: "Rovaniemi",
			en: "Rovaniemi"
		},
		serviceArea: {
			fi: "Koko Lappi",
			en: "All of Lapland"
		},
		priceFrom: "1 595 €",
		priceTier: "€€",
		languages: ["Suomi", "English"],
		description: {
			fi: "Rovaniemen vakiintunein hääsuunnittelija ja Lapin suurin julkinen brändi. Tarjoaa läpinäkyviä paketteja 1 595 €:sta (2 hengen elopement) 3 699 €:oon (40 hengen juhla). Visit Rovaniemi -kumppani ja TripAdvisor-suosikki.",
			en: "The most established wedding planner in Rovaniemi and Lapland’s biggest public brand. Transparent packages from €1 595 (2-person elopement) to €3 699 (40-guest celebration). Visit Rovaniemi partner and TripAdvisor favourite."
		},
		strengths: {
			fi: [
				"Läpinäkyvä hinnoittelu",
				"FI + EN palvelu",
				"TripAdvisor-arvostelut",
				"Vihkijä, valokuvaus, kukat, kakku, hiukset, kuljetus saman katon alla"
			],
			en: [
				"Transparent pricing",
				"FI + EN service",
				"TripAdvisor reviews",
				"Officiant, photography, flowers, cake, hair, transport — all under one roof"
			]
		},
		bestFor: {
			fi: "Ensimmäisen kerran vihkivät parit jotka haluavat selvät hinnat ja Lapin asiantuntemuksen.",
			en: "First-time couples who want clear pricing and deep Lapland expertise."
		},
		publicWebsite: "https://laplandromance.com/weddings",
		publicEmail: "hello@laplandromance.com",
		ownProfilePage: false
	},
	{
		slug: "arctic-wedding-finland",
		name: "Arctic Wedding Finland",
		homeBase: {
			fi: "Vantaa, Suomi",
			en: "Vantaa, Finland"
		},
		serviceArea: {
			fi: "Koko Lappi",
			en: "All of Lapland"
		},
		priceTier: "€€€",
		languages: ["Suomi", "English"],
		description: {
			fi: "Vantaalainen, Hanna-Stina Seppäsen perustama hääsuunnittelija. Painottaa ekologisuutta ja räätälöityjä Lapin häitä. Hinnat sovitaan tapauskohtaisesti.",
			en: "A Vantaa-based wedding planner founded by Hanna-Stina Seppänen. Specialised in sustainable, bespoke Lapland weddings. Pricing tailored — no public packages."
		},
		strengths: {
			fi: [
				"Kestävyysorientoituminen",
				"Korkealuokkainen brändi",
				"Etelä-Suomen tukikohta"
			],
			en: [
				"Sustainability focus",
				"High-end branding",
				"Southern Finland base"
			]
		},
		bestFor: {
			fi: "Parit jotka haluavat ekologisesti ajatellun, räätälöidyn häähypon Lapissa.",
			en: "Couples who want an eco-conscious, bespoke wedding experience in Lapland."
		},
		publicWebsite: "https://arcticweddingfinland.com/",
		publicEmail: "contact@arcticweddingfinland.com",
		ownProfilePage: false
	},
	{
		slug: "sun-and-snow-weddings",
		name: "Sun & Snow Weddings",
		homeBase: {
			fi: "UK · Lappi-tuotanto",
			en: "UK · Lapland production"
		},
		serviceArea: {
			fi: "Lappi · UK-asiakkaille",
			en: "Lapland · for UK clients"
		},
		priceTier: "€€€",
		languages: ["English"],
		description: {
			fi: "Brittiläinen suunnittelutoimisto joka hoitaa pareille DVV-paperit alusta loppuun. Eksklusiivinen yhteistyö Northern Lights Ranchin Snow Chapel kanssa. Paras valinta UK-pareille jotka pelkäävät paperisotalupoa.",
			en: "A British planner that handles all DVV paperwork end-to-end. Exclusive partnership with Northern Lights Ranch Snow Chapel. The best choice for UK couples worried about paperwork."
		},
		strengths: {
			fi: [
				"DVV-paperit puolesta",
				"NLR Snow Chapel -kumppanuus",
				"UK-pohjainen tuotanto"
			],
			en: [
				"DVV paperwork on your behalf",
				"NLR Snow Chapel partnership",
				"UK-based production"
			]
		},
		bestFor: {
			fi: "UK-parit jotka haluavat täyspaketin Lapin lumikappelihäille.",
			en: "UK couples wanting a full-package Lapland snow chapel wedding."
		},
		publicWebsite: "https://www.sunandsnowweddings.com/index.php/lapland/wedding-packages-lapland",
		ownProfilePage: false
	},
	{
		slug: "amulet-events",
		name: "Amulet Events",
		homeBase: {
			fi: "Suomi",
			en: "Finland"
		},
		serviceArea: {
			fi: "Lappi",
			en: "Lapland"
		},
		priceTier: "€€€",
		languages: ["English"],
		description: {
			fi: "Adventure-orientoitunut elopement- ja hääsuunnittelija. Nadia, perustaja, painottaa \"personally curated\" -palvelua: hair, makeup, valokuvaus, kukat, seikkailut ja yksityisillalliset.",
			en: "Adventure-focused elopement and wedding planner. Nadia, the founder, emphasises “personally curated” service: hair, makeup, photography, flowers, adventures, and private dinners."
		},
		strengths: {
			fi: [
				"Seikkailuhenkiset elopementit",
				"Henkilökohtainen palvelu",
				"Pienet seurueet"
			],
			en: [
				"Adventure-based elopements",
				"Personalised service",
				"Small parties"
			]
		},
		bestFor: {
			fi: "Seikkailuhenkiset parit, ei massamarkkina.",
			en: "Adventure-spirited couples, not mass-market."
		},
		publicWebsite: "https://amuletevents.com/destinations/finland-wedding-planning-packages/",
		ownProfilePage: false
	},
	{
		slug: "nordic-mice-xwander",
		name: "Nordic MICE / Xwander",
		homeBase: {
			fi: "Helsinki + Ivalo",
			en: "Helsinki + Ivalo"
		},
		serviceArea: {
			fi: "Lappi luksus",
			en: "Luxury Lapland"
		},
		priceTier: "€€€€",
		languages: [
			"English",
			"Suomi",
			"Deutsch",
			"Français",
			"Español"
		],
		description: {
			fi: "Suomen kärki-luksushääsuunnittelija. Michelin-tason ravintolat, helikopterit, kahden kuukauden sääbackup, jopa 100 vierasta. Sopii kun haluatte parasta mahdollista — ei hintojen verrottelua.",
			en: "Finland’s top-tier luxury wedding planner. Michelin-level catering, helicopters, two-month weather contingency, up to 100 guests. The right choice when you want the best possible — pricing on application."
		},
		strengths: {
			fi: [
				"Michelin-tason illalliset",
				"Helikopterituki",
				"5 kieltä",
				"Yritystapahtuma-tausta tuo kurinalaisuutta"
			],
			en: [
				"Michelin-level dinners",
				"Helicopter support",
				"5 languages",
				"Corporate-event discipline"
			]
		},
		bestFor: {
			fi: "Pareille jotka odottavat pohjoismaista luksusta ja monikielistä palvelua.",
			en: "Couples expecting Nordic luxury service in multiple languages."
		},
		publicWebsite: "https://nordicmice.com/lapland-wedding-planner-luxury/",
		ownProfilePage: false
	},
	{
		slug: "weddings-of-wonder",
		name: "Lapland Weddings · Weddings of Wonder",
		homeBase: {
			fi: "Lappi",
			en: "Lapland"
		},
		serviceArea: {
			fi: "Levi · Ylläs · Lainio",
			en: "Levi · Ylläs · Lainio"
		},
		priceTier: "€€€",
		languages: ["English"],
		description: {
			fi: "Yli 10 vuoden kokemus Lapin häistä. Valmiit paketit Levin jäälinnaan ja Lainion lumikylään. Pitkä kokemus näkyy varmoissa hääpaikkasuhteissa.",
			en: "Lapland wedding veterans with 10+ years of experience. Specialised packages for Levi Ice Castle and Lainio Snow Village. The safe choice with deep venue relationships."
		},
		strengths: {
			fi: [
				"10+ vuoden kokemus",
				"Levi Ice Castle ja Snow Village -paketit",
				"Vakiintunut maine"
			],
			en: [
				"10+ years of experience",
				"Levi Ice Castle and Snow Village packages",
				"Established reputation"
			]
		},
		bestFor: {
			fi: "Pareille jotka haluavat varman, kokeneen kumppanin Levin alueella.",
			en: "Couples wanting steady, proven venue relationships in the Levi area."
		},
		publicWebsite: "http://www.weddingsofwonder.com/",
		ownProfilePage: false
	},
	{
		slug: "adventure-wedding",
		name: "Adventure Wedding",
		homeBase: {
			fi: "Kansainvälinen · Lappi-paikalliset",
			en: "International · Lapland-local crew"
		},
		serviceArea: {
			fi: "Riisitunturi, Lappi",
			en: "Riisitunturi, Lapland"
		},
		priceFrom: "€4 600",
		priceTier: "€€€",
		languages: ["English"],
		description: {
			fi: "Seikkailuhenkisten parien suunnittelija. Riisitunturin paketti alkaa 4 600 €:sta — 8 tunnin vihkiminen tunturilla, korkeintaan 4 vierasta. Sekä valmiita paketteja että räätälöityjä.",
			en: "A planner for adventure-minded couples. The Riisitunturi fell-top package starts at €4 600 — an 8-hour ceremony, max 4 guests. Both ready-made and bespoke options."
		},
		strengths: {
			fi: [
				"Tunturit ja erämaa pääosassa",
				"Valmiit paketit nopeaan päätökseen",
				"Riisitunturin asiantuntemus"
			],
			en: [
				"Fells and wilderness front and centre",
				"Ready-made packages for quick decisions",
				"Riisitunturi expertise"
			]
		},
		bestFor: {
			fi: "Pareille jotka haluavat vihkimisen tunturilla — ei hotellisalissa.",
			en: "Couples who want to marry on a fell — not in a hotel ballroom."
		},
		publicWebsite: "https://www.adventure-wedding.com/en/destination/lapland",
		ownProfilePage: false
	}
];
//#endregion
//#region src/data/venues.ts
var venues = [
	{
		slug: "kakslauttanen",
		name: "Kakslauttanen Arctic Resort",
		locationSlug: "saariselka",
		region: {
			fi: "Saariselkä",
			en: "Saariselkä"
		},
		priceTier: "€€€€",
		capacity: {
			min: 2,
			max: 250
		},
		description: {
			fi: "Suomen kuuluisin lasi-iglu-resortti. Kakslauttasen 2:n hengen lasi-igluista vihkikappeliin ja 250 hengen Celebration Houseen — kaikki yhdellä alueella. Neljä erillistä häätilaa: Glass Teepee (lasinen kappeli), Snow/Ice Chapel (talvisin), Tieva Log Chapel (hirsinen) ja Celebration House (Suomen suurin hirsirakennus).",
			en: "Finland’s most famous glass igloo resort. From 2-person glass igloos to a wedding chapel and the 250-guest Celebration House — all on one property. Four separate venues: Glass Teepee (glass chapel), Snow/Ice Chapel (winter), Tieva Log Chapel (timber), and Celebration House (Finland’s largest log building)."
		},
		features: {
			fi: [
				"Aurora-hälytysjärjestelmä iglussa",
				"Suomen suurin hirsirakennus juhliin (250 hh)",
				"Oma Planetarium-ravintola lasiseinin",
				"Igloo Tower 30 m korkea tähystystorni",
				"Wedding Chamber 37 m² + sauna + amme"
			],
			en: [
				"Aurora alert system in the igloos",
				"Finland’s largest log building for celebrations (250 guests)",
				"Own Planetarium Restaurant with glass walls",
				"Igloo Tower — 30 m glass observation tower",
				"Wedding Chamber 37 m² with sauna and tub"
			]
		},
		weddingSpaces: {
			fi: [
				"Glass Teepee — lasinen kappeli erämaassa",
				"Snow & Ice Chapel — joka talvi uudelleen rakennettu",
				"Tieva Log Chapel — perinteinen hirsikappeli metsässä",
				"Celebration House — 250 hengen juhlasali"
			],
			en: [
				"Glass Teepee — glass chapel in wilderness",
				"Snow & Ice Chapel — rebuilt every winter",
				"Tieva Log Chapel — traditional log chapel in the forest",
				"Celebration House — 250-guest banquet hall"
			]
		},
		website: "https://www.kakslauttanen.fi/wedding-honeymoon",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=kakslauttanen+arctic+resort",
		image: "https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg",
		imageAlt: {
			fi: "Kakslauttasen lasi-iglu lumipeitteisellä metsäaukealla",
			en: "Glass igloo at Kakslauttanen on a snowy clearing"
		},
		weddingTypeSlugs: [
			"northern-lights",
			"snow-chapel",
			"glass-igloo",
			"midnight-sun",
			"elopement",
			"vow-renewal"
		],
		contact: {
			email: "hotel@kakslauttanen.fi",
			phone: "+358 16 667 100"
		},
		yearRound: true
	},
	{
		slug: "arctic-snowhotel",
		name: "Arctic SnowHotel & Glass Igloos",
		locationSlug: "rovaniemi",
		region: {
			fi: "Lehtojärvi · 35 km Rovaniemestä",
			en: "Lehtojärvi · 35 km from Rovaniemi"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 30
		},
		description: {
			fi: "Rovaniemen lähellä sijaitseva Snow Hotel rakennetaan joka 15. joulukuuta. Sisältää jääkappelin (kapasiteetti 30 hh), jääravintolan ja jääbaarin. Lasi-iglut ovat kesäkin auki — alkaen 314 €/yö 360°-lasikatolla ja Aurora-hälytyksellä.",
			en: "A Snow Hotel near Rovaniemi rebuilt every December 15. Includes an ice chapel (30-guest capacity), ice restaurant, and ice bar. Glass igloos open year-round — from €314/night with a 360° glass roof and Aurora alerts."
		},
		features: {
			fi: [
				"Ice Chapel 30 hh",
				"360°-lasi-iglut alk. 314 €/yö",
				"Aurora-hälytysjärjestelmä",
				"15 km Joulupukin pajakylästä"
			],
			en: [
				"Ice Chapel for 30 guests",
				"360° glass igloos from €314/night",
				"Aurora alert system",
				"15 km from Santa Claus Village"
			]
		},
		weddingSpaces: {
			fi: [
				"Ice Chapel (talvi)",
				"Glass Igloo Restaurant",
				"Saunamaailma"
			],
			en: [
				"Ice Chapel (winter)",
				"Glass Igloo Restaurant",
				"Sauna world"
			]
		},
		website: "https://arcticsnowhotel.fi/en/events/lapland-wedding/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=arctic+snowhotel",
		image: "https://arcticsnowhotel.fi/wp-content/uploads/2024/11/Winter-wedding-in-Lapland-Ice-chapel-Rovaniemi-Lapland-Arctic-Snowhotel-Glass-igloos-1600x960.jpg",
		imageAlt: {
			fi: "Arctic SnowHotelin jääkappeli",
			en: "Ice chapel at Arctic SnowHotel"
		},
		weddingTypeSlugs: [
			"snow-chapel",
			"glass-igloo",
			"northern-lights"
		],
		yearRound: true
	},
	{
		slug: "snow-village-lainio",
		name: "Lapland Hotels SnowVillage (Lainio)",
		locationSlug: "levi",
		region: {
			fi: "Lainio, Kittilä · Ylläksen ja Levin välissä",
			en: "Lainio, Kittilä · between Ylläs and Levi"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 50
		},
		description: {
			fi: "Maailmankuulu Snow Village rakennetaan vuosittain marraskuusta huhtikuuhun. Jääkappeli rakennetaan eri taiteellisella teemalla joka talvi — kävelyt jäästä veistetyn alttarin luo, ja morsian saapuu poro­saralla. Sopii sekä jää- että puukappelivihkimisille.",
			en: "World-famous Snow Village rebuilt annually November–April. The ice chapel is built with a new artistic theme each winter — walk down an ice-carved aisle, with the bride arriving by reindeer sleigh. Both ice and wooden chapel ceremonies available."
		},
		features: {
			fi: [
				"Eri taideteema joka talvi",
				"Jääkappeli + puukappeli",
				"Jäaravintola ja -baari",
				"Poro­sara-saapuminen"
			],
			en: [
				"New artistic theme each winter",
				"Ice chapel + wooden chapel",
				"Ice restaurant and bar",
				"Reindeer sleigh arrival"
			]
		},
		weddingSpaces: {
			fi: [
				"Ice Chapel (joulu–huhti)",
				"Wooden chapel ympäri vuoden",
				"Snow Suites yöpymiseen"
			],
			en: [
				"Ice Chapel (Dec–Apr)",
				"Wooden chapel year-round",
				"Snow Suites for overnight stay"
			]
		},
		website: "https://www.laplandhotels.com/en/hotels-and-destinations/yllas-levi/snowvillage",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=lapland+hotels+snowvillage",
		image: "https://yllas.fi/wp-content/uploads/2023/04/yllas-majoitus-lapland-hotels-snow-village-srgb-16x9-1-scaled.jpg",
		imageAlt: {
			fi: "Lainion lumikylän jääkappeli",
			en: "Ice chapel at Lainio Snow Village"
		},
		weddingTypeSlugs: ["snow-chapel"],
		yearRound: false
	},
	{
		slug: "northern-lights-ranch",
		name: "Northern Lights Ranch",
		locationSlug: "levi",
		region: {
			fi: "Köngäs · 15 min Levistä",
			en: "Köngäs · 15 min from Levi"
		},
		priceTier: "€€€€",
		capacity: {
			min: 2,
			max: 60
		},
		description: {
			fi: "Premium-luksusresortti lasiseiniä cabineja ja Snow Chapel kapasiteettiä 60 hengelle. Ainoa Lapin venue, jolla on eksklusiivinen yhteistyö brittiläisen Sun & Snow Weddings -planneeyhtiön kanssa. Sopii UK/US-pareille jotka odottavat top-tier-tasoa.",
			en: "Premium luxury resort with glass-walled cabins and a Snow Chapel for 60 guests. The only Lapland venue with an exclusive partnership with the British Sun & Snow Weddings planner. Best for UK/US couples expecting top-tier service."
		},
		features: {
			fi: [
				"Snow Chapel 60 hh — Lapin suurin lumikappeli",
				"Lasiseinät cabineissa — revontulet vuoteesta",
				"Jääluistelu ja lumikenkäily mukana",
				"Eksklusiivinen Sun & Snow -kumppanuus"
			],
			en: [
				"Snow Chapel for 60 — Lapland’s largest snow chapel",
				"Glass-walled cabins — see auroras from bed",
				"Ice skating and snowshoeing included",
				"Exclusive Sun & Snow partnership"
			]
		},
		weddingSpaces: {
			fi: [
				"Snow Chapel (joulu–maalis)",
				"Aurora Sky Cabins",
				"Päärakennuksen juhlasali"
			],
			en: [
				"Snow Chapel (Dec–Mar)",
				"Aurora Sky Cabins",
				"Main building banquet hall"
			]
		},
		website: "https://theranch.fi/about-us/private-events/",
		image: "https://theranch.fi/wp-content/uploads/2025/02/hero-private-event-theranch.webp",
		imageAlt: {
			fi: "Northern Lights Ranchin lasiseiniä cabin lumipeitteessä",
			en: "Glass-walled cabin at Northern Lights Ranch in snow"
		},
		weddingTypeSlugs: [
			"snow-chapel",
			"northern-lights",
			"glass-igloo"
		],
		yearRound: false
	},
	{
		slug: "levi-ice-castle",
		name: "Levi Ice Castle",
		locationSlug: "levi",
		region: {
			fi: "Levi · 7 km keskustasta",
			en: "Levi · 7 km from centre"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 50
		},
		description: {
			fi: "Levin oma jäälinna 7 km keskustasta. Jääkappeli, jääbaari ja jääsuiteja kaikki yhdellä alueella. Seinät ja istuimet kristallinkirkkaasta jäästä, alttari valaistu siniseen valoon.",
			en: "Levi’s own ice castle 7 km from the centre. Ice chapel, ice bar and ice suites all in one place. Walls and seats from crystal-clear ice, altar lit in blue."
		},
		features: {
			fi: [
				"Jääkappeli 50 hh",
				"Jääsuiteja yöpymiseen",
				"Jääbaari after-partylle"
			],
			en: [
				"Ice chapel for 50 guests",
				"Ice suites for overnight",
				"Ice bar for after-party"
			]
		},
		weddingSpaces: {
			fi: ["Ice Chapel (joulu–huhti)"],
			en: ["Ice Chapel (Dec–Apr)"]
		},
		website: "https://www.levi.fi/en/info/general/groups/weddings/",
		image: "https://images.ctfassets.net/sqofpczsslzu/6aAG9Ak9atTwFpPHKOc3ZR/d13f8677f3a06400155701305b9ad2a5/Kumputunturi_pinkki_taivas_Web__1_.jpg?w=1600&fl=progressive&q=80&fm=jpg",
		imageAlt: {
			fi: "Levin jäälinnan kappelin alttari",
			en: "Altar at Levi Ice Castle chapel"
		},
		weddingTypeSlugs: ["snow-chapel"],
		yearRound: false
	},
	{
		slug: "levin-iglut",
		name: "Levin Iglut · Golden Crown",
		locationSlug: "levi",
		region: {
			fi: "Levi · tunturin huipulla",
			en: "Levi · on top of the fell"
		},
		priceTier: "€€€€",
		capacity: {
			min: 2,
			max: 12
		},
		description: {
			fi: "Levin tunturin huipulla sijaitsevat lasi-iglut tarjoavat yhden Lapin parhaista revontuli-näkymistä. Superior 23 m², Suite 53 m², ja Northern Lights House (max 6 hh). Sopii honeymoon-iglu-yöpymiseen vihkimisen jälkeen.",
			en: "On top of Levi fell, the glass igloos offer one of Lapland’s best Northern Lights views. Superior 23 m², Suite 53 m², and Northern Lights House (max 6 guests). Perfect for the honeymoon igloo night after the ceremony."
		},
		features: {
			fi: [
				"Tunturin huipulla — paras revontuli-kulma",
				"53 m² Suite-iglu pari­käyttöön",
				"Pohjalämmitys + sähkölämmitetty katto"
			],
			en: [
				"On the fell summit — the best aurora angle",
				"53 m² Suite igloo for couples",
				"Underfloor heating + electrically heated roof"
			]
		},
		weddingSpaces: {
			fi: ["Honeymoon-iglu", "Northern Lights House (6 hh)"],
			en: ["Honeymoon igloo", "Northern Lights House (6 guests)"]
		},
		website: "https://leviniglut.fi/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=levin+iglut",
		image: "https://leviniglut.fi/wp-content/uploads/levin_iglut_og_main.jpg",
		imageAlt: {
			fi: "Levin Iglut tunturin huipulla revontulien alla",
			en: "Levin Iglut on the fell summit under aurora"
		},
		weddingTypeSlugs: ["glass-igloo", "northern-lights"],
		yearRound: true
	},
	{
		slug: "apukka-resort",
		name: "Apukka Resort",
		locationSlug: "rovaniemi",
		region: {
			fi: "Apukka · 15 min Joulupukin pajakylästä",
			en: "Apukka · 15 min from Santa Claus Village"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 80
		},
		description: {
			fi: "Apukka-järven rannalla sijaitseva resort, jossa Aurora Cabineja, kaksikerroksinen Kammi Glass Igloo Suite ja Lakeview-suiteja. Kaksi ravintolaa: Aitta + Kota. Sopii pareille jotka haluavat sekä joulupukin lähelle että luonnonrauhaa.",
			en: "A resort by Lake Apukka with Aurora Cabins, the two-storey Kammi Glass Igloo Suite, and Lakeview Suites. Two restaurants: Aitta + Kota. For couples who want both Santa proximity and wilderness peace."
		},
		features: {
			fi: [
				"Aurora Cabins (jopa 6 hh)",
				"Kammi-iglu kaksikerroksinen",
				"Aitta + Kota -ravintolat",
				"Husky-tila lähellä"
			],
			en: [
				"Aurora Cabins (up to 6)",
				"Two-storey Kammi igloo",
				"Aitta + Kota restaurants",
				"Husky farm nearby"
			]
		},
		weddingSpaces: {
			fi: [
				"Aitta-ravintola",
				"Kammi-igluterassi",
				"Apukka-järven jää (talvi)"
			],
			en: [
				"Aitta restaurant",
				"Kammi igloo terrace",
				"Lake Apukka ice (winter)"
			]
		},
		website: "https://apukkaresort.fi/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=apukka+resort",
		image: "https://www.visitrovaniemi.fi/wp-content/uploads/b3d5b020-7fb8-11ee-9fca-6fdb01d69922.jpeg",
		imageAlt: {
			fi: "Apukka Resortin lasi-iglu järvenrannalla",
			en: "Glass igloo at Apukka Resort by the lake"
		},
		weddingTypeSlugs: [
			"northern-lights",
			"glass-igloo",
			"midnight-sun",
			"elopement",
			"vow-renewal"
		],
		yearRound: true
	},
	{
		slug: "arctic-treehouse",
		name: "Arctic TreeHouse Hotel",
		locationSlug: "rovaniemi",
		region: {
			fi: "SantaPark · 2 km lentokentältä",
			en: "SantaPark · 2 km from airport"
		},
		priceTier: "€€€€",
		capacity: {
			min: 2,
			max: 40
		},
		description: {
			fi: "Modernit puumajat lasiseinin ja Arctic-tyylillä. Sijainti on Lapin paras logistiikan kannalta — 2 km lentokentältä. Sopii nopeisiin, korkealuokkaisiin elopement- ja häämatkoihin.",
			en: "Modern tree-top cabins with glass walls and Arctic styling. Best logistics location in Lapland — 2 km from the airport. Best for quick, high-end elopements and wedding trips."
		},
		features: {
			fi: [
				"2 km Rovaniemen lentokentältä",
				"Arctic Premium -ravintola",
				"Lasiseinät joka cabinissa",
				"Talvella revontulet ja kesällä keskiyön aurinko"
			],
			en: [
				"2 km from Rovaniemi airport",
				"Arctic Premium restaurant",
				"Glass walls in every cabin",
				"Auroras in winter, midnight sun in summer"
			]
		},
		weddingSpaces: {
			fi: ["Ravintola Rakas", "TreeHouse-cabinit"],
			en: ["Restaurant Rakas", "TreeHouse cabins"]
		},
		website: "https://arctictreehousehotel.com/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=arctic+treehouse+hotel",
		image: "https://arctictreehousehotel.com/wp-content/uploads/2025/05/Arctic-treehouse-hotel-summer-august-1600x960.jpg",
		imageAlt: {
			fi: "Arctic TreeHouse -hotellin puumajat lumessa",
			en: "Arctic TreeHouse cabins in snow"
		},
		weddingTypeSlugs: [
			"elopement",
			"glass-igloo",
			"midnight-sun"
		],
		yearRound: true
	},
	{
		slug: "wilderness-hotel-muotka",
		name: "Wilderness Hotel Muotka",
		locationSlug: "saariselka",
		region: {
			fi: "Muotka · UKK-puiston laidalla",
			en: "Muotka · edge of UKK National Park"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 30
		},
		description: {
			fi: "Urho Kekkosen kansallispuiston laidalla, ilman valosaastetta — yksi Lapin parhaista revontuli-paikoista. Aurora Cabins ja Kammi-cabin sopivat hääyöksi. Pieni mutta laadukas venue intiimeille häille.",
			en: "On the edge of Urho Kekkonen National Park with zero light pollution — one of Lapland’s best aurora locations. Aurora Cabins and Kammi cabin perfect for the wedding night. A small but high-quality venue for intimate weddings."
		},
		features: {
			fi: [
				"Ei valosaastetta — paras revontulinäkymä",
				"Aurora Cabins ja Kammi",
				"Erityistilaisuuspaketteja häille"
			],
			en: [
				"Zero light pollution — best aurora view",
				"Aurora Cabins and Kammi",
				"Special occasion wedding packages"
			]
		},
		weddingSpaces: {
			fi: ["Aitta-ravintola", "Erämaalava"],
			en: ["Aitta restaurant", "Wilderness deck"]
		},
		website: "https://wildernesshotels.fi/wilderness-hotel-muotka",
		image: "https://r.profitroom.pl/wildernesshotelmuotoka1/images/202104281553440.Muotka_birdview.jpg",
		imageAlt: {
			fi: "Wilderness Hotel Muotka erämaassa",
			en: "Wilderness Hotel Muotka in the wilderness"
		},
		weddingTypeSlugs: [
			"northern-lights",
			"elopement",
			"vow-renewal"
		],
		contact: { email: "sales@wildernesshotels.fi" },
		yearRound: true
	},
	{
		slug: "wilderness-hotel-inari",
		name: "Wilderness Hotel Inari",
		locationSlug: "saariselka",
		region: {
			fi: "Inarinjärven rannalla",
			en: "On the shore of Lake Inari"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 40
		},
		description: {
			fi: "Inarinjärven rannalla, saamelaiskulttuurin sydämessä. Rannassa olevat aurora-cabinit antavat suoran näkymän järven yli horisontille. Ainutlaatuinen lokaatio \"destination wedding\"-pareille.",
			en: "On the shore of Lake Inari, in the heart of Sámi culture. Aurora cabins on the shore offer a direct view across the lake to the horizon. A truly unique location for destination wedding couples."
		},
		features: {
			fi: [
				"Inarinjärven rannassa",
				"Saamelaiskulttuuri lähellä",
				"Aurora Cabins"
			],
			en: [
				"On Lake Inari shore",
				"Sámi culture nearby",
				"Aurora Cabins"
			]
		},
		weddingSpaces: {
			fi: ["Päätalon ravintola", "Lavoja järvenrannassa"],
			en: ["Main building restaurant", "Lakeside platforms"]
		},
		website: "https://wildernesshotels.fi/wilderness-hotel-inari",
		image: "https://r.profitroom.pl/wildernesshotelinari/images/202412171316320.Inari_drone4_2_.jpg",
		imageAlt: {
			fi: "Wilderness Hotel Inari Inarinjärven rannalla",
			en: "Wilderness Hotel Inari on the lake"
		},
		weddingTypeSlugs: [
			"northern-lights",
			"midnight-sun",
			"elopement"
		],
		yearRound: true
	},
	{
		slug: "wilderness-hotel-juutua",
		name: "Wilderness Hotel Juutua",
		locationSlug: "saariselka",
		region: {
			fi: "Inari · keskustassa",
			en: "Inari · in the centre"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 60
		},
		description: {
			fi: "Avattu 2022 — uusin Wilderness Hotels -kohde. Aanaar-ravintola Inarin keskustassa. Sopii pareille jotka haluavat saamelaiskulttuurin lähelle ja kompaktin sijainnin.",
			en: "Opened 2022 — the newest Wilderness Hotels venue. Aanaar Restaurant in central Inari. For couples wanting Sámi culture nearby and a compact location."
		},
		features: {
			fi: [
				"Uusi 2022",
				"Aanaar-ravintola Inarin keskustassa",
				"Käveletellen Inarinjärvelle"
			],
			en: [
				"New in 2022",
				"Aanaar Restaurant in central Inari",
				"Walking distance to Lake Inari"
			]
		},
		weddingSpaces: {
			fi: ["Aanaar-ravintola", "Hotellin juhlasali"],
			en: ["Aanaar Restaurant", "Hotel banquet hall"]
		},
		website: "https://wildernesshotels.fi/wilderness-hotel-juutua",
		image: "https://r.profitroom.pl/wildernesshoteljuutua/images/202412171318090.wilderness_hotel_juutua_winter_cropped.jpg",
		imageAlt: {
			fi: "Wilderness Hotel Juutua Inarin keskustassa",
			en: "Wilderness Hotel Juutua in central Inari"
		},
		weddingTypeSlugs: [
			"midnight-sun",
			"northern-lights",
			"elopement"
		],
		yearRound: true
	},
	{
		slug: "northern-lights-village-saariselka",
		name: "Northern Lights Village Saariselkä",
		locationSlug: "saariselka",
		region: {
			fi: "Saariselkä keskustassa",
			en: "Central Saariselkä"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 80
		},
		description: {
			fi: "Avattu 2016. 80 Aurora Cabineja ja 20 Polar Sky Suiteja. Lasikatto kaikissa, ja keskeinen sijainti Saariselän palveluille.",
			en: "Opened 2016. 80 Aurora Cabins and 20 Polar Sky Suites. Glass roofs throughout, with a central location for Saariselkä’s services."
		},
		features: {
			fi: ["Aurora Cabins lasikatolla", "20 Polar Sky Suiteja"],
			en: ["Aurora Cabins with glass roof", "20 Polar Sky Suites"]
		},
		weddingSpaces: {
			fi: ["Päätalon ravintola", "Aurora-cabinit"],
			en: ["Main restaurant", "Aurora Cabins"]
		},
		website: "https://saariselka.northernlightsvillage.com/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=northern+lights+village+saariselka",
		image: "https://r.profitroom.pl/northernlightsvillagesaariselka/images/202008261835140.02.27_Robert_3_of_8_.jpg",
		imageAlt: {
			fi: "Northern Lights Village Saariselkä",
			en: "Northern Lights Village Saariselkä"
		},
		weddingTypeSlugs: ["northern-lights", "glass-igloo"],
		yearRound: true
	},
	{
		slug: "northern-lights-village-levi",
		name: "Northern Lights Village Levi",
		locationSlug: "levi",
		region: {
			fi: "Sirkka, Levi",
			en: "Sirkka, Levi"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 60
		},
		description: {
			fi: "Avattu 2019, Saariselän sisarkohde Levillä. Sopii pareille jotka haluavat NLV-tyylin Levin palveluiden lähelle.",
			en: "Opened 2019, the sister site of Saariselkä in Levi. For couples wanting the NLV style near Levi’s services."
		},
		features: {
			fi: ["Aurora Cabins", "Levi 5 min"],
			en: ["Aurora Cabins", "5 min to Levi"]
		},
		weddingSpaces: {
			fi: ["Pääravintola", "Aurora Cabinit"],
			en: ["Main restaurant", "Aurora Cabins"]
		},
		website: "https://levi.northernlightsvillage.com/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=northern+lights+village+saariselka",
		image: "https://r.profitroom.pl/northernlightsvillagelevi1/images/38efa85b-6077-43f8-9036-08fd50b61868.jpg",
		imageAlt: {
			fi: "Northern Lights Village Levi",
			en: "Northern Lights Village Levi"
		},
		weddingTypeSlugs: ["northern-lights", "glass-igloo"],
		yearRound: true
	},
	{
		slug: "hotelli-hullu-poro",
		name: "Hotelli Hullu Poro",
		locationSlug: "levi",
		region: {
			fi: "Levi keskustassa",
			en: "Central Levi"
		},
		priceTier: "€€",
		capacity: {
			min: 10,
			max: 200
		},
		description: {
			fi: "Levin keskeinen hotelli- ja ravintolakompleksi. Kaksi juhlasalia (200 ja 60 hh) sopii suurempiin häihin. Hyvä valinta jos vieraita on paljon ja haluatte ostoksia + hiihtokeskuksen lähelle.",
			en: "A central hotel and restaurant complex in Levi. Two banquet halls (200 and 60 guests) for larger weddings. A good choice for big guest lists wanting shopping and ski resort access."
		},
		features: {
			fi: [
				"200 hh juhlasali",
				"4 ravintolaa",
				"Levin keskustassa"
			],
			en: [
				"200-guest banquet hall",
				"4 restaurants",
				"Central Levi"
			]
		},
		weddingSpaces: {
			fi: ["Hullu Poro -juhlasali", "Saaga-sali (60 hh)"],
			en: ["Hullu Poro banquet hall", "Saaga hall (60 guests)"]
		},
		website: "https://www.hulluporo.fi/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=hotel+hullu+poro",
		image: "https://www.hulluporo.fi/wp-content/uploads/2014/10/haakuvaus-areena-1024x683.jpg",
		imageAlt: {
			fi: "Hotelli Hullu Poro Levillä",
			en: "Hotel Hullu Poro in Levi"
		},
		weddingTypeSlugs: ["midnight-sun"],
		yearRound: true
	},
	{
		slug: "levi-panorama",
		name: "Hotel Levi Panorama",
		locationSlug: "levi",
		region: {
			fi: "Levin tunturin huipulla",
			en: "On Levi fell summit"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 100
		},
		description: {
			fi: "Lapland Hotels -ketjun lippulaiva Levillä, tunturin huipulla. Panoraamaikkunat juhlasalissa antavat 360°-näkymän Levitunturille ja Lainion Snow Villageen. Saavutetaan kabiinihissillä.",
			en: "The Lapland Hotels flagship in Levi, on top of the fell. Panorama windows in the banquet hall give a 360° view of Levi fell and Lainio Snow Village. Reached by gondola."
		},
		features: {
			fi: [
				"Tunturin huipulla",
				"Saavutus kabiinihissillä",
				"360°-näkymä juhlasalista"
			],
			en: [
				"On the fell summit",
				"Gondola access",
				"360° banquet hall view"
			]
		},
		weddingSpaces: {
			fi: ["Panorama-juhlasali", "Hotellin sviitit"],
			en: ["Panorama banquet hall", "Hotel suites"]
		},
		website: "https://www.laplandhotels.com/en/hotels-and-destinations/yllas-levi/levi-panorama",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=lapland+hotels+levi+panorama",
		image: "https://images.ctfassets.net/sqofpczsslzu/30JSNJpSh3YKSVRlcSY5n1/6c5b5617bcf5e5d611ae77b9ab1678a0/Levi2017_July_H2A5343_FullRes.jpg",
		imageAlt: {
			fi: "Hotel Levi Panorama tunturin huipulla",
			en: "Hotel Levi Panorama on the fell summit"
		},
		weddingTypeSlugs: ["northern-lights", "midnight-sun"],
		yearRound: true
	},
	{
		slug: "lapland-hotels-saaga",
		name: "Lapland Hotels Saaga",
		locationSlug: "yllas",
		region: {
			fi: "Ylläsjärvi · Pallas-Yllästunturin kpalla",
			en: "Ylläsjärvi · at Pallas-Yllästunturi NP"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 50
		},
		description: {
			fi: "Yli­voimaisen TripAdvisor-arvostelujen suosima häähotelli Ylläksellä. Spa, kolme ravintolaa, allas ja hot tubit — sopii pieniin perhejuhliin (TripAdvisor: 17 hengen seurue piti Saagassa häät onnistuneesti).",
			en: "The TripAdvisor-favourite wedding hotel in Ylläs. Spa, three restaurants, pool and hot tubs — perfect for small family weddings (TripAdvisor: a 17-guest party held a successful wedding here)."
		},
		features: {
			fi: [
				"Spa + 3 ravintolaa",
				"Allas + hot tubit",
				"Ylläksen rauhassa"
			],
			en: [
				"Spa + 3 restaurants",
				"Pool + hot tubs",
				"Ylläs tranquility"
			]
		},
		weddingSpaces: {
			fi: [
				"Pääravintola",
				"Hot tub -terassi",
				"Hotellin sauna"
			],
			en: [
				"Main restaurant",
				"Hot tub deck",
				"Hotel sauna"
			]
		},
		website: "https://www.laplandhotels.com/en/hotels-and-destinations/yllas/lapland-hotels-saaga",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=lapland+hotels+saaga",
		image: "https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg",
		imageAlt: {
			fi: "Lapland Hotels Saaga Ylläsjärvellä",
			en: "Lapland Hotels Saaga at Ylläsjärvi"
		},
		weddingTypeSlugs: ["midnight-sun", "vow-renewal"],
		yearRound: true
	},
	{
		slug: "tundrea-kilpisjarvi",
		name: "Tundrea Kilpisjärvi",
		locationSlug: "kilpisjarvi",
		region: {
			fi: "Kilpisjärvi",
			en: "Kilpisjärvi"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 30
		},
		description: {
			fi: "Suomen pohjoisin lasi-iglu-resortti tunturien ympäröimällä järvenrannalla. Kilpisjärven sijainti on Lapin paras revontuli-näkymä — 480 m korkeudella merenpinnasta. Sopii adventure-elopement-pareille.",
			en: "Finland’s northernmost glass igloo resort, on a lakeshore surrounded by fells. Kilpisjärvi’s location offers Lapland’s best aurora view — 480 m above sea level. Best for adventure elopement couples."
		},
		features: {
			fi: [
				"Suomen pohjoisin lasi-iglu",
				"480 m mph",
				"Kolmen valtakunnan rajapyykki lähellä"
			],
			en: [
				"Finland’s northernmost glass igloo",
				"480 m above sea level",
				"Three-country border nearby"
			]
		},
		weddingSpaces: {
			fi: ["Lasi-iglut", "Tunturikeitas"],
			en: ["Glass igloos", "Fell oasis"]
		},
		website: "https://tundrea.com/en",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=tundrea",
		image: "https://tundrea.com/wp-content/uploads/2021/09/IMG_6429-HDR-2-scaled-e1660643559657.jpg",
		imageAlt: {
			fi: "Tundrea Kilpisjärvi tunturien ympäröimänä",
			en: "Tundrea Kilpisjärvi surrounded by fells"
		},
		weddingTypeSlugs: [
			"glass-igloo",
			"northern-lights",
			"elopement"
		],
		yearRound: true
	},
	{
		slug: "hotel-aurora-pyha",
		name: "Hotel Aurora Pyhä",
		locationSlug: "pyha-luosto",
		region: {
			fi: "Pyhä-Luosto kp",
			en: "Pyhä-Luosto NP"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 30
		},
		description: {
			fi: "Maailman pohjoisin tähtibongauspaikka. Sertifioitu Pohjoisen tähtitaivaan UNESCO-saarealueena. Ainutlaatuinen tähtihäät-sijainti.",
			en: "The world’s northernmost stargazing site. Certified UNESCO Starlight Reserve. A unique star-themed wedding location."
		},
		features: {
			fi: ["UNESCO-tähtitaivassertifikaatti", "Pyhä-Luosto kpn keskellä"],
			en: ["UNESCO Starlight certification", "In Pyhä-Luosto NP"]
		},
		weddingSpaces: {
			fi: ["Hotellin pääravintola", "Tähtitaivasterassi"],
			en: ["Main restaurant", "Stargazing deck"]
		},
		website: "https://www.laplandhotels.com/en/hotels-and-destinations/pyha-luosto/lapland-hotels-pyha",
		image: "https://visitpyha.fi/wp-content/uploads/2025/04/20240930_033916.webp",
		imageAlt: {
			fi: "Hotel Aurora Pyhän tähtitaivas",
			en: "Starlit sky at Hotel Aurora Pyhä"
		},
		weddingTypeSlugs: ["northern-lights", "elopement"],
		yearRound: true
	},
	{
		slug: "lapland-hotels-pyha",
		name: "Lapland Hotels Pyhä",
		locationSlug: "pyha-luosto",
		region: {
			fi: "Pyhä, kpalueen sisällä",
			en: "Pyhä, inside the NP"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 60
		},
		description: {
			fi: "Pyhän kp:n sisällä sijaitseva luksushotelli. Tarjoaa amethystikaivosvihkimisen — pari voi varata maan suurimman amethystesiintymän yksityiskäyttöön. Ainutlaatuinen, Lapin omaperäisin häätila.",
			en: "A luxury hotel inside Pyhä NP. Offers an amethyst mine wedding — the couple can reserve the country’s largest amethyst deposit privately. Truly unique, Lapland’s most original wedding venue."
		},
		features: {
			fi: [
				"Amethystikaivos-vihkiminen",
				"Sodankylan amethystesiintymä",
				"kp-suoja-alue"
			],
			en: [
				"Amethyst mine ceremony",
				"Sodankylä amethyst deposit",
				"Inside the NP"
			]
		},
		weddingSpaces: {
			fi: ["Amethystikaivos", "Hotellin Lumen-ravintola"],
			en: ["Amethyst mine", "Hotel Lumen restaurant"]
		},
		website: "https://www.laplandhotels.com/en/hotels-and-destinations/pyha-luosto/lapland-hotels-pyha",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=lapland+hotels+pyha",
		image: "https://visitpyha.fi/wp-content/uploads/2025/09/20250808_181448-1-scaled.jpg",
		imageAlt: {
			fi: "Lapland Hotels Pyhän amethystikaivos",
			en: "Amethyst mine at Lapland Hotels Pyhä"
		},
		weddingTypeSlugs: ["elopement", "vow-renewal"],
		yearRound: true
	},
	{
		slug: "santas-hotel-santamus",
		name: "Santa's Hotel Santamus",
		locationSlug: "rovaniemi",
		region: {
			fi: "Joulupukin pajakylä",
			en: "Santa Claus Village"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 80
		},
		description: {
			fi: "Joulupukin pajakylän ainut häihin suunniteltu hotelli. Sijainti tukee pareja jotka haluavat joulupukin paikalle. Häämatkaila-pakettit yhdistyvät reindeer-ride ja husky-kokemuksiin.",
			en: "The only Santa Claus Village hotel designed for weddings. Location supports couples wanting Santa Claus to attend. Wedding packages combine reindeer rides and husky experiences."
		},
		features: {
			fi: [
				"Joulupukin pajakylässä",
				"Häämatkapaketti",
				"Reindeer + husky"
			],
			en: [
				"In Santa Claus Village",
				"Honeymoon package",
				"Reindeer + husky"
			]
		},
		weddingSpaces: {
			fi: ["Hotellin juhlatila", "Pajakylän puutalo"],
			en: ["Hotel banquet space", "Village wooden lodge"]
		},
		website: "https://santashotels.fi/",
		bookingUrl: "https://www.hotels.com/Hotel-Search?destination=santas+hotel+santamus",
		image: "https://santashotels.fi/wp-content/uploads/2019/09/santas-meta.png",
		imageAlt: {
			fi: "Santa's Hotel Santamus joulupukin pajakylässä",
			en: "Santa's Hotel Santamus in Santa Claus Village"
		},
		weddingTypeSlugs: ["elopement", "vow-renewal"],
		yearRound: true
	},
	{
		slug: "nova-skyland",
		name: "Nova Skyland Hotel",
		locationSlug: "rovaniemi",
		region: {
			fi: "Joulupukin pajakylä",
			en: "Santa Claus Village"
		},
		priceTier: "€€€",
		capacity: {
			min: 2,
			max: 30
		},
		description: {
			fi: "Joulupukin pajakylän kompakti, moderni boutique-hotelli. Sopii pienille hääseurueille jotka haluavat sijainnin lähelle ja modernin sisustuksen.",
			en: "A compact, modern boutique hotel in Santa Claus Village. Best for small wedding parties wanting central location and contemporary design."
		},
		features: {
			fi: ["Joulupukin pajakylässä", "Moderni sisustus"],
			en: ["In Santa Claus Village", "Contemporary design"]
		},
		weddingSpaces: {
			fi: ["Aulan ravintola", "Sviittien terassi"],
			en: ["Lobby restaurant", "Suite terraces"]
		},
		website: "https://novaskyland.com/",
		image: "https://r.profitroom.pl/novaskyland/images/202201261054590.NovaSkyland_0005_ilmakuva.jpg",
		imageAlt: {
			fi: "Nova Skyland Hotel Rovaniemellä",
			en: "Nova Skyland Hotel in Rovaniemi"
		},
		weddingTypeSlugs: ["elopement"],
		yearRound: true
	}
];
var getVenueBySlug = (slug) => venues.find((v) => v.slug === slug);
//#endregion
//#region src/pages/Home.tsx
function Home() {
	const { lang, tr } = useLang();
	const seoTitle = lang === "fi" ? "Häät Lapissa — kaikki yhdellä sivulla | LaplandWeddings" : "Lapland Weddings — everything in one place | LaplandWeddings";
	const seoDesc = lang === "fi" ? "Lapin kattavin häämatkasivu. Yli 20 hääpaikkaa, 7 hääsuunnittelijaa, DVV-paperit, hinta-arviot. Pyydä 3 räätälöityä tarjousta yhdellä lomakkeella." : "The most complete Lapland wedding planning site. 20+ venues, 7 planners, DVV paperwork, real prices. Get 3 personalised quotes with one form.";
	const featuredVenues = venues.slice(0, 6);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: seoTitle,
			description: seoDesc,
			path: "/",
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "LaplandWeddings",
				url: "https://laplandweddings.online",
				description: seoDesc,
				areaServed: "Finnish Lapland",
				parentOrganization: {
					"@type": "Organization",
					name: "LaplandVibes",
					url: "https://laplandvibes.com"
				}
			}
		}),
		/* @__PURE__ */ jsxs(PageHero, {
			title: tr.home.heroTitle,
			subtitle: tr.home.heroSubtitle,
			image: "https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg",
			imageAlt: lang === "fi" ? "Hääpari Kakslauttasella revontulien alla — kuva: Maria Hedengren Photography" : "Wedding couple at Kakslauttanen under the Northern Lights — photo: Maria Hedengren Photography",
			children: [/* @__PURE__ */ jsx(L, {
				to: "/contact",
				className: "inline-flex items-center px-7 py-3.5 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-xl shadow-rose/30 transition-colors",
				children: tr.cta.getThreeQuotes
			}), /* @__PURE__ */ jsx(L, {
				to: "/venues",
				className: "inline-flex items-center px-7 py-3.5 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-colors",
				children: tr.cta.seeVenues
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			title: tr.home.whyTitle,
			children: [/* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden max-w-5xl mx-auto",
				children: [
					{
						stat: "300+",
						label: lang === "fi" ? "häät vuodessa" : "weddings a year",
						body: lang === "fi" ? "Lappi on vakiintunut Pohjois-Euroopan suosituin destination wedding -kohde. Sesonki jouluk.–maalisk." : "Lapland is the most popular destination wedding region in Northern Europe. Season runs December–March."
					},
					{
						stat: lang === "fi" ? "€1 600 →" : "from €1 600",
						label: lang === "fi" ? "pienin paketti" : "smallest package",
						body: lang === "fi" ? "Kahdestaan vihille 1 600 €:sta, premium-juhlat 50 000 €:on. Luksus jopa 100 000 €." : "Elope from €1 600, premium celebrations to €50 000, luxury up to €100 000+."
					},
					{
						stat: lang === "fi" ? "3–5 viikkoa" : "3–5 weeks",
						label: lang === "fi" ? "paperityö valmista" : "paperwork done",
						body: lang === "fi" ? "DVV hoitaa avioliittoluvan ulkomaalaisille pareille 3–5 viikossa. Maksuton." : "The DVV processes the marriage licence for foreign couples in 3–5 weeks. Free of charge."
					}
				].map((stat) => /* @__PURE__ */ jsxs("div", {
					className: "bg-night-light p-7 sm:p-9 flex flex-col",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-heading text-4xl sm:text-5xl text-rose tracking-wide mb-1",
							children: stat.stat
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-[0.25em] text-aurora-pink font-semibold mb-4",
							children: stat.label
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-300 leading-relaxed",
							children: stat.body
						})
					]
				}, stat.label))
			}), /* @__PURE__ */ jsx("p", {
				className: "text-center text-gray-400 mt-10 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg",
				children: tr.home.whyP
			})]
		}),
		/* @__PURE__ */ jsx(Section, {
			eyebrow: lang === "fi" ? "Häätyypit" : "Wedding types",
			title: tr.home.typesTitle,
			className: "bg-night-light/30",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5",
				children: weddingTypes.map((wt) => /* @__PURE__ */ jsxs(L, {
					to: `/wedding-types/${wt.slug}`,
					className: "group relative aspect-[3/4] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-night-light border border-white/5 hover:border-rose/40 transition-all",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: wt.heroImage,
							alt: wt.name[lang],
							loading: "lazy",
							className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent" }),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute inset-x-0 bottom-0 p-3.5 sm:p-6",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-heading text-base sm:text-3xl text-white tracking-wide mb-1 sm:mb-1.5 leading-tight",
									children: wt.name[lang]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "hidden sm:block text-sm text-gray-200/90 mb-3 line-clamp-2",
									children: wt.tagline[lang]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between text-[10px] sm:text-xs gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-gold font-semibold whitespace-nowrap",
										children: wt.priceRange
									}), /* @__PURE__ */ jsx("span", {
										className: "hidden sm:inline text-gray-300",
										children: wt.capacity
									})]
								})
							]
						})
					]
				}, wt.slug))
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			eyebrow: lang === "fi" ? "Paikkakunnat" : "Regions",
			title: tr.home.locationsTitle,
			children: /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: locations.map((loc) => /* @__PURE__ */ jsxs(L, {
					to: `/locations/${loc.slug}`,
					className: "group relative overflow-hidden rounded-2xl bg-night-light border border-white/5 hover:border-aurora-pink/40 transition-all",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: [/* @__PURE__ */ jsx("img", {
							src: loc.heroImage,
							alt: loc.heroAlt[lang],
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
							loading: "lazy"
						}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "absolute bottom-0 left-0 right-0 p-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
							children: loc.region[lang]
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-heading text-2xl text-white tracking-wide",
							children: loc.name[lang]
						})]
					})]
				}, loc.slug))
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			eyebrow: lang === "fi" ? "Vahvistettuja hääpaikkoja" : "Verified venues",
			title: lang === "fi" ? "Lapin kuuluisimmat hääpaikat" : "Lapland’s most famous wedding venues",
			className: "bg-night-light/30",
			children: [/* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: featuredVenues.map((v) => /* @__PURE__ */ jsxs(L, {
					to: `/venues/${v.slug}`,
					className: "group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ jsx("img", {
							src: v.image,
							alt: v.imageAlt[lang],
							loading: "lazy",
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
								children: v.region[lang]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-lg text-white mb-2 tracking-wide group-hover:text-rose transition-colors",
								children: v.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400 line-clamp-3",
								children: v.description[lang]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 text-xs text-gray-500 flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									v.capacity.min,
									"–",
									v.capacity.max,
									" ",
									lang === "fi" ? "vierasta" : "guests"
								] }), /* @__PURE__ */ jsx("span", {
									className: "text-gold",
									children: v.priceTier
								})]
							})
						]
					})]
				}, v.slug))
			}), /* @__PURE__ */ jsx("div", {
				className: "text-center mt-10",
				children: /* @__PURE__ */ jsxs(L, {
					to: "/venues",
					className: "inline-flex items-center px-6 py-3 border border-white/20 hover:bg-white/5 text-white rounded-full transition-colors",
					children: [tr.cta.seeAllVenues, " →"]
				})
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			eyebrow: lang === "fi" ? "Hääsuunnittelijat" : "Wedding planners",
			title: tr.home.plannersTitle,
			subtitle: tr.home.plannersIntro,
			children: [/* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: planners.slice(0, 6).map((p) => /* @__PURE__ */ jsxs("div", {
					className: "bg-night-light border border-white/5 rounded-2xl p-5",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
							children: p.homeBase[lang]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-lg text-white mb-2 tracking-wide",
							children: p.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400 line-clamp-3 mb-3",
							children: p.description[lang]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-gold",
								children: p.priceTier
							}), /* @__PURE__ */ jsx("span", {
								className: "text-gray-500",
								children: p.languages.map((l) => localiseLanguage(l, lang)).join(" · ")
							})]
						})
					]
				}, p.slug))
			}), /* @__PURE__ */ jsx("div", {
				className: "text-center mt-10",
				children: /* @__PURE__ */ jsxs(L, {
					to: "/planners",
					className: "inline-flex items-center px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-lg shadow-rose/30",
					children: [tr.planners.threeQuotesTitle, " →"]
				})
			})]
		}),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/20",
			children: /* @__PURE__ */ jsx(NewsletterSignup, {})
		})
	] });
}
//#endregion
//#region src/pages/Locations.tsx
function Locations() {
	const { lang, tr } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Häät Lapin paikkakunnilla — Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings" : "Lapland Wedding Regions — Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings",
			description: lang === "fi" ? "Kuusi Lapin häämatkakohdetta — Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi. Vertaile sesonkeja, lentoyhteyksiä ja venueita." : "Six Lapland wedding regions — Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi. Compare seasons, flights, and venues.",
			path: "/locations",
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "ItemList",
				itemListElement: locations.map((l, i) => ({
					"@type": "ListItem",
					position: i + 1,
					url: `https://laplandweddings.online/locations/${l.slug}`,
					name: l.name[lang]
				}))
			}
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Paikkakunnat" : "Regions",
			title: tr.locations.indexTitle,
			subtitle: tr.locations.indexIntro,
			image: "https://www.visitrovaniemi.fi/wp-content/uploads/b3d5b020-7fb8-11ee-9fca-6fdb01d69922.jpeg",
			imageAlt: lang === "fi" ? "Lapin tunturit ilta-auringossa" : "Lapland fells in evening sun"
		}),
		/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
			children: locations.map((loc) => /* @__PURE__ */ jsxs(L, {
				to: `/locations/${loc.slug}`,
				className: "group bg-night-light border border-white/5 hover:border-aurora-pink/40 rounded-2xl overflow-hidden transition-all",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[16/10] overflow-hidden",
					children: /* @__PURE__ */ jsx("img", {
						src: loc.heroImage,
						alt: loc.heroAlt[lang],
						loading: "lazy",
						className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
							children: loc.region[lang]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-2xl text-white mb-2 tracking-wide",
							children: loc.name[lang]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400 leading-relaxed line-clamp-3 mb-3",
							children: loc.intro[lang]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "text-xs text-gray-500",
							children: [
								"✈ ",
								loc.airport,
								" · ",
								loc.airportDistanceKm,
								" km"
							]
						})
					]
				})]
			}, loc.slug))
		}) })
	] });
}
//#endregion
//#region src/components/LeadForm.tsx
var LEAD_INBOX = "info@laplandvibes.com";
var ENDPOINT = "/api/lead";
var MAX_FILES = 5;
var MAX_IMAGE_SIZE = 5 * 1024 * 1024;
var MAX_VIDEO_SIZE = 25 * 1024 * 1024;
var MAX_TOTAL_SIZE = 38 * 1024 * 1024;
var ALLOWED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/heic",
	"image/heif",
	"video/mp4",
	"video/quicktime",
	"video/webm"
];
function formatBytes(bytes) {
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} kB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function LeadForm({ presetWeddingType, presetLocation, presetVenue }) {
	const { lang, tr } = useLang();
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);
	const [files, setFiles] = useState([]);
	const [dragOver, setDragOver] = useState(false);
	const fileInputRef = useRef(null);
	function addFiles(newFiles) {
		setError(null);
		const incoming = Array.from(newFiles);
		if (files.length + incoming.length > MAX_FILES) {
			setError(tr.form.attachmentsTooMany);
			return;
		}
		const additions = [];
		let totalSize = files.reduce((acc, f) => acc + f.file.size, 0);
		for (const file of incoming) {
			if (!ALLOWED_TYPES.includes(file.type)) {
				setError(tr.form.attachmentsBadType);
				return;
			}
			const isVideo = file.type.startsWith("video/");
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
			additions.push({
				file,
				url: URL.createObjectURL(file),
				isVideo
			});
		}
		setFiles((prev) => [...prev, ...additions]);
	}
	function removeFile(idx) {
		setFiles((prev) => {
			const target = prev[idx];
			if (target) URL.revokeObjectURL(target.url);
			return prev.filter((_, i) => i !== idx);
		});
	}
	function onFileInputChange(e) {
		if (e.target.files) addFiles(e.target.files);
		e.target.value = "";
	}
	function onDrop(e) {
		e.preventDefault();
		setDragOver(false);
		if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		setError(null);
		const form = e.currentTarget;
		const data = new FormData(form);
		data.delete("files");
		for (const f of files) data.append("files", f.file, f.file.name);
		data.set("lang", lang);
		try {
			const res = await fetch(ENDPOINT, {
				method: "POST",
				body: data
			});
			if (!res.ok) throw new Error("failed");
			const json = await res.json();
			if (!json.ok) throw new Error(json.error || "failed");
			setSubmitted(true);
			files.forEach((f) => URL.revokeObjectURL(f.url));
			setFiles([]);
		} catch {
			const payload = {};
			data.forEach((v, k) => {
				if (typeof v === "string") payload[k] = v;
			});
			const subject = `Wedding enquiry — ${payload.weddingType || "open"} (${payload.location || "open"})`;
			const lines = [
				`Name: ${payload.yourName || ""}`,
				`Partner: ${payload.partnerName || ""}`,
				`Email: ${payload.email || ""}`,
				`Phone: ${payload.phone || ""}`,
				`Country: ${payload.country || ""}`,
				`Guests: ${payload.guests || ""}`,
				`Preferred date: ${payload.preferredDate || ""}`,
				`Date flexibility: ${payload.flexibility || ""}`,
				`Wedding type: ${payload.weddingType || ""}`,
				`Region: ${payload.location || ""}`,
				payload.venue ? `Venue interest: ${payload.venue}` : "",
				`Budget: ${payload.budget || ""}`,
				`Language preference: ${lang}`,
				files.length ? `Attachments: ${files.length} file(s) — please send separately to ${LEAD_INBOX}` : "",
				"",
				"Message:",
				payload.message || ""
			].filter(Boolean).join("\n");
			const mailto = `mailto:${LEAD_INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
			window.location.href = mailto;
			setError(tr.form.error);
		} finally {
			setSubmitting(false);
		}
	}
	if (submitted) return /* @__PURE__ */ jsxs("div", {
		className: "max-w-2xl mx-auto bg-night-light/60 border border-aurora-green/40 rounded-2xl p-8 text-center",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-2xl font-heading text-white mb-2",
			children: tr.form.success
		}), /* @__PURE__ */ jsx("p", {
			className: "text-gray-400 text-sm",
			children: LEAD_INBOX
		})]
	});
	const t1 = "block text-sm font-medium text-gray-200 mb-1.5";
	const t2 = "w-full min-h-[48px] rounded-lg bg-night-light border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose px-3.5 py-2.5 text-base text-white placeholder-gray-500 outline-none transition-colors";
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit,
		className: "max-w-3xl mx-auto bg-night-light/60 border border-white/10 rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5",
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "text",
				name: "company",
				tabIndex: -1,
				autoComplete: "off",
				"aria-hidden": "true",
				style: {
					position: "absolute",
					left: "-9999px",
					width: 1,
					height: 1,
					opacity: 0
				}
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "yourName",
					className: t1,
					children: [tr.form.yourName, " *"]
				}), /* @__PURE__ */ jsx("input", {
					id: "yourName",
					name: "yourName",
					required: true,
					className: t2
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "partnerName",
					className: t1,
					children: tr.form.partnerName
				}), /* @__PURE__ */ jsx("input", {
					id: "partnerName",
					name: "partnerName",
					className: t2
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "email",
					className: t1,
					children: [tr.form.email, " *"]
				}), /* @__PURE__ */ jsx("input", {
					id: "email",
					name: "email",
					type: "email",
					required: true,
					className: t2
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "phone",
					className: t1,
					children: tr.form.phone
				}), /* @__PURE__ */ jsx("input", {
					id: "phone",
					name: "phone",
					type: "tel",
					className: t2
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "country",
					className: t1,
					children: tr.form.country
				}), /* @__PURE__ */ jsx("input", {
					id: "country",
					name: "country",
					placeholder: lang === "fi" ? "esim. Suomi" : "e.g. Finland",
					className: t2
				})] }), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						htmlFor: "guests",
						className: t1,
						children: tr.form.guests
					}),
					/* @__PURE__ */ jsx("input", {
						id: "guests",
						name: "guests",
						type: "number",
						min: "0",
						max: "500",
						placeholder: "0",
						className: t2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500 mt-1",
						children: tr.form.guestsHelp
					})
				] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("label", {
						htmlFor: "preferredDate",
						className: t1,
						children: tr.form.preferredDate
					}),
					/* @__PURE__ */ jsx("input", {
						id: "preferredDate",
						name: "preferredDate",
						placeholder: lang === "fi" ? "esim. helmikuu 2027" : "e.g. February 2027",
						className: t2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-gray-500 mt-1",
						children: tr.form.preferredDateHelp
					})
				] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "flexibility",
					className: t1,
					children: tr.form.flexibility
				}), /* @__PURE__ */ jsxs("select", {
					id: "flexibility",
					name: "flexibility",
					className: t2,
					defaultValue: "flexMonth",
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "flexFixed",
							children: tr.form.flexFixed
						}),
						/* @__PURE__ */ jsx("option", {
							value: "flexWeek",
							children: tr.form.flexWeek
						}),
						/* @__PURE__ */ jsx("option", {
							value: "flexMonth",
							children: tr.form.flexMonth
						}),
						/* @__PURE__ */ jsx("option", {
							value: "flexAny",
							children: tr.form.flexAny
						})
					]
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "weddingType",
					className: t1,
					children: tr.form.weddingType
				}), /* @__PURE__ */ jsxs("select", {
					id: "weddingType",
					name: "weddingType",
					className: t2,
					defaultValue: presetWeddingType || "",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: tr.form.noPreference
					}), weddingTypes.map((w) => /* @__PURE__ */ jsx("option", {
						value: w.slug,
						children: w.name[lang]
					}, w.slug))]
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "location",
					className: t1,
					children: tr.form.location
				}), /* @__PURE__ */ jsxs("select", {
					id: "location",
					name: "location",
					className: t2,
					defaultValue: presetLocation || "",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: tr.form.noPreference
					}), locations.map((l) => /* @__PURE__ */ jsx("option", {
						value: l.slug,
						children: l.name[lang]
					}, l.slug))]
				})] })]
			}),
			presetVenue && /* @__PURE__ */ jsx("input", {
				type: "hidden",
				name: "venue",
				value: presetVenue
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				htmlFor: "budget",
				className: t1,
				children: tr.form.budget
			}), /* @__PURE__ */ jsxs("select", {
				id: "budget",
				name: "budget",
				className: t2,
				defaultValue: "budget2",
				children: [
					/* @__PURE__ */ jsx("option", {
						value: "budget1",
						children: tr.form.budget1
					}),
					/* @__PURE__ */ jsx("option", {
						value: "budget2",
						children: tr.form.budget2
					}),
					/* @__PURE__ */ jsx("option", {
						value: "budget3",
						children: tr.form.budget3
					}),
					/* @__PURE__ */ jsx("option", {
						value: "budget4",
						children: tr.form.budget4
					}),
					/* @__PURE__ */ jsx("option", {
						value: "budget5",
						children: tr.form.budget5
					})
				]
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				htmlFor: "message",
				className: t1,
				children: tr.form.message
			}), /* @__PURE__ */ jsx("textarea", {
				id: "message",
				name: "message",
				rows: 5,
				className: t2,
				placeholder: tr.form.messagePlaceholder
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("label", {
					className: t1,
					children: tr.form.attachments
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-gray-500 mb-2",
					children: tr.form.attachmentsHelp
				}),
				/* @__PURE__ */ jsxs("div", {
					onDragOver: (e) => {
						e.preventDefault();
						setDragOver(true);
					},
					onDragLeave: () => setDragOver(false),
					onDrop,
					onClick: () => fileInputRef.current?.click(),
					className: `cursor-pointer rounded-xl border-2 border-dashed transition-colors px-5 py-8 text-center ${dragOver ? "border-rose bg-rose/10" : "border-white/15 hover:border-white/30 bg-night-light/40"}`,
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-gray-200",
							children: tr.form.attachmentsDrop
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500 mt-1",
							children: tr.form.attachmentsBrowse
						}),
						/* @__PURE__ */ jsx("input", {
							ref: fileInputRef,
							type: "file",
							name: "files",
							multiple: true,
							accept: "image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,video/webm",
							onChange: onFileInputChange,
							className: "hidden"
						})
					]
				}),
				files.length > 0 && /* @__PURE__ */ jsx("ul", {
					className: "mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2",
					children: files.map((f, i) => /* @__PURE__ */ jsxs("li", {
						className: "relative bg-night-light/60 border border-white/10 rounded-lg overflow-hidden",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-square bg-night flex items-center justify-center overflow-hidden",
							children: f.isVideo ? /* @__PURE__ */ jsx("video", {
								src: f.url,
								className: "w-full h-full object-cover",
								muted: true,
								playsInline: true
							}) : /* @__PURE__ */ jsx("img", {
								src: f.url,
								alt: f.file.name,
								className: "w-full h-full object-cover"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-2 flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-gray-400 truncate flex-1",
								title: f.file.name,
								children: formatBytes(f.file.size)
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: (e) => {
									e.stopPropagation();
									removeFile(i);
								},
								className: "text-[10px] text-rose hover:underline px-1",
								children: tr.form.attachmentsRemove
							})]
						})]
					}, i))
				})
			] }),
			/* @__PURE__ */ jsxs("label", {
				className: "flex items-start gap-3 text-sm text-gray-400",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					name: "consent",
					required: true,
					className: "mt-1 w-4 h-4 rounded border-white/20 bg-night-light text-rose focus:ring-rose"
				}), /* @__PURE__ */ jsx("span", { children: tr.form.consent })]
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "text-rose text-sm",
				children: error
			}),
			/* @__PURE__ */ jsx("button", {
				type: "submit",
				disabled: submitting,
				className: "w-full inline-flex items-center justify-center px-6 py-3.5 bg-rose hover:bg-pink disabled:opacity-60 text-white font-semibold rounded-full transition-colors shadow-lg shadow-rose/30",
				children: submitting ? tr.form.submitting : tr.form.submit
			})
		]
	});
}
//#endregion
//#region src/pages/NotFound.tsx
function NotFound() {
	const { lang, tr } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "404 — Not Found | LaplandWeddings",
		description: "Page not found.",
		path: "/404",
		noindex: true
	}), /* @__PURE__ */ jsxs("section", {
		className: "min-h-[70vh] flex flex-col items-center justify-center px-4 text-center",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "font-heading text-7xl text-rose mb-4",
				children: "404"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-heading text-3xl text-white mb-3 tracking-wide",
				children: lang === "fi" ? "Sivua ei löytynyt" : "Page not found"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-gray-400 max-w-md mb-8",
				children: lang === "fi" ? "Tämä sivu ei ole olemassa. Palaa etusivulle tai katso hääpaikat." : "This page does not exist. Go back to the home page or browse venues."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-3 justify-center",
				children: [/* @__PURE__ */ jsx(L, {
					to: "/",
					className: "px-5 py-2.5 bg-rose hover:bg-pink text-white font-semibold rounded-full",
					children: tr.nav.home
				}), /* @__PURE__ */ jsx(L, {
					to: "/venues",
					className: "px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full",
					children: tr.cta.seeAllVenues
				})]
			})
		]
	})] });
}
//#endregion
//#region src/pages/LocationPage.tsx
function LocationPage() {
	const { slug } = useParams();
	const { lang, tr } = useLang();
	const loc = locations.find((l) => l.slug === slug);
	if (!loc) return /* @__PURE__ */ jsx(NotFound, {});
	const venues = loc.venueSlugs.map(getVenueBySlug).filter((v) => !!v);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: `${loc.name[lang]} — ${lang === "fi" ? "Häät" : "Weddings"} | LaplandWeddings`,
			description: loc.intro[lang].slice(0, 160),
			path: `/locations/${loc.slug}`,
			image: loc.heroImage,
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "Place",
				name: loc.name[lang],
				description: loc.intro[lang],
				geo: {
					"@type": "GeoCoordinates",
					addressCountry: "FI"
				}
			}
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: loc.region[lang],
			title: loc.name[lang],
			subtitle: loc.intro[lang],
			image: loc.heroImage,
			imageAlt: loc.heroAlt[lang]
		}),
		/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("div", {
			className: "grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2",
							children: tr.sections.airport
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-heading text-2xl text-white",
							children: loc.airport
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm text-gray-400 mt-1",
							children: [
								loc.airportDistanceKm,
								" km ",
								lang === "fi" ? "keskustasta" : "from centre"
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2",
						children: lang === "fi" ? "Erityispiirre" : "Highlight"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-base text-white leading-relaxed",
						children: loc.highlight[lang]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2",
						children: tr.sections.season
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-300 leading-relaxed",
						children: loc.seasonNote[lang]
					})]
				})
			]
		}) }),
		/* @__PURE__ */ jsx(Section, {
			title: tr.sections.bestFor,
			className: "bg-night-light/20",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto",
				children: loc.bestFor[lang].map((b) => /* @__PURE__ */ jsx("div", {
					className: "bg-night-light/60 border border-rose/20 rounded-xl p-5 text-center",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-white font-medium",
						children: b
					})
				}, b))
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			title: lang === "fi" ? "Hääpaikat tällä alueella" : "Wedding venues in this region",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: venues.map((v) => /* @__PURE__ */ jsxs(L, {
					to: `/venues/${v.slug}`,
					className: "group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ jsx("img", {
							src: v.image,
							alt: v.imageAlt[lang],
							loading: "lazy",
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors",
								children: v.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500 mb-2",
								children: v.region[lang]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400 line-clamp-2",
								children: v.description[lang]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 text-xs text-gray-500 flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									v.capacity.min,
									"–",
									v.capacity.max,
									" ",
									lang === "fi" ? "vierasta" : "guests"
								] }), /* @__PURE__ */ jsx("span", {
									className: "text-gold",
									children: v.priceTier
								})]
							})
						]
					})]
				}, v.slug))
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/30",
			title: tr.contact.formTitle,
			subtitle: tr.contact.formSub,
			children: /* @__PURE__ */ jsx(LeadForm, { presetLocation: loc.slug })
		})
	] });
}
//#endregion
//#region src/pages/WeddingTypesIndex.tsx
function WeddingTypesIndex() {
	const { lang, tr } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Häätyypit Lapissa — Revontulet, Lumikappeli, Lasi-iglu | LaplandWeddings" : "Lapland Wedding Types — Northern Lights, Snow Chapel, Glass Igloo | LaplandWeddings",
			description: lang === "fi" ? "Kuusi häätyyppiä Lapissa: revontuli, lumikappeli, lasi-iglu, keskiyön aurinko, elopement ja lupausten uusiminen." : "Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.",
			path: "/wedding-types"
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Häätyypit" : "Types",
			title: tr.types.indexTitle,
			subtitle: tr.types.indexIntro,
			image: "https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg",
			imageAlt: lang === "fi" ? "Hääpari Lapin lumimaisemassa" : "Wedding couple in Lapland snowscape"
		}),
		/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx("div", {
			className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto",
			children: weddingTypes.map((wt) => /* @__PURE__ */ jsxs(L, {
				to: `/wedding-types/${wt.slug}`,
				className: "group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all flex flex-col",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[16/10] overflow-hidden",
					children: /* @__PURE__ */ jsx("img", {
						src: wt.heroImage,
						alt: wt.name[lang],
						loading: "lazy",
						className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-6 sm:p-7 flex-1 flex flex-col",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-4 mb-2",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-2xl text-white tracking-wide group-hover:text-rose transition-colors",
								children: wt.name[lang]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-gold font-semibold whitespace-nowrap",
								children: wt.priceRange
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-300 mb-3 leading-relaxed",
							children: wt.tagline[lang]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400 line-clamp-3 mb-4 flex-1",
							children: wt.description[lang]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5",
							children: [/* @__PURE__ */ jsx("span", { children: wt.bestSeason[lang] }), /* @__PURE__ */ jsx("span", { children: wt.capacity })]
						})
					]
				})]
			}, wt.slug))
		}) })
	] });
}
//#endregion
//#region src/pages/WeddingTypePage.tsx
function WeddingTypePage() {
	const { slug } = useParams();
	const { lang, tr } = useLang();
	const wt = weddingTypes.find((w) => w.slug === slug);
	if (!wt) return /* @__PURE__ */ jsx(NotFound, {});
	const venues = wt.venueSlugs.map(getVenueBySlug).filter((v) => !!v);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: `${wt.name[lang]} — ${lang === "fi" ? "Häät Lapissa" : "Lapland Weddings"} | LaplandWeddings`,
			description: wt.tagline[lang] + " — " + wt.description[lang].slice(0, 140),
			path: `/wedding-types/${wt.slug}`,
			image: wt.heroImage
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Häätyyppi" : "Wedding type",
			title: wt.name[lang],
			subtitle: wt.tagline[lang],
			image: wt.heroImage,
			imageAlt: wt.name[lang]
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsxs("div", {
			className: "grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1",
						children: tr.sections.season
					}), /* @__PURE__ */ jsx("p", {
						className: "text-base text-white",
						children: wt.bestSeason[lang]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1",
						children: tr.sections.priceRange
					}), /* @__PURE__ */ jsx("p", {
						className: "text-base text-white",
						children: wt.priceRange
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1",
						children: tr.sections.capacity
					}), /* @__PURE__ */ jsx("p", {
						className: "text-base text-white",
						children: wt.capacity
					})]
				})
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "text-gray-300 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto",
			children: wt.description[lang]
		})] }),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "font-heading text-2xl text-white mb-4 tracking-wide",
					children: tr.sections.features
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-3",
					children: wt.highlights[lang].map((h) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-gray-300",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-aurora-green mt-1",
							children: "✓"
						}), /* @__PURE__ */ jsx("span", { children: h })]
					}, h))
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "font-heading text-2xl text-white mb-4 tracking-wide",
					children: tr.sections.considerations
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-3",
					children: wt.considerations[lang].map((h) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-gray-300",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-aurora-pink mt-1",
							children: "!"
						}), /* @__PURE__ */ jsx("span", { children: h })]
					}, h))
				})] })]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			title: lang === "fi" ? "Sopivat hääpaikat" : "Suitable venues",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: venues.map((v) => /* @__PURE__ */ jsxs(L, {
					to: `/venues/${v.slug}`,
					className: "group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ jsx("img", {
							src: v.image,
							alt: v.imageAlt[lang],
							loading: "lazy",
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors",
								children: v.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500 mb-2",
								children: v.region[lang]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400 line-clamp-2",
								children: v.description[lang]
							})
						]
					})]
				}, v.slug))
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/30",
			title: tr.contact.formTitle,
			subtitle: tr.contact.formSub,
			children: /* @__PURE__ */ jsx(LeadForm, { presetWeddingType: wt.slug })
		})
	] });
}
//#endregion
//#region src/components/AffiliateDisclosure.tsx
/**
* FTC / DSA-compliant affiliate disclosure. Render once on any page that
* contains affiliate CTAs (venue cards with Hotels.com bookings, Trip.com
* flights, etc.).
*/
function AffiliateDisclosure() {
	const { lang } = useLang();
	return /* @__PURE__ */ jsx("p", {
		className: "text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto px-4 text-center",
		children: lang === "fi" ? "LaplandWeddings on osa LaplandVibes-verkostoa. Sivuilla on kumppanilinkkejä (mm. Hotels.com, Trip.com): kun klikkaat ja varaat, saamme pienen palkkion ilman lisäkustannusta sinulle. Tämä rahoittaa sivustomme — kiitos kun käytät linkkejämme." : "LaplandWeddings is part of the LaplandVibes network. This site contains partner links (e.g. Hotels.com, Trip.com): if you click and book, we earn a small commission at no extra cost to you. It funds the site — thank you for using our links."
	});
}
//#endregion
//#region src/pages/Venues.tsx
function Venues() {
	const { lang, tr } = useLang();
	const [loc, setLoc] = useState("");
	const [type, setType] = useState("");
	const [tier, setTier] = useState("");
	const filtered = useMemo(() => {
		return venues.filter((v) => (!loc || v.locationSlug === loc) && (!type || v.weddingTypeSlugs.includes(type)) && (!tier || v.priceTier === tier));
	}, [
		loc,
		type,
		tier
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Hääpaikat Lapissa — yli 20 vahvistettua kohdetta | LaplandWeddings" : "Lapland Wedding Venues — 20+ verified venues | LaplandWeddings",
			description: lang === "fi" ? "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. Yli 20 vahvistettua hääpaikkaa Lapin paikkakunnilla." : "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 20+ verified Lapland wedding venues across the regions.",
			path: "/venues",
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "ItemList",
				itemListElement: venues.map((v, i) => ({
					"@type": "ListItem",
					position: i + 1,
					url: `https://laplandweddings.online/venues/${v.slug}`,
					name: v.name
				}))
			}
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Hääpaikat" : "Venues",
			title: tr.venues.indexTitle,
			subtitle: tr.venues.indexIntro,
			image: "https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg",
			imageAlt: lang === "fi" ? "Lapin lasi-iglut lumessa" : "Lapland glass igloos in snow"
		}),
		/* @__PURE__ */ jsxs(Section, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "bg-night-light/60 border border-white/5 rounded-2xl p-5 mb-8 grid sm:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ jsxs("select", {
						value: loc,
						onChange: (e) => setLoc(e.target.value),
						className: "rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 text-white outline-none",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: tr.venues.allLocations
						}), locations.map((l) => /* @__PURE__ */ jsx("option", {
							value: l.slug,
							children: l.name[lang]
						}, l.slug))]
					}),
					/* @__PURE__ */ jsxs("select", {
						value: type,
						onChange: (e) => setType(e.target.value),
						className: "rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 text-white outline-none",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: tr.venues.allTypes
						}), weddingTypes.map((w) => /* @__PURE__ */ jsx("option", {
							value: w.slug,
							children: w.name[lang]
						}, w.slug))]
					}),
					/* @__PURE__ */ jsxs("select", {
						value: tier,
						onChange: (e) => setTier(e.target.value),
						className: "rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 text-white outline-none",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "",
								children: tr.venues.allPrices
							}),
							/* @__PURE__ */ jsxs("option", {
								value: "€€",
								children: ["€€ ", lang === "fi" ? "edullinen" : "affordable"]
							}),
							/* @__PURE__ */ jsxs("option", {
								value: "€€€",
								children: ["€€€ ", lang === "fi" ? "keskihinta" : "mid-range"]
							}),
							/* @__PURE__ */ jsxs("option", {
								value: "€€€€",
								children: ["€€€€ ", lang === "fi" ? "premium" : "premium"]
							})
						]
					})
				]
			}),
			filtered.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "text-center text-gray-400 py-12",
				children: tr.venues.noResults
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: filtered.map((v) => /* @__PURE__ */ jsxs(L, {
					to: `/venues/${v.slug}`,
					className: "group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ jsx("img", {
							src: v.image,
							alt: v.imageAlt[lang],
							loading: "lazy",
							className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
								children: v.region[lang]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors",
								children: v.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400 line-clamp-3 mt-2",
								children: v.description[lang]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "text-gray-500",
									children: [
										v.capacity.min,
										"–",
										v.capacity.max,
										" ",
										lang === "fi" ? "vierasta" : "guests"
									]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-gold font-semibold",
									children: v.priceTier
								})]
							})
						]
					})]
				}, v.slug))
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-center text-xs text-gray-500 mt-6",
				children: [
					filtered.length,
					" / ",
					venues.length,
					" ",
					lang === "fi" ? "hääpaikkaa" : "venues"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-10",
				children: /* @__PURE__ */ jsx(AffiliateDisclosure, {})
			})
		] })
	] });
}
//#endregion
//#region src/components/PriceTierBadge.tsx
var labelFi = {
	"€€": "Edullinen",
	"€€€": "Keskihinta",
	"€€€€": "Premium"
};
var labelEn = {
	"€€": "Affordable",
	"€€€": "Mid-range",
	"€€€€": "Premium"
};
function PriceTierBadge({ tier, lang }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-gold/10 border border-gold/30 px-2.5 py-1 text-xs font-semibold text-gold",
		children: [
			/* @__PURE__ */ jsx("span", { children: tier }),
			/* @__PURE__ */ jsx("span", {
				className: "text-gold/70",
				children: "·"
			}),
			/* @__PURE__ */ jsx("span", { children: lang === "fi" ? labelFi[tier] : labelEn[tier] })
		]
	});
}
//#endregion
//#region src/lib/affiliate.ts
/**
* Centralised affiliate link builders for the LaplandVibes ecosystem.
*
* Active partners (only these — anything else is a leak):
*   • Hotels.com via CJ — routed through `go.laplandvibes.com/go/hotels`
*   • EconomyBookings via CJ — routed through `go.laplandvibes.com/go/cars`
*   • Trip.com (direct) — Allianceid 8175308, SID 309472136
*   • laplandcarrental.com — internal LV site, not external affiliate
*
* SID convention: lowercase a-z 0-9 _, max 50 chars, no domain prefix.
* Example placements: `hero_cta`, `venue_kakslauttanen`, `practical_guide`.
*
* Every affiliate <a> needs: target="_blank" rel="sponsored nofollow noopener"
* (NEVER add noreferrer — it kills CJ attribution).
*/
var TRIP_ALLIANCE_ID = "8175308";
var TRIP_SID = "309472136";
var SITE_TAG = "laplandweddings.online";
/** Hotels.com via the LV Worker (CJ tracking handled server-side). */
function hotelsLink(query, sid = "venue") {
	const u = new URL("https://go.laplandvibes.com/go/hotels");
	u.searchParams.set("sid", sid);
	u.searchParams.set("ss", query);
	return u.toString();
}
/**
* Trip.com flights — direct (do NOT route through Worker).
* @param from IATA origin (lowercase, e.g. lhr, hel, fra)
* @param to   IATA destination (rvn, ktt, ivl)
*/
function tripFlightsLink(from, to, sid = "flights") {
	const u = new URL("https://www.trip.com/flights/showfarefirst");
	u.searchParams.set("dcity", from.toLowerCase());
	u.searchParams.set("acity", to.toLowerCase());
	u.searchParams.set("Allianceid", TRIP_ALLIANCE_ID);
	u.searchParams.set("SID", TRIP_SID);
	u.searchParams.set("trip_sub1", SITE_TAG);
	u.searchParams.set("trip_sub2", sid);
	return u.toString();
}
/** Convenience wrapper — flights to a Lapland airport from a known UK/EU origin. */
function tripToLapland(from, airport, sid = "flights") {
	return tripFlightsLink(from, airport.toLowerCase(), sid);
}
/** Internal LV car rental — not external affiliate. */
function carRentalLink(airport) {
	const u = new URL("https://laplandcarrental.com/");
	u.searchParams.set("utm_source", "laplandweddings");
	u.searchParams.set("utm_medium", "cross-link");
	if (airport) u.searchParams.set("pickup", airport);
	return u.toString();
}
/** Standard rel attribute for every affiliate link. */
var AFFILIATE_REL = "sponsored nofollow noopener";
//#endregion
//#region src/pages/VenuePage.tsx
function VenuePage() {
	const { slug } = useParams();
	const { lang, tr } = useLang();
	const v = slug ? getVenueBySlug(slug) : void 0;
	if (!v) return /* @__PURE__ */ jsx(NotFound, {});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: `${v.name} — ${v.region[lang]} | LaplandWeddings`,
			description: v.description[lang].slice(0, 160),
			path: `/venues/${v.slug}`,
			image: v.image,
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "EventVenue",
				name: v.name,
				description: v.description[lang],
				url: v.website,
				address: {
					"@type": "PostalAddress",
					addressLocality: v.region[lang],
					addressCountry: "FI"
				},
				maximumAttendeeCapacity: v.capacity.max,
				telephone: v.contact?.phone,
				email: v.contact?.email
			}
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: v.region[lang],
			title: v.name,
			subtitle: v.description[lang],
			image: v.image,
			imageAlt: v.imageAlt[lang]
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsxs("div", {
			className: "grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2",
							children: tr.sections.capacity
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "font-heading text-3xl text-white",
							children: [
								v.capacity.min,
								"–",
								v.capacity.max
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400",
							children: lang === "fi" ? "vierasta" : "guests"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2",
							children: tr.sections.priceRange
						}),
						/* @__PURE__ */ jsx(PriceTierBadge, {
							tier: v.priceTier,
							lang
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400 mt-2",
							children: v.yearRound ? tr.sections.yearRound : tr.sections.seasonalOnly
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-2 justify-center",
					children: [/* @__PURE__ */ jsxs("a", {
						href: v.website,
						target: "_blank",
						rel: "noopener noreferrer sponsored",
						className: "inline-flex items-center justify-center px-5 py-2.5 bg-rose hover:bg-pink text-white font-semibold rounded-full transition-colors",
						children: [tr.cta.visitWebsite, " →"]
					}), /* @__PURE__ */ jsxs("a", {
						href: hotelsLink(v.name, `venue_${v.slug}`),
						target: "_blank",
						rel: AFFILIATE_REL,
						className: "inline-flex items-center justify-center px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full transition-colors",
						children: [tr.cta.bookStay, " (Hotels.com) →"]
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-6",
			children: /* @__PURE__ */ jsx(AffiliateDisclosure, {})
		})] }),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "font-heading text-2xl text-white mb-4 tracking-wide",
					children: tr.sections.features
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-3",
					children: v.features[lang].map((f) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-gray-300",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-aurora-green mt-1",
							children: "✓"
						}), /* @__PURE__ */ jsx("span", { children: f })]
					}, f))
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "font-heading text-2xl text-white mb-4 tracking-wide",
					children: tr.sections.weddingSpaces
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-3",
					children: v.weddingSpaces[lang].map((s) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-gray-300",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-rose mt-1",
							children: "◆"
						}), /* @__PURE__ */ jsx("span", { children: s })]
					}, s))
				})] })]
			})
		}),
		/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2 justify-center mb-6",
			children: v.weddingTypeSlugs.map((wt) => /* @__PURE__ */ jsxs(L, {
				to: `/wedding-types/${wt}`,
				className: "text-xs px-3 py-1.5 rounded-full bg-night-light border border-white/10 hover:border-rose/40 text-gray-300 hover:text-white transition-colors",
				children: ["#", wt]
			}, wt))
		}) }),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/30",
			title: lang === "fi" ? `Pyydä tarjous — ${v.name}` : `Request a quote — ${v.name}`,
			subtitle: tr.contact.formSub,
			children: /* @__PURE__ */ jsx(LeadForm, {
				presetVenue: v.name,
				presetLocation: v.locationSlug
			})
		})
	] });
}
//#endregion
//#region src/pages/Planners.tsx
function Planners() {
	const { lang, tr } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Lapin hääsuunnittelijat — pyydä 3 tarjousta yhdellä lomakkeella | LaplandWeddings" : "Lapland Wedding Planners — get 3 quotes with one form | LaplandWeddings",
			description: lang === "fi" ? "Lapin 7 vakiintuneinta hääsuunnittelijaa. Lähetä yksi lomake — toimitamme 3 räätälöityä tarjousta. Maksuton ja sitoumukseton." : "The 7 most established Lapland wedding planners. Send one form — we deliver 3 personalised quotes. Free and no commitment.",
			path: "/planners",
			jsonLd: {
				"@context": "https://schema.org",
				"@type": "ItemList",
				itemListElement: planners.map((p, i) => ({
					"@type": "ListItem",
					position: i + 1,
					item: {
						"@type": "LocalBusiness",
						name: p.name,
						url: p.publicWebsite,
						areaServed: "Finnish Lapland",
						priceRange: p.priceTier
					}
				}))
			}
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Hääsuunnittelijat" : "Wedding planners",
			title: tr.planners.indexTitle,
			subtitle: tr.planners.indexIntro,
			image: "https://mariahedengren.com/wp-content/uploads/2018/04/51-best-wedding-photographer-Lapland.jpg",
			imageAlt: lang === "fi" ? "Hääpari vihille kahdestaan Lapin maisemassa" : "Couple eloping in Lapland landscape"
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx("div", {
			className: "grid md:grid-cols-2 gap-6",
			children: planners.map((p) => /* @__PURE__ */ jsxs("article", {
				className: "bg-night-light border border-white/5 rounded-2xl p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-3 mb-3",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
							children: p.homeBase[lang]
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-heading text-xl text-white tracking-wide",
							children: p.name
						})] }), /* @__PURE__ */ jsxs("span", {
							className: "text-gold font-semibold whitespace-nowrap",
							children: [p.priceTier, p.priceFrom ? ` · ${lang === "fi" ? "alk" : "from"} ${p.priceFrom}` : ""]
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-300 leading-relaxed mb-4",
						children: p.description[lang]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2",
						children: tr.sections.strengths
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "text-sm text-gray-300 space-y-1.5 mb-4",
						children: p.strengths[lang].map((s) => /* @__PURE__ */ jsxs("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-aurora-green",
								children: "✓"
							}), /* @__PURE__ */ jsx("span", { children: s })]
						}, s))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5",
						children: [/* @__PURE__ */ jsx("span", { children: p.languages.map((l) => localiseLanguage(l, lang)).join(" · ") }), /* @__PURE__ */ jsx("span", {
							className: "italic",
							children: p.bestFor[lang]
						})]
					})
				]
			}, p.slug))
		}), /* @__PURE__ */ jsx("p", {
			className: "text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto",
			children: lang === "fi" ? "Tiedot kerätty hääsuunnittelijoiden omilta julkisilta sivuilta. LaplandWeddings ei ole sopimussuhteessa kaikkiin listattuihin toimijoihin — välitämme tiedustelusi niille, jotka parhaiten vastaavat toiveitanne." : "Information sourced from public planner websites. LaplandWeddings is not in a contractual relationship with all listed providers — we route your enquiry to those who best match your needs."
		})] }),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/30",
			title: tr.planners.threeQuotesTitle,
			subtitle: tr.planners.threeQuotesP,
			children: /* @__PURE__ */ jsx(LeadForm, {})
		})
	] });
}
//#endregion
//#region src/data/photographers.ts
var photographers = [
	{
		slug: "maria-hedengren",
		name: "Maria Hedengren",
		baseLocation: {
			fi: "Lappi · destination",
			en: "Lapland · destination"
		},
		style: {
			fi: "Fine Art + dokumentaarinen",
			en: "Fine Art + documentary"
		},
		description: {
			fi: "Northern Lights Ranchin pääkumppani-valokuvaaja. Erikoisalana revontulet ja lumikappelit. Häämedialehdet (Junebug, Green Wedding Shoes) ovat julkaisseet hänen häitään (Junebug, Green Wedding Shoes).",
			en: "Lead photography partner of Northern Lights Ranch. Specialised in Northern Lights and snow chapels. Multiple destination wedding media features (Junebug, Green Wedding Shoes)."
		},
		website: "https://mariahedengren.com/lapland-wedding-photographer/",
		instagram: "@mariahedengren",
		highlight: {
			fi: "NLR:n Snow Chapelin asiantuntija — kuvaa sujuvasti pakkasella.",
			en: "NLR Snow Chapel specialist — proven in sub-zero conditions."
		}
	},
	{
		slug: "robin-goodlad",
		name: "Robin Goodlad",
		baseLocation: {
			fi: "UK · destination Lappi",
			en: "UK · destination Lapland"
		},
		style: {
			fi: "Palkittu dokumentaarinen",
			en: "Award-winning documentary"
		},
		description: {
			fi: "UK-pohjainen palkittu hääjvalokuvaaja, joka matkustaa säännöllisesti Lappiin. Sopii UK-pareille jotka haluavat saman valokuvaajan koko matkan ajan.",
			en: "A UK-based award-winning wedding photographer who travels to Lapland regularly. Best for UK couples wanting the same photographer throughout the journey."
		},
		website: "https://www.robingoodlad.com/lapland-wedding-photographer/",
		highlight: {
			fi: "Palkittu MPA + The Wedding Photographer Awards.",
			en: "Award winner — MPA + The Wedding Photographer Awards."
		}
	},
	{
		slug: "cherelle-blake",
		name: "Cherelle Blake",
		baseLocation: {
			fi: "UK · NLR Snow Chapel",
			en: "UK · NLR Snow Chapel"
		},
		style: {
			fi: "Romanttinen, valoisa",
			en: "Romantic, light"
		},
		description: {
			fi: "Erikoistunut NLR Snow Chapel -elopement-pareihin. Vaalea, ilmava käsittely sopii talvisten lumimaisemien kanssa.",
			en: "Specialised in NLR Snow Chapel elopement couples. Light, airy treatment that suits winter snowscapes."
		},
		website: "https://www.cherrelleblake.com/blog/Lapland-wedding-photographer-snow-chapel-wedding-elopement/",
		highlight: {
			fi: "NLR Snow Chapel elopement -spesialisti.",
			en: "NLR Snow Chapel elopement specialist."
		}
	},
	{
		slug: "marion-lefevre",
		name: "Marion Lefevre",
		baseLocation: {
			fi: "Lappi paikallinen",
			en: "Local in Lapland"
		},
		style: {
			fi: "Filminen, lämmin",
			en: "Cinematic, warm"
		},
		description: {
			fi: "Paikallinen Lappi-pohjainen valokuvaaja, joka toimii myös konsultointi-plannerina. Sopii pareille jotka haluavat lokaalin hinnoittelun ja ohjeistuksen.",
			en: "A Lapland-based local photographer who also offers planning consultancy. Best for couples wanting local pricing and guidance."
		},
		website: "https://www.lefevremarionphotography.com/laplandwedding",
		instagram: "@marionlefevrephoto",
		highlight: {
			fi: "Paikallinen + planning-konsultointi.",
			en: "Local + planning consultancy."
		}
	},
	{
		slug: "jaakko-perala",
		name: "Jaakko Perala",
		baseLocation: {
			fi: "Lappi paikallinen",
			en: "Local in Lapland"
		},
		style: {
			fi: "Intimate / dokumentaarinen",
			en: "Intimate / documentary"
		},
		description: {
			fi: "Suomalainen valokuvaaja jonka oma \"Lapland Intimate Wedding Guide\" rankaa Googlessa. Sopii pareille jotka haluavat mainostekstin lisäksi paikallisia oppaita matkan suunnitteluun.",
			en: "A Finnish photographer whose own “Lapland Intimate Wedding Guide” ranks on Google. Best for couples who want practical local guides alongside photography."
		},
		website: "https://jaakkoperala.com/lapland-intimate-wedding-guide/",
		highlight: {
			fi: "Tuottaa SEO-content + valokuvaus.",
			en: "Produces SEO content + photography."
		}
	},
	{
		slug: "tina-lapland-photographer",
		name: "Tina · The Lapland Photographer",
		baseLocation: {
			fi: "Lappi paikallinen",
			en: "Local in Lapland"
		},
		style: {
			fi: "Lifestyle + adventure",
			en: "Lifestyle + adventure"
		},
		description: {
			fi: "Adventure-elopement-spesialisti, joka tekee paritöitä myös tunturi- ja erämaapaikoissa.",
			en: "Adventure elopement specialist, also working in fell and wilderness locations."
		},
		website: "https://laplandphotographer.com/blog",
		highlight: {
			fi: "Tunturi- ja erämaaspesialisti.",
			en: "Fell and wilderness specialist."
		}
	}
];
//#endregion
//#region src/pages/Photographers.tsx
function Photographers() {
	const { lang } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Lapin hääjvalokuvaajat — Maria Hedengren, Robin Goodlad ym. | LaplandWeddings" : "Lapland Wedding Photographers — Maria Hedengren, Robin Goodlad et al. | LaplandWeddings",
			description: lang === "fi" ? "Kuusi Lapin parasta hääjvalokuvaajaa. Revontulet, lumikappelit, lasi-iglut — testattu pakkasessa." : "Six of the best Lapland wedding photographers. Northern Lights, snow chapels, glass igloos — proven in the cold.",
			path: "/photographers"
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Valokuvaajat" : "Photographers",
			title: lang === "fi" ? "Lapin hääjvalokuvaajat" : "Lapland wedding photographers",
			subtitle: lang === "fi" ? "Tähän on koottu kuusi Lapin kokeneinta hääjvalokuvaajaa. Revontulikalibrointi, lumikappelivalaistus, lasi-iglu-kuvaus — kaikki testattuja pakkasessa." : "Six of the most experienced wedding photographers in Lapland. Aurora-calibrated, snow-chapel lighting, glass-igloo composition — all proven in sub-zero conditions.",
			image: "https://mariahedengren.com/wp-content/uploads/2018/04/63-Lapland-winter-elopement.jpg",
			imageAlt: lang === "fi" ? "Hääpari talvisessa Lapissa — kuva: Maria Hedengren" : "Wedding couple in winter Lapland — photo: Maria Hedengren"
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto",
			children: photographers.map((p) => /* @__PURE__ */ jsxs("article", {
				className: "bg-night-light border border-white/5 rounded-2xl p-6 flex flex-col",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1",
						children: p.baseLocation[lang]
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "font-heading text-xl text-white tracking-wide mb-1",
						children: p.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500 mb-3",
						children: p.style[lang]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-300 leading-relaxed mb-4 flex-1",
						children: p.description[lang]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-aurora-green italic mb-4",
						children: ["★ ", p.highlight[lang]]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between text-xs pt-4 border-t border-white/5",
						children: [/* @__PURE__ */ jsx("a", {
							href: p.website,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-aurora-pink hover:text-rose transition-colors font-semibold",
							children: lang === "fi" ? "Verkkosivut →" : "Website →"
						}), p.instagram && /* @__PURE__ */ jsx("span", {
							className: "text-gray-500",
							children: p.instagram
						})]
					})
				]
			}, p.slug))
		}), /* @__PURE__ */ jsx("p", {
			className: "text-center text-xs text-gray-500 mt-10 max-w-2xl mx-auto",
			children: lang === "fi" ? "Tiedot kerätty valokuvaajien omilta julkisilta sivuilta. LaplandWeddings ei ole sopimussuhteessa kaikkiin listattuihin — yhteyshenkilöt heidän omista sivustaan." : "Information sourced from public photographer websites. LaplandWeddings is not in a contractual relationship with all listed — contact directly via their own sites."
		})] })
	] });
}
//#endregion
//#region src/pages/PracticalGuide.tsx
function PracticalGuide() {
	const { lang, tr } = useLang();
	const steps = lang === "fi" ? [
		{
			n: 1,
			t: "Pyydä esteiden tutkinta DVV:ltä",
			p: "Suomalaisille 1–2 viikkoa, ulkomaalaisille 3–5 viikkoa. Maksuton (paitsi 15 € EU-käännös tarvittaessa). Hae 2 kuukautta ennen vihkimistä.",
			link: {
				url: "https://dvv.fi/en/examination-of-impediments-to-marriage",
				label: "DVV — Examination of impediments"
			}
		},
		{
			n: 2,
			t: "Hanki Certificate of No Impediment kotimaastasi",
			p: "Pyydä se omasta maistraatistasi tai ulkoasiainministeriöstä ennen Suomeen tuloa. Useimmissa maissa apostille-leima ja valallinen käännös tarvitaan.",
			link: {
				url: "https://dvv.fi/en/a-certificate-of-the-right-granted-by-the-finnish-legislation-to-enter-a-marriage-in-a-foreign-country",
				label: "DVV — Certificate of right to marry"
			}
		},
		{
			n: 3,
			t: "Valitse vihkijä",
			p: "Siviilivihkimys on yleisin: kunnan vihkijä Rovaniemellä, Inarissa, Kittilässä tai Sodankylässä. Englanninkielinen vihkijä järjestyy yleensä suunnittelijan kautta. Kirkollinen vihkimys vain ev.lut. kirkkoon kuuluville."
		},
		{
			n: 4,
			t: "Hae 2 todistajaa",
			p: "Suomen laki vaatii kaksi todistajaa. Useimmat venuet ja suunnittelijat järjestävät heidät paikan päältä — ei vaadi suomalaisia."
		},
		{
			n: 5,
			t: "Vihkiminen + 2 todistuskappaletta",
			p: "Saat 2 virallista vihkimistodistusta englanniksi. Apostille-leima nopeasti DVV:n kautta — kotimaata varten useimmissa tapauksissa.",
			link: {
				url: "https://um.fi/registration-of-marriage-in-the-population-information-system",
				label: "Suomen UM — Avioliiton rekisteröinti"
			}
		},
		{
			n: 6,
			t: "Rekisteröi avioliitto kotimaassasi",
			p: "Vie todistus apostille-leimalla kotimaasi rekisteriin. EU-maissa yleensä kuukauden sisällä. Tämän jälkeen avioliitto on pätevä globaalisti."
		}
	] : [
		{
			n: 1,
			t: "Request the Examination of Impediments from DVV",
			p: "Finnish couples: 1–2 weeks. Foreign couples: 3–5 weeks. Free (except €15 EU translation if needed). Submit 2 months before the wedding.",
			link: {
				url: "https://dvv.fi/en/examination-of-impediments-to-marriage",
				label: "DVV — Examination of impediments"
			}
		},
		{
			n: 2,
			t: "Get a Certificate of No Impediment from your home country",
			p: "Request from your home registrar or foreign ministry before arriving in Finland. Most countries require an apostille stamp and a sworn translation.",
			link: {
				url: "https://dvv.fi/en/a-certificate-of-the-right-granted-by-the-finnish-legislation-to-enter-a-marriage-in-a-foreign-country",
				label: "DVV — Certificate of right to marry"
			}
		},
		{
			n: 3,
			t: "Choose your officiant",
			p: "Civil ceremony is most common: a municipal officiant in Rovaniemi, Inari, Kittilä or Sodankylä. An English-speaking officiant is usually arranged by your planner. Religious ceremony only for members of the Lutheran Church."
		},
		{
			n: 4,
			t: "Get 2 witnesses",
			p: "Finnish law requires two witnesses. Most venues and planners arrange them on site — they do not need to be Finnish."
		},
		{
			n: 5,
			t: "Wedding day + 2 marriage certificates",
			p: "You receive 2 official marriage certificates in English. Apostille via DVV is fast — required by most home countries.",
			link: {
				url: "https://um.fi/registration-of-marriage-in-the-population-information-system",
				label: "Finnish MFA — Marriage registration"
			}
		},
		{
			n: 6,
			t: "Register the marriage in your home country",
			p: "Take the apostilled certificate to your home country’s registry. In EU countries this is usually within a month. The marriage is then globally valid."
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Häät Lapissa — DVV-paperit, vihkijä, käytännön opas | LaplandWeddings" : "Getting Married in Lapland — DVV paperwork, officiant, practical guide | LaplandWeddings",
			description: lang === "fi" ? "Käytännön opas ulkomaalaisille pareille: DVV-paperit, esteiden tutkinta (3–5 vk), todistajat, vihkijä, kotimaan rekisteröinti." : "Practical guide for foreign couples: DVV paperwork, examination of impediments (3–5 weeks), witnesses, officiant, home-country registration.",
			path: "/practical-guide",
			jsonLd: {
				"@context": "https://schema.org",
				"@graph": [{
					"@type": "HowTo",
					name: lang === "fi" ? "Häät Lapissa — DVV-prosessi" : "Getting married in Lapland — DVV process",
					step: steps.map((s) => ({
						"@type": "HowToStep",
						name: s.t,
						text: s.p
					}))
				}, {
					"@type": "FAQPage",
					mainEntity: [
						{
							"@type": "Question",
							name: lang === "fi" ? "Kuinka kauan DVV:n paperit kestävät ulkomaalaiselle parille?" : "How long does the DVV paperwork take for a foreign couple?",
							acceptedAnswer: {
								"@type": "Answer",
								text: lang === "fi" ? "3–5 viikkoa. Suomen kansalaisille 1–2 viikkoa. Aloita prosessi vähintään 2 kuukautta ennen vihkimistä." : "3–5 weeks. For Finnish citizens, 1–2 weeks. Begin the process at least 2 months before the wedding."
							}
						},
						{
							"@type": "Question",
							name: lang === "fi" ? "Kuinka monta todistajaa Suomen lain mukaan tarvitaan?" : "How many witnesses does Finnish law require?",
							acceptedAnswer: {
								"@type": "Answer",
								text: lang === "fi" ? "Tasan kaksi. Useimmat venuet ja suunnittelijat järjestävät heidät paikan päältä — heidän ei tarvitse olla suomalaisia." : "Exactly two. Most venues and planners arrange them on site — they do not need to be Finnish."
							}
						},
						{
							"@type": "Question",
							name: lang === "fi" ? "Onko Suomessa solmittu avioliitto pätevä kotimaassani?" : "Is a marriage celebrated in Finland valid in my home country?",
							acceptedAnswer: {
								"@type": "Answer",
								text: lang === "fi" ? "Kyllä. Saat 2 virallista todistusta englanniksi. Apostille-leima DVV:ltä kotimaata varten useimmissa tapauksissa." : "Yes. You receive 2 official certificates in English. Apostille via DVV is required by most home countries — fast to obtain."
							}
						},
						{
							"@type": "Question",
							name: lang === "fi" ? "Mikä on häiden kustannus Lapissa?" : "How much do Lapland weddings cost?",
							acceptedAnswer: {
								"@type": "Answer",
								text: lang === "fi" ? "Elopement 1 600–5 000 €, pieni häät 4 500–15 000 €, premium 15 000–40 000 €, luksus jopa 100 000 €." : "Elopement €1 600–5 000, small wedding €4 500–15 000, premium €15 000–40 000, luxury up to €100 000."
							}
						},
						{
							"@type": "Question",
							name: lang === "fi" ? "Mikä on paras kuukausi Lapin häille?" : "When is the best month for a Lapland wedding?",
							acceptedAnswer: {
								"@type": "Answer",
								text: lang === "fi" ? "Helmikuu–maaliskuu antaa pisimmät päivät, varmimman lumen ja revontulet. Joulukuu on tunnelmallisin." : "February–March offer the longest daylight, the most reliable snow, and the Northern Lights. December is the most atmospheric."
							}
						}
					]
				}]
			}
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Käytännön opas" : "Practical guide",
			title: tr.practical.title,
			subtitle: tr.practical.subtitle,
			image: "https://r.profitroom.pl/wildernesshotelinari/images/202412171316320.Inari_drone4_2_.jpg",
			imageAlt: lang === "fi" ? "Vihkimisseremonia talvisessa metsässä" : "Wedding ceremony in winter forest"
		}),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-gradient-to-br from-aurora-purple/10 via-rose/10 to-aurora-pink/10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl mx-auto bg-night-light/60 border border-rose/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5",
				children: [
					/* @__PURE__ */ jsx(Download, { className: "w-10 h-10 text-rose flex-shrink-0" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 text-center sm:text-left",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs uppercase tracking-[0.25em] text-aurora-pink font-semibold mb-1",
								children: lang === "fi" ? "Lataa tarkistuslista" : "Download the checklist"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-white font-semibold text-lg mb-1",
								children: lang === "fi" ? "Yksisivuinen DVV-tarkistuslista PDF:nä" : "One-page DVV checklist as PDF"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400",
								children: lang === "fi" ? "Printtaa tai tallenna matkalle — kaikki vaiheet 8 viikkoa ennen häitä jälkeen vihkimisen." : "Print or save for your travel folder — every step from 8 weeks before to after the wedding."
							})
						]
					}),
					/* @__PURE__ */ jsxs(L, {
						to: "/checklist/dvv-foreign-couples",
						className: "inline-flex items-center gap-2 bg-rose hover:bg-pink text-white font-semibold px-5 py-3 rounded-full whitespace-nowrap shadow-lg shadow-rose/30",
						children: [lang === "fi" ? "Avaa lista" : "Open the checklist", " →"]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			title: lang === "fi" ? "Avioliittolupa Suomessa — 6 vaihetta" : "Marriage license in Finland — 6 steps",
			children: /* @__PURE__ */ jsx("div", {
				className: "space-y-4 max-w-4xl mx-auto",
				children: steps.map((s) => /* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6 flex gap-5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex-shrink-0 w-12 h-12 rounded-full bg-rose/20 border border-rose/40 text-rose font-heading text-xl flex items-center justify-center",
						children: s.n
					}), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-xl text-white mb-2 tracking-wide",
							children: s.t
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-gray-300 leading-relaxed mb-2",
							children: s.p
						}),
						s.link && /* @__PURE__ */ jsxs("a", {
							href: s.link.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-sm text-aurora-pink hover:underline",
							children: [s.link.label, " →"]
						})
					] })]
				}, s.n))
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			className: "bg-night-light/20",
			title: lang === "fi" ? "Sesongit ja sää" : "Seasons and weather",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid md:grid-cols-3 gap-5 max-w-5xl mx-auto",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-aurora-purple font-heading text-xl mb-2",
							children: lang === "fi" ? "Joulukuu — maaliskuu" : "December – March"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-300 leading-relaxed",
							children: lang === "fi" ? "Peak-sesonki (95 % kysynnästä). Lumi, jää, revontulet. Kaamos joulu–tammikuussa, sininen tunti maaliskuussa." : "Peak season (95 % of demand). Snow, ice, Northern Lights. Polar night December–January, blue hour in March."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-aurora-green font-heading text-xl mb-2",
							children: lang === "fi" ? "Toukokuu — heinäkuu" : "May – July"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-300 leading-relaxed",
							children: lang === "fi" ? "Keskiyön aurinko 23.5.–24.7. Lämmin (15–25 °C), ei lunta. Hyttyset huipussaan kesäkuussa." : "Midnight Sun 23 May – 24 July. Warm (15–25 °C), no snow. Mosquitoes peak in June."
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-night-light/60 border border-white/5 rounded-2xl p-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-aurora-pink font-heading text-xl mb-2",
							children: lang === "fi" ? "Syyskuu — lokakuu" : "September – October"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-300 leading-relaxed",
							children: lang === "fi" ? "Ruskakausi syyskuun puolivälissä — Lapin värikkäin aika. Revontulet alkavat näkyä lokakuussa." : "Ruska (autumn colours) in mid-September — Lapland’s most colourful time. Northern Lights start showing in October."
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			title: lang === "fi" ? "Lentoyhteydet ja saavutettavuus" : "Flights and accessibility",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid md:grid-cols-3 gap-5 max-w-5xl mx-auto",
				children: [
					{
						code: "RVN",
						name: "Rovaniemi",
						fi: "Suorat lennot Helsingistä, Lontoosta, Frankfurtista, Pariisista. 10 km keskustaan.",
						en: "Direct flights from Helsinki, London, Frankfurt, Paris. 10 km to the centre."
					},
					{
						code: "KTT",
						name: "Kittilä",
						fi: "Suorat lennot Helsingistä, Lontoosta, Manchesterista, Birminghamista. 14 km Leville.",
						en: "Direct flights from Helsinki, London, Manchester, Birmingham. 14 km to Levi."
					},
					{
						code: "IVL",
						name: "Ivalo",
						fi: "Suorat lennot Helsingistä. Suomen pohjoisin lentokenttä, 30 km Saariselälle.",
						en: "Direct flights from Helsinki. Finland’s northernmost airport, 30 km to Saariselkä."
					}
				].map((ap) => /* @__PURE__ */ jsxs("div", {
					className: "bg-night-light/60 border border-white/5 rounded-2xl p-6 flex flex-col",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "font-heading text-xl text-white mb-2",
							children: [
								ap.name,
								" (",
								ap.code,
								")"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400 leading-relaxed mb-4 flex-1",
							children: lang === "fi" ? ap.fi : ap.en
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsxs("a", {
								href: tripToLapland("LHR", ap.code),
								target: "_blank",
								rel: AFFILIATE_REL,
								className: "text-xs text-aurora-pink hover:underline",
								children: [lang === "fi" ? "Etsi lennot Lontoosta (Trip.com)" : "Find flights from London (Trip.com)", " →"]
							}), /* @__PURE__ */ jsxs("a", {
								href: tripToLapland("HEL", ap.code),
								target: "_blank",
								rel: AFFILIATE_REL,
								className: "text-xs text-aurora-pink hover:underline",
								children: [lang === "fi" ? "Etsi lennot Helsingistä (Trip.com)" : "Find flights from Helsinki (Trip.com)", " →"]
							})]
						})
					]
				}, ap.code))
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			className: "bg-night-light/20",
			title: lang === "fi" ? "Autovuokraus ja kuljetukset" : "Car rental and transfers",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl mx-auto bg-night-light/60 border border-white/5 rounded-2xl p-7 text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-gray-300 leading-relaxed mb-5",
					children: lang === "fi" ? "Vuokraa auto suoraan Rovaniemen, Kittilän tai Ivalon lentokentältä — verkostomme oma laplandcarrental.com tarjoaa hinnat ja varaukset suomeksi ja englanniksi." : "Rent a car directly from Rovaniemi, Kittilä or Ivalo airport — our network site laplandcarrental.com offers pricing and reservations in Finnish and English."
				}), /* @__PURE__ */ jsx("a", {
					href: carRentalLink(),
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-lg shadow-rose/30 transition-colors",
					children: "laplandcarrental.com →"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-10",
				children: /* @__PURE__ */ jsx(AffiliateDisclosure, {})
			})]
		})
	] });
}
//#endregion
//#region src/pages/Pricing.tsx
function Pricing() {
	const { lang, tr } = useLang();
	const tiers = lang === "fi" ? [
		{
			title: "Elopement · kahdestaan vihille",
			range: "€1 600 – €5 000",
			size: "2 hengen + 2 todistajaa",
			includes: [
				"Vihkijä englanniksi/suomeksi",
				"Valokuvaaja 2 h",
				"Pieni kukkakimppu + napinläpi",
				"DVV-paperit (jos suunnittelija)",
				"1 yö lasi-iglussa"
			]
		},
		{
			title: "Pieni häät · 10–25 vierasta",
			range: "€4 500 – €15 000",
			size: "10–25 vierasta",
			includes: [
				"Lumi-/lasikappeli",
				"Vihkijä",
				"Valokuvaaja 4–6 h",
				"Kukat morsiamelle ja seurueelle",
				"Illallinen 3 ruokalajia",
				"2–3 yötä cabineissa"
			]
		},
		{
			title: "Premium häät · 25–60 vierasta",
			range: "€15 000 – €40 000",
			size: "25–60 vierasta",
			includes: [
				"Eksklusiivinen lumi-/jääkappeli",
				"Live-musiikki",
				"Valokuvaaja 8–10 h + video",
				"Catering + viini",
				"Husky/poro-kuljetus",
				"3–4 yötä premium-cabineissa"
			]
		},
		{
			title: "Luksushäät · jopa 100 vierasta",
			range: "€40 000 – €100 000+",
			size: "60–100+ vierasta",
			includes: [
				"Celebration House (250 hh, Kakslauttanen)",
				"Helikopterituki",
				"Michelin-tason catering",
				"Valokuvaaja + video team",
				"Sääkontingenssit + premium-vierashotelli",
				"Räätälöity 5–7 päivän ohjelma"
			]
		}
	] : [
		{
			title: "Elopement · just the two of you",
			range: "€1 600 – €5 000",
			size: "Couple + 2 witnesses",
			includes: [
				"Officiant in English/Finnish",
				"Photographer 2 h",
				"Small bouquet + boutonnière",
				"DVV paperwork (if planner-arranged)",
				"1 night in a glass igloo"
			]
		},
		{
			title: "Small wedding · 10–25 guests",
			range: "€4 500 – €15 000",
			size: "10–25 guests",
			includes: [
				"Snow / glass chapel",
				"Officiant",
				"Photographer 4–6 h",
				"Flowers for couple and party",
				"3-course dinner",
				"2–3 nights in cabins"
			]
		},
		{
			title: "Premium wedding · 25–60 guests",
			range: "€15 000 – €40 000",
			size: "25–60 guests",
			includes: [
				"Exclusive snow / ice chapel",
				"Live music",
				"Photographer 8–10 h + video",
				"Catering + wine",
				"Husky / reindeer transfer",
				"3–4 nights in premium cabins"
			]
		},
		{
			title: "Luxury wedding · up to 100 guests",
			range: "€40 000 – €100 000+",
			size: "60–100+ guests",
			includes: [
				"Celebration House (250 cap, Kakslauttanen)",
				"Helicopter support",
				"Michelin-level catering",
				"Photographer + video team",
				"Weather contingency + premium guest hotel",
				"Bespoke 5–7 day programme"
			]
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Häät Lapissa — hinta-arviot ja paketit | LaplandWeddings" : "Lapland Weddings — Pricing and Packages | LaplandWeddings",
			description: lang === "fi" ? "Mitä häät Lapissa maksaa? Elopement 1 600 €:sta, premium-häät 40 000 €:on. Vahvistetut markkinahinnat." : "How much do Lapland weddings cost? Elopement from €1 600, premium weddings up to €40 000. Verified market prices.",
			path: "/pricing"
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Hinta-arviot" : "Pricing",
			title: tr.pricing.title,
			subtitle: tr.pricing.subtitle,
			image: "https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg",
			imageAlt: lang === "fi" ? "Lapin lumimaisema illalla" : "Lapland snow landscape in evening"
		}),
		/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsx("div", {
			className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto",
			children: tiers.map((t) => /* @__PURE__ */ jsxs("article", {
				className: "bg-night-light border border-white/5 rounded-2xl p-7",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "font-heading text-2xl text-white mb-2 tracking-wide",
						children: t.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-3xl font-heading text-rose mb-1",
						children: t.range
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500 mb-5",
						children: t.size
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: t.includes.map((i) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-2 text-sm text-gray-300",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-aurora-green mt-0.5",
								children: "✓"
							}), /* @__PURE__ */ jsx("span", { children: i })]
						}, i))
					})
				]
			}, t.title))
		}), /* @__PURE__ */ jsx("p", {
			className: "text-center text-xs text-gray-500 mt-8 max-w-3xl mx-auto",
			children: lang === "fi" ? "Hinnat ovat markkinaestimaatteja vuoden 2026 alusta. Yksittäiset suunnittelijat ja venuet hinnoittelevat itsenäisesti — pyydä konkreettinen tarjous yhteydenottolomakkeella." : "Prices are market estimates as of early 2026. Individual planners and venues set their own pricing — request an actual quote via the contact form."
		})] })
	] });
}
//#endregion
//#region src/pages/Contact.tsx
function Contact() {
	const { lang, tr } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(SEO, {
			title: lang === "fi" ? "Ota yhteyttä — pyydä 3 tarjousta | LaplandWeddings" : "Contact — get 3 quotes | LaplandWeddings",
			description: lang === "fi" ? "Kerro lyhyesti unelmasi. Välitämme tiedustelusi 3:lle Lapin hääsuunnittelijalle. Vastaus 1–7 päivän sisällä, maksuton ja sitoumukseton." : "Tell us briefly about your dream. We pass your enquiry to 3 Lapland wedding planners. Response in 1–7 days, free and with no commitment.",
			path: "/contact"
		}),
		/* @__PURE__ */ jsx(PageHero, {
			compact: true,
			eyebrow: lang === "fi" ? "Yhteydenotto" : "Contact",
			title: tr.contact.title,
			subtitle: tr.contact.subtitle,
			image: "https://theranch.fi/wp-content/uploads/2025/02/wedding-oraganizer-bg-theranch.jpg",
			imageAlt: lang === "fi" ? "Vihkitilanne kynttilän valossa" : "Wedding ceremony lit by candles"
		}),
		/* @__PURE__ */ jsx(Section, {
			title: tr.contact.formTitle,
			subtitle: tr.contact.formSub,
			children: /* @__PURE__ */ jsx(LeadForm, {})
		})
	] });
}
//#endregion
//#region src/pages/Checklist.tsx
/**
* Printable DVV Marriage Licence Checklist for Foreign Couples Marrying in Lapland.
*
* Lead-magnet content: a one-page checklist couples can print or save as PDF
* via browser print. Optimised print CSS injected via <style> below.
*/
function Checklist() {
	const { lang } = useLang();
	useEffect(() => {
		const id = "checklist-print-style";
		if (!document.getElementById(id)) {
			const style = document.createElement("style");
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
	const isFi = lang === "fi";
	const t = isFi ? {
		seoTitle: "DVV-tarkistuslista — vihille Lapissa | LaplandWeddings",
		seoDesc: "Yksisivuinen tarkistuslista ulkomaalaiselle pareille jotka aikovat vihille Suomen Lapissa. DVV-paperit, todistajat, vihkijä — printtaa PDF:nä.",
		eyebrow: "Lead magnet",
		title: "Vihille Lapissa — DVV-tarkistuslista ulkomaalaisille pareille",
		subtitle: "Tämä yksisivuinen tarkistuslista käy läpi kaikki paperit ja askeleet, jotka tarvitaan kun ulkomaalainen pari haluaa vihille Suomen Lapissa. Printtaa tai tallenna PDF:nä matkalle.",
		printBtn: "Tulosta tai tallenna PDF",
		downloadBtn: "Lataa PDF",
		intro: "Suomi sallii ulkomaalaisten avioliiton helposti — paperit kestävät 3–5 viikkoa DVV:n kautta. Aloita prosessi vähintään 2 kuukautta ennen vihkimistä.",
		sectionA: "A · Aloitus 8 viikkoa ennen",
		sectionB: "B · 4–6 viikkoa ennen",
		sectionC: "C · Vihkimisviikko",
		sectionD: "D · Vihkimisen jälkeen",
		printNote: "Tämä sivu on optimoitu tulostettavaksi A4-arkille. Paina Tulosta tai tallenna PDF.",
		items: [
			{
				sec: "A",
				do: "Hae avioliiton esteiden tutkinta DVV:ltä",
				why: "Tarvitset tämän jotta vihkimys voidaan toimittaa. Maksuton.",
				link: {
					url: "https://dvv.fi/en/examination-of-impediments-to-marriage",
					label: "DVV — Examination of impediments"
				}
			},
			{
				sec: "A",
				do: "Pyydä Certificate of No Impediment kotimaastasi",
				why: "Useimmissa maissa vaadittavat lisäpaperit. Apostille-leima ja valallinen käännös, jos kieli ei ole englanti, suomi tai ruotsi."
			},
			{
				sec: "A",
				do: "Ota yhteyttä hääsuunnittelijaan tai venueen",
				why: "He varmistavat vihkijän, todistajat ja paperisuunnitelman."
			},
			{
				sec: "B",
				do: "Lähetä CNI + esteiden tutkinta DVV:lle",
				why: "DVV vahvistaa että voitte vihkiä. 3–5 viikkoa ulkomaalaisille."
			},
			{
				sec: "B",
				do: "Vahvista vihkijä ja hänen kielitaito",
				why: "Englanninkielinen vihkijä järjestyy yleensä suunnittelijan kautta."
			},
			{
				sec: "B",
				do: "Varmista 2 todistajaa",
				why: "Suomen laki vaatii kaksi. Ei tarvitse olla suomalaisia. Useimmat venuet järjestävät paikan päältä."
			},
			{
				sec: "C",
				do: "Tarkista lentokenttäkuljetukset ja vieraiden majoitukset",
				why: "Lapin pakkanen voi yllättää — vieraille lämmin saapumispiste tärkeä."
			},
			{
				sec: "C",
				do: "Vahvista vihkimys-aikataulu venuelta",
				why: "Lumikappelit ovat lämpötilassa -3…-7 °C — seremoniat 15–30 min."
			},
			{
				sec: "D",
				do: "Hae 2 virallista vihkimistodistusta englanniksi",
				why: "Tarvitaan kotimaan rekisteröintiin. DVV:ltä."
			},
			{
				sec: "D",
				do: "Apostille-leima DVV:llä",
				why: "Tunnustaa avioliiton kotimaassasi."
			},
			{
				sec: "D",
				do: "Rekisteröi avioliitto kotimaassasi",
				why: "EU-maissa yleensä kuukauden sisällä. Tämän jälkeen avioliitto pätee globaalisti."
			}
		]
	} : {
		seoTitle: "DVV Wedding Checklist for Foreign Couples | LaplandWeddings",
		seoDesc: "A one-page checklist for foreign couples planning to marry in Finnish Lapland. DVV paperwork, witnesses, officiant — print as PDF.",
		eyebrow: "Lead magnet",
		title: "Marrying in Lapland — DVV checklist for foreign couples",
		subtitle: "A one-page checklist covering every document and step required when a foreign couple wants to marry in Finnish Lapland. Print or save as PDF for your travel folder.",
		printBtn: "Print or save as PDF",
		downloadBtn: "Download PDF",
		intro: "Finland makes foreign weddings simple — paperwork takes 3–5 weeks via the DVV. Begin the process at least 2 months before the wedding.",
		sectionA: "A · 8 weeks before",
		sectionB: "B · 4–6 weeks before",
		sectionC: "C · The wedding week",
		sectionD: "D · After the wedding",
		printNote: "This page is optimised for A4 print. Hit Print or save as PDF.",
		items: [
			{
				sec: "A",
				do: "Request the Examination of Impediments from DVV",
				why: "Needed before the ceremony can be performed. Free of charge.",
				link: {
					url: "https://dvv.fi/en/examination-of-impediments-to-marriage",
					label: "DVV — Examination of impediments"
				}
			},
			{
				sec: "A",
				do: "Request a Certificate of No Impediment from your home country",
				why: "Required in most countries. Include apostille and a sworn translation if the document is not in English, Finnish or Swedish."
			},
			{
				sec: "A",
				do: "Engage a Lapland wedding planner or venue",
				why: "They confirm the officiant, witnesses and paperwork plan."
			},
			{
				sec: "B",
				do: "Send the CNI + impediments examination to DVV",
				why: "DVV confirms you may marry. 3–5 weeks for foreign couples."
			},
			{
				sec: "B",
				do: "Confirm the officiant and their language skills",
				why: "An English-speaking officiant is normally arranged by your planner."
			},
			{
				sec: "B",
				do: "Secure 2 witnesses",
				why: "Finnish law requires exactly two. They do not need to be Finnish. Most venues arrange them on site."
			},
			{
				sec: "C",
				do: "Confirm airport transfers and guest accommodation",
				why: "Lapland cold can surprise — a warm arrival point matters for guests."
			},
			{
				sec: "C",
				do: "Confirm the ceremony timing with the venue",
				why: "Snow chapels operate at –3 to –7 °C — keep ceremonies 15–30 min."
			},
			{
				sec: "D",
				do: "Collect 2 official marriage certificates in English",
				why: "Required for home-country registration. From DVV."
			},
			{
				sec: "D",
				do: "Get an apostille from the DVV",
				why: "Required for recognition in your home country."
			},
			{
				sec: "D",
				do: "Register the marriage in your home country",
				why: "In EU countries usually within a month. After this the marriage is globally valid."
			}
		]
	};
	const sections = [
		{
			key: "A",
			title: t.sectionA
		},
		{
			key: "B",
			title: t.sectionB
		},
		{
			key: "C",
			title: t.sectionC
		},
		{
			key: "D",
			title: t.sectionD
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: t.seoTitle,
		description: t.seoDesc,
		path: "/checklist/dvv-foreign-couples"
	}), /* @__PURE__ */ jsxs("div", {
		className: "checklist-print bg-white text-night max-w-4xl mx-auto px-5 sm:px-10 py-12 sm:py-16",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-3 mb-8",
				"data-print-hide": true,
				children: [/* @__PURE__ */ jsxs("button", {
					onClick: print,
					className: "inline-flex items-center gap-2 bg-rose hover:bg-pink text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors",
					children: [/* @__PURE__ */ jsx(Printer, { className: "w-4 h-4" }), t.printBtn]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-gray-500",
					children: t.printNote
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "uppercase tracking-[0.3em] text-[11px] sm:text-xs text-aurora-pink font-semibold mb-2",
				children: t.eyebrow
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-heading text-3xl sm:text-4xl text-night mb-3 leading-tight tracking-wide",
				children: t.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-base sm:text-lg text-gray-700 leading-relaxed mb-8",
				children: t.subtitle
			}),
			/* @__PURE__ */ jsx("div", {
				className: "bg-pink/5 border-l-4 border-rose px-5 py-4 rounded-r-lg mb-10",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-[15px] text-gray-800 leading-relaxed",
					children: t.intro
				})
			}),
			sections.map((sec) => {
				const items = t.items.filter((it) => it.sec === sec.key);
				return /* @__PURE__ */ jsxs("section", {
					className: "mb-10",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-heading text-2xl text-night mb-4 tracking-wide border-b border-gray-200 pb-2",
						children: sec.title
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-4",
						children: items.map((it, i) => /* @__PURE__ */ jsxs("li", {
							className: "step flex gap-4 pt-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "step-num shrink-0 w-7 h-7 rounded-full bg-rose/15 text-rose font-bold text-sm flex items-center justify-center mt-0.5",
								children: "☐"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-base sm:text-[17px] font-semibold text-night mb-1.5 leading-snug",
										children: it.do
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-gray-700 leading-relaxed",
										children: it.why
									}),
									it.link && /* @__PURE__ */ jsxs("a", {
										href: it.link.url,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-xs text-aurora-pink hover:underline mt-1.5 inline-block",
										children: [it.link.label, " →"]
									})
								]
							})]
						}, i))
					})]
				}, sec.key);
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "border-t border-gray-200 pt-6 mt-10 text-xs text-gray-500 leading-relaxed",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-semibold text-night mb-1",
					children: "LaplandWeddings.online"
				}), /* @__PURE__ */ jsx("p", { children: isFi ? "Osa LaplandVibes-verkostoa · info@laplandvibes.com · Päivitetty 2026" : "Part of the LaplandVibes network · info@laplandvibes.com · Updated 2026" })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-10 pt-8 border-t border-gray-200 text-center",
				"data-print-hide": true,
				children: /* @__PURE__ */ jsx("a", {
					href: isFi ? "/fi" : "/",
					className: "inline-flex items-center px-6 py-3 bg-night text-white font-semibold rounded-full hover:bg-night-light transition-colors",
					children: "← LaplandWeddings.online"
				})
			})
		]
	})] });
}
//#endregion
//#region src/pages/legal/Privacy.tsx
function Privacy() {
	const { lang } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: lang === "fi" ? "Tietosuoja | LaplandWeddings" : "Privacy | LaplandWeddings",
		description: "Privacy policy",
		path: "/privacy"
	}), /* @__PURE__ */ jsx(Section, {
		title: lang === "fi" ? "Tietosuojaseloste" : "Privacy Policy",
		children: /* @__PURE__ */ jsx("div", {
			className: "prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4",
			children: lang === "fi" ? /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("p", { children: [
					"Rekisterinpitäjä: ",
					/* @__PURE__ */ jsx("strong", { children: "Lapeso Oy" }),
					", info@laplandvibes.com."
				] }),
				/* @__PURE__ */ jsx("p", { children: "Käytämme yhteydenottolomakkeen tietoja vain sinun tiedustelusi käsittelyyn ja sen välittämiseen yhteistyökumppaneillemme (hääsuunnittelijoille)." }),
				/* @__PURE__ */ jsx("p", { children: "Säilytämme tietoja enintään 24 kuukautta. Voit pyytää tietojesi poistamista kirjoittamalla osoitteeseen info@laplandvibes.com." }),
				/* @__PURE__ */ jsx("p", { children: "Käytämme Google Analytics 4:ää anonymisoituna kävijämääräarvioille." })
			] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("p", { children: [
					"Controller: ",
					/* @__PURE__ */ jsx("strong", { children: "Lapeso Oy" }),
					", info@laplandvibes.com."
				] }),
				/* @__PURE__ */ jsx("p", { children: "We use the contact form data only to process your enquiry and forward it to our partners (wedding planners)." }),
				/* @__PURE__ */ jsx("p", { children: "We retain data for up to 24 months. You may request deletion of your data by writing to info@laplandvibes.com." }),
				/* @__PURE__ */ jsx("p", { children: "We use Google Analytics 4 anonymised for visitor estimates." })
			] })
		})
	})] });
}
//#endregion
//#region src/pages/legal/Terms.tsx
function Terms() {
	const { lang } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: lang === "fi" ? "Käyttöehdot | LaplandWeddings" : "Terms of Use | LaplandWeddings",
		description: "Terms of use",
		path: "/terms"
	}), /* @__PURE__ */ jsx(Section, {
		title: lang === "fi" ? "Käyttöehdot" : "Terms of Use",
		children: /* @__PURE__ */ jsx("div", {
			className: "prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4",
			children: lang === "fi" ? /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("p", { children: "LaplandWeddings.online on Lapeso Oy:n ylläpitämä infosivusto. Emme ole hääsuunnittelutoimisto — välitämme tiedustelut yhteistyökumppaneillemme." }),
				/* @__PURE__ */ jsx("p", { children: "Sivuston tiedot kerätty hääsuunnittelijoiden ja venuejen julkisilta sivuilta. Hinnat ja saatavuus vaihtelevat — pyydä aina vahvistus toimittajalta." }),
				/* @__PURE__ */ jsx("p", { children: "LaplandWeddings ei ole vastuussa kolmansien osapuolten (planneri, venue, valokuvaaja) toiminnasta tai sopimusten täyttymisestä." })
			] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("p", { children: "LaplandWeddings.online is an information site operated by Lapeso Oy. We are not a wedding planning agency — we route enquiries to partners." }),
				/* @__PURE__ */ jsx("p", { children: "Information is sourced from public planner and venue pages. Prices and availability change — always confirm with the supplier." }),
				/* @__PURE__ */ jsx("p", { children: "LaplandWeddings is not responsible for the actions or contractual performance of third parties (planners, venues, photographers)." })
			] })
		})
	})] });
}
//#endregion
//#region src/pages/legal/CookiePolicy.tsx
function CookiePolicy() {
	const { lang } = useLang();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: lang === "fi" ? "Evästeseloste | LaplandWeddings" : "Cookie Policy | LaplandWeddings",
		description: "Cookie policy",
		path: "/cookie-policy"
	}), /* @__PURE__ */ jsx(Section, {
		title: lang === "fi" ? "Evästeseloste" : "Cookie Policy",
		children: /* @__PURE__ */ jsx("div", {
			className: "prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4",
			children: lang === "fi" ? /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("p", { children: "Käytämme välttämättömiä evästeitä sivuston toiminnan vuoksi (kielivalinta, suostumukset)." }),
				/* @__PURE__ */ jsx("p", { children: "Suostumuksella käytämme Google Analytics 4 -palvelua kävijämäärien analysointiin." }),
				/* @__PURE__ */ jsx("p", { children: "Et tarvitse suostumustasi mainonnan kohdistamiseen — emme käytä mainosseurantaa." })
			] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("p", { children: "We use strictly necessary cookies for site function (language preference, consent)." }),
				/* @__PURE__ */ jsx("p", { children: "With your consent we use Google Analytics 4 for visitor analytics." }),
				/* @__PURE__ */ jsx("p", { children: "We do not use advertising tracking — your consent is not required for ad targeting." })
			] })
		})
	})] });
}
//#endregion
//#region src/routes.tsx
var locationSlugs = locations.map((l) => l.slug);
var typeSlugs = weddingTypes.map((t) => t.slug);
var venueSlugs = venues.map((v) => v.slug);
/** Child routes shared between EN root (`/`) and FI prefix (`/fi`). */
var sharedChildren = [
	{
		index: true,
		Component: Home,
		entry: "src/pages/Home.tsx"
	},
	{
		path: "locations",
		Component: Locations,
		entry: "src/pages/Locations.tsx"
	},
	{
		path: "locations/:slug",
		Component: LocationPage,
		entry: "src/pages/LocationPage.tsx",
		getStaticPaths: () => locationSlugs
	},
	{
		path: "wedding-types",
		Component: WeddingTypesIndex,
		entry: "src/pages/WeddingTypesIndex.tsx"
	},
	{
		path: "wedding-types/:slug",
		Component: WeddingTypePage,
		entry: "src/pages/WeddingTypePage.tsx",
		getStaticPaths: () => typeSlugs
	},
	{
		path: "venues",
		Component: Venues,
		entry: "src/pages/Venues.tsx"
	},
	{
		path: "venues/:slug",
		Component: VenuePage,
		entry: "src/pages/VenuePage.tsx",
		getStaticPaths: () => venueSlugs
	},
	{
		path: "planners",
		Component: Planners,
		entry: "src/pages/Planners.tsx"
	},
	{
		path: "photographers",
		Component: Photographers,
		entry: "src/pages/Photographers.tsx"
	},
	{
		path: "practical-guide",
		Component: PracticalGuide,
		entry: "src/pages/PracticalGuide.tsx"
	},
	{
		path: "pricing",
		Component: Pricing,
		entry: "src/pages/Pricing.tsx"
	},
	{
		path: "contact",
		Component: Contact,
		entry: "src/pages/Contact.tsx"
	},
	{
		path: "checklist/dvv-foreign-couples",
		Component: Checklist,
		entry: "src/pages/Checklist.tsx"
	},
	{
		path: "privacy",
		Component: Privacy,
		entry: "src/pages/legal/Privacy.tsx"
	},
	{
		path: "terms",
		Component: Terms,
		entry: "src/pages/legal/Terms.tsx"
	},
	{
		path: "cookie-policy",
		Component: CookiePolicy,
		entry: "src/pages/legal/CookiePolicy.tsx"
	}
];
//#endregion
//#region src/main.tsx
var createRoot = ViteReactSSG({ routes: [
	{
		path: "/",
		Component: Layout,
		entry: "src/components/Layout.tsx",
		children: sharedChildren
	},
	{
		path: "/fi",
		Component: Layout,
		entry: "src/components/Layout.tsx",
		children: sharedChildren
	},
	{
		path: "*",
		Component: NotFound,
		entry: "src/pages/NotFound.tsx"
	}
] });
//#endregion
export { createRoot };
