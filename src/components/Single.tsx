import { FunctionalComponent, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Article } from "./Article"

export const Single: FunctionalComponent<Readonly<Single.Properties>> & {
	override: (properties: Single.Properties) => VNode | VNode[] | null
} = properties => Single.override(properties)
Single.override = ({ article }) => (
	<main class="single">
		<Article {...article} />
	</main>
)
export namespace Single {
	export interface Properties {
		article: Context.Article
	}
}
