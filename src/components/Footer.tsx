import { FunctionalComponent, h } from "@stencil/core"
import { model } from ".."

export const Footer: FunctionalComponent<Footer.Properties> = ({ context }) =>
	context.design?.overrides?.footer ? (
		<context.design.overrides.footer context={context}></context.design.overrides.footer>
	) : (
		<footer>
			<p>{`Copyright © ${new Date().getFullYear()} ${context.title}, All rights reserved`}</p>
		</footer>
	)
export namespace Footer {
	export interface Properties {
		context: model.Context
	}
}
