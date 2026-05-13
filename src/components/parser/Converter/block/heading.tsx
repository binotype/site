import { dom } from "@typeup/dom"
import { FunctionalComponent, h } from "@stencil/core"
import { convert, register } from "../convert"

register("block.heading", async (node: dom.Block.Heading) => (
	<Heading level={node.level}>{await convert(node.content)}</Heading>
))

const Heading: FunctionalComponent<{ level: number }> = ({ level }, content: any) =>
	({
		"1": <h1>{content}</h1>,
		"2": <h2>{content}</h2>,
		"3": <h3>{content}</h3>,
		"4": <h4>{content}</h4>,
		"5": <h5>{content}</h5>,
		"6": <h6>{content}</h6>
	})[level]
