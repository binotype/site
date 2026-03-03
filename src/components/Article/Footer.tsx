import { FunctionalComponent, h, VNode } from "@stencil/core"

export const Footer: FunctionalComponent<Footer.Properties> & {
	override: (properties: Footer.Properties) => VNode | VNode[] | null
} = properties => Footer.override(properties)
Footer.override = ({ copyright, license }: Footer.Properties): VNode | VNode[] | null => (
	<footer>
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
