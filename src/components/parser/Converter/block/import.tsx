import { dom } from "@typeup/dom"
import { Fragment, h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.import", async (node: dom.Block.Import) => <Fragment>{await convert(node.content)}</Fragment>)
