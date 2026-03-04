import { FunctionalComponent, FunctionalUtilities, h, VNode } from "@stencil/core"

export const Footer: FunctionalComponent<Footer.Properties> & {
	override: FunctionalComponent<Footer.Properties>
} = (properties, children, utils) => Footer.override(properties, children, utils)
Footer.override = (
	{ copyright, license }: Footer.Properties,
	children: VNode[],
	utils: FunctionalUtilities,
): VNode | VNode[] | null => (
	<footer>
		{children}
		<p>
			{copyright && <span id="footer-copyright">{copyright}</span>}
			{license && <span id="footer-license">{license}</span>}
		</p>
	</footer>
)
export namespace Footer {
	export interface Properties {
		copyright: string
		license: string
	}
}
