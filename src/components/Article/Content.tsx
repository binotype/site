import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Content: FunctionalComponent<Context.Article | Context.Section> & {
	override: FunctionalComponent<Context.Article | Context.Section>
} = (properties, children, utils) => Content.override(properties, children, utils)
Content.override = (
	{ content }: Context.Article | Context.Section,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main>
		{content}
		{children}
	</main>
)
export namespace Content {}
