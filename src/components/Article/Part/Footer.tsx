import { FunctionalComponent, h } from "@stencil/core"

export const Footer: FunctionalComponent<Footer.Properties> = ({ copyright, license }) => (
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
