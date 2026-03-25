import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Aside: FunctionalComponent<Aside.Properties> & {
	override: FunctionalComponent<Aside.Properties>
} = (properties, children, utils) => Aside.override(properties, children, utils)
Aside.override = (
	{ title, summary, image }: Aside.Properties,
	children: VNode[],
	_utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<aside>
		{image && <img src={image} title={title} alt={summary} />}
		{children}
	</aside>
)
export namespace Aside {
	export interface Properties {
		title: string
		summary: string
		image?: string
	}
}
