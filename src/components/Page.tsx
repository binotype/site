import { Fragment, FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Site } from "../Site"
import { Footer } from "./Footer"
import { Head } from "./Head"
import { Header } from "./Header"
import { List } from "./List"
import { Navigation } from "./Navigation"
import { Single } from "./Single"

export const Page: FunctionalComponent<Readonly<Page.Properties>> & {
	override: FunctionalComponent<Page.Properties>
} = (properties, children, utils) => Page.override(properties, children, utils)
Page.override = (
	{ site, debug }: Page.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => {
	const context = Context.create(site, window.location.pathname)
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
			{children}
			<Footer context={context} />
			{debug && (
				<Fragment>
					<h1>Page Context</h1>
					<code>
						<pre>{JSON.stringify(context, undefined, 2)}</pre>
					</code>
				</Fragment>
			)}
		</Fragment>
	)
}
export namespace Page {
	export interface Properties {
		site: Site
		debug?: boolean
	}
}
