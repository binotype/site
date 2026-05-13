import { h } from "@stencil/core"
import { dom } from "@typeup/dom"
import { convert, register } from "../convert"

register("block.quote", async (node: dom.Block.Quote) => (
	<blockquote {...(node.cite && { cite: node.cite })}>
		{await convert(node.content)}
		{node.attribution && <footer>{node.attribution}</footer>}
	</blockquote>
))
