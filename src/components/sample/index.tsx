import { Component, ComponentWillLoad, Fragment, h, Host, Prop, State, Watch } from "@stencil/core"
import "../../polyfill"
import { binotype } from "@binotype/model"
import { Page } from "../binotype/Page"

@Component({
	tag: "binotype-sample",
	styleUrl: "style.css",
})
export class BinotypeSample implements ComponentWillLoad {
	@Prop() site?: binotype.Site | string
	@Prop() debug: boolean | "site" | "context" = false
	@State() cache?: binotype.Site
	@Watch("site")
	componentWillLoad() {
		this.cache = typeof this.site == "string" ? JSON.parse(this.site) : this.site
	}
	render() {
		return (
			<Host>
				{binotype.Site.is(this.cache) ? (
					[
						<Page site={this.cache} debug={this.debug == true || this.debug == "context"}></Page>,
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
							<pre>{JSON.stringify(binotype.Site.flawed(this.cache), undefined, 2)}</pre>
						</code>
					</Fragment>
				)}
			</Host>
		)
	}
}
