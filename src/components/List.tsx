import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { binotype } from "@binotype/model"
import { Article } from "./Article"

export const List: FunctionalComponent<Readonly<List.Properties>> & { override: FunctionalComponent<List.Properties> } =
	(properties, children, utils) => List.override(properties, children, utils)
List.override = (
	{ article }: List.Properties,
	_children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<main class="list">
		{article.articles?.map(article => (
			<Article {...article} />
		))}
	</main>
)
export namespace List {
	export interface Properties {
		article: binotype.Context.Article<VNode>
	}
}
