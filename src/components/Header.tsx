import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../Context"
import { Site } from "../Site"

export const Header: FunctionalComponent<Readonly<Header.Properties>> & {
	override: FunctionalComponent<Header.Properties>
} = (properties, children, utils) => Header.override(properties, children, utils)
Header.override = (
	{ context }: Header.Properties,
	children?: VNode | VNode[] | null,
	utils?: FunctionalUtilities,
): VNode | VNode[] | null => (
	<header>
		<h1>
			<a href={"/"}>
				{context.design?.logotype ? (
					<img
						src={Site.Page.Path.absolutify(context.design.logotype)}
						alt={`${context.title}${context.tagline ? ` · ${context.tagline}` : ""}`}
					/>
				) : (
					context.title
				)}
			</a>
		</h1>
		{context.tagline && <p>{context.tagline}</p>}
		{children}
	</header>
)
export namespace Header {
	export interface Properties {
		context: Context
	}
}
