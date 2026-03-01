import { PrerenderConfig } from "@stencil/core"

export const config: PrerenderConfig = {
	entryUrls: ["/"],
	crawlUrls: true,
	hydrateOptions(url) {
		return {
			prettyHtml: false,
			timeout: 20000,
			removeScripts: true,
			removeUnusedStyles: true,
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
