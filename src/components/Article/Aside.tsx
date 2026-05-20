import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Aside: FunctionalComponent<Context.Article> & {
	override: FunctionalComponent<Context.Article>
} = (properties, children, utils) => Aside.override(properties, children, utils)
Aside.override = (
	article: Context.Article,
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
