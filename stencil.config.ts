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
  validatePrimaryPackageOutputTarget: true,
	outputTargets: [
		{
      isPrimaryPackageOutputTarget: true,
			type: "dist",
			dir: "dist",
		},
		{
			type: "www",
			// comment the following line to disable service workers in production
			serviceWorker: null,
			baseUrl: "https://site.binotype.org/",
			prerenderConfig: "./prerender.config.ts",
		},
	],
	plugins: [inlineSvg(), sass()],
	testing: {
		browserHeadless: "shell",
	},
}
