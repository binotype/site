import { h } from "@stencil/core"
import { dom } from "@typeup/dom"
import { convert, register } from "../convert"

register("inline.emphasize", async (node: dom.Inline.Emphasize) => {
	return <em>{await convert(node.content)}</em>
})
