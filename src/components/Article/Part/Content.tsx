import { FunctionalComponent, h } from "@stencil/core"

export const Content: FunctionalComponent<Content.Properties> = ({ content }) => <main innerHTML={content}></main>
export namespace Content {
	export interface Properties {
		content: string
	}
}
