import { FunctionalComponent, h } from "@stencil/core"

export const Link: FunctionalComponent<Readonly<Link.Properties>> = ({ link }) =>
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
