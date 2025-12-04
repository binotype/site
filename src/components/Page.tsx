import { Fragment, FunctionalComponent, h } from "@stencil/core"
import { model } from ".."
import { Context } from "../Context"
import { Footer } from "./Footer"
import { Head } from "./Head"
import { Header } from "./Header"
import { List } from "./List"
import { Navigation } from "./Navigation"
import { Single } from "./Single"

export const Page: FunctionalComponent<Readonly<Page.Properties>> = ({ site }) => {
	console.log("Rendering Page component with site:", site)
	const context = Context.create(site, window.location.pathname)
	console.log("Rendering Page component with context:", context)
	const navigation = <Navigation {...context.menu} />
	return (
		<Fragment>
			<Head context={context}></Head>
			<Header context={context}>{site.design.navigation == "header" ? navigation : undefined}</Header>
			{site.design.navigation != "header" ? navigation : undefined}
			{Array.isArray(context.article.sections) ? (
				<List article={context.article} />
			) : (
				<Single article={context.article} />
			)}
			<Footer context={context} />
		</Fragment>
	)
}

export namespace Page {
	export interface Properties {
		site: model.Site
	}
}
