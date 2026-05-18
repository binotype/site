/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */
import "./polyfill"

export type * from "./components.d.ts"

import { Block as _Block } from "./Block"
import { Clean as _Clean } from "./Clean"
import * as _components from "./components/index"
import { Content as _Content } from "./Content"
import { Context as _Context } from "./Context"
import { Article as _Article } from "./Context/Article"
import { Label as _Label } from "./Context/Label"
import { Menu as _Menu } from "./Context/Menu"
import { Section as _Section } from "./Context/Section"
import { Design as _Design } from "./Design"
import { Meta as _Meta } from "./Meta"
import { Mode as _Mode } from "./Mode"
import { Modes as _Modes } from "./Modes"
import { Page as _Page } from "./Page"
import { Parser as _Parser } from "./Parser"
import { Path as _Path } from "./Path"
import { Site as _Site } from "./Site"
import { Title as _Title } from "./Title"

export namespace binotype {
	export import components = _components
	export import Block = _Block
	export import Clean = _Clean
	export import Content = _Content
	export import Context = _Context
	export import Design = _Design
	export import Meta = _Meta
	export import Mode = _Mode
	export import Modes = _Modes
	export import Page = _Page
	export import Parser = _Parser
	export import Path = _Path
	export import Site = _Site
	export import Title = _Title
	export import Section = _Section
	export import Article = _Article
	export import Menu = _Menu
	export import Label = _Label
}
