import { Fragment, h } from "@stencil/core"
import { describe, expect, it } from "vitest"
import { binotype } from "../../index"

describe("binotype.Context.Menu", () => {
	const baseSite: binotype.Site = {
		url: "https://example.com",
		language: "en-US",
		title: "Demo Site",
		tagline: "A neutral test tagline",
		description: "A neutral test description",
		keywords: ["demo", "example", "site"],
		author: "Editorial Team",
		design: {
			logotype: "/logo.svg",
			icon: "/favicon.ico",
			navigation: "header",
			styles: ["/style.css"],
			scripts: ["/script.js"],
			home: "article",
			list: { mode: "summary" }
		},
		page: { title: "Home" }
	}

	describe("load", () => {
		it.each([
			{ name: "empty site", site: baseSite, current: "/" },
			{
				name: "site with single page",
				site: {
					...baseSite,
					page: {
						...baseSite.page,
						pages: { overview: { title: "Overview", content: <Fragment>Overview page content</Fragment> } }
					}
				},
				current: "/"
			},
			{
				name: "site with multiple pages, current at root",
				site: {
					...baseSite,
					page: {
						...baseSite.page,
						pages: {
							overview: { title: "Overview", content: <Fragment>Overview page content</Fragment> },
							help: { title: "Help", content: <Fragment>Help page content</Fragment> },
							guides: {
								title: "Guides",
								pages: { "getting-started": { title: "Getting Started", content: <Fragment>Guide content</Fragment> } }
							}
						}
					}
				},
				current: "/"
			},
			{
				name: "site with nested pages, current at overview",
				site: {
					...baseSite,
					page: {
						...baseSite.page,
						pages: {
							overview: { title: "Overview", content: <Fragment>Overview page content</Fragment> },
							help: { title: "Help", content: <Fragment>Help page content</Fragment> },
							guides: {
								title: "Guides",
								pages: {
									"getting-started": { title: "Getting Started", content: <Fragment>Guide content</Fragment> },
									"advanced-usage": { title: "Advanced Usage", content: <Fragment>Advanced guide content</Fragment> }
								}
							}
						}
					}
				},
				current: "/overview"
			},
			{
				name: "site with nested pages, current at guide",
				site: {
					...baseSite,
					page: {
						...baseSite.page,
						pages: {
							overview: { title: "Overview", content: <Fragment>Overview page content</Fragment> },
							guides: {
								title: "Guides",
								pages: {
									"getting-started": { title: "Getting Started", content: <Fragment>Guide content</Fragment> },
									"advanced-usage": { title: "Advanced Usage", content: <Fragment>Advanced guide content</Fragment> }
								}
							}
						}
					}
				},
				current: "/guides/getting-started"
			},
			{
				name: "site with blocks and pages",
				site: {
					...baseSite,
					page: {
						title: "Home",
						blocks: {
							hero: { title: "Welcome", content: <Fragment>Hero section content</Fragment> },
							features: { title: "Features", content: <Fragment>Features section content</Fragment> }
						},
						pages: { overview: { title: "Overview", content: <Fragment>Overview page content</Fragment> } }
					}
				},
				current: "/"
			},
			{
				name: "site with menu disabled blocks",
				site: {
					...baseSite,
					page: {
						title: "Home",
						blocks: {
							hero: { title: "Welcome", content: <Fragment>Hero section content</Fragment>, menu: false },
							features: { title: "Features", content: <Fragment>Features section content</Fragment> }
						},
						pages: { overview: { title: "Overview", content: <Fragment>Overview page content</Fragment> } }
					}
				},
				current: "/"
			},
			{
				name: "knowledge base sample",
				site: {
					url: "https://knowledge.example",
					language: "en-US",
					title: "Knowledge Base",
					tagline: "Guides and references",
					description: "A neutral sample site with documentation and talks for testing menu generation.",
					keywords: ["knowledge", "docs", "talks", "example"],
					author: "Documentation Team",
					design: {
						logotype: "assets/logotype.svg",
						icon: "icon/favicon.ico",
						styles: ["//cdn.example.com/highlight/default.css"],
						scripts: ["//cdn.example.com/highlight/highlight.min.js", "/assets/site.js"],
						navigation: "header",
						list: { mode: "header" },
						home: "article"
					},
					page: {
						pages: {
							article: {
								title: "Articles",
								menu: false,
								pages: {
									clearWriting: {
										title: "Clear Writing",
										subtitle: [],
										meta: {},
										published: "2024-01-10T10:00:00+00:00",
										tags: ['["writing", "communication"]'],
										content: (
											<Fragment>
												<p>Clear writing improves collaboration and maintenance in technical projects.</p>
												<quote>Use specific words and short sentences to communicate intent.</quote>
												<p>Consistent terminology helps teams discuss architecture and behavior with less friction.</p>
											</Fragment>
										),
										blocks: {},
										pages: {}
									},
									performanceBasics: {
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
									}
								}
							},
							talk: {
								title: "Talks",
								pages: {
									frontendPatterns: {
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
								subtitle: [<Fragment>About this sample site</Fragment>],
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
								meta: {},
								menu: false,
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
								meta: {},
								menu: false,
								content: <Fragment>Neutral long-form content used for component testing.</Fragment>,
								blocks: {},
								pages: {}
							},
							subscribe: {
								title: "Subscribe",
								subtitle: [],
								meta: {},
								menu: false,
								content: <Fragment>Subscribe</Fragment>,
								blocks: {},
								pages: {}
							}
						}
					}
				},
				current: "article/performance-basics"
			}
		] satisfies { name: string; site: binotype.Site; current: string }[])("load('$name', '$current')", ({
			site,
			current
		}) => expect(binotype.Clean.clean(binotype.Context.Menu.load(site, current) as any)).toMatchSnapshot())
	})

	describe("Menu.convert", () => {
		it.each([
			{ name: "empty menu", menu: { items: [] } },
			{
				name: "menu with items",
				menu: {
					items: [
						{
							label: "Overview",
							description: <Fragment>Overview page content</Fragment>,
							url: "/overview",
							selected: undefined,
							items: []
						},
						{
							label: "Help",
							description: <Fragment>Help page content</Fragment>,
							url: "/help",
							selected: "current" as const,
							items: []
						}
					]
				}
			},
			{
				name: "menu with nested items",
				menu: {
					items: [
						{
							label: "Guides",
							description: <Fragment>Guides section</Fragment>,
							url: "/guides",
							selected: "parent" as const,
							items: [
								{
									label: "Getting Started",
									description: <Fragment>Guide content</Fragment>,
									url: "/guides/getting-started",
									selected: "current" as const,
									items: []
								}
							]
						}
					]
				}
			}
		] satisfies { name: string; menu: binotype.Context.Menu }[])("convert('$name')", ({ menu }) =>
			expect(binotype.Clean.clean(binotype.Context.Menu.toObject(menu) as unknown) as unknown).toMatchSnapshot())
	})
})
