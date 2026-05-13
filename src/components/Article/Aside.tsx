import { binotype } from "@binotype/model"
import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Aside: FunctionalComponent<binotype.Context.Article<VNode>> & {
	override: FunctionalComponent<binotype.Context.Article<VNode>>
} = (properties, children, utils) => Aside.override(properties, children, utils)
Aside.override = (
	article: binotype.Context.Article<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null =>
	children.length == 0 && typeof article.meta.image != "string" ? null : (
		<aside>
			{typeof article.meta.image == "string" && <img src={article.meta.image} title={article.title?.plain} />}
			{children}
		</aside>
	)
export namespace Aside {}
