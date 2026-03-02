import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"
import { Overrides } from "../Overrides"

export const Footer: FunctionalComponent<Footer.Properties> = ({ context, overrides }) =>
	typeof overrides?.footer == "function" ? (
		<overrides.footer context={context}></overrides.footer>
	) : overrides?.footer ? (
		overrides.footer
	) : (
		<footer>
			<p>{`Copyright © ${new Date().getFullYear()} ${context.title}, All rights reserved`}</p>
		</footer>
	)
export namespace Footer {
	export interface Properties {
		context: Context
		overrides?: Overrides
	}
}
