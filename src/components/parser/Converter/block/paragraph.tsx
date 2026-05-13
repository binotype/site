import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.paragraph", async (node: dom.Block.Paragraph) => <p>{await convert(node.content)}</p>)
