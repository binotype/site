import { isoly } from "isoly"
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
	export function locate(page: Page | undefined, path: Path): Page | undefined {
		return path.empty ? page : page?.pages ? locate(page.pages[path.getId("camel")], path.tail) : undefined
	}
	export function getTitle(page: Page): string {
		return page.title ?? "(untitled)"
	}
}
