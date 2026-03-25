import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Content: FunctionalComponent<Content.Properties> & {
	override: FunctionalComponent<Content.Properties>
} = (properties, children, utils) => Content.override(properties, children, utils)
Content.override = (
	{ content }: Content.Properties,
	children: VNode[],
	_utils: FunctionalUtilities,
): VNode | VNode[] | null => <main {...(content ? { innerHTML: content } : {})}>{children}</main>
export namespace Content {
	export interface Properties {
		content: string
	}
}
