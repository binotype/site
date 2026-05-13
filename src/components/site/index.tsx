import { Component, Fragment, Prop, h } from "@stencil/core"
import { format } from "../../utils/utils"
import Test from "../Test"
import { Link } from "../Link"

@Component({ tag: "binotype-site", styleUrl: "style.css", shadow: true })
export class BinotypeSite {
	/**
	 * The first name
	 */
	@Prop() first?: string

	/**
	 * The middle name
	 */
	@Prop() middle?: string

	/**
	 * The last name
	 */
	@Prop() last?: string

	private getText(): string {
		return format(this.first, this.middle, this.last)
	}

	render() {
		return (
			<Fragment>
				<div>Hello, World! I'm {this.getText()}</div>
				<Test label={this.getText()} count={0}></Test>
				<Link link="https://stenciljs.com">Visit Stencil</Link>
			</Fragment>
		)
	}
}

const OldLink = Link.override
Link.override = ({ link }: Link.Properties, children, _utils) =>
	link && (
		<div style={{ color: "green", fontSize: "20px" }}>
			<OldLink link={link}>{children}</OldLink>
		</div>
	)
