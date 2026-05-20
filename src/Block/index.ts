import { isly } from "isly"
import { Content } from "../Content"
import { Meta } from "../Meta"
import { Mode } from "../Mode"
import { Title } from "../Title"

export interface Block {
	weight?: number
	title?: Title
	subtitle?: Content
	menu?: boolean | string
	meta?: Meta
	mode?: Mode
	type?: string
	class?: string[]
	content?: Content
	blocks?: Record<string, Block | undefined>
}
export namespace Block {
	export const {
		type,
		is,
		flawed
	}: isly.BindResult<Block, isly.Object<Block>> = isly
		.object<Block>(
			{
				weight: isly.number().optional(),
				title: Title.type.optional(),
				subtitle: Content.type.optional(),
				menu: isly.union(isly.boolean(), isly.string()).optional(),
				meta: Meta.type.optional(),
				mode: Mode.type.optional(),
				type: isly.string().optional(),
				class: isly.array(isly.string()).optional(),
				content: Content.type.optional(),
				blocks: isly
					.record(
						isly.string(),
						isly.lazy((): any => Block.type, "binotype.Block")
					)
					.optional()
			},
			"binotype.Block"
		)
		.bind()
	export function toArray<R extends Block = Block>(
		blocks: Record<string, R | undefined> | undefined
	): (R & { id: string })[] {
		return Object.entries(blocks ?? {})
			.filter((entry): entry is [string, R] => entry[1] != undefined)
			.map(([id, block]) => ({ ...block, id }))
			.sort((left, right) => (left.weight ?? 100) - (right.weight ?? 100))
	}
	export function isBlocks(
		block: Block | Record<string, Block | undefined> | undefined
	): block is Record<string, Block | undefined> {
		return (
			block != undefined
			&& Object.values(block).every(b => typeof b == "object")
			&& !isly.tuple(isly.string("value", "pages")).is(Object.keys(block))
		)
	}
}
