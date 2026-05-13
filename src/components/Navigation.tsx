import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { binotype } from "@binotype/model"
import { Menu } from "./Menu"

export const Navigation: FunctionalComponent<binotype.Context.Menu<VNode>> & {
	override: FunctionalComponent<binotype.Context.Menu<VNode>>
} = (properties, children, utils) => Navigation.override(properties, children, utils)
Navigation.override = (
	{ items, depth }: binotype.Context.Menu<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<nav>
		<Menu items={items} depth={depth} />
		{children}
	</nav>
)
export namespace Navigation {}
