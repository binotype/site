import { isoly } from "isoly"
import { isly } from "isly"
import { Section } from "../Section"
import { Path as _Path } from "./Path"

export interface Page {
	weight?: number
	title?: string
	author?: string
	published?: isoly.DateTime
	changed?: isoly.DateTime
	menu?: false
	tags?: string[]
	draft?: boolean
	content?: string | Record<string, Section>
	pages?: Record<string, Page>
}
export namespace Page {
	export import Path = _Path
	export const type: isly.Lazy<Page> = isly.lazy<Page>(
		() =>
			isly.object<Page>({
				weight: isly.number().optional(),
				title: isly.string().optional(),
				author: isly.string().optional(),
				published: isoly.DateTime.type.optional(),
				changed: isoly.DateTime.type.optional(),
				menu: isly.boolean(false).optional(),
				tags: isly.array(isly.string()).optional(),
				draft: isly.boolean().optional(),
				content: isly.union(isly.string(), isly.record(isly.string(), Section.type)).optional(),
				pages: isly.record(isly.string(), Page.type).optional(),
			}),
		"binotype.Site.Page"
	)

	export const { is, flawed } = type.bind()
	export function locate(page: Page | undefined, path: Path): Page | undefined {
		return path.empty ? page : page?.pages ? locate(page.pages[path.getId("camel")], path.tail) : undefined
	}
	export function getTitle(page: Page): string {
		return page.title ?? "(untitled)"
	}
}
