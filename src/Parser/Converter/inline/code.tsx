import { dom } from "@typeup/dom"
import { h } from "@stencil/core"
import { register } from "../convert"

register("inline.code", async (node: dom.Inline.Code) => {
	return <code>{node.value}</code> // <code>{node.value.replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;")}</code>
})
