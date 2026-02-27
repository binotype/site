// Core JavaScript types that should always be safe
globalThis.Array ??= Array
globalThis.Boolean ??= Boolean
globalThis.Date ??= Date
globalThis.Error ??= Error
globalThis.Function ??= Function
globalThis.Number ??= Number
globalThis.Object ??= Object
globalThis.Promise ??= Promise
globalThis.RegExp ??= RegExp
globalThis.String ??= String
globalThis.Symbol ??= Symbol

// Typed arrays
globalThis.ArrayBuffer ??= ArrayBuffer
globalThis.DataView ??= DataView
globalThis.Int8Array ??= Int8Array
globalThis.Int16Array ??= Int16Array
globalThis.Int32Array ??= Int32Array
globalThis.Uint8Array ??= Uint8Array
globalThis.Uint8ClampedArray ??= Uint8ClampedArray
globalThis.Uint16Array ??= Uint16Array
globalThis.Uint32Array ??= Uint32Array
globalThis.Float32Array ??= Float32Array
globalThis.Float64Array ??= Float64Array
globalThis.BigInt64Array ??= BigInt64Array
globalThis.BigUint64Array ??= BigUint64Array

// Collections
globalThis.Map ??= Map
globalThis.Set ??= Set
globalThis.WeakMap ??= WeakMap
globalThis.WeakSet ??= WeakSet

// Errors
globalThis.AggregateError ??= AggregateError
globalThis.EvalError ??= EvalError
globalThis.RangeError ??= RangeError
globalThis.ReferenceError ??= ReferenceError
globalThis.SyntaxError ??= SyntaxError
globalThis.TypeError ??= TypeError
globalThis.URIError ??= URIError

// Advanced types
globalThis.BigInt ??= BigInt
globalThis.Proxy ??= Proxy
globalThis.Reflect ??= Reflect
globalThis.WeakRef ??= WeakRef
globalThis.FinalizationRegistry ??= FinalizationRegistry

// Shared memory (if available)
if (typeof SharedArrayBuffer !== "undefined") {
	globalThis.SharedArrayBuffer ??= SharedArrayBuffer
}
if (typeof Atomics !== "undefined") {
	globalThis.Atomics ??= Atomics
}

// Built-in objects
globalThis.Math ??= Math
globalThis.Intl ??= Intl

// JSON methods
if (typeof JSON !== "undefined") {
	globalThis.JSON ??= JSON
	if (globalThis.JSON) {
		globalThis.JSON.parse ??= JSON.parse
		globalThis.JSON.stringify ??= JSON.stringify
	}
}

// Ensure Number static methods are available
if (globalThis.Number && typeof Number !== "undefined") {
	globalThis.Number.isInteger ??= Number.isInteger
	globalThis.Number.isFinite ??= Number.isFinite
	globalThis.Number.isNaN ??= Number.isNaN
	globalThis.Number.isSafeInteger ??= Number.isSafeInteger
}
