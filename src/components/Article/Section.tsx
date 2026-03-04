import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { SelfLink } from "../SelfLink"
import { Content } from "./Content"
import { Header } from "./Header"
import { Summary } from "./Summary"

export const Section: FunctionalComponent<Section.Properties> & {
	override: FunctionalComponent<Section.Properties>
} = (properties, children, utils) => Section.override(properties, children, utils)
Section.override = (
	{ id, type, title, link, content }: Section.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<section id={id} class={`type-${type}`}>
		{typeof title == "string" && <Header title={title} />}
		{typeof content == "string" && <Content content={content} />}
		{children}
		{typeof link == "string" && <SelfLink link={link}></SelfLink>}
	</section>
)
export namespace Section {
	export interface Properties extends Partial<Summary.Properties>, SelfLink.Properties {
		id: string
		type?: string
		title?: string
		link?: string
		content?: string
	}
}
