import { FunctionalComponent } from "@stencil/core"
import type { Context } from "../../Context"

export interface Overrides {
	footer?: FunctionalComponent<{
		context: Context
	}>
}
export namespace Overrides {}
