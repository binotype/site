import { FunctionalComponent, h, VNode } from "@stencil/core"

export const Content: FunctionalComponent<Content.Properties> & {
	override: (properties: Content.Properties) => VNode | VNode[] | null
} = properties => Content.override(properties)
Content.override = ({ content }: Content.Properties): VNode | VNode[] | null => <main innerHTML={content}></main>
export namespace Content {
	export interface Properties {
		content: string
	}
}
