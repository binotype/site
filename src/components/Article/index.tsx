import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../../Context"
import { SelfLink } from "../SelfLink"
import { Aside } from "./Aside"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Summary } from "./Summary"

export const Article: FunctionalComponent<Article.Properties> = ({
	id,
	mode,
	header,
	summary,
	link,
	truncated,
	aside,
	content,
	sections,
	footer,
}) =>
	mode == "list" ? (
		sections && sections.map(section => <Article {...section} />)
	) : (
		<article id={id} class={`mode-${mode}`}>
			{["full", "header"].includes(mode) && header && <Header {...header} />}
			{["full", "header", "body"].includes(mode) && aside && <Aside {...aside} />}
			{["full", "body"].includes(mode) && content && <Content content={content} />}
			{["full", "body"].includes(mode) && sections && sections.map(section => <Article {...section} />)}
			{["full", "body"].includes(mode) && footer && <Footer {...footer} />}
			{["summary"].includes(mode) && summary && <Summary summary={summary} />}
			{["header", "summary"].includes(mode) && link && <SelfLink link={link} truncated={truncated}></SelfLink>}
		</article>
	)
export namespace Article {
	export interface Properties extends Partial<Summary.Properties>, SelfLink.Properties {
		id: string
		mode: Context.Article.Mode
		header?: Header.Properties
		aside?: Aside.Properties
		content?: string
		sections?: Properties[]
		footer?: Footer.Properties
	}
}
