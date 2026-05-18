import { dom } from "@typeup/dom"
import { Fragment, h } from "@stencil/core"
import { convert, register } from "../../../convert"

register("block.list.definition.term", async (node: dom.Block.List.Definition.Term) => (
	<Fragment>
		<dt>{await convert(node.content)}</dt>
		{await convert(node.data)}
	</Fragment>
))
