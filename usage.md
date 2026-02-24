# Using Binotype Site Components in Stencil Apps

Guide for integrating `@binotype/site` components into your Stencil application.

## Installation

```bash
npm install @binotype/site
```

## Stencil Configuration

No special configuration is needed in your `stencil.config.ts`. Simply install the package and import components directly:

```typescript
import { Config } from "@stencil/core"

export const config: Config = {
	namespace: "my-app",
	outputTargets: [
		{
			type: "www",
			serviceWorker: null,
		},
	],
}
```

## Component Usage

### Import Components (Recommended)

With your current build configuration, components auto-define when imported:

```tsx
import { Component, h } from "@stencil/core"
// This automatically defines all components
import "@binotype/site"
import type { Site } from "@binotype/site"

@Component({
	tag: "my-app",
	styleUrl: "my-app.css",
})
export class MyApp {
	private siteConfig: Site = {
		title: "My Stencil Site",
		tagline: "Built with Binotype components",
		pages: [
			{
				path: "/",
				title: "Home",
				content: "Welcome to my site",
			},
		],
	}

	render() {
		return <binotype-site site={this.siteConfig}></binotype-site>
	}
}
```

### Alternative: Using the Loader

If you prefer explicit control over component loading:

```tsx
import { Component, h } from "@stencil/core"
import { defineCustomElements } from "@binotype/site/loader"
import type { Site } from "@binotype/site"

// Define the custom elements
defineCustomElements()

@Component({
	tag: "my-app",
	styleUrl: "my-app.css",
})
export class MyApp {
	private siteConfig: Site = {
		title: "My Stencil Site",
		tagline: "Built with Binotype components", 
		pages: [
			{
				path: "/",
				title: "Home",
				content: "Welcome to my site",
			},
		],
	}

	render() {
		return <binotype-site site={this.siteConfig}></binotype-site>
	}
}
```
```

### Individual Components

Import and use specific components:

```tsx
import { Component, h } from "@stencil/core"
import { Context } from "@binotype/site"

@Component({
	tag: "custom-layout",
})
export class CustomLayout {
	private headerContext: Context.Header = {
		title: "My Site",
		tagline: "Custom layout",
	}

	render() {
		return (
			<div>
				<binotype-header context={this.headerContext}></binotype-header>
				<main>
					<slot></slot>
				</main>
				<binotype-footer></binotype-footer>
			</div>
		)
	}
}
```

### Navigation Component

```tsx
import { Component, h } from "@stencil/core"
import { Context } from "@binotype/site"

@Component({
	tag: "app-navigation",
})
export class AppNavigation {
	private menuContext: Context.Menu = {
		items: [
			{ title: "Home", path: "/" },
			{ title: "About", path: "/about" },
			{ title: "Contact", path: "/contact" },
		],
	}

	render() {
		return <binotype-navigation context={this.menuContext}></binotype-navigation>
	}
}
```

## TypeScript Integration

Import types for full TypeScript support:

```tsx
import { Component, h, Prop } from "@stencil/core"
import type { Site, Context } from "@binotype/site"

@Component({
	tag: "page-wrapper",
})
export class PageWrapper {
	@Prop() site!: Site
	@Prop() pageContext!: Context.Article.Header

	render() {
		return (
			<div class="page-wrapper">
				<binotype-page site={this.site}>
					<binotype-article-header context={this.pageContext}></binotype-article-header>
					<slot></slot>
				</binotype-page>
			</div>
		)
	}
}
```

## Advanced Usage

### Custom Site Builder

```tsx
import { Component, h, State } from "@stencil/core"
import { Site } from "@binotype/site"

@Component({
	tag: "site-builder",
})
export class SiteBuilder {
	@State() currentSite: Site

	componentWillLoad() {
		this.currentSite = {
			title: "Dynamic Site",
			pages: this.buildPages(),
			design: {
				logotype: "/assets/logo.svg",
			},
		}
	}

	private buildPages() {
		return [
			{
				path: "/",
				title: "Home",
				sections: [
					{
						type: "hero",
						content: "Welcome to our site",
					},
				],
			},
		]
	}

	render() {
		return <binotype-site site={this.currentSite}></binotype-site>
	}
}
```

### Extending Components

Create components that wrap Binotype components:

```tsx
import { Component, h, Prop } from "@stencil/core"
import { Context } from "@binotype/site"

@Component({
	tag: "branded-header",
	styleUrl: "branded-header.css",
})
export class BrandedHeader {
	@Prop() title: string
	@Prop() subtitle?: string

	render() {
		const headerContext: Context.Header = {
			title: this.title,
			tagline: this.subtitle,
			design: {
				logotype: "/assets/brand-logo.svg",
			},
		}

		return (
			<div class="branded-wrapper">
				<binotype-header context={headerContext}>
					<slot name="actions"></slot>
				</binotype-header>
			</div>
		)
	}
}
```

### Event Handling

Handle events from Binotype components:

```tsx
import { Component, h, Listen } from "@stencil/core"

@Component({
	tag: "app-root",
})
export class AppRoot {
	@Listen("binotypeNavigate")
	handleNavigation(event: CustomEvent) {
		console.log("Navigation:", event.detail)
		// Handle routing logic
	}

	@Listen("binotypeMenuToggle")
	handleMenuToggle(event: CustomEvent) {
		console.log("Menu toggled:", event.detail)
		// Handle menu state
	}

	render() {
		return (
			<div>
				<binotype-site site={this.siteConfig}></binotype-site>
			</div>
		)
	}
}
```

## Styling Integration

### Global Styles

Import Binotype styles in your global stylesheet:

```scss
// src/global/app.scss
@import "@binotype/site/dist/binotype/binotype.css";

// Your custom overrides
binotype-site {
	--binotype-primary-color: #007acc;
	--binotype-font-family: "Inter", sans-serif;
}
```

### Component-Level Styling

Override styles at the component level:

```scss
// my-component.scss
:host {
	binotype-header {
		--header-background: var(--my-brand-color);
		--header-text-color: white;
	}
}
```

## Development Workflow

### Local Development

1. Install the collection: `npm install @binotype/site`
2. Import components using the auto-import (recommended) or loader approach
3. Import types and use components in JSX
4. Run: `stencil build --dev --watch --serve`

### Production Build

```bash
npm run build
```

The Stencil compiler will automatically include the Binotype components in your bundle when used.

## Best Practices

1. **Type Safety**: Always import and use TypeScript interfaces
2. **Performance**: Only import components you actually use
3. **Styling**: Use CSS custom properties for theming
4. **Configuration**: Create reusable site configuration objects
5. **Testing**: Test your components that use Binotype components

## Example Project Structure

```
src/
├── components/
│   ├── app-root/
│   │   ├── app-root.tsx
│   │   └── app-root.css
│   └── page-layout/
│       ├── page-layout.tsx
│       └── page-layout.css
├── global/
│   └── app.css
├── utils/
│   └── site-config.ts
└── index.html
```

## Troubleshooting

**Components not found**: Ensure you've imported the components using `import "@binotype/site"` (auto-defining) or `defineCustomElements()` from the loader.

**Loader module not found**: Make sure you've rebuilt after adding the loader export, or use the auto-import approach instead.

**Type errors**: Import the necessary types from `@binotype/site`.

**Styling issues**: Check that CSS custom properties are properly scoped.
