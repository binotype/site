import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default [
	js.configs.recommended,
	{
		ignores: ["src/components.d.ts", "www/**", "dist/**"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				console: "readonly",
				document: "readonly",
				window: "readonly",
				HTMLElement: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": typescriptEslint,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-namespace": "off",
			"prefer-const": 1,
			"no-redeclare": "off", // Allow TypeScript declaration merging
			"@typescript-eslint/no-unused-vars": [
				2,
				{
					vars: "all",
					args: "none",
					varsIgnorePattern: "h",
				},
			],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"no-case-declarations": "off",
			"no-inner-declarations": "off",
			"sort-imports": "off",
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						[
							"@stencil/core",
							"cryptly",
							"flagly",
							"gracely",
							"isoly",
							"paramly",
							"selectively",
							"langly",
							"tidily",
							"uply",
							"authly",
							"persistly",
							"servly",
							"servly-azure",
							"smoothly",
							"^\\u0000",
							"^@?\\w",
							"^",
							"^\\.",
						],
					],
				},
			],
		},
	},
]
