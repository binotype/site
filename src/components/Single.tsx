import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"
import { Article } from "./Article"

export const Single: FunctionalComponent<Readonly<Single.Properties>> = ({ article }) => (
	<main class="single">
		<Article {...article} />
	</main>
)
export namespace Single {
	export interface Properties {
		article: Context.Article
	}
}
