import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Link: FunctionalComponent<Readonly<Link.Properties>> & {
	override: FunctionalComponent<Link.Properties>
} = (properties, children, utils) => Link.override(properties, children, utils)
Link.override = ({ link }: Link.Properties, children: VNode[], utils: FunctionalUtilities): VNode | VNode[] | null =>
	link && (
		<div class="link">
			<a href={link}>
				<span>{children}</span>
			</a>
		</div>
	)
export namespace Link {
	export interface Properties {
		link?: string
	}
}
