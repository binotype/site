import { Overrides as _Overrides } from "./Overrides"

export interface Design {
	logotype?: string
	icon?: string
	navigation?: "header" | "body"
	styles?: string[]
	scripts?: string[]
	home?: {
		mode: "body" | "full" | "header" | "list" | "summary"
		section: "article"
	}
	list?: {
		mode: "body" | "full" | "header" | "list" | "summary"
	}
	overrides?: Design.Overrides
}
export namespace Design {
	export import Overrides = _Overrides
}
