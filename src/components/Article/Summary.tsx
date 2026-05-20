import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Summary: FunctionalComponent<Context.Article> & { override: FunctionalComponent<Context.Article> } = (
	properties,
	children,
	utils
) => Summary.override(properties, children, utils)
Summary.override = (
	{ content }: Context.Article,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main class="summary">
		{content}
		{children}
	</main>
)
export namespace Summary {}
