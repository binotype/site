import { h } from "@stencil/core"
import { dom } from "@typeup/dom"
import { convert, register } from "../convert"

register("block.code", async (node: dom.Block.Code) => (
	<figure>
		<pre>
			<code class="${node.language}">{node.value}</code>
		</pre>
		<figcaption>{await convert(node.content)}</figcaption>
	</figure>
))
