import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../../convert"

register("block.list.definition.data", async (node: dom.Block.List.Definition.Data) => (
	<dd>{await convert(node.content)}</dd>
))
