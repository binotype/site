import { Fragment, FunctionalComponent, h } from "@stencil/core"
import { binotype } from "@binotype/model"

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
			context.design.icon && {
				tag: "link",
				attributes: { rel: "icon", href: binotype.Site.Page.Path.absolutify(context.design.icon) },
			},
			...(context.design?.styles?.map(style =>
				binotype.Site.Page.Path.isUrl(style)
					? { tag: "link", attributes: { rel: "stylesheet", href: binotype.Site.Page.Path.absolutify(style) } }
					: { tag: "style", content: style },
			) ?? []),
			...(context.design?.scripts?.map(script =>
				binotype.Site.Page.Path.isUrl(script)
					? { tag: "script", attributes: { src: binotype.Site.Page.Path.absolutify(script) } }
					: { tag: "script", content: script },
			) ?? []),

			{ tag: "meta", attributes: { property: "og:title", content: context.article.header?.title ?? context.title } },
			context.description && { tag: "meta", attributes: { property: "og:description", content: context.description } },
			context.image && { tag: "meta", attributes: { property: "og:image", content: context.image } },
			context.url && { tag: "meta", attributes: { property: "og:url", content: context.url } },
			{ tag: "meta", attributes: { property: "og:type", content: context.article.articles ? "website" : "article" } },
			{ tag: "meta", attributes: { property: "og:site_name", content: context.title } },
			context.article.articles &&
				context.article.header?.published && {
					tag: "meta",
					attributes: { property: "article:published_time", content: context.article.header?.published },
				},
			context.article.articles &&
				context.article.header?.author && {
					tag: "meta",
					attributes: { property: "article:author", content: context.article.header?.author },
				},
		] as (Element | undefined)[]
	)
		.filter((element: Element | undefined): element is Element => element != undefined)
		.map(createElement)
	result.forEach(element => document.head.appendChild(element))
	return <Fragment></Fragment>
}
export namespace Head {
	export interface Properties {
		context: binotype.Context
	}
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
	if (element.attributes) Object.entries(element.attributes).forEach(([key, value]) => result.setAttribute(key, value))
	if (element.content) result.appendChild(document.createTextNode(element.content))
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
			<!-- Basic Open Graph -->
			<meta property="og:title" content="Specific Page Title">
			<meta property="og:description" content="Page description (155-300 chars)">
			<meta property="og:image" content="https://simonmika.com/assets/share-image.jpg">
			<meta property="og:url" content="https://simonmika.com/current-page">
			<meta property="og:type" content="website"> <!-- or "article" for blog posts -->
			<meta property="og:site_name" content="Simon Says">

			<!-- Image specifications -->
			<meta property="og:image:width" content="1200">
			<meta property="og:image:height" content="630">
			<meta property="og:image:alt" content="Alt text for the image">
			<meta property="og:title" content={title} />
			{description && <meta property="og:description" content={description} />}
			{image && <meta property="og:image" content={image} />}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />

			<!-- Article-specific Open Graph -->
			<meta property="og:type" content="article">
			<meta property="article:published_time" content="2017-08-23">
			<meta property="article:author" content="Simon Mika">
*/
