import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Menu } from "./Menu"

export const Navigation: FunctionalComponent<Context.Menu<VNode>> & {
	override: FunctionalComponent<Context.Menu<VNode>>
} = (properties, children, utils) => Navigation.override(properties, children, utils)
Navigation.override = (
	{ items, depth }: Context.Menu<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<nav>
		<Menu items={items} depth={depth} />
		{children}
	</nav>
)
export namespace Navigation {}
