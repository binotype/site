import { Fragment, FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"
import { SelfLink } from "../SelfLink"
import { Aside } from "./Aside"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Section } from "./Section"
import { Summary } from "./Summary"

export const Article: FunctionalComponent<Context.Article<VNode>> & {
	SelfLink: typeof SelfLink
	Aside: typeof Aside
	Content: typeof Content
	Footer: typeof Footer
	Header: typeof Header
	Section: typeof Section
	Summary: typeof Summary
	override: FunctionalComponent<Context.Article<VNode>>
} = (properties, children, utils) => Article.override(properties, children, utils)
Article.override = (
	article: Context.Article<VNode>,
	children: VNode[],
	_: FunctionalUtilities
): VNode | VNode[] | null => (
	<Fragment>
		{article.mode == "none" ? null : (
			<article id={article.id} class={`mode-${article.mode}`}>
				{["full", "header"].includes(article.mode) && <Header {...article} />}
				{["full", "header", "body"].includes(article.mode) && <Aside {...article} />}
				{["full", "body"].includes(article.mode) && <Content {...article} />}
				{["full", "body"].includes(article.mode)
					&& article.sections
					&& article.sections.map(section => <Section {...section} />)}
				{["full", "body"].includes(article.mode) && article.articles && article.articles.map(a => <Article {...a} />)}
				{children}
				{["full", "body"].includes(article.mode) && <Footer {...article} />}
				{["summary"].includes(article.mode) && article.content && <Summary {...article} />}
				{["header", "summary"].includes(article.mode) && article.link && (
					<SelfLink link={article.link} truncated={article.mode == "summary"}></SelfLink>
				)}
			</article>
		)}
		{article.list == "none" ? null : (article.articles?.map(a => <Article {...a} />) ?? null)}
	</Fragment>
)
Article.SelfLink = SelfLink
Article.Aside = Aside
Article.Content = Content
Article.Footer = Footer
Article.Header = Header
Article.Section = Section
Article.Summary = Summary
export namespace Article {}
