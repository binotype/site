import { VNode } from "@stencil/core"
import { isly } from "isly"
import type { Article } from "./components/Article"
import type { Footer } from "./components/Footer"
import type { Head } from "./components/Head"
import type { Header } from "./components/Header"
import type { Link } from "./components/Link"
import type { List } from "./components/List"
import type { Menu } from "./components/Menu"
import type { Navigation } from "./components/Navigation"
import type { Page } from "./components/Page"
import type { SelfLink } from "./components/SelfLink"
import type { Single } from "./components/Single"

export type Override<T> = ((props: T, components: Override.Components) => VNode) | VNode | VNode[]

export namespace Override {
	export interface Components {
		Article: typeof Article
		Footer: typeof Footer
		Head: typeof Head
		Header: typeof Header
		Link: typeof Link
		List: typeof List
		Menu: typeof Menu
		Navigation: typeof Navigation
		Page: typeof Page
		SelfLink: typeof SelfLink
		Single: typeof Single
	}
	export const { is, flawed, type } = isly
		.any("((props: T, components: Override.Components) => VNode) | VNode | VNode[]")
		.bind()
	let useImplementation: ((override: Override<any>, properties: any) => VNode | VNode[]) | undefined = undefined
	export function registerUse<T>(implementation: (override: Override<T>, properties: T) => VNode | VNode[]) {
		useImplementation = implementation
	}
	export function use<T>(override: Override<T>, properties: T): VNode | VNode[] {
		return useImplementation ? useImplementation(override, properties) : []
	}
}
