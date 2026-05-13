import { binotype } from "@binotype/model"
import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Content: FunctionalComponent<binotype.Context.Article<VNode> | binotype.Context.Section<VNode>> & {
	override: FunctionalComponent<binotype.Context.Article<VNode> | binotype.Context.Section<VNode>>
} = (properties, children, utils) => Content.override(properties, children, utils)
Content.override = (
	{ content }: binotype.Context.Article<VNode> | binotype.Context.Section<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main>
		{content}
		{children}
	</main>
)
export namespace Content {}
