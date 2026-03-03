import { FunctionalComponent, h,VNode } from "@stencil/core"
import { Context } from "../Context"

export const Footer: FunctionalComponent<Footer.Properties> & { override: (context: Context) => VNode } = ({ context }) =>
	Footer.override(context)
Footer.override = (context: Context) => (
	<footer>
		<p>{`Copyright © ${new Date().getFullYear()} ${context.title}, All rights reserved`}</p>
	</footer>
)
export namespace Footer {
	export interface Properties {
		context: Context
	}
}
