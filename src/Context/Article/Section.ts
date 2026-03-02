import { Site } from "../../Site"

export interface Section {
	id: string
	link?: string
	type?: string
	title?: string
	content?: string
}
export namespace Section {
	export function load(
		section: Site.Section & { path: Site.Page.Path },
	): Section {
		console.log("Loading section:", section.path.toString(), "with page:", section)
		return {
			id: section.path.head ?? "",
			link: section.path.toString(),
			type: section.type,
			title: section.title,
			content: section.content,
		}
	}
}
