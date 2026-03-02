import { Component, ComponentWillLoad, Fragment, h, Host, Prop, State, Watch } from "@stencil/core"
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
		return (
			<Host>
				{Site.is(this.cache) ? (
					[
						<Page site={this.cache} debug={this.debug == true || this.debug == "context"} overrides={this.overrides}></Page>,
						(this.debug == true || this.debug == "site") && (
							<details>
								<summary>
									<h1>Site Configuration</h1>
								</summary>
								<code>
									<pre>{JSON.stringify(this.cache, undefined, 2)}</pre>
								</code>
							</details>
						),
					]
				) : (
					<Fragment>
						<h1>Flawed Site Configuration</h1>
						<code>
							<pre>{JSON.stringify(Site.flawed(this.cache), undefined, 2)}</pre>
						</code>
					</Fragment>
				)}
			</Host>
		)
	}
}
