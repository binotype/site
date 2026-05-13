import { h } from "@stencil/core"
import { dom } from "@typeup/dom"
import { convert, register } from "../convert"

register("inline.quote", async (node: dom.Inline.Quote) => {
	return <q>{await convert(node.content)}</q>
})
