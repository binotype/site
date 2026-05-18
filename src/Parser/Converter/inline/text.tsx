import { dom } from "@typeup/dom"
import { h, Fragment } from "@stencil/core"
import { register } from "../convert"

register("inline.text", async (node: dom.Inline.Text) => {
	return <Fragment>{node.value}</Fragment>
})
