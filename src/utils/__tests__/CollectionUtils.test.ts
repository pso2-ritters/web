import { compact, isNotEmpty } from "../CollectionUtils";

test("compact", () => {
	expect(compact([0, 1, null, true, false, undefined, NaN, ""])).toMatchObject([0, 1, true, false, NaN, ""]);
	expect(
		compact({
			a: 0,
			b: 1,
			c: null,
			d: true,
			e: false,
			f: undefined,
			g: NaN,
			h: "",
		}),
	).toMatchObject({
		a: 0,
		b: 1,
		d: true,
		e: false,
		g: NaN,
		h: "",
	});
});

test("isNotEmpty", () => {
	expect(isNotEmpty([])).toBe(false);

	expect(isNotEmpty([0])).toBe(true);
	expect(isNotEmpty([null])).toBe(true);
	expect(isNotEmpty([undefined])).toBe(true);
	expect(isNotEmpty([NaN])).toBe(true);
	expect(isNotEmpty([""])).toBe(true);
	expect(isNotEmpty([{}])).toBe(true);
});
