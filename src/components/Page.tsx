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
	const context = Site.is(site) ? Context.create(site, window.location.pathname) : undefined
	const navigation = context && <Navigation {...context.menu} />
	return (
		<Fragment>
			{context && site ? (
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
					{(debug == true || debug == "context") && (
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
			) : (
				<Fragment>
					<h1>Flawed Site Configuration</h1>
					<code>
						<pre>{JSON.stringify(Site.flawed(site), undefined, 2)}</pre>
					</code>
				</Fragment>
			)}
			{(debug == true || debug == "site") && (
			<details>
				<summary>
					<h1>Site Configuration</h1>
				</summary>
				<code>
					<pre>{JSON.stringify(site, undefined, 2)}</pre>
				</code>
			</details>)}
		</Fragment>
	)
}

export namespace Page {
	export interface Properties {
		site: Site | undefined
		debug?: boolean | "site" | "context"
		overrides?: Overrides
	}
}
