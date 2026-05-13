import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.video", async (node: dom.Block.Video) => (
	<figure>
		<video controls class={node.classes.join(" ")}>
			<source src={node.source.toString()} type={node.type} />
		</video>
		<figcaption>{await convert(node.content)}</figcaption>
	</figure>
))
