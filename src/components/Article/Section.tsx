import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { SelfLink } from "../SelfLink"
import { Content } from "./Content"
import { Header } from "./Header"
import { Context } from "../../Context"

export const Section: FunctionalComponent<Context.Section<VNode>> & {
	override: FunctionalComponent<Context.Section<VNode>>
	overrides: Partial<Record<string, FunctionalComponent<Context.Section<VNode>>>>
} = (properties, children, utils) => Section.override(properties, children, utils)
Section.override = (
	properties: Context.Section<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null =>
	(Section.overrides[properties.type || "default"] || Section.overrides["default"])?.(properties, children, _utils)
	|| null
Section.overrides = {
	default: (
		section: Context.Section<VNode>,
		children: VNode[],
		_utils: FunctionalUtilities
	): VNode | VNode[] | null => (
		<section id={section.id} class={`type-${section.type}`}>
			{typeof section.title == "string" && <Header {...section} />}
			{section.content && <Content {...section} />}
			{section.sections && section.sections.map(s => <Section {...s} />)}
			{children}
			{typeof section.link == "string" && <SelfLink link={section.link}></SelfLink>}
		</section>
	)
}
export namespace Section {}
