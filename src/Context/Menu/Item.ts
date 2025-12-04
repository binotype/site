import { Site } from "../../Site"

export interface Item {
	label: string
	url: string
	selected: "current" | "parent" | undefined
	items: Item[]
}
export namespace Item {
	export function load(page: Site.Page, path: Site.Page.Path, current: string): Item | undefined {
		return page.menu === false
			? undefined
			: {
					label: Site.Page.getTitle(page),
					url: path.toString(),
					selected:
						current == path.toString() ? "current" : current.startsWith(path.toString() + "/") ? "parent" : undefined,
					items: page.pages
						? Object.entries(page.pages)
								.sort((left, right) => (left[1].weight ?? 0) - (right[1].weight ?? 0))
								.map(([key, childPage]) => Item.load(childPage, path.append(key), current))
								.filter((item): item is Item => item != undefined)
						: [],
			  }
	}
}
