import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { binotype } from "@binotype/model"

export const Footer: FunctionalComponent<Footer.Properties> & {
	override: FunctionalComponent<Footer.Properties>
} = (properties, children, utils) => Footer.override(properties, children, utils)
Footer.override = (
	{ context }: Footer.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<footer>
		{children}
		<p>{`Copyright © ${new Date().getFullYear()} ${context.title}, All rights reserved`}</p>
	</footer>
)
export namespace Footer {
	export interface Properties {
		context: binotype.Context
	}
}
