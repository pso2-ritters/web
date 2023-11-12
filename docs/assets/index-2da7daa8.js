(function () {
	const t = document.createElement("link").relList;
	if (t && t.supports && t.supports("modulepreload")) return;
	for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
	new MutationObserver((r) => {
		for (const o of r)
			if (o.type === "childList")
				for (const l of o.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && s(l);
	}).observe(document, { childList: !0, subtree: !0 });
	function n(r) {
		const o = {};
		return (
			r.integrity && (o.integrity = r.integrity),
			r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
			r.crossOrigin === "use-credentials"
				? (o.credentials = "include")
				: r.crossOrigin === "anonymous"
				? (o.credentials = "omit")
				: (o.credentials = "same-origin"),
			o
		);
	}
	function s(r) {
		if (r.ep) return;
		r.ep = !0;
		const o = n(r);
		fetch(r.href, o);
	}
})();
function bn(e, t) {
	const n = Object.create(null),
		s = e.split(",");
	for (let r = 0; r < s.length; r++) n[s[r]] = !0;
	return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const L = {},
	ze = [],
	fe = () => {},
	xr = () => !1,
	yr = /^on[^a-z]/,
	jt = (e) => yr.test(e),
	xn = (e) => e.startsWith("onUpdate:"),
	J = Object.assign,
	yn = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	},
	vr = Object.prototype.hasOwnProperty,
	H = (e, t) => vr.call(e, t),
	I = Array.isArray,
	qe = (e) => Kt(e) === "[object Map]",
	vs = (e) => Kt(e) === "[object Set]",
	P = (e) => typeof e == "function",
	z = (e) => typeof e == "string",
	St = (e) => typeof e == "symbol",
	$ = (e) => e !== null && typeof e == "object",
	ws = (e) => ($(e) || P(e)) && P(e.then) && P(e.catch),
	Es = Object.prototype.toString,
	Kt = (e) => Es.call(e),
	wr = (e) => Kt(e).slice(8, -1),
	Cs = (e) => Kt(e) === "[object Object]",
	vn = (e) => z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	Tt = bn(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
	),
	Lt = (e) => {
		const t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	Er = /-(\w)/g,
	Ye = Lt((e) => e.replace(Er, (t, n) => (n ? n.toUpperCase() : ""))),
	Cr = /\B([A-Z])/g,
	ke = Lt((e) => e.replace(Cr, "-$1").toLowerCase()),
	Os = Lt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	Qt = Lt((e) => (e ? `on${Os(e)}` : "")),
	Le = (e, t) => !Object.is(e, t),
	kt = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t);
	},
	Mt = (e, t, n) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
	},
	Or = (e) => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let zn;
const on = () =>
	zn ||
	(zn =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
			? self
			: typeof window < "u"
			? window
			: typeof global < "u"
			? global
			: {});
function wn(e) {
	if (I(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const s = e[n],
				r = z(s) ? Ar(s) : wn(s);
			if (r) for (const o in r) t[o] = r[o];
		}
		return t;
	} else if (z(e) || $(e)) return e;
}
const Tr = /;(?![^(]*\))/g,
	Ir = /:([^]+)/,
	Pr = /\/\*[^]*?\*\//g;
function Ar(e) {
	const t = {};
	return (
		e
			.replace(Pr, "")
			.split(Tr)
			.forEach((n) => {
				if (n) {
					const s = n.split(Ir);
					s.length > 1 && (t[s[0].trim()] = s[1].trim());
				}
			}),
		t
	);
}
function En(e) {
	let t = "";
	if (z(e)) t = e;
	else if (I(e))
		for (let n = 0; n < e.length; n++) {
			const s = En(e[n]);
			s && (t += s + " ");
		}
	else if ($(e)) for (const n in e) e[n] && (t += n + " ");
	return t.trim();
}
const Mr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	Rr = bn(Mr);
function Ts(e) {
	return !!e || e === "";
}
const qn = (e) =>
		z(e)
			? e
			: e == null
			? ""
			: I(e) || ($(e) && (e.toString === Es || !P(e.toString)))
			? JSON.stringify(e, Is, 2)
			: String(e),
	Is = (e, t) =>
		t && t.__v_isRef
			? Is(e, t.value)
			: qe(t)
			? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => ((n[`${s} =>`] = r), n), {}) }
			: vs(t)
			? { [`Set(${t.size})`]: [...t.values()] }
			: $(t) && !I(t) && !Cs(t)
			? String(t)
			: t;
let oe;
class Fr {
	constructor(t = !1) {
		(this.detached = t),
			(this._active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = oe),
			!t && oe && (this.index = (oe.scopes || (oe.scopes = [])).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	run(t) {
		if (this._active) {
			const n = oe;
			try {
				return (oe = this), t();
			} finally {
				oe = n;
			}
		}
	}
	on() {
		oe = this;
	}
	off() {
		oe = this.parent;
	}
	stop(t) {
		if (this._active) {
			let n, s;
			for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
			for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
			if (this.scopes) for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
			if (!this.detached && this.parent && !t) {
				const r = this.parent.scopes.pop();
				r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index));
			}
			(this.parent = void 0), (this._active = !1);
		}
	}
}
function Hr(e, t = oe) {
	t && t.active && t.effects.push(e);
}
function Nr() {
	return oe;
}
const Cn = (e) => {
		const t = new Set(e);
		return (t.w = 0), (t.n = 0), t;
	},
	Ps = (e) => (e.w & Ie) > 0,
	As = (e) => (e.n & Ie) > 0,
	jr = ({ deps: e }) => {
		if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ie;
	},
	Sr = (e) => {
		const { deps: t } = e;
		if (t.length) {
			let n = 0;
			for (let s = 0; s < t.length; s++) {
				const r = t[s];
				Ps(r) && !As(r) ? r.delete(e) : (t[n++] = r), (r.w &= ~Ie), (r.n &= ~Ie);
			}
			t.length = n;
		}
	},
	ln = new WeakMap();
let ot = 0,
	Ie = 1;
const cn = 30;
let le;
const Se = Symbol(""),
	fn = Symbol("");
class On {
	constructor(t, n = null, s) {
		(this.fn = t), (this.scheduler = n), (this.active = !0), (this.deps = []), (this.parent = void 0), Hr(this, s);
	}
	run() {
		if (!this.active) return this.fn();
		let t = le,
			n = Ce;
		for (; t; ) {
			if (t === this) return;
			t = t.parent;
		}
		try {
			return (this.parent = le), (le = this), (Ce = !0), (Ie = 1 << ++ot), ot <= cn ? jr(this) : Jn(this), this.fn();
		} finally {
			ot <= cn && Sr(this),
				(Ie = 1 << --ot),
				(le = this.parent),
				(Ce = n),
				(this.parent = void 0),
				this.deferStop && this.stop();
		}
	}
	stop() {
		le === this ? (this.deferStop = !0) : this.active && (Jn(this), this.onStop && this.onStop(), (this.active = !1));
	}
}
function Jn(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
let Ce = !0;
const Ms = [];
function Ge() {
	Ms.push(Ce), (Ce = !1);
}
function et() {
	const e = Ms.pop();
	Ce = e === void 0 ? !0 : e;
}
function ne(e, t, n) {
	if (Ce && le) {
		let s = ln.get(e);
		s || ln.set(e, (s = new Map()));
		let r = s.get(n);
		r || s.set(n, (r = Cn())), Rs(r);
	}
}
function Rs(e, t) {
	let n = !1;
	ot <= cn ? As(e) || ((e.n |= Ie), (n = !Ps(e))) : (n = !e.has(le)), n && (e.add(le), le.deps.push(e));
}
function xe(e, t, n, s, r, o) {
	const l = ln.get(e);
	if (!l) return;
	let f = [];
	if (t === "clear") f = [...l.values()];
	else if (n === "length" && I(e)) {
		const u = Number(s);
		l.forEach((d, _) => {
			(_ === "length" || (!St(_) && _ >= u)) && f.push(d);
		});
	} else
		switch ((n !== void 0 && f.push(l.get(n)), t)) {
			case "add":
				I(e) ? vn(n) && f.push(l.get("length")) : (f.push(l.get(Se)), qe(e) && f.push(l.get(fn)));
				break;
			case "delete":
				I(e) || (f.push(l.get(Se)), qe(e) && f.push(l.get(fn)));
				break;
			case "set":
				qe(e) && f.push(l.get(Se));
				break;
		}
	if (f.length === 1) f[0] && un(f[0]);
	else {
		const u = [];
		for (const d of f) d && u.push(...d);
		un(Cn(u));
	}
}
function un(e, t) {
	const n = I(e) ? e : [...e];
	for (const s of n) s.computed && Vn(s);
	for (const s of n) s.computed || Vn(s);
}
function Vn(e, t) {
	(e !== le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Kr = bn("__proto__,__v_isRef,__isVue"),
	Fs = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter((e) => e !== "arguments" && e !== "caller")
			.map((e) => Symbol[e])
			.filter(St),
	),
	Yn = Lr();
function Lr() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...n) {
				const s = N(this);
				for (let o = 0, l = this.length; o < l; o++) ne(s, "get", o + "");
				const r = s[t](...n);
				return r === -1 || r === !1 ? s[t](...n.map(N)) : r;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...n) {
				Ge();
				const s = N(this)[t].apply(this, n);
				return et(), s;
			};
		}),
		e
	);
}
function Ur(e) {
	const t = N(this);
	return ne(t, "has", e), t.hasOwnProperty(e);
}
class Hs {
	constructor(t = !1, n = !1) {
		(this._isReadonly = t), (this._shallow = n);
	}
	get(t, n, s) {
		const r = this._isReadonly,
			o = this._shallow;
		if (n === "__v_isReactive") return !r;
		if (n === "__v_isReadonly") return r;
		if (n === "__v_isShallow") return o;
		if (n === "__v_raw" && s === (r ? (o ? kr : Ks) : o ? Ss : js).get(t)) return t;
		const l = I(t);
		if (!r) {
			if (l && H(Yn, n)) return Reflect.get(Yn, n, s);
			if (n === "hasOwnProperty") return Ur;
		}
		const f = Reflect.get(t, n, s);
		return (St(n) ? Fs.has(n) : Kr(n)) || (r || ne(t, "get", n), o)
			? f
			: k(f)
			? l && vn(n)
				? f
				: f.value
			: $(f)
			? r
				? Ls(f)
				: Pn(f)
			: f;
	}
}
class Ns extends Hs {
	constructor(t = !1) {
		super(!1, t);
	}
	set(t, n, s, r) {
		let o = t[n];
		if (Xe(o) && k(o) && !k(s)) return !1;
		if (!this._shallow && (!Rt(s) && !Xe(s) && ((o = N(o)), (s = N(s))), !I(t) && k(o) && !k(s)))
			return (o.value = s), !0;
		const l = I(t) && vn(n) ? Number(n) < t.length : H(t, n),
			f = Reflect.set(t, n, s, r);
		return t === N(r) && (l ? Le(s, o) && xe(t, "set", n, s) : xe(t, "add", n, s)), f;
	}
	deleteProperty(t, n) {
		const s = H(t, n);
		t[n];
		const r = Reflect.deleteProperty(t, n);
		return r && s && xe(t, "delete", n, void 0), r;
	}
	has(t, n) {
		const s = Reflect.has(t, n);
		return (!St(n) || !Fs.has(n)) && ne(t, "has", n), s;
	}
	ownKeys(t) {
		return ne(t, "iterate", I(t) ? "length" : Se), Reflect.ownKeys(t);
	}
}
class $r extends Hs {
	constructor(t = !1) {
		super(!0, t);
	}
	set(t, n) {
		return !0;
	}
	deleteProperty(t, n) {
		return !0;
	}
}
const Dr = new Ns(),
	Br = new $r(),
	Wr = new Ns(!0),
	Tn = (e) => e,
	Ut = (e) => Reflect.getPrototypeOf(e);
function yt(e, t, n = !1, s = !1) {
	e = e.__v_raw;
	const r = N(e),
		o = N(t);
	n || (Le(t, o) && ne(r, "get", t), ne(r, "get", o));
	const { has: l } = Ut(r),
		f = s ? Tn : n ? Mn : ft;
	if (l.call(r, t)) return f(e.get(t));
	if (l.call(r, o)) return f(e.get(o));
	e !== r && e.get(t);
}
function vt(e, t = !1) {
	const n = this.__v_raw,
		s = N(n),
		r = N(e);
	return t || (Le(e, r) && ne(s, "has", e), ne(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function wt(e, t = !1) {
	return (e = e.__v_raw), !t && ne(N(e), "iterate", Se), Reflect.get(e, "size", e);
}
function Xn(e) {
	e = N(e);
	const t = N(this);
	return Ut(t).has.call(t, e) || (t.add(e), xe(t, "add", e, e)), this;
}
function Zn(e, t) {
	t = N(t);
	const n = N(this),
		{ has: s, get: r } = Ut(n);
	let o = s.call(n, e);
	o || ((e = N(e)), (o = s.call(n, e)));
	const l = r.call(n, e);
	return n.set(e, t), o ? Le(t, l) && xe(n, "set", e, t) : xe(n, "add", e, t), this;
}
function Qn(e) {
	const t = N(this),
		{ has: n, get: s } = Ut(t);
	let r = n.call(t, e);
	r || ((e = N(e)), (r = n.call(t, e))), s && s.call(t, e);
	const o = t.delete(e);
	return r && xe(t, "delete", e, void 0), o;
}
function kn() {
	const e = N(this),
		t = e.size !== 0,
		n = e.clear();
	return t && xe(e, "clear", void 0, void 0), n;
}
function Et(e, t) {
	return function (s, r) {
		const o = this,
			l = o.__v_raw,
			f = N(l),
			u = t ? Tn : e ? Mn : ft;
		return !e && ne(f, "iterate", Se), l.forEach((d, _) => s.call(r, u(d), u(_), o));
	};
}
function Ct(e, t, n) {
	return function (...s) {
		const r = this.__v_raw,
			o = N(r),
			l = qe(o),
			f = e === "entries" || (e === Symbol.iterator && l),
			u = e === "keys" && l,
			d = r[e](...s),
			_ = n ? Tn : t ? Mn : ft;
		return (
			!t && ne(o, "iterate", u ? fn : Se),
			{
				next() {
					const { value: v, done: E } = d.next();
					return E ? { value: v, done: E } : { value: f ? [_(v[0]), _(v[1])] : _(v), done: E };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function we(e) {
	return function (...t) {
		return e === "delete" ? !1 : this;
	};
}
function zr() {
	const e = {
			get(o) {
				return yt(this, o);
			},
			get size() {
				return wt(this);
			},
			has: vt,
			add: Xn,
			set: Zn,
			delete: Qn,
			clear: kn,
			forEach: Et(!1, !1),
		},
		t = {
			get(o) {
				return yt(this, o, !1, !0);
			},
			get size() {
				return wt(this);
			},
			has: vt,
			add: Xn,
			set: Zn,
			delete: Qn,
			clear: kn,
			forEach: Et(!1, !0),
		},
		n = {
			get(o) {
				return yt(this, o, !0);
			},
			get size() {
				return wt(this, !0);
			},
			has(o) {
				return vt.call(this, o, !0);
			},
			add: we("add"),
			set: we("set"),
			delete: we("delete"),
			clear: we("clear"),
			forEach: Et(!0, !1),
		},
		s = {
			get(o) {
				return yt(this, o, !0, !0);
			},
			get size() {
				return wt(this, !0);
			},
			has(o) {
				return vt.call(this, o, !0);
			},
			add: we("add"),
			set: we("set"),
			delete: we("delete"),
			clear: we("clear"),
			forEach: Et(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((o) => {
			(e[o] = Ct(o, !1, !1)), (n[o] = Ct(o, !0, !1)), (t[o] = Ct(o, !1, !0)), (s[o] = Ct(o, !0, !0));
		}),
		[e, n, t, s]
	);
}
const [qr, Jr, Vr, Yr] = zr();
function In(e, t) {
	const n = t ? (e ? Yr : Vr) : e ? Jr : qr;
	return (s, r, o) =>
		r === "__v_isReactive"
			? !e
			: r === "__v_isReadonly"
			? e
			: r === "__v_raw"
			? s
			: Reflect.get(H(n, r) && r in s ? n : s, r, o);
}
const Xr = { get: In(!1, !1) },
	Zr = { get: In(!1, !0) },
	Qr = { get: In(!0, !1) },
	js = new WeakMap(),
	Ss = new WeakMap(),
	Ks = new WeakMap(),
	kr = new WeakMap();
function Gr(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function eo(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Gr(wr(e));
}
function Pn(e) {
	return Xe(e) ? e : An(e, !1, Dr, Xr, js);
}
function to(e) {
	return An(e, !1, Wr, Zr, Ss);
}
function Ls(e) {
	return An(e, !0, Br, Qr, Ks);
}
function An(e, t, n, s, r) {
	if (!$(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const o = r.get(e);
	if (o) return o;
	const l = eo(e);
	if (l === 0) return e;
	const f = new Proxy(e, l === 2 ? s : n);
	return r.set(e, f), f;
}
function Je(e) {
	return Xe(e) ? Je(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xe(e) {
	return !!(e && e.__v_isReadonly);
}
function Rt(e) {
	return !!(e && e.__v_isShallow);
}
function Us(e) {
	return Je(e) || Xe(e);
}
function N(e) {
	const t = e && e.__v_raw;
	return t ? N(t) : e;
}
function $s(e) {
	return Mt(e, "__v_skip", !0), e;
}
const ft = (e) => ($(e) ? Pn(e) : e),
	Mn = (e) => ($(e) ? Ls(e) : e);
function Ds(e) {
	Ce && le && ((e = N(e)), Rs(e.dep || (e.dep = Cn())));
}
function Bs(e, t) {
	e = N(e);
	const n = e.dep;
	n && un(n);
}
function k(e) {
	return !!(e && e.__v_isRef === !0);
}
function no(e) {
	return so(e, !1);
}
function so(e, t) {
	return k(e) ? e : new ro(e, t);
}
class ro {
	constructor(t, n) {
		(this.__v_isShallow = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = n ? t : N(t)),
			(this._value = n ? t : ft(t));
	}
	get value() {
		return Ds(this), this._value;
	}
	set value(t) {
		const n = this.__v_isShallow || Rt(t) || Xe(t);
		(t = n ? t : N(t)), Le(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : ft(t)), Bs(this));
	}
}
function oo(e) {
	return k(e) ? e.value : e;
}
const io = {
	get: (e, t, n) => oo(Reflect.get(e, t, n)),
	set: (e, t, n, s) => {
		const r = e[t];
		return k(r) && !k(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
	},
};
function Ws(e) {
	return Je(e) ? e : new Proxy(e, io);
}
class lo {
	constructor(t, n, s, r) {
		(this._setter = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this.__v_isReadonly = !1),
			(this._dirty = !0),
			(this.effect = new On(t, () => {
				this._dirty || ((this._dirty = !0), Bs(this));
			})),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !r),
			(this.__v_isReadonly = s);
	}
	get value() {
		const t = N(this);
		return Ds(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
	}
	set value(t) {
		this._setter(t);
	}
}
function co(e, t, n = !1) {
	let s, r;
	const o = P(e);
	return o ? ((s = e), (r = fe)) : ((s = e.get), (r = e.set)), new lo(s, r, o || !r, n);
}
function Oe(e, t, n, s) {
	let r;
	try {
		r = s ? e(...s) : e();
	} catch (o) {
		$t(o, t, n);
	}
	return r;
}
function ue(e, t, n, s) {
	if (P(e)) {
		const o = Oe(e, t, n, s);
		return (
			o &&
				ws(o) &&
				o.catch((l) => {
					$t(l, t, n);
				}),
			o
		);
	}
	const r = [];
	for (let o = 0; o < e.length; o++) r.push(ue(e[o], t, n, s));
	return r;
}
function $t(e, t, n, s = !0) {
	const r = t ? t.vnode : null;
	if (t) {
		let o = t.parent;
		const l = t.proxy,
			f = n;
		for (; o; ) {
			const d = o.ec;
			if (d) {
				for (let _ = 0; _ < d.length; _++) if (d[_](e, l, f) === !1) return;
			}
			o = o.parent;
		}
		const u = t.appContext.config.errorHandler;
		if (u) {
			Oe(u, null, 10, [e, l, f]);
			return;
		}
	}
	fo(e, n, r, s);
}
function fo(e, t, n, s = !0) {
	console.error(e);
}
let ut = !1,
	an = !1;
const Z = [];
let ge = 0;
const Ve = [];
let be = null,
	Ne = 0;
const zs = Promise.resolve();
let Rn = null;
function uo(e) {
	const t = Rn || zs;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function ao(e) {
	let t = ge + 1,
		n = Z.length;
	for (; t < n; ) {
		const s = (t + n) >>> 1,
			r = Z[s],
			o = at(r);
		o < e || (o === e && r.pre) ? (t = s + 1) : (n = s);
	}
	return t;
}
function Fn(e) {
	(!Z.length || !Z.includes(e, ut && e.allowRecurse ? ge + 1 : ge)) &&
		(e.id == null ? Z.push(e) : Z.splice(ao(e.id), 0, e), qs());
}
function qs() {
	!ut && !an && ((an = !0), (Rn = zs.then(Vs)));
}
function ho(e) {
	const t = Z.indexOf(e);
	t > ge && Z.splice(t, 1);
}
function po(e) {
	I(e) ? Ve.push(...e) : (!be || !be.includes(e, e.allowRecurse ? Ne + 1 : Ne)) && Ve.push(e), qs();
}
function Gn(e, t = ut ? ge + 1 : 0) {
	for (; t < Z.length; t++) {
		const n = Z[t];
		n && n.pre && (Z.splice(t, 1), t--, n());
	}
}
function Js(e) {
	if (Ve.length) {
		const t = [...new Set(Ve)];
		if (((Ve.length = 0), be)) {
			be.push(...t);
			return;
		}
		for (be = t, be.sort((n, s) => at(n) - at(s)), Ne = 0; Ne < be.length; Ne++) be[Ne]();
		(be = null), (Ne = 0);
	}
}
const at = (e) => (e.id == null ? 1 / 0 : e.id),
	go = (e, t) => {
		const n = at(e) - at(t);
		if (n === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return n;
	};
function Vs(e) {
	(an = !1), (ut = !0), Z.sort(go);
	const t = fe;
	try {
		for (ge = 0; ge < Z.length; ge++) {
			const n = Z[ge];
			n && n.active !== !1 && Oe(n, null, 14);
		}
	} finally {
		(ge = 0), (Z.length = 0), Js(), (ut = !1), (Rn = null), (Z.length || Ve.length) && Vs();
	}
}
function _o(e, t, ...n) {
	if (e.isUnmounted) return;
	const s = e.vnode.props || L;
	let r = n;
	const o = t.startsWith("update:"),
		l = o && t.slice(7);
	if (l && l in s) {
		const _ = `${l === "modelValue" ? "model" : l}Modifiers`,
			{ number: v, trim: E } = s[_] || L;
		E && (r = n.map((A) => (z(A) ? A.trim() : A))), v && (r = n.map(Or));
	}
	let f,
		u = s[(f = Qt(t))] || s[(f = Qt(Ye(t)))];
	!u && o && (u = s[(f = Qt(ke(t)))]), u && ue(u, e, 6, r);
	const d = s[f + "Once"];
	if (d) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[f]) return;
		(e.emitted[f] = !0), ue(d, e, 6, r);
	}
}
function Ys(e, t, n = !1) {
	const s = t.emitsCache,
		r = s.get(e);
	if (r !== void 0) return r;
	const o = e.emits;
	let l = {},
		f = !1;
	if (!P(e)) {
		const u = (d) => {
			const _ = Ys(d, t, !0);
			_ && ((f = !0), J(l, _));
		};
		!n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
	}
	return !o && !f
		? ($(e) && s.set(e, null), null)
		: (I(o) ? o.forEach((u) => (l[u] = null)) : J(l, o), $(e) && s.set(e, l), l);
}
function Dt(e, t) {
	return !e || !jt(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, "")), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, ke(t)) || H(e, t));
}
let _e = null,
	Bt = null;
function Ft(e) {
	const t = _e;
	return (_e = e), (Bt = (e && e.type.__scopeId) || null), t;
}
function Xs(e) {
	Bt = e;
}
function Zs() {
	Bt = null;
}
function mo(e, t = _e, n) {
	if (!t || e._n) return e;
	const s = (...r) => {
		s._d && fs(-1);
		const o = Ft(t);
		let l;
		try {
			l = e(...r);
		} finally {
			Ft(o), s._d && fs(1);
		}
		return l;
	};
	return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Gt(e) {
	const {
		type: t,
		vnode: n,
		proxy: s,
		withProxy: r,
		props: o,
		propsOptions: [l],
		slots: f,
		attrs: u,
		emit: d,
		render: _,
		renderCache: v,
		data: E,
		setupState: A,
		ctx: D,
		inheritAttrs: F,
	} = e;
	let W, V;
	const Y = Ft(e);
	try {
		if (n.shapeFlag & 4) {
			const M = r || s;
			(W = pe(_.call(M, M, v, o, A, E, D))), (V = u);
		} else {
			const M = t;
			(W = pe(M.length > 1 ? M(o, { attrs: u, slots: f, emit: d }) : M(o, null))), (V = t.props ? u : bo(u));
		}
	} catch (M) {
		(ct.length = 0), $t(M, e, 1), (W = Te(dt));
	}
	let X = W;
	if (V && F !== !1) {
		const M = Object.keys(V),
			{ shapeFlag: ve } = X;
		M.length && ve & 7 && (l && M.some(xn) && (V = xo(V, l)), (X = Ze(X, V)));
	}
	return (
		n.dirs && ((X = Ze(X)), (X.dirs = X.dirs ? X.dirs.concat(n.dirs) : n.dirs)),
		n.transition && (X.transition = n.transition),
		(W = X),
		Ft(Y),
		W
	);
}
const bo = (e) => {
		let t;
		for (const n in e) (n === "class" || n === "style" || jt(n)) && ((t || (t = {}))[n] = e[n]);
		return t;
	},
	xo = (e, t) => {
		const n = {};
		for (const s in e) (!xn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
		return n;
	};
function yo(e, t, n) {
	const { props: s, children: r, component: o } = e,
		{ props: l, children: f, patchFlag: u } = t,
		d = o.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && u >= 0) {
		if (u & 1024) return !0;
		if (u & 16) return s ? es(s, l, d) : !!l;
		if (u & 8) {
			const _ = t.dynamicProps;
			for (let v = 0; v < _.length; v++) {
				const E = _[v];
				if (l[E] !== s[E] && !Dt(d, E)) return !0;
			}
		}
	} else return (r || f) && (!f || !f.$stable) ? !0 : s === l ? !1 : s ? (l ? es(s, l, d) : !0) : !!l;
	return !1;
}
function es(e, t, n) {
	const s = Object.keys(t);
	if (s.length !== Object.keys(e).length) return !0;
	for (let r = 0; r < s.length; r++) {
		const o = s[r];
		if (t[o] !== e[o] && !Dt(n, o)) return !0;
	}
	return !1;
}
function vo({ vnode: e, parent: t }, n) {
	for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const wo = Symbol.for("v-ndc"),
	Eo = (e) => e.__isSuspense;
function Co(e, t) {
	t && t.pendingBranch ? (I(e) ? t.effects.push(...e) : t.effects.push(e)) : po(e);
}
const Ot = {};
function en(e, t, n) {
	return Qs(e, t, n);
}
function Qs(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: l } = L) {
	var f;
	const u = Nr() === ((f = Q) == null ? void 0 : f.scope) ? Q : null;
	let d,
		_ = !1,
		v = !1;
	if (
		(k(e)
			? ((d = () => e.value), (_ = Rt(e)))
			: Je(e)
			? ((d = () => e), (s = !0))
			: I(e)
			? ((v = !0),
			  (_ = e.some((M) => Je(M) || Rt(M))),
			  (d = () =>
					e.map((M) => {
						if (k(M)) return M.value;
						if (Je(M)) return We(M);
						if (P(M)) return Oe(M, u, 2);
					})))
			: P(e)
			? t
				? (d = () => Oe(e, u, 2))
				: (d = () => {
						if (!(u && u.isUnmounted)) return E && E(), ue(e, u, 3, [A]);
				  })
			: (d = fe),
		t && s)
	) {
		const M = d;
		d = () => We(M());
	}
	let E,
		A = (M) => {
			E = Y.onStop = () => {
				Oe(M, u, 4);
			};
		},
		D;
	if (pt)
		if (((A = fe), t ? n && ue(t, u, 3, [d(), v ? [] : void 0, A]) : d(), r === "sync")) {
			const M = xi();
			D = M.__watcherHandles || (M.__watcherHandles = []);
		} else return fe;
	let F = v ? new Array(e.length).fill(Ot) : Ot;
	const W = () => {
		if (Y.active)
			if (t) {
				const M = Y.run();
				(s || _ || (v ? M.some((ve, tt) => Le(ve, F[tt])) : Le(M, F))) &&
					(E && E(), ue(t, u, 3, [M, F === Ot ? void 0 : v && F[0] === Ot ? [] : F, A]), (F = M));
			} else Y.run();
	};
	W.allowRecurse = !!t;
	let V;
	r === "sync"
		? (V = W)
		: r === "post"
		? (V = () => te(W, u && u.suspense))
		: ((W.pre = !0), u && (W.id = u.uid), (V = () => Fn(W)));
	const Y = new On(d, V);
	t ? (n ? W() : (F = Y.run())) : r === "post" ? te(Y.run.bind(Y), u && u.suspense) : Y.run();
	const X = () => {
		Y.stop(), u && u.scope && yn(u.scope.effects, Y);
	};
	return D && D.push(X), X;
}
function Oo(e, t, n) {
	const s = this.proxy,
		r = z(e) ? (e.includes(".") ? ks(s, e) : () => s[e]) : e.bind(s, s);
	let o;
	P(t) ? (o = t) : ((o = t.handler), (n = t));
	const l = Q;
	Qe(this);
	const f = Qs(r, o.bind(s), n);
	return l ? Qe(l) : Ke(), f;
}
function ks(e, t) {
	const n = t.split(".");
	return () => {
		let s = e;
		for (let r = 0; r < n.length && s; r++) s = s[n[r]];
		return s;
	};
}
function We(e, t) {
	if (!$(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
	if ((t.add(e), k(e))) We(e.value, t);
	else if (I(e)) for (let n = 0; n < e.length; n++) We(e[n], t);
	else if (vs(e) || qe(e))
		e.forEach((n) => {
			We(n, t);
		});
	else if (Cs(e)) for (const n in e) We(e[n], t);
	return e;
}
function Fe(e, t, n, s) {
	const r = e.dirs,
		o = t && t.dirs;
	for (let l = 0; l < r.length; l++) {
		const f = r[l];
		o && (f.oldValue = o[l].value);
		let u = f.dir[s];
		u && (Ge(), ue(u, n, 8, [e.el, f, e, t]), et());
	}
}
/*! #__NO_SIDE_EFFECTS__ */ function Gs(e, t) {
	return P(e) ? (() => J({ name: e.name }, t, { setup: e }))() : e;
}
const It = (e) => !!e.type.__asyncLoader,
	er = (e) => e.type.__isKeepAlive;
function To(e, t) {
	tr(e, "a", t);
}
function Io(e, t) {
	tr(e, "da", t);
}
function tr(e, t, n = Q) {
	const s =
		e.__wdc ||
		(e.__wdc = () => {
			let r = n;
			for (; r; ) {
				if (r.isDeactivated) return;
				r = r.parent;
			}
			return e();
		});
	if ((Wt(t, s, n), n)) {
		let r = n.parent;
		for (; r && r.parent; ) er(r.parent.vnode) && Po(s, t, n, r), (r = r.parent);
	}
}
function Po(e, t, n, s) {
	const r = Wt(t, e, s, !0);
	nr(() => {
		yn(s[t], r);
	}, n);
}
function Wt(e, t, n = Q, s = !1) {
	if (n) {
		const r = n[e] || (n[e] = []),
			o =
				t.__weh ||
				(t.__weh = (...l) => {
					if (n.isUnmounted) return;
					Ge(), Qe(n);
					const f = ue(t, n, e, l);
					return Ke(), et(), f;
				});
		return s ? r.unshift(o) : r.push(o), o;
	}
}
const ye =
		(e) =>
		(t, n = Q) =>
			(!pt || e === "sp") && Wt(e, (...s) => t(...s), n),
	Ao = ye("bm"),
	Mo = ye("m"),
	Ro = ye("bu"),
	Fo = ye("u"),
	Ho = ye("bum"),
	nr = ye("um"),
	No = ye("sp"),
	jo = ye("rtg"),
	So = ye("rtc");
function Ko(e, t = Q) {
	Wt("ec", e, t);
}
const dn = (e) => (e ? (pr(e) ? Kn(e) || e.proxy : dn(e.parent)) : null),
	lt = J(Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => dn(e.parent),
		$root: (e) => dn(e.root),
		$emit: (e) => e.emit,
		$options: (e) => Hn(e),
		$forceUpdate: (e) => e.f || (e.f = () => Fn(e.update)),
		$nextTick: (e) => e.n || (e.n = uo.bind(e.proxy)),
		$watch: (e) => Oo.bind(e),
	}),
	tn = (e, t) => e !== L && !e.__isScriptSetup && H(e, t),
	Lo = {
		get({ _: e }, t) {
			const { ctx: n, setupState: s, data: r, props: o, accessCache: l, type: f, appContext: u } = e;
			let d;
			if (t[0] !== "$") {
				const A = l[t];
				if (A !== void 0)
					switch (A) {
						case 1:
							return s[t];
						case 2:
							return r[t];
						case 4:
							return n[t];
						case 3:
							return o[t];
					}
				else {
					if (tn(s, t)) return (l[t] = 1), s[t];
					if (r !== L && H(r, t)) return (l[t] = 2), r[t];
					if ((d = e.propsOptions[0]) && H(d, t)) return (l[t] = 3), o[t];
					if (n !== L && H(n, t)) return (l[t] = 4), n[t];
					hn && (l[t] = 0);
				}
			}
			const _ = lt[t];
			let v, E;
			if (_) return t === "$attrs" && ne(e, "get", t), _(e);
			if ((v = f.__cssModules) && (v = v[t])) return v;
			if (n !== L && H(n, t)) return (l[t] = 4), n[t];
			if (((E = u.config.globalProperties), H(E, t))) return E[t];
		},
		set({ _: e }, t, n) {
			const { data: s, setupState: r, ctx: o } = e;
			return tn(r, t)
				? ((r[t] = n), !0)
				: s !== L && H(s, t)
				? ((s[t] = n), !0)
				: H(e.props, t) || (t[0] === "$" && t.slice(1) in e)
				? !1
				: ((o[t] = n), !0);
		},
		has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, l) {
			let f;
			return (
				!!n[l] ||
				(e !== L && H(e, l)) ||
				tn(t, l) ||
				((f = o[0]) && H(f, l)) ||
				H(s, l) ||
				H(lt, l) ||
				H(r.config.globalProperties, l)
			);
		},
		defineProperty(e, t, n) {
			return (
				n.get != null ? (e._.accessCache[t] = 0) : H(n, "value") && this.set(e, t, n.value, null),
				Reflect.defineProperty(e, t, n)
			);
		},
	};
function ts(e) {
	return I(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let hn = !0;
function Uo(e) {
	const t = Hn(e),
		n = e.proxy,
		s = e.ctx;
	(hn = !1), t.beforeCreate && ns(t.beforeCreate, e, "bc");
	const {
		data: r,
		computed: o,
		methods: l,
		watch: f,
		provide: u,
		inject: d,
		created: _,
		beforeMount: v,
		mounted: E,
		beforeUpdate: A,
		updated: D,
		activated: F,
		deactivated: W,
		beforeDestroy: V,
		beforeUnmount: Y,
		destroyed: X,
		unmounted: M,
		render: ve,
		renderTracked: tt,
		renderTriggered: gt,
		errorCaptured: Pe,
		serverPrefetch: Vt,
		expose: Ae,
		inheritAttrs: nt,
		components: _t,
		directives: mt,
		filters: Yt,
	} = t;
	if ((d && $o(d, s, null), l))
		for (const U in l) {
			const S = l[U];
			P(S) && (s[U] = S.bind(n));
		}
	if (r) {
		const U = r.call(n, n);
		$(U) && (e.data = Pn(U));
	}
	if (((hn = !0), o))
		for (const U in o) {
			const S = o[U],
				Me = P(S) ? S.bind(n, n) : P(S.get) ? S.get.bind(n, n) : fe,
				bt = !P(S) && P(S.set) ? S.set.bind(n) : fe,
				Re = mi({ get: Me, set: bt });
			Object.defineProperty(s, U, {
				enumerable: !0,
				configurable: !0,
				get: () => Re.value,
				set: (ae) => (Re.value = ae),
			});
		}
	if (f) for (const U in f) sr(f[U], s, n, U);
	if (u) {
		const U = P(u) ? u.call(n) : u;
		Reflect.ownKeys(U).forEach((S) => {
			Jo(S, U[S]);
		});
	}
	_ && ns(_, e, "c");
	function G(U, S) {
		I(S) ? S.forEach((Me) => U(Me.bind(n))) : S && U(S.bind(n));
	}
	if (
		(G(Ao, v),
		G(Mo, E),
		G(Ro, A),
		G(Fo, D),
		G(To, F),
		G(Io, W),
		G(Ko, Pe),
		G(So, tt),
		G(jo, gt),
		G(Ho, Y),
		G(nr, M),
		G(No, Vt),
		I(Ae))
	)
		if (Ae.length) {
			const U = e.exposed || (e.exposed = {});
			Ae.forEach((S) => {
				Object.defineProperty(U, S, { get: () => n[S], set: (Me) => (n[S] = Me) });
			});
		} else e.exposed || (e.exposed = {});
	ve && e.render === fe && (e.render = ve),
		nt != null && (e.inheritAttrs = nt),
		_t && (e.components = _t),
		mt && (e.directives = mt);
}
function $o(e, t, n = fe) {
	I(e) && (e = pn(e));
	for (const s in e) {
		const r = e[s];
		let o;
		$(r) ? ("default" in r ? (o = Pt(r.from || s, r.default, !0)) : (o = Pt(r.from || s))) : (o = Pt(r)),
			k(o)
				? Object.defineProperty(t, s, {
						enumerable: !0,
						configurable: !0,
						get: () => o.value,
						set: (l) => (o.value = l),
				  })
				: (t[s] = o);
	}
}
function ns(e, t, n) {
	ue(I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function sr(e, t, n, s) {
	const r = s.includes(".") ? ks(n, s) : () => n[s];
	if (z(e)) {
		const o = t[e];
		P(o) && en(r, o);
	} else if (P(e)) en(r, e.bind(n));
	else if ($(e))
		if (I(e)) e.forEach((o) => sr(o, t, n, s));
		else {
			const o = P(e.handler) ? e.handler.bind(n) : t[e.handler];
			P(o) && en(r, o, e);
		}
}
function Hn(e) {
	const t = e.type,
		{ mixins: n, extends: s } = t,
		{
			mixins: r,
			optionsCache: o,
			config: { optionMergeStrategies: l },
		} = e.appContext,
		f = o.get(t);
	let u;
	return (
		f
			? (u = f)
			: !r.length && !n && !s
			? (u = t)
			: ((u = {}), r.length && r.forEach((d) => Ht(u, d, l, !0)), Ht(u, t, l)),
		$(t) && o.set(t, u),
		u
	);
}
function Ht(e, t, n, s = !1) {
	const { mixins: r, extends: o } = t;
	o && Ht(e, o, n, !0), r && r.forEach((l) => Ht(e, l, n, !0));
	for (const l in t)
		if (!(s && l === "expose")) {
			const f = Do[l] || (n && n[l]);
			e[l] = f ? f(e[l], t[l]) : t[l];
		}
	return e;
}
const Do = {
	data: ss,
	props: rs,
	emits: rs,
	methods: it,
	computed: it,
	beforeCreate: ee,
	created: ee,
	beforeMount: ee,
	mounted: ee,
	beforeUpdate: ee,
	updated: ee,
	beforeDestroy: ee,
	beforeUnmount: ee,
	destroyed: ee,
	unmounted: ee,
	activated: ee,
	deactivated: ee,
	errorCaptured: ee,
	serverPrefetch: ee,
	components: it,
	directives: it,
	watch: Wo,
	provide: ss,
	inject: Bo,
};
function ss(e, t) {
	return t
		? e
			? function () {
					return J(P(e) ? e.call(this, this) : e, P(t) ? t.call(this, this) : t);
			  }
			: t
		: e;
}
function Bo(e, t) {
	return it(pn(e), pn(t));
}
function pn(e) {
	if (I(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function ee(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function it(e, t) {
	return e ? J(Object.create(null), e, t) : t;
}
function rs(e, t) {
	return e ? (I(e) && I(t) ? [...new Set([...e, ...t])] : J(Object.create(null), ts(e), ts(t ?? {}))) : t;
}
function Wo(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = J(Object.create(null), e);
	for (const s in t) n[s] = ee(e[s], t[s]);
	return n;
}
function rr() {
	return {
		app: null,
		config: {
			isNativeTag: xr,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let zo = 0;
function qo(e, t) {
	return function (s, r = null) {
		P(s) || (s = J({}, s)), r != null && !$(r) && (r = null);
		const o = rr(),
			l = new WeakSet();
		let f = !1;
		const u = (o.app = {
			_uid: zo++,
			_component: s,
			_props: r,
			_container: null,
			_context: o,
			_instance: null,
			version: yi,
			get config() {
				return o.config;
			},
			set config(d) {},
			use(d, ..._) {
				return l.has(d) || (d && P(d.install) ? (l.add(d), d.install(u, ..._)) : P(d) && (l.add(d), d(u, ..._))), u;
			},
			mixin(d) {
				return o.mixins.includes(d) || o.mixins.push(d), u;
			},
			component(d, _) {
				return _ ? ((o.components[d] = _), u) : o.components[d];
			},
			directive(d, _) {
				return _ ? ((o.directives[d] = _), u) : o.directives[d];
			},
			mount(d, _, v) {
				if (!f) {
					const E = Te(s, r);
					return (
						(E.appContext = o),
						_ && t ? t(E, d) : e(E, d, v),
						(f = !0),
						(u._container = d),
						(d.__vue_app__ = u),
						Kn(E.component) || E.component.proxy
					);
				}
			},
			unmount() {
				f && (e(null, u._container), delete u._container.__vue_app__);
			},
			provide(d, _) {
				return (o.provides[d] = _), u;
			},
			runWithContext(d) {
				Nt = u;
				try {
					return d();
				} finally {
					Nt = null;
				}
			},
		});
		return u;
	};
}
let Nt = null;
function Jo(e, t) {
	if (Q) {
		let n = Q.provides;
		const s = Q.parent && Q.parent.provides;
		s === n && (n = Q.provides = Object.create(s)), (n[e] = t);
	}
}
function Pt(e, t, n = !1) {
	const s = Q || _e;
	if (s || Nt) {
		const r = s
			? s.parent == null
				? s.vnode.appContext && s.vnode.appContext.provides
				: s.parent.provides
			: Nt._context.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return n && P(t) ? t.call(s && s.proxy) : t;
	}
}
function Vo(e, t, n, s = !1) {
	const r = {},
		o = {};
	Mt(o, qt, 1), (e.propsDefaults = Object.create(null)), or(e, t, r, o);
	for (const l in e.propsOptions[0]) l in r || (r[l] = void 0);
	n ? (e.props = s ? r : to(r)) : e.type.props ? (e.props = r) : (e.props = o), (e.attrs = o);
}
function Yo(e, t, n, s) {
	const {
			props: r,
			attrs: o,
			vnode: { patchFlag: l },
		} = e,
		f = N(r),
		[u] = e.propsOptions;
	let d = !1;
	if ((s || l > 0) && !(l & 16)) {
		if (l & 8) {
			const _ = e.vnode.dynamicProps;
			for (let v = 0; v < _.length; v++) {
				let E = _[v];
				if (Dt(e.emitsOptions, E)) continue;
				const A = t[E];
				if (u)
					if (H(o, E)) A !== o[E] && ((o[E] = A), (d = !0));
					else {
						const D = Ye(E);
						r[D] = gn(u, f, D, A, e, !1);
					}
				else A !== o[E] && ((o[E] = A), (d = !0));
			}
		}
	} else {
		or(e, t, r, o) && (d = !0);
		let _;
		for (const v in f)
			(!t || (!H(t, v) && ((_ = ke(v)) === v || !H(t, _)))) &&
				(u ? n && (n[v] !== void 0 || n[_] !== void 0) && (r[v] = gn(u, f, v, void 0, e, !0)) : delete r[v]);
		if (o !== f) for (const v in o) (!t || !H(t, v)) && (delete o[v], (d = !0));
	}
	d && xe(e, "set", "$attrs");
}
function or(e, t, n, s) {
	const [r, o] = e.propsOptions;
	let l = !1,
		f;
	if (t)
		for (let u in t) {
			if (Tt(u)) continue;
			const d = t[u];
			let _;
			r && H(r, (_ = Ye(u)))
				? !o || !o.includes(_)
					? (n[_] = d)
					: ((f || (f = {}))[_] = d)
				: Dt(e.emitsOptions, u) || ((!(u in s) || d !== s[u]) && ((s[u] = d), (l = !0)));
		}
	if (o) {
		const u = N(n),
			d = f || L;
		for (let _ = 0; _ < o.length; _++) {
			const v = o[_];
			n[v] = gn(r, u, v, d[v], e, !H(d, v));
		}
	}
	return l;
}
function gn(e, t, n, s, r, o) {
	const l = e[n];
	if (l != null) {
		const f = H(l, "default");
		if (f && s === void 0) {
			const u = l.default;
			if (l.type !== Function && !l.skipFactory && P(u)) {
				const { propsDefaults: d } = r;
				n in d ? (s = d[n]) : (Qe(r), (s = d[n] = u.call(null, t)), Ke());
			} else s = u;
		}
		l[0] && (o && !f ? (s = !1) : l[1] && (s === "" || s === ke(n)) && (s = !0));
	}
	return s;
}
function ir(e, t, n = !1) {
	const s = t.propsCache,
		r = s.get(e);
	if (r) return r;
	const o = e.props,
		l = {},
		f = [];
	let u = !1;
	if (!P(e)) {
		const _ = (v) => {
			u = !0;
			const [E, A] = ir(v, t, !0);
			J(l, E), A && f.push(...A);
		};
		!n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
	}
	if (!o && !u) return $(e) && s.set(e, ze), ze;
	if (I(o))
		for (let _ = 0; _ < o.length; _++) {
			const v = Ye(o[_]);
			os(v) && (l[v] = L);
		}
	else if (o)
		for (const _ in o) {
			const v = Ye(_);
			if (os(v)) {
				const E = o[_],
					A = (l[v] = I(E) || P(E) ? { type: E } : J({}, E));
				if (A) {
					const D = cs(Boolean, A.type),
						F = cs(String, A.type);
					(A[0] = D > -1), (A[1] = F < 0 || D < F), (D > -1 || H(A, "default")) && f.push(v);
				}
			}
		}
	const d = [l, f];
	return $(e) && s.set(e, d), d;
}
function os(e) {
	return e[0] !== "$";
}
function is(e) {
	const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : e === null ? "null" : "";
}
function ls(e, t) {
	return is(e) === is(t);
}
function cs(e, t) {
	return I(t) ? t.findIndex((n) => ls(n, e)) : P(t) && ls(t, e) ? 0 : -1;
}
const lr = (e) => e[0] === "_" || e === "$stable",
	Nn = (e) => (I(e) ? e.map(pe) : [pe(e)]),
	Xo = (e, t, n) => {
		if (t._n) return t;
		const s = mo((...r) => Nn(t(...r)), n);
		return (s._c = !1), s;
	},
	cr = (e, t, n) => {
		const s = e._ctx;
		for (const r in e) {
			if (lr(r)) continue;
			const o = e[r];
			if (P(o)) t[r] = Xo(r, o, s);
			else if (o != null) {
				const l = Nn(o);
				t[r] = () => l;
			}
		}
	},
	fr = (e, t) => {
		const n = Nn(t);
		e.slots.default = () => n;
	},
	Zo = (e, t) => {
		if (e.vnode.shapeFlag & 32) {
			const n = t._;
			n ? ((e.slots = N(t)), Mt(t, "_", n)) : cr(t, (e.slots = {}));
		} else (e.slots = {}), t && fr(e, t);
		Mt(e.slots, qt, 1);
	},
	Qo = (e, t, n) => {
		const { vnode: s, slots: r } = e;
		let o = !0,
			l = L;
		if (s.shapeFlag & 32) {
			const f = t._;
			f ? (n && f === 1 ? (o = !1) : (J(r, t), !n && f === 1 && delete r._)) : ((o = !t.$stable), cr(t, r)), (l = t);
		} else t && (fr(e, t), (l = { default: 1 }));
		if (o) for (const f in r) !lr(f) && l[f] == null && delete r[f];
	};
function _n(e, t, n, s, r = !1) {
	if (I(e)) {
		e.forEach((E, A) => _n(E, t && (I(t) ? t[A] : t), n, s, r));
		return;
	}
	if (It(s) && !r) return;
	const o = s.shapeFlag & 4 ? Kn(s.component) || s.component.proxy : s.el,
		l = r ? null : o,
		{ i: f, r: u } = e,
		d = t && t.r,
		_ = f.refs === L ? (f.refs = {}) : f.refs,
		v = f.setupState;
	if ((d != null && d !== u && (z(d) ? ((_[d] = null), H(v, d) && (v[d] = null)) : k(d) && (d.value = null)), P(u)))
		Oe(u, f, 12, [l, _]);
	else {
		const E = z(u),
			A = k(u);
		if (E || A) {
			const D = () => {
				if (e.f) {
					const F = E ? (H(v, u) ? v[u] : _[u]) : u.value;
					r
						? I(F) && yn(F, o)
						: I(F)
						? F.includes(o) || F.push(o)
						: E
						? ((_[u] = [o]), H(v, u) && (v[u] = _[u]))
						: ((u.value = [o]), e.k && (_[e.k] = u.value));
				} else E ? ((_[u] = l), H(v, u) && (v[u] = l)) : A && ((u.value = l), e.k && (_[e.k] = l));
			};
			l ? ((D.id = -1), te(D, n)) : D();
		}
	}
}
const te = Co;
function ko(e) {
	return Go(e);
}
function Go(e, t) {
	const n = on();
	n.__VUE__ = !0;
	const {
			insert: s,
			remove: r,
			patchProp: o,
			createElement: l,
			createText: f,
			createComment: u,
			setText: d,
			setElementText: _,
			parentNode: v,
			nextSibling: E,
			setScopeId: A = fe,
			insertStaticContent: D,
		} = e,
		F = (i, c, a, h = null, p = null, b = null, y = !1, m = null, x = !!c.dynamicChildren) => {
			if (i === c) return;
			i && !rt(i, c) && ((h = xt(i)), ae(i, p, b, !0), (i = null)),
				c.patchFlag === -2 && ((x = !1), (c.dynamicChildren = null));
			const { type: g, ref: C, shapeFlag: w } = c;
			switch (g) {
				case zt:
					W(i, c, a, h);
					break;
				case dt:
					V(i, c, a, h);
					break;
				case nn:
					i == null && Y(c, a, h, y);
					break;
				case ie:
					_t(i, c, a, h, p, b, y, m, x);
					break;
				default:
					w & 1
						? ve(i, c, a, h, p, b, y, m, x)
						: w & 6
						? mt(i, c, a, h, p, b, y, m, x)
						: (w & 64 || w & 128) && g.process(i, c, a, h, p, b, y, m, x, $e);
			}
			C != null && p && _n(C, i && i.ref, b, c || i, !c);
		},
		W = (i, c, a, h) => {
			if (i == null) s((c.el = f(c.children)), a, h);
			else {
				const p = (c.el = i.el);
				c.children !== i.children && d(p, c.children);
			}
		},
		V = (i, c, a, h) => {
			i == null ? s((c.el = u(c.children || "")), a, h) : (c.el = i.el);
		},
		Y = (i, c, a, h) => {
			[i.el, i.anchor] = D(i.children, c, a, h, i.el, i.anchor);
		},
		X = ({ el: i, anchor: c }, a, h) => {
			let p;
			for (; i && i !== c; ) (p = E(i)), s(i, a, h), (i = p);
			s(c, a, h);
		},
		M = ({ el: i, anchor: c }) => {
			let a;
			for (; i && i !== c; ) (a = E(i)), r(i), (i = a);
			r(c);
		},
		ve = (i, c, a, h, p, b, y, m, x) => {
			(y = y || c.type === "svg"), i == null ? tt(c, a, h, p, b, y, m, x) : Vt(i, c, p, b, y, m, x);
		},
		tt = (i, c, a, h, p, b, y, m) => {
			let x, g;
			const { type: C, props: w, shapeFlag: O, transition: T, dirs: R } = i;
			if (
				((x = i.el = l(i.type, b, w && w.is, w)),
				O & 8 ? _(x, i.children) : O & 16 && Pe(i.children, x, null, h, p, b && C !== "foreignObject", y, m),
				R && Fe(i, null, h, "created"),
				gt(x, i, i.scopeId, y, h),
				w)
			) {
				for (const j in w) j !== "value" && !Tt(j) && o(x, j, null, w[j], b, i.children, h, p, me);
				"value" in w && o(x, "value", null, w.value), (g = w.onVnodeBeforeMount) && he(g, h, i);
			}
			R && Fe(i, null, h, "beforeMount");
			const K = ei(p, T);
			K && T.beforeEnter(x),
				s(x, c, a),
				((g = w && w.onVnodeMounted) || K || R) &&
					te(() => {
						g && he(g, h, i), K && T.enter(x), R && Fe(i, null, h, "mounted");
					}, p);
		},
		gt = (i, c, a, h, p) => {
			if ((a && A(i, a), h)) for (let b = 0; b < h.length; b++) A(i, h[b]);
			if (p) {
				let b = p.subTree;
				if (c === b) {
					const y = p.vnode;
					gt(i, y, y.scopeId, y.slotScopeIds, p.parent);
				}
			}
		},
		Pe = (i, c, a, h, p, b, y, m, x = 0) => {
			for (let g = x; g < i.length; g++) {
				const C = (i[g] = m ? Ee(i[g]) : pe(i[g]));
				F(null, C, c, a, h, p, b, y, m);
			}
		},
		Vt = (i, c, a, h, p, b, y) => {
			const m = (c.el = i.el);
			let { patchFlag: x, dynamicChildren: g, dirs: C } = c;
			x |= i.patchFlag & 16;
			const w = i.props || L,
				O = c.props || L;
			let T;
			a && He(a, !1), (T = O.onVnodeBeforeUpdate) && he(T, a, c, i), C && Fe(c, i, a, "beforeUpdate"), a && He(a, !0);
			const R = p && c.type !== "foreignObject";
			if ((g ? Ae(i.dynamicChildren, g, m, a, h, R, b) : y || S(i, c, m, null, a, h, R, b, !1), x > 0)) {
				if (x & 16) nt(m, c, w, O, a, h, p);
				else if (
					(x & 2 && w.class !== O.class && o(m, "class", null, O.class, p),
					x & 4 && o(m, "style", w.style, O.style, p),
					x & 8)
				) {
					const K = c.dynamicProps;
					for (let j = 0; j < K.length; j++) {
						const B = K[j],
							re = w[B],
							De = O[B];
						(De !== re || B === "value") && o(m, B, re, De, p, i.children, a, h, me);
					}
				}
				x & 1 && i.children !== c.children && _(m, c.children);
			} else !y && g == null && nt(m, c, w, O, a, h, p);
			((T = O.onVnodeUpdated) || C) &&
				te(() => {
					T && he(T, a, c, i), C && Fe(c, i, a, "updated");
				}, h);
		},
		Ae = (i, c, a, h, p, b, y) => {
			for (let m = 0; m < c.length; m++) {
				const x = i[m],
					g = c[m],
					C = x.el && (x.type === ie || !rt(x, g) || x.shapeFlag & 70) ? v(x.el) : a;
				F(x, g, C, null, h, p, b, y, !0);
			}
		},
		nt = (i, c, a, h, p, b, y) => {
			if (a !== h) {
				if (a !== L) for (const m in a) !Tt(m) && !(m in h) && o(i, m, a[m], null, y, c.children, p, b, me);
				for (const m in h) {
					if (Tt(m)) continue;
					const x = h[m],
						g = a[m];
					x !== g && m !== "value" && o(i, m, g, x, y, c.children, p, b, me);
				}
				"value" in h && o(i, "value", a.value, h.value);
			}
		},
		_t = (i, c, a, h, p, b, y, m, x) => {
			const g = (c.el = i ? i.el : f("")),
				C = (c.anchor = i ? i.anchor : f(""));
			let { patchFlag: w, dynamicChildren: O, slotScopeIds: T } = c;
			T && (m = m ? m.concat(T) : T),
				i == null
					? (s(g, a, h), s(C, a, h), Pe(c.children, a, C, p, b, y, m, x))
					: w > 0 && w & 64 && O && i.dynamicChildren
					? (Ae(i.dynamicChildren, O, a, p, b, y, m), (c.key != null || (p && c === p.subTree)) && ur(i, c, !0))
					: S(i, c, a, C, p, b, y, m, x);
		},
		mt = (i, c, a, h, p, b, y, m, x) => {
			(c.slotScopeIds = m),
				i == null ? (c.shapeFlag & 512 ? p.ctx.activate(c, a, h, y, x) : Yt(c, a, h, p, b, y, x)) : Ln(i, c, x);
		},
		Yt = (i, c, a, h, p, b, y) => {
			const m = (i.component = ai(i, h, p));
			if ((er(i) && (m.ctx.renderer = $e), di(m), m.asyncDep)) {
				if ((p && p.registerDep(m, G), !i.el)) {
					const x = (m.subTree = Te(dt));
					V(null, x, c, a);
				}
				return;
			}
			G(m, i, c, a, p, b, y);
		},
		Ln = (i, c, a) => {
			const h = (c.component = i.component);
			if (yo(i, c, a))
				if (h.asyncDep && !h.asyncResolved) {
					U(h, c, a);
					return;
				} else (h.next = c), ho(h.update), h.update();
			else (c.el = i.el), (h.vnode = c);
		},
		G = (i, c, a, h, p, b, y) => {
			const m = () => {
					if (i.isMounted) {
						let { next: C, bu: w, u: O, parent: T, vnode: R } = i,
							K = C,
							j;
						He(i, !1),
							C ? ((C.el = R.el), U(i, C, y)) : (C = R),
							w && kt(w),
							(j = C.props && C.props.onVnodeBeforeUpdate) && he(j, T, C, R),
							He(i, !0);
						const B = Gt(i),
							re = i.subTree;
						(i.subTree = B),
							F(re, B, v(re.el), xt(re), i, p, b),
							(C.el = B.el),
							K === null && vo(i, B.el),
							O && te(O, p),
							(j = C.props && C.props.onVnodeUpdated) && te(() => he(j, T, C, R), p);
					} else {
						let C;
						const { el: w, props: O } = c,
							{ bm: T, m: R, parent: K } = i,
							j = It(c);
						if ((He(i, !1), T && kt(T), !j && (C = O && O.onVnodeBeforeMount) && he(C, K, c), He(i, !0), w && Zt)) {
							const B = () => {
								(i.subTree = Gt(i)), Zt(w, i.subTree, i, p, null);
							};
							j ? c.type.__asyncLoader().then(() => !i.isUnmounted && B()) : B();
						} else {
							const B = (i.subTree = Gt(i));
							F(null, B, a, h, i, p, b), (c.el = B.el);
						}
						if ((R && te(R, p), !j && (C = O && O.onVnodeMounted))) {
							const B = c;
							te(() => he(C, K, B), p);
						}
						(c.shapeFlag & 256 || (K && It(K.vnode) && K.vnode.shapeFlag & 256)) && i.a && te(i.a, p),
							(i.isMounted = !0),
							(c = a = h = null);
					}
				},
				x = (i.effect = new On(m, () => Fn(g), i.scope)),
				g = (i.update = () => x.run());
			(g.id = i.uid), He(i, !0), g();
		},
		U = (i, c, a) => {
			c.component = i;
			const h = i.vnode.props;
			(i.vnode = c), (i.next = null), Yo(i, c.props, h, a), Qo(i, c.children, a), Ge(), Gn(), et();
		},
		S = (i, c, a, h, p, b, y, m, x = !1) => {
			const g = i && i.children,
				C = i ? i.shapeFlag : 0,
				w = c.children,
				{ patchFlag: O, shapeFlag: T } = c;
			if (O > 0) {
				if (O & 128) {
					bt(g, w, a, h, p, b, y, m, x);
					return;
				} else if (O & 256) {
					Me(g, w, a, h, p, b, y, m, x);
					return;
				}
			}
			T & 8
				? (C & 16 && me(g, p, b), w !== g && _(a, w))
				: C & 16
				? T & 16
					? bt(g, w, a, h, p, b, y, m, x)
					: me(g, p, b, !0)
				: (C & 8 && _(a, ""), T & 16 && Pe(w, a, h, p, b, y, m, x));
		},
		Me = (i, c, a, h, p, b, y, m, x) => {
			(i = i || ze), (c = c || ze);
			const g = i.length,
				C = c.length,
				w = Math.min(g, C);
			let O;
			for (O = 0; O < w; O++) {
				const T = (c[O] = x ? Ee(c[O]) : pe(c[O]));
				F(i[O], T, a, null, p, b, y, m, x);
			}
			g > C ? me(i, p, b, !0, !1, w) : Pe(c, a, h, p, b, y, m, x, w);
		},
		bt = (i, c, a, h, p, b, y, m, x) => {
			let g = 0;
			const C = c.length;
			let w = i.length - 1,
				O = C - 1;
			for (; g <= w && g <= O; ) {
				const T = i[g],
					R = (c[g] = x ? Ee(c[g]) : pe(c[g]));
				if (rt(T, R)) F(T, R, a, null, p, b, y, m, x);
				else break;
				g++;
			}
			for (; g <= w && g <= O; ) {
				const T = i[w],
					R = (c[O] = x ? Ee(c[O]) : pe(c[O]));
				if (rt(T, R)) F(T, R, a, null, p, b, y, m, x);
				else break;
				w--, O--;
			}
			if (g > w) {
				if (g <= O) {
					const T = O + 1,
						R = T < C ? c[T].el : h;
					for (; g <= O; ) F(null, (c[g] = x ? Ee(c[g]) : pe(c[g])), a, R, p, b, y, m, x), g++;
				}
			} else if (g > O) for (; g <= w; ) ae(i[g], p, b, !0), g++;
			else {
				const T = g,
					R = g,
					K = new Map();
				for (g = R; g <= O; g++) {
					const se = (c[g] = x ? Ee(c[g]) : pe(c[g]));
					se.key != null && K.set(se.key, g);
				}
				let j,
					B = 0;
				const re = O - R + 1;
				let De = !1,
					Dn = 0;
				const st = new Array(re);
				for (g = 0; g < re; g++) st[g] = 0;
				for (g = T; g <= w; g++) {
					const se = i[g];
					if (B >= re) {
						ae(se, p, b, !0);
						continue;
					}
					let de;
					if (se.key != null) de = K.get(se.key);
					else
						for (j = R; j <= O; j++)
							if (st[j - R] === 0 && rt(se, c[j])) {
								de = j;
								break;
							}
					de === void 0
						? ae(se, p, b, !0)
						: ((st[de - R] = g + 1), de >= Dn ? (Dn = de) : (De = !0), F(se, c[de], a, null, p, b, y, m, x), B++);
				}
				const Bn = De ? ti(st) : ze;
				for (j = Bn.length - 1, g = re - 1; g >= 0; g--) {
					const se = R + g,
						de = c[se],
						Wn = se + 1 < C ? c[se + 1].el : h;
					st[g] === 0 ? F(null, de, a, Wn, p, b, y, m, x) : De && (j < 0 || g !== Bn[j] ? Re(de, a, Wn, 2) : j--);
				}
			}
		},
		Re = (i, c, a, h, p = null) => {
			const { el: b, type: y, transition: m, children: x, shapeFlag: g } = i;
			if (g & 6) {
				Re(i.component.subTree, c, a, h);
				return;
			}
			if (g & 128) {
				i.suspense.move(c, a, h);
				return;
			}
			if (g & 64) {
				y.move(i, c, a, $e);
				return;
			}
			if (y === ie) {
				s(b, c, a);
				for (let w = 0; w < x.length; w++) Re(x[w], c, a, h);
				s(i.anchor, c, a);
				return;
			}
			if (y === nn) {
				X(i, c, a);
				return;
			}
			if (h !== 2 && g & 1 && m)
				if (h === 0) m.beforeEnter(b), s(b, c, a), te(() => m.enter(b), p);
				else {
					const { leave: w, delayLeave: O, afterLeave: T } = m,
						R = () => s(b, c, a),
						K = () => {
							w(b, () => {
								R(), T && T();
							});
						};
					O ? O(b, R, K) : K();
				}
			else s(b, c, a);
		},
		ae = (i, c, a, h = !1, p = !1) => {
			const { type: b, props: y, ref: m, children: x, dynamicChildren: g, shapeFlag: C, patchFlag: w, dirs: O } = i;
			if ((m != null && _n(m, null, a, i, !0), C & 256)) {
				c.ctx.deactivate(i);
				return;
			}
			const T = C & 1 && O,
				R = !It(i);
			let K;
			if ((R && (K = y && y.onVnodeBeforeUnmount) && he(K, c, i), C & 6)) br(i.component, a, h);
			else {
				if (C & 128) {
					i.suspense.unmount(a, h);
					return;
				}
				T && Fe(i, null, c, "beforeUnmount"),
					C & 64
						? i.type.remove(i, c, a, p, $e, h)
						: g && (b !== ie || (w > 0 && w & 64))
						? me(g, c, a, !1, !0)
						: ((b === ie && w & 384) || (!p && C & 16)) && me(x, c, a),
					h && Un(i);
			}
			((R && (K = y && y.onVnodeUnmounted)) || T) &&
				te(() => {
					K && he(K, c, i), T && Fe(i, null, c, "unmounted");
				}, a);
		},
		Un = (i) => {
			const { type: c, el: a, anchor: h, transition: p } = i;
			if (c === ie) {
				mr(a, h);
				return;
			}
			if (c === nn) {
				M(i);
				return;
			}
			const b = () => {
				r(a), p && !p.persisted && p.afterLeave && p.afterLeave();
			};
			if (i.shapeFlag & 1 && p && !p.persisted) {
				const { leave: y, delayLeave: m } = p,
					x = () => y(a, b);
				m ? m(i.el, b, x) : x();
			} else b();
		},
		mr = (i, c) => {
			let a;
			for (; i !== c; ) (a = E(i)), r(i), (i = a);
			r(c);
		},
		br = (i, c, a) => {
			const { bum: h, scope: p, update: b, subTree: y, um: m } = i;
			h && kt(h),
				p.stop(),
				b && ((b.active = !1), ae(y, i, c, a)),
				m && te(m, c),
				te(() => {
					i.isUnmounted = !0;
				}, c),
				c &&
					c.pendingBranch &&
					!c.isUnmounted &&
					i.asyncDep &&
					!i.asyncResolved &&
					i.suspenseId === c.pendingId &&
					(c.deps--, c.deps === 0 && c.resolve());
		},
		me = (i, c, a, h = !1, p = !1, b = 0) => {
			for (let y = b; y < i.length; y++) ae(i[y], c, a, h, p);
		},
		xt = (i) =>
			i.shapeFlag & 6 ? xt(i.component.subTree) : i.shapeFlag & 128 ? i.suspense.next() : E(i.anchor || i.el),
		$n = (i, c, a) => {
			i == null ? c._vnode && ae(c._vnode, null, null, !0) : F(c._vnode || null, i, c, null, null, null, a),
				Gn(),
				Js(),
				(c._vnode = i);
		},
		$e = { p: F, um: ae, m: Re, r: Un, mt: Yt, mc: Pe, pc: S, pbc: Ae, n: xt, o: e };
	let Xt, Zt;
	return t && ([Xt, Zt] = t($e)), { render: $n, hydrate: Xt, createApp: qo($n, Xt) };
}
function He({ effect: e, update: t }, n) {
	e.allowRecurse = t.allowRecurse = n;
}
function ei(e, t) {
	return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function ur(e, t, n = !1) {
	const s = e.children,
		r = t.children;
	if (I(s) && I(r))
		for (let o = 0; o < s.length; o++) {
			const l = s[o];
			let f = r[o];
			f.shapeFlag & 1 &&
				!f.dynamicChildren &&
				((f.patchFlag <= 0 || f.patchFlag === 32) && ((f = r[o] = Ee(r[o])), (f.el = l.el)), n || ur(l, f)),
				f.type === zt && (f.el = l.el);
		}
}
function ti(e) {
	const t = e.slice(),
		n = [0];
	let s, r, o, l, f;
	const u = e.length;
	for (s = 0; s < u; s++) {
		const d = e[s];
		if (d !== 0) {
			if (((r = n[n.length - 1]), e[r] < d)) {
				(t[s] = r), n.push(s);
				continue;
			}
			for (o = 0, l = n.length - 1; o < l; ) (f = (o + l) >> 1), e[n[f]] < d ? (o = f + 1) : (l = f);
			d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
		}
	}
	for (o = n.length, l = n[o - 1]; o-- > 0; ) (n[o] = l), (l = t[l]);
	return n;
}
const ni = (e) => e.__isTeleport,
	ie = Symbol.for("v-fgt"),
	zt = Symbol.for("v-txt"),
	dt = Symbol.for("v-cmt"),
	nn = Symbol.for("v-stc"),
	ct = [];
let ce = null;
function ar(e = !1) {
	ct.push((ce = e ? null : []));
}
function si() {
	ct.pop(), (ce = ct[ct.length - 1] || null);
}
let ht = 1;
function fs(e) {
	ht += e;
}
function ri(e) {
	return (e.dynamicChildren = ht > 0 ? ce || ze : null), si(), ht > 0 && ce && ce.push(e), e;
}
function dr(e, t, n, s, r, o) {
	return ri(q(e, t, n, s, r, o, !0));
}
function oi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function rt(e, t) {
	return e.type === t.type && e.key === t.key;
}
const qt = "__vInternal",
	hr = ({ key: e }) => e ?? null,
	At = ({ ref: e, ref_key: t, ref_for: n }) => (
		typeof e == "number" && (e = "" + e), e != null ? (z(e) || k(e) || P(e) ? { i: _e, r: e, k: t, f: !!n } : e) : null
	);
function q(e, t = null, n = null, s = 0, r = null, o = e === ie ? 0 : 1, l = !1, f = !1) {
	const u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && hr(t),
		ref: t && At(t),
		scopeId: Bt,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: o,
		patchFlag: s,
		dynamicProps: r,
		dynamicChildren: null,
		appContext: null,
		ctx: _e,
	};
	return (
		f ? (jn(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= z(n) ? 8 : 16),
		ht > 0 && !l && ce && (u.patchFlag > 0 || o & 6) && u.patchFlag !== 32 && ce.push(u),
		u
	);
}
const Te = ii;
function ii(e, t = null, n = null, s = 0, r = null, o = !1) {
	if (((!e || e === wo) && (e = dt), oi(e))) {
		const f = Ze(e, t, !0);
		return (
			n && jn(f, n),
			ht > 0 && !o && ce && (f.shapeFlag & 6 ? (ce[ce.indexOf(e)] = f) : ce.push(f)),
			(f.patchFlag |= -2),
			f
		);
	}
	if ((_i(e) && (e = e.__vccOpts), t)) {
		t = li(t);
		let { class: f, style: u } = t;
		f && !z(f) && (t.class = En(f)), $(u) && (Us(u) && !I(u) && (u = J({}, u)), (t.style = wn(u)));
	}
	const l = z(e) ? 1 : Eo(e) ? 128 : ni(e) ? 64 : $(e) ? 4 : P(e) ? 2 : 0;
	return q(e, t, n, s, r, l, o, !0);
}
function li(e) {
	return e ? (Us(e) || qt in e ? J({}, e) : e) : null;
}
function Ze(e, t, n = !1) {
	const { props: s, ref: r, patchFlag: o, children: l } = e,
		f = t ? ci(s || {}, t) : s;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: f,
		key: f && hr(f),
		ref: t && t.ref ? (n && r ? (I(r) ? r.concat(At(t)) : [r, At(t)]) : At(t)) : r,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: l,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== ie ? (o === -1 ? 16 : o | 16) : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Ze(e.ssContent),
		ssFallback: e.ssFallback && Ze(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
	};
}
function Ue(e = " ", t = 0) {
	return Te(zt, null, e, t);
}
function pe(e) {
	return e == null || typeof e == "boolean"
		? Te(dt)
		: I(e)
		? Te(ie, null, e.slice())
		: typeof e == "object"
		? Ee(e)
		: Te(zt, null, String(e));
}
function Ee(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ze(e);
}
function jn(e, t) {
	let n = 0;
	const { shapeFlag: s } = e;
	if (t == null) t = null;
	else if (I(t)) n = 16;
	else if (typeof t == "object")
		if (s & 65) {
			const r = t.default;
			r && (r._c && (r._d = !1), jn(e, r()), r._c && (r._d = !0));
			return;
		} else {
			n = 32;
			const r = t._;
			!r && !(qt in t)
				? (t._ctx = _e)
				: r === 3 && _e && (_e.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		P(t) ? ((t = { default: t, _ctx: _e }), (n = 32)) : ((t = String(t)), s & 64 ? ((n = 16), (t = [Ue(t)])) : (n = 8));
	(e.children = t), (e.shapeFlag |= n);
}
function ci(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const s = e[n];
		for (const r in s)
			if (r === "class") t.class !== s.class && (t.class = En([t.class, s.class]));
			else if (r === "style") t.style = wn([t.style, s.style]);
			else if (jt(r)) {
				const o = t[r],
					l = s[r];
				l && o !== l && !(I(o) && o.includes(l)) && (t[r] = o ? [].concat(o, l) : l);
			} else r !== "" && (t[r] = s[r]);
	}
	return t;
}
function he(e, t, n, s = null) {
	ue(e, t, 7, [n, s]);
}
const fi = rr();
let ui = 0;
function ai(e, t, n) {
	const s = e.type,
		r = (t ? t.appContext : e.appContext) || fi,
		o = {
			uid: ui++,
			vnode: e,
			type: s,
			parent: t,
			appContext: r,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new Fr(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(r.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: ir(s, r),
			emitsOptions: Ys(s, r),
			emit: null,
			emitted: null,
			propsDefaults: L,
			inheritAttrs: s.inheritAttrs,
			ctx: L,
			data: L,
			props: L,
			attrs: L,
			slots: L,
			refs: L,
			setupState: L,
			setupContext: null,
			attrsProxy: null,
			slotsProxy: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = _o.bind(null, o)), e.ce && e.ce(o), o;
}
let Q = null,
	Sn,
	Be,
	us = "__VUE_INSTANCE_SETTERS__";
(Be = on()[us]) || (Be = on()[us] = []),
	Be.push((e) => (Q = e)),
	(Sn = (e) => {
		Be.length > 1 ? Be.forEach((t) => t(e)) : Be[0](e);
	});
const Qe = (e) => {
		Sn(e), e.scope.on();
	},
	Ke = () => {
		Q && Q.scope.off(), Sn(null);
	};
function pr(e) {
	return e.vnode.shapeFlag & 4;
}
let pt = !1;
function di(e, t = !1) {
	pt = t;
	const { props: n, children: s } = e.vnode,
		r = pr(e);
	Vo(e, n, r, t), Zo(e, s);
	const o = r ? hi(e, t) : void 0;
	return (pt = !1), o;
}
function hi(e, t) {
	const n = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = $s(new Proxy(e.ctx, Lo)));
	const { setup: s } = n;
	if (s) {
		const r = (e.setupContext = s.length > 1 ? gi(e) : null);
		Qe(e), Ge();
		const o = Oe(s, e, 0, [e.props, r]);
		if ((et(), Ke(), ws(o))) {
			if ((o.then(Ke, Ke), t))
				return o
					.then((l) => {
						as(e, l, t);
					})
					.catch((l) => {
						$t(l, e, 0);
					});
			e.asyncDep = o;
		} else as(e, o, t);
	} else gr(e, t);
}
function as(e, t, n) {
	P(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : $(t) && (e.setupState = Ws(t)), gr(e, n);
}
let ds;
function gr(e, t, n) {
	const s = e.type;
	if (!e.render) {
		if (!t && ds && !s.render) {
			const r = s.template || Hn(e).template;
			if (r) {
				const { isCustomElement: o, compilerOptions: l } = e.appContext.config,
					{ delimiters: f, compilerOptions: u } = s,
					d = J(J({ isCustomElement: o, delimiters: f }, l), u);
				s.render = ds(r, d);
			}
		}
		e.render = s.render || fe;
	}
	{
		Qe(e), Ge();
		try {
			Uo(e);
		} finally {
			et(), Ke();
		}
	}
}
function pi(e) {
	return (
		e.attrsProxy ||
		(e.attrsProxy = new Proxy(e.attrs, {
			get(t, n) {
				return ne(e, "get", "$attrs"), t[n];
			},
		}))
	);
}
function gi(e) {
	const t = (n) => {
		e.exposed = n || {};
	};
	return {
		get attrs() {
			return pi(e);
		},
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function Kn(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(Ws($s(e.exposed)), {
				get(t, n) {
					if (n in t) return t[n];
					if (n in lt) return lt[n](e);
				},
				has(t, n) {
					return n in t || n in lt;
				},
			}))
		);
}
function _i(e) {
	return P(e) && "__vccOpts" in e;
}
const mi = (e, t) => co(e, t, pt),
	bi = Symbol.for("v-scx"),
	xi = () => Pt(bi),
	yi = "3.3.8",
	vi = "http://www.w3.org/2000/svg",
	je = typeof document < "u" ? document : null,
	hs = je && je.createElement("template"),
	wi = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: (e) => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, s) => {
			const r = t ? je.createElementNS(vi, e) : je.createElement(e, n ? { is: n } : void 0);
			return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
		},
		createText: (e) => je.createTextNode(e),
		createComment: (e) => je.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => je.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		insertStaticContent(e, t, n, s, r, o) {
			const l = n ? n.previousSibling : t.lastChild;
			if (r && (r === o || r.nextSibling))
				for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); );
			else {
				hs.innerHTML = s ? `<svg>${e}</svg>` : e;
				const f = hs.content;
				if (s) {
					const u = f.firstChild;
					for (; u.firstChild; ) f.appendChild(u.firstChild);
					f.removeChild(u);
				}
				t.insertBefore(f, n);
			}
			return [l ? l.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
		},
	},
	Ei = Symbol("_vtc");
function Ci(e, t, n) {
	const s = e[Ei];
	s && (t = (t ? [t, ...s] : [...s]).join(" ")),
		t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
const Oi = Symbol("_vod");
function Ti(e, t, n) {
	const s = e.style,
		r = z(n);
	if (n && !r) {
		if (t && !z(t)) for (const o in t) n[o] == null && mn(s, o, "");
		for (const o in n) mn(s, o, n[o]);
	} else {
		const o = s.display;
		r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), Oi in e && (s.display = o);
	}
}
const ps = /\s*!important$/;
function mn(e, t, n) {
	if (I(n)) n.forEach((s) => mn(e, t, s));
	else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
	else {
		const s = Ii(e, t);
		ps.test(n) ? e.setProperty(ke(s), n.replace(ps, ""), "important") : (e[s] = n);
	}
}
const gs = ["Webkit", "Moz", "ms"],
	sn = {};
function Ii(e, t) {
	const n = sn[t];
	if (n) return n;
	let s = Ye(t);
	if (s !== "filter" && s in e) return (sn[t] = s);
	s = Os(s);
	for (let r = 0; r < gs.length; r++) {
		const o = gs[r] + s;
		if (o in e) return (sn[t] = o);
	}
	return t;
}
const _s = "http://www.w3.org/1999/xlink";
function Pi(e, t, n, s, r) {
	if (s && t.startsWith("xlink:"))
		n == null ? e.removeAttributeNS(_s, t.slice(6, t.length)) : e.setAttributeNS(_s, t, n);
	else {
		const o = Rr(t);
		n == null || (o && !Ts(n)) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
	}
}
function Ai(e, t, n, s, r, o, l) {
	if (t === "innerHTML" || t === "textContent") {
		s && l(s, r, o), (e[t] = n ?? "");
		return;
	}
	const f = e.tagName;
	if (t === "value" && f !== "PROGRESS" && !f.includes("-")) {
		e._value = n;
		const d = f === "OPTION" ? e.getAttribute("value") : e.value,
			_ = n ?? "";
		d !== _ && (e.value = _), n == null && e.removeAttribute(t);
		return;
	}
	let u = !1;
	if (n === "" || n == null) {
		const d = typeof e[t];
		d === "boolean"
			? (n = Ts(n))
			: n == null && d === "string"
			? ((n = ""), (u = !0))
			: d === "number" && ((n = 0), (u = !0));
	}
	try {
		e[t] = n;
	} catch {}
	u && e.removeAttribute(t);
}
function Mi(e, t, n, s) {
	e.addEventListener(t, n, s);
}
function Ri(e, t, n, s) {
	e.removeEventListener(t, n, s);
}
const ms = Symbol("_vei");
function Fi(e, t, n, s, r = null) {
	const o = e[ms] || (e[ms] = {}),
		l = o[t];
	if (s && l) l.value = s;
	else {
		const [f, u] = Hi(t);
		if (s) {
			const d = (o[t] = Si(s, r));
			Mi(e, f, d, u);
		} else l && (Ri(e, f, l, u), (o[t] = void 0));
	}
}
const bs = /(?:Once|Passive|Capture)$/;
function Hi(e) {
	let t;
	if (bs.test(e)) {
		t = {};
		let s;
		for (; (s = e.match(bs)); ) (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
	}
	return [e[2] === ":" ? e.slice(3) : ke(e.slice(2)), t];
}
let rn = 0;
const Ni = Promise.resolve(),
	ji = () => rn || (Ni.then(() => (rn = 0)), (rn = Date.now()));
function Si(e, t) {
	const n = (s) => {
		if (!s._vts) s._vts = Date.now();
		else if (s._vts <= n.attached) return;
		ue(Ki(s, n.value), t, 5, [s]);
	};
	return (n.value = e), (n.attached = ji()), n;
}
function Ki(e, t) {
	if (I(t)) {
		const n = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				n.call(e), (e._stopped = !0);
			}),
			t.map((s) => (r) => !r._stopped && s && s(r))
		);
	} else return t;
}
const xs = /^on[a-z]/,
	Li = (e, t, n, s, r = !1, o, l, f, u) => {
		t === "class"
			? Ci(e, s, r)
			: t === "style"
			? Ti(e, n, s)
			: jt(t)
			? xn(t) || Fi(e, t, n, s, l)
			: (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : Ui(e, t, s, r))
			? Ai(e, t, s, o, l, f, u)
			: (t === "true-value" ? (e._trueValue = s) : t === "false-value" && (e._falseValue = s), Pi(e, t, s, r));
	};
function Ui(e, t, n, s) {
	return s
		? !!(t === "innerHTML" || t === "textContent" || (t in e && xs.test(t) && P(n)))
		: t === "spellcheck" ||
		  t === "draggable" ||
		  t === "translate" ||
		  t === "form" ||
		  (t === "list" && e.tagName === "INPUT") ||
		  (t === "type" && e.tagName === "TEXTAREA") ||
		  (xs.test(t) && z(n))
		? !1
		: t in e;
}
const $i = J({ patchProp: Li }, wi);
let ys;
function Di() {
	return ys || (ys = ko($i));
}
const Bi = (...e) => {
	const t = Di().createApp(...e),
		{ mount: n } = t;
	return (
		(t.mount = (s) => {
			const r = Wi(s);
			if (!r) return;
			const o = t._component;
			!P(o) && !o.render && !o.template && (o.template = r.innerHTML), (r.innerHTML = "");
			const l = n(r, !1, r instanceof SVGElement);
			return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), l;
		}),
		t
	);
};
function Wi(e) {
	return z(e) ? document.querySelector(e) : e;
}
const zi = "/web/vite.svg",
	qi = "/web/assets/vue-5532db34.svg",
	Jt = (e) => (Xs("data-v-28abe76a"), (e = e()), Zs(), e),
	Ji = { class: "card" },
	Vi = Jt(() => q("p", null, [Ue(" Edit "), q("code", null, "components/HelloWorld.vue"), Ue(" to test HMR ")], -1)),
	Yi = Jt(() =>
		q(
			"p",
			null,
			[
				Ue(" Check out "),
				q("a", { href: "https://vuejs.org/guide/quick-start.html#local", target: "_blank" }, "create-vue"),
				Ue(", the official Vue + Vite starter "),
			],
			-1,
		),
	),
	Xi = Jt(() =>
		q(
			"p",
			null,
			[
				Ue(" Install "),
				q("a", { href: "https://github.com/vuejs/language-tools", target: "_blank" }, "Volar"),
				Ue(" in your IDE for a better DX "),
			],
			-1,
		),
	),
	Zi = Jt(() => q("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1)),
	Qi = Gs({
		__name: "HelloWorld",
		props: { msg: {} },
		setup(e) {
			const t = no(0);
			return (n, s) => (
				ar(),
				dr(
					ie,
					null,
					[
						q("h1", null, qn(n.msg), 1),
						q("div", Ji, [
							q("button", { type: "button", onClick: s[0] || (s[0] = (r) => t.value++) }, "count is " + qn(t.value), 1),
							Vi,
						]),
						Yi,
						Xi,
						Zi,
					],
					64,
				)
			);
		},
	});
const _r = (e, t) => {
		const n = e.__vccOpts || e;
		for (const [s, r] of t) n[s] = r;
		return n;
	},
	ki = _r(Qi, [["__scopeId", "data-v-28abe76a"]]),
	Gi = (e) => (Xs("data-v-de8660c2"), (e = e()), Zs(), e),
	el = Gi(() =>
		q(
			"div",
			null,
			[
				q("a", { href: "https://vitejs.dev", target: "_blank" }, [
					q("img", { src: zi, class: "logo", alt: "Vite logo" }),
				]),
				q("a", { href: "https://vuejs.org/", target: "_blank" }, [
					q("img", { src: qi, class: "logo vue", alt: "Vue logo" }),
				]),
			],
			-1,
		),
	),
	tl = Gs({
		__name: "App",
		setup(e) {
			return (t, n) => (ar(), dr(ie, null, [el, Te(ki, { msg: "Vite + Vue" })], 64));
		},
	});
const nl = _r(tl, [["__scopeId", "data-v-de8660c2"]]);
Bi(nl).mount("#app");
