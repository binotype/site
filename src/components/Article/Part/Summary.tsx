import { FunctionalComponent, h } from "@stencil/core"

export const Summary: FunctionalComponent<Summary.Properties> = ({ summary }) => (
	<main class="summary">
		<p>{summary}</p>
	</main>
)
export namespace Summary {
	export interface Properties {
		summary: string
	}
}
