# Using Binotype Site Components in Stencil SSG Apps

Guide for integrating `@binotype/site` components into your Stencil static site generation application.

## Installation

```bash
npm install @binotype/site isly isoly
```

> **Note**: `isly` and `isoly` are peer dependencies required for proper component functionality.

## Stencil Configuration

Configure your Stencil app for static site generation:

```typescript
import { Config } from "@stencil/core"

export const config: Config = {
	namespace: "my-app",
	outputTargets: [
		{
			type: "www",
			serviceWorker: null,
			prerender: {
				crawlUrls: true,
			},
		},
	],
}
```

## Component Usage

### Recommended Approach

Use the loader to properly handle all dependencies:

```tsx
import { Component, h } from "@stencil/core"
import { defineCustomElements } from "@binotype/site/loader"
import type { Site } from "@binotype/site"

// Define all components once in your app root
defineCustomElements()

@Component({
	tag: "app-root",
	styleUrl: "app-root.css",
})
export class AppRoot {
	private siteConfig: Site = {
		url: "https://example.com",
		language: "en",
		title: "My Static Site",
		tagline: "Built with Stencil SSG and Binotype",
		author: "Your Name",
		description: "A static site generated with Stencil",
		design: {
			overrides: {},
		},
		page: {
			path: { segments: [] },
		},
	}

	render() {
		return <binotype-site site={this.siteConfig}></binotype-site>
	}
}
```

## Static Site Configuration

### Multi-page Site Structure

```tsx
import { Component, h } from "@stencil/core"
import { defineCustomElements } from "@binotype/site/loader"
import type { Site } from "@binotype/site"

defineCustomElements()

@Component({
	tag: "app-root",
})
export class AppRoot {
	private siteConfig: Site = {
		url: "https://example.com",
		language: "en",
		title: "My Blog",
		tagline: "Thoughts and musings",
		author: "John Doe",
		description: "A personal blog about web development",
		keywords: ["web development", "javascript", "stencil"],
		design: {
			logotype: "/assets/logo.svg",
			overrides: {
				colors: {
					primary: "#007acc",
					background: "#ffffff",
				},
			},
		},
		page: {
			path: {
				segments: ["blog", "posts"],
			},
			sections: [
				{
					type: "header",
					title: "Welcome to my blog",
				},
				{
					type: "content",
					articles: this.getArticles(),
				},
			],
		},
	}

	private getArticles() {
		return [
			{
				title: "Getting started with Stencil",
				slug: "getting-started-stencil",
				date: "2024-01-15",
				content: "Learn how to build components with Stencil...",
			},
			{
				title: "Static Site Generation with Stencil",
				slug: "ssg-with-stencil",
				date: "2024-01-10",
				content: "Explore the benefits of SSG...",
			},
		]
	}

	render() {
		return <binotype-site site={this.siteConfig}></binotype-site>
	}
}
```

## TypeScript Support

Full TypeScript integration is included:

```tsx
import { Component, h, Prop } from "@stencil/core"
import { defineCustomElements } from "@binotype/site/loader"
import type { Site, Context } from "@binotype/site"

defineCustomElements()

@Component({
	tag: "blog-page",
})
export class BlogPage {
	@Prop() siteData!: Site

	render() {
		return (
			<binotype-page site={this.siteData}>
				<main>
					<slot></slot>
				</main>
			</binotype-page>
		)
	}
}
```

## Styling for Static Sites

### Global Theme Configuration

```scss
// src/global/app.scss
@import "@binotype/site/dist/binotype/binotype.css";

// Static site theme customization
:root {
	--binotype-primary-color: #007acc;
	--binotype-font-family: "Inter", -apple-system, sans-serif;
	--binotype-background-color: #ffffff;
	--binotype-text-color: #333333;
}

binotype-site {
	--site-max-width: 1200px;
	--site-padding: 2rem;
}
```

## Development Workflow

### Static Site Generation

1. Install the library and peer dependencies: `npm install @binotype/site isly isoly`
2. Import and call `defineCustomElements()` from `@binotype/site/loader` once in your app root
3. Configure site data and use `<binotype-site>` component
4. Build for prerendering: `stencil build --prerender`

### Local Development

```bash
# Start development server with prerendering
stencil build --dev --watch --serve --prerender

# Build for production
stencil build --prerender
```

## Best Practices for SSG

1. **Single Initialization**: Call `defineCustomElements()` once in your app root component
2. **Complete Site Configuration**: Provide all required Site properties for proper SSG
3. **Static Assets**: Use relative paths for images and assets
4. **SEO Optimization**: Fill in meta fields (title, description, keywords, author)
5. **Performance**: Use CSS custom properties for theming instead of runtime styling

## Troubleshooting

**Missing peer dependencies**: If you get dependency errors, ensure you've installed all peer dependencies: `npm install isly isoly`

**Components not found**: Ensure you've called `defineCustomElements()` from `@binotype/site/loader` in your app root.

**Dependency errors (Cannot read properties of undefined reading 'isInteger')**: Install the required peer dependencies: `npm install isly isoly`

**Prerendering issues**: Make sure your Site configuration is complete and doesn't rely on browser-only APIs.

**Type errors**: Import the necessary types: `import type { Site } from "@binotype/site"`
