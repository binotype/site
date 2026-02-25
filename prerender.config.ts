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
			console: {
				error: (msg: any) => console.error(`[${url}] Error:`, msg),
				log: (msg: any) => console.log(`[${url}] Log:`, msg),
				warn: (msg: any) => console.warn(`[${url}] Warning:`, msg),
			},
		}
	},
	async beforeHydrate(document, url) {
		console.log(`⏳ Starting prerender for: ${url}`)
		return document
	},
	afterHydrate(document, url) {
		console.log(`✅ Successfully prerendered: ${url}`)
		return document
	},
}
