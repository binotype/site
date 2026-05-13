import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.math", async (node: dom.Block.Math) => (
	// math.typeset("inline-TeX", "a^2 + b^2 = c^2" ?? me.value)
	<figure>
		$$${node.value}$$<figcaption>${await convert(node.content)}</figcaption>
	</figure>
))
