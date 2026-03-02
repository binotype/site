import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"
import { Article } from "./Article"

export const List: FunctionalComponent<Readonly<List.Properties>> = ({ article }) => (
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
