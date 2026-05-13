import { dom } from "@typeup/dom"
import { Fragment, h } from "@stencil/core"
import { convert, register } from "../../../convert"

import "./data"
import "./term"

register("block.list.definition", async (node: dom.Block.List.Definition) => {
	return <Fragment>{await convert(node.content)}</Fragment>
})
