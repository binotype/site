import { binotype } from "@binotype/model"
import { dom } from "@typeup/dom"
import "./block"
import "./inline"
import { convert as _convert } from "./convert"
import { VNode } from "@stencil/core"

export type Converter<N extends dom.Node = dom.Node> = (content: N) => Promise<binotype.Content<VNode>>
export namespace Converter {
	export const convert = _convert
}
