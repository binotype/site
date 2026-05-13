import { h } from "@stencil/core"
import { dom } from "@typeup/dom"
import { convert, register } from "../convert"

register("block.frame", async (node: dom.Block.Frame) => (
	<figure>
		<iframe src={node.source.toString()} class={node.classes.join(" ")} />
		<figcaption>{await convert(node.content)}</figcaption>
	</figure>
))
