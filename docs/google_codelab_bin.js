(function () {
    "use strict";
    var aa = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
        ba =
            "function" == typeof Object.create
                ? Object.create
                : function (a) {
                      function b() {}
                      b.prototype = a;
                      return new b();
                  },
        ca;
    if ("function" == typeof Object.setPrototypeOf) ca = Object.setPrototypeOf;
    else {
        var da;
        a: {
            var ea = { da: !0 },
                fa = {};
            try {
                fa.__proto__ = ea;
                da = fa.da;
                break a;
            } catch (a) {}
            da = !1;
        }
        ca = da
            ? function (a, b) {
                  a.__proto__ = b;
                  if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
                  return a;
              }
            : null;
    }
    var ha = ca,
        h = this;
    function l(a) {
        return "string" == typeof a;
    }
    function ia() {}
    function ja(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || ("number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))) return "array";
                if ("[object Function]" == c || ("undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))) return "function";
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b;
    }
    function m(a) {
        return "array" == ja(a);
    }
    function n(a) {
        var b = typeof a;
        return ("object" == b && null != a) || "function" == b;
    }
    var ka = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
        la = 0;
    function ma(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }
    function na(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c);
            };
        }
        return function () {
            return a.apply(b, arguments);
        };
    }
    function p(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? (p = ma) : (p = na);
        return p.apply(null, arguments);
    }
    var oa =
        Date.now ||
        function () {
            return +new Date();
        };
    function q(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.U = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
        a.na = function (a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d);
        };
    }
    function r() {
        0 != pa && (this[ka] || (this[ka] = ++la));
    }
    var pa = 0;
    var qa;
    var ra = Array.prototype.indexOf
            ? function (a, b) {
                  return Array.prototype.indexOf.call(a, b, void 0);
              }
            : function (a, b) {
                  if (l(a)) return l(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
                  for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
                  return -1;
              },
        sa = Array.prototype.forEach
            ? function (a, b) {
                  Array.prototype.forEach.call(a, b, void 0);
              }
            : function (a, b) {
                  for (var c = a.length, d = l(a) ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a);
              },
        ta = Array.prototype.map
            ? function (a, b) {
                  return Array.prototype.map.call(a, b, void 0);
              }
            : function (a, b) {
                  for (var c = a.length, d = Array(c), e = l(a) ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
                  return d;
              };
    var ua = String.prototype.trim
        ? function (a) {
              return a.trim();
          }
        : function (a) {
              return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
          };
    function t(a) {
        if (!va.test(a)) return a;
        -1 != a.indexOf("&") && (a = a.replace(wa, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(xa, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(ya, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(za, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(Aa, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(Ba, "&#0;"));
        return a;
    }
    var wa = /&/g,
        xa = /</g,
        ya = />/g,
        za = /"/g,
        Aa = /'/g,
        Ba = /\x00/g,
        va = /[\x00&<>"']/;
    function Ca(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    function Da(a) {
        return String(a).replace(/\-([a-z])/g, function (a, c) {
            return c.toUpperCase();
        });
    }
    function Ea(a) {
        var b = l(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
            return b + e.toUpperCase();
        });
    }
    var u;
    a: {
        var Fa = h.navigator;
        if (Fa) {
            var Ga = Fa.userAgent;
            if (Ga) {
                u = Ga;
                break a;
            }
        }
        u = "";
    }
    function Ha(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a);
    }
    var Ia = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Ja(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Ia.length; f++) (c = Ia[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
    }
    function Ka(a) {
        Ka[" "](a);
        return a;
    }
    Ka[" "] = ia;
    function La(a, b) {
        var c = Ma;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
    }
    var Na = -1 != u.indexOf("Opera"),
        v = -1 != u.indexOf("Trident") || -1 != u.indexOf("MSIE"),
        Oa = -1 != u.indexOf("Edge"),
        w = -1 != u.indexOf("Gecko") && !(-1 != u.toLowerCase().indexOf("webkit") && -1 == u.indexOf("Edge")) && !(-1 != u.indexOf("Trident") || -1 != u.indexOf("MSIE")) && -1 == u.indexOf("Edge"),
        z = -1 != u.toLowerCase().indexOf("webkit") && -1 == u.indexOf("Edge");
    function Pa() {
        var a = h.document;
        return a ? a.documentMode : void 0;
    }
    var A;
    a: {
        var Qa = "",
            Ra = (function () {
                var a = u;
                if (w) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (Oa) return /Edge\/([\d\.]+)/.exec(a);
                if (v) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (z) return /WebKit\/(\S+)/.exec(a);
                if (Na) return /(?:Version)[ \/]?(\S+)/.exec(a);
            })();
        Ra && (Qa = Ra ? Ra[1] : "");
        if (v) {
            var Sa = Pa();
            if (null != Sa && Sa > parseFloat(Qa)) {
                A = String(Sa);
                break a;
            }
        }
        A = Qa;
    }
    var Ma = {};
    function Ta(a) {
        return La(a, function () {
            for (var b = 0, c = ua(String(A)).split("."), d = ua(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || "",
                    k = d[f] || "";
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                    if (0 == g[0].length && 0 == k[0].length) break;
                    b = Ca(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == k[1].length ? 0 : parseInt(k[1], 10)) || Ca(0 == g[2].length, 0 == k[2].length) || Ca(g[2], k[2]);
                    g = g[3];
                    k = k[3];
                } while (0 == b);
            }
            return 0 <= b;
        });
    }
    var Ua;
    var Va = h.document;
    Ua = Va && v ? Pa() || ("CSS1Compat" == Va.compatMode ? parseInt(A, 10) : 5) : void 0;
    var Wa;
    (Wa = !v) || (Wa = 9 <= Number(Ua));
    var Xa = Wa,
        Ya = v && !Ta("9"),
        Za = (function () {
            if (!h.addEventListener || !Object.defineProperty) return !1;
            var a = !1,
                b = Object.defineProperty({}, "passive", {
                    get: function () {
                        a = !0;
                    },
                });
            h.addEventListener("test", ia, b);
            h.removeEventListener("test", ia, b);
            return a;
        })();
    function B(a, b) {
        this.type = a;
        this.a = this.target = b;
        this.f = !1;
        this.aa = !0;
    }
    B.prototype.stopPropagation = function () {
        this.f = !0;
    };
    B.prototype.preventDefault = function () {
        this.aa = !1;
    };
    function C(a, b) {
        B.call(this, a ? a.type : "");
        this.relatedTarget = this.a = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.D = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.b = null;
        if (a) {
            var c = (this.type = a.type),
                d = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.a = b;
            if ((b = a.relatedTarget)) {
                if (w) {
                    a: {
                        try {
                            Ka(b.nodeName);
                            var e = !0;
                            break a;
                        } catch (f) {}
                        e = !1;
                    }
                    e || (b = null);
                }
            } else "mouseover" == c ? (b = a.fromElement) : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d
                ? ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX), (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY), (this.screenX = a.screenX || 0), (this.screenY = a.screenY || 0))
                : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX), (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY), (this.screenX = d.screenX || 0), (this.screenY = d.screenY || 0));
            this.button = a.button;
            this.D = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = l(a.pointerType) ? a.pointerType : $a[a.pointerType] || "";
            this.b = a;
            a.defaultPrevented && this.preventDefault();
        }
    }
    q(C, B);
    var $a = { 2: "touch", 3: "pen", 4: "mouse" };
    C.prototype.stopPropagation = function () {
        C.U.stopPropagation.call(this);
        this.b.stopPropagation ? this.b.stopPropagation() : (this.b.cancelBubble = !0);
    };
    C.prototype.preventDefault = function () {
        C.U.preventDefault.call(this);
        var a = this.b;
        if (a.preventDefault) a.preventDefault();
        else if (((a.returnValue = !1), Ya))
            try {
                if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
            } catch (b) {}
    };
    var D = "closure_listenable_" + ((1e6 * Math.random()) | 0),
        ab = 0;
    function bb(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.M = e;
        this.key = ++ab;
        this.C = this.H = !1;
    }
    function cb(a) {
        a.C = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.M = null;
    }
    function E(a) {
        this.src = a;
        this.a = {};
        this.b = 0;
    }
    E.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.a[f];
        a || ((a = this.a[f] = []), this.b++);
        var g = db(a, b, d, e);
        -1 < g ? ((b = a[g]), c || (b.H = !1)) : ((b = new bb(b, this.src, f, !!d, e)), (b.H = c), a.push(b));
        return b;
    };
    function eb(a, b) {
        var c = b.type;
        if (c in a.a) {
            var d = a.a[c],
                e = ra(d, b),
                f;
            (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
            f && (cb(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
        }
    }
    function db(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.C && f.listener == b && f.capture == !!c && f.M == d) return e;
        }
        return -1;
    }
    var fb = "closure_lm_" + ((1e6 * Math.random()) | 0),
        gb = {},
        hb = 0;
    function ib(a, b, c, d, e) {
        if (d && d.once) return jb(a, b, c, d, e);
        if (m(b)) {
            for (var f = 0; f < b.length; f++) ib(a, b[f], c, d, e);
            return null;
        }
        c = kb(c);
        return a && a[D] ? a.b.add(String(b), c, !1, n(d) ? !!d.capture : !!d, e) : lb(a, b, c, !1, d, e);
    }
    function lb(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = n(e) ? !!e.capture : !!e,
            k = F(a);
        k || (a[fb] = k = new E(a));
        c = k.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = mb();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) Za || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(nb(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        hb++;
        return c;
    }
    function mb() {
        var a = ob,
            b = Xa
                ? function (c) {
                      return a.call(b.src, b.listener, c);
                  }
                : function (c) {
                      c = a.call(b.src, b.listener, c);
                      if (!c) return c;
                  };
        return b;
    }
    function jb(a, b, c, d, e) {
        if (m(b)) {
            for (var f = 0; f < b.length; f++) jb(a, b[f], c, d, e);
            return null;
        }
        c = kb(c);
        return a && a[D] ? a.b.add(String(b), c, !0, n(d) ? !!d.capture : !!d, e) : lb(a, b, c, !0, d, e);
    }
    function pb(a, b, c, d, e) {
        if (m(b)) for (var f = 0; f < b.length; f++) pb(a, b[f], c, d, e);
        else
            ((d = n(d) ? !!d.capture : !!d), (c = kb(c)), a && a[D])
                ? ((a = a.b), (b = String(b).toString()), b in a.a && ((f = a.a[b]), (c = db(f, c, d, e)), -1 < c && (cb(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--))))
                : a && (a = F(a)) && ((b = a.a[b.toString()]), (a = -1), b && (a = db(b, c, d, e)), (c = -1 < a ? b[a] : null) && qb(c));
    }
    function qb(a) {
        if ("number" != typeof a && a && !a.C) {
            var b = a.src;
            if (b && b[D]) eb(b.b, a);
            else {
                var c = a.type,
                    d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(nb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                hb--;
                (c = F(b)) ? (eb(c, a), 0 == c.b && ((c.src = null), (b[fb] = null))) : cb(a);
            }
        }
    }
    function nb(a) {
        return a in gb ? gb[a] : (gb[a] = "on" + a);
    }
    function rb(a, b, c, d) {
        var e = !0;
        if ((a = F(a)))
            if ((b = a.a[b.toString()]))
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.C && ((f = sb(f, d)), (e = e && !1 !== f));
                }
        return e;
    }
    function sb(a, b) {
        var c = a.listener,
            d = a.M || a.src;
        a.H && qb(a);
        return c.call(d, b);
    }
    function ob(a, b) {
        if (a.C) return !0;
        if (!Xa) {
            if (!b)
                a: {
                    b = ["window", "event"];
                    for (var c = h, d = 0; d < b.length; d++)
                        if (((c = c[b[d]]), null == c)) {
                            b = null;
                            break a;
                        }
                    b = c;
                }
            d = b;
            b = new C(d, this);
            c = !0;
            if (!(0 > d.keyCode || void 0 != d.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == d.keyCode)
                        try {
                            d.keyCode = -1;
                            break a;
                        } catch (g) {
                            e = !0;
                        }
                    if (e || void 0 == d.returnValue) d.returnValue = !0;
                }
                d = [];
                for (e = b.a; e; e = e.parentNode) d.push(e);
                a = a.type;
                for (e = d.length - 1; !b.f && 0 <= e; e--) {
                    b.a = d[e];
                    var f = rb(d[e], a, !0, b);
                    c = c && f;
                }
                for (e = 0; !b.f && e < d.length; e++) (b.a = d[e]), (f = rb(d[e], a, !1, b)), (c = c && f);
            }
            return c;
        }
        return sb(a, new C(b, this));
    }
    function F(a) {
        a = a[fb];
        return a instanceof E ? a : null;
    }
    var tb = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
    function kb(a) {
        if ("function" == ja(a)) return a;
        a[tb] ||
            (a[tb] = function (b) {
                return a.handleEvent(b);
            });
        return a[tb];
    }
    function G(a) {
        r.call(this);
        this.b = a;
        this.a = {};
    }
    q(G, r);
    var ub = [];
    function H(a, b, c, d) {
        m(c) || (c && (ub[0] = c.toString()), (c = ub));
        for (var e = 0; e < c.length; e++) {
            var f = ib(b, c[e], d || a.handleEvent, !1, a.b || a);
            if (!f) break;
            a.a[f.key] = f;
        }
    }
    function vb(a, b, c) {
        wb(a, b, ["finish", "stop"], c, void 0);
    }
    function wb(a, b, c, d, e, f) {
        if (m(c)) for (var g = 0; g < c.length; g++) wb(a, b, c[g], d, e, f);
        else (b = jb(b, c, d || a.handleEvent, e, f || a.b || a)) && (a.a[b.key] = b);
    }
    function xb(a) {
        Ha(
            a.a,
            function (a, c) {
                this.a.hasOwnProperty(c) && qb(a);
            },
            a
        );
        a.a = {};
    }
    G.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    function yb(a) {
        var b = !1,
            c;
        return function () {
            b || ((c = a()), (b = !0));
            return c;
        };
    }
    function zb() {}
    function Ab() {}
    q(Ab, zb);
    function I(a) {
        this.m = a;
    }
    q(I, Ab);
    I.prototype.set = function (a, b) {
        try {
            this.m.setItem(a, b);
        } catch (c) {
            if (0 == this.m.length) throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    };
    I.prototype.get = function (a) {
        a = this.m.getItem(a);
        if (!l(a) && null !== a) throw "Storage mechanism: Invalid value was encountered";
        return a;
    };
    I.prototype.key = function (a) {
        return this.m.key(a);
    };
    function Bb() {
        var a = null;
        try {
            a = window.localStorage || null;
        } catch (b) {}
        this.m = a;
    }
    q(Bb, I);
    var Cb = { area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 };
    function J() {
        this.a = Db;
    }
    J.prototype.o = !0;
    J.prototype.j = function () {
        return "";
    };
    J.prototype.toString = function () {
        return "Const{}";
    };
    function Eb(a) {
        return a instanceof J && a.constructor === J && a.a === Db ? "" : "type_error:Const";
    }
    var Db = {};
    function K() {
        this.a = Fb;
    }
    K.prototype.o = !0;
    K.prototype.j = function () {
        return "";
    };
    K.prototype.R = !0;
    K.prototype.v = function () {
        return 1;
    };
    function Gb(a) {
        return a instanceof K && a.constructor === K && a.a === Fb ? "" : "type_error:TrustedResourceUrl";
    }
    var Fb = {};
    function L() {
        this.a = "";
        this.b = Hb;
    }
    L.prototype.o = !0;
    L.prototype.j = function () {
        return this.a;
    };
    L.prototype.R = !0;
    L.prototype.v = function () {
        return 1;
    };
    function Ib(a) {
        return a instanceof L && a.constructor === L && a.b === Hb ? a.a : "type_error:SafeUrl";
    }
    var Jb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    function Kb(a) {
        if (a instanceof L) return a;
        a = "object" == typeof a && a.o ? a.j() : String(a);
        Jb.test(a) || (a = "about:invalid#zClosurez");
        return Lb(a);
    }
    var Hb = {};
    function Lb(a) {
        var b = new L();
        b.a = a;
        return b;
    }
    Lb("about:blank");
    function M() {
        this.a = "";
        this.b = Mb;
    }
    M.prototype.o = !0;
    var Mb = {};
    M.prototype.j = function () {
        return this.a;
    };
    function Nb(a) {
        var b = new M();
        b.a = a;
        return b;
    }
    var Ob = Nb("");
    function Pb(a) {
        if (a instanceof L) a = 'url("' + Ib(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        else if (a instanceof J) a = Eb(a);
        else {
            a = String(a);
            var b = a.replace(Qb, "$1").replace(Qb, "$1").replace(Rb, "url");
            if (Sb.test(b)) {
                if ((b = !Tb.test(a))) {
                    for (var c = (b = !0), d = 0; d < a.length; d++) {
                        var e = a.charAt(d);
                        "'" == e && c ? (b = !b) : '"' == e && b && (c = !c);
                    }
                    b = b && c && Ub(a);
                }
                a = b ? Vb(a) : "zClosurez";
            } else a = "zClosurez";
        }
        return a;
    }
    function Ub(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b) return !1;
                b = !0;
            } else if ("[" == e) {
                if (!b) return !1;
                b = !1;
            } else if (!b && !c.test(e)) return !1;
        }
        return b;
    }
    var Sb = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/,
        Rb = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g,
        Qb = /\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g,
        Tb = /\/\*/;
    function Vb(a) {
        return a.replace(Rb, function (a, c, d, e) {
            var b = "";
            d = d.replace(/^(['"])(.*)\1$/, function (a, c, d) {
                b = c;
                return d;
            });
            a = Kb(d).j();
            return c + b + a + b + e;
        });
    }
    function N() {
        this.a = "";
        this.f = Wb;
        this.b = null;
    }
    N.prototype.R = !0;
    N.prototype.v = function () {
        return this.b;
    };
    N.prototype.o = !0;
    N.prototype.j = function () {
        return this.a;
    };
    function O(a) {
        return a instanceof N && a.constructor === N && a.f === Wb ? a.a : "type_error:SafeHtml";
    }
    var Xb = /^[a-zA-Z0-9-]+$/,
        Yb = { action: !0, cite: !0, data: !0, formaction: !0, href: !0, manifest: !0, poster: !0, src: !0 },
        Zb = { APPLET: !0, BASE: !0, EMBED: !0, IFRAME: !0, LINK: !0, MATH: !0, META: !0, OBJECT: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0 };
    function $b(a) {
        function b(a) {
            if (m(a)) sa(a, b);
            else {
                if (a instanceof N) var e = a;
                else {
                    var g = "object" == typeof a;
                    e = null;
                    g && a.R && (e = a.v());
                    a = t(g && a.o ? a.j() : String(a));
                    e = P(a, e);
                }
                d += O(e);
                e = e.v();
                0 == c ? (c = e) : 0 != e && c != e && (c = null);
            }
        }
        var c = 0,
            d = "";
        sa(arguments, b);
        return P(d, c);
    }
    var Wb = {};
    function P(a, b) {
        var c = new N();
        c.a = a;
        c.b = b;
        return c;
    }
    P("<!DOCTYPE html>", 0);
    P("", 0);
    P("<br>", 0);
    var ac = {},
        bc = {},
        cc = {},
        dc = {};
    function Q() {
        throw Error("Do not instantiate directly");
    }
    Q.prototype.V = null;
    Q.prototype.toString = function () {
        return this.L;
    };
    function ec() {
        Q.call(this);
    }
    q(ec, Q);
    ec.prototype.u = ac;
    function fc(a) {
        if (null != a)
            switch (a.V) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0;
            }
        return null;
    }
    function gc(a) {
        return null != a && a.u === ac ? a : a instanceof N ? R(O(a), a.v()) : R(t(String(String(a))), fc(a));
    }
    var R = (function (a) {
        function b(a) {
            this.L = a;
        }
        b.prototype = a.prototype;
        return function (a, d) {
            a = new b(String(a));
            void 0 !== d && (a.V = d);
            return a;
        };
    })(ec);
    function hc(a) {
        return null != a && a.u === ac ? String(String(a.L).replace(ic, "").replace(jc, "&lt;")).replace(kc, lc) : t(String(a));
    }
    function mc(a) {
        (null != a && a.u === bc) || (null != a && a.u === cc)
            ? (a = String(a).replace(nc, oc))
            : a instanceof L
            ? (a = String(Ib(a)).replace(nc, oc))
            : a instanceof K
            ? (a = String(Gb(a)).replace(nc, oc))
            : ((a = String(a)), (a = pc.test(a) ? a.replace(nc, oc) : "about:invalid#zSoyz"));
        return a;
    }
    var qc = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\x0B": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;",
    };
    function lc(a) {
        return qc[a];
    }
    var rc = {
        "\x00": "%00",
        "\u0001": "%01",
        "\u0002": "%02",
        "\u0003": "%03",
        "\u0004": "%04",
        "\u0005": "%05",
        "\u0006": "%06",
        "\u0007": "%07",
        "\b": "%08",
        "\t": "%09",
        "\n": "%0A",
        "\x0B": "%0B",
        "\f": "%0C",
        "\r": "%0D",
        "\u000e": "%0E",
        "\u000f": "%0F",
        "\u0010": "%10",
        "\u0011": "%11",
        "\u0012": "%12",
        "\u0013": "%13",
        "\u0014": "%14",
        "\u0015": "%15",
        "\u0016": "%16",
        "\u0017": "%17",
        "\u0018": "%18",
        "\u0019": "%19",
        "\u001a": "%1A",
        "\u001b": "%1B",
        "\u001c": "%1C",
        "\u001d": "%1D",
        "\u001e": "%1E",
        "\u001f": "%1F",
        " ": "%20",
        '"': "%22",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "<": "%3C",
        ">": "%3E",
        "\\": "%5C",
        "{": "%7B",
        "}": "%7D",
        "\u007f": "%7F",
        "\u0085": "%C2%85",
        "\u00a0": "%C2%A0",
        "\u2028": "%E2%80%A8",
        "\u2029": "%E2%80%A9",
        "\uff01": "%EF%BC%81",
        "\uff03": "%EF%BC%83",
        "\uff04": "%EF%BC%84",
        "\uff06": "%EF%BC%86",
        "\uff07": "%EF%BC%87",
        "\uff08": "%EF%BC%88",
        "\uff09": "%EF%BC%89",
        "\uff0a": "%EF%BC%8A",
        "\uff0b": "%EF%BC%8B",
        "\uff0c": "%EF%BC%8C",
        "\uff0f": "%EF%BC%8F",
        "\uff1a": "%EF%BC%9A",
        "\uff1b": "%EF%BC%9B",
        "\uff1d": "%EF%BC%9D",
        "\uff1f": "%EF%BC%9F",
        "\uff20": "%EF%BC%A0",
        "\uff3b": "%EF%BC%BB",
        "\uff3d": "%EF%BC%BD",
    };
    function oc(a) {
        return rc[a];
    }
    var kc = /[\x00\x22\x27\x3c\x3e]/g,
        nc = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
        pc = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
        ic = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
        jc = /</g;
    function sc(a) {
        a = a.ga;
        return R(
            '<div id="drawer">Drawer</div><div id="main"><div id="codelab-title"><div id="codelab-nav-buttons"><a href="' +
                hc(mc(a)) +
                '" id="arrow-back"><i class="material-icons">close</i></a><a href="#" id="menu"><i class="material-icons">menu</i></a></div><div id="codelab-time-container"></div><devsite-user></devsite-user></div><div id="steps"></div><div id="controls"><div id="fabs"><a href="#" id="previous-step" title="Previous step">Back</a><div class="spacer"></div><a href="#" id="next-step" title="Next step">Next</a><a href="' +
                hc(mc(a)) +
                '" id="done" hidden title="Codelab complete">Done</a></div></div></div>'
        );
    }
    function tc(a) {
        return R('<h1 class="title">' + gc(a.title) + "</h1>");
    }
    function uc(a) {
        a = a.time;
        return R('<div id="time-remaining" title="Time remaining"><i class="material-icons">access_time</i>' + (1 == a ? gc(a) + " min remaining" : gc(a) + " mins remaining") + "</div>");
    }
    function vc(a) {
        var b = a.ma;
        a = a.fa;
        for (var c = '<div class="steps"><ol>', d = b.length, e = 0; e < d; e++) {
            var f = b[e];
            c += '<li><a href="#' + hc(e) + '"><span class="step"><span>' + gc(f) + "</span></span></a></li>";
        }
        c += "</ol></div>" + (a ? '<div class="metadata"><a target="_blank" href="' + hc(mc(a)) + '"><i class="material-icons">bug_report</i> Report a mistake</a></div>' : "");
        return R(c);
    }
    function S() {
        r.call(this);
        this.b = new E(this);
        this.f = this;
    }
    q(S, r);
    S.prototype[D] = !0;
    S.prototype.removeEventListener = function (a, b, c, d) {
        pb(this, a, b, c, d);
    };
    function wc(a, b, c, d) {
        b = a.b.a[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.C && g.capture == c) {
                var k = g.listener,
                    x = g.M || g.src;
                g.H && eb(a.b, g);
                e = !1 !== k.call(x, d) && e;
            }
        }
        return e && 0 != d.aa;
    }
    function T(a, b) {
        var c = b.type || b;
        if (l(b)) b = new B(b, a);
        else if (b instanceof B) b.target = b.target || a;
        else {
            var d = b;
            b = new B(c, a);
            Ja(b, d);
        }
        b.f || ((a = b.a = a), wc(a, c, !0, b), b.f || wc(a, c, !1, b));
    }
    function xc(a, b, c) {
        if ("function" == ja(a)) c && (a = p(a, c));
        else if (a && "function" == typeof a.handleEvent) a = p(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : h.setTimeout(a, b || 0);
    }
    function yc() {
        S.call(this);
        this.K = zc;
    }
    q(yc, S);
    var zc = 0;
    var Ac = yb(function () {
        var a = document.createElement("div");
        a.innerHTML = "<div><div></div></div>";
        var b = a.firstChild.firstChild;
        a.innerHTML = "";
        return !b.parentElement;
    });
    function Bc(a, b) {
        if (Ac()) for (; a.lastChild; ) a.removeChild(a.lastChild);
        a.innerHTML = b;
    }
    function Cc(a, b) {
        for (; a && 1 != a.nodeType; ) a = b ? a.nextSibling : a.previousSibling;
        return a;
    }
    function Dc() {
        this.a = h.document || document;
    }
    function U(a, b, c) {
        if (l(b)) (b = Ec(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d],
                    f = Ec(c, d);
                f && (c.style[f] = e);
            }
    }
    var Fc = {};
    function Ec(a, b) {
        var c = Fc[b];
        if (!c) {
            var d = Da(b);
            c = d;
            void 0 === a.style[d] && ((d = (z ? "Webkit" : w ? "Moz" : v ? "ms" : Na ? "O" : null) + Ea(d)), void 0 !== a.style[d] && (c = d));
            Fc[b] = c;
        }
        return c;
    }
    function Gc(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        c = z && !b && !c;
        if ((void 0 === b || c) && a.getBoundingClientRect)
            a: {
                try {
                    var d = a.getBoundingClientRect();
                } catch (e) {
                    break a;
                }
                v && a.ownerDocument.body && ((a = a.ownerDocument), (d.left -= a.documentElement.clientLeft + a.body.clientLeft), (d.top -= a.documentElement.clientTop + a.body.clientTop));
            }
    }
    function Hc(a, b) {
        m(b) || (b = [b]);
        b = ta(b, function (a) {
            return l(a) ? a : a.ka + " " + a.duration + "s " + a.timing + " " + a.ea + "s";
        });
        U(a, "transition", b.join(","));
    }
    var Ic = yb(function () {
        if (v) return Ta("10.0");
        var a = document.createElement("DIV");
        var b = z ? "-webkit" : w ? "-moz" : v ? "-ms" : Na ? "-o" : null,
            c = { transition: "opacity 1s linear" };
        b && (c[b + "-transition"] = "opacity 1s linear");
        b = { style: c };
        if (!Xb.test("div")) throw Error("Invalid tag name <div>.");
        if ("DIV" in Zb) throw Error("Tag name <div> is not allowed for SafeHtml.");
        c = null;
        var d = "";
        if (b)
            for (y in b) {
                if (!Xb.test(y)) throw Error('Invalid attribute name "' + y + '".');
                var e = b[y];
                if (null != e) {
                    var f = y;
                    var g = e;
                    if (g instanceof J) g = Eb(g);
                    else if ("style" == f.toLowerCase()) {
                        e = void 0;
                        if (!n(g)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof g + " given: " + g);
                        if (!(g instanceof M)) {
                            var k = "";
                            for (e in g) {
                                if (!/^[-_a-zA-Z0-9]+$/.test(e)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + e);
                                var x = g[e];
                                null != x && ((x = m(x) ? ta(x, Pb).join(" ") : Pb(x)), (k += e + ":" + x + ";"));
                            }
                            g = k ? Nb(k) : Ob;
                        }
                        g = g instanceof M && g.constructor === M && g.b === Mb ? g.a : "type_error:SafeStyle";
                    } else {
                        if (/^on/i.test(f)) throw Error('Attribute "' + f + '" requires goog.string.Const value, "' + g + '" given.');
                        if (f.toLowerCase() in Yb)
                            if (g instanceof K) g = Gb(g);
                            else if (g instanceof L) g = Ib(g);
                            else if (l(g)) g = Kb(g).j();
                            else throw Error('Attribute "' + f + '" on tag "div" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + g + '" given.');
                    }
                    g.o && (g = g.j());
                    f = f + '="' + t(String(g)) + '"';
                    d += " " + f;
                }
            }
        var y = "<div" + d;
        d = void 0;
        null != d ? m(d) || (d = [d]) : (d = []);
        !0 === Cb.div ? (y += ">") : ((c = $b(d)), (y += ">" + O(c) + "</div>"), (c = c.v()));
        (b = b && b.dir) && (/^(ltr|rtl|auto)$/i.test(b) ? (c = 0) : (c = null));
        b = P(y, c);
        Bc(a, O(b));
        a = a.firstChild;
        b = a.style[Da("transition")];
        return "" != ("undefined" !== typeof b ? b : a.style[Ec(a, "transition")] || "");
    });
    function V(a, b, c, d, e) {
        yc.call(this);
        this.a = a;
        this.ha = b;
        this.ia = c;
        this.X = d;
        this.la = m(e) ? e : [e];
    }
    q(V, yc);
    function Jc(a) {
        1 != a.K && (T(a.f, "begin"), T(a.f, "play"), oa(), (a.K = 1), Ic() ? (U(a.a, a.ia), (a.Y = xc(a.ja, void 0, a))) : a.P(!1));
    }
    V.prototype.ja = function () {
        var a = this.a;
        b: {
            var b = 9 == a.nodeType ? a : a.ownerDocument || a.document;
            if (b.defaultView && b.defaultView.getComputedStyle && (b = b.defaultView.getComputedStyle(a, null))) {
                b = b.display || b.getPropertyValue("display") || "";
                break b;
            }
            b = "";
        }
        if ("none" != (b || (a.currentStyle ? a.currentStyle.display : null) || (a.style && a.style.display))) Gc(a);
        else {
            b = a.style;
            var c = b.display,
                d = b.visibility,
                e = b.position;
            b.visibility = "hidden";
            b.position = "absolute";
            b.display = "inline";
            Gc(a);
            b.display = c;
            b.position = e;
            b.visibility = d;
        }
        Hc(this.a, this.la);
        U(this.a, this.X);
        this.Y = xc(p(this.P, this, !1), 1e3 * this.ha);
    };
    function Kc(a) {
        1 == a.K && a.P(!0);
    }
    V.prototype.P = function (a) {
        U(this.a, "transition", "");
        h.clearTimeout(this.Y);
        U(this.a, this.X);
        oa();
        this.K = zc;
        a ? T(this.f, "stop") : T(this.f, "finish");
        T(this.f, "end");
    };
    function Lc(a, b, c) {
        Bc(a, Mc(b(c || Nc, void 0, void 0)));
    }
    function Oc(a, b) {
        b = a(b || Nc, void 0, void 0);
        a = (qa || (qa = new Dc())).a.createElement("DIV");
        b = Mc(b);
        Bc(a, b);
        1 == a.childNodes.length && ((b = a.firstChild), 1 == b.nodeType && (a = b));
        return a;
    }
    function Mc(a) {
        if (a instanceof Q) {
            if (a.u === ac) return a.L;
            if (a.u === dc) return t(a.L);
        }
        return "zSoyz";
    }
    var Nc = {}; /*

 Copyright 2018 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
    function W() {
        var a = HTMLElement.call(this) || this;
        a.g = null;
        a.ba = null;
        a.N = null;
        a.l = null;
        a.A = null;
        a.B = null;
        a.I = null;
        a.J = null;
        a.w = "";
        a.s = "";
        a.c = [];
        a.h = -1;
        a.i = new G();
        a.O = new G();
        a.W = !1;
        a.Z = !1;
        a.F = null;
        a.G = null;
        a.$ = !1;
        a.m = new Bb();
        return a;
    }
    var X = HTMLElement;
    W.prototype = ba(X.prototype);
    W.prototype.constructor = W;
    if (ha) ha(W, X);
    else
        for (var Y in X)
            if ("prototype" != Y)
                if (Object.defineProperties) {
                    var Pc = Object.getOwnPropertyDescriptor(X, Y);
                    Pc && Object.defineProperty(W, Y, Pc);
                } else W[Y] = X[Y];
    W.U = X.prototype;
    W.prototype.connectedCallback = function () {
        this.W || Qc(this);
        Rc(this);
        Sc(this);
        Tc(this);
        Uc(this);
        Vc(this);
        this.$ && console.log("resumed");
        this.Z || ((this.Z = !0), Wc(this));
    };
    W.prototype.connectedCallback = W.prototype.connectedCallback;
    W.prototype.disconnectedCallback = function () {
        xb(this.i);
        xb(this.O);
    };
    W.prototype.disconnectedCallback = W.prototype.disconnectedCallback;
    W.prototype.attributeChangedCallback = function (a) {
        switch (a) {
            case "title":
                this.hasAttribute("title") && ((this.s = this.getAttribute("title")), this.removeAttribute("title"), this.setAttribute("codelab-title", this.s));
                break;
            case "codelab-title":
                this.s = this.getAttribute("codelab-title");
                Tc(this);
                break;
            case "selected":
                Sc(this);
                break;
            case "no-toolbar":
                Vc(this);
                break;
            case "no-arrows":
                Uc(this);
        }
    };
    W.prototype.attributeChangedCallback = W.prototype.attributeChangedCallback;
    W.prototype.S = function () {
        this.setAttribute("selected", this.h + 1);
    };
    W.prototype.selectNext = W.prototype.S;
    W.prototype.T = function () {
        this.setAttribute("selected", this.h - 1);
    };
    W.prototype.selectPrevious = W.prototype.T;
    W.prototype.select = function (a) {
        this.setAttribute("selected", a);
    };
    W.prototype.select = W.prototype.select;
    function Rc(a) {
        a.B &&
            H(a.i, a.B, "click", function (b) {
                b.preventDefault();
                b.stopPropagation();
                a.T();
            });
        a.A &&
            H(a.i, a.A, "click", function (b) {
                b.preventDefault();
                b.stopPropagation();
                a.S();
            });
        a.g &&
            (H(a.i, a.g, "click", function (b) {
                for (var c = b.target; c !== a.g && "A" !== c.tagName.toUpperCase(); ) b.preventDefault(), b.stopPropagation(), (c = c.parentNode);
                c !== a.g && ((b = new URL(c.getAttribute("href"), document.location.origin).hash.substring(1)), a.setAttribute("selected", b));
            }),
            H(a.i, a.g, "keydown", function (b) {
                if (a.g) {
                    var c = a.g.querySelector(":focus"),
                        e;
                    c ? (e = c.parentNode) : (e = a.g.querySelector("[selected]"));
                    if (e) {
                        var f;
                        38 == b.D ? (f = void 0 !== e.previousElementSibling ? e.previousElementSibling : Cc(e.previousSibling, !1)) : 40 == b.D && (f = void 0 !== e.nextElementSibling ? e.nextElementSibling : Cc(e.nextSibling, !0));
                        f && (b = f.querySelector("a")) && b.focus();
                    }
                }
            }));
        if (a.l) {
            var b = a.l.querySelector("#menu");
            b &&
                (H(a.i, b, "click", function (b) {
                    b.preventDefault();
                    b.stopPropagation();
                    a.hasAttribute("drawer--open") ? a.removeAttribute("drawer--open") : a.setAttribute("drawer--open", "");
                }),
                H(a.i, a.querySelector("#main"), "click", function () {
                    a.hasAttribute("drawer--open") && a.removeAttribute("drawer--open");
                }));
        }
        H(a.i, window, "popstate", function () {
            document.location.hash && (a.setAttribute("dsh", ""), a.setAttribute("selected", document.location.hash.substring(1)), a.removeAttribute("dsh"));
        });
        H(a.i, document.body, "keydown", function (b) {
            37 == b.D ? (document.activeElement && document.activeElement.blur(), a.T()) : 39 == b.D && (document.activeElement && document.activeElement.blur(), a.S());
        });
    }
    function Vc(a) {
        a.l && (a.hasAttribute("no-toolbar") ? a.l.setAttribute("hidden", "") : a.l.removeAttribute("hidden"));
    }
    function Uc(a) {
        a.I && (a.hasAttribute("no-arrows") ? a.I.setAttribute("hidden", "") : a.I.removeAttribute("hidden"));
    }
    W.prototype.ca = function (a, b) {
        (void 0 === b ? 0 : b) ? window.history.replaceState({ path: a }, document.title, a) : window.history.pushState({ path: a }, document.title, a);
    };
    W.prototype.updateHistoryState = W.prototype.ca;
    function Tc(a) {
        if (a.s && a.l) {
            var b = Oc(tc, { title: a.s });
            document.title = a.s;
            var c = a.l.querySelector("h1");
            a = a.l.querySelector("#codelab-nav-buttons");
            c ? (a = c.parentNode) && a.replaceChild(b, c) : a.parentNode && a.parentNode.insertBefore(b, a.nextSibling);
        }
    }
    function Xc(a) {
        if (a.N) {
            for (var b = 0, c = a.h; c < a.c.length; c++) {
                var d = parseInt(a.c[c].getAttribute("duration"), 10);
                d && (b += d);
            }
            b = Oc(uc, { time: b });
            (c = a.N.querySelector("#time-remaining")) ? (a = c.parentNode) && a.replaceChild(b, c) : a.N.appendChild(b);
        }
    }
    function Yc(a) {
        parseInt(a.getAttribute("selected"), 0) === a.c.length - 1 && a.w && Z(a, "google-codelab-completed", { "codelab-id": a.w });
    }
    function Zc(a) {
        a.c.forEach(function (a, c) {
            a.setAttribute("step", c + 1);
        });
    }
    function Sc(a) {
        var b = 0;
        if (a.hasAttribute("selected")) {
            if (((b = parseInt(a.getAttribute("selected"), 0)), (b = Math.min(Math.max(0, parseInt(b, 10)), a.c.length - 1)), Yc(a), a.h !== b && !isNaN(b))) {
                var c = a.c[b].querySelector(".step-title");
                Z(a, "google-codelab-pageview", { page: location.pathname + "#" + b, title: (c ? c.textContent : "").replace(new RegExp(b + 1 + ".", "g"), "").trim() });
                if (-1 === a.h) a.c[b].setAttribute("selected", "");
                else {
                    a.F && Kc(a.F);
                    a.G && Kc(a.G);
                    xb(a.O);
                    c = {};
                    var d = {},
                        e = a.c[b],
                        f = a.c[a.h];
                    e.setAttribute("animating", "");
                    a.h < b ? ((c.transform = "translate3d(110%, 0, 0)"), (d.transform = "translate3d(-110%, 0, 0)")) : ((c.transform = "translate3d(-110%, 0, 0)"), (d.transform = "translate3d(110%, 0, 0)"));
                    var g = [{ ka: "transform", duration: 0.5, ea: 0, timing: "cubic-bezier(0.4, 0, 0.2, 1)" }];
                    a.F = new V(e, 0.5, c, { transform: "translate3d(0, 0, 0)" }, g);
                    a.G = new V(f, 0.5, { transform: "translate3d(0, 0, 0)" }, d, g);
                    Jc(a.F);
                    Jc(a.G);
                    vb(a.O, a.F, function () {
                        e.setAttribute("selected", "");
                        e.removeAttribute("animating");
                    });
                    vb(a.O, a.G, function () {
                        f.removeAttribute("selected");
                    });
                }
                a.h = b;
                a.A &&
                    a.B &&
                    a.J &&
                    (0 === b ? a.B.setAttribute("disappear", "") : a.B.removeAttribute("disappear"),
                    b === a.c.length - 1
                        ? (a.A.setAttribute("hidden", ""), a.J.removeAttribute("hidden"), Z(a, "google-codelab-action", { category: "codelab", action: "complete", label: a.s }))
                        : (a.A.removeAttribute("hidden"), a.J.setAttribute("hidden", "")));
                a.g &&
                    a.g.querySelectorAll("li").forEach(function (a, c) {
                        c <= b ? a.setAttribute("completed", "") : a.removeAttribute("completed");
                        c === b ? a.setAttribute("selected", "") : a.removeAttribute("selected");
                    });
                Xc(a);
                a.hasAttribute("dsh") || a.ca("#" + b, !0);
                a.w && a.m.set("progress_" + a.w, String(a.h));
            }
        } else a.setAttribute("selected", b);
    }
    function $c(a) {
        var b = a.getAttribute("feedback-link"),
            c = a.c.map(function (a) {
                return a.getAttribute("label");
            });
        Lc(a.g, vc, { ma: c, fa: b });
    }
    function ad(a) {
        if ((a = a.getAttribute("home-url")) && "" !== a.trim()) return a;
        a = new URL(document.location.toString()).searchParams.get("index");
        if (!a) return "/";
        a = a.replace(/[^a-z0-9\-]+/gi, "");
        if (!a || "" === a.trim()) return "/";
        "index" === a && (a = "");
        return new URL(a, document.location.origin).pathname;
    }
    function Z(a, b, c) {
        c = void 0 === c ? {} : c;
        b = new CustomEvent(b, { detail: c, bubbles: !0 });
        a.dispatchEvent(b);
    }
    function Wc(a) {
        Z(a, "google-codelab-pageview", { page: location.pathname + "#" + a.h, title: a.c[a.h].getAttribute("label") });
        window.requestAnimationFrame(function () {
            document.body.removeAttribute("unresolved");
            Z(a, "google-codelab-action", { category: "codelab", action: "ready" });
        });
    }
    function Qc(a) {
        a.c = Array.from(a.querySelectorAll("google-codelab-step"));
        Lc(a, sc, { ga: ad(a) });
        a.g = a.querySelector("#drawer");
        a.l = a.querySelector("#codelab-title");
        a.N = a.querySelector("#codelab-time-container");
        a.ba = a.querySelector("#steps");
        a.I = a.querySelector("#controls");
        a.B = a.querySelector("#controls #previous-step");
        a.A = a.querySelector("#controls #next-step");
        a.J = a.querySelector("#controls #done");
        a.c.forEach(function (b) {
            a.ba.appendChild(b);
        });
        Zc(a);
        $c(a);
        if (document.location.hash) {
            var b = parseInt(document.location.hash.substring(1), 10);
            !isNaN(b) && b && a.setAttribute("selected", document.location.hash.substring(1));
        }
        a.w = a.getAttribute("id");
        (b = a.m.get("progress_" + a.w)) && "0" !== b && ((a.$ = !0), a.setAttribute("selected", b));
        a.W = !0;
    }
    aa.Object.defineProperties(W, {
        observedAttributes: {
            configurable: !0,
            enumerable: !0,
            get: function () {
                return "title codelab-title environment category feedback-link selected last-updated no-toolbar no-arrows".split(" ");
            },
        },
    });
    try {
        window.customElements.define("google-codelab", W);
    } catch (a) {
        console.warn("googlecodelabs.Codelab", a);
    }
}.call(this));
