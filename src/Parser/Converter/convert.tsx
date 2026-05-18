import { Fragment, h, VNode } from "@stencil/core"
import { dom } from "@typeup/dom"
import { Content } from "../../Content"
import type { Converter } from "./index"

const converters: Partial<Record<dom.Class, Converter>> = {}
export function register<C extends dom.Class>(className: C, converter: Converter<dom.Class.Types[C]>): void {
	converters[className] = converter as Converter
}
export async function convert<N extends dom.Node>(node: N | N[]): Promise<Content<VNode>> {
	let result: Content<VNode>
	if (Array.isArray(node)) result = (await Promise.all(node.map(convert))).flat().filter(c => c != undefined)
	else {
		const converter = converters[node.class] as Converter<N> | undefined
		result = converter ? await converter(node) : <Fragment></Fragment>
	}
	return result
}
