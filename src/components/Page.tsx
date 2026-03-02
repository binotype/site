import { Fragment, FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"
import { Overrides } from "../Overrides"
import { Site } from "../Site"
import { Footer } from "./Footer"
import { Head } from "./Head"
import { Header } from "./Header"
import { List } from "./List"
import { Navigation } from "./Navigation"
import { Single } from "./Single"

export const Page: FunctionalComponent<Readonly<Page.Properties>> = ({ site, debug, overrides }) => {
	console.log("Rendering Page component with site:", site)
	const context = Context.create(site, window.location.pathname)
	console.log("Rendering Page component with context:", context)
	const navigation = <Navigation {...context.menu} />
	return (
		<Fragment>
			<Head context={context}></Head>
			<Header context={context}>{site.design.navigation == "header" ? navigation : undefined}</Header>
			{site.design.navigation != "header" ? navigation : undefined}
			{Array.isArray(context.article.articles) && context.article.articles.length > 0 ? (
				<List article={context.article} />
			) : (
				<Single article={context.article} />
			)}
			<Footer context={context} overrides={overrides} />
			{debug && (
				<details>
					<summary>
						<h1>Page Context</h1>
					</summary>
					<code>
						<pre>{JSON.stringify(context, undefined, 2)}</pre>
					</code>
				</details>
			)}
		</Fragment>
	)
}

export namespace Page {
	export interface Properties {
		site: Site
		debug?: boolean
		overrides?: Overrides
	}
}
