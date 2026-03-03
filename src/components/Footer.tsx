import { FunctionalComponent, h } from "@stencil/core"
import { Context } from "../Context"
import { Override } from "../Override"
import { Overrides } from "../Overrides"

export const Footer: FunctionalComponent<Footer.Properties> = ({ context, overrides }) =>
	Override.use(
		overrides?.footer ?? (
			<footer>
				<p>{`Copyright © ${new Date().getFullYear()} ${context.title}, All rights reserved`}</p>
			</footer>
		),
		context,
	)
export namespace Footer {
	export interface Properties {
		context: Context
		overrides?: Overrides
	}
}
