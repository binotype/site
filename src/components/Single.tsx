import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { binotype } from "@binotype/model"
import { Article } from "./Article"

export const Single: FunctionalComponent<Readonly<Single.Properties>> & {
	override: FunctionalComponent<Single.Properties>
} = (properties, children, utils) => Single.override(properties, children, utils)
Single.override = (
	{ article }: Single.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<main class="single">
		<Article {...article} />
		{children}
	</main>
)
export namespace Single {
	export interface Properties {
		article: binotype.Context.Article
	}
}
