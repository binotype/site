import { FunctionalComponent } from "@stencil/core"
import { isly } from "isly"
import type { Context } from "../../Context"

export interface Overrides {
	footer?: FunctionalComponent<{
		context: Context
	}>
}
export namespace Overrides {
	export const { is, flawed, type } = isly
		.object<Overrides>(
			{
				footer: isly.function<
					FunctionalComponent<{
						context: Context
					}>
				>(),
			},
			"binotype.Site.Design.Overrides"
		)
		.bind()
}
