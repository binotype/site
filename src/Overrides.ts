import { isly } from "isly"
import type { Context } from "./Context"
import { Override } from "./Override"

export interface Overrides {
	footer?: Override<{ context: Context }>
}
export namespace Overrides {
	export const { is, flawed, type } = isly
		.object<Overrides>(
			{
				footer: Override.type.optional(),
			},
			"binotype.Site.Design.Overrides",
		)
		.bind()
}
