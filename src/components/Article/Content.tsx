import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Content: FunctionalComponent<Context.Article<VNode> | Context.Section<VNode>> & {
	override: FunctionalComponent<Context.Article<VNode> | Context.Section<VNode>>
} = (properties, children, utils) => Content.override(properties, children, utils)
Content.override = (
	{ content }: Context.Article<VNode> | Context.Section<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main>
		{content}
		{children}
	</main>
)
export namespace Content {}
