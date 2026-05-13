import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.section", async (node: dom.Block.Section) => (
	<section class="section">{await convert(node.content)}</section>
))
