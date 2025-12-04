import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../../Context"
import { SelfLink } from "../SelfLink"
import { Part } from "./Part"

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
			{["full", "header"].includes(mode) && header && <Part.Header {...header} />}
			{["full", "header", "body"].includes(mode) && aside && <Part.Aside {...aside} />}
			{["full", "body"].includes(mode) && content && <Part.Content content={content} />}
			{["full", "body"].includes(mode) && sections && sections.map(section => <Article {...section} />)}
			{["full", "body"].includes(mode) && footer && <Part.Footer {...footer} />}
			{["summary"].includes(mode) && summary && <Part.Summary summary={summary} />}
			{["header", "summary"].includes(mode) && link && <SelfLink link={link} truncated={truncated}></SelfLink>}
		</article>
	)
export namespace Article {
	export interface Properties extends Partial<Part.Summary.Properties>, SelfLink.Properties {
		id: string
		mode: Context.Article.Mode
		header?: Part.Header.Properties
		aside?: Part.Aside.Properties
		content?: string
		sections?: Properties[]
		footer?: Part.Footer.Properties
	}
}
