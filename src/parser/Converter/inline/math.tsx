import { dom } from "@typeup/dom"
import { Fragment, h } from "@stencil/core"
import { register } from "../convert"

register("inline.math", async (node: dom.Inline.Math) => {
	return <Fragment>${node.value}$</Fragment>
})
