import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../index"

describe("binotype.Context", () => {
	it.each(["/", "/about", "/nonexistent", "invalid-path"])("create(site, %s)", path =>
		expect(
			binotype.Context.create(
				{
					url: "https://example.com",
					language: "en-US",
					title: "Test Site",
					tagline: "A test tagline",
					description: "A test description",
					keywords: ["test", "example", "site"],
					author: "Test Author",
					design: {
						logotype: "/logo.svg",
						icon: "/favicon.ico",
						navigation: "header",
						styles: ["/style.css"],
						scripts: ["/script.js"],
						list: "summary"
					},
					page: { pages: { about: { title: "About", content: <Fragment>About page content</Fragment> } } }
				},
				path
			)
		).toMatchSnapshot())

	it.each([
		{ path: "/" },
		{ path: "/about" },
		{ path: "/article" },
		{ path: "/article", reduction: { list: { limit: 5 } } },
		{ path: "/article/performance-basics" }
	] satisfies { path: string; reduction?: binotype.Modes }[])("create(knowledge.example, $path, $reduction)", ({
		path,
		reduction
	}) => {
		expect(
			binotype.Clean.clean(
				binotype.Context.create(
					{
						url: "https://knowledge.example",
						language: "en-US",
						title: "Knowledge Base",
						tagline: "Guides and references",
						description: "A neutral sample site with documentation and talks for testing context generation.",
						keywords: ["knowledge", "docs", "talks", "example"],
						author: "Documentation Team",
						design: {
							logotype: "assets/logotype.svg",
							icon: "icon/favicon.ico",
							styles: ["//cdn.example.com/highlight/default.css"],
							scripts: ["//cdn.example.com/highlight/highlight.min.js", "/assets/site.js"],
							navigation: "header",
							mode: "full",
							list: "header",
							home: "article"
						},
						page: {
							pages: {
								article: {
									title: "Articles",
									pages: {
										"clear-writing": {
											title: "Clear Writing",
											subtitle: [],
											meta: {},
											published: "2024-01-10T10:00:00+00:00",
											tags: ['["writing", "communication"]'],
											content: (
												<Fragment>
													<p>Clear writing improves collaboration and maintenance in technical projects.</p>
													<quote>Use specific words and short sentences to communicate intent.</quote>
													<p>
														Consistent terminology helps teams discuss architecture and behavior with less friction.
													</p>
												</Fragment>
											),
											blocks: {},
											pages: {}
										},
										"performance-basics": {
											title: "Performance Basics",
											subtitle: [],
											meta: {},
											published: "2024-02-18T11:15:00+00:00",
											tags: ['["performance", "engineering"]'],
											content: (
												<Fragment>
													<p>Measure first, then optimize the smallest area that affects user experience.</p>
													<quote>Readable code plus profiling data is better than guesswork.</quote>
													<p>Prefer maintainable improvements that can be verified in benchmarks and tests.</p>
												</Fragment>
											),
											blocks: {},
											pages: {}
										},
										"testing-strategy": {
											title: "Testing Strategy",
											subtitle: [],
											meta: {},
											published: "2024-03-01T09:30:00+00:00",
											tags: ['["testing", "quality"]'],
											content: (
												<Fragment>
													<p>A balanced test strategy combines unit, integration, and end-to-end checks.</p>
													<quote>Test behavior and contracts rather than implementation details.</quote>
													<p>Small, focused tests make failures easier to diagnose and fix.</p>
												</Fragment>
											),
											blocks: {},
											pages: {}
										}
									}
								},
								talk: {
									title: "Talks",
									pages: {
										"frontend-patterns": {
											title: "Frontend Patterns",
											subtitle: [],
											meta: {},
											published: "2024-03-12T15:00:00+00:00",
											tags: ['["web", "patterns"]'],
											content: (
												<Fragment>
													A walkthrough of reusable patterns for maintainable UI code.
													<iframe
														style={{ width: "100%", height: "21em", maxHeight: "100vh", margin: "0" }}
														src="./talk-frontend-patterns.html"></iframe>
													<a target="blank" href="./talk-frontend-patterns.html">
														Open
													</a>{" "}
													in a new tab.
												</Fragment>
											),
											blocks: {},
											pages: {}
										}
									}
								},
								about: {
									weight: 200,
									title: "About",
									subtitle: <Fragment>About this sample site</Fragment>,
									meta: {},
									author: "Documentation Team",
									content: (
										<Fragment>
											This sample site is used to verify parsing, navigation, and rendering behavior in tests.
										</Fragment>
									),
									blocks: {},
									pages: {}
								},
								contact: {
									title: "Contact",
									subtitle: [],
									meta: { menu: "false" },
									content: (
										<Fragment>
											<form method="post">
												<label htmlFor="name">Name</label>
												<input type="text" name="name" />
												<label htmlFor="email">Email</label>
												<input type="email" name="email" />
												<label htmlFor="message">Message</label>
												<textarea name="message"></textarea>
												<button type="submit">Send</button>
											</form>
										</Fragment>
									),
									blocks: {},
									pages: {}
								},
								description: {
									title: "Description",
									subtitle: [],
									meta: { menu: "false" },
									content: <Fragment>Neutral long-form content used for context and rendering tests.</Fragment>,
									blocks: {},
									pages: {}
								},
								subscribe: {
									title: "Subscribe",
									subtitle: [],
									meta: { menu: "false" },
									content: (
										<Fragment>
											<form method="post">
												<label htmlFor="email">Email</label>
												<input type="email" name="email" />
												<button type="submit">Subscribe</button>
											</form>
										</Fragment>
									),
									blocks: {},
									pages: {}
								}
							}
						}
					},
					path
				).load(path, reduction) as unknown
			)
		).toMatchSnapshot("context.load")
	})
})
