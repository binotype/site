import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../index"

describe("binotype.Block", () => {
	it.each([
		{ name: "minimal block with string content", block: { content: <p>Sample content</p> } },
		{ name: "minimal block with empty string content", block: { content: <Fragment></Fragment> } },
		{
			name: "block with all optional properties",
			block: { weight: 10, title: "Section Title", menu: false, type: "article", content: <p>Full section content</p> }
		},
		{
			name: "block with title as object",
			block: { title: { short: "Short", long: <Fragment>Long Title</Fragment> }, content: <p>Content with object title</p> }
		},
		{
			name: "block with nested blocks as content",
			block: {
				weight: 5,
				blocks: {
					subsection1: { content: <p>Nested content 1</p> },
					subsection2: { title: "Sub Title", content: <p>Nested content 2</p> }
				}
			}
		},
		{
			name: "block with deeply nested blocks",
			block: { blocks: { level1: { blocks: { level2: { content: <p>Deep nesting works</p> } } } } }
		},
		{ name: "block with zero weight", block: { weight: 0, content: <p>Zero weight section</p> } },
		{
			name: "block with explicit undefined optional properties",
			block: {
				weight: undefined,
				title: undefined,
				menu: undefined,
				type: undefined,
				content: <p>Explicit undefined properties</p>
			}
		},
		{ name: "missing content property", block: { weight: 10, title: "Title" } },
		{ name: "null as content", block: { content: null } },
		{ name: "menu as string", block: { menu: "Label", content: <p>Valid content</p> } },
		{ name: "menu as true", block: { menu: true, content: <p>Valid content</p> } },
		{ name: "array as content", block: { content: [<Fragment>not</Fragment>, <Fragment>allowed</Fragment>] } },
		{ name: "completely empty object", block: {} }
	])("is valid: $name", ({ block }) => expect(binotype.Block.is(block)).toBe(true))

	it.each([
		{ name: "number as content", block: { content: 123 } },
		{ name: "invalid weight as string", block: { weight: "10", content: <Fragment>Valid content</Fragment> } },
		{ name: "invalid weight as null", block: { weight: null, content: <Fragment>Valid content</Fragment> } },
		{ name: "invalid title as number", block: { title: 123, content: <Fragment>Valid content</Fragment> } },
		{
			name: "invalid title object missing short",
			block: { title: { long: "Long only" }, content: <Fragment>Valid content</Fragment> }
		},
		{
			name: "invalid title object missing long",
			block: { title: { short: "Short only" }, content: <Fragment>Valid content</Fragment> }
		},
		{ name: "invalid type as number", block: { type: 123, content: <Fragment>Valid content</Fragment> } },
		{ name: "invalid type as boolean", block: { type: true, content: <Fragment>Valid content</Fragment> } },
		{
			name: "nested section with invalid content",
			block: {
				blocks: {
					subblock: {
						content: 123 // invalid content type
					}
				}
			}
		},
		{ name: "null object", block: null },
		{ name: "undefined object", block: undefined },
		{ name: "string instead of object", block: "not an object" },
		{ name: "array instead of object", block: [] }
	] satisfies { name: string; block: any }[])("is invalid: $name", ({ block }) => {
		expect(binotype.Block.is(block)).toBe(false)
	})
})
