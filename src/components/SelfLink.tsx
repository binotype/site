import { FunctionalComponent, h } from "@stencil/core"

export const SelfLink: FunctionalComponent<Readonly<SelfLink.Properties>> = ({ link, truncated }) =>
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
