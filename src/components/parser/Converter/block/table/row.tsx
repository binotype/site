import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../convert"

register("block.table.row", async (node: dom.Block.Table.Row) => <tr>{await convert(node.content)}</tr>)
