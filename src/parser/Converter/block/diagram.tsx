import { dom } from "@typeup/dom"
//import yuml2svg from "yuml2svg"
import { h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.diagram", async (node: dom.Block.Diagram) => {
	let value = node.value.trim()
	// if (value.startsWith("// {type:"))
	// 	value = (await yuml2svg(value)).replace(
	// 		/<svg ([^>]*) width="(\d+(?:\.\d)*)\w*" height="(\d+(?:\.\d)*)\w*"/,
	// 		`<svg $1 width="$2" height="$3" viewBox="0 0 $2 $3"`
	// 	)
	return (
		<figure>
			{value}
			<figcaption>{await convert(node.content)}</figcaption>
		</figure>
	)
})
