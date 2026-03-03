import { FunctionalComponent, h, VNode } from "@stencil/core"

export const Summary: FunctionalComponent<Summary.Properties> & {
	override: (properties: Summary.Properties) => VNode | VNode[] | null
} = properties => Summary.override(properties)
Summary.override = ({ summary }: Summary.Properties): VNode | VNode[] | null => (
	<main class="summary">
		<p>{summary}</p>
	</main>
)
export namespace Summary {
	export interface Properties {
		summary: string
	}
}
