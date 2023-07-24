document.write('<script src="./web.json?r=' + Math.random() + '"></script>')
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function () {
    "use strict";

    function t(t) {
        return t && "[object Function]" === ({}).toString.call(t)
    }

    function e(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function n(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function o(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var s = e(t), r = s.overflow, a = s.overflowX, l = s.overflowY;
        return /(auto|scroll|overlay)/.test(r + l + a) ? t : o(n(t))
    }

    function s(t) {
        return t && t.referenceNode ? t.referenceNode : t
    }

    function r(t) {
        return 11 === t ? F : 10 === t ? j : F || j
    }

    function a(t) {
        if (!t) return document.documentElement;
        for (var n = r(10) ? document.body : null, o = t.offsetParent || null; o === n && t.nextElementSibling;) o = (t = t.nextElementSibling).offsetParent;
        var s = o && o.nodeName;
        return s && "BODY" !== s && "HTML" !== s ? -1 !== ["TH", "TD", "TABLE"].indexOf(o.nodeName) && "static" === e(o, "position") ? a(o) : o : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function l(t) {
        return null === t.parentNode ? t : l(t.parentNode)
    }

    function f(t, e) {
        if (!t || !t.nodeType || !e || !e.nodeType) return document.documentElement;
        var n, o, s = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING, r = s ? t : e, h = s ? e : t,
            c = document.createRange();
        c.setStart(r, 0), c.setEnd(h, 0);
        var d = c.commonAncestorContainer;
        if (t !== d && e !== d || r.contains(h)) return "BODY" !== (o = (n = d).nodeName) && ("HTML" === o || a(n.firstElementChild) === n) ? d : a(d);
        var p = l(t);
        return p.host ? f(p.host, e) : f(t, l(e).host)
    }

    function h(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === e ? "scrollTop" : "scrollLeft", o = t.nodeName;
        if ("BODY" === o || "HTML" === o) {
            var s = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || s)[n]
        }
        return t[n]
    }

    function c(t, e) {
        var n = "x" === e ? "Left" : "Top";
        return parseFloat(t["border" + n + "Width"]) + parseFloat(t["border" + ("Left" == n ? "Right" : "Bottom") + "Width"])
    }

    function d(t, e, n, o) {
        return M(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], r(10) ? parseInt(n["offset" + t]) + parseInt(o["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(o["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function p(t) {
        var e = t.body, n = t.documentElement, o = r(10) && getComputedStyle(n);
        return { height: d("Height", e, n, o), width: d("Width", e, n, o) }
    }

    function u(t) {
        return X({}, t, { right: t.left + t.width, bottom: t.top + t.height })
    }

    function m(t) {
        var n = {};
        try {
            if (r(10)) {
                n = t.getBoundingClientRect();
                var o = h(t, "top"), s = h(t, "left");
                n.top += o, n.left += s, n.bottom += o, n.right += s
            } else n = t.getBoundingClientRect()
        } catch (a) {
        }
        var l = { left: n.left, top: n.top, width: n.right - n.left, height: n.bottom - n.top },
            f = "HTML" === t.nodeName ? p(t.ownerDocument) : {}, d = f.width || t.clientWidth || l.width,
            m = f.height || t.clientHeight || l.height, g = t.offsetWidth - d, v = t.offsetHeight - m;
        if (g || v) {
            var b = e(t);
            g -= c(b, "x"), v -= c(b, "y"), l.width -= g, l.height -= v
        }
        return u(l)
    }

    function g(t, n) {
        var s = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], a = r(10), l = "HTML" === n.nodeName,
            f = m(t), c = m(n), d = o(t), p = e(n), g = parseFloat(p.borderTopWidth), v = parseFloat(p.borderLeftWidth);
        s && l && (c.top = M(c.top, 0), c.left = M(c.left, 0));
        var b = u({ top: f.top - c.top - g, left: f.left - c.left - v, width: f.width, height: f.height });
        if (b.marginTop = 0, b.marginLeft = 0, !a && l) {
            var y = parseFloat(p.marginTop), w = parseFloat(p.marginLeft);
            b.top -= g - y, b.bottom -= g - y, b.left -= v - w, b.right -= v - w, b.marginTop = y, b.marginLeft = w
        }
        return (a && !s ? n.contains(d) : n === d && "BODY" !== d.nodeName) && (b = function t(e, n) {
            var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], s = h(n, "top"), r = h(n, "left"),
                a = o ? -1 : 1;
            return e.top += s * a, e.bottom += s * a, e.left += r * a, e.right += r * a, e
        }(b, n)), b
    }

    function v(t) {
        if (!t || !t.parentElement || r()) return document.documentElement;
        for (var n = t.parentElement; n && "none" === e(n, "transform");) n = n.parentElement;
        return n || document.documentElement
    }

    function b(t, r, a, l) {
        var c = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], d = { top: 0, left: 0 },
            m = c ? v(t) : f(t, s(r));
        if ("viewport" === l) d = function t(e) {
            var n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                o = e.ownerDocument.documentElement, s = g(e, o), r = M(o.clientWidth, window.innerWidth || 0),
                a = M(o.clientHeight, window.innerHeight || 0), l = n ? 0 : h(o), f = n ? 0 : h(o, "left");
            return u({ top: l - s.top + s.marginTop, left: f - s.left + s.marginLeft, width: r, height: a })
        }(m, c); else {
            "scrollParent" === l ? "BODY" === (b = o(n(r))).nodeName && (b = t.ownerDocument.documentElement) : b = "window" === l ? t.ownerDocument.documentElement : l;
            var b, y = g(b, m, c);
            if ("HTML" === b.nodeName && !function t(o) {
                var s = o.nodeName;
                if ("BODY" === s || "HTML" === s) return !1;
                if ("fixed" === e(o, "position")) return !0;
                var r = n(o);
                return !!r && t(r)
            }(m)) {
                var w = p(t.ownerDocument), _ = w.height, x = w.width;
                d.top += y.top - y.marginTop, d.bottom = _ + y.top, d.left += y.left - y.marginLeft, d.right = x + y.left
            } else d = y
        }
        var C = "number" == typeof (a = a || 0);
        return d.left += C ? a : a.left || 0, d.top += C ? a : a.top || 0, d.right -= C ? a : a.right || 0, d.bottom -= C ? a : a.bottom || 0, d
    }

    function y(t, e, n, o, s) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var a = b(n, o, r, s), l = {
            top: { width: a.width, height: e.top - a.top },
            right: { width: a.right - e.right, height: a.height },
            bottom: { width: a.width, height: a.bottom - e.bottom },
            left: { width: e.left - a.left, height: a.height }
        }, f = Object.keys(l).map(function (t) {
            var e, n;
            return X({ key: t }, l[t], { area: (n = (e = l[t]).width) * e.height })
        }).sort(function (t, e) {
            return e.area - t.area
        }), h = f.filter(function (t) {
            var e = t.width, o = t.height;
            return e >= n.clientWidth && o >= n.clientHeight
        }), c = 0 < h.length ? h[0].key : f[0].key, d = t.split("-")[1];
        return c + (d ? "-" + d : "")
    }

    function w(t, e, n) {
        var o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, r = o ? v(e) : f(e, s(n));
        return g(n, r, o)
    }

    function _(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            o = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return { width: t.offsetWidth + o, height: t.offsetHeight + n }
    }

    function x(t) {
        var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
        return t.replace(/left|right|bottom|top/g, function (t) {
            return e[t]
        })
    }

    function C(t, e, n) {
        n = n.split("-")[0];
        var o = _(t), s = { width: o.width, height: o.height }, r = -1 !== ["right", "left"].indexOf(n),
            a = r ? "top" : "left", l = r ? "left" : "top", f = r ? "height" : "width";
        return s[a] = e[a] + e[f] / 2 - o[f] / 2, s[l] = n === l ? e[l] - o[r ? "width" : "height"] : e[x(l)], s
    }

    function A(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function k(e, n, o) {
        return (void 0 === o ? e : e.slice(0, function t(e, n, o) {
            if (Array.prototype.findIndex) return e.findIndex(function (t) {
                return t[n] === o
            });
            var s = A(e, function (t) {
                return t[n] === o
            });
            return e.indexOf(s)
        }(e, "name", o))).forEach(function (e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var o = e.function || e.fn;
            e.enabled && t(o) && (n.offsets.popper = u(n.offsets.popper), n.offsets.reference = u(n.offsets.reference), n = o(n, e))
        }), n
    }

    function S() {
        if (!this.state.isDestroyed) {
            var t = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
            t.offsets.reference = w(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = y(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = C(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = k(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
        }
    }

    function E(t, e) {
        return t.some(function (t) {
            var n = t.name;
            return t.enabled && n === e
        })
    }

    function L(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), o = 0; o < e.length; o++) {
            var s = e[o], r = s ? "" + s + n : t;
            if (void 0 !== document.body.style[r]) return r
        }
        return null
    }

    function B() {
        return this.state.isDestroyed = !0, E(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[L("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function z(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function O() {
        var t, e, n, s, r;
        this.state.eventsEnabled || (this.state = (t = this.reference, this.options, n = this.state, s = this.scheduleUpdate, n.updateBound = s, z(t).addEventListener("resize", n.updateBound, { passive: !0 }), function t(e, n, s, r) {
            var a = "BODY" === e.nodeName, l = a ? e.ownerDocument.defaultView : e;
            l.addEventListener(n, s, { passive: !0 }), a || t(o(l.parentNode), n, s, r), r.push(l)
        }(r = o(t), "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n))
    }

    function H() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, z(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function D(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function T(t, e) {
        Object.keys(e).forEach(function (n) {
            var o = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && D(e[n]) && (o = "px"), t.style[n] = e[n] + o
        })
    }

    function I(t, e, n) {
        var o = A(t, function (t) {
            return t.name === e
        }), s = !!o && t.some(function (t) {
            return t.name === n && t.enabled && t.order < o.order
        });
        if (!s) {
            var r = "`" + e + "`";
            console.warn("`" + n + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
        }
        return s
    }

    function P(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], n = Z.indexOf(t),
            o = Z.slice(n + 1).concat(Z.slice(0, n));
        return e ? o.reverse() : o
    }

    var R = Math.min, W = Math.floor, N = Math.round, M = Math.max,
        U = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        Q = function () {
            for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1) if (U && 0 <= navigator.userAgent.indexOf(t[e])) return 1;
            return 0
        }(), V = U && window.Promise ? function (t) {
            var e = !1;
            return function () {
                e || (e = !0, window.Promise.resolve().then(function () {
                    e = !1, t()
                }))
            }
        } : function (t) {
            var e = !1;
            return function () {
                e || (e = !0, setTimeout(function () {
                    e = !1, t()
                }, Q))
            }
        }, F = U && !!(window.MSInputMethodContext && document.documentMode), j = U && /MSIE 10/.test(navigator.userAgent),
        Y = function (t, e) {
            if (!(t instanceof e)) throw TypeError("Cannot call a class as a function")
        }, G = function () {
            function t(t, e) {
                for (var n, o = 0; o < e.length; o++) (n = e[o]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), q = function (t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        }, X = Object.assign || function (t) {
            for (var e, n = 1; n < arguments.length; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        }, J = U && /Firefox/i.test(navigator.userAgent),
        K = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Z = K.slice(3), tt = { FLIP: "flip", CLOCKWISE: "clockwise", COUNTERCLOCKWISE: "counterclockwise" },
        te = function () {
            function e(n, o) {
                var s = this, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                Y(this, e), this.scheduleUpdate = function () {
                    return requestAnimationFrame(s.update)
                }, this.update = V(this.update.bind(this)), this.options = X({}, e.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = n && n.jquery ? n[0] : n, this.popper = o && o.jquery ? o[0] : o, this.options.modifiers = {}, Object.keys(X({}, e.Defaults.modifiers, r.modifiers)).forEach(function (t) {
                    s.options.modifiers[t] = X({}, e.Defaults.modifiers[t] || {}, r.modifiers ? r.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
                    return X({ name: t }, s.options.modifiers[t])
                }).sort(function (t, e) {
                    return t.order - e.order
                }), this.modifiers.forEach(function (e) {
                    e.enabled && t(e.onLoad) && e.onLoad(s.reference, s.popper, s.options, e, s.state)
                }), this.update();
                var a = this.options.eventsEnabled;
                a && this.enableEventListeners(), this.state.eventsEnabled = a
            }

            return G(e, [{
                key: "update", value: function () {
                    return S.call(this)
                }
            }, {
                key: "destroy", value: function () {
                    return B.call(this)
                }
            }, {
                key: "enableEventListeners", value: function () {
                    return O.call(this)
                }
            }, {
                key: "disableEventListeners", value: function () {
                    return H.call(this)
                }
            }]), e
        }();
    return te.Utils = ("undefined" == typeof window ? global : window).PopperUtils, te.placements = K, te.Defaults = {
        placement: "bottom", positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () {
        }, onUpdate: function () {
        }, modifiers: {
            shift: {
                order: 100, enabled: !0, fn: function (t) {
                    var e = t.placement, n = e.split("-")[0], o = e.split("-")[1];
                    if (o) {
                        var s = t.offsets, r = s.reference, a = s.popper, l = -1 !== ["bottom", "top"].indexOf(n),
                            f = l ? "left" : "top", h = l ? "width" : "height",
                            c = { start: q({}, f, r[f]), end: q({}, f, r[f] + r[h] - a[h]) };
                        t.offsets.popper = X({}, a, c[o])
                    }
                    return t
                }
            }, offset: {
                order: 200, enabled: !0, fn: function t(e, n) {
                    var o, s, r, a, l, f, h, c, d, p, m, g = n.offset, v = e.placement, b = e.offsets, y = b.popper,
                        w = b.reference, _ = v.split("-")[0];
                    return o = D(+g) ? [+g, 0] : (s = g, r = y, a = w, f = [0, 0], h = -1 !== ["right", "left"].indexOf(l = _), c[d = (c = s.split(/(\+|\-)/).map(function (t) {
                        return t.trim()
                    })).indexOf(A(c, function (t) {
                        return -1 !== t.search(/,|\s/)
                    }))] && -1 === c[d].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."), p = /\s*,\s*|\s+/, (m = (m = -1 === d ? [c] : [c.slice(0, d).concat([c[d].split(p)[0]]), [c[d].split(p)[1]].concat(c.slice(d + 1))]).map(function (t, e) {
                        var n = (1 === e ? !h : h) ? "height" : "width", o = !1;
                        return t.reduce(function (t, e) {
                            return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, o = !0, t) : o ? (t[t.length - 1] += e, o = !1, t) : t.concat(e)
                        }, []).map(function (t) {
                            var e, o, s, l, f, h, c, d, p;
                            return e = t, o = n, s = r, l = a, c = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), d = +c[1], p = c[2], d ? 0 === p.indexOf("%") ? u(f = "%p" === p ? s : l)[o] / 100 * d : "vh" === p || "vw" === p ? (h = "vh" === p ? M(document.documentElement.clientHeight, window.innerHeight || 0) : M(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * d : d : e
                        })
                    })).forEach(function (t, e) {
                        t.forEach(function (n, o) {
                            D(n) && (f[e] += n * ("-" === t[o - 1] ? -1 : 1))
                        })
                    }), f), "left" === _ ? (y.top += o[0], y.left -= o[1]) : "right" === _ ? (y.top += o[0], y.left += o[1]) : "top" === _ ? (y.left += o[0], y.top -= o[1]) : "bottom" === _ && (y.left += o[0], y.top += o[1]), e.popper = y, e
                }, offset: 0
            }, preventOverflow: {
                order: 300, enabled: !0, fn: function (t, e) {
                    var n = e.boundariesElement || a(t.instance.popper);
                    t.instance.reference === n && (n = a(n));
                    var o = L("transform"), s = t.instance.popper.style, r = s.top, l = s.left, f = s[o];
                    s.top = "", s.left = "", s[o] = "";
                    var h = b(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
                    s.top = r, s.left = l, s[o] = f, e.boundaries = h;
                    var c = e.priority, d = t.offsets.popper, p = {
                        primary: function (t) {
                            var n = d[t];
                            return d[t] < h[t] && !e.escapeWithReference && (n = M(d[t], h[t])), q({}, t, n)
                        }, secondary: function (t) {
                            var n = "right" === t ? "left" : "top", o = d[n];
                            return d[t] > h[t] && !e.escapeWithReference && (o = R(d[n], h[t] - ("right" === t ? d.width : d.height))), q({}, n, o)
                        }
                    };
                    return c.forEach(function (t) {
                        d = X({}, d, p[-1 === ["left", "top"].indexOf(t) ? "secondary" : "primary"](t))
                    }), t.offsets.popper = d, t
                }, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent"
            }, keepTogether: {
                order: 400, enabled: !0, fn: function (t) {
                    var e = t.offsets, n = e.popper, o = e.reference, s = t.placement.split("-")[0], r = W,
                        a = -1 !== ["top", "bottom"].indexOf(s), l = a ? "right" : "bottom", f = a ? "left" : "top";
                    return n[l] < r(o[f]) && (t.offsets.popper[f] = r(o[f]) - n[a ? "width" : "height"]), n[f] > r(o[l]) && (t.offsets.popper[f] = r(o[l])), t
                }
            }, arrow: {
                order: 500, enabled: !0, fn: function (t, n) {
                    if (!I(t.instance.modifiers, "arrow", "keepTogether")) return t;
                    var o, s = n.element;
                    if ("string" == typeof s) {
                        if (!(s = t.instance.popper.querySelector(s))) return t
                    } else if (!t.instance.popper.contains(s)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                    var r = t.placement.split("-")[0], a = t.offsets, l = a.popper, f = a.reference,
                        h = -1 !== ["left", "right"].indexOf(r), c = h ? "height" : "width", d = h ? "Top" : "Left",
                        p = d.toLowerCase(), m = h ? "bottom" : "right", g = _(s)[c];
                    f[m] - g < l[p] && (t.offsets.popper[p] -= l[p] - (f[m] - g)), f[p] + g > l[m] && (t.offsets.popper[p] += f[p] + g - l[m]), t.offsets.popper = u(t.offsets.popper);
                    var v = f[p] + f[c] / 2 - g / 2, b = e(t.instance.popper), y = parseFloat(b["margin" + d]),
                        w = parseFloat(b["border" + d + "Width"]), x = v - t.offsets.popper[p] - y - w;
                    return x = M(R(l[c] - g, x), 0), t.arrowElement = s, t.offsets.arrow = (q(o = {}, p, N(x)), q(o, h ? "left" : "top", ""), o), t
                }, element: "[x-arrow]"
            }, flip: {
                order: 600,
                enabled: !0,
                fn: function (t, e) {
                    if (E(t.instance.modifiers, "inner") || t.flipped && t.placement === t.originalPlacement) return t;
                    var n = b(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                        o = t.placement.split("-")[0], s = x(o), r = t.placement.split("-")[1] || "", a = [];
                    switch (e.behavior) {
                        case tt.FLIP:
                            a = [o, s];
                            break;
                        case tt.CLOCKWISE:
                            a = P(o);
                            break;
                        case tt.COUNTERCLOCKWISE:
                            a = P(o, !0);
                            break;
                        default:
                            a = e.behavior
                    }
                    return a.forEach(function (l, f) {
                        if (o !== l || a.length === f + 1) return t;
                        s = x(o = t.placement.split("-")[0]);
                        var h, c = t.offsets.popper, d = t.offsets.reference, p = W,
                            u = "left" === o && p(c.right) > p(d.left) || "right" === o && p(c.left) < p(d.right) || "top" === o && p(c.bottom) > p(d.top) || "bottom" === o && p(c.top) < p(d.bottom),
                            m = p(c.left) < p(n.left), g = p(c.right) > p(n.right), v = p(c.top) < p(n.top),
                            b = p(c.bottom) > p(n.bottom),
                            y = "left" === o && m || "right" === o && g || "top" === o && v || "bottom" === o && b,
                            w = -1 !== ["top", "bottom"].indexOf(o),
                            _ = !!e.flipVariations && (w && "start" === r && m || w && "end" === r && g || !w && "start" === r && v || !w && "end" === r && b),
                            A = !!e.flipVariationsByContent && (w && "start" === r && g || w && "end" === r && m || !w && "start" === r && b || !w && "end" === r && v),
                            S = _ || A;
                        (u || y || S) && (t.flipped = !0, (u || y) && (o = a[f + 1]), S && (r = "end" === (h = r) ? "start" : "start" === h ? "end" : h), t.placement = o + (r ? "-" + r : ""), t.offsets.popper = X({}, t.offsets.popper, C(t.instance.popper, t.offsets.reference, t.placement)), t = k(t.instance.modifiers, t, "flip"))
                    }), t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport",
                flipVariations: !1,
                flipVariationsByContent: !1
            }, inner: {
                order: 700, enabled: !1, fn: function (t) {
                    var e = t.placement, n = e.split("-")[0], o = t.offsets, s = o.popper, r = o.reference,
                        a = -1 !== ["left", "right"].indexOf(n), l = -1 === ["top", "left"].indexOf(n);
                    return s[a ? "left" : "top"] = r[n] - (l ? s[a ? "width" : "height"] : 0), t.placement = x(e), t.offsets.popper = u(s), t
                }
            }, hide: {
                order: 800, enabled: !0, fn: function (t) {
                    if (!I(t.instance.modifiers, "hide", "preventOverflow")) return t;
                    var e = t.offsets.reference, n = A(t.instance.modifiers, function (t) {
                        return "preventOverflow" === t.name
                    }).boundaries;
                    if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                        if (!0 === t.hide) return t;
                        t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === t.hide) return t;
                        t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                    }
                    return t
                }
            }, computeStyle: {
                order: 850, enabled: !0, fn: function (t, e) {
                    var n, o, s, r, l, f, h, c, d, p, u, g, v, b = e.x, y = e.y, w = t.offsets.popper,
                        _ = A(t.instance.modifiers, function (t) {
                            return "applyStyle" === t.name
                        }).gpuAcceleration;
                    void 0 !== _ && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var x, C, k = void 0 === _ ? e.gpuAcceleration : _, S = a(t.instance.popper), E = m(S),
                        B = { position: w.position },
                        z = (n = t, o = 2 > window.devicePixelRatio || !J, r = (s = n.offsets).popper, l = s.reference, f = N, h = function (t) {
                            return t
                        }, c = f(l.width), d = f(r.width), p = -1 !== ["left", "right"].indexOf(n.placement), u = -1 !== n.placement.indexOf("-"), g = o ? p || u || c % 2 == d % 2 ? f : W : h, v = o ? f : h, {
                            left: g(1 == c % 2 && 1 == d % 2 && !u && o ? r.left - 1 : r.left),
                            top: v(r.top),
                            bottom: v(r.bottom),
                            right: g(r.right)
                        }), O = "bottom" === b ? "top" : "bottom", H = "right" === y ? "left" : "right",
                        D = L("transform");
                    (C = "bottom" == O ? "HTML" === S.nodeName ? -S.clientHeight + z.bottom : -E.height + z.bottom : z.top, x = "right" == H ? "HTML" === S.nodeName ? -S.clientWidth + z.right : -E.width + z.right : z.left, k && D) ? (B[D] = "translate3d(" + x + "px, " + C + "px, 0)", B[O] = 0, B[H] = 0, B.willChange = "transform") : (B[O] = C * ("bottom" == O ? -1 : 1), B[H] = x * ("right" == H ? -1 : 1), B.willChange = O + ", " + H);
                    var T = { "x-placement": t.placement };
                    return t.attributes = X({}, T, t.attributes), t.styles = X({}, B, t.styles), t.arrowStyles = X({}, t.offsets.arrow, t.arrowStyles), t
                }, gpuAcceleration: !0, x: "bottom", y: "right"
            }, applyStyle: {
                order: 900, enabled: !0, fn: function (t) {
                    return T(t.instance.popper, t.styles), function t(e, n) {
                        Object.keys(n).forEach(function (t) {
                            !1 === n[t] ? e.removeAttribute(t) : e.setAttribute(t, n[t])
                        })
                    }(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && T(t.arrowElement, t.arrowStyles), t
                }, onLoad: function (t, e, n, o, s) {
                    var r = w(s, e, t, n.positionFixed),
                        a = y(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                    return e.setAttribute("x-placement", a), T(e, { position: n.positionFixed ? "fixed" : "absolute" }), n
                }, gpuAcceleration: void 0
            }
        }
    }, te
}), function (t, e, n) {
    "use strict";
    var o, s, r, a = t.document, l = t.Modernizr, f = function (t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, h = "Moz Webkit O Ms".split(" "), c = function (t) {
        var e, n = a.documentElement.style;
        if ("string" == typeof n[t]) return t;
        t = f(t);
        for (var o = 0, s = h.length; s > o; o++) if ("string" == typeof n[e = h[o] + t]) return e
    }, d = c("transform"), p = c("transitionProperty"), u = {
        csstransforms: function () {
            return !!d
        }, csstransforms3d: function () {
            var t = !!c("perspective");
            if (t) {
                var n = e("<style>@media (" + " -o- -moz- -ms- -webkit- -khtml- ".split(" ").join("transform-3d),(") + "modernizr){#modernizr{height:3px}}</style>").appendTo("head"),
                    o = e('<div id="modernizr" />').appendTo("html");
                t = 3 === o.height(), o.remove(), n.remove()
            }
            return t
        }, csstransitions: function () {
            return !!p
        }
    };
    if (l) for (o in u) l.hasOwnProperty(o) || l.addTest(o, u[o]); else {
        l = t.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" };
        var m, g = " ";
        for (o in u) m = u[o](), l[o] = m, g += " " + (m ? "" : "no-") + o;
        e("html").addClass(g)
    }
    if (l.csstransforms) {
        var v = l.csstransforms3d ? {
            translate: function (t) {
                return "translate3d(" + t[0] + "px, " + t[1] + "px, 0) "
            }, scale: function (t) {
                return "scale3d(" + t + ", " + t + ", 1) "
            }
        } : {
            translate: function (t) {
                return "translate(" + t[0] + "px, " + t[1] + "px) "
            }, scale: function (t) {
                return "scale(" + t + ") "
            }
        }, b = function (t, n, o) {
            var s, r, a = e.data(t, "isoTransform") || {}, l = {}, f = {};
            for (s in l[n] = o, e.extend(a, l), a) r = a[s], f[s] = v[s](r);
            var h = (f.translate || "") + (f.scale || "");
            e.data(t, "isoTransform", a), t.style[d] = h
        };
        e.cssNumber.scale = !0, e.cssHooks.scale = {
            set: function (t, e) {
                b(t, "scale", e)
            }, get: function (t, n) {
                var o = e.data(t, "isoTransform");
                return o && o.scale ? o.scale : 1
            }
        }, e.fx.step.scale = function (t) {
            e.cssHooks.scale.set(t.elem, t.now + t.unit)
        }, e.cssNumber.translate = !0, e.cssHooks.translate = {
            set: function (t, e) {
                b(t, "translate", e)
            }, get: function (t, n) {
                var o = e.data(t, "isoTransform");
                return o && o.translate ? o.translate : [0, 0]
            }
        }
    }
    l.csstransitions && (s = ({
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend"
    })[p], r = c("transitionDuration"));
    var y, w = e.event, _ = e.event.handle ? "handle" : "dispatch";
    w.special.smartresize = {
        setup: function () {
            e(this).bind("resize", w.special.smartresize.handler)
        }, teardown: function () {
            e(this).unbind("resize", w.special.smartresize.handler)
        }, handler: function (t, e) {
            var n = this, o = arguments;
            t.type = "smartresize", y && clearTimeout(y), y = setTimeout(function () {
                w[_].apply(n, o)
            }, "execAsap" === e ? 0 : 100)
        }
    }, e.fn.smartresize = function (t) {
        return t ? this.bind("smartresize", t) : this.trigger("smartresize", ["execAsap"])
    }, e.Isotope = function (t, n, o) {
        this.element = e(n), this._create(t), this._init(o)
    };
    var x = ["width", "height"], C = e(t);
    e.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: { opacity: 0, scale: .001 },
        visibleStyle: { opacity: 1, scale: 1 },
        containerStyle: { position: "relative", overflow: "hidden" },
        animationEngine: "best-available",
        animationOptions: { queue: !1, duration: 800 },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    }, e.Isotope.prototype = {
        _create: function (t) {
            this.options = e.extend({}, e.Isotope.settings, t), this.styleQueue = [], this.elemCount = 0;
            var n = this.element[0].style;
            this.originalStyle = {};
            var o = x.slice(0);
            for (var s in this.options.containerStyle) o.push(s);
            for (var r = 0, a = o.length; a > r; r++) s = o[r], this.originalStyle[s] = n[s] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms(), this.options.getSortData = e.extend(this.options.getSortData, {
                "original-order": function (t, e) {
                    return e.elemCount++, e.elemCount
                }, random: function () {
                    return Math.random()
                }
            }), this.reloadItems(), this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var l = this;
            setTimeout(function () {
                l.element.addClass(l.options.containerClass)
            }, 0), this.options.resizable && C.bind("smartresize.isotope", function () {
                l.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function () {
                return !1
            })
        }, _getAtoms: function (t) {
            var e = this.options.itemSelector, n = e ? t.filter(e).add(t.find(e)) : t, o = { position: "absolute" };
            return n = n.filter(function (t, e) {
                return 1 === e.nodeType
            }), this.usingTransforms && (o.left = 0, o.top = 0), n.css(o).addClass(this.options.itemClass), this.updateSortData(n, !0), n
        }, _init: function (t) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(t)
        }, option: function (t) {
            var n;
            if (e.isPlainObject(t)) for (var o in this.options = e.extend(!0, this.options, t), t) this[n = "_update" + f(o)] && this[n]()
        }, _updateAnimationEngine: function () {
            var t;
            switch (this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "")) {
                case "css":
                case "none":
                    t = !1;
                    break;
                case "jquery":
                    t = !0;
                    break;
                default:
                    t = !l.csstransitions
            }
            this.isUsingJQueryAnimation = t, this._updateUsingTransforms()
        }, _updateTransformsEnabled: function () {
            this._updateUsingTransforms()
        }, _updateUsingTransforms: function () {
            var t = this.usingTransforms = this.options.transformsEnabled && l.csstransforms && l.csstransitions && !this.isUsingJQueryAnimation;
            t || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = t ? this._translate : this._positionAbs
        }, _filter: function (t) {
            var e = "" === this.options.filter ? "*" : this.options.filter;
            if (!e) return t;
            var n = this.options.hiddenClass, o = "." + n, s = t.filter(o), r = s;
            if ("*" !== e) {
                r = s.filter(e);
                var a = t.not(o).not(e).addClass(n);
                this.styleQueue.push({ $el: a, style: this.options.hiddenStyle })
            }
            return this.styleQueue.push({ $el: r, style: this.options.visibleStyle }), r.removeClass(n), t.filter(e)
        }, updateSortData: function (t, n) {
            var o, s, r = this, a = this.options.getSortData;
            t.each(function () {
                for (var t in o = e(this), s = {}, a) s[t] = n || "original-order" !== t ? a[t](o, r) : e.data(this, "isotope-sort-data")[t];
                e.data(this, "isotope-sort-data", s)
            })
        }, _sort: function () {
            var t = this.options.sortBy, e = this._getSorter, n = this.options.sortAscending ? 1 : -1;
            this.$filteredAtoms.sort(function (o, s) {
                var r = e(o, t), a = e(s, t);
                return r === a && "original-order" !== t && (r = e(o, "original-order"), a = e(s, "original-order")), (r > a ? 1 : a > r ? -1 : 0) * n
            })
        }, _getSorter: function (t, n) {
            return e.data(t, "isotope-sort-data")[n]
        }, _translate: function (t, e) {
            return { translate: [t, e] }
        }, _positionAbs: function (t, e) {
            return { left: t, top: e }
        }, _pushPosition: function (t, e, n) {
            e = Math.round(e + this.offset.left), n = Math.round(n + this.offset.top);
            var o = this.getPositionStyles(e, n);
            this.styleQueue.push({
                $el: t,
                style: o
            }), this.options.itemPositionDataEnabled && t.data("isotope-item-position", { x: e, y: n })
        }, layout: function (t, e) {
            var n = this.options.layoutMode;
            if (this["_" + n + "Layout"](t), this.options.resizesContainer) {
                var o = this["_" + n + "GetContainerSize"]();
                this.styleQueue.push({ $el: this.element, style: o })
            }
            this._processStyleQueue(t, e), this.isLaidOut = !0
        }, _processStyleQueue: function (t, n) {
            var o, a, f, h, c = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css",
                d = this.options.animationOptions, p = this.options.onLayout;
            if (a = function (t, e) {
                e.$el[c](e.style, d)
            }, this._isInserting && this.isUsingJQueryAnimation) a = function (t, e) {
                o = e.$el.hasClass("no-transition") ? "css" : c, e.$el[o](e.style, d)
            }; else if (n || p || d.complete) {
                var u = !1, m = [n, p, d.complete], g = this;
                if (f = !0, h = function () {
                    if (!u) {
                        for (var e, n = 0, o = m.length; o > n; n++) "function" == typeof (e = m[n]) && e.call(g.element, t, g);
                        u = !0
                    }
                }, this.isUsingJQueryAnimation && "animate" === c) d.complete = h, f = !1; else if (l.csstransitions) {
                    for (var v, b = 0, y = this.styleQueue[0], w = y && y.$el; !w || !w.length;) {
                        if (!(v = this.styleQueue[b++])) return;
                        w = v.$el
                    }
                    parseFloat(getComputedStyle(w[0])[r]) > 0 && (a = function (t, e) {
                        e.$el[c](e.style, d).one(s, h)
                    }, f = !1)
                }
            }
            e.each(this.styleQueue, a), f && h(), this.styleQueue = []
        }, resize: function () {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        }, reLayout: function (t) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, t)
        }, addItems: function (t, e) {
            var n = this._getAtoms(t);
            this.$allAtoms = this.$allAtoms.add(n), e && e(n)
        }, insert: function (t, e) {
            this.element.append(t);
            var n = this;
            this.addItems(t, function (t) {
                var o = n._filter(t);
                n._addHideAppended(o), n._sort(), n.reLayout(), n._revealAppended(o, e)
            })
        }, appended: function (t, e) {
            var n = this;
            this.addItems(t, function (t) {
                n._addHideAppended(t), n.layout(t), n._revealAppended(t, e)
            })
        }, _addHideAppended: function (t) {
            this.$filteredAtoms = this.$filteredAtoms.add(t), t.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({
                $el: t,
                style: this.options.hiddenStyle
            })
        }, _revealAppended: function (t, e) {
            var n = this;
            setTimeout(function () {
                t.removeClass("no-transition"), n.styleQueue.push({
                    $el: t,
                    style: n.options.visibleStyle
                }), n._isInserting = !1, n._processStyleQueue(t, e)
            }, 10)
        }, reloadItems: function () {
            this.$allAtoms = this._getAtoms(this.element.children())
        }, remove: function (t, e) {
            this.$allAtoms = this.$allAtoms.not(t), this.$filteredAtoms = this.$filteredAtoms.not(t);
            var n = this, o = function () {
                t.remove(), e && e.call(n.element)
            };
            t.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
                $el: t,
                style: this.options.hiddenStyle
            }), this._sort(), this.reLayout(o)) : o()
        }, shuffle: function (t) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(t)
        }, destroy: function () {
            var t = this.usingTransforms, e = this.options;
            this.$allAtoms.removeClass(e.hiddenClass + " " + e.itemClass).each(function () {
                var e = this.style;
                e.position = "", e.top = "", e.left = "", e.opacity = "", t && (e[d] = "")
            });
            var n = this.element[0].style;
            for (var o in this.originalStyle) n[o] = this.originalStyle[o];
            this.element.unbind(".isotope").undelegate("." + e.hiddenClass, "click").removeClass(e.containerClass).removeData("isotope"), C.unbind(".isotope")
        }, _getSegments: function (t) {
            var e, n = this.options.layoutMode, o = t ? "rowHeight" : "columnWidth", s = t ? "height" : "width",
                r = t ? "rows" : "cols", a = this.element[s](),
                l = this.options[n] && this.options[n][o] || this.$filteredAtoms["outer" + f(s)](!0) || a;
            e = Math.max(e = Math.floor(a / l), 1), this[n][r] = e, this[n][o] = l
        }, _checkIfSegmentsChanged: function (t) {
            var e = this.options.layoutMode, n = t ? "rows" : "cols", o = this[e][n];
            return this._getSegments(t), this[e][n] !== o
        }, _masonryReset: function () {
            this.masonry = {}, this._getSegments();
            var t = this.masonry.cols;
            for (this.masonry.colYs = []; t--;) this.masonry.colYs.push(0)
        }, _masonryLayout: function (t) {
            var n = this, o = n.masonry;
            t.each(function () {
                var t = e(this), s = Math.ceil(t.outerWidth(!0) / o.columnWidth);
                if (1 === (s = Math.min(s, o.cols))) n._masonryPlaceBrick(t, o.colYs); else {
                    var r, a, l = o.cols + 1 - s, f = [];
                    for (a = 0; l > a; a++) r = o.colYs.slice(a, a + s), f[a] = Math.max.apply(Math, r);
                    n._masonryPlaceBrick(t, f)
                }
            })
        }, _masonryPlaceBrick: function (t, e) {
            for (var n = Math.min.apply(Math, e), o = 0, s = 0, r = e.length; r > s; s++) if (e[s] === n) {
                o = s;
                break
            }
            var a = this.masonry.columnWidth * o;
            this._pushPosition(t, a, n);
            var l = n + t.outerHeight(!0), f = this.masonry.cols + 1 - r;
            for (s = 0; f > s; s++) this.masonry.colYs[o + s] = l
        }, _masonryGetContainerSize: function () {
            return { height: Math.max.apply(Math, this.masonry.colYs) }
        }, _masonryResizeChanged: function () {
            return this._checkIfSegmentsChanged()
        }, _fitRowsReset: function () {
            this.fitRows = { x: 0, y: 0, height: 0 }
        }, _fitRowsLayout: function (t) {
            var n = this, o = this.element.width(), s = this.fitRows;
            t.each(function () {
                var t = e(this), r = t.outerWidth(!0), a = t.outerHeight(!0);
                0 !== s.x && r + s.x > o && (s.x = 0, s.y = s.height), n._pushPosition(t, s.x, s.y), s.height = Math.max(s.y + a, s.height), s.x += r
            })
        }, _fitRowsGetContainerSize: function () {
            return { height: this.fitRows.height }
        }, _fitRowsResizeChanged: function () {
            return !0
        }, _cellsByRowReset: function () {
            this.cellsByRow = { index: 0 }, this._getSegments(), this._getSegments(!0)
        }, _cellsByRowLayout: function (t) {
            var n = this, o = this.cellsByRow;
            t.each(function () {
                var t = e(this), s = o.index % o.cols, r = Math.floor(o.index / o.cols),
                    a = (s + .5) * o.columnWidth - t.outerWidth(!0) / 2,
                    l = (r + .5) * o.rowHeight - t.outerHeight(!0) / 2;
                n._pushPosition(t, a, l), o.index++
            })
        }, _cellsByRowGetContainerSize: function () {
            return { height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top }
        }, _cellsByRowResizeChanged: function () {
            return this._checkIfSegmentsChanged()
        }, _straightDownReset: function () {
            this.straightDown = { y: 0 }
        }, _straightDownLayout: function (t) {
            var n = this;
            t.each(function (t) {
                var o = e(this);
                n._pushPosition(o, 0, n.straightDown.y), n.straightDown.y += o.outerHeight(!0)
            })
        }, _straightDownGetContainerSize: function () {
            return { height: this.straightDown.y }
        }, _straightDownResizeChanged: function () {
            return !0
        }, _masonryHorizontalReset: function () {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var t = this.masonryHorizontal.rows;
            for (this.masonryHorizontal.rowXs = []; t--;) this.masonryHorizontal.rowXs.push(0)
        }, _masonryHorizontalLayout: function (t) {
            var n = this, o = n.masonryHorizontal;
            t.each(function () {
                var t = e(this), s = Math.ceil(t.outerHeight(!0) / o.rowHeight);
                if (1 === (s = Math.min(s, o.rows))) n._masonryHorizontalPlaceBrick(t, o.rowXs); else {
                    var r, a, l = o.rows + 1 - s, f = [];
                    for (a = 0; l > a; a++) r = o.rowXs.slice(a, a + s), f[a] = Math.max.apply(Math, r);
                    n._masonryHorizontalPlaceBrick(t, f)
                }
            })
        }, _masonryHorizontalPlaceBrick: function (t, e) {
            for (var n = Math.min.apply(Math, e), o = 0, s = 0, r = e.length; r > s; s++) if (e[s] === n) {
                o = s;
                break
            }
            var a = this.masonryHorizontal.rowHeight * o;
            this._pushPosition(t, n, a);
            var l = n + t.outerWidth(!0), f = this.masonryHorizontal.rows + 1 - r;
            for (s = 0; f > s; s++) this.masonryHorizontal.rowXs[o + s] = l
        }, _masonryHorizontalGetContainerSize: function () {
            return { width: Math.max.apply(Math, this.masonryHorizontal.rowXs) }
        }, _masonryHorizontalResizeChanged: function () {
            return this._checkIfSegmentsChanged(!0)
        }, _fitColumnsReset: function () {
            this.fitColumns = { x: 0, y: 0, width: 0 }
        }, _fitColumnsLayout: function (t) {
            var n = this, o = this.element.height(), s = this.fitColumns;
            t.each(function () {
                var t = e(this), r = t.outerWidth(!0), a = t.outerHeight(!0);
                0 !== s.y && a + s.y > o && (s.x = s.width, s.y = 0), n._pushPosition(t, s.x, s.y), s.width = Math.max(s.x + r, s.width), s.y += a
            })
        }, _fitColumnsGetContainerSize: function () {
            return { width: this.fitColumns.width }
        }, _fitColumnsResizeChanged: function () {
            return !0
        }, _cellsByColumnReset: function () {
            this.cellsByColumn = { index: 0 }, this._getSegments(), this._getSegments(!0)
        }, _cellsByColumnLayout: function (t) {
            var n = this, o = this.cellsByColumn;
            t.each(function () {
                var t = e(this), s = Math.floor(o.index / o.rows), r = o.index % o.rows,
                    a = (s + .5) * o.columnWidth - t.outerWidth(!0) / 2,
                    l = (r + .5) * o.rowHeight - t.outerHeight(!0) / 2;
                n._pushPosition(t, a, l), o.index++
            })
        }, _cellsByColumnGetContainerSize: function () {
            return { width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth }
        }, _cellsByColumnResizeChanged: function () {
            return this._checkIfSegmentsChanged(!0)
        }, _straightAcrossReset: function () {
            this.straightAcross = { x: 0 }
        }, _straightAcrossLayout: function (t) {
            var n = this;
            t.each(function (t) {
                var o = e(this);
                n._pushPosition(o, n.straightAcross.x, 0), n.straightAcross.x += o.outerWidth(!0)
            })
        }, _straightAcrossGetContainerSize: function () {
            return { width: this.straightAcross.x }
        }, _straightAcrossResizeChanged: function () {
            return !0
        }
    }, e.fn.imagesLoaded = function (t) {
        function n() {
            t.call(o, s)
        }

        var o = this, s = o.find("img").add(o.filter("img")), r = s.length,
            a = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", l = [];
        return r || n(), s.bind("load.imagesLoaded error.imagesLoaded", function t(o) {
            var f = o.target;
            f.src !== a && -1 === e.inArray(f, l) && (l.push(f), --r <= 0 && (setTimeout(n), s.unbind(".imagesLoaded", t)))
        }).each(function () {
            var t = this.src;
            this.src = a, this.src = t
        }), o
    };
    var A = function (e) {
        t.console && t.console.error(e)
    };
    e.fn.isotope = function (t, n) {
        if ("string" == typeof t) {
            var o = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var n = e.data(this, "isotope");
                return n ? e.isFunction(n[t]) && "_" !== t.charAt(0) ? void n[t].apply(n, o) : void A("no such method '" + t + "' for isotope instance") : void A("cannot call methods on isotope prior to initialization; attempted to call method '" + t + "'")
            })
        } else this.each(function () {
            var o = e.data(this, "isotope");
            o ? (o.option(t), o._init(n)) : e.data(this, "isotope", new e.Isotope(t, this, n))
        });
        return this
    }
}(window, jQuery);
var $grid;
$(function () {
    localStorage.setItem("web_list", JSON.stringify(web_list));
    let i = 0, web_list_html = "";
    for (i in web_list) {
        "桜瀬トナエの小破站" == web_list[i].title && (web_list_html += `<div id="web_1" class="col-md-4 web-grid web_1 is_star" data-toggle="modal" data-target="#exampleModal"><span style="cursor:pointer"><div data-toggle="popover" data-html="true" data-content="站点合集" class="services-inner-box web-single clearfix" ontouchstart=""><span class="star iconfont">&#xe639;</span><h2>桜瀬トナエ的导航站</h2><p><span class="web-kind" style="margin-right:0">实用</span></p></div></span></div>`);
        let t = `${web_list[i].kind}_ ${web_list[i].id}`;
        $(window).width() >= 768 ? web_list_html += `<div id="${t}" class="col-md-4 web-grid web-grid-web ${web_list[i].kind} is_ ${web_list[i].star}"><a href="${web_list[i].href}"><div data-toggle="popover" data-html="true" data-content="${web_list[i].slogan}" class="services-inner-box web-single clearfix" ontouchstart=""><span class="${web_list[i].star} iconfont">&#xe639;</span><h2>${web_list[i].title}</h2><p><span class="web-kind">${web_list[i].kind_name}</span></p></div></a></div>` : web_list_html += `<div id="${t}" class="col-md-4 web-grid web-grid-phone ${web_list[i].kind} is_ ${web_list[i].star}"><span href="${web_list[i].href}"><div data-content="${web_list[i].slogan}" class="services-inner-box web-single clearfix" ontouchstart=""><span class="${web_list[i].star} iconfont">&#xe639;</span><h2>${web_list[i].title}</h2><p><span class="web-kind">${web_list[i].kind_name}</span></p></div></span></div>`
    }
    $(".web-list").html(web_list_html),
        $(".copyrights").removeClass("hide");
    $grid = $(".web-list").isotope({ itemSelector: ".web-grid", getSortData: getSortData() });

});

function getSortData() {
    sortData = {};
    var t = ["like-num-sort"];
    for (var e in t) sortData[t[e]] = function (n) {
        return parseInt(n.find("." + t[e]).text())
    };
    return sortData
}

$(".section-title>span").click(() => {
    window.location.reload()
}), $(".web-grid-phone").click(function () {
    let t = $(this).find("p>.like-num").text(), e = $(this).attr("id");
    $(".back-modal").stop().fadeIn(300), $(".phone-modal").stop().fadeIn(300), $(".phone-modal").find("h3").text($(this).find("span div h2").text()), $(".phone-modal").find(".slogan span").text($(this).find("span div").attr("data-content")), $(".phone-modal").find(".go-url").attr("href", $(this).find("span").attr("href")), $(".phone-modal").find(".like-num").text(t), $(".phone-modal").find(".iconfont").removeClass("like_flag"), $(".phone-modal").find(".like-num").removeClass("like_flag"), $(".phone-modal").find(".iconfont").addClass(localStorage.getItem(e)), $(".phone-modal").find(".like-num").addClass(localStorage.getItem(e)), $(".phone-modal .hide-modal").attr("web_grid", $(this).attr("id"))
}), $(".phone-modal .go-url").click(() => {
    $(".phone-modal").stop().fadeOut(300), $(".back-modal").stop().fadeOut(300)
}), $(".back-modal").click(() => {
    $(".phone-modal").stop().fadeOut(300), $(".back-modal").stop().fadeOut(300)
});
let video_list = [["av3743771", "bvid=BV11s411X7u5"], ["av9856372", "bvid=BV1Nx411D78D"], ["av27234784", "bvid=BV1fs411E7ht"], ["av66209341", "bvid=BV1M4411m7Mz"], ["BV1a741137NS", "bvid=BV1a741137NS"], ["BV1wv411y7L6", "bvid=BV1wv411y7L6"], ["BV1bU4y1x7A1", "bvid=BV1bU4y1x7A1"], ["BV1qQ4y1r7ty", "bvid=BV1qQ4y1r7ty"], ["BV1ju411X7Zm", "bvid=BV1ju411X7Zm"], ["BV1HB4y1n7nS", "bvid=BV1HB4y1n7nS"],];
localStorage.getItem("is_show_bilibili") || localStorage.setItem("is_show_bilibili", 0), $(".web-menu").on("click", "button:eq(0), .period, .btn_star", function () {
    let t = $(this).attr("num");
    $(this).addClass("active").siblings().removeClass("active"), $grid.isotope({ filter: $(this).attr("data-filter") }), setTimeout(() => {
        $(".copyrights").css("position", "relative")
    }, 10)
});
let $scroll_to_top = $("#scroll-to-top"), $dmtop = $(".dmtop");
$(window).scroll(() => {
    100 > $(window).scrollTop() ? $dmtop.removeClass("show") : $dmtop.addClass("show")
}),
    $scroll_to_top.click(function (t) {
        t.preventDefault(), $("html,body").animate({ scrollTop: 0 }, 700)
    }),
    window.onresize = () => {
        $(window).width() >= 768 ? $grid.isotope({ filter: $(".web-menu button.active").attr("data-filter") }) : $(".services-inner-box").unbind("mouseenter").unbind("mouseleave")
    },
    768 > $(window).width() && setTimeout(() => {
        $(".services-inner-box").unbind("mouseenter").unbind("mouseleave")
    }, 300),
    setTimeout(() => {
        $(".modal-body img").attr("src", "./img/ousetonae.png")
    }, 300),
    $(".github_lks_btn").click(() => {
        window.open("https://github.com/OuseTonae/Guide-website/")
    }),
    $(".btn_toogle").click(function () {
        $(".web-menu button:eq(0)").click(), $(this).hasClass("is_period") ? ($(this).removeClass("is_period"), $(".period").css("display", "none"), $(".category").css("display", "inline-block")) : ($(this).addClass("is_period"), $(".period").css("display", "inline-block"), $(".category").css("display", "none")), setTimeout(() => {
            $(".copyrights").css("position", "relative"), $(".web-menu button").eq(0).addClass("active").siblings().removeClass("active")
        }, 10)
    }),
    $(".category").click(function () {
        let t = $(this).text();
        $(this).addClass("active").siblings().removeClass("active"), $(".web-list .web-grid").removeClass("filter_web"), $(".web-list .web-grid").each(function () {
            -1 != $(this).find(".web-single p").text().toUpperCase().search(t) && $(this).addClass("filter_web")
        }), $grid.isotope({ filter: ".filter_web" }), set_footer()
    });
let set_footer = () => {
    $(".web-list .web-grid.filter_web").length <= 9 ? $(".copyrights").css("position", "absolute") : $(".copyrights").css("position", "relative")
};