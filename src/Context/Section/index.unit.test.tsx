import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../../index"

describe("binotype.Context.Section", () => {
	describe("Section.load", () => {
		it("should return undefined for undefined block", () =>
			expect(binotype.Context.Section.load(undefined, binotype.Path.parse("/test"), {})).toBeUndefined())
		it("should handle simple block object", () =>
			expect(
				binotype.Context.Section.load(
					{ mode: "full", class: ["main"], meta: {}, content: <Fragment>Block content</Fragment> },
					binotype.Path.parse("/b1"),
					{}
				)
			).toMatchSnapshot())
		it("should handle blocks as record", () =>
			expect(
				binotype.Context.Section.load(
					{
						b1: { mode: "full", class: ["main"], meta: {}, content: <Fragment>Block content 1</Fragment> },
						b2: { mode: "full", class: ["side"], meta: {}, content: <Fragment>Block content 2</Fragment> }
					} satisfies Record<string, binotype.Block>,
					binotype.Path.parse("/"),
					{}
				)
			).toMatchSnapshot())
		it("should handle fallback mode", () =>
			expect(
				binotype.Context.Section.load(
					{ class: ["main"], meta: {}, content: <Fragment>Block content</Fragment> },
					binotype.Path.parse("/b1"),
					{ mode: "header" }
				)
			).toMatchSnapshot())
	})
	describe("Section.convert", () =>
		it("should convert Section to object", () =>
			expect(
				binotype.Clean.clean(
					binotype.Context.Section.toObject(
						binotype.Context.Section.load(
							{ mode: "full", class: ["main"], meta: {}, content: <Fragment>Block content</Fragment> },
							binotype.Path.parse("/b1"),
							{}
						)
					) as unknown
				)
			).toMatchSnapshot()))
})
