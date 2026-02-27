import { newE2EPage } from "@stencil/core/testing"

describe("binotype-site", () => {
	it("renders", async () => {
		const page = await newE2EPage()
		await page.setContent("<binotype-site></binotype-site>")
		const element = await page.find("binotype-site")
		expect(element).toHaveClass("hydrated")
	})

	it("renders error state when no site provided", async () => {
		const page = await newE2EPage()
		await page.setContent("<binotype-site></binotype-site>")

		const h1 = await page.find("binotype-site h1")
		expect(h1.textContent).toBe("Flawed Site Configuration")
	})

	it("renders with valid site data", async () => {
		const validSite = {
			url: "https://example.com",
			language: "en-US",
			title: "Test Site",
			tagline: "A test site",
			design: {
				navigation: "header",
			},
			page: {
				pages: {},
			},
		}

		const page = await newE2EPage()
		await page.setContent(`<binotype-site site='${JSON.stringify(validSite)}'></binotype-site>`)

		// Should render the page component instead of error
		const pageElement = await page.find("binotype-site binotype-page")
		expect(pageElement).toBeTruthy()

		// Should not show error message
		const errorH1 = await page.find("binotype-site h1")
		expect(errorH1).toBeFalsy()
	})

	it("updates when site property changes", async () => {
		const page = await newE2EPage()
		await page.setContent("<binotype-site></binotype-site>")

		const element = await page.find("binotype-site")

		// Initially should show error
		let h1 = await page.find("binotype-site h1")
		expect(h1.textContent).toBe("Flawed Site Configuration")

		// Update with valid site
		const validSite = {
			url: "https://example.com",
			language: "en-US",
			title: "Test Site",
			tagline: "A test site",
			design: {
				navigation: "header",
			},
			page: {
				pages: {},
			},
		}

		await element.setProperty("site", validSite)
		await page.waitForChanges()

		// Should now show page component
		const pageElement = await page.find("binotype-site binotype-page")
		expect(pageElement).toBeTruthy()

		// Error should be gone
		h1 = await page.find("binotype-site h1")
		expect(h1).toBeFalsy()
	})

	it("handles malformed JSON gracefully", async () => {
		const page = await newE2EPage()

		// This should not crash the page
		await page.setContent('<binotype-site site="invalid json"></binotype-site>')

		const h1 = await page.find("binotype-site h1")
		expect(h1.textContent).toBe("Flawed Site Configuration")
	})
})
