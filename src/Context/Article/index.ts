import { isoly } from "isoly"
import { Site } from "../../Site"
import { Path } from "../../Site/Page/Path"
import { Header } from "./Header"
import { Mode as _Mode } from "./Mode"

export interface Article {
	mode: Article.Mode
	id: string
	link?: string
	header?: Header
	image?: string
	summary?: string
	content?: string
	sections?: Article[]
}
export namespace Article {
	export import Mode = _Mode
	export function load(
		page: Site.Page & { path: Path; mode: Article.Mode },
		design: Site.Design,
		count?: number,
	): Article {
		console.log("Loading article:", page.path.toString(), "with mode:", page.mode, "with page:", page)
		return {
			mode: page.mode ?? (page.pages ? "list" : "full"),
			id: page.path.head ?? "",
			link: page.path.toString(),
			header: Header.load(page),
			content:
				typeof page.content == "string" && (page.mode == "full" || page.mode == "body") ? page.content : undefined,
			// summary: page.content ? String(page.content).slice(0, 200) : "",
			sections: Object.entries(
				typeof page.content == "object" ? page.content : page.mode == "list" && page.pages ? page.pages : {},
			)
				.filter(([, page]) => !page.draft && (!page.published || page.published <= isoly.DateTime.now()))
				.sort((left, right) => (right[1].published ?? "z").localeCompare(left[1].published ?? "z"))
				.sort(
					(left, right) => (right[1].weight ?? Number.MAX_SAFE_INTEGER) - (left[1].weight ?? Number.MAX_SAFE_INTEGER),
				)
				.slice(0, count ?? Number.MAX_SAFE_INTEGER)
				.map(([id, subpage]: [string, Site.Page]) =>
					Article.load(
						{
							...subpage,
							path: page.path.append(id),
							mode: typeof page.content == "object" ? "full" : design.list?.mode || "list",
						},
						design,
					),
				),
		}
	}
}
