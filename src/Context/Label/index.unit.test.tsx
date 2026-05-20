import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../../index"

describe("binotype.Context.Label", () => {
	describe("Label.get", () => {
		it("should return a Label for a valid Title", () =>
			expect(
				binotype.Clean.clean(binotype.Context.Label.get({ short: "Short", long: <Fragment>Long</Fragment> }))
			).toMatchSnapshot())
		it("should return undefined for undefined Title", () =>
			expect(binotype.Context.Label.get(undefined)).toBeUndefined())
		it("should return correct plain and formatted values", () => {
			const title: binotype.Title = { short: "S", long: <Fragment>L</Fragment> }
			const label = binotype.Context.Label.get(title)
			expect(label?.plain).toBe("S")
			expect(label?.formatted).toMatchInlineSnapshot(`
				{
				  "$attrs$": {
				    "__self": [Object],
				    "__source": {
				      "columnNumber": 54,
				      "fileName": "/home/smika/versioned/binotype/site/src/Context/Label/index.unit.test.tsx",
				      "lineNumber": 14,
				    },
				  },
				  "$children$": [
				    {
				      "$attrs$": null,
				      "$children$": null,
				      "$elm$": null,
				      "$flags$": 0,
				      "$key$": null,
				      "$name$": null,
				      "$tag$": null,
				      "$text$": "L",
				    },
				  ],
				  "$elm$": null,
				  "$flags$": 0,
				  "$key$": null,
				  "$name$": null,
				  "$tag$": undefined,
				  "$text$": null,
				}
			`) // Implementation uses Title.get(title, "long")
		})
	})
})
