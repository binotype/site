import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.chapter", async (node: dom.Block.Chapter) => (
	<section class="chapter">{await convert(node.content)}</section>
))
