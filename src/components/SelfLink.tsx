import { FunctionalComponent, h, VNode } from "@stencil/core"

export const SelfLink: FunctionalComponent<SelfLink.Properties> & {
	override: (properties: SelfLink.Properties) => VNode | VNode[] | null
} = properties => SelfLink.override(properties)
SelfLink.override = ({ link, truncated }: SelfLink.Properties): VNode | VNode[] | null =>
	link && (
		<div class={`self-link${truncated ? " truncated" : ""}`}>
			<a href={link}>
				<span></span>
			</a>
		</div>
	)
export namespace SelfLink {
	export interface Properties {
		link?: string
		truncated?: boolean
	}
}
