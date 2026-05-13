import { binotype } from "@binotype/model"
import { dom } from "@typeup/dom"
import type { Converter } from "./index"
import { h, Fragment, VNode } from "@stencil/core"

const converters: Partial<Record<dom.Class, Converter>> = {}
export function register<C extends dom.Class>(className: C, converter: Converter<dom.Class.Types[C]>): void {
	converters[className] = converter as Converter
}
export async function convert<N extends dom.Node>(node: N | N[]): Promise<binotype.Content<VNode>> {
	let result: binotype.Content<VNode>
	if (Array.isArray(node)) result = (await Promise.all(node.map(convert))).flat().filter(c => c != undefined)
	else {
		const converter = converters[node.class] as Converter<N> | undefined
		result = converter ? await converter(node) : <Fragment></Fragment>
	}
	return result
}
