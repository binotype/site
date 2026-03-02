import { FunctionalComponent, VNode } from "@stencil/core"
import { isly } from "isly"
import type { Context } from "./Context"

export interface Overrides {
	footer?: FunctionalComponent<{
		context: Context
	}> | VNode | VNode[]
}
export namespace Overrides {
	export const { is, flawed, type } = isly
		.object<Overrides>(
			{
				footer: isly.any().optional(),
			},
			"binotype.Site.Design.Overrides",
		)
		.bind()
}
