import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.figure", async (node: dom.Block.Figure) => (
	<figure>
		<img src={node.source.toString()} class={node.classes.join(" ")} />
		<figcaption>{await convert(node.content)}</figcaption>
	</figure>
))
