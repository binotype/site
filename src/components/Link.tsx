import { FunctionalComponent, h, VNode } from "@stencil/core"

export const Link: FunctionalComponent<Readonly<Link.Properties>> & {
	override: (properties: Link.Properties) => VNode | VNode[] | null
} = properties => Link.override(properties)
Link.override = ({ link }: Link.Properties): VNode | VNode[] | null =>
	link && (
		<div class="link">
			<a href={link}>
				<span></span>
			</a>
		</div>
	)
export namespace Link {
	export interface Properties {
		link?: string
	}
}
