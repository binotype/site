import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Summary: FunctionalComponent<Context.Article<VNode>> & {
	override: FunctionalComponent<Context.Article<VNode>>
} = (properties, children, utils) => Summary.override(properties, children, utils)
Summary.override = (
	{ content }: Context.Article<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main class="summary">
		{content}
		{children}
	</main>
)
export namespace Summary {}
