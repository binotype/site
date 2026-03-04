import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { isoly } from "isoly"
import { tidily } from "tidily"

export const Meta: FunctionalComponent<Meta.Properties> & {
	override: FunctionalComponent<Meta.Properties>
} = (properties, children, utils) => Meta.override(properties, children, utils)
Meta.override = (
	{ published, changed, wordCount, readingTime, author, publication }: Meta.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<p>
		{published && (
			<time class="article-published">{tidily.format(isoly.Date.normalize(published), "date", "se-SE")}</time>
		)}
		{changed && <time class="article-changed">{tidily.format(isoly.Date.normalize(changed), "date", "se-SE")}</time>}
		{wordCount && <span class="article-word-count">{wordCount}</span>}
		{readingTime && <span class="article-reading-time">{readingTime}</span>}
		{author && <span class="article-author">{author}</span>}
		{publication && <span class="article-publication">{publication}</span>}
		{children}
	</p>
)
export namespace Meta {
	export interface Properties {
		published?: isoly.DateTime
		changed?: isoly.DateTime
		wordCount?: number
		readingTime?: number
		author?: string
		publication?: string
	}
}
