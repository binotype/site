import { h } from "@stencil/core"
import { dom } from "@typeup/dom"
import { convert, register } from "../convert"

register("inline.link", async (node: dom.Inline.Link) => {
	return (
		<a
			href={node.target}
			{...node.flags.reduce((result, flag) => {
				switch (flag) {
					case "download":
						result = { ...result, download: true }
					case "blank":
						result = { ...result, target: `_${flag}` }
						break
				}
				return result
			}, {})}>
			{await convert(node.content)}
		</a>
	)
})
