import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../../Context"
import { SelfLink } from "../SelfLink"
import { Aside } from "./Aside"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Section } from "./Section"
import { Summary } from "./Summary"

export const Article: FunctionalComponent<Article.Properties> & {
	Header: typeof Header
	Aside: typeof Aside
	Content: typeof Content
	Section: typeof Section
	Summary: typeof Summary
	Footer: typeof Footer
} = ({ id, mode, header, summary, link, truncated, aside, content, sections, articles, footer }) =>
	mode == "list" ? (
		articles && articles.map(article => <Article {...article} />)
	) : (
		<article id={id} class={`mode-${mode}`}>
			{["full", "header"].includes(mode) && header && <Header {...header} />}
			{["full", "header", "body"].includes(mode) && aside && <Aside {...aside} />}
			{["full", "body"].includes(mode) && content && <Content content={content} />}
			{["full", "body"].includes(mode) && sections && sections.map(section => <Section {...section} />)}
			{["full", "body"].includes(mode) && articles && articles.map(article => <Article {...article} />)}
			{["full", "body"].includes(mode) && footer && <Footer {...footer} />}
			{["summary"].includes(mode) && summary && <Summary summary={summary} />}
			{["header", "summary"].includes(mode) && link && <SelfLink link={link} truncated={truncated}></SelfLink>}
		</article>
	)
Article.Header = Header
Article.Aside = Aside
Article.Content = Content
Article.Section = Section
Article.Summary = Summary
Article.Footer = Footer
export namespace Article {
	export interface Properties extends Partial<Summary.Properties>, SelfLink.Properties {
		id: string
		mode: Context.Article.Mode
		header?: Header.Properties
		aside?: Aside.Properties
		content?: string
		sections?: Context.Article.Section[]
		articles?: Properties[]
		footer?: Footer.Properties
	}
}
