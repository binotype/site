import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../convert"

register("block.list.unordered", async (node: dom.Block.List.Unordered) => {
	return <ul>{await convert(node.content)}</ul>
})
