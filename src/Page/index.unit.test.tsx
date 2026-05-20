import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../index"

describe("binotype.Page", () => {
	describe("locate", () => {
		it("should return the page for an empty path", () => {
			const page: binotype.Page = { mode: "full", class: [], meta: {}, content: <Fragment>Root content</Fragment> }
			const path = binotype.Path.parse("")
			expect(binotype.Page.locate(page, path)).toBe(page)
		})
		it("should return undefined for missing nested page", () => {
			const page: binotype.Page = {
				mode: "full",
				class: [],
				meta: {},
				content: <Fragment>Root content</Fragment>,
				pages: {}
			}
			const path = binotype.Path.parse("/missing")
			expect(binotype.Page.locate(page, path)).toBeUndefined()
		})
		it("should locate nested pages by path", () => {
			const page: binotype.Page = {
				mode: "full",
				class: [],
				meta: {},
				content: <Fragment>Root content</Fragment>,
				pages: {
					child: { mode: "full", class: [], meta: { id: "child" }, content: <Fragment>Child content</Fragment> }
				}
			}
			const path = binotype.Path.parse("/child")
			expect(binotype.Page.locate(page, path)?.meta?.id).toBe("child")
		})
	})
	describe("toArray", () => {
		it("should filter out draft and future pages", () => {
			const now = new Date().toISOString()
			const pages: Record<string, binotype.Page> = {
				p1: { mode: "full", class: [], meta: { id: "p1" }, content: <Fragment>A</Fragment>, draft: true },
				p2: {
					mode: "full",
					class: [],
					meta: { id: "p2" },
					content: <Fragment>B</Fragment>,
					published: "2999-01-01T00:00:00Z"
				},
				p3: { mode: "full", class: [], meta: { id: "p3" }, content: <Fragment>C</Fragment>, published: now }
			}
			const pageArray = binotype.Page.toArray(pages)
			expect(pageArray.length).toBe(1)
			expect(pageArray[0]?.meta?.id).toBe("p3")
		})
	})
	describe("hasPages", () => {
		it("should return true if pages exist", () => {
			const page: binotype.Page = {
				mode: "full",
				class: [],
				meta: {},
				content: <Fragment>Root</Fragment>,
				pages: { a: { mode: "full", class: [], meta: { id: "a" }, content: <Fragment>A</Fragment> } }
			}
			expect(binotype.Page.hasPages(page)).toBe(true)
		})
		it("should return false if no pages", () => {
			const page: binotype.Page = { mode: "full", class: [], meta: { id: "root" }, content: <Fragment>Root</Fragment> }
			expect(binotype.Page.hasPages(page)).toBe(false)
		})
	})
	describe("flawed", () => {
		it.each([
			{
				title: "Articles",
				pages: {
					"sample-post": {
						title: "Sample Post",
						published: "2024-01-01T08:15:46+02:00",
						tags: ["sample", "placeholder"],
						content: (
							<Fragment>
								This is a sample blog post with placeholder content. Lorem ipsum dolor sit amet, consectetur adipiscing
								elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
								nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</Fragment>
						)
					},
					"another-sample": {
						published: "2024-01-15T16:12:00+02:00",
						tags: ["sample", "example"],
						title: "Another Sample Post",
						content: (
							<Fragment>
								This is another sample post with placeholder content. Duis aute irure dolor in reprehenderit in
								voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sample Section Excepteur sint occaecat
								cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</Fragment>
						)
					},
					"draft-post": {
						draft: true,
						tags: ["draft"],
						title: "Draft Post",
						content: <Fragment>This is a draft post placeholder.</Fragment>
					}
				}
			},
			{
				title: "Home",
				blocks: {
					section1: {
						title: "Welcome to My Blog",
						menu: false,
						weight: 0,
						content: (
							<Fragment>
								This is the home page of my sample blog. Here you can find articles on various topics related to
								software development, technology, and professional insights.
							</Fragment>
						)
					},
					section2: {
						title: "Latest Articles",
						weight: 1,
						content: <Fragment>Check out the latest articles below: - Sample Post - Another Sample Post</Fragment>
					}
				}
			},
			{ title: "Talks", pages: {} },
			{
				title: "About",
				content: (
					<Fragment>
						I am [Your Name], and I create things. Professionally I create software products. I live in [Your City],
						[Your Country] with my family. I write about building software and building companies. Currently, I help
						companies as a consultant. If you are interested in my services please contact me. You can find out more
						about me on my page on LinkedIn and on GitHub.
					</Fragment>
				)
			},
			{
				title: "Contact",
				menu: false,
				content: (
					<Fragment>
						Don't hesitate to contact me with ideas, suggestions and opinions. I look forward to hear from you.
					</Fragment>
				)
			},
			{
				title: "Description",
				menu: false,
				content: (
					<Fragment>
						Sample blog contains articles on subjects such as software development, technology and professional topics.
						The articles convey experiences and insights from professional work.
					</Fragment>
				)
			},
			{
				title: "Subscribe",
				menu: false,
				content: <Fragment>Subscribe to receive updates when new content is published.</Fragment>
			}
		] satisfies binotype.Page[])("($title)", (page: binotype.Page) => expect(binotype.Page.flawed(page)).toBe(false))
	})
})
