import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Aside: FunctionalComponent<Context.Article<VNode>> & {
	override: FunctionalComponent<Context.Article<VNode>>
} = (properties, children, utils) => Aside.override(properties, children, utils)
Aside.override = (
	article: Context.Article<VNode>,
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
