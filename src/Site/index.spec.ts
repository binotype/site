import { describe, expect, it } from "vitest"
import { Site } from "./index"

describe("binotype.Site", () => {
	it.each([
		{
			url: "https://example.com",
			language: "en-US",
			title: "Test Site",
			tagline: "A test tagline",
			description: "A test description",
			keywords: ["test", "example", "site"],
			author: "Test Author",
			design: {
				logotype: "/logo.svg",
				icon: "/favicon.ico",
				navigation: "header",
				styles: ["/style.css"],
				scripts: ["/script.js"],
				home: {
					mode: "header",
					section: "article",
				},
				list: {
					mode: "summary",
				},
			},
			page: {
				pages: {
					about: {
						title: "About",
						content: "<p>About page content</p>",
					},
				},
			},
		},
		{
			url: "https://example.com",
			language: "en-US",
			title: "Minimal Site",
			tagline: "Minimal tagline",
			design: {},
			page: { pages: {} },
		},
	])("is(%s)", value => expect(Site.is(value)).toBe(true))
})
