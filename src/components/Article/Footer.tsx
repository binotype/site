import { binotype } from "@binotype/model"
import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Footer: FunctionalComponent<binotype.Context.Article<VNode>> & {
	override: FunctionalComponent<binotype.Context.Article<VNode>>
} = (properties, children, utils) => Footer.override(properties, children, utils)
Footer.override = (
	{ meta }: binotype.Context.Article<VNode>,
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
