import { binotype } from "@binotype/model"
import { h, Fragment, VNode } from "@stencil/core"
import { Converter } from "./Converter"

export const parser = new binotype.Parser<VNode>(async content => {
	let result: binotype.Content<VNode>
	if (typeof content == "string") result = <Fragment>{content}</Fragment>
	else if (Array.isArray(content)) result = await Converter.convert(content)
	else result = <Fragment></Fragment>
	return result
})
