import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { binotype } from "@binotype/model"
import { SelfLink } from "../SelfLink"
import { Aside } from "./Aside"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Section } from "./Section"
import { Summary } from "./Summary"

export const Article: FunctionalComponent<Article.Properties> & {
	override: FunctionalComponent<Article.Properties>
} = (properties, children, utils) => Article.override(properties, children, utils)
Article.override = (
	{ id, mode, header, summary, link, truncated, aside, content, sections, articles, footer }: Article.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null =>
	mode == "list" ? (
		(articles?.map(article => <Article {...article} />) ?? null)
	) : (
		<article id={id} class={`mode-${mode}`}>
			{["full", "header"].includes(mode) && header && <Header {...header} />}
			{["full", "header", "body"].includes(mode) && aside && <Aside {...aside} />}
			{["full", "body"].includes(mode) && content && <Content content={content} />}
			{["full", "body"].includes(mode) && sections && sections.map(section => <Section {...section} />)}
			{["full", "body"].includes(mode) && articles && articles.map(article => <Article {...article} />)}
			{children}
			{["full", "body"].includes(mode) && footer && <Footer {...footer} />}
			{["summary"].includes(mode) && summary && <Summary summary={summary} />}
			{["header", "summary"].includes(mode) && link && <SelfLink link={link} truncated={truncated}></SelfLink>}
		</article>
	)
export namespace Article {
	export interface Properties extends Partial<Summary.Properties>, SelfLink.Properties {
		id: string
		mode: binotype.Context.Article.Mode
		header?: Header.Properties
		aside?: Aside.Properties
		content?: string
		sections?: binotype.Context.Article.Section[]
		articles?: Properties[]
		footer?: Footer.Properties
	}
}
