import { PrerenderConfig } from "@stencil/core"

export const config: PrerenderConfig = {
	entryUrls: ["/", "/profile/stencil"],
	crawlUrls: true,
	hydrateOptions(url) {
		return {
			prettyHtml: true,
			timeout: 20000,
			removeScripts: false,
			removeUnusedStyles: false,
			// staticComponents: ["binotype-site"],
			console: {
				error: (msg: any) => console.error(`[${url}] Error:`, msg),
				log: (msg: any) => console.log(`[${url}] Log:`, msg),
				warn: (msg: any) => console.warn(`[${url}] Warning:`, msg),
			},
			staticDocument: true,
		}
	},
	afterHydrate(document, url) {
		const site = document.querySelector("binotype-site")
		// site?.replaceWith(...site.childNodes)
		if (site) {
			document.body.append(...site.childNodes)
			document.body.removeChild(site)
		}
		console.log(`✅ Finished prerender for: ${url}`)
		return document
	},
}
