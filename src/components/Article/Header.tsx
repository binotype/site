import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Meta } from "./Meta"

export const Header: FunctionalComponent<Header.Properties> & {
	override: FunctionalComponent<Header.Properties>
} = (properties, children, utils) => Header.override(properties, children, utils)
Header.override = (
	{ title, ...meta }: Header.Properties,
	children: VNode[],
	_utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<header>
		<h1>{title}</h1>
		<Meta {...meta} />
		<a href="../">
			<svg width="2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M464 256c0-114.875-93.125-208-208-208S48 141.125 48 256s93.125 208 208 208 208-93.125 208-208zm-112 32H160l96-96 96 96z" />
			</svg>
		</a>
		{children}
	</header>
)
export namespace Header {
	export interface Properties extends Meta.Properties {
		title: string
	}
}
