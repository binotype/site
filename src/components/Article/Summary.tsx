import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Summary: FunctionalComponent<Summary.Properties> & {
	override: FunctionalComponent<Summary.Properties>
} = (properties, children, utils) => Summary.override(properties, children, utils)
Summary.override = (
	{ summary }: Summary.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<main class="summary">
		<p>{summary}</p>
		{children}
	</main>
)
export namespace Summary {
	export interface Properties {
		summary: string
	}
}
