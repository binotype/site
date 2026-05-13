import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { convert, register } from "../../convert"

register("block.table", async (node: dom.Block.Table) => {
	return (
		<table class={getClasses(node)}>
			{await Promise.all(node.rows.map(async row => convert(row)))}
			<caption>{await convert(node.content)}</caption>
		</table>
	)
})

function getClasses(me: dom.Block.Table): string {
	return me.alignments
		.map((value, index) => {
			let result: string
			switch (value) {
				case "center":
					result = "tc" + (index + 1)
					break
				case "right":
					result = "tr" + (index + 1)
					break
				default:
					result = ""
					break
			}
			return result
		})
		.filter(value => value != "")
		.join(" ")
}
