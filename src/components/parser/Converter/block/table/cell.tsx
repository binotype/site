import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../convert"

register("block.table.cell", async (node: dom.Block.Table.Cell) =>
	node.header ? <th>{await convert(node.content)}</th> : <td>{await convert(node.content)}</td>
)
