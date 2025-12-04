import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"
import { Menu } from "./Menu"

export const Navigation: FunctionalComponent<Readonly<Navigation.Properties>> = ({ items, depth }) => (
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
