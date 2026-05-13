import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../convert"

register("block.list.item", async (node: dom.Block.List.Item) => (
	<li>{await convert(node.content)}</li>
))
