import { binotype } from "@binotype/model"
import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Summary: FunctionalComponent<binotype.Context.Article<VNode>> & {
	override: FunctionalComponent<binotype.Context.Article<VNode>>
} = (properties, children, utils) => Summary.override(properties, children, utils)
Summary.override = (
	{ content }: binotype.Context.Article<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main class="summary">
		{content}
		{children}
	</main>
)
export namespace Summary {}
