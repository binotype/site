import { isoly } from "isoly"
import { Design as _Design } from "./Design"
import { Page as _Page } from "./Page"
import { Section as _Section } from "./Section"

export interface Site {
	url: string
	language: isoly.Locale
	title: string
	tagline: string
	description?: string
	keywords?: string[]
	author?: string
	design: Site.Design
	page: Site.Page
}
export namespace Site {
	export import Design = _Design
	export import Page = _Page
	export import Section = _Section
}
