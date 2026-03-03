import { FunctionalComponent, h, VNode } from "@stencil/core"

export const Menu: FunctionalComponent<Readonly<Menu.Properties>> & {
	override: (properties: Menu.Properties) => VNode | VNode[] | null
} = properties => Menu.override(properties)
Menu.override = ({ items, depth }) => (
	<ul>
		{items.map(item => (
			<li class={item.selected == "current" ? "current" : item.selected == "parent" ? "current-parent" : ""}>
				<a href={item.url}>{item.label}</a>
				{item.items && depth != 1 && <Menu items={item.items} depth={depth && depth - 1} />}
			</li>
		))}
	</ul>
)
export namespace Menu {
	export interface Properties {
		items: {
			label: string
			url: string
			selected?: "current" | "parent"
			items?: Properties["items"]
		}[]
		depth?: number
	}
}
