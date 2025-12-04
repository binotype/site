import { describe, expect, it, test } from "vitest"
import { Site } from "../../Site"
import { BinotypeSite } from "./index"

describe("binotype-site", () => {
	const validSiteData: Site = {
		url: "https://example.com",
		language: "en-US",
		title: "Test Site",
		tagline: "Test tagline",
		design: { navigation: "header" },
		page: { pages: {} },
	}

	it("should create component class", () => {
		expect(BinotypeSite).toBeDefined()
	})

	it("should have correct tag name", () => {
		// Basic test to verify the component exists
		const component = new BinotypeSite()
		expect(component).toBeInstanceOf(BinotypeSite)
	})

	it("should have componentWillLoad method", () => {
		const component = new BinotypeSite()
		expect(typeof component.componentWillLoad).toBe("function")
	})

	test.each([
		{
			name: "JSON string site data",
			siteValue: JSON.stringify(validSiteData),
			expectedCache: validSiteData,
		},
		{
			name: "direct site object",
			siteValue: validSiteData,
			expectedCache: validSiteData,
		},
	])("should handle $name", ({ siteValue, expectedCache }) => {
		const component = new BinotypeSite()
		component.site = siteValue
		component.componentWillLoad()
		expect(component.cache).toEqual(expectedCache)
	})

	test.each([
		{
			name: "invalid JSON string",
			siteValue: "invalid json",
		},
		{
			name: "malformed JSON object",
			siteValue: '{"invalid": json}',
		},
	])("should handle $name gracefully", ({ siteValue }) => {
		const component = new BinotypeSite()
		expect(() => {
			component.site = siteValue
			component.componentWillLoad()
		}).toThrow()
	})

	test.each([
		{
			name: "valid site",
			site: validSiteData,
			expected: true,
		},
		{
			name: "invalid site - missing title",
			site: { url: "https://example.com", language: "en-US" as any },
			expected: false,
		},
		{
			name: "invalid site - missing design",
			site: { url: "https://example.com", language: "en-US" as any, title: "Test", tagline: "Test" },
			expected: false,
		},
	])("should validate site data - $name", ({ site, expected }) => {
		expect(Site.is(site)).toBe(expected)
	})

	test.each([undefined, null])("should handle %s site prop", siteValue => {
		const component = new BinotypeSite()
		component.site = siteValue as any
		component.componentWillLoad()
		expect(component.cache).toBe(siteValue)
	})
})
