import { Content } from "../../Content"
import { Title } from "../../Title"

export interface Label {
	plain: string
	formatted: Content
}
export namespace Label {
	export function get(title: Title): Label
	export function get(title: Title | undefined): Label | undefined
	export function get(title: Title | undefined): Label | undefined {
		return title != undefined
			? { plain: Title.get(title, "short"), formatted: Title.get(title, "long-short") as Content }
			: undefined
	}
	export function toObject(label: Label | undefined): object | undefined {
		return label && { plain: label.plain, formatted: Content.toObject(label.formatted) }
	}
	export function plain(label: Label): { plain: string; formatted: string | undefined } {
		return { plain: label.plain, formatted: Content.plain(label.formatted) }
	}
}
