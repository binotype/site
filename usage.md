# Using Binotype Site Components in Stencil SSG Apps

Guide for integrating `@binotype/site` components into your Stencil static site generation application.

## Installation

```bash
npm install @binotype/site
```

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

### Available Components

The `@binotype/site` package exports the following component:

- `<binotype-site>` - The main site component that handles page layout and content

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
					articles: [
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
					],
				},
			],
		},
	}
	render() {
		return <binotype-site site={this.siteConfig}></binotype-site>
	}
}
```
