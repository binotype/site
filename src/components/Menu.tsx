import { binotype } from "@binotype/model"
import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Node } from "./Node"

export const Menu: FunctionalComponent<Menu.Properties> & { override: FunctionalComponent<Menu.Properties> } = (
	properties,
	children,
	utils
) => Menu.override(properties, children, utils)
Menu.override = (
	{ items, depth }: Menu.Properties,
	_children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null =>
	items && (
		<ul>
			{items.map(item => (
				<li
					class={item.selected == "current" ? "current" : item.selected == "parent" ? "current-parent" : ""}
					title={binotype.Content.plain(item.description, Node.plain)}>
					<a href={item.url}>{item.label}</a>
					{item.items && item.items.length > 0 && depth != 1 && <Menu {...item} depth={depth && depth - 1} />}
				</li>
			))}
		</ul>
	)
export namespace Menu {
	export interface Properties {
		items?: binotype.Context.Menu.Item[]
		depth?: number
	}
}
