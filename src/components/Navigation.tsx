import { FunctionalComponent, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Menu } from "./Menu"

export const Navigation: FunctionalComponent<Readonly<Navigation.Properties>> & {
	override: (properties: Navigation.Properties) => VNode | VNode[] | null
} = properties => Navigation.override(properties)
Navigation.override = ({ items, depth }) => (
	<nav>
		<Menu items={items} depth={depth} />
	</nav>
)
export namespace Navigation {
	export interface Properties {
		items: Context.Menu.Item[]
		depth?: number
	}
}
