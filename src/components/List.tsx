import { FunctionalComponent, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Article } from "./Article"

export const List: FunctionalComponent<Readonly<List.Properties>> & {
	override: (properties: List.Properties) => VNode | VNode[] | null
} = properties => List.override(properties)
List.override = ({ article }: List.Properties): VNode | VNode[] | null => (
	<main class="list">
		{article.articles?.map(section => (
			<Article {...section} />
		))}
	</main>
)
export namespace List {
	export interface Properties {
		article: Context.Article
	}
}
