import { render, h, describe, it, expect } from "@stencil/vitest"

describe("binotype-site", () => {
	it("renders", async () => {
		const { root } = await render(<binotype-site></binotype-site>)
		await expect(root).toEqualHtml(`
      <binotype-site class="hydrated">
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
          <section data-testid="functional-test-component">
            <h2></h2>
            <p>
              Count: 0
            </p>
          </section>
          <div style="color: green; font-size: 20px;">
            <div class="link">
              <a href="https://stenciljs.com">
                <span>
                  Visit Stencil
                </span>
              </a>
            </div>
          </div>
        </mock:shadow-root>
      </binotype-site>
    `)
	})

	it("renders with values", async () => {
		const { root } = await render(
			<binotype-site first="Stencil" middle="'Don't call me a framework'" last="JS"></binotype-site>
		)
		await expect(root).toEqualHtml(`
      <binotype-site class="hydrated">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
          <section data-testid="functional-test-component">
            <h2>
              Stencil 'Don't call me a framework' JS
            </h2>
            <p>
              Count: 0
            </p>
          </section>
          <div style="color: green; font-size: 20px;">
            <div class="link">
              <a href="https://stenciljs.com">
                <span>
                  Visit Stencil
                </span>
              </a>
            </div>
          </div>
        </mock:shadow-root>
      </binotype-site>
    `)
	})
})
