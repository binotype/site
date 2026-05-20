import { isly } from "isly"
import { isoly } from "isoly"
import { Block } from "../Block"
import { Mode } from "../Mode"
import { Modes } from "../Modes"
import { Path } from "../Path"

export interface Page extends Block {
	list?: Modes["list"]
	draft?: boolean
	published?: isoly.DateTime
	changed?: isoly.DateTime
	tags?: string[]
	author?: string
	pages?: Record<string, Page | undefined>
}
export namespace Page {
	export const {
		type,
		is,
		flawed
	}: isly.BindResult<Page, isly.Object<Page>> = Block.type
		.extend<Page>(
			{
				list: isly
					.union(Mode.type, isly.object({ mode: Mode.type.optional(), limit: isly.number().optional() }))
					.optional(),
				draft: isly.boolean().optional(),
				published: isoly.DateTime.type.optional() as any,
				changed: isoly.DateTime.type.optional() as any,
				tags: isly.array(isly.string()).optional(),
				author: isly.string().optional(),
				pages: isly
					.record(
						isly.string(),
						isly.lazy((): any => Page.type, `binotype.Page`)
					)
					.optional()
			},
			"binotype.Page"
		)
		.bind()
	export function locate(page: Page | undefined, path: Path): Page | undefined {
		return path.empty ? page : !page?.pages || !path.head ? undefined : locate(page.pages[path.get("head")], path.tail)
	}
	export function toArray(pages: Record<string, Page | undefined> | undefined): (Page & { id: string })[] {
		return Block.toArray(pages)
			.filter(page => !page.draft && (!page.published || page.published <= isoly.DateTime.now()))
			.sort((left, right) => (right.published ?? "z").localeCompare(left.published ?? "z"))
	}
	export function hasPages(page: Page | undefined): page is Page & { pages: Record<string, Page | undefined> } {
		return !!page?.pages && Object.keys(page.pages).length > 0
	}
}
