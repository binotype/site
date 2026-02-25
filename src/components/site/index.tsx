import "../../polyfill"

import { Component, ComponentWillLoad, Fragment, h, Host, Prop, State, Watch } from "@stencil/core"
import { isly } from "isly"
import { Site } from "../../Site"
import { Page } from "../Page"

@Component({
	tag: "binotype-site",
	styleUrl: "style.css",
})
export class BinotypeSite implements ComponentWillLoad {
	@Prop() site?: Site | string
	@State() cache?: Site | isly.Flaw
	@Watch("site")
	componentWillLoad() {
		this.cache = typeof this.site == "string" ? JSON.parse(this.site) : this.site
	}
	render() {
		return (
			<Host>
				{!Site.is(this.cache) ? (
					<Fragment>
						<h1>Flawed Site Configuration</h1>
						<code>
							<pre>{JSON.stringify(Site.flawed(this.cache), undefined, 2)}</pre>
						</code>
					</Fragment>
				) : (
					<Page site={this.cache}></Page>
				)}
			</Host>
		)
	}
}
