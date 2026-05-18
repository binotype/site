import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { isoly } from "isoly"
import { tidily } from "tidily"
import { Context } from "../../Context"

// Keep disabled metadata variants out of JSX children; Stencil can treat JSX comments as plain objects.
export const Meta: FunctionalComponent<Context.Article<VNode>> & {
	override: FunctionalComponent<Context.Article<VNode>>
} = (properties, children, utils) => Meta.override(properties, children, utils)
Meta.override = (
	{ published, changed, author }: Context.Article<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<p>
		{published && (
			<time class="article-published">{tidily.format(isoly.Date.normalize(published), "date", "se-SE")}</time>
		)}
		{changed && <time class="article-changed">{tidily.format(isoly.Date.normalize(changed), "date", "se-SE")}</time>}
		{/*wordCount && <span class="article-word-count">{wordCount}</span>*/}
		{/*readingTime && <span class="article-reading-time">{readingTime}</span>*/}
		{author && <span class="article-author">{author}</span>}
		{/*publication && <span class="article-publication">{publication}</span>*/}
		{children}
	</p>
)
export namespace Meta {}
