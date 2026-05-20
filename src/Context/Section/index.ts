import { Block } from "../../Block"
import { Content } from "../../Content"
import { Meta } from "../../Meta"
import { Mode } from "../../Mode"
import { Modes } from "../../Modes"
import { Path } from "../../Path"
import { Label } from "../Label"

export interface Section {
	id: string
	link?: string
	meta: Meta
	mode: Mode
	menu: boolean | string
	type?: string
	class: string[]
	title?: Label
	subtitle?: Content
	content?: Content
	sections?: Section[]
}
export namespace Section {
	export function load(block: Block, path: Path, reduction?: Modes, fallback?: Modes): Section
	export function load(block: Block | undefined, path: Path, reduction?: Modes, fallback?: Modes): Section | undefined
	export function load(
		blocks: Record<string, Block | undefined> | undefined,
		path: Path,
		reduction?: Modes,
		fallback?: Modes
	): Section[] | undefined
	export function load(
		block: Block | Record<string, Block> | undefined,
		path: Path,
		reduction: Modes = { mode: "full", list: "full" },
		fallback: Modes = reduction
	): Section | Section[] | undefined {
		let result: Section | Section[] | undefined
		if (Block.isBlocks(block))
			result = block && Block.toArray(block).map(b => Section.load(b, path.appendFragment(b.id), reduction, fallback))
		else if (block) {
			const mode = Modes.reduce(block, reduction, fallback).mode ?? "full"
			result =
				mode
				&& (Object.fromEntries(
					Object.entries({
						id: path.fragment ?? path.get("last") ?? "",
						link: path.toString(),
						meta: block.meta ?? {},
						mode,
						menu: block.menu ?? true,
						type: block.type,
						class: block.class ?? [],
						title: Label.get(block.title ?? `[${path.fragment ?? path.get("last") ?? ""}]`),
						subtitle: block.subtitle,
						...(mode == "full" || mode == "body" || mode == "summary"
							? {
									content: block.content ? block.content : undefined,
									sections: load(block.blocks, path, reduction, fallback)
								}
							: {})
					} satisfies Section).filter(([_, value]) => value !== undefined)
				) as Section)
		} else result = undefined
		return result
	}
	export function toObject(section: Section | undefined): object | undefined {
		return (
			section && {
				...section,
				title: section.title && Label.toObject(section.title),
				subtitle: section.subtitle && Content.toObject(section.subtitle),
				content: section.content && Content.toObject(section.content),
				sections: section.sections?.map(s => Section.toObject(s))
			}
		)
	}
}
