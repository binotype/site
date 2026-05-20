import { Block } from "../../Block"
import { Content } from "../../Content"
import { Page } from "../../Page"
import { Path } from "../../Path"
import { Title } from "../../Title"

export interface Item {
	label: string
	description: Content
	url: string
	selected?: "current" | "parent"
	items?: Item[]
}
export namespace Item {
	export function load(block: Block, path: Path, current: string): Item
	export function load(block: Block | undefined, path: Path, current: string): Item | undefined
	export function load(
		block: Record<string, Block | undefined>,
		path: Path,
		current: string,
		type?: "block" | "page"
	): Item[]
	export function load(
		block: Record<string, Block | undefined> | undefined,
		path: Path,
		current: string,
		type?: "block" | "page"
	): Item[] | undefined
	export function load(
		block: Block | Record<string, Block | undefined> | undefined,
		path: Path,
		current: string,
		type?: "block" | "page"
	): Item | Item[] | undefined {
		return !block || block.menu == false
			? undefined
			: Block.isBlocks(block)
				? (type == "block" ? Block.toArray(block) : Page.toArray(block))
						.map(p => Item.load(p, type == "block" ? path.appendFragment(p.id) : path.append(p.id), current))
						.filter((item): item is Item => item != undefined)
				: {
						label: typeof block.menu == "string" ? block.menu : Title.get(block.title, "short"),
						description: Title.get(block.title, "long-short") as Content,
						url: path.toString(),
						...(current == path.toString()
							? { selected: "current" }
							: current.startsWith(path.toString() + "/")
								? { selected: "parent" }
								: {}),
						...(items => (items.length > 0 ? { items } : {}))([
							...(load(block.blocks, path, current, "block") ?? []),
							...(Page.hasPages(block) ? load(block.pages, path, current, "page") : [])
						])
					}
	}
	export function toObject({ description, items, ...item }: Item): object | undefined {
		return {
			description: description && Content.toObject(description),
			...(items ? { items: items.map(i => Item.toObject(i)) } : {}),
			...item
		}
	}
}
