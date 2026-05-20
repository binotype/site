import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../index"

describe("binotype.Content", () => {
	it.each([
		{ name: "null content", content: null },
		{ name: "single node content", content: <Fragment>This is a single node content.</Fragment> },
		{
			name: "array of nodes content",
			content: <Fragment>Content of the first node.\nContent of the second node with HTML.</Fragment>
		}
	] satisfies { name: string; content: binotype.Content }[])("validate($name)", ({ content }) => {
		expect(binotype.Content.flawed(content)).toBe(false)
		expect(binotype.Content.is(content)).toBe(true)
	})
	describe("plain", () => {
		it.each([
			{ content: null, expected: undefined },
			{ content: <Fragment>hello</Fragment>, expected: "hello" },
			{ content: [<Fragment>foo</Fragment>, <Fragment>bar</Fragment>], expected: "foobar" },
			{ content: [<Fragment>a</Fragment>, <Fragment>b</Fragment>, <Fragment>c</Fragment>], expected: "abc" }
		] satisfies { content: binotype.Content; expected: string | undefined }[])("plain($content)", ({
			content,
			expected
		}) => expect(binotype.Content.plain(content)).toBe(expected))
	})
})
