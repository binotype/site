import { defineVitestConfig } from "@stencil/vitest/config"
import { playwright } from "@vitest/browser-playwright"
import { existsSync } from "node:fs"
import path from "node:path"

export default defineVitestConfig({
	stencilConfig: "./stencil.config.ts",
	ssr: { noExternal: ["isly", "isoly", "mendly", "tidily", "@typeup/dom", "@typeup/parser"] },
	plugins: [
		{
			name: "resolve-extensionless-node-modules-imports",
			enforce: "pre",
			resolveId(source, importer) {
				if (!importer || !importer.includes("/node_modules/")) return null
				if (!source.startsWith(".") && !source.startsWith("/")) return null
				const base = path.resolve(path.dirname(importer), source)
				const candidates = [
					`${base}.js`,
					`${base}.node.js`,
					path.join(base, "index.js"),
					path.join(base, "index.node.js")
				]
				for (const candidate of candidates) if (existsSync(candidate)) return candidate
				return null
			}
		}
	],
	resolve: {
		alias: {
			"isly/dist/mjs/isly": "isly/dist/mjs/isly.js",
			"mendly/dist/Device": "mendly/dist/Device/index.js",
			"mendly/dist/Enumerator": "mendly/dist/Enumerator/index.js",
			"mendly/dist/Error": "mendly/dist/Error/index.js",
			"mendly/dist/Uri": "mendly/dist/Uri/index.js",
			"mendly/dist/Reader": "mendly/dist/Reader/index.js",
			"mendly/dist/Writer": "mendly/dist/Writer/index.js",
			"mendly/dist/Reader/index.node": "mendly/dist/Reader/index.node.js",
			"mendly/dist/Writer/index.node": "mendly/dist/Writer/index.node.js"
		}
	},
	test: {
		projects: [
			// Unit tests - stencil environment for component logic
			{
				test: {
					name: "unit",
					include: ["src/**/*.unit.test.{ts,tsx}"],
					environment: "stencil",
					server: { deps: { inline: ["isly", "isoly", "mendly", "tidily", "@typeup/dom", "@typeup/parser"] } }
				}
			},
			// Component browser tests - real browser via Playwright
			{
				test: {
					name: "browser",
					include: ["src/**/*.cmp.test.{ts,tsx}"],
					setupFiles: ["./vitest-setup.ts"],
					server: { deps: { inline: ["isly", "isoly", "mendly", "tidily", "@typeup/dom", "@typeup/parser"] } },
					browser: { enabled: true, provider: playwright(), headless: true, instances: [{ browser: "chromium" }] }
				}
			}
		]
	}
})
