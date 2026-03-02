import { Component, ComponentWillLoad, h, Prop, State, Watch } from "@stencil/core"
import "../../polyfill"
import { Overrides } from "../../Overrides"
import { Site } from "../../Site"
import { Page } from "../Page"

@Component({
	tag: "binotype-site",
	styleUrl: "style.css",
})
export class BinotypeSite implements ComponentWillLoad {
	@Prop() site?: Site | string
	@Prop() debug: boolean | "site" | "context" = false
	@Prop() overrides?: Overrides
	@State() cache?: Site
	@Watch("site")
	componentWillLoad() {
		this.cache = typeof this.site == "string" ? JSON.parse(this.site) : this.site
	}
	render() {
		return (<Page
			site={this.cache}
			debug={this.debug == true || this.debug == "context"}
			overrides={this.overrides}
		></Page>
		)
	}
}
