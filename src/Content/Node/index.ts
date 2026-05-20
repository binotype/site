import { VNode } from "@stencil/core"
import { isly } from "isly"
import { Object as _Object } from "./Object"

export type Node = VNode

export namespace Node {
	export import Object = _Object
	export const {
		type,
		is,
		flawed
	}: isly.BindResult<Node, isly.Object<Node>> = (
		isly.object(
			{
				$flags$: isly.number(),
				$tag$: isly.union(isly.string(), isly.number(), isly.function(), isly.null(), isly.undefined()),
				$attrs$: isly.union(isly.any(), isly.null()).optional(),
				$elm$: isly.union(isly.any(), isly.null()),
				$text$: isly.union(isly.string(), isly.null()),
				$children$: isly.union(isly.lazy((): any => Node.type, "VNode").array(), isly.null()),
				$name$: isly.union(isly.string(), isly.null()).optional(),
				$key$: isly.union(isly.string(), isly.number(), isly.null()).optional()
			},
			"binotype.Node"
		) as isly.Object<Node>
	).bind()
	export function plain(node: Node): string {
		return [node.$text$ ?? "", ...(node.$children$?.map(plain) ?? [])].join("")
	}
}

/*
$attrs$ = any
$children$ = [ {$flags$: 0, $tag$: null, $text$: 'This is a single node content.', $elm$: null, $children$: null, …} ]
$attrs$ = null
$children$ = null
$elm$ = null
$flags$ = 0
$key$ = null
$name$ = null
$tag$ = null
$text$ = 'This is a single node content.'

$elm$ = null
$flags$ = 0
$key$ = null
$name$ = null
$tag$ = undefined
$text$ = null

export interface VNode {
    $flags$: number;
    $tag$: string | number | Function;
    $elm$: any;
    $text$: string;
    $children$: VNode[];
    $attrs$?: any;
    $name$?: string;
    $key$?: string | number;
}

*/
