import { VNode } from "@stencil/core"
import { dom } from "@typeup/dom"
import { Content } from "../../Content"
import "./block"
import { convert as _convert } from "./convert"
import "./inline"

export type Converter<N extends dom.Node = dom.Node> = (content: N) => Promise<Content<VNode>>
export namespace Converter {
	export const convert = _convert
}
