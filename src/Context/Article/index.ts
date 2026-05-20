import { isoly } from "isoly"
import { Block } from "../../Block"
import { Modes } from "../../Modes"
import { Page } from "../../Page"
import { Path } from "../../Path"
import { Section } from "../Section"

export interface Article extends Section {
	list: Modes["list"]
	author?: string
	published?: isoly.DateTime
	changed?: isoly.DateTime
	// wordCount?: number
	// readingTime?: number
	articles?: Article[]
}
export namespace Article {
	export function load(page: Page, path: Path, reduction?: Modes, fallback?: Modes): Article
	export function load(
		page: Page | undefined,

		path: Path,
		reduction?: Modes,
		fallback?: Modes
	): Article | undefined
	export function load(
		pages: Record<string, Page | undefined> | undefined,
		path: Path,
		reduction?: Modes,
		fallback?: Modes
	): Article[] | undefined
	export function load(
		page: Page | Record<string, Page | undefined> | undefined,
		path: Path,
		reduction: Modes = { mode: "full", list: "full" },
		fallback: Modes = reduction
	): Article | Article[] | undefined {
		let result: Article | Article[] | undefined
		const modes = Modes.reduce(page, reduction, fallback)
		if (!page) result = undefined
		else if (Block.isBlocks(page))
			result =
				page
				&& Page.toArray(page)
					.slice(0, modes.list.limit)
					.map(p => Article.load(p, path.append(p.id), reduction, fallback))
		else {
			result = !modes.mode
				? undefined
				: (Object.fromEntries(
						Object.entries({
							...Section.load(page as Page, path, reduction, modes),
							list: { mode: "none", ...modes.list },
							author: page.author,
							published: page.published,
							changed: page.changed,
							// wordCount: text ? text.split(/\s+/).length : undefined,
							// readingTime: text ? Math.ceil(text.split(/\s+/).length / 200) : undefined,
							...(modes.list.mode != "none" && page.pages
								? { articles: Article.load(page.pages, path, { mode: modes.list.mode, list: modes.list }, fallback) }
								: {})
						} satisfies Article).filter(([_, value]) => value != undefined)
					) as Article)
		}
		return result
	}
	export function toObject(article: Article | undefined): object | undefined {
		return (
			article && {
				list: article.list,
				author: article.author,
				published: article.published,
				changed: article.changed,
				...Section.toObject(article),
				articles: article.articles?.map(Article.toObject)
			}
		)
	}
}
