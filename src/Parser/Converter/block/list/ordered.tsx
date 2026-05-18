import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../convert"

register("block.list.ordered", async (node: dom.Block.List.Ordered) => {
	return <ol>{await convert(node.content)}</ol>
})
