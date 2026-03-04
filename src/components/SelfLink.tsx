import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const SelfLink: FunctionalComponent<SelfLink.Properties> & {
	override: FunctionalComponent<SelfLink.Properties>
} = (properties, children, utils) => SelfLink.override(properties, children, utils)
SelfLink.override = (
	{ link, truncated }: SelfLink.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null =>
	link && (
		<div class={`self-link${truncated ? " truncated" : ""}`}>
			<a href={link}>
				<span>{children}</span>
			</a>
		</div>
	)
export namespace SelfLink {
	export interface Properties {
		link?: string
		truncated?: boolean
	}
}
