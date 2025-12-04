import { Component, h, Host, Prop, State, Watch } from "@stencil/core"
import { model } from "../.."
import { Page } from "../Page"

@Component({
	tag: "binotype-site",
	styleUrl: "style.css",
})
export class BinotypeSite {
	@Prop() site?: model.Site | string
	@State() cache?: model.Site
	@Watch("site")
	onSiteChange(current: model.Site | string) {
		if (typeof current == "string")
			try {
				this.cache = JSON.parse(current)
			} catch {
				this.cache = undefined
			}
		else
			this.cache = current
	}

	render() {
		return (
			<Host>
				<Page site={this.cache}></Page>
			</Host>
		)
	}
}
