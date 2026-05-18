import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"
import { Context } from "../../Context"

export const Footer: FunctionalComponent<Context.Article<VNode>> & {
	override: FunctionalComponent<Context.Article<VNode>>
} = (properties, children, utils) => Footer.override(properties, children, utils)
Footer.override = (
	{ meta }: Context.Article<VNode>,
	children: VNode[],
	_utils: FunctionalUtilities
): VNode | VNode[] | null => (
	<footer>
		{children}
		<p>
			{meta?.copyright && <span id="footer-copyright">{meta.copyright}</span>}
			{meta?.license && <span id="footer-license">{meta.license}</span>}
		</p>
	</footer>
)
export namespace Footer {}
