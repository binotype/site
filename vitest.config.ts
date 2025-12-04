import stencil from "unplugin-stencil/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		include: ["src/**/*.{test,spec}.{js,ts,tsx}"],
		globals: true,
		server: {
			deps: {
				inline: [
					"authly",
					"isly",
					"typedly",
					"cloudly-analytics",
					"cryptly",
					"isoly",
					"cloudly-http",
					"sessionly",
					"flagly",
					"cloudly-storage",
					"cloudly-rest",
					"tidily",
					"gracely",
					"cloudly-router",
					"selectively",
					"langly",
				],
			},
		},
	},
	plugins: [stencil()],
})
