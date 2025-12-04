import { Fragment, FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"

export const Head: FunctionalComponent<Readonly<Head.Properties>> = ({ context }) => {
	const result: HTMLElement[] = (
		[
			{ tag: "meta", attributes: { "http-equiv": "Content-Type", content: "text/html;charset=UTF-8" } },
			context.description && { tag: "meta", attributes: { name: "description", content: context.description } },
			{ tag: "meta", attributes: { name: "generator", content: "Binotype" } },
			{
				tag: "meta",
				attributes: { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1" },
			},
			{ tag: "title", content: context.title },
			...(context.design?.styles?.map(style =>
				isUrl(style)
					? { tag: "link", attributes: { rel: "stylesheet", href: style } }
					: { tag: "style", content: style }
			) ?? []),
			...(context.design?.scripts?.map(script =>
				isUrl(script) ? { tag: "script", attributes: { src: script } } : { tag: "script", content: script }
			) ?? []),
			{ tag: "meta", attributes: { property: "og:title", content: context.title } },
			{ tag: "meta", attributes: { property: "og:description", content: context.description } },
			{ tag: "meta", attributes: { property: "og:image", content: context.image } },
			{ tag: "meta", attributes: { property: "og:type", content: "website" } },
			{ tag: "meta", attributes: { property: "og:url", content: context.url } },
		] as (Element | undefined)[]
	)
		.filter((element: Element | undefined): element is Element => element != undefined)
		.map(createElement)
	result.forEach(element => document.head.appendChild(element))
	return <Fragment></Fragment>
}
export namespace Head {
	export interface Properties {
		context: Context
	}
}
function isUrl(path: string): boolean {
	return /^(?:\.\.?\/|\/|(?:https?:)?\/\/)/i.test(path)
}
interface Element {
	tag: string
	attributes?: {
		[key: string]: string
	}
	content?: string
}
function createElement(element: Element): HTMLElement {
	const result = document.createElement(element.tag)
	if (element.attributes)
		Object.entries(element.attributes).forEach(([key, value]) => result.setAttribute(key, value))
	if (element.content)
		result.appendChild(document.createTextNode(element.content))
	return result
}
/*
			<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
			{description && <meta name="description" content={description} />}
			<meta name="generator" content="Binotype" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
			<title>{title}</title>
			{styles?.map(style => (isUrl(style) ? <link rel="stylesheet" href={style} /> : <style>{style}</style>))}
			{scripts?.map((script, i) =>
				isUrl(script) ? <script src={script} key={i} /> : <script key={i}>{script}</script>
			)}
			<meta property="og:title" content={title} />
			{description && <meta property="og:description" content={description} />}
			{image && <meta property="og:image" content={image} />}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
*/
