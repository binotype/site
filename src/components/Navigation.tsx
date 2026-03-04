import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Menu } from "./Menu"

export const Navigation: FunctionalComponent<Readonly<Navigation.Properties>> & {
	override: FunctionalComponent<Navigation.Properties>
} = (properties, children, utils) => Navigation.override(properties, children, utils)
Navigation.override = (
	{ items, depth }: Navigation.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<nav>
		<Menu items={items} depth={depth} />
		{children}
	</nav>
)
export namespace Navigation {
	export interface Properties {
		items: Context.Menu.Item[]
		depth?: number
	}
}
