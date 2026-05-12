import { FunctionalComponent, h } from "@stencil/core"

export const Test: FunctionalComponent<Test.Properties> = ({ label = "Functional test component", count = 0 }) => {
	return (
		<section data-testid="functional-test-component">
			<h2>{label}</h2>
			<p>Count: {count}</p>
		</section>
	)
}
export namespace Test {
	export type Properties = { label?: string; count?: number }
}
export default Test
