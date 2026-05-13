import { binotype } from "@binotype/model"
import { VNode } from "@stencil/core"
import { describe, expect, h, it, render } from "@stencil/vitest"

describe("binotype-site", () => {
	it.each([
		{ name: "empty", content: <binotype-site></binotype-site> },
		{
			name: "simple",
			content: (
				<binotype-site
					site={
						{
							url: "https://example.com",
							language: "en-US",
							title: "Example",
							tagline: "Simple test site",
							design: {},
							page: {}
						} satisfies binotype.Site<VNode>
					}></binotype-site>
			)
		}
	])("renders $name", async ({ content }) => await expect((await render(content)).root).toMatchSnapshot())
})
