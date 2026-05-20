import { VNode } from "@stencil/core"
import { isly } from "isly"
import { Node } from "./Node"

export type Content = VNode | VNode[] | null

export namespace Content {
	export const {
		type,
		is,
		flawed
	}: isly.BindResult<Content, isly.Union<Content>> = isly
		.union<Content>(Node.type, Node.type.array(), isly.null())
		.rename("binotype.Content")
		.bind()
	export function toObject(content: Content): object | object[] | undefined {
		return content == null ? undefined : Array.isArray(content) ? content.map(toObject) : Node.Object.from(content)
	}
	export function plain(content: Content): string | undefined {
		return content ? (Array.isArray(content) ? content.map(plain).join("") : Node.plain(content)) : undefined
	}
}
