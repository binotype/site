import { FunctionalComponent, h, VNode } from "@stencil/core"

export const Aside: FunctionalComponent<Aside.Properties> & {
	override: (properties: Aside.Properties) => VNode | VNode[] | null
} = properties => Aside.override(properties)
Aside.override = ({ title, summary, image }: Aside.Properties): VNode | VNode[] | null => (
	<aside>{image && <img src={image} title={title} alt={summary} />}</aside>
)
export namespace Aside {
	export interface Properties {
		title: string
		summary: string
		image?: string
	}
}
