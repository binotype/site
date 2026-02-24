import { Config } from "@stencil/core"
import { sass } from "@stencil/sass"
import { inlineSvg } from "stencil-inline-svg"

const dev = process.argv.includes("--dev")

export const config: Config = {
	namespace: "binotype",
	autoprefixCss: false,
	buildEs5: "prod",
	devServer: {
		port: 3333,
		reloadStrategy: "pageReload",
	},
	extras: {
		enableImportInjection: true,
	},
	globalStyle: "src/main.scss",
	hashFileNames: !dev,
	hydratedFlag: {
		selector: "attribute",
	},
	outputTargets: [
		{
			type: "dist-custom-elements",
			dir: "dist/components",
			customElementsExportBehavior: "auto-define-custom-elements",
			externalRuntime: false,
			generateTypeDeclarations: true,
		},
		{
			type: "dist-hydrate-script",
			dir: "dist/hydrate",
		},
		{
			type: "docs-readme",
		},
		{
			type: "docs-vscode",
			file: "dist/docs/components-site-core-vscode.json",
		},
	],
	plugins: [inlineSvg(), sass()],
	testing: {
		browserHeadless: "shell",
	},
}
