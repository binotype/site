import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../../index"

describe("binotype.Context.Article", () => {
	describe("Article.load", () => {
		it.each([
			{ name: "undefined page", path: binotype.Path.parse("/test"), fallback: undefined },
			{
				name: "simple page object",
				page: { mode: "full", content: <Fragment>Test content</Fragment> } as binotype.Page,
				path: binotype.Path.parse("/p1")
			},
			{
				name: "page with articles array",
				page: {
					p1: { mode: "full", content: <Fragment>Test content 1</Fragment> },
					p2: { mode: "full", content: <Fragment>Test content 2</Fragment> }
				} as Record<string, binotype.Page | undefined>,
				path: binotype.Path.parse("/")
			},
			{
				name: "reduction mode",
				page: { mode: "full", content: <Fragment>Test content</Fragment> } as binotype.Page,
				path: binotype.Path.parse("/p1"),
				fallback: { list: "full" as binotype.Mode }
			}
		] satisfies {
			name: string
			page?: binotype.Page
			path: binotype.Path
			fallback?: { mode?: binotype.Mode; list?: binotype.Mode }
		}[])("($name)", ({ page, path, fallback }) =>
			expect(binotype.Context.Article.load(page as binotype.Page, path, fallback ?? {})).toMatchSnapshot())
	})
	describe("Article.convert", () => {
		it.each([
			{
				name: "article to object",
				page: { mode: "full", content: <Fragment>Test content</Fragment> } as binotype.Page,
				path: binotype.Path.parse("/p1")
			}
		] satisfies { name: string; page: binotype.Page; path: binotype.Path }[])("($name)", ({ page, path }) =>
			expect(
				binotype.Context.Article.toObject(binotype.Context.Article.load(page, path, {}))
			).toMatchSnapshot())
	})
	describe("binotype.Context.Article.load", () => {
		it.each([
			{
				name: "basic page with string content",
				page: { title: "Test Article", content: <Fragment>This is the article content.</Fragment> },
				path: binotype.Path.parse("/test"),
				fallback: { mode: "full", list: "full" }
			},
			{
				name: "page with object content (sections)",
				page: {
					title: "Page with Sections",
					blocks: {
						intro: { title: "Introduction", content: <Fragment>Intro content</Fragment>, weight: 1 },
						main: { title: "Main Section", content: <Fragment>Main content</Fragment>, weight: 2 }
					}
				},
				path: binotype.Path.parse("/sections"),
				fallback: { mode: "full", list: "full" }
			},
			{
				name: "page with sub-pages (articles)",
				page: {
					title: "Blog",
					pages: {
						post1: { title: "First Post", published: "2024-01-01T10:00:00Z", content: <Fragment>First post content</Fragment> },
						post2: { title: "Second Post", published: "2024-01-02T10:00:00Z", content: <Fragment>Second post content</Fragment> },
						draft: { title: "Draft Post", draft: true, content: <Fragment>Draft content</Fragment> }
					}
				},
				path: binotype.Path.parse("/blog"),
				fallback: { mode: "full", list: "full" }
			},
			{
				name: "page with both string content and mode body",
				page: { title: "Body Article", content: <Fragment>This content should be shown.</Fragment> },
				path: binotype.Path.parse("/body"),
				fallback: { mode: "body" }
			},
			{
				name: "page with mode header (no content shown)",
				page: { title: "Header Only", content: <Fragment>This content should not be shown.</Fragment> },
				path: binotype.Path.parse("/header"),
				fallback: { mode: "header" }
			}
		] satisfies {
			name: string
			page: binotype.Page
			path: binotype.Path
			fallback: { mode?: binotype.Mode; list?: binotype.Mode }
		}[])("($name)", ({ page, path, fallback }) =>
			expect(
				binotype.Clean.clean(
					binotype.Context.Article.toObject(binotype.Context.Article.load(page, path, fallback)) as unknown
				)
			).toMatchSnapshot())
	})
})
