import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Article } from "./Article"

export const List: FunctionalComponent<Readonly<List.Properties>> & {
	override: FunctionalComponent<List.Properties>
} = (properties, children, utils) => List.override(properties, children, utils)
List.override = (
	{ article }: List.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
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
