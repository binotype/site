import { Fragment, FunctionalComponent, h } from "@stencil/core"
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
	articles,
	footer,
}) =>
	mode == "list" ? (
		articles && articles.map(article => <Article {...article} />)
	) : (
		<Fragment>
		<article id={id} class={`mode-${mode}`}>
			{["full", "header"].includes(mode) && header && <Header {...header} />}
			{["full", "header", "body"].includes(mode) && aside && <Aside {...aside} />}
			{["full", "body"].includes(mode) && content && <Content content={content} />}
			{["full", "body"].includes(mode) && articles && articles.map(article => <Article {...article} />)}
			{["full", "body"].includes(mode) && footer && <Footer {...footer} />}
			{["summary"].includes(mode) && summary && <Summary summary={summary} />}
			{["header", "summary"].includes(mode) && link && <SelfLink link={link} truncated={truncated}></SelfLink>}
		</article>
		<details>
			<summary>Article Data</summary>
			<code><pre>{JSON.stringify({ id, mode, header, summary, link, truncated, aside, content, articles, footer }, null, 2)}</pre></code>
		</details>
		</Fragment>
	)
export namespace Article {
	export interface Properties extends Partial<Summary.Properties>, SelfLink.Properties {
		id: string
		mode: Context.Article.Mode
		header?: Header.Properties
		aside?: Aside.Properties
		content?: string
		articles?: Properties[]
		footer?: Footer.Properties
	}
}
