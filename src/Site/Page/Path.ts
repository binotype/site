import { isly } from "isly"

export class Path {
	get empty(): boolean {
		return this.parts.length == 0
	}
	get leaf(): boolean {
		return this.parts.length == 1
	}
	get head(): string | undefined {
		return this.parts.length > 0 ? this.parts[0] : undefined
	}
	get tail(): Path {
		return new Path(this.parts.slice(1))
	}
	private constructor(private readonly parts: string[]) {}
	getId(casing: "snake" | "camel" = "snake"): string {
		return Path.getId(this.head ?? "", casing)
	}
	append(id: string): Path {
		return new Path([...this.parts, Path.getId(id, "snake")])
	}
	toString(): string {
		return `/${this.parts.join("/")}`
	}
	static get empty(): Path {
		return new Path([])
	}
	static parse(path: string): Path {
		return new Path(path.split("/").filter(part => part != ""))
	}
	static getId(id: string, casing: "snake" | "camel" = "snake"): string {
		return casing == "snake"
			? (id
					.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
					.toLowerCase()
					.normalize("NFKD")
					.replace(/[\u0300-\u036f]/g, "")
					.replace(/[^a-z0-9-]+/g, "-")
					.replace(/-+/g, "-")
					.replace(/^-+|-+$/g, "") ?? "untitled")
			: id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
	}
}
export namespace Path {
	export const { is, flawed, type } = isly
		.object<Path>(
			{
				empty: isly.boolean().readonly(),
				leaf: isly.boolean().readonly(),
				head: isly.string().optional().readonly(),
				tail: isly.any().readonly(),
				getId: isly.function(),
				append: isly.function(),
				toString: isly.function(),
			},
			"binotype.Site.Page.Path",
		)
		.bind()
}
