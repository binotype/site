import { FunctionalComponent, h } from "@stencil/core"

export const Aside: FunctionalComponent<Aside.Properties> = ({ title, summary, image }) => (
	<aside>{image && <img src={image} title={title} alt={summary} />}</aside>
)
export namespace Aside {
	export interface Properties {
		title: string
		summary: string
		image?: string
	}
}
