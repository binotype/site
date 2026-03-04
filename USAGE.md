# Using Binotype Site Components

## Installation

```bash
npm install @binotype/site @stencil/core
```

## Basic Usage

### In React/Preact Projects

```tsx
import { h } from "@stencil/core"
import { Header, Footer, Context } from "@binotype/site"

// Example usage
function MyComponent() {
	const context: Context = {
		title: "My Site",
		tagline: "A sample tagline",
		design: {
			logotype: "/logo.png",
		},
	}

	return (
		<div>
			<Header context={context} />
			<main>Your content here</main>
			<Footer context={context} />
		</div>
	)
}
```

### In Vanilla JavaScript/TypeScript

```typescript
import { h, render } from "@stencil/core"
import { Header, Footer, Context } from "@binotype/site"

const context: Context = {
	title: "My Site",
	tagline: "A sample tagline",
}

const app = h("div", null, Header({ context }, null), h("main", null, "Your content here"), Footer({ context }, null))

render(app, document.getElementById("root"))
```

### In Stencil Projects

```tsx
import { Component, h } from "@stencil/core"
import { Header, Footer, Context } from "@binotype/site"

@Component({
	tag: "my-component",
})
export class MyComponent {
	render() {
		const context: Context = {
			title: "My Site",
			tagline: "A sample tagline",
		}

		return (
			<div>
				<Header context={context} />
				<main>Your content here</main>
				<Footer context={context} />
			</div>
		)
	}
}
```

## Available Components

### Functional Components

- `Article` - Article wrapper component
- `Footer` - Site footer with copyright
- `Header` - Site header with logo/title
- `Link` - Custom link component
- `List` - List wrapper component
- `Menu` - Navigation menu
- `Navigation` - Navigation wrapper
- `Page` - Page layout component
- `SelfLink` - Self-referencing link
- `Single` - Single item wrapper

### Web Component

- `<binotype-site>` - Main site component (can be used in any framework)

## Type Definitions

All components come with full TypeScript support. Import types as needed:

```typescript
import type { Header, Footer, Context, Site } from "@binotype/site"
```
