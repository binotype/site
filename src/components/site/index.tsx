import { binotype } from "@binotype/model"
import { Component, ComponentWillLoad, Fragment, h, Host, Prop, State, VNode, Watch } from "@stencil/core"
import { Node } from "../Node"
import { Page } from "../Page"
import "../polyfill"

@Component({ tag: "binotype-site", styleUrl: "style.css" })
export class BinotypeSite implements ComponentWillLoad {
	@Prop() site?: binotype.Site<VNode> | string
	@Prop() debug: boolean | "site" | "context" = false
	@State() cache?: binotype.Site<VNode>
	@Watch("site")
	componentWillLoad() {
		this.cache = typeof this.site == "string" ? JSON.parse(this.site) : this.site
	}
	render() {
		return (
			<Host>
				{binotype.Site.getType(Node.type as any).is(this.cache) ? (
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
						)
					]
				) : (
					<Fragment>
						<h1>Flawed Site Configuration</h1>
						<code>
							<pre>{JSON.stringify(binotype.Site.getType(Node.type as any).flawed(this.cache), undefined, 2)}</pre>
						</code>
					</Fragment>
				)}
			</Host>
		)
	}
}
