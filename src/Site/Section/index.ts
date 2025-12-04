import { isly } from "isly"

export interface Section {
	title?: string
	type?: string
	content: string
}
export namespace Section {
	export const { is, flawed, type } = isly
		.object<Section>(
			{
				title: isly.string().optional(),
				type: isly.string().optional(),
				content: isly.string(),
			},
			"binotype.Site.Section"
		)
		.bind()
}
