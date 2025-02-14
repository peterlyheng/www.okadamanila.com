!(function (t, e) {
  "use strict";
  var n = "BioMedia",
    r = t.dBlazy,
    a = t.Bio;
  "function" == typeof define && define.amd
    ? define([n, r, a], e)
    : "object" == typeof exports
    ? (module.exports = e(n, r, a))
    : (t[n] = e(n, r, a));
})(this, function (n, p, r) {
  "use strict";
  var a = document,
    t = "data-",
    l = "src",
    f = "srcset",
    h = t + l,
    g = [f, l],
    b = 0,
    o = !1,
    i = Bio.prototype,
    s = (e.prototype = Object.create(i));
  function e(t) {
    var e = r.apply(p.extend({}, i, p.extend({}, s, this)), arguments);
    return (e.name = n), e;
  }
  function m(t, e, n, r) {
    return (
      o ||
        ((t = c(t, "defer")) &&
          p.each(t, function (t) {
            p.attr(t, "loading", "lazy");
          }),
        (o = !0)),
      p.status(e, n, r)
    );
  }
  function c(t, e) {
    t = t.options;
    if (!p.isNativeLazy) return [];
    e = e || "a";
    (e = p.selector(t, '[data-src][loading*="' + e + '"]:not(.b-blur)')),
      (e = p.findAll(a, e));
    return (
      e.length && p(e).mapAttr(["srcset", "src"], !0).mapSource(!1, !0, !1), e
    );
  }
  return (
    (s.constructor = e),
    (s.lazyLoad = function (t, e) {
      var n = this,
        r = n.options,
        a = t.parentNode,
        o = p.isBg(t),
        i = p.equal(a, "picture"),
        s = p.equal(t, "img"),
        c = p.equal(t, "video"),
        a = p.hasAttr(t, h);
      p.blur && p.blur(t),
        i
          ? (a && (p.mapSource(t, f, !0), p.mapAttr(t, l, !0)),
            (b = m(n, t, !0, r)))
          : c
          ? (b = p.loadVideo(t, !0, r))
          : s || o
          ? n.loadImage(t, o, e)
          : p.hasAttr(t, l) &&
            (p.attr(t, h) && p.mapAttr(t, l, !0), (b = m(n, t, !0, r))),
        (n.erCount = b);
    }),
    (s.loadImage = function (t, n, r) {
      function e(t, e) {
        b =
          n && p.isFun(p.bg) ? (p.bg(t, r), p.status(t, e, o)) : m(a, t, e, o);
      }
      var a = this,
        o = a.options,
        i = new Image(),
        s = p.hasAttr(t, f),
        c = p.hasAttr(t, h),
        u = c ? h : l,
        d = c ? "data-srcset" : f;
      "decode" in i && (i.decoding = "async"),
        n && p.isFun(p.bgUrl)
          ? (i.src = p.bgUrl(t, r))
          : (c && p.mapAttr(t, g, !1), (i.src = p.attr(t, u))),
        s && (i.srcset = p.attr(t, d)),
        p
          .decode(i)
          .then(function () {
            e(t, !0);
          })
          .catch(function () {
            e(t, s), s || (t.bhit = !1);
          });
    }),
    (s.resizing = function (t, e) {
      var n = p.isBg(t, this.options);
      n && this.loadImage(t, n, e);
    }),
    (s.prepare = function () {
      var e, t, n;
      c(this),
        p.webp &&
          ((e = this),
          p.webp.isSupported() ||
            ((t = function (t) {
              return (
                (t = t || ""),
                p.selector(e.options, "[" + t + 'srcset*=".webp"]')
              );
            }),
            (n = p.findAll(a, t())).length || (n = p.findAll(a, t("data-"))),
            n.length && p.webp.run(n)));
    }),
    e
  );
});
!(function (o, t, n, l, e) {
  "use strict";
  var s = "data",
    a = ".b-blur",
    r = ".media",
    i = "successClass",
    u = (c = "blazy") + ".done",
    c = function () {},
    d = {};
  t.blazy = {
    context: e,
    name: "Drupal.blazy",
    init: null,
    instances: [],
    resizeTick: 0,
    resizeTrigger: !1,
    blazySettings: n.blazy || {},
    ioSettings: n.blazyIo || {},
    options: {},
    clearCompat: c,
    clearScript: c,
    checkResize: c,
    resizing: c,
    revalidate: c,
    isIo: function () {
      return !0;
    },
    isBlazy: function () {
      return !o.isIo && "Blazy" in l;
    },
    isFluid: function (t, n) {
      return o.equal(t.parentNode, "picture") && o.hasAttr(n, "data-ratios");
    },
    isLoaded: function (t) {
      return o.hasClass(t, this.options[i]);
    },
    globals: function () {
      var t = this,
        n = {
          isMedia: !0,
          success: t.clearing.bind(t),
          error: t.clearing.bind(t),
          resizing: t.resizing.bind(t),
          selector: ".b-lazy",
          parent: r,
          errorClass: "b-error",
          successClass: "b-loaded",
        };
      return o.extend(t.blazySettings, t.ioSettings, n);
    },
    extend: function (t) {
      d = o.extend({}, d, t);
    },
    merge: function (t) {
      var n = this;
      return (
        (n.options = o.extend({}, n.globals(), n.options, t || {})), n.options
      );
    },
    run: function (t) {
      return new BioMedia(t);
    },
    mount: function (t) {
      var n = this;
      return (
        n.merge(),
        t &&
          o.each(d, function (t) {
            o.isFun(t) && t.call(n);
          }),
        o.extend(n, d)
      );
    },
    selector: function (t) {
      t = t || "";
      var n = this.options;
      return n.selector + t + ":not(." + n[i] + ")";
    },
    clearing: function (t) {
      var n, i;
      t.bclearing ||
        ((n = this),
        (i = o.hasClass(t, "b-responsive") && o.hasAttr(t, s + "-pfsrc")),
        o.isFun(o.unloading) && o.unloading(t),
        o.trigger(t, u, { options: n.options }),
        n.clearCompat(t),
        n.clearScript(t),
        l.picturefill && i && l.picturefill({ reevaluate: !0, elements: [t] }),
        (t.bclearing = !0));
    },
    windowData: function () {
      return this.init ? this.init.windowData() : {};
    },
    load: function (n) {
      var i = this;
      l.setTimeout(function () {
        var t = o.findAll(n || e, i.selector());
        t.length && o.each(t, i.update.bind(i));
      }, 100);
    },
    update: function (t, n, i) {
      function e() {
        o.hasAttr(t, "data-b-bg") && o.isFun(o.bg)
          ? o.bg(t, i || s.windowData())
          : s.init &&
            (o.hasClass(t, r.substring(1)) || (t = o.find(t, r) || t),
            s.init.load(t, !0, a));
      }
      var s = this,
        a = s.options,
        r = a.selector;
      (n = n || !1) ? l.setTimeout(e, 100) : e();
    },
    rebind: function (t, i, e) {
      var n = o.findAll(t, this.options.selector + ":not(" + a + ")"),
        s = n.length;
      s || (n = o.findAll(t, "img:not(" + a + ")")),
        n.length &&
          o.each(n, function (t) {
            var n = s ? u : "load";
            o.one(t, n, i, s), e && e.observe(t);
          });
    },
    pad: function (n, i, t) {
      var e = this,
        s = o.closest(n, r) || n;
      setTimeout(function () {
        var t = Math.round((n.naturalHeight / n.naturalWidth) * 100, 2);
        e.isFluid(n, s) && (s.style.paddingBottom = t + "%"),
          o.isFun(i) && i.call(e, n, s, t);
      }, t || 0);
    },
  };
})(dBlazy, Drupal, drupalSettings, this, this.document);
!(function (r, n, o) {
  "use strict";
  var i,
    l = "blazy",
    t = "data-",
    c = t + "ratios",
    u = t + "ratio",
    d = "picture",
    e = ".media--ratio",
    h = {},
    f = 0;
  function a(t) {
    var i = r.aniElement && r.aniElement(t);
    r.animate &&
      r.isElm(i) &&
      !r.hasClass(i, "is-b-animated") &&
      setTimeout(function () {
        r.animate(i);
      }, 60);
  }
  function s(t, i, a) {
    if (((t = t.target || t), (a = !!r.isBool(a) && a), r.isElm(t))) {
      var n,
        e,
        s = r.closest(t, "." + l),
        o = r.parse(r.attr(t, c));
      if (r.isEmpty(o))
        return (
          (n = t),
          (e = r.attr(n, u)),
          void (
            !r.hasAttr(n, "style") &&
            e &&
            (n.style.paddingBottom = e + "%")
          )
        );
      (a = r.isElm(r.find(t, d)) && a),
        (a = r.extend(h, { up: a })),
        (a = r.activeWidth(o, a));
      (t.dblazy = r.isElm(s) && s.dblazy),
        r.isUnd(a) || (t.style.paddingBottom = a + "%");
    }
  }
  function m() {
    var t = this;
    t.mount(!0),
      (i = t.options),
      r.isNull(t.init) && (t.init = t.run(i)),
      function () {
        var t = this,
          i = t.context,
          a = r.findAll(i, e);
        a.length && (r.each(a, s.bind(t)), t.checkResize(a, s, i));
      }.call(t);
  }
  (n.blazy = r.extend(n.blazy || {}, {
    clearCompat: function (t) {
      var i = r.isBg(t) && (this.isBlazy() || r.ie);
      this.pad(t, a, i ? 50 : 0);
    },
    checkResize: function (i, n, t, a) {
      var e = this,
        s = e.init;
      return (
        r.on(o, l + ".resizing", function (t) {
          t = t && t.detail ? t.detail : {};
          h = t.winData || e.windowData();
          var a = 0 < f && f !== h.ww;
          a &&
            ((e.resizeTick = (s && s.resizeTick) || 0),
            r.isFun(n) &&
              r.each(i, function (t, i) {
                t = t.target || t;
                return n.call(e, t, i, a);
              })),
            (f = h.ww);
        }),
        a && r.isFun(a) && e.rebind(t, a, e.roObserver),
        (e.destroyed = !1),
        h
      );
    },
    unresize: function () {
      r.unload(this);
    },
  })),
    (n.behaviors.blazyCompat = {
      attach: function (t) {
        var i = n.blazy;
        (i.context = r.context(t)), r.once(m.call(i));
      },
      detach: function (t, i, a) {
        "unload" === a && n.blazy.unresize();
      },
    });
})(dBlazy, Drupal, this);
/*!
 * tabbable 5.3.2
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : ((e = "undefined" != typeof globalThis ? globalThis : e || self),
      (function () {
        var n = e.tabbable,
          o = (e.tabbable = {});
        t(o),
          (o.noConflict = function () {
            return (e.tabbable = n), o;
          });
      })());
})(this, function (e) {
  "use strict";
  var t = [
      "input",
      "select",
      "textarea",
      "a[href]",
      "button",
      "[tabindex]:not(slot)",
      "audio[controls]",
      "video[controls]",
      '[contenteditable]:not([contenteditable="false"])',
      "details>summary:first-of-type",
      "details",
    ],
    n = t.join(","),
    o = "undefined" == typeof Element,
    r = o
      ? function () {}
      : Element.prototype.matches ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector,
    i =
      !o && Element.prototype.getRootNode
        ? function (e) {
            return e.getRootNode();
          }
        : function (e) {
            return e.ownerDocument;
          },
    a = function (e, t, o) {
      var i = Array.prototype.slice.apply(e.querySelectorAll(n));
      return t && r.call(e, n) && i.unshift(e), (i = i.filter(o));
    },
    l = function e(t, o, i) {
      for (var a = [], l = Array.from(t); l.length; ) {
        var u = l.shift();
        if ("SLOT" === u.tagName) {
          var c = u.assignedElements(),
            d = e(c.length ? c : u.children, !0, i);
          i.flatten ? a.push.apply(a, d) : a.push({ scope: u, candidates: d });
        } else {
          r.call(u, n) && i.filter(u) && (o || !t.includes(u)) && a.push(u);
          var f =
            u.shadowRoot ||
            ("function" == typeof i.getShadowRoot && i.getShadowRoot(u));
          if (f) {
            var s = e(!0 === f ? u.children : f.children, !0, i);
            i.flatten
              ? a.push.apply(a, s)
              : a.push({ scope: u, candidates: s });
          } else l.unshift.apply(l, u.children);
        }
      }
      return a;
    },
    u = function (e, t) {
      return e.tabIndex < 0 &&
        (t ||
          /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) ||
          e.isContentEditable) &&
        isNaN(parseInt(e.getAttribute("tabindex"), 10))
        ? 0
        : e.tabIndex;
    },
    c = function (e, t) {
      return e.tabIndex === t.tabIndex
        ? e.documentOrder - t.documentOrder
        : e.tabIndex - t.tabIndex;
    },
    d = function (e) {
      return "INPUT" === e.tagName;
    },
    f = function (e) {
      return (
        (function (e) {
          return d(e) && "radio" === e.type;
        })(e) &&
        !(function (e) {
          if (!e.name) return !0;
          var t,
            n = e.form || i(e),
            o = function (e) {
              return n.querySelectorAll(
                'input[type="radio"][name="' + e + '"]'
              );
            };
          if (
            "undefined" != typeof window &&
            void 0 !== window.CSS &&
            "function" == typeof window.CSS.escape
          )
            t = o(window.CSS.escape(e.name));
          else
            try {
              t = o(e.name);
            } catch (e) {
              return (
                console.error(
                  "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
                  e.message
                ),
                !1
              );
            }
          var r = (function (e, t) {
            for (var n = 0; n < e.length; n++)
              if (e[n].checked && e[n].form === t) return e[n];
          })(t, e.form);
          return !r || r === e;
        })(e)
      );
    },
    s = function (e) {
      var t = e.getBoundingClientRect(),
        n = t.width,
        o = t.height;
      return 0 === n && 0 === o;
    },
    p = function (e, t) {
      return !(
        t.disabled ||
        (function (e) {
          return d(e) && "hidden" === e.type;
        })(t) ||
        (function (e, t) {
          var n = t.displayCheck,
            o = t.getShadowRoot;
          if ("hidden" === getComputedStyle(e).visibility) return !0;
          var a = r.call(e, "details>summary:first-of-type")
            ? e.parentElement
            : e;
          if (r.call(a, "details:not([open]) *")) return !0;
          var l = i(e).host,
            u =
              (null == l ? void 0 : l.ownerDocument.contains(l)) ||
              e.ownerDocument.contains(e);
          if (n && "full" !== n) {
            if ("non-zero-area" === n) return s(e);
          } else {
            if ("function" == typeof o) {
              for (var c = e; e; ) {
                var d = e.parentElement,
                  f = i(e);
                if (d && !d.shadowRoot && !0 === o(d)) return s(e);
                e = e.assignedSlot
                  ? e.assignedSlot
                  : d || f === e.ownerDocument
                  ? d
                  : f.host;
              }
              e = c;
            }
            if (u) return !e.getClientRects().length;
          }
          return !1;
        })(t, e) ||
        (function (e) {
          return (
            "DETAILS" === e.tagName &&
            Array.prototype.slice.apply(e.children).some(function (e) {
              return "SUMMARY" === e.tagName;
            })
          );
        })(t) ||
        (function (e) {
          if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
            for (var t = e.parentElement; t; ) {
              if ("FIELDSET" === t.tagName && t.disabled) {
                for (var n = 0; n < t.children.length; n++) {
                  var o = t.children.item(n);
                  if ("LEGEND" === o.tagName)
                    return (
                      !!r.call(t, "fieldset[disabled] *") || !o.contains(e)
                    );
                }
                return !0;
              }
              t = t.parentElement;
            }
          return !1;
        })(t)
      );
    },
    h = function (e, t) {
      return !(f(t) || u(t) < 0 || !p(e, t));
    },
    m = t.concat("iframe").join(",");
  (e.focusable = function (e, t) {
    return (t = t || {}).getShadowRoot
      ? l([e], t.includeContainer, {
          filter: p.bind(null, t),
          flatten: !0,
          getShadowRoot: t.getShadowRoot,
        })
      : a(e, t.includeContainer, p.bind(null, t));
  }),
    (e.isFocusable = function (e, t) {
      if (((t = t || {}), !e)) throw new Error("No node provided");
      return !1 !== r.call(e, m) && p(t, e);
    }),
    (e.isTabbable = function (e, t) {
      if (((t = t || {}), !e)) throw new Error("No node provided");
      return !1 !== r.call(e, n) && h(t, e);
    }),
    (e.tabbable = function (e, t) {
      return (function e(t) {
        var n = [],
          o = [];
        return (
          t.forEach(function (t, r) {
            var i = !!t.scope,
              a = i ? t.scope : t,
              l = u(a, i),
              c = i ? e(t.candidates) : a;
            0 === l
              ? i
                ? n.push.apply(n, c)
                : n.push(a)
              : o.push({
                  documentOrder: r,
                  tabIndex: l,
                  item: t,
                  isScope: i,
                  content: c,
                });
          }),
          o
            .sort(c)
            .reduce(function (e, t) {
              return (
                t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
              );
            }, [])
            .concat(n)
        );
      })(
        (t = t || {}).getShadowRoot
          ? l([e], t.includeContainer, {
              filter: h.bind(null, t),
              flatten: !1,
              getShadowRoot: t.getShadowRoot,
            })
          : a(e, t.includeContainer, h.bind(null, t))
      );
    }),
    Object.defineProperty(e, "__esModule", { value: !0 });
});

/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function ($, once) {
  var deprecatedMessageSuffix =
    "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";
  var originalJQOnce = $.fn.once;
  var originalJQRemoveOnce = $.fn.removeOnce;

  $.fn.once = function jQueryOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.once() ".concat(deprecatedMessageSuffix),
    });
    return originalJQOnce.apply(this, [id]);
  };

  $.fn.removeOnce = function jQueryRemoveOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix),
    });
    return originalJQRemoveOnce.apply(this, [id]);
  };

  var drupalOnce = once;

  function augmentedOnce(id, selector, context) {
    originalJQOnce.apply($(selector, context), [id]);
    return drupalOnce(id, selector, context);
  }

  function remove(id, selector, context) {
    originalJQRemoveOnce.apply($(selector, context), [id]);
    return drupalOnce.remove(id, selector, context);
  }

  window.once = Object.assign(augmentedOnce, drupalOnce, {
    remove: remove,
  });
})(jQuery, once);
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./resources/js/app.js":
      /*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        //import "bootstrap/dist/js/bootstrap.min";
        window.AU = __webpack_require__(
          /*! ./lib/app_utils */ "./resources/js/lib/app_utils.js"
        );
        window.dapp = __webpack_require__(
          /*! ./app/application */ "./resources/js/app/application.js"
        );
        window.Responsive = __webpack_require__(
          /*! ./app/application */ "./resources/js/app/application.js"
        );
        window.DTheme = __webpack_require__(
          /*! ./app/theme */ "./resources/js/app/theme.js"
        );
        window.cookie_policy = __webpack_require__(
          /*! ./cp */ "./resources/js/cp.js"
        );

        /***/
      },

    /***/ "./resources/js/app/application.js":
      /*!*****************************************!*\
  !*** ./resources/js/app/application.js ***!
  \*****************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        var dapp = dapp || {};
        dapp = {
          init: function init() {
            jQuery(window).on(
              "load ajaxComplete",
              function (event, xhr, settings) {
                if (
                  jQuery("[data-popup-overlay], [data-popup-model]").hasClass(
                    "active"
                  )
                ) {
                  jQuery("[data-popup-close]").on("click", function () {
                    jQuery("[aria-expanded]").attr("aria-expanded", false);
                    jQuery("body").removeAttr("style");
                  });
                }
              }
            ); //added to remove width/height attributes for all basic pages

            jQuery(".content__page img")
              .removeAttr("width")
              .removeAttr("height");
          },
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = dapp;

        (function (jQuery) {
          dapp.init();
        })(jQuery);

        /***/
      },

    /***/ "./resources/js/app/theme.js":
      /*!***********************************!*\
  !*** ./resources/js/app/theme.js ***!
  \***********************************/
      /***/ () => {
        "use strict";

        (function ($) {
          var base_url =
            drupalSettings.language == "en"
              ? window.location.origin
              : window.location.origin + "/" + drupalSettings.language; //var open_tbl_url = 'https://www.opentable.com/widget/reservation/loader?rid=108955&type=standard&theme=wide&iframe=false&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website';
          //addDScript(open_tbl_url);

          $("#edit-wf-select-dine").click(function (e) {
            var restaurant_id = $(this).val();
            var url =
              "https://www.opentable.com/widget/reservation/loader?rid=" +
              restaurant_id +
              "&type=standard&theme=wide&iframe=false&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website";
            var new_open_tbl_url = url.toString();
            addDScript(new_open_tbl_url);
          });
          /*
           * Header popup search
           * Case 1 - Search for only keywords
           * Case 2 - Search for keywords with filters
           */

          var flage = true;
          $("#keyword").on("keyup", function (e) {
            console.log(
              "Updated the keyup from search box" +
                base_url +
                "Language ::: " +
                drupalSettings.language
            );
            var key = $(this).val();

            if (key.length >= 3) {
              var autocomplete_url =
                  base_url +
                  "/search_api_autocomplete/search?display=page_search&&filter=key&q=" +
                  key,
                search_url =
                  base_url +
                  "/search?keywords=" +
                  key +
                  "&q=" +
                  key +
                  "&search_type=All";
              $(".topbar__search").addClass("app-autocomplete-loading");
              $.ajax({
                type: "GET",
                url: autocomplete_url,
                dataType: "json",
                success: function success(data) {
                  var search_data = "";
                  $.each(data.slice(0, 5), function (i, item) {
                    search_data +=
                      '<li class="ui-menu-item"><a id="cid-' +
                      i +
                      '" tabindex="-1" class="search-li-item"><div class="search-api-autocomplete-suggestion"><span class="autocomplete-suggestion-label">' +
                      item.value +
                      "</span></div></a></li>";
                  });

                  if (search_data.length > 0) {
                    $("#suggest_content").html(
                      "<ul class='ui-menu ui-widget ui-widget-content ui-autocomplete ui-front search-api-autocomplete-search'>" +
                        search_data +
                        "</ul>"
                    );
                    $(".topbar__search").removeClass(
                      "app-autocomplete-loading"
                    );
                    $("#suggest_content a").on("click", function () {
                      $("#keyword").val($(this).text());
                      $("#suggest_content").html("");
                    });
                    flage = true;
                  } else {
                    $("#suggest_content").html(
                      "Sorry, nothing matches the search terms"
                    );
                    flage = false;
                  }
                },
                error: function error() {
                  $("#suggest_content").text("");
                },
              });

              if (flage == false) {
                $("#suggest_content").html(
                  "Sorry, nothing matches the search terms"
                );
              } else {
                $("#suggest_content").text("");
              }
            }
          });
          $(".enquire-popup").click(function (e) {
            var sub_type = $(this).attr("data-subtype");
            var sub_type_title = $(this).attr("data-service_title");

            if (sub_type == "services") {
              $('input[name="wf_sub_type"]').val(sub_type_title);
            } else {
              $("#enquirePopUpModal .wf_sub_type").text("");
            }

            $("#enquirePopUpModal").modal("show");
          });
          $(".popup_close").click(function (e) {
            var success_element = document.getElementById("js_booking_success");

            if (success_element) {
              location.reload();
            }
          });
          $(".boutique_img_popup").click(function (e) {
            var slt_image_source = $(this).attr("data-boutique_img");
            $(".media-product-img").attr("src", "");
            $("#modalboutique")
              .find(".media-product-img")
              .attr("src", slt_image_source);
          });
          $(".stay-date-error").hide();
          $(".stay-room-error").hide();
          $(".stay-guest-error").hide();
          $(".event-date-error").hide();
          $(".event-event-error").hide();
          $(".event-guest-error").hide();
          $("#search-keyword").click(function (e) {
            var keywords = $("#edit-keywords").val();

            if (keywords.length > 0) {
              $("#views-exposed-form-search-page-search").submit();
            } else {
              e.preventDefault();
              callBackSearch(keywords, "post_search", base_url);
              return false;
            }
          });
          $("input[type='radio'][name='search_type']").click(function () {
            var search_type = $(this).val();
            $("#views-exposed-form-search-page-search").submit();
          });
          $("form.webform-submission-stay-booking-form").submit(function (e) {
            $(".stay-date-error").hide();
            $(".stay-room-error").hide();
            $(".stay-guest-error").hide();
            var booking_date = $("#edit-wf-stay-date").val();
            var booking_room = $("#edit-wf-stay-rooms").val();
            var booking_guest = $("#edit-wf-stay-guests").val();

            if (booking_date == "") {
              $(".stay-date-error").show();
            } else if (booking_room == "") {
              $(".stay-room-error").show();
            } else if (booking_guest == "") {
              $(".stay-guest-error").show();
            } else {
              // $('#stayloadModal .stay_selected_date').text(booking_date);
              // $('#stayloadModal .stay_selected_room').text(booking_room);
              // $('#stayloadModal .stay_selected_guest').text(booking_guest);
              // $('input[name="wf_stay_req_date"]').val(booking_date);
              // $('input[name="wf_stay_req_rooms"]').val(booking_room);
              // $('input[name="wf_stay_req_guests"]').val(booking_guest);
              // $('#roomPopUpModal').modal('show');
            }

            e.preventDefault();
            return false;
          });
          $("form.webform-submission-event-booking-form").submit(function (e) {
            $(".event-date-error").hide();
            $(".event-event-error").hide();
            $(".event-guest-error").hide();
            var booking_date = $("#edit-wf-event-date").val();
            var booking_event = $("#edit-wf-select-event").val();
            var booking_guest = $("#edit-wf-event-guests").val();

            if (booking_date == "") {
              $(".event-date-error").show();
            } else if (booking_event == "") {
              $(".event-event-error").show();
            } else if (booking_guest == "") {
              $(".event-guest-error").show();
            } else {
              $("#stayloadModal .event_selected_date").text(booking_date);
              $("#stayloadModal .event_selected_room").text(booking_event);
              $("#stayloadModal .event_selected_guest").text(booking_guest);
              $('input[name="wf_event_req_date"]').val(booking_date);
              $('input[name="wf_event_req_event"]').val(booking_event);
              $('input[name="wf_event_req_guests"]').val(booking_guest);
              $("#eventPopUpModal").modal("show");
            }

            e.preventDefault();
            return false;
          });
          $("#header_search").click(function (e) {
            e.preventDefault();
            var keywords = $("#keyword").val();
            callBackSearch(keywords, "header_search", base_url);
            return false;
          });
          $(".btn-chk-avl").click(function (e) {
            $('input[name="wf_enq_req_date"]').val("");
            $("#edit-wf-enq-req-guests").val("");
            $('input[name="wf_enq_req_name"]').val("");
            $('input[name="wf_enq_req_email"]').val("");
            $('input[name="wf_enq_req_country_code"]').val("");
            $('input[name="wf_enq_req_phone"]').val("");
            $('input[name="wf_enq_req_slt_type"]').val("");
            $('input[name="wf_enq_req_type"]').val("");
            var slt_type_data = $(this).attr("data-chk_avl_slt_data");
            $('input[name="wf_enq_req_slt_type"]').val(slt_type_data);
            var slt_type = $(this).attr("data-chk_avl_slt_type");
            $('input[name="wf_enq_req_type"]').val(slt_type);
            $("#cat_list_enq_popup_modal").modal("show");
            e.preventDefault();
            return false;
          });

          function callBackSearch(keywords, search_type, base_url) {
            if (keywords.length > 0) {
              var query_string = "",
                search_url = "";
              query_string = "/search?keywords=" + keywords;
              search_url = base_url + query_string; //$("#keywords").val(keywords);

              window.location.href = search_url;
              return false;
            } else {
              if (search_type == "header_search") {
                $(".topbar__search").attr(
                  "placeholder",
                  "Sorry, Please enter search keywords"
                );
              } else {
                //$("#wrapper").html('<p class="sidebar__error">Sorry, Please enter the search keywords.</p>');
                $("#edit-keywords").attr(
                  "placeholder",
                  "Sorry, Please enter search keywords"
                );
              }
            }
          }
        })(jQuery); // function scriptLoadHandler() {
        // 	$ = window.jQuery.noConflict(true);
        // }

        function addDScript(open_tbl_url) {
          jQuery("#addedScript").remove();
          jQuery("#addedScript").empty();
          jQuery("#dine_opentbl_req").html();
          var script_tag = document.createElement("script");
          script_tag.setAttribute("id", "addedScript");
          script_tag.type = "text/javascript";
          script_tag.src = open_tbl_url;
          jQuery("#dine_opentbl_req").append(script_tag); //jQuery("#dine_opentbl_req").append( '<script>alert("'+open_tbl_url+'");</script>' );
        }

        var dtheme = dtheme || {};
        dtheme = {
          init: function init() {
            jQuery(document).ready(function () {
              jQuery(".bs-single-item").slick({
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
              });
              jQuery(".bs-multi-item").slick({
                centerMode: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
              });
            });
          },
        };

        (function (jQuery) {
          dtheme.init();
        })(jQuery);

        /***/
      },

    /***/ "./resources/js/cp.js":
      /*!****************************!*\
  !*** ./resources/js/cp.js ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        var cookie_policy = cookie_policy || {};
        cookie_policy = {
          init: function init() {
            jQuery(".cpbtn").click(function () {
              cookie_policy.acceptajaxCookieConsent(0);
            });
          },
          //method
          setCookie: function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
          },
          deleteCookie: function deleteCookie(cname) {
            var d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=;" + expires + ";path=/";
          },
          getCookie: function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(";");

            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];

              while (c.charAt(0) == " ") {
                c = c.substring(1);
              }

              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }

            return "";
          },

          /*acceptCookieConsent: function () {
      cookie_policy.deleteCookie('ucc');
      cookie_policy.setCookie('ucc', 1, 30);
      jQuery(".cookies").addClass("hide");
  },*/
          acceptajaxCookieConsent: function acceptajaxCookieConsent(st) {
            jQuery.ajax({
              url: "/cc/setcc",
              success: function success(result) {
                if (st == 0) {
                  jQuery(".cookies").addClass("hide");
                }
              },
            });
          },
          ajaxGetCookie: function ajaxGetCookie() {
            var cookie_flag = false;
            jQuery.ajax({
              url: "/cc/getcc",
              dataType: "json",
              async: false,
              success: function success(result) {
                if (result.cookie_value == 1) {
                  cookie_flag = true;
                } else {
                  cookie_flag = false;
                }
              },
            });
            return cookie_flag;
          },
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          cookie_policy;

        (function (jQuery) {
          window.addEventListener("load", function (event) {
            setTimeout(function () {
              var cookie_consent = cookie_policy.ajaxGetCookie();

              if (cookie_consent == true) {
                jQuery(".cookies").addClass("hide");
              } else {
                jQuery(".cookies").removeClass("hide");
              }

              cookie_policy.init();
            }, 1000);
          });
        })(jQuery);

        /***/
      },

    /***/ "./resources/js/lib/app_utils.js":
      /*!***************************************!*\
  !*** ./resources/js/lib/app_utils.js ***!
  \***************************************/
      /***/ (module) => {
        function _typeof(obj) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj;
                  }
                : function (obj) {
                    return obj &&
                      "function" == typeof Symbol &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  }),
            _typeof(obj)
          );
        }

        //Standard Reusable LightWeight jQuery Plugins
        jQuery.fn.extend({
          shuffle: function shuffle() {
            return this.each(function () {
              var items = jQuery(this).children().clone(true);
              return items.length ? jQuery(this).html(AU.shuffle(items)) : this;
            });
          },
          validator: function validator(options) {
            var o,
              defaults = {
                action: "load",
                doSubmit: true,
              };
            var o = jQuery.extend(defaults, options);

            if (o.action == "submit") {
              return this.each(function () {
                var objFrm = jQuery(this);
                objFrm.data("errors", 0);
                objFrm.data("valid", false);
                jQuery("span[id^='msg_'], span.vErrMsg", objFrm).empty();
                jQuery("label", objFrm).each(function () {
                  if (
                    jQuery(this, objFrm).is(":visible") ||
                    jQuery(this, objFrm).attr("data-validate")
                  ) {
                    var elt = jQuery(this);
                    var fldName = elt.attr("for");
                    var frmElement = jQuery(this, objFrm);
                    var objFld = jQuery(
                      'input[name^="' +
                        fldName +
                        '"],select[name^="' +
                        fldName +
                        '"],textarea[name^="' +
                        fldName +
                        '"]',
                      objFrm
                    );
                    objFld.bind("blur", function (e) {
                      AU.validator.validate(elt, objFrm);
                    });
                    AU.validator.validate(jQuery(this), objFrm);
                  }
                });
                if (objFrm.data("errors") > 0) objFrm.data("valid", false);
                else objFrm.data("valid", true);
                jQuery("span.vErrMsg:not(:empty):first", objFrm)
                  .prevAll(":input")
                  .focus();
              });
            } else if (o.action == "load") {
              return this.each(function () {
                var objFrm = jQuery(this);

                if (o.doSubmit) {
                  objFrm.bind("submit", function (e) {
                    objFrm.validator({
                      action: "submit",
                    });

                    if (!objFrm.data("valid")) {
                      return false;
                    }
                  });
                }

                yErr = eval("(" + objFrm.attr("rel") + ")"); //yErr = eval('({'+objFrm.attr('rel').replace(/\(|\)/g, '')+'})');

                if (yErr != null) {
                  AU.validator.assignErrorMsg(yErr, objFrm);
                }

                jQuery("label", objFrm).each(function () {
                  if (
                    jQuery(this, objFrm).is(":visible") ||
                    jQuery(this, objFrm).attr("data-validate")
                  ) {
                    var elt = jQuery(this);
                    var fldName = elt.attr("for");
                    var frmElement = jQuery(this, objFrm);
                    var objFld = jQuery(
                      'input[name^="' +
                        fldName +
                        '"],select[name^="' +
                        fldName +
                        '"],textarea[name^="' +
                        fldName +
                        '"]',
                      objFrm
                    );
                    objFld.bind("blur", function (e) {
                      AU.validator.validate(elt, objFrm);
                    });
                  }
                });
              });
            }
          },
          enable: function enable() {
            return this.each(function () {
              if (typeof this.disabled != "undefined") this.disabled = true;
            });
          },
          disable: function disable() {
            return this.each(function () {
              if (typeof this.disabled != "undefined") this.disabled = false;
            });
          },
        }); //------------------------------------------------------------------------------
        //App utils Script!

        var AU = AU
          ? AU
          : (function () {
              var returnObj = {
                tpl_root: "",
                objAU: this,
                validateForm: function validateForm(form) {
                  jQuery(form).validator({
                    action: "submit",
                  });

                  if (!jQuery(form).data("valid")) {
                    return false;
                  }

                  return true;
                },
                validator: {
                  assignErrorMsg: function assignErrorMsg(error_msg, jobjForm) {
                    if (error_msg == null) return;

                    for (x in error_msg) {
                      var elt = jQuery('label[for|="' + x + '"]', jobjForm);
                      var chk = eval(
                        "({" + elt.attr("rel").replace(/\(|\)/g, "") + "})"
                      );
                      var fldName = elt.attr("for");
                      var objFld = jQuery(
                        'input[name="' +
                          fldName +
                          '"],select[name="' +
                          fldName +
                          '"],textarea[name="' +
                          fldName +
                          '"]',
                        jobjForm
                      );
                      this.updateErrors(
                        chk,
                        fldName,
                        jobjForm,
                        objFld,
                        error_msg[x]
                      );
                    }
                  },
                  clearError: function clearError(fldName, objFrm, objFld) {
                    var name = fldName.replace(/(\[|\])/g, "");
                    var objFlds = jQuery(
                      'input[name^="' +
                        fldName +
                        '"],select[name^="' +
                        fldName +
                        '"],textarea[name^="' +
                        fldName +
                        '"]',
                      objFrm
                    );
                    if (!objFlds.hasClass("b1"))
                      jQuery('label[for="' + fldName + '"]').removeClass(
                        "error"
                      );
                    var msgSpan = jQuery("#msg_" + name, objFrm);
                    var objErrElt =
                      msgSpan.attr("id") != undefined
                        ? msgSpan
                        : objFld.parent().find("span.vErrMsg:last");
                    objErrElt.removeClass().addClass("vErrMsg").html("");
                  },
                  updateErrors: function updateErrors(
                    chk,
                    fldName,
                    objFrm,
                    objFld,
                    msg
                  ) {
                    var name = fldName.replace(/(\[|\])/g, "");
                    var error_class = "";
                    if (chk.err_class != undefined) error_class = chk.err_class;
                    jQuery('label[for="' + fldName + '"]').addClass("error");
                    var msgSpan = jQuery("#msg_" + name, objFrm);
                    objFld.addClass("b1");
                    var objErrElt =
                      msgSpan.attr("id") != undefined
                        ? msgSpan
                        : objFld.parent().find("span.vErrMsg:last"); //objErrElt.html(chk.err ? chk.err : msg).addClass('vErrMsg '+ error_class);

                    var type_err_field = chk.err_type + "_err";
                    var error_msg = chk.empty_err
                      ? chk.err
                        ? chk.err
                        : msg
                      : chk[type_err_field]
                      ? chk[type_err_field]
                      : msg;
                    objErrElt
                      .html(error_msg)
                      .addClass("vErrMsg " + error_class);
                    return objFrm.data("errors", objFrm.data("errors") + 1);
                  },
                  validate: function validate(elt, objFrm) {
                    if (elt.attr("rel") == undefined || elt.attr("rel") == "")
                      return false;
                    var chk = eval(
                      "({" + elt.attr("rel").replace(/\(|\)/g, "") + "})"
                    ); //var tagName	=	elt.get(0).tagName.toLowerCase();

                    var fldName = elt.attr("for");
                    var objFlds = jQuery(
                      'input[name^="' +
                        fldName +
                        '"],select[name^="' +
                        fldName +
                        '"],textarea[name^="' +
                        fldName +
                        '"]',
                      objFrm
                    );

                    var _this = this;

                    jQuery(objFlds).each(function (i, fld) {
                      var objFld = jQuery(fld);
                      objFld.removeClass("b1");
                      var fldTag = objFld.get(0).tagName.toLowerCase();
                      var fldType = objFld.attr("type").toLowerCase(); //alert(JSON.stringify(objFld.attr('type')));

                      if (fldType != "select-multiple")
                        var fldData = objFld.val(); //alert(fldType);
                      //alert(fldName);
                      //alert(fldData);

                      if (typeof chk.fld == "undefined") chk.fld = fldName;
                      chk.empty_err = true; // dependency validation

                      if (chk.req_dep != undefined) {
                        var dep_fldName = chk.req_dep,
                          dep_Flds = jQuery(
                            'input[name^="' +
                              dep_fldName +
                              '"],select[name^="' +
                              dep_fldName +
                              '"],textarea[name^="' +
                              dep_fldName +
                              '"]',
                            objFrm
                          ),
                          dep_fldData = chk.dep_data,
                          dep_fldType = jQuery(dep_Flds)
                            .attr("type")
                            .toLowerCase();
                        dep_fldVal = "";
                        if (dep_fldType == "checkbox" || dep_fldType == "radio")
                          dep_fldVal = jQuery(
                            'input[name^="' + dep_fldName + '"]:checked',
                            objFrm
                          ).val();
                        else if (dep_fldType == "select-multiple")
                          dep_fldVal = jQuery(
                            "select[name^='" +
                              dep_fldName +
                              "'] option:selected",
                            objFrm
                          ).length;
                        else
                          dep_fldVal = jQuery(
                            'input[name^="' +
                              dep_fldName +
                              '"],select[name^="' +
                              dep_fldName +
                              '"] option:selected',
                            objFrm
                          ).val();
                        if (dep_fldVal == "" || dep_fldVal == undefined)
                          chk.req = "No";
                        else if (
                          dep_fldData != undefined &&
                          dep_fldData != dep_fldVal
                        )
                          chk.req = "No";
                      }

                      if (chk.req == "Yes" && fldType == "tmce") {
                        var fldData = tinyMCE.get(fldName).getContent();

                        if (fldData == "" || fldData == undefined) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            chk.fld + " can not be empty"
                          );
                        } else {
                          if (chk.tmce_type == "fullpage") {
                            var fldData = fldData.match(
                              /<body[^>]*>([^<]*(?:(?!<\/?body)<[^<]*)*)<\/body\s*>/i
                            );
                            var new_fldData = fldData[1].trim();

                            if (new_fldData == "" || new_fldData == undefined) {
                              return _this.updateErrors(
                                chk,
                                fldName,
                                objFrm,
                                objFld,
                                chk.fld + " can not be empty"
                              );
                            }
                          }
                        }
                      }

                      if (
                        chk.defaultValue != undefined &&
                        fldData == chk.defaultValue
                      ) {
                        return _this.updateErrors(
                          chk,
                          fldName,
                          objFrm,
                          objFld,
                          chk.fld + " can not be empty"
                        );
                      } else if (
                        chk.req == "Yes" &&
                        AU.isEmpty(fldData) &&
                        fldType != "radio" &&
                        fldType != "checkbox" &&
                        fldType != "select-multiple"
                      ) {
                        return _this.updateErrors(
                          chk,
                          fldName,
                          objFrm,
                          objFld,
                          chk.fld + " can not be empty"
                        );
                      } else if (chk.req == "Yes" && fldType == "radio") {
                        var rValue = jQuery(
                          "input[name^='" + fldName + "']:checked",
                          objFrm
                        ).val();
                        if (rValue == undefined)
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            chk.fld + " can not be empty"
                          );
                      } else if (chk.req == "Yes" && fldType == "checkbox") {
                        var chkd = jQuery(
                          'input[name^="' + fldName + '"]:checked',
                          objFrm
                        ).length;
                        if (chkd == 0)
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Please check atleast one item for " + chk.fld
                          );
                      } else if (
                        chk.req == "Yes" &&
                        fldType == "select-multiple"
                      ) {
                        var chkd = jQuery(
                          "select[name^='" + fldName + "'] option:selected",
                          objFrm
                        ).length;
                        if (chkd == 0)
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Please check atleast one item for " + chk.fld
                          );
                      }

                      if (chk.type != undefined) {
                        chk.empty_err = false;
                        chk.err_type = chk.type;

                        if (
                          (fldType == "text" ||
                            fldType == "password" ||
                            fldType == "textarea" ||
                            fldType == "file") &&
                          !AU.isEmpty(fldData)
                        ) {
                          if (chk.type == "uname" && !AU.isUserName(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only alphabets allowed for " + chk.fld
                            );
                          }

                          if (chk.type == "alpha" && !AU.isAlpha(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only alphabets allowed for " + chk.fld
                            );
                          }

                          if (chk.type == "alpha1" && !AU.isAlpha1(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only alphabets with spaces allowed for " +
                                chk.fld
                            );
                          }

                          if (chk.type == "alpha2" && !AU.isAlpha2(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only alphabets with underscore allowed for " +
                                chk.fld
                            );
                          }

                          if (
                            chk.type == "alnum" &&
                            !AU.isAlphaNumeric(fldData)
                          ) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only alphabets and numbers are allowed for " +
                                chk.fld
                            );
                          }

                          if (chk.type == "email" && !AU.isEmail(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid characters on " + chk.fld
                            );
                          }

                          if (chk.type == "number" && !AU.isNumeric(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only numbers allowed for " + chk.fld
                            );
                          }

                          if (chk.type == "int" && !AU.isInt(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only integers allowed for " + chk.fld
                            );
                          }

                          if (chk.type == "float" && !AU.isFloat(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Only numbers allowed for " + chk.fld
                            );
                          }

                          if (chk.type == "zip" && !AU.isZip(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid " + chk.fld
                            );
                          }

                          if (chk.type == "phone" && !AU.isPhone(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid characters on " + chk.fld
                            );
                          }

                          if (chk.type == "amount" && !AU.isAmount(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid characters on " + chk.fld
                            );
                          }

                          if (chk.type == "captcha") {
                            var valid = AU.validateCaptcha(
                              "/raw/captcha/?act=validate",
                              "ccode"
                            ); //if ( valid == "true" ) { return true; }
                            //else { alert("Invalid verification code"); form.ccode.focus(); return false; }

                            if (valid != "true")
                              return _this.updateErrors(
                                chk,
                                fldName,
                                objFrm,
                                objFld,
                                "Invalid verification code " + chk.fld
                              );
                          }

                          if (chk.type == "custom") {
                            //cb = fn name
                            var callback = window[chk.cb];
                            var valid = callback();
                            if (valid == undefined || !valid)
                              return _this.updateErrors(
                                chk,
                                fldName,
                                objFrm,
                                objFld,
                                "Invalid " + chk.fld
                              );
                          }

                          if (
                            chk.type == "date" &&
                            !AU.isDate(fldData, chk.format)
                          ) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid " + chk.fld
                            );
                          }

                          if (chk.type == "url" && !AU.isURL(fldData)) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid " + chk.fld
                            );
                          }

                          if (
                            chk.type == "file" &&
                            !AU.isMime(fldData, chk.format)
                          ) {
                            return _this.updateErrors(
                              chk,
                              fldName,
                              objFrm,
                              objFld,
                              "Invalid " + chk.fld
                            );
                          }

                          if (
                            chk.type == "date" &&
                            chk.condition_check != undefined
                          ) {
                            var today = new Date();
                            var fv = jQuery(
                              'input[name^="' + chk.condition_check + '"]',
                              objFrm
                            ).val();
                            var tv = jQuery(
                              'input[name^="' + fldName + '"]',
                              objFrm
                            ).val();

                            if (tv < fv || fv == "") {
                              jQuery('input[name^="' + fldName + '"]', objFrm)
                                .focus()
                                .datepicker(
                                  "setStartDate",
                                  fv == "" ? today : fv
                                );
                              return _this.updateErrors(
                                chk,
                                fldName,
                                objFrm,
                                objFld,
                                "Invalid " + chk.fld
                              );
                            }
                          }
                        }
                      }

                      if (chk.min != undefined) {
                        chk.empty_err = false;
                        chk.err_type = "min";

                        if (
                          (fldType == "text" ||
                            fldType == "password" ||
                            fldType == "textarea") &&
                          fldData.length < chk.min &&
                          !AU.isEmpty(fldData)
                        ) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Minimum " +
                              chk.min +
                              " characters required for " +
                              chk.fld
                          );
                        } else if (
                          (fldType == "select-multiple" ||
                            fldType == "checkbox") &&
                          chkd < chk.min
                        ) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Please choose at least " +
                              chk.min +
                              " items for " +
                              chk.fld
                          );
                        }
                      }

                      if (chk.max != undefined) {
                        chk.empty_err = false;
                        chk.err_type = "max";

                        if (
                          (fldType == "text" ||
                            fldType == "password" ||
                            fldType == "textarea") &&
                          fldData.length > chk.max &&
                          !AU.isEmpty(fldData)
                        ) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Maximum " +
                              chk.max +
                              " characters only allowed for " +
                              chk.fld
                          );
                        } else if (
                          (fldType == "select-multiple" ||
                            fldType == "checkbox") &&
                          chkd > chk.max
                        ) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "You can choose maximum " +
                              chk.max +
                              " items for " +
                              chk.fld
                          );
                        }
                      }

                      if (chk.exact != undefined) {
                        chk.empty_err = false;
                        chk.err_type = "exact";

                        if (
                          (fldType == "text" ||
                            fldType == "password" ||
                            fldType == "textarea") &&
                          fldData.length != chk.exact &&
                          !AU.isEmpty(fldData)
                        ) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Require exactly " +
                              chk.exact +
                              " characters for " +
                              chk.fld
                          );
                        } else if (
                          (fldType == "select-multiple" ||
                            fldType == "checkbox") &&
                          chkd != chk.exact
                        ) {
                          return _this.updateErrors(
                            chk,
                            fldName,
                            objFrm,
                            objFld,
                            "Please choose " +
                              chk.exact +
                              " items for " +
                              chk.fld
                          );
                        }
                      }

                      _this.clearError(fldName, objFrm, objFld);
                    });
                  },
                },
                modal: function modal(e) {
                  var modalAttr = {
                    title: "Modal Box",
                    content: "Modal Content",
                    button: false,
                    href: "javascript:;",
                    iframe: false,
                    width: "100%",
                    height: 300,
                    modal_id: "#createmodal",
                    target: "ls_modal_frame",
                    overclose: "static",
                    closecb: null,
                    modalclass: "modal-lg",
                    resize: false,
                    buttonText: ["Submit", "Cancel"],
                  };
                  var title = jQuery(e).attr("data-title"),
                    content = jQuery(e).attr("data-content"),
                    button = jQuery(e).attr("data-button"),
                    href = jQuery(e).attr("href"),
                    isframe = jQuery(e).attr("data-iframe"),
                    width = jQuery(e).attr("data-width"),
                    height = jQuery(e).attr("data-height"),
                    modalId = jQuery(e).attr("data-modal-id"),
                    target = jQuery(e).attr("target"),
                    overclose = jQuery(e).attr("data-overclose");
                  closecb = jQuery(e).attr("data-closecb");
                  modalclass = jQuery(e).attr("data-modal-class");
                  (resize = jQuery(e).attr("data-resize")),
                    (buttontext = jQuery(e).attr("data-button-text"));
                  if (title != undefined) modalAttr.title = title;
                  if (content != undefined) modalAttr.content = content;
                  if (button != undefined)
                    modalAttr.button = button == "false" ? false : true;
                  if (href != undefined) modalAttr.buttonlink = href;
                  if (isframe != undefined)
                    modalAttr.iframe = isframe == "false" ? false : true;
                  if (width != undefined) modalAttr.width = width;
                  if (height != undefined) modalAttr.height = height;
                  if (modalId != undefined) modalAttr.modal_id = modalId;
                  if (target != undefined) modalAttr.target = target;
                  if (overclose != undefined) modalAttr.overclose = overclose;
                  if (closecb != undefined) modalAttr.closecb = closecb;
                  if (modalclass != undefined)
                    modalAttr.modalclass = modalclass;

                  if (
                    (typeof buttontext === "undefined"
                      ? "undefined"
                      : _typeof(buttontext)) != undefined &&
                    modalAttr.button
                  ) {
                    try {
                      var parseText = jQuery.parseJSON(buttontext);
                      if (_typeof(parseText[0]) != undefined)
                        modalAttr.buttonText[0] = parseText[0];
                      if (_typeof(parseText[1]) != undefined)
                        modalAttr.buttonText[1] = parseText[1];
                    } catch (e) {}
                  }

                  if (resize != undefined)
                    modalAttr.resize = resize == "false" ? false : true;
                  jQuery(modalAttr.modal_id)
                    .modal({
                      backdrop: modalAttr.overclose,
                      keyboard: false,
                    })
                    .on("show.bs.modal", function (event) {
                      jQuery(".ls_frame_loader").show();
                    })
                    .on("shown.bs.modal", function (event) {
                      var modal = jQuery(this); // change title

                      modal.find(".modal-title").html(modalAttr.title); // change content

                      if (modalAttr.iframe == false) {
                        if (jQuery(modalAttr.content).length > 0)
                          modal
                            .find(".modal-body")
                            .html(jQuery(modalAttr.content).html());
                        else modal.find(".modal-body").html(modalAttr.content);
                      } // show buttons

                      if (
                        modalAttr.button == true ||
                        modalAttr.button == undefined
                      ) {
                        modal
                          .find(".modal-footer a.sucessbtn")
                          .attr("href", modalAttr.buttonlink);
                        if (
                          modal
                            .find(".modal-footer a.closebtn")
                            .hasClass("hide") &&
                          modalAttr.button == true
                        )
                          modal
                            .find(".modal-footer a.closebtn")
                            .removeClass("hide");

                        if (modalAttr.buttonText != undefined) {
                          modal
                            .find(".modal-footer a.sucessbtn")
                            .html(modalAttr.buttonText[0]);
                          modal
                            .find(".modal-footer a.closebtn")
                            .html(modalAttr.buttonText[1]);
                        }
                      } else {
                        modal
                          .find(".modal-footer a.sucessbtn")
                          .addClass("hide");
                      } // increse modal size

                      if (width != undefined)
                        modal.find(".modal-dialog").css({
                          width: Number(width) + 50,
                          height: "auto",
                        }); // close call back function

                      if (modalAttr.closecb != null)
                        modal
                          .find(".ls_modal_close")
                          .attr("onClick", modalAttr.closecb);
                      /*
        if (height != undefined)
              modal.find('.modal-dialog').css({height:(Number(height)+50)});
        */

                      if (modalAttr.modalclass != undefined)
                        modal
                          .find(".modal-dialog")
                          .removeClass("modal-sm modal-md modal-lg")
                          .addClass(modalAttr.modalclass);
                    })
                    .on("hidden.bs.modal", function (event) {
                      var modal = jQuery(this);
                      jQuery(".sucessbtn").removeClass("hide");
                      if (ls_current_theme == undefined)
                        var loader_path = "/adminlte/images/loader3.gif";
                      else
                        var loader_path =
                          "/theme/" + ls_current_theme + "/images/loader3.gif";
                      modal
                        .find(".modal-body")
                        .html(
                          '<div class="pre_loader ls_frame_loader"><img src="' +
                            loader_path +
                            '" alt="loading gif"/></div><iframe id="' +
                            modalAttr.target +
                            '" name="' +
                            modalAttr.target +
                            '" src=""  frameborder="0" allowtransparency="true"></iframe>'
                        );
                      modalAttr = {};
                    }); // loader hide after iframe loaded.

                  if (modalAttr.iframe) {
                    jQuery("#" + modalAttr.target).attr({
                      width: modalAttr.width,
                      height: modalAttr.height,
                    });
                    jQuery("#" + modalAttr.target).on("load", function () {
                      jQuery(".ls_frame_loader").hide();
                      var iFrameID = document.getElementById(modalAttr.target);

                      if (iFrameID && modalAttr.resize == true) {
                        iFrameID.height = "";
                        iFrameID.height =
                          iFrameID.contentWindow.document.body.scrollHeight +
                          "px";
                      }
                    });
                  }

                  return false;
                },
                goBack: function goBack(url) {
                  if (url == undefined) history.go(-1);
                  else window.location = url;
                },
                goTo: function goTo(url, top) {
                  if (top == undefined) window.location = url;
                  else if (top == true) window.top.location = url;
                },
                delAlert: function delAlert(url, msg) {
                  msg = msg ? msg : "Are you sure to delete?";

                  if (confirm(msg)) {
                    this.goTo(url);
                  } else {
                    return false;
                  }
                },
                //getURL(hash|host|hostname|href|pathname|port|protocol|search|uri)
                getURL: function getURL(what) {
                  url = document.location;
                  if (what != undefined && what != "uri")
                    return eval("document.location." + what);
                  else if (what == "uri") return url.pathname + url.search;
                  else return document.location;
                },
                getParam: function getParam(key) {
                  var strQS = unescape(document.location.search);
                  var re = new RegExp("(" + key + "=){1}[^&]*", "ig");
                  x = strQS.match(re);

                  if (x != null) {
                    y = x.toString().split("=");
                    return y[1];
                  }

                  return x;
                },
                popUp: function popUp(
                  url,
                  win_name,
                  width,
                  height,
                  resize,
                  scroll,
                  top,
                  left
                ) {
                  popWin = window.open(
                    url,
                    win_name,
                    "toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=" +
                      (!resize ? "yes" : resize) +
                      ", copyhistory=no, scrollbars=" +
                      (!scroll ? "yes" : scroll) +
                      ", width=" +
                      (!width ? "400" : width) +
                      ", height=" +
                      (!height ? "300" : height) +
                      ", top=" +
                      (!top ? "50" : top) +
                      ", left=" +
                      (!left ? "50" : left)
                  );
                  popWin.focus();
                },
                openTarget: function openTarget(
                  form,
                  windowName,
                  width,
                  height,
                  resize,
                  scroll,
                  top,
                  left
                ) {
                  form.target = windowName;
                  this.popUp(
                    "",
                    windowName,
                    width,
                    height,
                    resize,
                    scroll,
                    top,
                    left
                  );
                },
                //random bet'n 0 and x
                random: function random(x) {
                  return Math.floor(x * (Math.random() % 1));
                },
                randomBetween: function randomBetween(minV, maxV) {
                  return minV + this.random(maxV - minV + 1);
                },
                shuffle: function shuffle(arr) {
                  for (
                    var j, x, i = arr.length;
                    i;
                    j = parseInt(Math.random() * i),
                      x = arr[--i],
                      arr[i] = arr[j],
                      arr[j] = x
                  ) {}

                  return arr;
                },
                round: function round(number, x) {
                  x = !x ? 2 : x;
                  return Math.round(number * Math.pow(10, x)) / Math.pow(10, x);
                },
                isEmpty: function isEmpty(input) {
                  data = jQuery.trim(input);

                  if (data.length > 0) {
                    return false;
                  }

                  return true;
                },
                isAlpha: function isAlpha(input) {
                  return /^[a-zA-Z]+jQuery/.test(input);
                },
                isAlpha1: function isAlpha1(input) {
                  return /^[a-zA-Z ]+jQuery/.test(input);
                },
                isAlpha2: function isAlpha2(input) {
                  return /^[a-zA-Z_]+jQuery/.test(input);
                },
                isNumeric: function isNumeric(input) {
                  return /^[0-9]+jQuery/.test(input);
                },
                isAlphaNumeric: function isAlphaNumeric(input) {
                  return /^[a-zA-Z0-9 ]+jQuery/.test(input);
                },
                isUserName: function isUserName(input) {
                  return /^[a-zA-Z0-9\.\-_]+jQuery/.test(input);
                },
                isPhone: function isPhone(input) {
                  return /^[0-9-()+]+$/.test(input);
                },
                isEmail: function isEmail(input) {
                  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input);
                },
                isAmount: function isAmount(input) {
                  return /^[0-9]+(\.\d{2})?jQuery/i.test(input);
                },
                isPositiveInt: function isPositiveInt(input) {
                  if (parseInt(input) > 0) {
                    return true;
                  }

                  return false;
                },
                isPositiveFloat: function isPositiveFloat(input) {
                  return (
                    this.isNotNegativeFloat(input) && parseFloat(input) > 0
                  );
                },
                isNotNegativeFloat: function isNotNegativeFloat(input) {
                  return /^[0-9]*[.]{0,1}[0-9]*jQuery/.test(input);
                },
                isNotNegativeInt: function isNotNegativeInt(input) {
                  return /^[0-9]*jQuery/.test(input);
                },
                isZip: function isZip(input) {
                  patZip = eval("/^[0-9a-z- ]*jQuery/ig");
                  return patZip.test(input);
                },
                isPeriod: function isPeriod(input) {
                  return /^[1-9][0-9]{2}jQuery/.test(input);
                },
                isFloat: function isFloat(input) {
                  return /^[\-\+]{0,1}[0-9]*[.]{0,1}[0-9]*jQuery/.test(input);
                },
                isInt: function isInt(input) {
                  i = parseInt(input);

                  if (i > 0 || i == 0 || i < 0) {
                    return true;
                  }

                  return false;
                },
                isSpace: function isSpace(input) {
                  return /^[ ]+jQuery/.test(input);
                },
                itemsChecked: function itemsChecked(objElt) {
                  alert(objElt);
                  var a = 0;
                  var x = objElt.length;

                  for (var i = 0; i < x; i++) {
                    if (objElt[i].checked) {
                      a++;
                    }
                  }

                  return a;
                },
                itemSelected: function itemSelected(objElt) {
                  var objSI = objElt.options.selectedIndex;
                  if (objSI == 0 || objSI == -1) return false;
                  return true;
                },
                itemsSelected: function itemsSelected(objElt) {
                  var a = 0;
                  var x = objElt.length;

                  for (var i = 0; i < x; i++) {
                    if (objElt.options[i].selected) {
                      a++;
                    }
                  }

                  return a;
                },
                itemSelectedData: function itemSelectedData(objElt, mode) {
                  return mode == "value"
                    ? objElt.value
                    : objElt.options[objElt.selectedIndex].text;
                },
                radioValue: function radioValue(objElt) {
                  var x = null;
                  var n = objElt.length;

                  for (var i = 0; i < n; i++) {
                    if (objElt[i].checked) {
                      x = objElt[i].value;
                      break;
                    }
                  }

                  return x;
                },
                checkAll: function checkAll(chk, objElt) {
                  var n = objElt.length;

                  for (i = 0; i < n; i++) {
                    objElt[i].checked = chk.checked;
                  }
                },
                transfer: function transfer(fromId, toId, srcSelected) {
                  !jQuery("#" + fromId + " option:selected")
                    .remove()
                    .appendTo(jQuery("#" + toId));

                  if (srcSelected != undefined) {
                    jQuery("#" + fromId)
                      .children("option")
                      .attr("selected", true);
                  }

                  return true;
                },
                moveUp: function moveUp(eltId) {
                  var oSel = jQuery("#" + eltId);

                  if (oSel.attr("selectedIndex") != -1) {
                    jQuery("option:selected", oSel).each(function () {
                      jQuery(this).insertBefore(jQuery(this).prev());
                    });
                    oSel.children("option").attr("selected", true);
                  } else alert("Please select an item");

                  oSel.focus();
                },
                moveDown: function moveDown(eltId) {
                  var oSel = jQuery("#" + eltId);

                  if (oSel.attr("selectedIndex") != -1) {
                    var eleValue = jQuery("option:selected:last", oSel).next();
                    jQuery("option:selected", oSel).each(function () {
                      jQuery(this).insertAfter(eleValue);
                      eleValue = jQuery(eleValue).next();
                    });
                    oSel.children("option").attr("selected", true);
                  } else alert("Please select an item");

                  oSel.focus();
                },
                validateCaptcha: function validateCaptcha(chkUrl, cCode) {
                  qdata = jQuery("#" + cCode).val();
                  return jQuery.ajax({
                    type: "GET",
                    url: chkUrl,
                    data: "qd=" + qdata,
                    cache: false,
                    async: false,
                  }).responseText;
                },
                formatMoney: function formatMoney(amount) {
                  var i = parseFloat(amount);

                  if (isNaN(i)) {
                    i = 0.0;
                  }

                  var minus = "";

                  if (i < 0) {
                    minus = "-";
                  }

                  i = Math.abs(i);
                  i = parseInt((i + 0.005) * 100);
                  i = i / 100;
                  s = new String(i);

                  if (s.indexOf(".") < 0) {
                    s += ".00";
                  }

                  if (s.indexOf(".") == s.length - 2) {
                    s += "0";
                  }

                  s = minus + s;
                  return s;
                },
                setCookie: function setCookie(
                  cookieName,
                  cookieValue,
                  lifeTime,
                  path,
                  domain,
                  isSecure
                ) {
                  if (!cookieName) {
                    return false;
                  }

                  lifeTime = lifeTime == undefined ? 0 : lifeTime;
                  path = path == undefined ? "/" : path;
                  domain = domain == undefined ? "" : domain;
                  isSecure = isSecure == undefined ? "" : isSecure;
                  life_time = lifeTime * 24 * 60 * 60 * 1000;
                  document.cookie =
                    encodeURIComponent(cookieName) +
                    "=" +
                    encodeURIComponent(cookieValue) +
                    (lifeTime
                      ? ";expires=" +
                        new Date(new Date().getTime() + life_time).toGMTString()
                      : "") +
                    (";path=" + path) +
                    (";domain=" + domain) +
                    (isSecure ? ";secure" : "");
                },
                getCookie: function getCookie(cookieName) {
                  var cookieJar = document.cookie.split("; ");

                  for (var x = 0; x < cookieJar.length; x++) {
                    var arrCookie = cookieJar[x].split("=");

                    if (
                      arrCookie[0].toString() == decodeURIComponent(cookieName)
                    ) {
                      return decodeURIComponent(arrCookie[1]);
                    }
                  }

                  return null;
                },
                setNoImage: function setNoImage() {
                  jQuery("img").one("error", function (e) {
                    if (jQuery(this).attr("data-noimage")) {
                      jQuery(this)
                        .unbind("error")
                        .attr("src", jQuery(this).attr("data-noimage"));
                    }
                  });
                },
                showMessage: function showMessage(ele, msg, type, cls) {
                  var types = type == 1 ? "alert-success" : "alert-danger";
                  var classname = cls == undefined ? "" : cls;
                  jQuery(ele)
                    .html(
                      "<div class='alert " +
                        classname +
                        " " +
                        types +
                        ' alert-dismissible\'><button aria-hidden="true" data-dismiss="alert" class="close" type="button">x</button>' +
                        msg +
                        "</div>"
                    )
                    .show();
                },
                move_top: function move_top(el, p) {
                  jQuery("html, body").animate(
                    {
                      scrollTop: jQuery(el).offset().top - p,
                    },
                    1000
                  );
                  return;
                },
                extend: function extend(coreobj, extobj, jsmerge) {
                  jsmerge = jsmerge == undefined ? true : jsmerge;
                  var retobject = jQuery.extend(jsmerge, coreobj, extobj);
                  return retobject;
                },
                reload: function reload(ele) {
                  if (ele == undefined || ele == "false")
                    window.location.reload();
                  else parent.window.location.reload();
                  return;
                },
                isDate: function isDate(input, df) {
                  var validdate = false;
                  if (df == undefined || df == "yyyy-mm-dd" || df == "")
                    return /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?jQuery/.test(
                      input
                    );
                  else if (df == "yyyy/mm/dd")
                    return /^\d{4}\/((0\d)|(1[012]))\/(([012]\d)|3[01])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?jQuery/.test(
                      input
                    );
                  else if (df == "dd-mm-yyyy")
                    return /^(([012]\d)|3[01])-((0\d)|(1[012]))-\d{4}(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?jQuery/.test(
                      input
                    );
                  else if (df == "dd/mm/yyyy")
                    return /^(([012]\d)|3[01])\/((0\d)|(1[012]))\/\d{4}(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?jQuery/.test(
                      input
                    );
                  else if (df == "mm-dd-yyyy")
                    return /^((0\d)|(1[012]))-(([012]\d)|3[01])-\d{4}(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?jQuery/.test(
                      input
                    );
                  else if (df == "mm/dd/yyyy")
                    return /^((0\d)|(1[012]))\/(([012]\d)|3[01])\/\d{4}(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?jQuery/.test(
                      input
                    );
                  return false;
                },
                isURL: function isURL(input) {
                  return /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})jQuery/.test(
                    input
                  );
                },
                isMime: function isMime(input, imgf) {
                  var valid_ext =
                    "bmp|gif|jpg|jpeg|png|tiff|psd|doc|docx|txt|pdf|xlsx|xls|xml|csv";
                  var img_ext =
                    imgf == undefined || imgf == "" ? valid_ext : imgf;
                  var regex = new RegExp(".(" + img_ext + ")jQuery", "i");
                  return regex.test(input);
                },
                highlightMenu: function highlightMenu(menuclass) {
                  if (menuclass == undefined) menuclass = ".ls_main_menu";
                  var pathname = window.location.pathname;
                  var active_menu = jQuery(
                    menuclass + ' a[href="' + pathname + '"]'
                  ).attr("data-pm");
                  if (
                    jQuery(".ls_menu_" + active_menu).length > 0 &&
                    active_menu != undefined
                  )
                    jQuery(".ls_menu_" + active_menu).addClass("active");
                },
                urlParam: function urlParam(name, url) {
                  if (url == undefined) url = unescape(window.location.href);
                  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
                    url
                  );
                  if (results == null) return null;
                  else return results[1] || 0;
                },
                ajaxError: function ajaxError() {
                  jQuery(document).ajaxError(function (
                    evt,
                    jqXHR,
                    settings,
                    err
                  ) {
                    jQuery(".ls_overlay").addClass("hide");
                    jQuery(this).attr("data-title", "Internal Error");
                    jQuery(this).attr("data-content", jqXHR.responseText);
                    AU.modal(this);
                  });
                },
                openTab: function openTab() {
                  var url = document.location.toString();

                  if (url.match("#")) {
                    var hashdata = url.split("#")[1];
                    if (hashdata.split("/")[0] != undefined)
                      jQuery(
                        '.nav-tabs a[href="#' + hashdata.split("/")[0] + '"]'
                      ).tab("show");
                    if (hashdata.split("/")[1] != undefined)
                      jQuery("#" + hashdata.replace("/", "_")).addClass("in");
                  }

                  return;
                },
                trackGAEvent: function trackGAEvent(str) {
                  if (
                    str == "" ||
                    str == undefined ||
                    (typeof ls_track_ge === "undefined"
                      ? "undefined"
                      : _typeof(ls_track_ge)) == undefined ||
                    typeof ls_track_ge == "undefined"
                  )
                    return false;
                  var params = str.split("-");
                  var eventCategory = params[0] == undefined ? "" : params[0],
                    eventAction = params[1] == undefined ? "" : params[1],
                    el = params[2] == undefined ? "" : params[2],
                    ev = params[3] == undefined ? URL.uri : params[3];
                  eventLabel = el + "@" + ev;
                  ga("send", "event", eventCategory, eventAction, eventLabel);
                  return false;
                },
                resetForm: function resetForm(formId) {
                  jQuery(formId)
                    .find("input[type=text], textarea, select")
                    .val("");
                  jQuery("span[id^='msg_'], span.vErrMsg", jQuery(formId))
                    .removeClass("field_error")
                    .empty();
                  jQuery(formId).find("label").removeClass("error");
                },
                welcome: function welcome() {
                  console.log("App Utils Working");
                },
              };
              returnObj.localstorage = {
                set: function set(key, value) {
                  if (typeof Storage !== "undefined") {
                    localStorage.setItem(key, value);
                  } else {
                    console.log("Local Storage not supported");
                  }
                },
                get: function get(key) {
                  return localStorage.getItem(key);
                },
                remove: function remove(key) {
                  localStorage.removeItem(key);
                },
                clear: function clear() {
                  localStorage.clear();
                },
              };
              return returnObj;
            })();
        module.exports = AU;
        jQuery(document).ready(function () {
          //console.log("app_utils loadeed");
          jQuery(".vForm").validator({
            action: "load",
          });
          AU.ajaxError();
        });

        /***/
      },

    /***/ "./resources/sass/app.scss":
      /*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin

        /***/
      },

    /***/ "./resources/sass/styles.scss":
      /*!************************************!*\
  !*** ./resources/sass/styles.scss ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/chunk loaded */
  /******/ (() => {
    /******/ var deferred = [];
    /******/ __webpack_require__.O = (result, chunkIds, fn, priority) => {
      /******/ if (chunkIds) {
        /******/ priority = priority || 0;
        /******/ for (
          var i = deferred.length;
          i > 0 && deferred[i - 1][2] > priority;
          i--
        )
          deferred[i] = deferred[i - 1];
        /******/ deferred[i] = [chunkIds, fn, priority];
        /******/ return;
        /******/
      }
      /******/ var notFulfilled = Infinity;
      /******/ for (var i = 0; i < deferred.length; i++) {
        /******/ var [chunkIds, fn, priority] = deferred[i];
        /******/ var fulfilled = true;
        /******/ for (var j = 0; j < chunkIds.length; j++) {
          /******/ if (
            (priority & (1 === 0) || notFulfilled >= priority) &&
            Object.keys(__webpack_require__.O).every((key) =>
              __webpack_require__.O[key](chunkIds[j])
            )
          ) {
            /******/ chunkIds.splice(j--, 1);
            /******/
          } else {
            /******/ fulfilled = false;
            /******/ if (priority < notFulfilled) notFulfilled = priority;
            /******/
          }
          /******/
        }
        /******/ if (fulfilled) {
          /******/ deferred.splice(i--, 1);
          /******/ var r = fn();
          /******/ if (r !== undefined) result = r;
          /******/
        }
        /******/
      }
      /******/ return result;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/jsonp chunk loading */
  /******/ (() => {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded and loading chunks
    /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    /******/ var installedChunks = {
      /******/ "/assets/js/app": 0,
      /******/ "assets/css/app": 0,
      /******/ "assets/css/style": 0,
      /******/
    };
    /******/
    /******/ // no chunk on demand loading
    /******/
    /******/ // no prefetching
    /******/
    /******/ // no preloaded
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
    /******/ __webpack_require__.O.j = (chunkId) =>
      installedChunks[chunkId] === 0;
    /******/
    /******/ // install a JSONP callback for chunk loading
    /******/ var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      /******/ var [chunkIds, moreModules, runtime] = data;
      /******/ // add "moreModules" to the modules object,
      /******/ // then flag all "chunkIds" as loaded and fire callback
      /******/ var moduleId,
        chunkId,
        i = 0;
      /******/ if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        /******/ for (moduleId in moreModules) {
          /******/ if (__webpack_require__.o(moreModules, moduleId)) {
            /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
            /******/
          }
          /******/
        }
        /******/ if (runtime) var result = runtime(__webpack_require__);
        /******/
      }
      /******/ if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      /******/ for (; i < chunkIds.length; i++) {
        /******/ chunkId = chunkIds[i];
        /******/ if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          /******/ installedChunks[chunkId][0]();
          /******/
        }
        /******/ installedChunks[chunkId] = 0;
        /******/
      }
      /******/ return __webpack_require__.O(result);
      /******/
    };
    /******/
    /******/ var chunkLoadingGlobal = (self["webpackChunk"] =
      self["webpackChunk"] || []);
    /******/ chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    /******/ chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module depends on other loaded chunks and execution need to be delayed
  /******/ __webpack_require__.O(
    undefined,
    ["assets/css/app", "assets/css/style"],
    () => __webpack_require__("./resources/js/app.js")
  );
  /******/ __webpack_require__.O(
    undefined,
    ["assets/css/app", "assets/css/style"],
    () => __webpack_require__("./resources/sass/app.scss")
  );
  /******/ var __webpack_exports__ = __webpack_require__.O(
    undefined,
    ["assets/css/app", "assets/css/style"],
    () => __webpack_require__("./resources/sass/styles.scss")
  );
  /******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
  /******/
  /******/
})();
/*!
 * Bootstrap v4.6.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
          {}),
        t.jQuery
      );
})(this, function (t, e) {
  "use strict";
  function n(t) {
    return t && "object" == typeof t && "default" in t ? t : { default: t };
  }
  var i = n(e);
  function o(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function r(t, e, n) {
    return e && o(t.prototype, e), n && o(t, n), t;
  }
  function a() {
    return (a =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }).apply(this, arguments);
  }
  function s(t) {
    var e = this,
      n = !1;
    return (
      i.default(this).one(l.TRANSITION_END, function () {
        n = !0;
      }),
      setTimeout(function () {
        n || l.triggerTransitionEnd(e);
      }, t),
      this
    );
  }
  var l = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      do {
        t += ~~(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var e = i.default(t).css("transition-duration"),
        n = i.default(t).css("transition-delay"),
        o = parseFloat(e),
        r = parseFloat(n);
      return o || r
        ? ((e = e.split(",")[0]),
          (n = n.split(",")[0]),
          1e3 * (parseFloat(e) + parseFloat(n)))
        : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      i.default(t).trigger("transitionend");
    },
    supportsTransitionEnd: function () {
      return Boolean("transitionend");
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, n) {
      for (var i in n)
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
            r = e[i],
            a =
              r && l.isElement(r)
                ? "element"
                : null === (s = r) || "undefined" == typeof s
                ? "" + s
                : {}.toString
                    .call(s)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
          if (!new RegExp(o).test(a))
            throw new Error(
              t.toUpperCase() +
                ': Option "' +
                i +
                '" provided type "' +
                a +
                '" but expected type "' +
                o +
                '".'
            );
        }
      var s;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? l.findShadowRoot(t.parentNode)
        : null;
    },
    jQueryDetection: function () {
      if ("undefined" == typeof i.default)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = i.default.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        t[0] >= 4
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    },
  };
  l.jQueryDetection(),
    (i.default.fn.emulateTransitionEnd = s),
    (i.default.event.special[l.TRANSITION_END] = {
      bindType: "transitionend",
      delegateType: "transitionend",
      handle: function (t) {
        if (i.default(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var u = "alert",
    f = i.default.fn[u],
    d = (function () {
      function t(t) {
        this._element = t;
      }
      var e = t.prototype;
      return (
        (e.close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
              this._removeElement(e);
        }),
        (e.dispose = function () {
          i.default.removeData(this._element, "bs.alert"),
            (this._element = null);
        }),
        (e._getRootElement = function (t) {
          var e = l.getSelectorFromElement(t),
            n = !1;
          return (
            e && (n = document.querySelector(e)),
            n || (n = i.default(t).closest(".alert")[0]),
            n
          );
        }),
        (e._triggerCloseEvent = function (t) {
          var e = i.default.Event("close.bs.alert");
          return i.default(t).trigger(e), e;
        }),
        (e._removeElement = function (t) {
          var e = this;
          if (
            (i.default(t).removeClass("show"), i.default(t).hasClass("fade"))
          ) {
            var n = l.getTransitionDurationFromElement(t);
            i.default(t)
              .one(l.TRANSITION_END, function (n) {
                return e._destroyElement(t, n);
              })
              .emulateTransitionEnd(n);
          } else this._destroyElement(t);
        }),
        (e._destroyElement = function (t) {
          i.default(t).detach().trigger("closed.bs.alert").remove();
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this),
              o = n.data("bs.alert");
            o || ((o = new t(this)), n.data("bs.alert", o)),
              "close" === e && o[e](this);
          });
        }),
        (t._handleDismiss = function (t) {
          return function (e) {
            e && e.preventDefault(), t.close(this);
          };
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on(
      "click.bs.alert.data-api",
      '[data-dismiss="alert"]',
      d._handleDismiss(new d())
    ),
    (i.default.fn[u] = d._jQueryInterface),
    (i.default.fn[u].Constructor = d),
    (i.default.fn[u].noConflict = function () {
      return (i.default.fn[u] = f), d._jQueryInterface;
    });
  var c = i.default.fn.button,
    h = (function () {
      function t(t) {
        (this._element = t), (this.shouldAvoidTriggerChange = !1);
      }
      var e = t.prototype;
      return (
        (e.toggle = function () {
          var t = !0,
            e = !0,
            n = i.default(this._element).closest('[data-toggle="buttons"]')[0];
          if (n) {
            var o = this._element.querySelector('input:not([type="hidden"])');
            if (o) {
              if ("radio" === o.type)
                if (o.checked && this._element.classList.contains("active"))
                  t = !1;
                else {
                  var r = n.querySelector(".active");
                  r && i.default(r).removeClass("active");
                }
              t &&
                (("checkbox" !== o.type && "radio" !== o.type) ||
                  (o.checked = !this._element.classList.contains("active")),
                this.shouldAvoidTriggerChange ||
                  i.default(o).trigger("change")),
                o.focus(),
                (e = !1);
            }
          }
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (e &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains("active")
              ),
            t && i.default(this._element).toggleClass("active"));
        }),
        (e.dispose = function () {
          i.default.removeData(this._element, "bs.button"),
            (this._element = null);
        }),
        (t._jQueryInterface = function (e, n) {
          return this.each(function () {
            var o = i.default(this),
              r = o.data("bs.button");
            r || ((r = new t(this)), o.data("bs.button", r)),
              (r.shouldAvoidTriggerChange = n),
              "toggle" === e && r[e]();
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
      var e = t.target,
        n = e;
      if (
        (i.default(e).hasClass("btn") || (e = i.default(e).closest(".btn")[0]),
        !e || e.hasAttribute("disabled") || e.classList.contains("disabled"))
      )
        t.preventDefault();
      else {
        var o = e.querySelector('input:not([type="hidden"])');
        if (
          o &&
          (o.hasAttribute("disabled") || o.classList.contains("disabled"))
        )
          return void t.preventDefault();
        ("INPUT" !== n.tagName && "LABEL" === e.tagName) ||
          h._jQueryInterface.call(
            i.default(e),
            "toggle",
            "INPUT" === n.tagName
          );
      }
    })
    .on(
      "focus.bs.button.data-api blur.bs.button.data-api",
      '[data-toggle^="button"]',
      function (t) {
        var e = i.default(t.target).closest(".btn")[0];
        i.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type));
      }
    ),
    i.default(window).on("load.bs.button.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-toggle="buttons"] .btn')
          ),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = t[e],
          o = i.querySelector('input:not([type="hidden"])');
        o.checked || o.hasAttribute("checked")
          ? i.classList.add("active")
          : i.classList.remove("active");
      }
      for (
        var r = 0,
          a = (t = [].slice.call(
            document.querySelectorAll('[data-toggle="button"]')
          )).length;
        r < a;
        r++
      ) {
        var s = t[r];
        "true" === s.getAttribute("aria-pressed")
          ? s.classList.add("active")
          : s.classList.remove("active");
      }
    }),
    (i.default.fn.button = h._jQueryInterface),
    (i.default.fn.button.Constructor = h),
    (i.default.fn.button.noConflict = function () {
      return (i.default.fn.button = c), h._jQueryInterface;
    });
  var p = "carousel",
    m = ".bs.carousel",
    g = i.default.fn[p],
    v = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    _ = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    b = { TOUCH: "touch", PEN: "pen" },
    y = (function () {
      function t(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(
            ".carousel-indicators"
          )),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var e = t.prototype;
      return (
        (e.next = function () {
          this._isSliding || this._slide("next");
        }),
        (e.nextWhenVisible = function () {
          var t = i.default(this._element);
          !document.hidden &&
            t.is(":visible") &&
            "hidden" !== t.css("visibility") &&
            this.next();
        }),
        (e.prev = function () {
          this._isSliding || this._slide("prev");
        }),
        (e.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector(
              ".carousel-item-next, .carousel-item-prev"
            ) && (l.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (e.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._updateInterval(),
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              )));
        }),
        (e.to = function (t) {
          var e = this;
          this._activeElement = this._element.querySelector(
            ".active.carousel-item"
          );
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              i.default(this._element).one("slid.bs.carousel", function () {
                return e.to(t);
              });
            else {
              if (n === t) return this.pause(), void this.cycle();
              var o = t > n ? "next" : "prev";
              this._slide(o, this._items[t]);
            }
        }),
        (e.dispose = function () {
          i.default(this._element).off(m),
            i.default.removeData(this._element, "bs.carousel"),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (e._getConfig = function (t) {
          return (t = a({}, v, t)), l.typeCheckConfig(p, t, _), t;
        }),
        (e._handleSwipe = function () {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= 40)) {
            var e = t / this.touchDeltaX;
            (this.touchDeltaX = 0), e > 0 && this.prev(), e < 0 && this.next();
          }
        }),
        (e._addEventListeners = function () {
          var t = this;
          this._config.keyboard &&
            i.default(this._element).on("keydown.bs.carousel", function (e) {
              return t._keydown(e);
            }),
            "hover" === this._config.pause &&
              i
                .default(this._element)
                .on("mouseenter.bs.carousel", function (e) {
                  return t.pause(e);
                })
                .on("mouseleave.bs.carousel", function (e) {
                  return t.cycle(e);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (e._addTouchEventListeners = function () {
          var t = this;
          if (this._touchSupported) {
            var e = function (e) {
                t._pointerEvent && b[e.originalEvent.pointerType.toUpperCase()]
                  ? (t.touchStartX = e.originalEvent.clientX)
                  : t._pointerEvent ||
                    (t.touchStartX = e.originalEvent.touches[0].clientX);
              },
              n = function (e) {
                t._pointerEvent &&
                  b[e.originalEvent.pointerType.toUpperCase()] &&
                  (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                  t._handleSwipe(),
                  "hover" === t._config.pause &&
                    (t.pause(),
                    t.touchTimeout && clearTimeout(t.touchTimeout),
                    (t.touchTimeout = setTimeout(function (e) {
                      return t.cycle(e);
                    }, 500 + t._config.interval)));
              };
            i
              .default(this._element.querySelectorAll(".carousel-item img"))
              .on("dragstart.bs.carousel", function (t) {
                return t.preventDefault();
              }),
              this._pointerEvent
                ? (i
                    .default(this._element)
                    .on("pointerdown.bs.carousel", function (t) {
                      return e(t);
                    }),
                  i
                    .default(this._element)
                    .on("pointerup.bs.carousel", function (t) {
                      return n(t);
                    }),
                  this._element.classList.add("pointer-event"))
                : (i
                    .default(this._element)
                    .on("touchstart.bs.carousel", function (t) {
                      return e(t);
                    }),
                  i
                    .default(this._element)
                    .on("touchmove.bs.carousel", function (e) {
                      return (function (e) {
                        e.originalEvent.touches &&
                        e.originalEvent.touches.length > 1
                          ? (t.touchDeltaX = 0)
                          : (t.touchDeltaX =
                              e.originalEvent.touches[0].clientX -
                              t.touchStartX);
                      })(e);
                    }),
                  i
                    .default(this._element)
                    .on("touchend.bs.carousel", function (t) {
                      return n(t);
                    }));
          }
        }),
        (e._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next();
            }
        }),
        (e._getItemIndex = function (t) {
          return (
            (this._items =
              t && t.parentNode
                ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item"))
                : []),
            this._items.indexOf(t)
          );
        }),
        (e._getItemByDirection = function (t, e) {
          var n = "next" === t,
            i = "prev" === t,
            o = this._getItemIndex(e),
            r = this._items.length - 1;
          if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
            return e;
          var a = (o + ("prev" === t ? -1 : 1)) % this._items.length;
          return -1 === a
            ? this._items[this._items.length - 1]
            : this._items[a];
        }),
        (e._triggerSlideEvent = function (t, e) {
          var n = this._getItemIndex(t),
            o = this._getItemIndex(
              this._element.querySelector(".active.carousel-item")
            ),
            r = i.default.Event("slide.bs.carousel", {
              relatedTarget: t,
              direction: e,
              from: o,
              to: n,
            });
          return i.default(this._element).trigger(r), r;
        }),
        (e._setActiveIndicatorElement = function (t) {
          if (this._indicatorsElement) {
            var e = [].slice.call(
              this._indicatorsElement.querySelectorAll(".active")
            );
            i.default(e).removeClass("active");
            var n = this._indicatorsElement.children[this._getItemIndex(t)];
            n && i.default(n).addClass("active");
          }
        }),
        (e._updateInterval = function () {
          var t =
            this._activeElement ||
            this._element.querySelector(".active.carousel-item");
          if (t) {
            var e = parseInt(t.getAttribute("data-interval"), 10);
            e
              ? ((this._config.defaultInterval =
                  this._config.defaultInterval || this._config.interval),
                (this._config.interval = e))
              : (this._config.interval =
                  this._config.defaultInterval || this._config.interval);
          }
        }),
        (e._slide = function (t, e) {
          var n,
            o,
            r,
            a = this,
            s = this._element.querySelector(".active.carousel-item"),
            u = this._getItemIndex(s),
            f = e || (s && this._getItemByDirection(t, s)),
            d = this._getItemIndex(f),
            c = Boolean(this._interval);
          if (
            ("next" === t
              ? ((n = "carousel-item-left"),
                (o = "carousel-item-next"),
                (r = "left"))
              : ((n = "carousel-item-right"),
                (o = "carousel-item-prev"),
                (r = "right")),
            f && i.default(f).hasClass("active"))
          )
            this._isSliding = !1;
          else if (
            !this._triggerSlideEvent(f, r).isDefaultPrevented() &&
            s &&
            f
          ) {
            (this._isSliding = !0),
              c && this.pause(),
              this._setActiveIndicatorElement(f),
              (this._activeElement = f);
            var h = i.default.Event("slid.bs.carousel", {
              relatedTarget: f,
              direction: r,
              from: u,
              to: d,
            });
            if (i.default(this._element).hasClass("slide")) {
              i.default(f).addClass(o),
                l.reflow(f),
                i.default(s).addClass(n),
                i.default(f).addClass(n);
              var p = l.getTransitionDurationFromElement(s);
              i.default(s)
                .one(l.TRANSITION_END, function () {
                  i
                    .default(f)
                    .removeClass(n + " " + o)
                    .addClass("active"),
                    i.default(s).removeClass("active " + o + " " + n),
                    (a._isSliding = !1),
                    setTimeout(function () {
                      return i.default(a._element).trigger(h);
                    }, 0);
                })
                .emulateTransitionEnd(p);
            } else
              i.default(s).removeClass("active"),
                i.default(f).addClass("active"),
                (this._isSliding = !1),
                i.default(this._element).trigger(h);
            c && this.cycle();
          }
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this).data("bs.carousel"),
              o = a({}, v, i.default(this).data());
            "object" == typeof e && (o = a({}, o, e));
            var r = "string" == typeof e ? e : o.slide;
            if (
              (n ||
                ((n = new t(this, o)), i.default(this).data("bs.carousel", n)),
              "number" == typeof e)
            )
              n.to(e);
            else if ("string" == typeof r) {
              if ("undefined" == typeof n[r])
                throw new TypeError('No method named "' + r + '"');
              n[r]();
            } else o.interval && o.ride && (n.pause(), n.cycle());
          });
        }),
        (t._dataApiClickHandler = function (e) {
          var n = l.getSelectorFromElement(this);
          if (n) {
            var o = i.default(n)[0];
            if (o && i.default(o).hasClass("carousel")) {
              var r = a({}, i.default(o).data(), i.default(this).data()),
                s = this.getAttribute("data-slide-to");
              s && (r.interval = !1),
                t._jQueryInterface.call(i.default(o), r),
                s && i.default(o).data("bs.carousel").to(s),
                e.preventDefault();
            }
          }
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return v;
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on(
      "click.bs.carousel.data-api",
      "[data-slide], [data-slide-to]",
      y._dataApiClickHandler
    ),
    i.default(window).on("load.bs.carousel.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-ride="carousel"]')
          ),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var o = i.default(t[e]);
        y._jQueryInterface.call(o, o.data());
      }
    }),
    (i.default.fn[p] = y._jQueryInterface),
    (i.default.fn[p].Constructor = y),
    (i.default.fn[p].noConflict = function () {
      return (i.default.fn[p] = g), y._jQueryInterface;
    });
  var w = "collapse",
    E = i.default.fn[w],
    T = { toggle: !0, parent: "" },
    C = { toggle: "boolean", parent: "(string|element)" },
    S = (function () {
      function t(t, e) {
        (this._isTransitioning = !1),
          (this._element = t),
          (this._config = this._getConfig(e)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                t.id +
                '"],[data-toggle="collapse"][data-target="#' +
                t.id +
                '"]'
            )
          ));
        for (
          var n = [].slice.call(
              document.querySelectorAll('[data-toggle="collapse"]')
            ),
            i = 0,
            o = n.length;
          i < o;
          i++
        ) {
          var r = n[i],
            a = l.getSelectorFromElement(r),
            s = [].slice
              .call(document.querySelectorAll(a))
              .filter(function (e) {
                return e === t;
              });
          null !== a &&
            s.length > 0 &&
            ((this._selector = a), this._triggerArray.push(r));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var e = t.prototype;
      return (
        (e.toggle = function () {
          i.default(this._element).hasClass("show") ? this.hide() : this.show();
        }),
        (e.show = function () {
          var e,
            n,
            o = this;
          if (
            !this._isTransitioning &&
            !i.default(this._element).hasClass("show") &&
            (this._parent &&
              0 ===
                (e = [].slice
                  .call(this._parent.querySelectorAll(".show, .collapsing"))
                  .filter(function (t) {
                    return "string" == typeof o._config.parent
                      ? t.getAttribute("data-parent") === o._config.parent
                      : t.classList.contains("collapse");
                  })).length &&
              (e = null),
            !(
              e &&
              (n = i.default(e).not(this._selector).data("bs.collapse")) &&
              n._isTransitioning
            ))
          ) {
            var r = i.default.Event("show.bs.collapse");
            if (
              (i.default(this._element).trigger(r), !r.isDefaultPrevented())
            ) {
              e &&
                (t._jQueryInterface.call(
                  i.default(e).not(this._selector),
                  "hide"
                ),
                n || i.default(e).data("bs.collapse", null));
              var a = this._getDimension();
              i
                .default(this._element)
                .removeClass("collapse")
                .addClass("collapsing"),
                (this._element.style[a] = 0),
                this._triggerArray.length &&
                  i
                    .default(this._triggerArray)
                    .removeClass("collapsed")
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                u = l.getTransitionDurationFromElement(this._element);
              i
                .default(this._element)
                .one(l.TRANSITION_END, function () {
                  i
                    .default(o._element)
                    .removeClass("collapsing")
                    .addClass("collapse show"),
                    (o._element.style[a] = ""),
                    o.setTransitioning(!1),
                    i.default(o._element).trigger("shown.bs.collapse");
                })
                .emulateTransitionEnd(u),
                (this._element.style[a] = this._element[s] + "px");
            }
          }
        }),
        (e.hide = function () {
          var t = this;
          if (
            !this._isTransitioning &&
            i.default(this._element).hasClass("show")
          ) {
            var e = i.default.Event("hide.bs.collapse");
            if (
              (i.default(this._element).trigger(e), !e.isDefaultPrevented())
            ) {
              var n = this._getDimension();
              (this._element.style[n] =
                this._element.getBoundingClientRect()[n] + "px"),
                l.reflow(this._element),
                i
                  .default(this._element)
                  .addClass("collapsing")
                  .removeClass("collapse show");
              var o = this._triggerArray.length;
              if (o > 0)
                for (var r = 0; r < o; r++) {
                  var a = this._triggerArray[r],
                    s = l.getSelectorFromElement(a);
                  if (null !== s)
                    i
                      .default([].slice.call(document.querySelectorAll(s)))
                      .hasClass("show") ||
                      i
                        .default(a)
                        .addClass("collapsed")
                        .attr("aria-expanded", !1);
                }
              this.setTransitioning(!0);
              this._element.style[n] = "";
              var u = l.getTransitionDurationFromElement(this._element);
              i.default(this._element)
                .one(l.TRANSITION_END, function () {
                  t.setTransitioning(!1),
                    i
                      .default(t._element)
                      .removeClass("collapsing")
                      .addClass("collapse")
                      .trigger("hidden.bs.collapse");
                })
                .emulateTransitionEnd(u);
            }
          }
        }),
        (e.setTransitioning = function (t) {
          this._isTransitioning = t;
        }),
        (e.dispose = function () {
          i.default.removeData(this._element, "bs.collapse"),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (e._getConfig = function (t) {
          return (
            ((t = a({}, T, t)).toggle = Boolean(t.toggle)),
            l.typeCheckConfig(w, t, C),
            t
          );
        }),
        (e._getDimension = function () {
          return i.default(this._element).hasClass("width")
            ? "width"
            : "height";
        }),
        (e._getParent = function () {
          var e,
            n = this;
          l.isElement(this._config.parent)
            ? ((e = this._config.parent),
              "undefined" != typeof this._config.parent.jquery &&
                (e = this._config.parent[0]))
            : (e = document.querySelector(this._config.parent));
          var o =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
            r = [].slice.call(e.querySelectorAll(o));
          return (
            i.default(r).each(function (e, i) {
              n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i]);
            }),
            e
          );
        }),
        (e._addAriaAndCollapsedClass = function (t, e) {
          var n = i.default(t).hasClass("show");
          e.length &&
            i.default(e).toggleClass("collapsed", !n).attr("aria-expanded", n);
        }),
        (t._getTargetFromElement = function (t) {
          var e = l.getSelectorFromElement(t);
          return e ? document.querySelector(e) : null;
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this),
              o = n.data("bs.collapse"),
              r = a({}, T, n.data(), "object" == typeof e && e ? e : {});
            if (
              (!o &&
                r.toggle &&
                "string" == typeof e &&
                /show|hide/.test(e) &&
                (r.toggle = !1),
              o || ((o = new t(this, r)), n.data("bs.collapse", o)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof o[e])
                throw new TypeError('No method named "' + e + '"');
              o[e]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return T;
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var e = i.default(this),
        n = l.getSelectorFromElement(this),
        o = [].slice.call(document.querySelectorAll(n));
      i.default(o).each(function () {
        var t = i.default(this),
          n = t.data("bs.collapse") ? "toggle" : e.data();
        S._jQueryInterface.call(t, n);
      });
    }),
    (i.default.fn[w] = S._jQueryInterface),
    (i.default.fn[w].Constructor = S),
    (i.default.fn[w].noConflict = function () {
      return (i.default.fn[w] = E), S._jQueryInterface;
    });
  var D =
      "undefined" != typeof window &&
      "undefined" != typeof document &&
      "undefined" != typeof navigator,
    N = (function () {
      for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
        if (D && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
      return 0;
    })();
  var k =
    D && window.Promise
      ? function (t) {
          var e = !1;
          return function () {
            e ||
              ((e = !0),
              window.Promise.resolve().then(function () {
                (e = !1), t();
              }));
          };
        }
      : function (t) {
          var e = !1;
          return function () {
            e ||
              ((e = !0),
              setTimeout(function () {
                (e = !1), t();
              }, N));
          };
        };
  function A(t) {
    return t && "[object Function]" === {}.toString.call(t);
  }
  function I(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n;
  }
  function O(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host;
  }
  function x(t) {
    if (!t) return document.body;
    switch (t.nodeName) {
      case "HTML":
      case "BODY":
        return t.ownerDocument.body;
      case "#document":
        return t.body;
    }
    var e = I(t),
      n = e.overflow,
      i = e.overflowX,
      o = e.overflowY;
    return /(auto|scroll|overlay)/.test(n + o + i) ? t : x(O(t));
  }
  function j(t) {
    return t && t.referenceNode ? t.referenceNode : t;
  }
  var L = D && !(!window.MSInputMethodContext || !document.documentMode),
    P = D && /MSIE 10/.test(navigator.userAgent);
  function F(t) {
    return 11 === t ? L : 10 === t ? P : L || P;
  }
  function R(t) {
    if (!t) return document.documentElement;
    for (
      var e = F(10) ? document.body : null, n = t.offsetParent || null;
      n === e && t.nextElementSibling;

    )
      n = (t = t.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
        "static" === I(n, "position")
        ? R(n)
        : n
      : t
      ? t.ownerDocument.documentElement
      : document.documentElement;
  }
  function H(t) {
    return null !== t.parentNode ? H(t.parentNode) : t;
  }
  function M(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = n ? t : e,
      o = n ? e : t,
      r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var a,
      s,
      l = r.commonAncestorContainer;
    if ((t !== l && e !== l) || i.contains(o))
      return "BODY" === (s = (a = l).nodeName) ||
        ("HTML" !== s && R(a.firstElementChild) !== a)
        ? R(l)
        : l;
    var u = H(t);
    return u.host ? M(u.host, e) : M(t, H(e).host);
  }
  function q(t) {
    var e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
      n = "top" === e ? "scrollTop" : "scrollLeft",
      i = t.nodeName;
    if ("BODY" === i || "HTML" === i) {
      var o = t.ownerDocument.documentElement,
        r = t.ownerDocument.scrollingElement || o;
      return r[n];
    }
    return t[n];
  }
  function B(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = q(e, "top"),
      o = q(e, "left"),
      r = n ? -1 : 1;
    return (
      (t.top += i * r),
      (t.bottom += i * r),
      (t.left += o * r),
      (t.right += o * r),
      t
    );
  }
  function Q(t, e) {
    var n = "x" === e ? "Left" : "Top",
      i = "Left" === n ? "Right" : "Bottom";
    return (
      parseFloat(t["border" + n + "Width"]) +
      parseFloat(t["border" + i + "Width"])
    );
  }
  function W(t, e, n, i) {
    return Math.max(
      e["offset" + t],
      e["scroll" + t],
      n["client" + t],
      n["offset" + t],
      n["scroll" + t],
      F(10)
        ? parseInt(n["offset" + t]) +
            parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) +
            parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")])
        : 0
    );
  }
  function U(t) {
    var e = t.body,
      n = t.documentElement,
      i = F(10) && getComputedStyle(n);
    return { height: W("Height", e, n, i), width: W("Width", e, n, i) };
  }
  var V = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    Y = (function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    })(),
    z = function (t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    },
    X =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      };
  function K(t) {
    return X({}, t, { right: t.left + t.width, bottom: t.top + t.height });
  }
  function G(t) {
    var e = {};
    try {
      if (F(10)) {
        e = t.getBoundingClientRect();
        var n = q(t, "top"),
          i = q(t, "left");
        (e.top += n), (e.left += i), (e.bottom += n), (e.right += i);
      } else e = t.getBoundingClientRect();
    } catch (t) {}
    var o = {
        left: e.left,
        top: e.top,
        width: e.right - e.left,
        height: e.bottom - e.top,
      },
      r = "HTML" === t.nodeName ? U(t.ownerDocument) : {},
      a = r.width || t.clientWidth || o.width,
      s = r.height || t.clientHeight || o.height,
      l = t.offsetWidth - a,
      u = t.offsetHeight - s;
    if (l || u) {
      var f = I(t);
      (l -= Q(f, "x")), (u -= Q(f, "y")), (o.width -= l), (o.height -= u);
    }
    return K(o);
  }
  function $(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = F(10),
      o = "HTML" === e.nodeName,
      r = G(t),
      a = G(e),
      s = x(t),
      l = I(e),
      u = parseFloat(l.borderTopWidth),
      f = parseFloat(l.borderLeftWidth);
    n && o && ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
    var d = K({
      top: r.top - a.top - u,
      left: r.left - a.left - f,
      width: r.width,
      height: r.height,
    });
    if (((d.marginTop = 0), (d.marginLeft = 0), !i && o)) {
      var c = parseFloat(l.marginTop),
        h = parseFloat(l.marginLeft);
      (d.top -= u - c),
        (d.bottom -= u - c),
        (d.left -= f - h),
        (d.right -= f - h),
        (d.marginTop = c),
        (d.marginLeft = h);
    }
    return (
      (i && !n ? e.contains(s) : e === s && "BODY" !== s.nodeName) &&
        (d = B(d, e)),
      d
    );
  }
  function J(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = t.ownerDocument.documentElement,
      i = $(t, n),
      o = Math.max(n.clientWidth, window.innerWidth || 0),
      r = Math.max(n.clientHeight, window.innerHeight || 0),
      a = e ? 0 : q(n),
      s = e ? 0 : q(n, "left"),
      l = {
        top: a - i.top + i.marginTop,
        left: s - i.left + i.marginLeft,
        width: o,
        height: r,
      };
    return K(l);
  }
  function Z(t) {
    var e = t.nodeName;
    if ("BODY" === e || "HTML" === e) return !1;
    if ("fixed" === I(t, "position")) return !0;
    var n = O(t);
    return !!n && Z(n);
  }
  function tt(t) {
    if (!t || !t.parentElement || F()) return document.documentElement;
    for (var e = t.parentElement; e && "none" === I(e, "transform"); )
      e = e.parentElement;
    return e || document.documentElement;
  }
  function et(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      r = { top: 0, left: 0 },
      a = o ? tt(t) : M(t, j(e));
    if ("viewport" === i) r = J(a, o);
    else {
      var s = void 0;
      "scrollParent" === i
        ? "BODY" === (s = x(O(e))).nodeName &&
          (s = t.ownerDocument.documentElement)
        : (s = "window" === i ? t.ownerDocument.documentElement : i);
      var l = $(s, a, o);
      if ("HTML" !== s.nodeName || Z(a)) r = l;
      else {
        var u = U(t.ownerDocument),
          f = u.height,
          d = u.width;
        (r.top += l.top - l.marginTop),
          (r.bottom = f + l.top),
          (r.left += l.left - l.marginLeft),
          (r.right = d + l.left);
      }
    }
    var c = "number" == typeof (n = n || 0);
    return (
      (r.left += c ? n : n.left || 0),
      (r.top += c ? n : n.top || 0),
      (r.right -= c ? n : n.right || 0),
      (r.bottom -= c ? n : n.bottom || 0),
      r
    );
  }
  function nt(t) {
    return t.width * t.height;
  }
  function it(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var a = et(n, i, r, o),
      s = {
        top: { width: a.width, height: e.top - a.top },
        right: { width: a.right - e.right, height: a.height },
        bottom: { width: a.width, height: a.bottom - e.bottom },
        left: { width: e.left - a.left, height: a.height },
      },
      l = Object.keys(s)
        .map(function (t) {
          return X({ key: t }, s[t], { area: nt(s[t]) });
        })
        .sort(function (t, e) {
          return e.area - t.area;
        }),
      u = l.filter(function (t) {
        var e = t.width,
          i = t.height;
        return e >= n.clientWidth && i >= n.clientHeight;
      }),
      f = u.length > 0 ? u[0].key : l[0].key,
      d = t.split("-")[1];
    return f + (d ? "-" + d : "");
  }
  function ot(t, e, n) {
    var i =
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
      o = i ? tt(e) : M(e, j(n));
    return $(n, o, i);
  }
  function rt(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
      n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
      i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return { width: t.offsetWidth + i, height: t.offsetHeight + n };
  }
  function at(t) {
    var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t];
    });
  }
  function st(t, e, n) {
    n = n.split("-")[0];
    var i = rt(t),
      o = { width: i.width, height: i.height },
      r = -1 !== ["right", "left"].indexOf(n),
      a = r ? "top" : "left",
      s = r ? "left" : "top",
      l = r ? "height" : "width",
      u = r ? "width" : "height";
    return (
      (o[a] = e[a] + e[l] / 2 - i[l] / 2),
      (o[s] = n === s ? e[s] - i[u] : e[at(s)]),
      o
    );
  }
  function lt(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0];
  }
  function ut(t, e, n) {
    return (
      (void 0 === n
        ? t
        : t.slice(
            0,
            (function (t, e, n) {
              if (Array.prototype.findIndex)
                return t.findIndex(function (t) {
                  return t[e] === n;
                });
              var i = lt(t, function (t) {
                return t[e] === n;
              });
              return t.indexOf(i);
            })(t, "name", n)
          )
      ).forEach(function (t) {
        t.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var n = t.function || t.fn;
        t.enabled &&
          A(n) &&
          ((e.offsets.popper = K(e.offsets.popper)),
          (e.offsets.reference = K(e.offsets.reference)),
          (e = n(e, t)));
      }),
      e
    );
  }
  function ft() {
    if (!this.state.isDestroyed) {
      var t = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (t.offsets.reference = ot(
        this.state,
        this.popper,
        this.reference,
        this.options.positionFixed
      )),
        (t.placement = it(
          this.options.placement,
          t.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (t.originalPlacement = t.placement),
        (t.positionFixed = this.options.positionFixed),
        (t.offsets.popper = st(this.popper, t.offsets.reference, t.placement)),
        (t.offsets.popper.position = this.options.positionFixed
          ? "fixed"
          : "absolute"),
        (t = ut(this.modifiers, t)),
        this.state.isCreated
          ? this.options.onUpdate(t)
          : ((this.state.isCreated = !0), this.options.onCreate(t));
    }
  }
  function dt(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e;
    });
  }
  function ct(t) {
    for (
      var e = [!1, "ms", "Webkit", "Moz", "O"],
        n = t.charAt(0).toUpperCase() + t.slice(1),
        i = 0;
      i < e.length;
      i++
    ) {
      var o = e[i],
        r = o ? "" + o + n : t;
      if ("undefined" != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function ht() {
    return (
      (this.state.isDestroyed = !0),
      dt(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style.left = ""),
        (this.popper.style.right = ""),
        (this.popper.style.bottom = ""),
        (this.popper.style.willChange = ""),
        (this.popper.style[ct("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function pt(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window;
  }
  function mt(t, e, n, i) {
    (n.updateBound = i),
      pt(t).addEventListener("resize", n.updateBound, { passive: !0 });
    var o = x(t);
    return (
      (function t(e, n, i, o) {
        var r = "BODY" === e.nodeName,
          a = r ? e.ownerDocument.defaultView : e;
        a.addEventListener(n, i, { passive: !0 }),
          r || t(x(a.parentNode), n, i, o),
          o.push(a);
      })(o, "scroll", n.updateBound, n.scrollParents),
      (n.scrollElement = o),
      (n.eventsEnabled = !0),
      n
    );
  }
  function gt() {
    this.state.eventsEnabled ||
      (this.state = mt(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function vt() {
    var t, e;
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state =
        ((t = this.reference),
        (e = this.state),
        pt(t).removeEventListener("resize", e.updateBound),
        e.scrollParents.forEach(function (t) {
          t.removeEventListener("scroll", e.updateBound);
        }),
        (e.updateBound = null),
        (e.scrollParents = []),
        (e.scrollElement = null),
        (e.eventsEnabled = !1),
        e)));
  }
  function _t(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
  }
  function bt(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) &&
        _t(e[n]) &&
        (i = "px"),
        (t.style[n] = e[n] + i);
    });
  }
  var yt = D && /Firefox/i.test(navigator.userAgent);
  function wt(t, e, n) {
    var i = lt(t, function (t) {
        return t.name === e;
      }),
      o =
        !!i &&
        t.some(function (t) {
          return t.name === n && t.enabled && t.order < i.order;
        });
    if (!o) {
      var r = "`" + e + "`",
        a = "`" + n + "`";
      console.warn(
        a +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return o;
  }
  var Et = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    Tt = Et.slice(3);
  function Ct(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = Tt.indexOf(t),
      i = Tt.slice(n + 1).concat(Tt.slice(0, n));
    return e ? i.reverse() : i;
  }
  var St = "flip",
    Dt = "clockwise",
    Nt = "counterclockwise";
  function kt(t, e, n, i) {
    var o = [0, 0],
      r = -1 !== ["right", "left"].indexOf(i),
      a = t.split(/(\+|\-)/).map(function (t) {
        return t.trim();
      }),
      s = a.indexOf(
        lt(a, function (t) {
          return -1 !== t.search(/,|\s/);
        })
      );
    a[s] &&
      -1 === a[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var l = /\s*,\s*|\s+/,
      u =
        -1 !== s
          ? [
              a.slice(0, s).concat([a[s].split(l)[0]]),
              [a[s].split(l)[1]].concat(a.slice(s + 1)),
            ]
          : [a];
    return (
      (u = u.map(function (t, i) {
        var o = (1 === i ? !r : r) ? "height" : "width",
          a = !1;
        return t
          .reduce(function (t, e) {
            return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e)
              ? ((t[t.length - 1] = e), (a = !0), t)
              : a
              ? ((t[t.length - 1] += e), (a = !1), t)
              : t.concat(e);
          }, [])
          .map(function (t) {
            return (function (t, e, n, i) {
              var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                r = +o[1],
                a = o[2];
              if (!r) return t;
              if (0 === a.indexOf("%")) {
                var s = void 0;
                switch (a) {
                  case "%p":
                    s = n;
                    break;
                  case "%":
                  case "%r":
                  default:
                    s = i;
                }
                return (K(s)[e] / 100) * r;
              }
              if ("vh" === a || "vw" === a)
                return (
                  (("vh" === a
                    ? Math.max(
                        document.documentElement.clientHeight,
                        window.innerHeight || 0
                      )
                    : Math.max(
                        document.documentElement.clientWidth,
                        window.innerWidth || 0
                      )) /
                    100) *
                  r
                );
              return r;
            })(t, o, e, n);
          });
      })).forEach(function (t, e) {
        t.forEach(function (n, i) {
          _t(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
        });
      }),
      o
    );
  }
  var At = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];
            if (i) {
              var o = t.offsets,
                r = o.reference,
                a = o.popper,
                s = -1 !== ["bottom", "top"].indexOf(n),
                l = s ? "left" : "top",
                u = s ? "width" : "height",
                f = {
                  start: z({}, l, r[l]),
                  end: z({}, l, r[l] + r[u] - a[u]),
                };
              t.offsets.popper = X({}, a, f[i]);
            }
            return t;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (t, e) {
            var n = e.offset,
              i = t.placement,
              o = t.offsets,
              r = o.popper,
              a = o.reference,
              s = i.split("-")[0],
              l = void 0;
            return (
              (l = _t(+n) ? [+n, 0] : kt(n, r, a, s)),
              "left" === s
                ? ((r.top += l[0]), (r.left -= l[1]))
                : "right" === s
                ? ((r.top += l[0]), (r.left += l[1]))
                : "top" === s
                ? ((r.left += l[0]), (r.top -= l[1]))
                : "bottom" === s && ((r.left += l[0]), (r.top += l[1])),
              (t.popper = r),
              t
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (t, e) {
            var n = e.boundariesElement || R(t.instance.popper);
            t.instance.reference === n && (n = R(n));
            var i = ct("transform"),
              o = t.instance.popper.style,
              r = o.top,
              a = o.left,
              s = o[i];
            (o.top = ""), (o.left = ""), (o[i] = "");
            var l = et(
              t.instance.popper,
              t.instance.reference,
              e.padding,
              n,
              t.positionFixed
            );
            (o.top = r), (o.left = a), (o[i] = s), (e.boundaries = l);
            var u = e.priority,
              f = t.offsets.popper,
              d = {
                primary: function (t) {
                  var n = f[t];
                  return (
                    f[t] < l[t] &&
                      !e.escapeWithReference &&
                      (n = Math.max(f[t], l[t])),
                    z({}, t, n)
                  );
                },
                secondary: function (t) {
                  var n = "right" === t ? "left" : "top",
                    i = f[n];
                  return (
                    f[t] > l[t] &&
                      !e.escapeWithReference &&
                      (i = Math.min(
                        f[n],
                        l[t] - ("right" === t ? f.width : f.height)
                      )),
                    z({}, n, i)
                  );
                },
              };
            return (
              u.forEach(function (t) {
                var e =
                  -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                f = X({}, f, d[e](t));
              }),
              (t.offsets.popper = f),
              t
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (t) {
            var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              a = -1 !== ["top", "bottom"].indexOf(o),
              s = a ? "right" : "bottom",
              l = a ? "left" : "top",
              u = a ? "width" : "height";
            return (
              n[s] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[u]),
              n[l] > r(i[s]) && (t.offsets.popper[l] = r(i[s])),
              t
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (t, e) {
            var n;
            if (!wt(t.instance.modifiers, "arrow", "keepTogether")) return t;
            var i = e.element;
            if ("string" == typeof i) {
              if (!(i = t.instance.popper.querySelector(i))) return t;
            } else if (!t.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                t
              );
            var o = t.placement.split("-")[0],
              r = t.offsets,
              a = r.popper,
              s = r.reference,
              l = -1 !== ["left", "right"].indexOf(o),
              u = l ? "height" : "width",
              f = l ? "Top" : "Left",
              d = f.toLowerCase(),
              c = l ? "left" : "top",
              h = l ? "bottom" : "right",
              p = rt(i)[u];
            s[h] - p < a[d] && (t.offsets.popper[d] -= a[d] - (s[h] - p)),
              s[d] + p > a[h] && (t.offsets.popper[d] += s[d] + p - a[h]),
              (t.offsets.popper = K(t.offsets.popper));
            var m = s[d] + s[u] / 2 - p / 2,
              g = I(t.instance.popper),
              v = parseFloat(g["margin" + f]),
              _ = parseFloat(g["border" + f + "Width"]),
              b = m - t.offsets.popper[d] - v - _;
            return (
              (b = Math.max(Math.min(a[u] - p, b), 0)),
              (t.arrowElement = i),
              (t.offsets.arrow =
                (z((n = {}), d, Math.round(b)), z(n, c, ""), n)),
              t
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (t, e) {
            if (dt(t.instance.modifiers, "inner")) return t;
            if (t.flipped && t.placement === t.originalPlacement) return t;
            var n = et(
                t.instance.popper,
                t.instance.reference,
                e.padding,
                e.boundariesElement,
                t.positionFixed
              ),
              i = t.placement.split("-")[0],
              o = at(i),
              r = t.placement.split("-")[1] || "",
              a = [];
            switch (e.behavior) {
              case St:
                a = [i, o];
                break;
              case Dt:
                a = Ct(i);
                break;
              case Nt:
                a = Ct(i, !0);
                break;
              default:
                a = e.behavior;
            }
            return (
              a.forEach(function (s, l) {
                if (i !== s || a.length === l + 1) return t;
                (i = t.placement.split("-")[0]), (o = at(i));
                var u = t.offsets.popper,
                  f = t.offsets.reference,
                  d = Math.floor,
                  c =
                    ("left" === i && d(u.right) > d(f.left)) ||
                    ("right" === i && d(u.left) < d(f.right)) ||
                    ("top" === i && d(u.bottom) > d(f.top)) ||
                    ("bottom" === i && d(u.top) < d(f.bottom)),
                  h = d(u.left) < d(n.left),
                  p = d(u.right) > d(n.right),
                  m = d(u.top) < d(n.top),
                  g = d(u.bottom) > d(n.bottom),
                  v =
                    ("left" === i && h) ||
                    ("right" === i && p) ||
                    ("top" === i && m) ||
                    ("bottom" === i && g),
                  _ = -1 !== ["top", "bottom"].indexOf(i),
                  b =
                    !!e.flipVariations &&
                    ((_ && "start" === r && h) ||
                      (_ && "end" === r && p) ||
                      (!_ && "start" === r && m) ||
                      (!_ && "end" === r && g)),
                  y =
                    !!e.flipVariationsByContent &&
                    ((_ && "start" === r && p) ||
                      (_ && "end" === r && h) ||
                      (!_ && "start" === r && g) ||
                      (!_ && "end" === r && m)),
                  w = b || y;
                (c || v || w) &&
                  ((t.flipped = !0),
                  (c || v) && (i = a[l + 1]),
                  w &&
                    (r = (function (t) {
                      return "end" === t ? "start" : "start" === t ? "end" : t;
                    })(r)),
                  (t.placement = i + (r ? "-" + r : "")),
                  (t.offsets.popper = X(
                    {},
                    t.offsets.popper,
                    st(t.instance.popper, t.offsets.reference, t.placement)
                  )),
                  (t = ut(t.instance.modifiers, t, "flip")));
              }),
              t
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              a = -1 !== ["left", "right"].indexOf(n),
              s = -1 === ["top", "left"].indexOf(n);
            return (
              (o[a ? "left" : "top"] =
                r[n] - (s ? o[a ? "width" : "height"] : 0)),
              (t.placement = at(e)),
              (t.offsets.popper = K(o)),
              t
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (t) {
            if (!wt(t.instance.modifiers, "hide", "preventOverflow")) return t;
            var e = t.offsets.reference,
              n = lt(t.instance.modifiers, function (t) {
                return "preventOverflow" === t.name;
              }).boundaries;
            if (
              e.bottom < n.top ||
              e.left > n.right ||
              e.top > n.bottom ||
              e.right < n.left
            ) {
              if (!0 === t.hide) return t;
              (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === t.hide) return t;
              (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
            }
            return t;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (t, e) {
            var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = lt(t.instance.modifiers, function (t) {
                return "applyStyle" === t.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var a = void 0 !== r ? r : e.gpuAcceleration,
              s = R(t.instance.popper),
              l = G(s),
              u = { position: o.position },
              f = (function (t, e) {
                var n = t.offsets,
                  i = n.popper,
                  o = n.reference,
                  r = Math.round,
                  a = Math.floor,
                  s = function (t) {
                    return t;
                  },
                  l = r(o.width),
                  u = r(i.width),
                  f = -1 !== ["left", "right"].indexOf(t.placement),
                  d = -1 !== t.placement.indexOf("-"),
                  c = e ? (f || d || l % 2 == u % 2 ? r : a) : s,
                  h = e ? r : s;
                return {
                  left: c(
                    l % 2 == 1 && u % 2 == 1 && !d && e ? i.left - 1 : i.left
                  ),
                  top: h(i.top),
                  bottom: h(i.bottom),
                  right: c(i.right),
                };
              })(t, window.devicePixelRatio < 2 || !yt),
              d = "bottom" === n ? "top" : "bottom",
              c = "right" === i ? "left" : "right",
              h = ct("transform"),
              p = void 0,
              m = void 0;
            if (
              ((m =
                "bottom" === d
                  ? "HTML" === s.nodeName
                    ? -s.clientHeight + f.bottom
                    : -l.height + f.bottom
                  : f.top),
              (p =
                "right" === c
                  ? "HTML" === s.nodeName
                    ? -s.clientWidth + f.right
                    : -l.width + f.right
                  : f.left),
              a && h)
            )
              (u[h] = "translate3d(" + p + "px, " + m + "px, 0)"),
                (u[d] = 0),
                (u[c] = 0),
                (u.willChange = "transform");
            else {
              var g = "bottom" === d ? -1 : 1,
                v = "right" === c ? -1 : 1;
              (u[d] = m * g), (u[c] = p * v), (u.willChange = d + ", " + c);
            }
            var _ = { "x-placement": t.placement };
            return (
              (t.attributes = X({}, _, t.attributes)),
              (t.styles = X({}, u, t.styles)),
              (t.arrowStyles = X({}, t.offsets.arrow, t.arrowStyles)),
              t
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (t) {
            var e, n;
            return (
              bt(t.instance.popper, t.styles),
              (e = t.instance.popper),
              (n = t.attributes),
              Object.keys(n).forEach(function (t) {
                !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t);
              }),
              t.arrowElement &&
                Object.keys(t.arrowStyles).length &&
                bt(t.arrowElement, t.arrowStyles),
              t
            );
          },
          onLoad: function (t, e, n, i, o) {
            var r = ot(o, e, t, n.positionFixed),
              a = it(
                n.placement,
                r,
                e,
                t,
                n.modifiers.flip.boundariesElement,
                n.modifiers.flip.padding
              );
            return (
              e.setAttribute("x-placement", a),
              bt(e, { position: n.positionFixed ? "fixed" : "absolute" }),
              n
            );
          },
          gpuAcceleration: void 0,
        },
      },
    },
    It = (function () {
      function t(e, n) {
        var i = this,
          o =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        V(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(i.update);
          }),
          (this.update = k(this.update.bind(this))),
          (this.options = X({}, t.Defaults, o)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = e && e.jquery ? e[0] : e),
          (this.popper = n && n.jquery ? n[0] : n),
          (this.options.modifiers = {}),
          Object.keys(X({}, t.Defaults.modifiers, o.modifiers)).forEach(
            function (e) {
              i.options.modifiers[e] = X(
                {},
                t.Defaults.modifiers[e] || {},
                o.modifiers ? o.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (t) {
              return X({ name: t }, i.options.modifiers[t]);
            })
            .sort(function (t, e) {
              return t.order - e.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              A(t.onLoad) &&
              t.onLoad(i.reference, i.popper, i.options, t, i.state);
          }),
          this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), (this.state.eventsEnabled = r);
      }
      return (
        Y(t, [
          {
            key: "update",
            value: function () {
              return ft.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return ht.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return gt.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return vt.call(this);
            },
          },
        ]),
        t
      );
    })();
  (It.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
    (It.placements = Et),
    (It.Defaults = At);
  var Ot = "dropdown",
    xt = i.default.fn[Ot],
    jt = new RegExp("38|40|27"),
    Lt = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    Pt = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    Ft = (function () {
      function t(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var e = t.prototype;
      return (
        (e.toggle = function () {
          if (
            !this._element.disabled &&
            !i.default(this._element).hasClass("disabled")
          ) {
            var e = i.default(this._menu).hasClass("show");
            t._clearMenus(), e || this.show(!0);
          }
        }),
        (e.show = function (e) {
          if (
            (void 0 === e && (e = !1),
            !(
              this._element.disabled ||
              i.default(this._element).hasClass("disabled") ||
              i.default(this._menu).hasClass("show")
            ))
          ) {
            var n = { relatedTarget: this._element },
              o = i.default.Event("show.bs.dropdown", n),
              r = t._getParentFromElement(this._element);
            if ((i.default(r).trigger(o), !o.isDefaultPrevented())) {
              if (!this._inNavbar && e) {
                if ("undefined" == typeof It)
                  throw new TypeError(
                    "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                  );
                var a = this._element;
                "parent" === this._config.reference
                  ? (a = r)
                  : l.isElement(this._config.reference) &&
                    ((a = this._config.reference),
                    "undefined" != typeof this._config.reference.jquery &&
                      (a = this._config.reference[0])),
                  "scrollParent" !== this._config.boundary &&
                    i.default(r).addClass("position-static"),
                  (this._popper = new It(
                    a,
                    this._menu,
                    this._getPopperConfig()
                  ));
              }
              "ontouchstart" in document.documentElement &&
                0 === i.default(r).closest(".navbar-nav").length &&
                i
                  .default(document.body)
                  .children()
                  .on("mouseover", null, i.default.noop),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                i.default(this._menu).toggleClass("show"),
                i
                  .default(r)
                  .toggleClass("show")
                  .trigger(i.default.Event("shown.bs.dropdown", n));
            }
          }
        }),
        (e.hide = function () {
          if (
            !this._element.disabled &&
            !i.default(this._element).hasClass("disabled") &&
            i.default(this._menu).hasClass("show")
          ) {
            var e = { relatedTarget: this._element },
              n = i.default.Event("hide.bs.dropdown", e),
              o = t._getParentFromElement(this._element);
            i.default(o).trigger(n),
              n.isDefaultPrevented() ||
                (this._popper && this._popper.destroy(),
                i.default(this._menu).toggleClass("show"),
                i
                  .default(o)
                  .toggleClass("show")
                  .trigger(i.default.Event("hidden.bs.dropdown", e)));
          }
        }),
        (e.dispose = function () {
          i.default.removeData(this._element, "bs.dropdown"),
            i.default(this._element).off(".bs.dropdown"),
            (this._element = null),
            (this._menu = null),
            null !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (e.update = function () {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (e._addEventListeners = function () {
          var t = this;
          i.default(this._element).on("click.bs.dropdown", function (e) {
            e.preventDefault(), e.stopPropagation(), t.toggle();
          });
        }),
        (e._getConfig = function (t) {
          return (
            (t = a(
              {},
              this.constructor.Default,
              i.default(this._element).data(),
              t
            )),
            l.typeCheckConfig(Ot, t, this.constructor.DefaultType),
            t
          );
        }),
        (e._getMenuElement = function () {
          if (!this._menu) {
            var e = t._getParentFromElement(this._element);
            e && (this._menu = e.querySelector(".dropdown-menu"));
          }
          return this._menu;
        }),
        (e._getPlacement = function () {
          var t = i.default(this._element.parentNode),
            e = "bottom-start";
          return (
            t.hasClass("dropup")
              ? (e = i.default(this._menu).hasClass("dropdown-menu-right")
                  ? "top-end"
                  : "top-start")
              : t.hasClass("dropright")
              ? (e = "right-start")
              : t.hasClass("dropleft")
              ? (e = "left-start")
              : i.default(this._menu).hasClass("dropdown-menu-right") &&
                (e = "bottom-end"),
            e
          );
        }),
        (e._detectNavbar = function () {
          return i.default(this._element).closest(".navbar").length > 0;
        }),
        (e._getOffset = function () {
          var t = this,
            e = {};
          return (
            "function" == typeof this._config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = a(
                      {},
                      e.offsets,
                      t._config.offset(e.offsets, t._element) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this._config.offset),
            e
          );
        }),
        (e._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (t.modifiers.applyStyle = { enabled: !1 }),
            a({}, t, this._config.popperConfig)
          );
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this).data("bs.dropdown");
            if (
              (n ||
                ((n = new t(this, "object" == typeof e ? e : null)),
                i.default(this).data("bs.dropdown", n)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof n[e])
                throw new TypeError('No method named "' + e + '"');
              n[e]();
            }
          });
        }),
        (t._clearMenus = function (e) {
          if (!e || (3 !== e.which && ("keyup" !== e.type || 9 === e.which)))
            for (
              var n = [].slice.call(
                  document.querySelectorAll('[data-toggle="dropdown"]')
                ),
                o = 0,
                r = n.length;
              o < r;
              o++
            ) {
              var a = t._getParentFromElement(n[o]),
                s = i.default(n[o]).data("bs.dropdown"),
                l = { relatedTarget: n[o] };
              if ((e && "click" === e.type && (l.clickEvent = e), s)) {
                var u = s._menu;
                if (
                  i.default(a).hasClass("show") &&
                  !(
                    e &&
                    (("click" === e.type &&
                      /input|textarea/i.test(e.target.tagName)) ||
                      ("keyup" === e.type && 9 === e.which)) &&
                    i.default.contains(a, e.target)
                  )
                ) {
                  var f = i.default.Event("hide.bs.dropdown", l);
                  i.default(a).trigger(f),
                    f.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        i
                          .default(document.body)
                          .children()
                          .off("mouseover", null, i.default.noop),
                      n[o].setAttribute("aria-expanded", "false"),
                      s._popper && s._popper.destroy(),
                      i.default(u).removeClass("show"),
                      i
                        .default(a)
                        .removeClass("show")
                        .trigger(i.default.Event("hidden.bs.dropdown", l)));
                }
              }
            }
        }),
        (t._getParentFromElement = function (t) {
          var e,
            n = l.getSelectorFromElement(t);
          return n && (e = document.querySelector(n)), e || t.parentNode;
        }),
        (t._dataApiKeydownHandler = function (e) {
          if (
            !(/input|textarea/i.test(e.target.tagName)
              ? 32 === e.which ||
                (27 !== e.which &&
                  ((40 !== e.which && 38 !== e.which) ||
                    i.default(e.target).closest(".dropdown-menu").length))
              : !jt.test(e.which)) &&
            !this.disabled &&
            !i.default(this).hasClass("disabled")
          ) {
            var n = t._getParentFromElement(this),
              o = i.default(n).hasClass("show");
            if (o || 27 !== e.which) {
              if (
                (e.preventDefault(),
                e.stopPropagation(),
                !o || 27 === e.which || 32 === e.which)
              )
                return (
                  27 === e.which &&
                    i
                      .default(n.querySelector('[data-toggle="dropdown"]'))
                      .trigger("focus"),
                  void i.default(this).trigger("click")
                );
              var r = [].slice
                .call(
                  n.querySelectorAll(
                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                  )
                )
                .filter(function (t) {
                  return i.default(t).is(":visible");
                });
              if (0 !== r.length) {
                var a = r.indexOf(e.target);
                38 === e.which && a > 0 && a--,
                  40 === e.which && a < r.length - 1 && a++,
                  a < 0 && (a = 0),
                  r[a].focus();
              }
            }
          }
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return Lt;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Pt;
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on(
      "keydown.bs.dropdown.data-api",
      '[data-toggle="dropdown"]',
      Ft._dataApiKeydownHandler
    )
    .on(
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      Ft._dataApiKeydownHandler
    )
    .on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", Ft._clearMenus)
    .on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        Ft._jQueryInterface.call(i.default(this), "toggle");
    })
    .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
      t.stopPropagation();
    }),
    (i.default.fn[Ot] = Ft._jQueryInterface),
    (i.default.fn[Ot].Constructor = Ft),
    (i.default.fn[Ot].noConflict = function () {
      return (i.default.fn[Ot] = xt), Ft._jQueryInterface;
    });
  var Rt = i.default.fn.modal,
    Ht = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    Mt = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    qt = (function () {
      function t(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(".modal-dialog")),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var e = t.prototype;
      return (
        (e.toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
        (e.show = function (t) {
          var e = this;
          if (!this._isShown && !this._isTransitioning) {
            i.default(this._element).hasClass("fade") &&
              (this._isTransitioning = !0);
            var n = i.default.Event("show.bs.modal", { relatedTarget: t });
            i.default(this._element).trigger(n),
              this._isShown ||
                n.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                i
                  .default(this._element)
                  .on(
                    "click.dismiss.bs.modal",
                    '[data-dismiss="modal"]',
                    function (t) {
                      return e.hide(t);
                    }
                  ),
                i
                  .default(this._dialog)
                  .on("mousedown.dismiss.bs.modal", function () {
                    i.default(e._element).one(
                      "mouseup.dismiss.bs.modal",
                      function (t) {
                        i.default(t.target).is(e._element) &&
                          (e._ignoreBackdropClick = !0);
                      }
                    );
                  }),
                this._showBackdrop(function () {
                  return e._showElement(t);
                }));
          }
        }),
        (e.hide = function (t) {
          var e = this;
          if (
            (t && t.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var n = i.default.Event("hide.bs.modal");
            if (
              (i.default(this._element).trigger(n),
              this._isShown && !n.isDefaultPrevented())
            ) {
              this._isShown = !1;
              var o = i.default(this._element).hasClass("fade");
              if (
                (o && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                i.default(document).off("focusin.bs.modal"),
                i.default(this._element).removeClass("show"),
                i.default(this._element).off("click.dismiss.bs.modal"),
                i.default(this._dialog).off("mousedown.dismiss.bs.modal"),
                o)
              ) {
                var r = l.getTransitionDurationFromElement(this._element);
                i.default(this._element)
                  .one(l.TRANSITION_END, function (t) {
                    return e._hideModal(t);
                  })
                  .emulateTransitionEnd(r);
              } else this._hideModal();
            }
          }
        }),
        (e.dispose = function () {
          [window, this._element, this._dialog].forEach(function (t) {
            return i.default(t).off(".bs.modal");
          }),
            i.default(document).off("focusin.bs.modal"),
            i.default.removeData(this._element, "bs.modal"),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (e.handleUpdate = function () {
          this._adjustDialog();
        }),
        (e._getConfig = function (t) {
          return (t = a({}, Ht, t)), l.typeCheckConfig("modal", t, Mt), t;
        }),
        (e._triggerBackdropTransition = function () {
          var t = this,
            e = i.default.Event("hidePrevented.bs.modal");
          if ((i.default(this._element).trigger(e), !e.isDefaultPrevented())) {
            var n =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            n || (this._element.style.overflowY = "hidden"),
              this._element.classList.add("modal-static");
            var o = l.getTransitionDurationFromElement(this._dialog);
            i.default(this._element).off(l.TRANSITION_END),
              i
                .default(this._element)
                .one(l.TRANSITION_END, function () {
                  t._element.classList.remove("modal-static"),
                    n ||
                      i
                        .default(t._element)
                        .one(l.TRANSITION_END, function () {
                          t._element.style.overflowY = "";
                        })
                        .emulateTransitionEnd(t._element, o);
                })
                .emulateTransitionEnd(o),
              this._element.focus();
          }
        }),
        (e._showElement = function (t) {
          var e = this,
            n = i.default(this._element).hasClass("fade"),
            o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            i.default(this._dialog).hasClass("modal-dialog-scrollable") && o
              ? (o.scrollTop = 0)
              : (this._element.scrollTop = 0),
            n && l.reflow(this._element),
            i.default(this._element).addClass("show"),
            this._config.focus && this._enforceFocus();
          var r = i.default.Event("shown.bs.modal", { relatedTarget: t }),
            a = function () {
              e._config.focus && e._element.focus(),
                (e._isTransitioning = !1),
                i.default(e._element).trigger(r);
            };
          if (n) {
            var s = l.getTransitionDurationFromElement(this._dialog);
            i.default(this._dialog)
              .one(l.TRANSITION_END, a)
              .emulateTransitionEnd(s);
          } else a();
        }),
        (e._enforceFocus = function () {
          var t = this;
          i.default(document)
            .off("focusin.bs.modal")
            .on("focusin.bs.modal", function (e) {
              document !== e.target &&
                t._element !== e.target &&
                0 === i.default(t._element).has(e.target).length &&
                t._element.focus();
            });
        }),
        (e._setEscapeEvent = function () {
          var t = this;
          this._isShown
            ? i
                .default(this._element)
                .on("keydown.dismiss.bs.modal", function (e) {
                  t._config.keyboard && 27 === e.which
                    ? (e.preventDefault(), t.hide())
                    : t._config.keyboard ||
                      27 !== e.which ||
                      t._triggerBackdropTransition();
                })
            : this._isShown ||
              i.default(this._element).off("keydown.dismiss.bs.modal");
        }),
        (e._setResizeEvent = function () {
          var t = this;
          this._isShown
            ? i.default(window).on("resize.bs.modal", function (e) {
                return t.handleUpdate(e);
              })
            : i.default(window).off("resize.bs.modal");
        }),
        (e._hideModal = function () {
          var t = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              i.default(document.body).removeClass("modal-open"),
                t._resetAdjustments(),
                t._resetScrollbar(),
                i.default(t._element).trigger("hidden.bs.modal");
            });
        }),
        (e._removeBackdrop = function () {
          this._backdrop &&
            (i.default(this._backdrop).remove(), (this._backdrop = null));
        }),
        (e._showBackdrop = function (t) {
          var e = this,
            n = i.default(this._element).hasClass("fade") ? "fade" : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = "modal-backdrop"),
              n && this._backdrop.classList.add(n),
              i.default(this._backdrop).appendTo(document.body),
              i
                .default(this._element)
                .on("click.dismiss.bs.modal", function (t) {
                  e._ignoreBackdropClick
                    ? (e._ignoreBackdropClick = !1)
                    : t.target === t.currentTarget &&
                      ("static" === e._config.backdrop
                        ? e._triggerBackdropTransition()
                        : e.hide());
                }),
              n && l.reflow(this._backdrop),
              i.default(this._backdrop).addClass("show"),
              !t)
            )
              return;
            if (!n) return void t();
            var o = l.getTransitionDurationFromElement(this._backdrop);
            i.default(this._backdrop)
              .one(l.TRANSITION_END, t)
              .emulateTransitionEnd(o);
          } else if (!this._isShown && this._backdrop) {
            i.default(this._backdrop).removeClass("show");
            var r = function () {
              e._removeBackdrop(), t && t();
            };
            if (i.default(this._element).hasClass("fade")) {
              var a = l.getTransitionDurationFromElement(this._backdrop);
              i.default(this._backdrop)
                .one(l.TRANSITION_END, r)
                .emulateTransitionEnd(a);
            } else r();
          } else t && t();
        }),
        (e._adjustDialog = function () {
          var t =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            t &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (e._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (e._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect();
          (this._isBodyOverflowing =
            Math.round(t.left + t.right) < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (e._setScrollbar = function () {
          var t = this;
          if (this._isBodyOverflowing) {
            var e = [].slice.call(
                document.querySelectorAll(
                  ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                )
              ),
              n = [].slice.call(document.querySelectorAll(".sticky-top"));
            i.default(e).each(function (e, n) {
              var o = n.style.paddingRight,
                r = i.default(n).css("padding-right");
              i.default(n)
                .data("padding-right", o)
                .css("padding-right", parseFloat(r) + t._scrollbarWidth + "px");
            }),
              i.default(n).each(function (e, n) {
                var o = n.style.marginRight,
                  r = i.default(n).css("margin-right");
                i.default(n)
                  .data("margin-right", o)
                  .css(
                    "margin-right",
                    parseFloat(r) - t._scrollbarWidth + "px"
                  );
              });
            var o = document.body.style.paddingRight,
              r = i.default(document.body).css("padding-right");
            i.default(document.body)
              .data("padding-right", o)
              .css(
                "padding-right",
                parseFloat(r) + this._scrollbarWidth + "px"
              );
          }
          i.default(document.body).addClass("modal-open");
        }),
        (e._resetScrollbar = function () {
          var t = [].slice.call(
            document.querySelectorAll(
              ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
            )
          );
          i.default(t).each(function (t, e) {
            var n = i.default(e).data("padding-right");
            i.default(e).removeData("padding-right"),
              (e.style.paddingRight = n || "");
          });
          var e = [].slice.call(document.querySelectorAll(".sticky-top"));
          i.default(e).each(function (t, e) {
            var n = i.default(e).data("margin-right");
            "undefined" != typeof n &&
              i.default(e).css("margin-right", n).removeData("margin-right");
          });
          var n = i.default(document.body).data("padding-right");
          i.default(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = n || "");
        }),
        (e._getScrollbarWidth = function () {
          var t = document.createElement("div");
          (t.className = "modal-scrollbar-measure"),
            document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e;
        }),
        (t._jQueryInterface = function (e, n) {
          return this.each(function () {
            var o = i.default(this).data("bs.modal"),
              r = a(
                {},
                Ht,
                i.default(this).data(),
                "object" == typeof e && e ? e : {}
              );
            if (
              (o || ((o = new t(this, r)), i.default(this).data("bs.modal", o)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof o[e])
                throw new TypeError('No method named "' + e + '"');
              o[e](n);
            } else r.show && o.show(n);
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return Ht;
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
      var e,
        n = this,
        o = l.getSelectorFromElement(this);
      o && (e = document.querySelector(o));
      var r = i.default(e).data("bs.modal")
        ? "toggle"
        : a({}, i.default(e).data(), i.default(this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
      var s = i.default(e).one("show.bs.modal", function (t) {
        t.isDefaultPrevented() ||
          s.one("hidden.bs.modal", function () {
            i.default(n).is(":visible") && n.focus();
          });
      });
      qt._jQueryInterface.call(i.default(e), r, this);
    }),
    (i.default.fn.modal = qt._jQueryInterface),
    (i.default.fn.modal.Constructor = qt),
    (i.default.fn.modal.noConflict = function () {
      return (i.default.fn.modal = Rt), qt._jQueryInterface;
    });
  var Bt = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    Qt = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    Wt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
    Ut =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  function Vt(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (
      var i = new window.DOMParser().parseFromString(t, "text/html"),
        o = Object.keys(e),
        r = [].slice.call(i.body.querySelectorAll("*")),
        a = function (t, n) {
          var i = r[t],
            a = i.nodeName.toLowerCase();
          if (-1 === o.indexOf(i.nodeName.toLowerCase()))
            return i.parentNode.removeChild(i), "continue";
          var s = [].slice.call(i.attributes),
            l = [].concat(e["*"] || [], e[a] || []);
          s.forEach(function (t) {
            (function (t, e) {
              var n = t.nodeName.toLowerCase();
              if (-1 !== e.indexOf(n))
                return (
                  -1 === Bt.indexOf(n) ||
                  Boolean(t.nodeValue.match(Wt) || t.nodeValue.match(Ut))
                );
              for (
                var i = e.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  o = 0,
                  r = i.length;
                o < r;
                o++
              )
                if (n.match(i[o])) return !0;
              return !1;
            })(t, l) || i.removeAttribute(t.nodeName);
          });
        },
        s = 0,
        l = r.length;
      s < l;
      s++
    )
      a(s);
    return i.body.innerHTML;
  }
  var Yt = "tooltip",
    zt = i.default.fn[Yt],
    Xt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Kt = ["sanitize", "whiteList", "sanitizeFn"],
    Gt = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    $t = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    Jt = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: Qt,
      popperConfig: null,
    },
    Zt = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    },
    te = (function () {
      function t(t, e) {
        if ("undefined" == typeof It)
          throw new TypeError(
            "Bootstrap's tooltips require Popper (https://popper.js.org)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var e = t.prototype;
      return (
        (e.enable = function () {
          this._isEnabled = !0;
        }),
        (e.disable = function () {
          this._isEnabled = !1;
        }),
        (e.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (e.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var e = this.constructor.DATA_KEY,
                n = i.default(t.currentTarget).data(e);
              n ||
                ((n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                i.default(t.currentTarget).data(e, n)),
                (n._activeTrigger.click = !n._activeTrigger.click),
                n._isWithActiveTrigger()
                  ? n._enter(null, n)
                  : n._leave(null, n);
            } else {
              if (i.default(this.getTipElement()).hasClass("show"))
                return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (e.dispose = function () {
          clearTimeout(this._timeout),
            i.default.removeData(this.element, this.constructor.DATA_KEY),
            i.default(this.element).off(this.constructor.EVENT_KEY),
            i
              .default(this.element)
              .closest(".modal")
              .off("hide.bs.modal", this._hideModalHandler),
            this.tip && i.default(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (e.show = function () {
          var t = this;
          if ("none" === i.default(this.element).css("display"))
            throw new Error("Please use show on visible elements");
          var e = i.default.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            i.default(this.element).trigger(e);
            var n = l.findShadowRoot(this.element),
              o = i.default.contains(
                null !== n ? n : this.element.ownerDocument.documentElement,
                this.element
              );
            if (e.isDefaultPrevented() || !o) return;
            var r = this.getTipElement(),
              a = l.getUID(this.constructor.NAME);
            r.setAttribute("id", a),
              this.element.setAttribute("aria-describedby", a),
              this.setContent(),
              this.config.animation && i.default(r).addClass("fade");
            var s =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, r, this.element)
                  : this.config.placement,
              u = this._getAttachment(s);
            this.addAttachmentClass(u);
            var f = this._getContainer();
            i.default(r).data(this.constructor.DATA_KEY, this),
              i.default.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || i.default(r).appendTo(f),
              i.default(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new It(
                this.element,
                r,
                this._getPopperConfig(u)
              )),
              i.default(r).addClass("show"),
              i.default(r).addClass(this.config.customClass),
              "ontouchstart" in document.documentElement &&
                i
                  .default(document.body)
                  .children()
                  .on("mouseover", null, i.default.noop);
            var d = function () {
              t.config.animation && t._fixTransition();
              var e = t._hoverState;
              (t._hoverState = null),
                i.default(t.element).trigger(t.constructor.Event.SHOWN),
                "out" === e && t._leave(null, t);
            };
            if (i.default(this.tip).hasClass("fade")) {
              var c = l.getTransitionDurationFromElement(this.tip);
              i.default(this.tip)
                .one(l.TRANSITION_END, d)
                .emulateTransitionEnd(c);
            } else d();
          }
        }),
        (e.hide = function (t) {
          var e = this,
            n = this.getTipElement(),
            o = i.default.Event(this.constructor.Event.HIDE),
            r = function () {
              "show" !== e._hoverState &&
                n.parentNode &&
                n.parentNode.removeChild(n),
                e._cleanTipClass(),
                e.element.removeAttribute("aria-describedby"),
                i.default(e.element).trigger(e.constructor.Event.HIDDEN),
                null !== e._popper && e._popper.destroy(),
                t && t();
            };
          if ((i.default(this.element).trigger(o), !o.isDefaultPrevented())) {
            if (
              (i.default(n).removeClass("show"),
              "ontouchstart" in document.documentElement &&
                i
                  .default(document.body)
                  .children()
                  .off("mouseover", null, i.default.noop),
              (this._activeTrigger.click = !1),
              (this._activeTrigger.focus = !1),
              (this._activeTrigger.hover = !1),
              i.default(this.tip).hasClass("fade"))
            ) {
              var a = l.getTransitionDurationFromElement(n);
              i.default(n).one(l.TRANSITION_END, r).emulateTransitionEnd(a);
            } else r();
            this._hoverState = "";
          }
        }),
        (e.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (e.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (e.addAttachmentClass = function (t) {
          i.default(this.getTipElement()).addClass("bs-tooltip-" + t);
        }),
        (e.getTipElement = function () {
          return (
            (this.tip = this.tip || i.default(this.config.template)[0]),
            this.tip
          );
        }),
        (e.setContent = function () {
          var t = this.getTipElement();
          this.setElementContent(
            i.default(t.querySelectorAll(".tooltip-inner")),
            this.getTitle()
          ),
            i.default(t).removeClass("fade show");
        }),
        (e.setElementContent = function (t, e) {
          "object" != typeof e || (!e.nodeType && !e.jquery)
            ? this.config.html
              ? (this.config.sanitize &&
                  (e = Vt(e, this.config.whiteList, this.config.sanitizeFn)),
                t.html(e))
              : t.text(e)
            : this.config.html
            ? i.default(e).parent().is(t) || t.empty().append(e)
            : t.text(i.default(e).text());
        }),
        (e.getTitle = function () {
          var t = this.element.getAttribute("data-original-title");
          return (
            t ||
              (t =
                "function" == typeof this.config.title
                  ? this.config.title.call(this.element)
                  : this.config.title),
            t
          );
        }),
        (e._getPopperConfig = function (t) {
          var e = this;
          return a(
            {},
            {
              placement: t,
              modifiers: {
                offset: this._getOffset(),
                flip: { behavior: this.config.fallbackPlacement },
                arrow: { element: ".arrow" },
                preventOverflow: { boundariesElement: this.config.boundary },
              },
              onCreate: function (t) {
                t.originalPlacement !== t.placement &&
                  e._handlePopperPlacementChange(t);
              },
              onUpdate: function (t) {
                return e._handlePopperPlacementChange(t);
              },
            },
            this.config.popperConfig
          );
        }),
        (e._getOffset = function () {
          var t = this,
            e = {};
          return (
            "function" == typeof this.config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = a(
                      {},
                      e.offsets,
                      t.config.offset(e.offsets, t.element) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this.config.offset),
            e
          );
        }),
        (e._getContainer = function () {
          return !1 === this.config.container
            ? document.body
            : l.isElement(this.config.container)
            ? i.default(this.config.container)
            : i.default(document).find(this.config.container);
        }),
        (e._getAttachment = function (t) {
          return $t[t.toUpperCase()];
        }),
        (e._setListeners = function () {
          var t = this;
          this.config.trigger.split(" ").forEach(function (e) {
            if ("click" === e)
              i.default(t.element).on(
                t.constructor.Event.CLICK,
                t.config.selector,
                function (e) {
                  return t.toggle(e);
                }
              );
            else if ("manual" !== e) {
              var n =
                  "hover" === e
                    ? t.constructor.Event.MOUSEENTER
                    : t.constructor.Event.FOCUSIN,
                o =
                  "hover" === e
                    ? t.constructor.Event.MOUSELEAVE
                    : t.constructor.Event.FOCUSOUT;
              i.default(t.element)
                .on(n, t.config.selector, function (e) {
                  return t._enter(e);
                })
                .on(o, t.config.selector, function (e) {
                  return t._leave(e);
                });
            }
          }),
            (this._hideModalHandler = function () {
              t.element && t.hide();
            }),
            i
              .default(this.element)
              .closest(".modal")
              .on("hide.bs.modal", this._hideModalHandler),
            this.config.selector
              ? (this.config = a({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (e._fixTitle = function () {
          var t = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== t) &&
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (e._enter = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || i.default(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            i.default(t.currentTarget).data(n, e)),
            t &&
              (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
            i.default(e.getTipElement()).hasClass("show") ||
            "show" === e._hoverState
              ? (e._hoverState = "show")
              : (clearTimeout(e._timeout),
                (e._hoverState = "show"),
                e.config.delay && e.config.delay.show
                  ? (e._timeout = setTimeout(function () {
                      "show" === e._hoverState && e.show();
                    }, e.config.delay.show))
                  : e.show());
        }),
        (e._leave = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || i.default(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            i.default(t.currentTarget).data(n, e)),
            t &&
              (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
                !1),
            e._isWithActiveTrigger() ||
              (clearTimeout(e._timeout),
              (e._hoverState = "out"),
              e.config.delay && e.config.delay.hide
                ? (e._timeout = setTimeout(function () {
                    "out" === e._hoverState && e.hide();
                  }, e.config.delay.hide))
                : e.hide());
        }),
        (e._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1;
        }),
        (e._getConfig = function (t) {
          var e = i.default(this.element).data();
          return (
            Object.keys(e).forEach(function (t) {
              -1 !== Kt.indexOf(t) && delete e[t];
            }),
            "number" ==
              typeof (t = a(
                {},
                this.constructor.Default,
                e,
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            l.typeCheckConfig(Yt, t, this.constructor.DefaultType),
            t.sanitize &&
              (t.template = Vt(t.template, t.whiteList, t.sanitizeFn)),
            t
          );
        }),
        (e._getDelegateConfig = function () {
          var t = {};
          if (this.config)
            for (var e in this.config)
              this.constructor.Default[e] !== this.config[e] &&
                (t[e] = this.config[e]);
          return t;
        }),
        (e._cleanTipClass = function () {
          var t = i.default(this.getTipElement()),
            e = t.attr("class").match(Xt);
          null !== e && e.length && t.removeClass(e.join(""));
        }),
        (e._handlePopperPlacementChange = function (t) {
          (this.tip = t.instance.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement));
        }),
        (e._fixTransition = function () {
          var t = this.getTipElement(),
            e = this.config.animation;
          null === t.getAttribute("x-placement") &&
            (i.default(t).removeClass("fade"),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = e));
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this),
              o = n.data("bs.tooltip"),
              r = "object" == typeof e && e;
            if (
              (o || !/dispose|hide/.test(e)) &&
              (o || ((o = new t(this, r)), n.data("bs.tooltip", o)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof o[e])
                throw new TypeError('No method named "' + e + '"');
              o[e]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return Jt;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Yt;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return "bs.tooltip";
            },
          },
          {
            key: "Event",
            get: function () {
              return Zt;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.tooltip";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Gt;
            },
          },
        ]),
        t
      );
    })();
  (i.default.fn[Yt] = te._jQueryInterface),
    (i.default.fn[Yt].Constructor = te),
    (i.default.fn[Yt].noConflict = function () {
      return (i.default.fn[Yt] = zt), te._jQueryInterface;
    });
  var ee = "popover",
    ne = i.default.fn[ee],
    ie = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    oe = a({}, te.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    re = a({}, te.DefaultType, { content: "(string|element|function)" }),
    ae = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    },
    se = (function (t) {
      var e, n;
      function o() {
        return t.apply(this, arguments) || this;
      }
      (n = t),
        ((e = o).prototype = Object.create(n.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = n);
      var a = o.prototype;
      return (
        (a.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (a.addAttachmentClass = function (t) {
          i.default(this.getTipElement()).addClass("bs-popover-" + t);
        }),
        (a.getTipElement = function () {
          return (
            (this.tip = this.tip || i.default(this.config.template)[0]),
            this.tip
          );
        }),
        (a.setContent = function () {
          var t = i.default(this.getTipElement());
          this.setElementContent(t.find(".popover-header"), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)),
            this.setElementContent(t.find(".popover-body"), e),
            t.removeClass("fade show");
        }),
        (a._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (a._cleanTipClass = function () {
          var t = i.default(this.getTipElement()),
            e = t.attr("class").match(ie);
          null !== e && e.length > 0 && t.removeClass(e.join(""));
        }),
        (o._jQueryInterface = function (t) {
          return this.each(function () {
            var e = i.default(this).data("bs.popover"),
              n = "object" == typeof t ? t : null;
            if (
              (e || !/dispose|hide/.test(t)) &&
              (e ||
                ((e = new o(this, n)), i.default(this).data("bs.popover", e)),
              "string" == typeof t)
            ) {
              if ("undefined" == typeof e[t])
                throw new TypeError('No method named "' + t + '"');
              e[t]();
            }
          });
        }),
        r(o, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return oe;
            },
          },
          {
            key: "NAME",
            get: function () {
              return ee;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return "bs.popover";
            },
          },
          {
            key: "Event",
            get: function () {
              return ae;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.popover";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return re;
            },
          },
        ]),
        o
      );
    })(te);
  (i.default.fn[ee] = se._jQueryInterface),
    (i.default.fn[ee].Constructor = se),
    (i.default.fn[ee].noConflict = function () {
      return (i.default.fn[ee] = ne), se._jQueryInterface;
    });
  var le = "scrollspy",
    ue = i.default.fn[le],
    fe = { offset: 10, method: "auto", target: "" },
    de = { offset: "number", method: "string", target: "(string|element)" },
    ce = (function () {
      function t(t, e) {
        var n = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(e)),
          (this._selector =
            this._config.target +
            " .nav-link," +
            this._config.target +
            " .list-group-item," +
            this._config.target +
            " .dropdown-item"),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          i
            .default(this._scrollElement)
            .on("scroll.bs.scrollspy", function (t) {
              return n._process(t);
            }),
          this.refresh(),
          this._process();
      }
      var e = t.prototype;
      return (
        (e.refresh = function () {
          var t = this,
            e =
              this._scrollElement === this._scrollElement.window
                ? "offset"
                : "position",
            n = "auto" === this._config.method ? e : this._config.method,
            o = "position" === n ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var e,
                  r = l.getSelectorFromElement(t);
                if ((r && (e = document.querySelector(r)), e)) {
                  var a = e.getBoundingClientRect();
                  if (a.width || a.height)
                    return [i.default(e)[n]().top + o, r];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (e) {
                t._offsets.push(e[0]), t._targets.push(e[1]);
              });
        }),
        (e.dispose = function () {
          i.default.removeData(this._element, "bs.scrollspy"),
            i.default(this._scrollElement).off(".bs.scrollspy"),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (e._getConfig = function (t) {
          if (
            "string" !=
              typeof (t = a({}, fe, "object" == typeof t && t ? t : {}))
                .target &&
            l.isElement(t.target)
          ) {
            var e = i.default(t.target).attr("id");
            e || ((e = l.getUID(le)), i.default(t.target).attr("id", e)),
              (t.target = "#" + e);
          }
          return l.typeCheckConfig(le, t, de), t;
        }),
        (e._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (e._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (e._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (e._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              this._offsets[0] > 0
            )
              return (this._activeTarget = null), void this._clear();
            for (var o = this._offsets.length; o--; ) {
              this._activeTarget !== this._targets[o] &&
                t >= this._offsets[o] &&
                ("undefined" == typeof this._offsets[o + 1] ||
                  t < this._offsets[o + 1]) &&
                this._activate(this._targets[o]);
            }
          }
        }),
        (e._activate = function (t) {
          (this._activeTarget = t), this._clear();
          var e = this._selector.split(",").map(function (e) {
              return (
                e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
              );
            }),
            n = i.default(
              [].slice.call(document.querySelectorAll(e.join(",")))
            );
          n.hasClass("dropdown-item")
            ? (n
                .closest(".dropdown")
                .find(".dropdown-toggle")
                .addClass("active"),
              n.addClass("active"))
            : (n.addClass("active"),
              n
                .parents(".nav, .list-group")
                .prev(".nav-link, .list-group-item")
                .addClass("active"),
              n
                .parents(".nav, .list-group")
                .prev(".nav-item")
                .children(".nav-link")
                .addClass("active")),
            i
              .default(this._scrollElement)
              .trigger("activate.bs.scrollspy", { relatedTarget: t });
        }),
        (e._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains("active");
            })
            .forEach(function (t) {
              return t.classList.remove("active");
            });
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this).data("bs.scrollspy");
            if (
              (n ||
                ((n = new t(this, "object" == typeof e && e)),
                i.default(this).data("bs.scrollspy", n)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof n[e])
                throw new TypeError('No method named "' + e + '"');
              n[e]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "Default",
            get: function () {
              return fe;
            },
          },
        ]),
        t
      );
    })();
  i.default(window).on("load.bs.scrollspy.data-api", function () {
    for (
      var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
        e = t.length;
      e--;

    ) {
      var n = i.default(t[e]);
      ce._jQueryInterface.call(n, n.data());
    }
  }),
    (i.default.fn[le] = ce._jQueryInterface),
    (i.default.fn[le].Constructor = ce),
    (i.default.fn[le].noConflict = function () {
      return (i.default.fn[le] = ue), ce._jQueryInterface;
    });
  var he = i.default.fn.tab,
    pe = (function () {
      function t(t) {
        this._element = t;
      }
      var e = t.prototype;
      return (
        (e.show = function () {
          var t = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                i.default(this._element).hasClass("active")) ||
              i.default(this._element).hasClass("disabled")
            )
          ) {
            var e,
              n,
              o = i.default(this._element).closest(".nav, .list-group")[0],
              r = l.getSelectorFromElement(this._element);
            if (o) {
              var a =
                "UL" === o.nodeName || "OL" === o.nodeName
                  ? "> li > .active"
                  : ".active";
              n = (n = i.default.makeArray(i.default(o).find(a)))[n.length - 1];
            }
            var s = i.default.Event("hide.bs.tab", {
                relatedTarget: this._element,
              }),
              u = i.default.Event("show.bs.tab", { relatedTarget: n });
            if (
              (n && i.default(n).trigger(s),
              i.default(this._element).trigger(u),
              !u.isDefaultPrevented() && !s.isDefaultPrevented())
            ) {
              r && (e = document.querySelector(r)),
                this._activate(this._element, o);
              var f = function () {
                var e = i.default.Event("hidden.bs.tab", {
                    relatedTarget: t._element,
                  }),
                  o = i.default.Event("shown.bs.tab", { relatedTarget: n });
                i.default(n).trigger(e), i.default(t._element).trigger(o);
              };
              e ? this._activate(e, e.parentNode, f) : f();
            }
          }
        }),
        (e.dispose = function () {
          i.default.removeData(this._element, "bs.tab"), (this._element = null);
        }),
        (e._activate = function (t, e, n) {
          var o = this,
            r = (
              !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                ? i.default(e).children(".active")
                : i.default(e).find("> li > .active")
            )[0],
            a = n && r && i.default(r).hasClass("fade"),
            s = function () {
              return o._transitionComplete(t, r, n);
            };
          if (r && a) {
            var u = l.getTransitionDurationFromElement(r);
            i.default(r)
              .removeClass("show")
              .one(l.TRANSITION_END, s)
              .emulateTransitionEnd(u);
          } else s();
        }),
        (e._transitionComplete = function (t, e, n) {
          if (e) {
            i.default(e).removeClass("active");
            var o = i.default(e.parentNode).find("> .dropdown-menu .active")[0];
            o && i.default(o).removeClass("active"),
              "tab" === e.getAttribute("role") &&
                e.setAttribute("aria-selected", !1);
          }
          if (
            (i.default(t).addClass("active"),
            "tab" === t.getAttribute("role") &&
              t.setAttribute("aria-selected", !0),
            l.reflow(t),
            t.classList.contains("fade") && t.classList.add("show"),
            t.parentNode && i.default(t.parentNode).hasClass("dropdown-menu"))
          ) {
            var r = i.default(t).closest(".dropdown")[0];
            if (r) {
              var a = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
              i.default(a).addClass("active");
            }
            t.setAttribute("aria-expanded", !0);
          }
          n && n();
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this),
              o = n.data("bs.tab");
            if (
              (o || ((o = new t(this)), n.data("bs.tab", o)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof o[e])
                throw new TypeError('No method named "' + e + '"');
              o[e]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
        ]),
        t
      );
    })();
  i
    .default(document)
    .on(
      "click.bs.tab.data-api",
      '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      function (t) {
        t.preventDefault(), pe._jQueryInterface.call(i.default(this), "show");
      }
    ),
    (i.default.fn.tab = pe._jQueryInterface),
    (i.default.fn.tab.Constructor = pe),
    (i.default.fn.tab.noConflict = function () {
      return (i.default.fn.tab = he), pe._jQueryInterface;
    });
  var me = i.default.fn.toast,
    ge = { animation: "boolean", autohide: "boolean", delay: "number" },
    ve = { animation: !0, autohide: !0, delay: 500 },
    _e = (function () {
      function t(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var e = t.prototype;
      return (
        (e.show = function () {
          var t = this,
            e = i.default.Event("show.bs.toast");
          if ((i.default(this._element).trigger(e), !e.isDefaultPrevented())) {
            this._clearTimeout(),
              this._config.animation && this._element.classList.add("fade");
            var n = function () {
              t._element.classList.remove("showing"),
                t._element.classList.add("show"),
                i.default(t._element).trigger("shown.bs.toast"),
                t._config.autohide &&
                  (t._timeout = setTimeout(function () {
                    t.hide();
                  }, t._config.delay));
            };
            if (
              (this._element.classList.remove("hide"),
              l.reflow(this._element),
              this._element.classList.add("showing"),
              this._config.animation)
            ) {
              var o = l.getTransitionDurationFromElement(this._element);
              i.default(this._element)
                .one(l.TRANSITION_END, n)
                .emulateTransitionEnd(o);
            } else n();
          }
        }),
        (e.hide = function () {
          if (this._element.classList.contains("show")) {
            var t = i.default.Event("hide.bs.toast");
            i.default(this._element).trigger(t),
              t.isDefaultPrevented() || this._close();
          }
        }),
        (e.dispose = function () {
          this._clearTimeout(),
            this._element.classList.contains("show") &&
              this._element.classList.remove("show"),
            i.default(this._element).off("click.dismiss.bs.toast"),
            i.default.removeData(this._element, "bs.toast"),
            (this._element = null),
            (this._config = null);
        }),
        (e._getConfig = function (t) {
          return (
            (t = a(
              {},
              ve,
              i.default(this._element).data(),
              "object" == typeof t && t ? t : {}
            )),
            l.typeCheckConfig("toast", t, this.constructor.DefaultType),
            t
          );
        }),
        (e._setListeners = function () {
          var t = this;
          i.default(this._element).on(
            "click.dismiss.bs.toast",
            '[data-dismiss="toast"]',
            function () {
              return t.hide();
            }
          );
        }),
        (e._close = function () {
          var t = this,
            e = function () {
              t._element.classList.add("hide"),
                i.default(t._element).trigger("hidden.bs.toast");
            };
          if (
            (this._element.classList.remove("show"), this._config.animation)
          ) {
            var n = l.getTransitionDurationFromElement(this._element);
            i.default(this._element)
              .one(l.TRANSITION_END, e)
              .emulateTransitionEnd(n);
          } else e();
        }),
        (e._clearTimeout = function () {
          clearTimeout(this._timeout), (this._timeout = null);
        }),
        (t._jQueryInterface = function (e) {
          return this.each(function () {
            var n = i.default(this),
              o = n.data("bs.toast");
            if (
              (o ||
                ((o = new t(this, "object" == typeof e && e)),
                n.data("bs.toast", o)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof o[e])
                throw new TypeError('No method named "' + e + '"');
              o[e](this);
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.6.0";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return ge;
            },
          },
          {
            key: "Default",
            get: function () {
              return ve;
            },
          },
        ]),
        t
      );
    })();
  (i.default.fn.toast = _e._jQueryInterface),
    (i.default.fn.toast.Constructor = _e),
    (i.default.fn.toast.noConflict = function () {
      return (i.default.fn.toast = me), _e._jQueryInterface;
    }),
    (t.Alert = d),
    (t.Button = h),
    (t.Carousel = y),
    (t.Collapse = S),
    (t.Dropdown = Ft),
    (t.Modal = qt),
    (t.Popover = se),
    (t.Scrollspy = ce),
    (t.Tab = pe),
    (t.Toast = _e),
    (t.Tooltip = te),
    (t.Util = l),
    Object.defineProperty(t, "__esModule", { value: !0 });
});

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, h) {
          var u = a.data(h, i);
          if (!u)
            return void s(
              i + " not initialized. Cannot call methods, i.e. " + r
            );
          var d = u[e];
          if (!d || "_" == e.charAt(0))
            return void s(r + " is not a valid method");
          var l = d.apply(u, n);
          o = void 0 === o ? l : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      "undefined" == typeof r
        ? function () {}
        : function (t) {
            r.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {});
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], o = 0;
            o < i.length;
            o++
          ) {
            var r = i[o],
              s = n && n[r];
            s && (this.off(t, r), delete n[r]), r.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (s = 200 == Math.round(t(o.width))),
          (r.isBoxSizeOuter = s),
          i.removeChild(e);
      }
    }
    function r(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var r = n(e);
        if ("none" == r.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == r.boxSizing), l = 0;
          u > l;
          l++
        ) {
          var c = h[l],
            f = r[c],
            m = parseFloat(f);
          a[c] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (E ? 0 : p + _));
        var x = t(r.height);
        return (
          x !== !1 && (a.height = x + (E ? 0 : g + z)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + z)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var s,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      u = h.length,
      d = !1;
    return r;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var n = Array.prototype.slice;
    (i.makeArray = function (t) {
      if (Array.isArray(t)) return t;
      if (null === t || void 0 === t) return [];
      var e = "object" == typeof t && "number" == typeof t.length;
      return e ? n.call(t) : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                o.push(i[r]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var o = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var r = i.toDashed(n),
            s = "data-" + r,
            a = document.querySelectorAll("[" + s + "]"),
            h = document.querySelectorAll(".js-" + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + "-options",
            l = t.jQuery;
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d);
            try {
              i = r && JSON.parse(r);
            } catch (a) {
              return void (
                o &&
                o.error("Error parsing " + s + " on " + t.className + ": " + a)
              );
            }
            var h = new e(t, i);
            l && l.data(t, n, h);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[s],
      u = {
        transform: a,
        transition: s,
        transitionDuration: s + "Duration",
        transitionProperty: s + "Property",
        transitionDelay: s + "Delay",
      },
      d = (n.prototype = Object.create(t.prototype));
    (d.constructor = n),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = u[i] || i;
          e[n] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          r = parseFloat(n),
          s = parseFloat(o),
          a = this.layout.size;
        -1 != n.indexOf("%") && (r = (r / 100) * a.width),
          -1 != o.indexOf("%") && (s = (s / 100) * a.height),
          (r = isNaN(r) ? 0 : r),
          (s = isNaN(s) ? 0 : s),
          (r -= e ? a.paddingLeft : a.paddingRight),
          (s -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = r),
          (this.position.y = s);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          r = i ? "left" : "right",
          s = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[r] = this.getXValue(a)), (e[s] = "");
        var h = n ? "paddingTop" : "paddingBottom",
          u = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          l = this.position.y + t[h];
        (e[u] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), o && !this.isTransitioning))
          return void this.layoutPosition();
        var r = t - i,
          s = e - n,
          a = {};
        (a.transform = this.getTranslate(r, s)),
          this.transition({
            to: a,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + o(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(h, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var c = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = c[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(h, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var f = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(f);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      n
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++l;
      (this.element.outlayerGUID = o), (c[o] = this), this._create();
      var r = this._getOption("initLayout");
      r && this.layout();
    }
    function s(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var o = m[n] || 1;
      return i * o;
    }
    var h = t.console,
      u = t.jQuery,
      d = function () {},
      l = 0,
      c = {};
    (r.namespace = "outlayer"),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var f = r.prototype;
    n.extend(f, e.prototype),
      (f.option = function (t) {
        n.extend(this.options, t);
      }),
      (f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (f._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (f.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (f._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this);
          n.push(s);
        }
        return n;
      }),
      (f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (f.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (f._init = f.layout),
      (f._resetLayout = function () {
        this.getSize();
      }),
      (f.getSize = function () {
        this.size = i(this.element);
      }),
      (f._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (f.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (f._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (f._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (f._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
      }),
      (f._postLayout = function () {
        this.resizeContainer();
      }),
      (f.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (f._getContainerSize = d),
      (f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (f._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          s++, s == r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), u))
          if (((this.$element = this.$element || u(this.element)), e)) {
            var o = u.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (f.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (f.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (f._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (f._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (f._manageStamp = d),
      (f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (f.handleEvent = n.handleEvent),
      (f.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (f.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (f.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(r, "onresize", 100),
      (f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (f.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (f.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (f.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (f.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (r.create = function (t, e) {
        var i = s(r);
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (r.Item = o), r;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return (
      (n._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (n.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? "round" : "floor";
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (n.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? "round" : "ceil",
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this.options.horizontalOrder
              ? "_getHorizontalColPosition"
              : "_getTopColPosition",
            r = this[o](n, t),
            s = { x: this.columnWidth * r.col, y: r.y },
            a = r.y + t.size.outerHeight,
            h = n + r.col,
            u = r.col;
          h > u;
          u++
        )
          this.colYs[u] = a;
        return s;
      }),
      (n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
          e[n] = this._getColGroupY(n, t);
        return e;
      }),
      (n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = o ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (n._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft"),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var u = this._getOption("originTop"),
            d = (u ? n.top : n.bottom) + i.outerHeight,
            l = a;
          h >= l;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  });
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return n.indexOf(t) == -1 && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return n != -1 && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        (i = i.slice(0)), (t = t || []);
        for (
          var n = this._onceEvents && this._onceEvents[e], o = 0;
          o < i.length;
          o++
        ) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(e, r), delete n[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      if (Array.isArray(e)) return e;
      var t = "object" == typeof e && "number" == typeof e.length;
      return t ? d.call(e) : [e];
    }
    function o(e, t, r) {
      if (!(this instanceof o)) return new o(e, t, r);
      var s = e;
      return (
        "string" == typeof e && (s = document.querySelectorAll(e)),
        s
          ? ((this.elements = n(s)),
            (this.options = i({}, this.options)),
            "function" == typeof t ? (r = t) : i(this.options, t),
            r && this.on("always", r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (s || e))
      );
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });
/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

!(function (n, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (n.anime = e());
})(this, function () {
  "use strict";
  var n = {
      update: null,
      begin: null,
      loopBegin: null,
      changeBegin: null,
      change: null,
      changeComplete: null,
      loopComplete: null,
      complete: null,
      loop: 1,
      direction: "normal",
      autoplay: !0,
      timelineOffset: 0,
    },
    e = {
      duration: 1e3,
      delay: 0,
      endDelay: 0,
      easing: "easeOutElastic(1, .5)",
      round: 0,
    },
    t = [
      "translateX",
      "translateY",
      "translateZ",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "scale",
      "scaleX",
      "scaleY",
      "scaleZ",
      "skew",
      "skewX",
      "skewY",
      "perspective",
      "matrix",
      "matrix3d",
    ],
    r = { CSS: {}, springs: {} };
  function a(n, e, t) {
    return Math.min(Math.max(n, e), t);
  }
  function o(n, e) {
    return n.indexOf(e) > -1;
  }
  function u(n, e) {
    return n.apply(null, e);
  }
  var i = {
    arr: function (n) {
      return Array.isArray(n);
    },
    obj: function (n) {
      return o(Object.prototype.toString.call(n), "Object");
    },
    pth: function (n) {
      return i.obj(n) && n.hasOwnProperty("totalLength");
    },
    svg: function (n) {
      return n instanceof SVGElement;
    },
    inp: function (n) {
      return n instanceof HTMLInputElement;
    },
    dom: function (n) {
      return n.nodeType || i.svg(n);
    },
    str: function (n) {
      return "string" == typeof n;
    },
    fnc: function (n) {
      return "function" == typeof n;
    },
    und: function (n) {
      return void 0 === n;
    },
    nil: function (n) {
      return i.und(n) || null === n;
    },
    hex: function (n) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n);
    },
    rgb: function (n) {
      return /^rgb/.test(n);
    },
    hsl: function (n) {
      return /^hsl/.test(n);
    },
    col: function (n) {
      return i.hex(n) || i.rgb(n) || i.hsl(n);
    },
    key: function (t) {
      return (
        !n.hasOwnProperty(t) &&
        !e.hasOwnProperty(t) &&
        "targets" !== t &&
        "keyframes" !== t
      );
    },
  };
  function c(n) {
    var e = /\(([^)]+)\)/.exec(n);
    return e
      ? e[1].split(",").map(function (n) {
          return parseFloat(n);
        })
      : [];
  }
  function s(n, e) {
    var t = c(n),
      o = a(i.und(t[0]) ? 1 : t[0], 0.1, 100),
      u = a(i.und(t[1]) ? 100 : t[1], 0.1, 100),
      s = a(i.und(t[2]) ? 10 : t[2], 0.1, 100),
      f = a(i.und(t[3]) ? 0 : t[3], 0.1, 100),
      l = Math.sqrt(u / o),
      d = s / (2 * Math.sqrt(u * o)),
      p = d < 1 ? l * Math.sqrt(1 - d * d) : 0,
      v = 1,
      h = d < 1 ? (d * l - f) / p : -f + l;
    function g(n) {
      var t = e ? (e * n) / 1e3 : n;
      return (
        (t =
          d < 1
            ? Math.exp(-t * d * l) * (v * Math.cos(p * t) + h * Math.sin(p * t))
            : (v + h * t) * Math.exp(-t * l)),
        0 === n || 1 === n ? n : 1 - t
      );
    }
    return e
      ? g
      : function () {
          var e = r.springs[n];
          if (e) return e;
          for (var t = 0, a = 0; ; )
            if (1 === g((t += 1 / 6))) {
              if (++a >= 16) break;
            } else a = 0;
          var o = t * (1 / 6) * 1e3;
          return (r.springs[n] = o), o;
        };
  }
  function f(n) {
    return (
      void 0 === n && (n = 10),
      function (e) {
        return Math.ceil(a(e, 1e-6, 1) * n) * (1 / n);
      }
    );
  }
  var l,
    d,
    p = (function () {
      var n = 11,
        e = 1 / (n - 1);
      function t(n, e) {
        return 1 - 3 * e + 3 * n;
      }
      function r(n, e) {
        return 3 * e - 6 * n;
      }
      function a(n) {
        return 3 * n;
      }
      function o(n, e, o) {
        return ((t(e, o) * n + r(e, o)) * n + a(e)) * n;
      }
      function u(n, e, o) {
        return 3 * t(e, o) * n * n + 2 * r(e, o) * n + a(e);
      }
      return function (t, r, a, i) {
        if (0 <= t && t <= 1 && 0 <= a && a <= 1) {
          var c = new Float32Array(n);
          if (t !== r || a !== i)
            for (var s = 0; s < n; ++s) c[s] = o(s * e, t, a);
          return function (n) {
            return t === r && a === i
              ? n
              : 0 === n || 1 === n
              ? n
              : o(f(n), r, i);
          };
        }
        function f(r) {
          for (var i = 0, s = 1, f = n - 1; s !== f && c[s] <= r; ++s) i += e;
          var l = i + ((r - c[--s]) / (c[s + 1] - c[s])) * e,
            d = u(l, t, a);
          return d >= 0.001
            ? (function (n, e, t, r) {
                for (var a = 0; a < 4; ++a) {
                  var i = u(e, t, r);
                  if (0 === i) return e;
                  e -= (o(e, t, r) - n) / i;
                }
                return e;
              })(r, l, t, a)
            : 0 === d
            ? l
            : (function (n, e, t, r, a) {
                for (
                  var u, i, c = 0;
                  (u = o((i = e + (t - e) / 2), r, a) - n) > 0
                    ? (t = i)
                    : (e = i),
                    Math.abs(u) > 1e-7 && ++c < 10;

                );
                return i;
              })(r, i, i + e, t, a);
        }
      };
    })(),
    v =
      ((l = {
        linear: function () {
          return function (n) {
            return n;
          };
        },
      }),
      (d = {
        Sine: function () {
          return function (n) {
            return 1 - Math.cos((n * Math.PI) / 2);
          };
        },
        Circ: function () {
          return function (n) {
            return 1 - Math.sqrt(1 - n * n);
          };
        },
        Back: function () {
          return function (n) {
            return n * n * (3 * n - 2);
          };
        },
        Bounce: function () {
          return function (n) {
            for (var e, t = 4; n < ((e = Math.pow(2, --t)) - 1) / 11; );
            return (
              1 / Math.pow(4, 3 - t) -
              7.5625 * Math.pow((3 * e - 2) / 22 - n, 2)
            );
          };
        },
        Elastic: function (n, e) {
          void 0 === n && (n = 1), void 0 === e && (e = 0.5);
          var t = a(n, 1, 10),
            r = a(e, 0.1, 2);
          return function (n) {
            return 0 === n || 1 === n
              ? n
              : -t *
                  Math.pow(2, 10 * (n - 1)) *
                  Math.sin(
                    ((n - 1 - (r / (2 * Math.PI)) * Math.asin(1 / t)) *
                      (2 * Math.PI)) /
                      r
                  );
          };
        },
      }),
      ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (n, e) {
        d[n] = function () {
          return function (n) {
            return Math.pow(n, e + 2);
          };
        };
      }),
      Object.keys(d).forEach(function (n) {
        var e = d[n];
        (l["easeIn" + n] = e),
          (l["easeOut" + n] = function (n, t) {
            return function (r) {
              return 1 - e(n, t)(1 - r);
            };
          }),
          (l["easeInOut" + n] = function (n, t) {
            return function (r) {
              return r < 0.5 ? e(n, t)(2 * r) / 2 : 1 - e(n, t)(-2 * r + 2) / 2;
            };
          }),
          (l["easeOutIn" + n] = function (n, t) {
            return function (r) {
              return r < 0.5
                ? (1 - e(n, t)(1 - 2 * r)) / 2
                : (e(n, t)(2 * r - 1) + 1) / 2;
            };
          });
      }),
      l);
  function h(n, e) {
    if (i.fnc(n)) return n;
    var t = n.split("(")[0],
      r = v[t],
      a = c(n);
    switch (t) {
      case "spring":
        return s(n, e);
      case "cubicBezier":
        return u(p, a);
      case "steps":
        return u(f, a);
      default:
        return u(r, a);
    }
  }
  function g(n) {
    try {
      return document.querySelectorAll(n);
    } catch (n) {
      return;
    }
  }
  function m(n, e) {
    for (
      var t = n.length,
        r = arguments.length >= 2 ? arguments[1] : void 0,
        a = [],
        o = 0;
      o < t;
      o++
    )
      if (o in n) {
        var u = n[o];
        e.call(r, u, o, n) && a.push(u);
      }
    return a;
  }
  function y(n) {
    return n.reduce(function (n, e) {
      return n.concat(i.arr(e) ? y(e) : e);
    }, []);
  }
  function b(n) {
    return i.arr(n)
      ? n
      : (i.str(n) && (n = g(n) || n),
        n instanceof NodeList || n instanceof HTMLCollection
          ? [].slice.call(n)
          : [n]);
  }
  function M(n, e) {
    return n.some(function (n) {
      return n === e;
    });
  }
  function x(n) {
    var e = {};
    for (var t in n) e[t] = n[t];
    return e;
  }
  function w(n, e) {
    var t = x(n);
    for (var r in n) t[r] = e.hasOwnProperty(r) ? e[r] : n[r];
    return t;
  }
  function k(n, e) {
    var t = x(n);
    for (var r in e) t[r] = i.und(n[r]) ? e[r] : n[r];
    return t;
  }
  function O(n) {
    return i.rgb(n)
      ? (t = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((e = n)))
        ? "rgba(" + t[1] + ",1)"
        : e
      : i.hex(n)
      ? ((r = n.replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          function (n, e, t, r) {
            return e + e + t + t + r + r;
          }
        )),
        (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r)),
        "rgba(" +
          parseInt(a[1], 16) +
          "," +
          parseInt(a[2], 16) +
          "," +
          parseInt(a[3], 16) +
          ",1)")
      : i.hsl(n)
      ? (function (n) {
          var e,
            t,
            r,
            a =
              /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n) ||
              /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),
            o = parseInt(a[1], 10) / 360,
            u = parseInt(a[2], 10) / 100,
            i = parseInt(a[3], 10) / 100,
            c = a[4] || 1;
          function s(n, e, t) {
            return (
              t < 0 && (t += 1),
              t > 1 && (t -= 1),
              t < 1 / 6
                ? n + 6 * (e - n) * t
                : t < 0.5
                ? e
                : t < 2 / 3
                ? n + (e - n) * (2 / 3 - t) * 6
                : n
            );
          }
          if (0 == u) e = t = r = i;
          else {
            var f = i < 0.5 ? i * (1 + u) : i + u - i * u,
              l = 2 * i - f;
            (e = s(l, f, o + 1 / 3)),
              (t = s(l, f, o)),
              (r = s(l, f, o - 1 / 3));
          }
          return (
            "rgba(" + 255 * e + "," + 255 * t + "," + 255 * r + "," + c + ")"
          );
        })(n)
      : void 0;
    var e, t, r, a;
  }
  function C(n) {
    var e =
      /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
        n
      );
    if (e) return e[1];
  }
  function P(n, e) {
    return i.fnc(n) ? n(e.target, e.id, e.total) : n;
  }
  function I(n, e) {
    return n.getAttribute(e);
  }
  function D(n, e, t) {
    if (M([t, "deg", "rad", "turn"], C(e))) return e;
    var a = r.CSS[e + t];
    if (!i.und(a)) return a;
    var o = document.createElement(n.tagName),
      u =
        n.parentNode && n.parentNode !== document
          ? n.parentNode
          : document.body;
    u.appendChild(o),
      (o.style.position = "absolute"),
      (o.style.width = 100 + t);
    var c = 100 / o.offsetWidth;
    u.removeChild(o);
    var s = c * parseFloat(e);
    return (r.CSS[e + t] = s), s;
  }
  function B(n, e, t) {
    if (e in n.style) {
      var r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
        a = n.style[e] || getComputedStyle(n).getPropertyValue(r) || "0";
      return t ? D(n, a, t) : a;
    }
  }
  function T(n, e) {
    return i.dom(n) && !i.inp(n) && (!i.nil(I(n, e)) || (i.svg(n) && n[e]))
      ? "attribute"
      : i.dom(n) && M(t, e)
      ? "transform"
      : i.dom(n) && "transform" !== e && B(n, e)
      ? "css"
      : null != n[e]
      ? "object"
      : void 0;
  }
  function E(n) {
    if (i.dom(n)) {
      for (
        var e,
          t = n.style.transform || "",
          r = /(\w+)\(([^)]*)\)/g,
          a = new Map();
        (e = r.exec(t));

      )
        a.set(e[1], e[2]);
      return a;
    }
  }
  function F(n, e, t, r) {
    var a,
      u = o(e, "scale")
        ? 1
        : 0 +
          (o((a = e), "translate") || "perspective" === a
            ? "px"
            : o(a, "rotate") || o(a, "skew")
            ? "deg"
            : void 0),
      i = E(n).get(e) || u;
    return (
      t && (t.transforms.list.set(e, i), (t.transforms.last = e)),
      r ? D(n, i, r) : i
    );
  }
  function A(n, e, t, r) {
    switch (T(n, e)) {
      case "transform":
        return F(n, e, r, t);
      case "css":
        return B(n, e, t);
      case "attribute":
        return I(n, e);
      default:
        return n[e] || 0;
    }
  }
  function N(n, e) {
    var t = /^(\*=|\+=|-=)/.exec(n);
    if (!t) return n;
    var r = C(n) || 0,
      a = parseFloat(e),
      o = parseFloat(n.replace(t[0], ""));
    switch (t[0][0]) {
      case "+":
        return a + o + r;
      case "-":
        return a - o + r;
      case "*":
        return a * o + r;
    }
  }
  function S(n, e) {
    if (i.col(n)) return O(n);
    if (/\s/g.test(n)) return n;
    var t = C(n),
      r = t ? n.substr(0, n.length - t.length) : n;
    return e ? r + e : r;
  }
  function L(n, e) {
    return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2));
  }
  function j(n) {
    for (var e, t = n.points, r = 0, a = 0; a < t.numberOfItems; a++) {
      var o = t.getItem(a);
      a > 0 && (r += L(e, o)), (e = o);
    }
    return r;
  }
  function q(n) {
    if (n.getTotalLength) return n.getTotalLength();
    switch (n.tagName.toLowerCase()) {
      case "circle":
        return (o = n), 2 * Math.PI * I(o, "r");
      case "rect":
        return 2 * I((a = n), "width") + 2 * I(a, "height");
      case "line":
        return L(
          { x: I((r = n), "x1"), y: I(r, "y1") },
          { x: I(r, "x2"), y: I(r, "y2") }
        );
      case "polyline":
        return j(n);
      case "polygon":
        return (
          (t = (e = n).points),
          j(e) + L(t.getItem(t.numberOfItems - 1), t.getItem(0))
        );
    }
    var e, t, r, a, o;
  }
  function H(n, e) {
    var t = e || {},
      r =
        t.el ||
        (function (n) {
          for (var e = n.parentNode; i.svg(e) && i.svg(e.parentNode); )
            e = e.parentNode;
          return e;
        })(n),
      a = r.getBoundingClientRect(),
      o = I(r, "viewBox"),
      u = a.width,
      c = a.height,
      s = t.viewBox || (o ? o.split(" ") : [0, 0, u, c]);
    return {
      el: r,
      viewBox: s,
      x: s[0] / 1,
      y: s[1] / 1,
      w: u,
      h: c,
      vW: s[2],
      vH: s[3],
    };
  }
  function V(n, e, t) {
    function r(t) {
      void 0 === t && (t = 0);
      var r = e + t >= 1 ? e + t : 0;
      return n.el.getPointAtLength(r);
    }
    var a = H(n.el, n.svg),
      o = r(),
      u = r(-1),
      i = r(1),
      c = t ? 1 : a.w / a.vW,
      s = t ? 1 : a.h / a.vH;
    switch (n.property) {
      case "x":
        return (o.x - a.x) * c;
      case "y":
        return (o.y - a.y) * s;
      case "angle":
        return (180 * Math.atan2(i.y - u.y, i.x - u.x)) / Math.PI;
    }
  }
  function $(n, e) {
    var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
      r = S(i.pth(n) ? n.totalLength : n, e) + "";
    return {
      original: r,
      numbers: r.match(t) ? r.match(t).map(Number) : [0],
      strings: i.str(n) || e ? r.split(t) : [],
    };
  }
  function W(n) {
    return m(n ? y(i.arr(n) ? n.map(b) : b(n)) : [], function (n, e, t) {
      return t.indexOf(n) === e;
    });
  }
  function X(n) {
    var e = W(n);
    return e.map(function (n, t) {
      return { target: n, id: t, total: e.length, transforms: { list: E(n) } };
    });
  }
  function Y(n, e) {
    var t = x(e);
    if ((/^spring/.test(t.easing) && (t.duration = s(t.easing)), i.arr(n))) {
      var r = n.length;
      2 === r && !i.obj(n[0])
        ? (n = { value: n })
        : i.fnc(e.duration) || (t.duration = e.duration / r);
    }
    var a = i.arr(n) ? n : [n];
    return a
      .map(function (n, t) {
        var r = i.obj(n) && !i.pth(n) ? n : { value: n };
        return (
          i.und(r.delay) && (r.delay = t ? 0 : e.delay),
          i.und(r.endDelay) &&
            (r.endDelay = t === a.length - 1 ? e.endDelay : 0),
          r
        );
      })
      .map(function (n) {
        return k(n, t);
      });
  }
  function Z(n, e) {
    var t = [],
      r = e.keyframes;
    for (var a in (r &&
      (e = k(
        (function (n) {
          for (
            var e = m(
                y(
                  n.map(function (n) {
                    return Object.keys(n);
                  })
                ),
                function (n) {
                  return i.key(n);
                }
              ).reduce(function (n, e) {
                return n.indexOf(e) < 0 && n.push(e), n;
              }, []),
              t = {},
              r = function (r) {
                var a = e[r];
                t[a] = n.map(function (n) {
                  var e = {};
                  for (var t in n)
                    i.key(t) ? t == a && (e.value = n[t]) : (e[t] = n[t]);
                  return e;
                });
              },
              a = 0;
            a < e.length;
            a++
          )
            r(a);
          return t;
        })(r),
        e
      )),
    e))
      i.key(a) && t.push({ name: a, tweens: Y(e[a], n) });
    return t;
  }
  function G(n, e) {
    var t;
    return n.tweens.map(function (r) {
      var a = (function (n, e) {
          var t = {};
          for (var r in n) {
            var a = P(n[r], e);
            i.arr(a) &&
              1 ===
                (a = a.map(function (n) {
                  return P(n, e);
                })).length &&
              (a = a[0]),
              (t[r] = a);
          }
          return (
            (t.duration = parseFloat(t.duration)),
            (t.delay = parseFloat(t.delay)),
            t
          );
        })(r, e),
        o = a.value,
        u = i.arr(o) ? o[1] : o,
        c = C(u),
        s = A(e.target, n.name, c, e),
        f = t ? t.to.original : s,
        l = i.arr(o) ? o[0] : f,
        d = C(l) || C(s),
        p = c || d;
      return (
        i.und(u) && (u = f),
        (a.from = $(l, p)),
        (a.to = $(N(u, l), p)),
        (a.start = t ? t.end : 0),
        (a.end = a.start + a.delay + a.duration + a.endDelay),
        (a.easing = h(a.easing, a.duration)),
        (a.isPath = i.pth(o)),
        (a.isPathTargetInsideSVG = a.isPath && i.svg(e.target)),
        (a.isColor = i.col(a.from.original)),
        a.isColor && (a.round = 1),
        (t = a),
        a
      );
    });
  }
  var Q = {
    css: function (n, e, t) {
      return (n.style[e] = t);
    },
    attribute: function (n, e, t) {
      return n.setAttribute(e, t);
    },
    object: function (n, e, t) {
      return (n[e] = t);
    },
    transform: function (n, e, t, r, a) {
      if ((r.list.set(e, t), e === r.last || a)) {
        var o = "";
        r.list.forEach(function (n, e) {
          o += e + "(" + n + ") ";
        }),
          (n.style.transform = o);
      }
    },
  };
  function z(n, e) {
    X(n).forEach(function (n) {
      for (var t in e) {
        var r = P(e[t], n),
          a = n.target,
          o = C(r),
          u = A(a, t, o, n),
          i = N(S(r, o || C(u)), u),
          c = T(a, t);
        Q[c](a, t, i, n.transforms, !0);
      }
    });
  }
  function _(n, e) {
    return m(
      y(
        n.map(function (n) {
          return e.map(function (e) {
            return (function (n, e) {
              var t = T(n.target, e.name);
              if (t) {
                var r = G(e, n),
                  a = r[r.length - 1];
                return {
                  type: t,
                  property: e.name,
                  animatable: n,
                  tweens: r,
                  duration: a.end,
                  delay: r[0].delay,
                  endDelay: a.endDelay,
                };
              }
            })(n, e);
          });
        })
      ),
      function (n) {
        return !i.und(n);
      }
    );
  }
  function R(n, e) {
    var t = n.length,
      r = function (n) {
        return n.timelineOffset ? n.timelineOffset : 0;
      },
      a = {};
    return (
      (a.duration = t
        ? Math.max.apply(
            Math,
            n.map(function (n) {
              return r(n) + n.duration;
            })
          )
        : e.duration),
      (a.delay = t
        ? Math.min.apply(
            Math,
            n.map(function (n) {
              return r(n) + n.delay;
            })
          )
        : e.delay),
      (a.endDelay = t
        ? a.duration -
          Math.max.apply(
            Math,
            n.map(function (n) {
              return r(n) + n.duration - n.endDelay;
            })
          )
        : e.endDelay),
      a
    );
  }
  var J = 0;
  var K = [],
    U = (function () {
      var n;
      function e(t) {
        for (var r = K.length, a = 0; a < r; ) {
          var o = K[a];
          o.paused ? (K.splice(a, 1), r--) : (o.tick(t), a++);
        }
        n = a > 0 ? requestAnimationFrame(e) : void 0;
      }
      return (
        "undefined" != typeof document &&
          document.addEventListener("visibilitychange", function () {
            en.suspendWhenDocumentHidden &&
              (nn()
                ? (n = cancelAnimationFrame(n))
                : (K.forEach(function (n) {
                    return n._onDocumentVisibility();
                  }),
                  U()));
          }),
        function () {
          n ||
            (nn() && en.suspendWhenDocumentHidden) ||
            !(K.length > 0) ||
            (n = requestAnimationFrame(e));
        }
      );
    })();
  function nn() {
    return !!document && document.hidden;
  }
  function en(t) {
    void 0 === t && (t = {});
    var r,
      o = 0,
      u = 0,
      i = 0,
      c = 0,
      s = null;
    function f(n) {
      var e =
        window.Promise &&
        new Promise(function (n) {
          return (s = n);
        });
      return (n.finished = e), e;
    }
    var l,
      d,
      p,
      v,
      h,
      g,
      y,
      b,
      M =
        ((d = w(n, (l = t))),
        (p = w(e, l)),
        (v = Z(p, l)),
        (h = X(l.targets)),
        (g = _(h, v)),
        (y = R(g, p)),
        (b = J),
        J++,
        k(d, {
          id: b,
          children: [],
          animatables: h,
          animations: g,
          duration: y.duration,
          delay: y.delay,
          endDelay: y.endDelay,
        }));
    f(M);
    function x() {
      var n = M.direction;
      "alternate" !== n &&
        (M.direction = "normal" !== n ? "normal" : "reverse"),
        (M.reversed = !M.reversed),
        r.forEach(function (n) {
          return (n.reversed = M.reversed);
        });
    }
    function O(n) {
      return M.reversed ? M.duration - n : n;
    }
    function C() {
      (o = 0), (u = O(M.currentTime) * (1 / en.speed));
    }
    function P(n, e) {
      e && e.seek(n - e.timelineOffset);
    }
    function I(n) {
      for (var e = 0, t = M.animations, r = t.length; e < r; ) {
        var o = t[e],
          u = o.animatable,
          i = o.tweens,
          c = i.length - 1,
          s = i[c];
        c &&
          (s =
            m(i, function (e) {
              return n < e.end;
            })[0] || s);
        for (
          var f = a(n - s.start - s.delay, 0, s.duration) / s.duration,
            l = isNaN(f) ? 1 : s.easing(f),
            d = s.to.strings,
            p = s.round,
            v = [],
            h = s.to.numbers.length,
            g = void 0,
            y = 0;
          y < h;
          y++
        ) {
          var b = void 0,
            x = s.to.numbers[y],
            w = s.from.numbers[y] || 0;
          (b = s.isPath
            ? V(s.value, l * x, s.isPathTargetInsideSVG)
            : w + l * (x - w)),
            p && ((s.isColor && y > 2) || (b = Math.round(b * p) / p)),
            v.push(b);
        }
        var k = d.length;
        if (k) {
          g = d[0];
          for (var O = 0; O < k; O++) {
            d[O];
            var C = d[O + 1],
              P = v[O];
            isNaN(P) || (g += C ? P + C : P + " ");
          }
        } else g = v[0];
        Q[o.type](u.target, o.property, g, u.transforms),
          (o.currentValue = g),
          e++;
      }
    }
    function D(n) {
      M[n] && !M.passThrough && M[n](M);
    }
    function B(n) {
      var e = M.duration,
        t = M.delay,
        l = e - M.endDelay,
        d = O(n);
      (M.progress = a((d / e) * 100, 0, 100)),
        (M.reversePlayback = d < M.currentTime),
        r &&
          (function (n) {
            if (M.reversePlayback) for (var e = c; e--; ) P(n, r[e]);
            else for (var t = 0; t < c; t++) P(n, r[t]);
          })(d),
        !M.began && M.currentTime > 0 && ((M.began = !0), D("begin")),
        !M.loopBegan &&
          M.currentTime > 0 &&
          ((M.loopBegan = !0), D("loopBegin")),
        d <= t && 0 !== M.currentTime && I(0),
        ((d >= l && M.currentTime !== e) || !e) && I(e),
        d > t && d < l
          ? (M.changeBegan ||
              ((M.changeBegan = !0),
              (M.changeCompleted = !1),
              D("changeBegin")),
            D("change"),
            I(d))
          : M.changeBegan &&
            ((M.changeCompleted = !0),
            (M.changeBegan = !1),
            D("changeComplete")),
        (M.currentTime = a(d, 0, e)),
        M.began && D("update"),
        n >= e &&
          ((u = 0),
          M.remaining && !0 !== M.remaining && M.remaining--,
          M.remaining
            ? ((o = i),
              D("loopComplete"),
              (M.loopBegan = !1),
              "alternate" === M.direction && x())
            : ((M.paused = !0),
              M.completed ||
                ((M.completed = !0),
                D("loopComplete"),
                D("complete"),
                !M.passThrough && "Promise" in window && (s(), f(M)))));
    }
    return (
      (M.reset = function () {
        var n = M.direction;
        (M.passThrough = !1),
          (M.currentTime = 0),
          (M.progress = 0),
          (M.paused = !0),
          (M.began = !1),
          (M.loopBegan = !1),
          (M.changeBegan = !1),
          (M.completed = !1),
          (M.changeCompleted = !1),
          (M.reversePlayback = !1),
          (M.reversed = "reverse" === n),
          (M.remaining = M.loop),
          (r = M.children);
        for (var e = (c = r.length); e--; ) M.children[e].reset();
        ((M.reversed && !0 !== M.loop) ||
          ("alternate" === n && 1 === M.loop)) &&
          M.remaining++,
          I(M.reversed ? M.duration : 0);
      }),
      (M._onDocumentVisibility = C),
      (M.set = function (n, e) {
        return z(n, e), M;
      }),
      (M.tick = function (n) {
        (i = n), o || (o = i), B((i + (u - o)) * en.speed);
      }),
      (M.seek = function (n) {
        B(O(n));
      }),
      (M.pause = function () {
        (M.paused = !0), C();
      }),
      (M.play = function () {
        M.paused &&
          (M.completed && M.reset(), (M.paused = !1), K.push(M), C(), U());
      }),
      (M.reverse = function () {
        x(), (M.completed = !M.reversed), C();
      }),
      (M.restart = function () {
        M.reset(), M.play();
      }),
      (M.remove = function (n) {
        rn(W(n), M);
      }),
      M.reset(),
      M.autoplay && M.play(),
      M
    );
  }
  function tn(n, e) {
    for (var t = e.length; t--; )
      M(n, e[t].animatable.target) && e.splice(t, 1);
  }
  function rn(n, e) {
    var t = e.animations,
      r = e.children;
    tn(n, t);
    for (var a = r.length; a--; ) {
      var o = r[a],
        u = o.animations;
      tn(n, u), u.length || o.children.length || r.splice(a, 1);
    }
    t.length || r.length || e.pause();
  }
  return (
    (en.version = "3.2.1"),
    (en.speed = 1),
    (en.suspendWhenDocumentHidden = !0),
    (en.running = K),
    (en.remove = function (n) {
      for (var e = W(n), t = K.length; t--; ) rn(e, K[t]);
    }),
    (en.get = A),
    (en.set = z),
    (en.convertPx = D),
    (en.path = function (n, e) {
      var t = i.str(n) ? g(n)[0] : n,
        r = e || 100;
      return function (n) {
        return { property: n, el: t, svg: H(t), totalLength: q(t) * (r / 100) };
      };
    }),
    (en.setDashoffset = function (n) {
      var e = q(n);
      return n.setAttribute("stroke-dasharray", e), e;
    }),
    (en.stagger = function (n, e) {
      void 0 === e && (e = {});
      var t = e.direction || "normal",
        r = e.easing ? h(e.easing) : null,
        a = e.grid,
        o = e.axis,
        u = e.from || 0,
        c = "first" === u,
        s = "center" === u,
        f = "last" === u,
        l = i.arr(n),
        d = l ? parseFloat(n[0]) : parseFloat(n),
        p = l ? parseFloat(n[1]) : 0,
        v = C(l ? n[1] : n) || 0,
        g = e.start || 0 + (l ? d : 0),
        m = [],
        y = 0;
      return function (n, e, i) {
        if (
          (c && (u = 0), s && (u = (i - 1) / 2), f && (u = i - 1), !m.length)
        ) {
          for (var h = 0; h < i; h++) {
            if (a) {
              var b = s ? (a[0] - 1) / 2 : u % a[0],
                M = s ? (a[1] - 1) / 2 : Math.floor(u / a[0]),
                x = b - (h % a[0]),
                w = M - Math.floor(h / a[0]),
                k = Math.sqrt(x * x + w * w);
              "x" === o && (k = -x), "y" === o && (k = -w), m.push(k);
            } else m.push(Math.abs(u - h));
            y = Math.max.apply(Math, m);
          }
          r &&
            (m = m.map(function (n) {
              return r(n / y) * y;
            })),
            "reverse" === t &&
              (m = m.map(function (n) {
                return o ? (n < 0 ? -1 * n : -n) : Math.abs(y - n);
              }));
        }
        return g + (l ? (p - d) / y : d) * (Math.round(100 * m[e]) / 100) + v;
      };
    }),
    (en.timeline = function (n) {
      void 0 === n && (n = {});
      var t = en(n);
      return (
        (t.duration = 0),
        (t.add = function (r, a) {
          var o = K.indexOf(t),
            u = t.children;
          function c(n) {
            n.passThrough = !0;
          }
          o > -1 && K.splice(o, 1);
          for (var s = 0; s < u.length; s++) c(u[s]);
          var f = k(r, w(e, n));
          f.targets = f.targets || n.targets;
          var l = t.duration;
          (f.autoplay = !1),
            (f.direction = t.direction),
            (f.timelineOffset = i.und(a) ? l : N(a, l)),
            c(t),
            t.seek(f.timelineOffset);
          var d = en(f);
          c(d), u.push(d);
          var p = R(u, n);
          return (
            (t.delay = p.delay),
            (t.endDelay = p.endDelay),
            (t.duration = p.duration),
            t.seek(0),
            t.reset(),
            t.autoplay && t.play(),
            t
          );
        }),
        t
      );
    }),
    (en.easing = h),
    (en.penner = v),
    (en.random = function (n, e) {
      return Math.floor(Math.random() * (e - n + 1)) + n;
    }),
    en
  );
});
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.moment = t());
})(this, function () {
  "use strict";
  var H;
  function f() {
    return H.apply(null, arguments);
  }
  function a(e) {
    return (
      e instanceof Array ||
      "[object Array]" === Object.prototype.toString.call(e)
    );
  }
  function F(e) {
    return null != e && "[object Object]" === Object.prototype.toString.call(e);
  }
  function c(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function L(e) {
    if (Object.getOwnPropertyNames)
      return 0 === Object.getOwnPropertyNames(e).length;
    for (var t in e) if (c(e, t)) return;
    return 1;
  }
  function o(e) {
    return void 0 === e;
  }
  function u(e) {
    return (
      "number" == typeof e ||
      "[object Number]" === Object.prototype.toString.call(e)
    );
  }
  function V(e) {
    return (
      e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    );
  }
  function G(e, t) {
    for (var n = [], s = e.length, i = 0; i < s; ++i) n.push(t(e[i], i));
    return n;
  }
  function E(e, t) {
    for (var n in t) c(t, n) && (e[n] = t[n]);
    return (
      c(t, "toString") && (e.toString = t.toString),
      c(t, "valueOf") && (e.valueOf = t.valueOf),
      e
    );
  }
  function l(e, t, n, s) {
    return Pt(e, t, n, s, !0).utc();
  }
  function m(e) {
    return (
      null == e._pf &&
        (e._pf = {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: !1,
          weekdayMismatch: !1,
        }),
      e._pf
    );
  }
  function A(e) {
    if (null == e._isValid) {
      var t = m(e),
        n = j.call(t.parsedDateParts, function (e) {
          return null != e;
        }),
        n =
          !isNaN(e._d.getTime()) &&
          t.overflow < 0 &&
          !t.empty &&
          !t.invalidEra &&
          !t.invalidMonth &&
          !t.invalidWeekday &&
          !t.weekdayMismatch &&
          !t.nullInput &&
          !t.invalidFormat &&
          !t.userInvalidated &&
          (!t.meridiem || (t.meridiem && n));
      if (
        (e._strict &&
          (n =
            n &&
            0 === t.charsLeftOver &&
            0 === t.unusedTokens.length &&
            void 0 === t.bigHour),
        null != Object.isFrozen && Object.isFrozen(e))
      )
        return n;
      e._isValid = n;
    }
    return e._isValid;
  }
  function I(e) {
    var t = l(NaN);
    return null != e ? E(m(t), e) : (m(t).userInvalidated = !0), t;
  }
  var j =
      Array.prototype.some ||
      function (e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
          if (s in t && e.call(this, t[s], s, t)) return !0;
        return !1;
      },
    Z = (f.momentProperties = []),
    z = !1;
  function $(e, t) {
    var n,
      s,
      i,
      r = Z.length;
    if (
      (o(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
      o(t._i) || (e._i = t._i),
      o(t._f) || (e._f = t._f),
      o(t._l) || (e._l = t._l),
      o(t._strict) || (e._strict = t._strict),
      o(t._tzm) || (e._tzm = t._tzm),
      o(t._isUTC) || (e._isUTC = t._isUTC),
      o(t._offset) || (e._offset = t._offset),
      o(t._pf) || (e._pf = m(t)),
      o(t._locale) || (e._locale = t._locale),
      0 < r)
    )
      for (n = 0; n < r; n++) o((i = t[(s = Z[n])])) || (e[s] = i);
    return e;
  }
  function q(e) {
    $(this, e),
      (this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
      this.isValid() || (this._d = new Date(NaN)),
      !1 === z && ((z = !0), f.updateOffset(this), (z = !1));
  }
  function h(e) {
    return e instanceof q || (null != e && null != e._isAMomentObject);
  }
  function B(e) {
    !1 === f.suppressDeprecationWarnings &&
      "undefined" != typeof console &&
      console.warn &&
      console.warn("Deprecation warning: " + e);
  }
  function e(r, a) {
    var o = !0;
    return E(function () {
      if ((null != f.deprecationHandler && f.deprecationHandler(null, r), o)) {
        for (var e, t, n = [], s = arguments.length, i = 0; i < s; i++) {
          if (((e = ""), "object" == typeof arguments[i])) {
            for (t in ((e += "\n[" + i + "] "), arguments[0]))
              c(arguments[0], t) && (e += t + ": " + arguments[0][t] + ", ");
            e = e.slice(0, -2);
          } else e = arguments[i];
          n.push(e);
        }
        B(
          r +
            "\nArguments: " +
            Array.prototype.slice.call(n).join("") +
            "\n" +
            new Error().stack
        ),
          (o = !1);
      }
      return a.apply(this, arguments);
    }, a);
  }
  var J = {};
  function Q(e, t) {
    null != f.deprecationHandler && f.deprecationHandler(e, t),
      J[e] || (B(t), (J[e] = !0));
  }
  function d(e) {
    return (
      ("undefined" != typeof Function && e instanceof Function) ||
      "[object Function]" === Object.prototype.toString.call(e)
    );
  }
  function X(e, t) {
    var n,
      s = E({}, e);
    for (n in t)
      c(t, n) &&
        (F(e[n]) && F(t[n])
          ? ((s[n] = {}), E(s[n], e[n]), E(s[n], t[n]))
          : null != t[n]
          ? (s[n] = t[n])
          : delete s[n]);
    for (n in e) c(e, n) && !c(t, n) && F(e[n]) && (s[n] = E({}, s[n]));
    return s;
  }
  function K(e) {
    null != e && this.set(e);
  }
  (f.suppressDeprecationWarnings = !1), (f.deprecationHandler = null);
  var ee =
    Object.keys ||
    function (e) {
      var t,
        n = [];
      for (t in e) c(e, t) && n.push(t);
      return n;
    };
  function r(e, t, n) {
    var s = "" + Math.abs(e);
    return (
      (0 <= e ? (n ? "+" : "") : "-") +
      Math.pow(10, Math.max(0, t - s.length))
        .toString()
        .substr(1) +
      s
    );
  }
  var te =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    ne = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    se = {},
    ie = {};
  function s(e, t, n, s) {
    var i =
      "string" == typeof s
        ? function () {
            return this[s]();
          }
        : s;
    e && (ie[e] = i),
      t &&
        (ie[t[0]] = function () {
          return r(i.apply(this, arguments), t[1], t[2]);
        }),
      n &&
        (ie[n] = function () {
          return this.localeData().ordinal(i.apply(this, arguments), e);
        });
  }
  function re(e, t) {
    return e.isValid()
      ? ((t = ae(t, e.localeData())),
        (se[t] =
          se[t] ||
          (function (s) {
            for (var e, i = s.match(te), t = 0, r = i.length; t < r; t++)
              ie[i[t]]
                ? (i[t] = ie[i[t]])
                : (i[t] = (e = i[t]).match(/\[[\s\S]/)
                    ? e.replace(/^\[|\]$/g, "")
                    : e.replace(/\\/g, ""));
            return function (e) {
              for (var t = "", n = 0; n < r; n++)
                t += d(i[n]) ? i[n].call(e, s) : i[n];
              return t;
            };
          })(t)),
        se[t](e))
      : e.localeData().invalidDate();
  }
  function ae(e, t) {
    var n = 5;
    function s(e) {
      return t.longDateFormat(e) || e;
    }
    for (ne.lastIndex = 0; 0 <= n && ne.test(e); )
      (e = e.replace(ne, s)), (ne.lastIndex = 0), --n;
    return e;
  }
  var oe = {};
  function t(e, t) {
    var n = e.toLowerCase();
    oe[n] = oe[n + "s"] = oe[t] = e;
  }
  function _(e) {
    return "string" == typeof e ? oe[e] || oe[e.toLowerCase()] : void 0;
  }
  function ue(e) {
    var t,
      n,
      s = {};
    for (n in e) c(e, n) && (t = _(n)) && (s[t] = e[n]);
    return s;
  }
  var le = {};
  function n(e, t) {
    le[e] = t;
  }
  function he(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function y(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }
  function g(e) {
    var e = +e,
      t = 0;
    return (t = 0 != e && isFinite(e) ? y(e) : t);
  }
  function de(t, n) {
    return function (e) {
      return null != e
        ? (fe(this, t, e), f.updateOffset(this, n), this)
        : ce(this, t);
    };
  }
  function ce(e, t) {
    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }
  function fe(e, t, n) {
    e.isValid() &&
      !isNaN(n) &&
      ("FullYear" === t && he(e.year()) && 1 === e.month() && 29 === e.date()
        ? ((n = g(n)),
          e._d["set" + (e._isUTC ? "UTC" : "") + t](
            n,
            e.month(),
            We(n, e.month())
          ))
        : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
  }
  var i = /\d/,
    w = /\d\d/,
    me = /\d{3}/,
    _e = /\d{4}/,
    ye = /[+-]?\d{6}/,
    p = /\d\d?/,
    ge = /\d\d\d\d?/,
    we = /\d\d\d\d\d\d?/,
    pe = /\d{1,3}/,
    ve = /\d{1,4}/,
    ke = /[+-]?\d{1,6}/,
    Me = /\d+/,
    De = /[+-]?\d+/,
    Se = /Z|[+-]\d\d:?\d\d/gi,
    Ye = /Z|[+-]\d\d(?::?\d\d)?/gi,
    v =
      /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  function k(e, n, s) {
    be[e] = d(n)
      ? n
      : function (e, t) {
          return e && s ? s : n;
        };
  }
  function Oe(e, t) {
    return c(be, e)
      ? be[e](t._strict, t._locale)
      : new RegExp(
          M(
            e
              .replace("\\", "")
              .replace(
                /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                function (e, t, n, s, i) {
                  return t || n || s || i;
                }
              )
          )
        );
  }
  function M(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var be = {},
    xe = {};
  function D(e, n) {
    var t,
      s,
      i = n;
    for (
      "string" == typeof e && (e = [e]),
        u(n) &&
          (i = function (e, t) {
            t[n] = g(e);
          }),
        s = e.length,
        t = 0;
      t < s;
      t++
    )
      xe[e[t]] = i;
  }
  function Te(e, i) {
    D(e, function (e, t, n, s) {
      (n._w = n._w || {}), i(e, n._w, n, s);
    });
  }
  var S,
    Y = 0,
    O = 1,
    b = 2,
    x = 3,
    T = 4,
    N = 5,
    Ne = 6,
    Pe = 7,
    Re = 8;
  function We(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;
    var n = ((t % (n = 12)) + n) % n;
    return (e += (t - n) / 12), 1 == n ? (he(e) ? 29 : 28) : 31 - ((n % 7) % 2);
  }
  (S =
    Array.prototype.indexOf ||
    function (e) {
      for (var t = 0; t < this.length; ++t) if (this[t] === e) return t;
      return -1;
    }),
    s("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    }),
    s("MMM", 0, 0, function (e) {
      return this.localeData().monthsShort(this, e);
    }),
    s("MMMM", 0, 0, function (e) {
      return this.localeData().months(this, e);
    }),
    t("month", "M"),
    n("month", 8),
    k("M", p),
    k("MM", p, w),
    k("MMM", function (e, t) {
      return t.monthsShortRegex(e);
    }),
    k("MMMM", function (e, t) {
      return t.monthsRegex(e);
    }),
    D(["M", "MM"], function (e, t) {
      t[O] = g(e) - 1;
    }),
    D(["MMM", "MMMM"], function (e, t, n, s) {
      s = n._locale.monthsParse(e, s, n._strict);
      null != s ? (t[O] = s) : (m(n).invalidMonth = e);
    });
  var Ce =
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
    Ue = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    He = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    Fe = v,
    Le = v;
  function Ve(e, t) {
    var n;
    if (e.isValid()) {
      if ("string" == typeof t)
        if (/^\d+$/.test(t)) t = g(t);
        else if (!u((t = e.localeData().monthsParse(t)))) return;
      (n = Math.min(e.date(), We(e.year(), t))),
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n);
    }
  }
  function Ge(e) {
    return null != e
      ? (Ve(this, e), f.updateOffset(this, !0), this)
      : ce(this, "Month");
  }
  function Ee() {
    function e(e, t) {
      return t.length - e.length;
    }
    for (var t, n = [], s = [], i = [], r = 0; r < 12; r++)
      (t = l([2e3, r])),
        n.push(this.monthsShort(t, "")),
        s.push(this.months(t, "")),
        i.push(this.months(t, "")),
        i.push(this.monthsShort(t, ""));
    for (n.sort(e), s.sort(e), i.sort(e), r = 0; r < 12; r++)
      (n[r] = M(n[r])), (s[r] = M(s[r]));
    for (r = 0; r < 24; r++) i[r] = M(i[r]);
    (this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i")),
      (this._monthsShortRegex = this._monthsRegex),
      (this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
      (this._monthsShortStrictRegex = new RegExp(
        "^(" + n.join("|") + ")",
        "i"
      ));
  }
  function Ae(e) {
    return he(e) ? 366 : 365;
  }
  s("Y", 0, 0, function () {
    var e = this.year();
    return e <= 9999 ? r(e, 4) : "+" + e;
  }),
    s(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    }),
    s(0, ["YYYY", 4], 0, "year"),
    s(0, ["YYYYY", 5], 0, "year"),
    s(0, ["YYYYYY", 6, !0], 0, "year"),
    t("year", "y"),
    n("year", 1),
    k("Y", De),
    k("YY", p, w),
    k("YYYY", ve, _e),
    k("YYYYY", ke, ye),
    k("YYYYYY", ke, ye),
    D(["YYYYY", "YYYYYY"], Y),
    D("YYYY", function (e, t) {
      t[Y] = 2 === e.length ? f.parseTwoDigitYear(e) : g(e);
    }),
    D("YY", function (e, t) {
      t[Y] = f.parseTwoDigitYear(e);
    }),
    D("Y", function (e, t) {
      t[Y] = parseInt(e, 10);
    }),
    (f.parseTwoDigitYear = function (e) {
      return g(e) + (68 < g(e) ? 1900 : 2e3);
    });
  var Ie = de("FullYear", !0);
  function je(e, t, n, s, i, r, a) {
    var o;
    return (
      e < 100 && 0 <= e
        ? ((o = new Date(e + 400, t, n, s, i, r, a)),
          isFinite(o.getFullYear()) && o.setFullYear(e))
        : (o = new Date(e, t, n, s, i, r, a)),
      o
    );
  }
  function Ze(e) {
    var t;
    return (
      e < 100 && 0 <= e
        ? (((t = Array.prototype.slice.call(arguments))[0] = e + 400),
          (t = new Date(Date.UTC.apply(null, t))),
          isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
        : (t = new Date(Date.UTC.apply(null, arguments))),
      t
    );
  }
  function ze(e, t, n) {
    n = 7 + t - n;
    return n - ((7 + Ze(e, 0, n).getUTCDay() - t) % 7) - 1;
  }
  function $e(e, t, n, s, i) {
    var r,
      t = 1 + 7 * (t - 1) + ((7 + n - s) % 7) + ze(e, s, i),
      n =
        t <= 0
          ? Ae((r = e - 1)) + t
          : t > Ae(e)
          ? ((r = e + 1), t - Ae(e))
          : ((r = e), t);
    return { year: r, dayOfYear: n };
  }
  function qe(e, t, n) {
    var s,
      i,
      r = ze(e.year(), t, n),
      r = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
    return (
      r < 1
        ? (s = r + P((i = e.year() - 1), t, n))
        : r > P(e.year(), t, n)
        ? ((s = r - P(e.year(), t, n)), (i = e.year() + 1))
        : ((i = e.year()), (s = r)),
      { week: s, year: i }
    );
  }
  function P(e, t, n) {
    var s = ze(e, t, n),
      t = ze(e + 1, t, n);
    return (Ae(e) - s + t) / 7;
  }
  s("w", ["ww", 2], "wo", "week"),
    s("W", ["WW", 2], "Wo", "isoWeek"),
    t("week", "w"),
    t("isoWeek", "W"),
    n("week", 5),
    n("isoWeek", 5),
    k("w", p),
    k("ww", p, w),
    k("W", p),
    k("WW", p, w),
    Te(["w", "ww", "W", "WW"], function (e, t, n, s) {
      t[s.substr(0, 1)] = g(e);
    });
  function Be(e, t) {
    return e.slice(t, 7).concat(e.slice(0, t));
  }
  s("d", 0, "do", "day"),
    s("dd", 0, 0, function (e) {
      return this.localeData().weekdaysMin(this, e);
    }),
    s("ddd", 0, 0, function (e) {
      return this.localeData().weekdaysShort(this, e);
    }),
    s("dddd", 0, 0, function (e) {
      return this.localeData().weekdays(this, e);
    }),
    s("e", 0, 0, "weekday"),
    s("E", 0, 0, "isoWeekday"),
    t("day", "d"),
    t("weekday", "e"),
    t("isoWeekday", "E"),
    n("day", 11),
    n("weekday", 11),
    n("isoWeekday", 11),
    k("d", p),
    k("e", p),
    k("E", p),
    k("dd", function (e, t) {
      return t.weekdaysMinRegex(e);
    }),
    k("ddd", function (e, t) {
      return t.weekdaysShortRegex(e);
    }),
    k("dddd", function (e, t) {
      return t.weekdaysRegex(e);
    }),
    Te(["dd", "ddd", "dddd"], function (e, t, n, s) {
      s = n._locale.weekdaysParse(e, s, n._strict);
      null != s ? (t.d = s) : (m(n).invalidWeekday = e);
    }),
    Te(["d", "e", "E"], function (e, t, n, s) {
      t[s] = g(e);
    });
  var Je = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_"
    ),
    Qe = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    Xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    Ke = v,
    et = v,
    tt = v;
  function nt() {
    function e(e, t) {
      return t.length - e.length;
    }
    for (var t, n, s, i = [], r = [], a = [], o = [], u = 0; u < 7; u++)
      (s = l([2e3, 1]).day(u)),
        (t = M(this.weekdaysMin(s, ""))),
        (n = M(this.weekdaysShort(s, ""))),
        (s = M(this.weekdays(s, ""))),
        i.push(t),
        r.push(n),
        a.push(s),
        o.push(t),
        o.push(n),
        o.push(s);
    i.sort(e),
      r.sort(e),
      a.sort(e),
      o.sort(e),
      (this._weekdaysRegex = new RegExp("^(" + o.join("|") + ")", "i")),
      (this._weekdaysShortRegex = this._weekdaysRegex),
      (this._weekdaysMinRegex = this._weekdaysRegex),
      (this._weekdaysStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")),
      (this._weekdaysShortStrictRegex = new RegExp(
        "^(" + r.join("|") + ")",
        "i"
      )),
      (this._weekdaysMinStrictRegex = new RegExp(
        "^(" + i.join("|") + ")",
        "i"
      ));
  }
  function st() {
    return this.hours() % 12 || 12;
  }
  function it(e, t) {
    s(e, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
  }
  function rt(e, t) {
    return t._meridiemParse;
  }
  s("H", ["HH", 2], 0, "hour"),
    s("h", ["hh", 2], 0, st),
    s("k", ["kk", 2], 0, function () {
      return this.hours() || 24;
    }),
    s("hmm", 0, 0, function () {
      return "" + st.apply(this) + r(this.minutes(), 2);
    }),
    s("hmmss", 0, 0, function () {
      return "" + st.apply(this) + r(this.minutes(), 2) + r(this.seconds(), 2);
    }),
    s("Hmm", 0, 0, function () {
      return "" + this.hours() + r(this.minutes(), 2);
    }),
    s("Hmmss", 0, 0, function () {
      return "" + this.hours() + r(this.minutes(), 2) + r(this.seconds(), 2);
    }),
    it("a", !0),
    it("A", !1),
    t("hour", "h"),
    n("hour", 13),
    k("a", rt),
    k("A", rt),
    k("H", p),
    k("h", p),
    k("k", p),
    k("HH", p, w),
    k("hh", p, w),
    k("kk", p, w),
    k("hmm", ge),
    k("hmmss", we),
    k("Hmm", ge),
    k("Hmmss", we),
    D(["H", "HH"], x),
    D(["k", "kk"], function (e, t, n) {
      e = g(e);
      t[x] = 24 === e ? 0 : e;
    }),
    D(["a", "A"], function (e, t, n) {
      (n._isPm = n._locale.isPM(e)), (n._meridiem = e);
    }),
    D(["h", "hh"], function (e, t, n) {
      (t[x] = g(e)), (m(n).bigHour = !0);
    }),
    D("hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[x] = g(e.substr(0, s))), (t[T] = g(e.substr(s))), (m(n).bigHour = !0);
    }),
    D("hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[x] = g(e.substr(0, s))),
        (t[T] = g(e.substr(s, 2))),
        (t[N] = g(e.substr(i))),
        (m(n).bigHour = !0);
    }),
    D("Hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[x] = g(e.substr(0, s))), (t[T] = g(e.substr(s)));
    }),
    D("Hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[x] = g(e.substr(0, s))),
        (t[T] = g(e.substr(s, 2))),
        (t[N] = g(e.substr(i)));
    });
  v = de("Hours", !0);
  var at,
    ot = {
      calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L",
      },
      longDateFormat: {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A",
      },
      invalidDate: "Invalid date",
      ordinal: "%d",
      dayOfMonthOrdinalParse: /\d{1,2}/,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years",
      },
      months: Ce,
      monthsShort: Ue,
      week: { dow: 0, doy: 6 },
      weekdays: Je,
      weekdaysMin: Xe,
      weekdaysShort: Qe,
      meridiemParse: /[ap]\.?m?\.?/i,
    },
    R = {},
    ut = {};
  function lt(e) {
    return e && e.toLowerCase().replace("_", "-");
  }
  function ht(e) {
    for (var t, n, s, i, r = 0; r < e.length; ) {
      for (
        t = (i = lt(e[r]).split("-")).length,
          n = (n = lt(e[r + 1])) ? n.split("-") : null;
        0 < t;

      ) {
        if ((s = dt(i.slice(0, t).join("-")))) return s;
        if (
          n &&
          n.length >= t &&
          (function (e, t) {
            for (var n = Math.min(e.length, t.length), s = 0; s < n; s += 1)
              if (e[s] !== t[s]) return s;
            return n;
          })(i, n) >=
            t - 1
        )
          break;
        t--;
      }
      r++;
    }
    return at;
  }
  function dt(t) {
    var e;
    if (
      void 0 === R[t] &&
      "undefined" != typeof module &&
      module &&
      module.exports &&
      null != t.match("^[^/\\\\]*$")
    )
      try {
        (e = at._abbr), require("./locale/" + t), ct(e);
      } catch (e) {
        R[t] = null;
      }
    return R[t];
  }
  function ct(e, t) {
    return (
      e &&
        ((t = o(t) ? mt(e) : ft(e, t))
          ? (at = t)
          : "undefined" != typeof console &&
            console.warn &&
            console.warn(
              "Locale " + e + " not found. Did you forget to load it?"
            )),
      at._abbr
    );
  }
  function ft(e, t) {
    if (null === t) return delete R[e], null;
    var n,
      s = ot;
    if (((t.abbr = e), null != R[e]))
      Q(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ),
        (s = R[e]._config);
    else if (null != t.parentLocale)
      if (null != R[t.parentLocale]) s = R[t.parentLocale]._config;
      else {
        if (null == (n = dt(t.parentLocale)))
          return (
            ut[t.parentLocale] || (ut[t.parentLocale] = []),
            ut[t.parentLocale].push({ name: e, config: t }),
            null
          );
        s = n._config;
      }
    return (
      (R[e] = new K(X(s, t))),
      ut[e] &&
        ut[e].forEach(function (e) {
          ft(e.name, e.config);
        }),
      ct(e),
      R[e]
    );
  }
  function mt(e) {
    var t;
    if (!(e = e && e._locale && e._locale._abbr ? e._locale._abbr : e))
      return at;
    if (!a(e)) {
      if ((t = dt(e))) return t;
      e = [e];
    }
    return ht(e);
  }
  function _t(e) {
    var t = e._a;
    return (
      t &&
        -2 === m(e).overflow &&
        ((t =
          t[O] < 0 || 11 < t[O]
            ? O
            : t[b] < 1 || t[b] > We(t[Y], t[O])
            ? b
            : t[x] < 0 ||
              24 < t[x] ||
              (24 === t[x] && (0 !== t[T] || 0 !== t[N] || 0 !== t[Ne]))
            ? x
            : t[T] < 0 || 59 < t[T]
            ? T
            : t[N] < 0 || 59 < t[N]
            ? N
            : t[Ne] < 0 || 999 < t[Ne]
            ? Ne
            : -1),
        m(e)._overflowDayOfYear && (t < Y || b < t) && (t = b),
        m(e)._overflowWeeks && -1 === t && (t = Pe),
        m(e)._overflowWeekday && -1 === t && (t = Re),
        (m(e).overflow = t)),
      e
    );
  }
  var yt =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    gt =
      /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    wt = /Z|[+-]\d\d(?::?\d\d)?/,
    pt = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, !1],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
      ["YYYYDDD", /\d{7}/],
      ["YYYYMM", /\d{6}/, !1],
      ["YYYY", /\d{4}/, !1],
    ],
    vt = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/],
    ],
    kt = /^\/?Date\((-?\d+)/i,
    Mt =
      /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
    Dt = {
      UT: 0,
      GMT: 0,
      EDT: -240,
      EST: -300,
      CDT: -300,
      CST: -360,
      MDT: -360,
      MST: -420,
      PDT: -420,
      PST: -480,
    };
  function St(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o = e._i,
      u = yt.exec(o) || gt.exec(o),
      o = pt.length,
      l = vt.length;
    if (u) {
      for (m(e).iso = !0, t = 0, n = o; t < n; t++)
        if (pt[t][1].exec(u[1])) {
          (i = pt[t][0]), (s = !1 !== pt[t][2]);
          break;
        }
      if (null == i) e._isValid = !1;
      else {
        if (u[3]) {
          for (t = 0, n = l; t < n; t++)
            if (vt[t][1].exec(u[3])) {
              r = (u[2] || " ") + vt[t][0];
              break;
            }
          if (null == r) return void (e._isValid = !1);
        }
        if (s || null == r) {
          if (u[4]) {
            if (!wt.exec(u[4])) return void (e._isValid = !1);
            a = "Z";
          }
          (e._f = i + (r || "") + (a || "")), Tt(e);
        } else e._isValid = !1;
      }
    } else e._isValid = !1;
  }
  function Yt(e, t, n, s, i, r) {
    e = [
      (function (e) {
        e = parseInt(e, 10);
        {
          if (e <= 49) return 2e3 + e;
          if (e <= 999) return 1900 + e;
        }
        return e;
      })(e),
      Ue.indexOf(t),
      parseInt(n, 10),
      parseInt(s, 10),
      parseInt(i, 10),
    ];
    return r && e.push(parseInt(r, 10)), e;
  }
  function Ot(e) {
    var t,
      n,
      s,
      i,
      r = Mt.exec(
        e._i
          .replace(/\([^()]*\)|[\n\t]/g, " ")
          .replace(/(\s\s+)/g, " ")
          .replace(/^\s\s*/, "")
          .replace(/\s\s*$/, "")
      );
    r
      ? ((t = Yt(r[4], r[3], r[2], r[5], r[6], r[7])),
        (n = r[1]),
        (s = t),
        (i = e),
        n && Qe.indexOf(n) !== new Date(s[0], s[1], s[2]).getDay()
          ? ((m(i).weekdayMismatch = !0), (i._isValid = !1))
          : ((e._a = t),
            (e._tzm =
              ((n = r[8]),
              (s = r[9]),
              (i = r[10]),
              n
                ? Dt[n]
                : s
                ? 0
                : 60 * (((n = parseInt(i, 10)) - (s = n % 100)) / 100) + s)),
            (e._d = Ze.apply(null, e._a)),
            e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            (m(e).rfc2822 = !0)))
      : (e._isValid = !1);
  }
  function bt(e, t, n) {
    return null != e ? e : null != t ? t : n;
  }
  function xt(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o,
      u,
      l,
      h,
      d,
      c = [];
    if (!e._d) {
      for (
        s = e,
          i = new Date(f.now()),
          n = s._useUTC
            ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()]
            : [i.getFullYear(), i.getMonth(), i.getDate()],
          e._w &&
            null == e._a[b] &&
            null == e._a[O] &&
            (null != (i = (s = e)._w).GG || null != i.W || null != i.E
              ? ((u = 1),
                (l = 4),
                (r = bt(i.GG, s._a[Y], qe(W(), 1, 4).year)),
                (a = bt(i.W, 1)),
                ((o = bt(i.E, 1)) < 1 || 7 < o) && (h = !0))
              : ((u = s._locale._week.dow),
                (l = s._locale._week.doy),
                (d = qe(W(), u, l)),
                (r = bt(i.gg, s._a[Y], d.year)),
                (a = bt(i.w, d.week)),
                null != i.d
                  ? ((o = i.d) < 0 || 6 < o) && (h = !0)
                  : null != i.e
                  ? ((o = i.e + u), (i.e < 0 || 6 < i.e) && (h = !0))
                  : (o = u)),
            a < 1 || a > P(r, u, l)
              ? (m(s)._overflowWeeks = !0)
              : null != h
              ? (m(s)._overflowWeekday = !0)
              : ((d = $e(r, a, o, u, l)),
                (s._a[Y] = d.year),
                (s._dayOfYear = d.dayOfYear))),
          null != e._dayOfYear &&
            ((i = bt(e._a[Y], n[Y])),
            (e._dayOfYear > Ae(i) || 0 === e._dayOfYear) &&
              (m(e)._overflowDayOfYear = !0),
            (h = Ze(i, 0, e._dayOfYear)),
            (e._a[O] = h.getUTCMonth()),
            (e._a[b] = h.getUTCDate())),
          t = 0;
        t < 3 && null == e._a[t];
        ++t
      )
        e._a[t] = c[t] = n[t];
      for (; t < 7; t++)
        e._a[t] = c[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
      24 === e._a[x] &&
        0 === e._a[T] &&
        0 === e._a[N] &&
        0 === e._a[Ne] &&
        ((e._nextDay = !0), (e._a[x] = 0)),
        (e._d = (e._useUTC ? Ze : je).apply(null, c)),
        (r = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
        null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
        e._nextDay && (e._a[x] = 24),
        e._w &&
          void 0 !== e._w.d &&
          e._w.d !== r &&
          (m(e).weekdayMismatch = !0);
    }
  }
  function Tt(e) {
    if (e._f === f.ISO_8601) St(e);
    else if (e._f === f.RFC_2822) Ot(e);
    else {
      (e._a = []), (m(e).empty = !0);
      for (
        var t,
          n,
          s,
          i,
          r,
          a = "" + e._i,
          o = a.length,
          u = 0,
          l = ae(e._f, e._locale).match(te) || [],
          h = l.length,
          d = 0;
        d < h;
        d++
      )
        (n = l[d]),
          (t = (a.match(Oe(n, e)) || [])[0]) &&
            (0 < (s = a.substr(0, a.indexOf(t))).length &&
              m(e).unusedInput.push(s),
            (a = a.slice(a.indexOf(t) + t.length)),
            (u += t.length)),
          ie[n]
            ? (t ? (m(e).empty = !1) : m(e).unusedTokens.push(n),
              (s = n),
              (r = e),
              null != (i = t) && c(xe, s) && xe[s](i, r._a, r, s))
            : e._strict && !t && m(e).unusedTokens.push(n);
      (m(e).charsLeftOver = o - u),
        0 < a.length && m(e).unusedInput.push(a),
        e._a[x] <= 12 &&
          !0 === m(e).bigHour &&
          0 < e._a[x] &&
          (m(e).bigHour = void 0),
        (m(e).parsedDateParts = e._a.slice(0)),
        (m(e).meridiem = e._meridiem),
        (e._a[x] = (function (e, t, n) {
          if (null == n) return t;
          return null != e.meridiemHour
            ? e.meridiemHour(t, n)
            : null != e.isPM
            ? ((e = e.isPM(n)) && t < 12 && (t += 12),
              (t = e || 12 !== t ? t : 0))
            : t;
        })(e._locale, e._a[x], e._meridiem)),
        null !== (o = m(e).era) &&
          (e._a[Y] = e._locale.erasConvertYear(o, e._a[Y])),
        xt(e),
        _t(e);
    }
  }
  function Nt(e) {
    var t,
      n,
      s,
      i = e._i,
      r = e._f;
    if (
      ((e._locale = e._locale || mt(e._l)),
      null === i || (void 0 === r && "" === i))
    )
      return I({ nullInput: !0 });
    if (("string" == typeof i && (e._i = i = e._locale.preparse(i)), h(i)))
      return new q(_t(i));
    if (V(i)) e._d = i;
    else if (a(r))
      !(function (e) {
        var t,
          n,
          s,
          i,
          r,
          a,
          o = !1,
          u = e._f.length;
        if (0 === u) return (m(e).invalidFormat = !0), (e._d = new Date(NaN));
        for (i = 0; i < u; i++)
          (r = 0),
            (a = !1),
            (t = $({}, e)),
            null != e._useUTC && (t._useUTC = e._useUTC),
            (t._f = e._f[i]),
            Tt(t),
            A(t) && (a = !0),
            (r = (r += m(t).charsLeftOver) + 10 * m(t).unusedTokens.length),
            (m(t).score = r),
            o
              ? r < s && ((s = r), (n = t))
              : (null == s || r < s || a) && ((s = r), (n = t), a && (o = !0));
        E(e, n || t);
      })(e);
    else if (r) Tt(e);
    else if (o((r = (i = e)._i))) i._d = new Date(f.now());
    else
      V(r)
        ? (i._d = new Date(r.valueOf()))
        : "string" == typeof r
        ? ((n = i),
          null !== (t = kt.exec(n._i))
            ? (n._d = new Date(+t[1]))
            : (St(n),
              !1 === n._isValid &&
                (delete n._isValid,
                Ot(n),
                !1 === n._isValid &&
                  (delete n._isValid,
                  n._strict
                    ? (n._isValid = !1)
                    : f.createFromInputFallback(n)))))
        : a(r)
        ? ((i._a = G(r.slice(0), function (e) {
            return parseInt(e, 10);
          })),
          xt(i))
        : F(r)
        ? (t = i)._d ||
          ((s = void 0 === (n = ue(t._i)).day ? n.date : n.day),
          (t._a = G(
            [n.year, n.month, s, n.hour, n.minute, n.second, n.millisecond],
            function (e) {
              return e && parseInt(e, 10);
            }
          )),
          xt(t))
        : u(r)
        ? (i._d = new Date(r))
        : f.createFromInputFallback(i);
    return A(e) || (e._d = null), e;
  }
  function Pt(e, t, n, s, i) {
    var r = {};
    return (
      (!0 !== t && !1 !== t) || ((s = t), (t = void 0)),
      (!0 !== n && !1 !== n) || ((s = n), (n = void 0)),
      ((F(e) && L(e)) || (a(e) && 0 === e.length)) && (e = void 0),
      (r._isAMomentObject = !0),
      (r._useUTC = r._isUTC = i),
      (r._l = n),
      (r._i = e),
      (r._f = t),
      (r._strict = s),
      (i = new q(_t(Nt((i = r)))))._nextDay &&
        (i.add(1, "d"), (i._nextDay = void 0)),
      i
    );
  }
  function W(e, t, n, s) {
    return Pt(e, t, n, s, !1);
  }
  (f.createFromInputFallback = e(
    "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function (e) {
      e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
    }
  )),
    (f.ISO_8601 = function () {}),
    (f.RFC_2822 = function () {});
  (ge = e(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var e = W.apply(null, arguments);
      return this.isValid() && e.isValid() ? (e < this ? this : e) : I();
    }
  )),
    (we = e(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var e = W.apply(null, arguments);
        return this.isValid() && e.isValid() ? (this < e ? this : e) : I();
      }
    ));
  function Rt(e, t) {
    var n, s;
    if (!(t = 1 === t.length && a(t[0]) ? t[0] : t).length) return W();
    for (n = t[0], s = 1; s < t.length; ++s)
      (t[s].isValid() && !t[s][e](n)) || (n = t[s]);
    return n;
  }
  var Wt = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
  function Ct(e) {
    var e = ue(e),
      t = e.year || 0,
      n = e.quarter || 0,
      s = e.month || 0,
      i = e.week || e.isoWeek || 0,
      r = e.day || 0,
      a = e.hour || 0,
      o = e.minute || 0,
      u = e.second || 0,
      l = e.millisecond || 0;
    (this._isValid = (function (e) {
      var t,
        n,
        s = !1,
        i = Wt.length;
      for (t in e)
        if (c(e, t) && (-1 === S.call(Wt, t) || (null != e[t] && isNaN(e[t]))))
          return !1;
      for (n = 0; n < i; ++n)
        if (e[Wt[n]]) {
          if (s) return !1;
          parseFloat(e[Wt[n]]) !== g(e[Wt[n]]) && (s = !0);
        }
      return !0;
    })(e)),
      (this._milliseconds = +l + 1e3 * u + 6e4 * o + 1e3 * a * 60 * 60),
      (this._days = +r + 7 * i),
      (this._months = +s + 3 * n + 12 * t),
      (this._data = {}),
      (this._locale = mt()),
      this._bubble();
  }
  function Ut(e) {
    return e instanceof Ct;
  }
  function Ht(e) {
    return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
  }
  function Ft(e, n) {
    s(e, 0, 0, function () {
      var e = this.utcOffset(),
        t = "+";
      return (
        e < 0 && ((e = -e), (t = "-")),
        t + r(~~(e / 60), 2) + n + r(~~e % 60, 2)
      );
    });
  }
  Ft("Z", ":"),
    Ft("ZZ", ""),
    k("Z", Ye),
    k("ZZ", Ye),
    D(["Z", "ZZ"], function (e, t, n) {
      (n._useUTC = !0), (n._tzm = Vt(Ye, e));
    });
  var Lt = /([\+\-]|\d\d)/gi;
  function Vt(e, t) {
    var t = (t || "").match(e);
    return null === t
      ? null
      : 0 ===
        (t =
          60 *
            (e = ((t[t.length - 1] || []) + "").match(Lt) || ["-", 0, 0])[1] +
          g(e[2]))
      ? 0
      : "+" === e[0]
      ? t
      : -t;
  }
  function Gt(e, t) {
    var n;
    return t._isUTC
      ? ((t = t.clone()),
        (n = (h(e) || V(e) ? e : W(e)).valueOf() - t.valueOf()),
        t._d.setTime(t._d.valueOf() + n),
        f.updateOffset(t, !1),
        t)
      : W(e).local();
  }
  function Et(e) {
    return -Math.round(e._d.getTimezoneOffset());
  }
  function At() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }
  f.updateOffset = function () {};
  var It = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
    jt =
      /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function C(e, t) {
    var n,
      s = e,
      i = null;
    return (
      Ut(e)
        ? (s = { ms: e._milliseconds, d: e._days, M: e._months })
        : u(e) || !isNaN(+e)
        ? ((s = {}), t ? (s[t] = +e) : (s.milliseconds = +e))
        : (i = It.exec(e))
        ? ((n = "-" === i[1] ? -1 : 1),
          (s = {
            y: 0,
            d: g(i[b]) * n,
            h: g(i[x]) * n,
            m: g(i[T]) * n,
            s: g(i[N]) * n,
            ms: g(Ht(1e3 * i[Ne])) * n,
          }))
        : (i = jt.exec(e))
        ? ((n = "-" === i[1] ? -1 : 1),
          (s = {
            y: Zt(i[2], n),
            M: Zt(i[3], n),
            w: Zt(i[4], n),
            d: Zt(i[5], n),
            h: Zt(i[6], n),
            m: Zt(i[7], n),
            s: Zt(i[8], n),
          }))
        : null == s
        ? (s = {})
        : "object" == typeof s &&
          ("from" in s || "to" in s) &&
          ((t = (function (e, t) {
            var n;
            if (!e.isValid() || !t.isValid())
              return { milliseconds: 0, months: 0 };
            (t = Gt(t, e)),
              e.isBefore(t)
                ? (n = zt(e, t))
                : (((n = zt(t, e)).milliseconds = -n.milliseconds),
                  (n.months = -n.months));
            return n;
          })(W(s.from), W(s.to))),
          ((s = {}).ms = t.milliseconds),
          (s.M = t.months)),
      (i = new Ct(s)),
      Ut(e) && c(e, "_locale") && (i._locale = e._locale),
      Ut(e) && c(e, "_isValid") && (i._isValid = e._isValid),
      i
    );
  }
  function Zt(e, t) {
    e = e && parseFloat(e.replace(",", "."));
    return (isNaN(e) ? 0 : e) * t;
  }
  function zt(e, t) {
    var n = {};
    return (
      (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
      e.clone().add(n.months, "M").isAfter(t) && --n.months,
      (n.milliseconds = +t - +e.clone().add(n.months, "M")),
      n
    );
  }
  function $t(s, i) {
    return function (e, t) {
      var n;
      return (
        null === t ||
          isNaN(+t) ||
          (Q(
            i,
            "moment()." +
              i +
              "(period, number) is deprecated. Please use moment()." +
              i +
              "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          ),
          (n = e),
          (e = t),
          (t = n)),
        qt(this, C(e, t), s),
        this
      );
    };
  }
  function qt(e, t, n, s) {
    var i = t._milliseconds,
      r = Ht(t._days),
      t = Ht(t._months);
    e.isValid() &&
      ((s = null == s || s),
      t && Ve(e, ce(e, "Month") + t * n),
      r && fe(e, "Date", ce(e, "Date") + r * n),
      i && e._d.setTime(e._d.valueOf() + i * n),
      s && f.updateOffset(e, r || t));
  }
  (C.fn = Ct.prototype),
    (C.invalid = function () {
      return C(NaN);
    });
  (Ce = $t(1, "add")), (Je = $t(-1, "subtract"));
  function Bt(e) {
    return "string" == typeof e || e instanceof String;
  }
  function Jt(e) {
    return (
      h(e) ||
      V(e) ||
      Bt(e) ||
      u(e) ||
      (function (t) {
        var e = a(t),
          n = !1;
        e &&
          (n =
            0 ===
            t.filter(function (e) {
              return !u(e) && Bt(t);
            }).length);
        return e && n;
      })(e) ||
      (function (e) {
        var t,
          n,
          s = F(e) && !L(e),
          i = !1,
          r = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms",
          ],
          a = r.length;
        for (t = 0; t < a; t += 1) (n = r[t]), (i = i || c(e, n));
        return s && i;
      })(e) ||
      null == e
    );
  }
  function Qt(e, t) {
    if (e.date() < t.date()) return -Qt(t, e);
    var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
      s = e.clone().add(n, "months"),
      t =
        t - s < 0
          ? (t - s) / (s - e.clone().add(n - 1, "months"))
          : (t - s) / (e.clone().add(1 + n, "months") - s);
    return -(n + t) || 0;
  }
  function Xt(e) {
    return void 0 === e
      ? this._locale._abbr
      : (null != (e = mt(e)) && (this._locale = e), this);
  }
  (f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
    (f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
  Xe = e(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function (e) {
      return void 0 === e ? this.localeData() : this.locale(e);
    }
  );
  function Kt() {
    return this._locale;
  }
  var en = 126227808e5;
  function tn(e, t) {
    return ((e % t) + t) % t;
  }
  function nn(e, t, n) {
    return e < 100 && 0 <= e
      ? new Date(e + 400, t, n) - en
      : new Date(e, t, n).valueOf();
  }
  function sn(e, t, n) {
    return e < 100 && 0 <= e ? Date.UTC(e + 400, t, n) - en : Date.UTC(e, t, n);
  }
  function rn(e, t) {
    return t.erasAbbrRegex(e);
  }
  function an() {
    for (
      var e = [], t = [], n = [], s = [], i = this.eras(), r = 0, a = i.length;
      r < a;
      ++r
    )
      t.push(M(i[r].name)),
        e.push(M(i[r].abbr)),
        n.push(M(i[r].narrow)),
        s.push(M(i[r].name)),
        s.push(M(i[r].abbr)),
        s.push(M(i[r].narrow));
    (this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i")),
      (this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i")),
      (this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i")),
      (this._erasNarrowRegex = new RegExp("^(" + n.join("|") + ")", "i"));
  }
  function on(e, t) {
    s(0, [e, e.length], 0, t);
  }
  function un(e, t, n, s, i) {
    var r;
    return null == e
      ? qe(this, s, i).year
      : ((r = P(e, s, i)),
        function (e, t, n, s, i) {
          (e = $e(e, t, n, s, i)), (t = Ze(e.year, 0, e.dayOfYear));
          return (
            this.year(t.getUTCFullYear()),
            this.month(t.getUTCMonth()),
            this.date(t.getUTCDate()),
            this
          );
        }.call(this, e, (t = r < t ? r : t), n, s, i));
  }
  s("N", 0, 0, "eraAbbr"),
    s("NN", 0, 0, "eraAbbr"),
    s("NNN", 0, 0, "eraAbbr"),
    s("NNNN", 0, 0, "eraName"),
    s("NNNNN", 0, 0, "eraNarrow"),
    s("y", ["y", 1], "yo", "eraYear"),
    s("y", ["yy", 2], 0, "eraYear"),
    s("y", ["yyy", 3], 0, "eraYear"),
    s("y", ["yyyy", 4], 0, "eraYear"),
    k("N", rn),
    k("NN", rn),
    k("NNN", rn),
    k("NNNN", function (e, t) {
      return t.erasNameRegex(e);
    }),
    k("NNNNN", function (e, t) {
      return t.erasNarrowRegex(e);
    }),
    D(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, n, s) {
      s = n._locale.erasParse(e, s, n._strict);
      s ? (m(n).era = s) : (m(n).invalidEra = e);
    }),
    k("y", Me),
    k("yy", Me),
    k("yyy", Me),
    k("yyyy", Me),
    k("yo", function (e, t) {
      return t._eraYearOrdinalRegex || Me;
    }),
    D(["y", "yy", "yyy", "yyyy"], Y),
    D(["yo"], function (e, t, n, s) {
      var i;
      n._locale._eraYearOrdinalRegex &&
        (i = e.match(n._locale._eraYearOrdinalRegex)),
        n._locale.eraYearOrdinalParse
          ? (t[Y] = n._locale.eraYearOrdinalParse(e, i))
          : (t[Y] = parseInt(e, 10));
    }),
    s(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
    }),
    s(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    }),
    on("gggg", "weekYear"),
    on("ggggg", "weekYear"),
    on("GGGG", "isoWeekYear"),
    on("GGGGG", "isoWeekYear"),
    t("weekYear", "gg"),
    t("isoWeekYear", "GG"),
    n("weekYear", 1),
    n("isoWeekYear", 1),
    k("G", De),
    k("g", De),
    k("GG", p, w),
    k("gg", p, w),
    k("GGGG", ve, _e),
    k("gggg", ve, _e),
    k("GGGGG", ke, ye),
    k("ggggg", ke, ye),
    Te(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
      t[s.substr(0, 2)] = g(e);
    }),
    Te(["gg", "GG"], function (e, t, n, s) {
      t[s] = f.parseTwoDigitYear(e);
    }),
    s("Q", 0, "Qo", "quarter"),
    t("quarter", "Q"),
    n("quarter", 7),
    k("Q", i),
    D("Q", function (e, t) {
      t[O] = 3 * (g(e) - 1);
    }),
    s("D", ["DD", 2], "Do", "date"),
    t("date", "D"),
    n("date", 9),
    k("D", p),
    k("DD", p, w),
    k("Do", function (e, t) {
      return e
        ? t._dayOfMonthOrdinalParse || t._ordinalParse
        : t._dayOfMonthOrdinalParseLenient;
    }),
    D(["D", "DD"], b),
    D("Do", function (e, t) {
      t[b] = g(e.match(p)[0]);
    });
  ve = de("Date", !0);
  s("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    t("dayOfYear", "DDD"),
    n("dayOfYear", 4),
    k("DDD", pe),
    k("DDDD", me),
    D(["DDD", "DDDD"], function (e, t, n) {
      n._dayOfYear = g(e);
    }),
    s("m", ["mm", 2], 0, "minute"),
    t("minute", "m"),
    n("minute", 14),
    k("m", p),
    k("mm", p, w),
    D(["m", "mm"], T);
  var ln,
    _e = de("Minutes", !1),
    ke =
      (s("s", ["ss", 2], 0, "second"),
      t("second", "s"),
      n("second", 15),
      k("s", p),
      k("ss", p, w),
      D(["s", "ss"], N),
      de("Seconds", !1));
  for (
    s("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    }),
      s(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10);
      }),
      s(0, ["SSS", 3], 0, "millisecond"),
      s(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond();
      }),
      s(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond();
      }),
      s(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond();
      }),
      s(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond();
      }),
      s(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond();
      }),
      s(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond();
      }),
      t("millisecond", "ms"),
      n("millisecond", 16),
      k("S", pe, i),
      k("SS", pe, w),
      k("SSS", pe, me),
      ln = "SSSS";
    ln.length <= 9;
    ln += "S"
  )
    k(ln, Me);
  function hn(e, t) {
    t[Ne] = g(1e3 * ("0." + e));
  }
  for (ln = "S"; ln.length <= 9; ln += "S") D(ln, hn);
  (ye = de("Milliseconds", !1)),
    s("z", 0, 0, "zoneAbbr"),
    s("zz", 0, 0, "zoneName");
  i = q.prototype;
  function dn(e) {
    return e;
  }
  (i.add = Ce),
    (i.calendar = function (e, t) {
      1 === arguments.length &&
        (arguments[0]
          ? Jt(arguments[0])
            ? ((e = arguments[0]), (t = void 0))
            : (function (e) {
                for (
                  var t = F(e) && !L(e),
                    n = !1,
                    s = [
                      "sameDay",
                      "nextDay",
                      "lastDay",
                      "nextWeek",
                      "lastWeek",
                      "sameElse",
                    ],
                    i = 0;
                  i < s.length;
                  i += 1
                )
                  n = n || c(e, s[i]);
                return t && n;
              })(arguments[0]) && ((t = arguments[0]), (e = void 0))
          : (t = e = void 0));
      var e = e || W(),
        n = Gt(e, this).startOf("day"),
        n = f.calendarFormat(this, n) || "sameElse",
        t = t && (d(t[n]) ? t[n].call(this, e) : t[n]);
      return this.format(t || this.localeData().calendar(n, this, W(e)));
    }),
    (i.clone = function () {
      return new q(this);
    }),
    (i.diff = function (e, t, n) {
      var s, i, r;
      if (!this.isValid()) return NaN;
      if (!(s = Gt(e, this)).isValid()) return NaN;
      switch (((i = 6e4 * (s.utcOffset() - this.utcOffset())), (t = _(t)))) {
        case "year":
          r = Qt(this, s) / 12;
          break;
        case "month":
          r = Qt(this, s);
          break;
        case "quarter":
          r = Qt(this, s) / 3;
          break;
        case "second":
          r = (this - s) / 1e3;
          break;
        case "minute":
          r = (this - s) / 6e4;
          break;
        case "hour":
          r = (this - s) / 36e5;
          break;
        case "day":
          r = (this - s - i) / 864e5;
          break;
        case "week":
          r = (this - s - i) / 6048e5;
          break;
        default:
          r = this - s;
      }
      return n ? r : y(r);
    }),
    (i.endOf = function (e) {
      var t, n;
      if (void 0 === (e = _(e)) || "millisecond" === e || !this.isValid())
        return this;
      switch (((n = this._isUTC ? sn : nn), e)) {
        case "year":
          t = n(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          t = n(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
          break;
        case "month":
          t = n(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          t =
            n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;
        case "isoWeek":
          t =
            n(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
          break;
        case "day":
        case "date":
          t = n(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          (t = this._d.valueOf()),
            (t +=
              36e5 -
              tn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) -
              1);
          break;
        case "minute":
          (t = this._d.valueOf()), (t += 6e4 - tn(t, 6e4) - 1);
          break;
        case "second":
          (t = this._d.valueOf()), (t += 1e3 - tn(t, 1e3) - 1);
      }
      return this._d.setTime(t), f.updateOffset(this, !0), this;
    }),
    (i.format = function (e) {
      return (
        (e = e || (this.isUtc() ? f.defaultFormatUtc : f.defaultFormat)),
        (e = re(this, e)),
        this.localeData().postformat(e)
      );
    }),
    (i.from = function (e, t) {
      return this.isValid() && ((h(e) && e.isValid()) || W(e).isValid())
        ? C({ to: this, from: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (i.fromNow = function (e) {
      return this.from(W(), e);
    }),
    (i.to = function (e, t) {
      return this.isValid() && ((h(e) && e.isValid()) || W(e).isValid())
        ? C({ from: this, to: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (i.toNow = function (e) {
      return this.to(W(), e);
    }),
    (i.get = function (e) {
      return d(this[(e = _(e))]) ? this[e]() : this;
    }),
    (i.invalidAt = function () {
      return m(this).overflow;
    }),
    (i.isAfter = function (e, t) {
      return (
        (e = h(e) ? e : W(e)),
        !(!this.isValid() || !e.isValid()) &&
          ("millisecond" === (t = _(t) || "millisecond")
            ? this.valueOf() > e.valueOf()
            : e.valueOf() < this.clone().startOf(t).valueOf())
      );
    }),
    (i.isBefore = function (e, t) {
      return (
        (e = h(e) ? e : W(e)),
        !(!this.isValid() || !e.isValid()) &&
          ("millisecond" === (t = _(t) || "millisecond")
            ? this.valueOf() < e.valueOf()
            : this.clone().endOf(t).valueOf() < e.valueOf())
      );
    }),
    (i.isBetween = function (e, t, n, s) {
      return (
        (e = h(e) ? e : W(e)),
        (t = h(t) ? t : W(t)),
        !!(this.isValid() && e.isValid() && t.isValid()) &&
          ("(" === (s = s || "()")[0]
            ? this.isAfter(e, n)
            : !this.isBefore(e, n)) &&
          (")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
      );
    }),
    (i.isSame = function (e, t) {
      var e = h(e) ? e : W(e);
      return (
        !(!this.isValid() || !e.isValid()) &&
        ("millisecond" === (t = _(t) || "millisecond")
          ? this.valueOf() === e.valueOf()
          : ((e = e.valueOf()),
            this.clone().startOf(t).valueOf() <= e &&
              e <= this.clone().endOf(t).valueOf()))
      );
    }),
    (i.isSameOrAfter = function (e, t) {
      return this.isSame(e, t) || this.isAfter(e, t);
    }),
    (i.isSameOrBefore = function (e, t) {
      return this.isSame(e, t) || this.isBefore(e, t);
    }),
    (i.isValid = function () {
      return A(this);
    }),
    (i.lang = Xe),
    (i.locale = Xt),
    (i.localeData = Kt),
    (i.max = we),
    (i.min = ge),
    (i.parsingFlags = function () {
      return E({}, m(this));
    }),
    (i.set = function (e, t) {
      if ("object" == typeof e)
        for (
          var n = (function (e) {
              var t,
                n = [];
              for (t in e) c(e, t) && n.push({ unit: t, priority: le[t] });
              return (
                n.sort(function (e, t) {
                  return e.priority - t.priority;
                }),
                n
              );
            })((e = ue(e))),
            s = n.length,
            i = 0;
          i < s;
          i++
        )
          this[n[i].unit](e[n[i].unit]);
      else if (d(this[(e = _(e))])) return this[e](t);
      return this;
    }),
    (i.startOf = function (e) {
      var t, n;
      if (void 0 === (e = _(e)) || "millisecond" === e || !this.isValid())
        return this;
      switch (((n = this._isUTC ? sn : nn), e)) {
        case "year":
          t = n(this.year(), 0, 1);
          break;
        case "quarter":
          t = n(this.year(), this.month() - (this.month() % 3), 1);
          break;
        case "month":
          t = n(this.year(), this.month(), 1);
          break;
        case "week":
          t = n(this.year(), this.month(), this.date() - this.weekday());
          break;
        case "isoWeek":
          t = n(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1)
          );
          break;
        case "day":
        case "date":
          t = n(this.year(), this.month(), this.date());
          break;
        case "hour":
          (t = this._d.valueOf()),
            (t -= tn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5));
          break;
        case "minute":
          (t = this._d.valueOf()), (t -= tn(t, 6e4));
          break;
        case "second":
          (t = this._d.valueOf()), (t -= tn(t, 1e3));
      }
      return this._d.setTime(t), f.updateOffset(this, !0), this;
    }),
    (i.subtract = Je),
    (i.toArray = function () {
      var e = this;
      return [
        e.year(),
        e.month(),
        e.date(),
        e.hour(),
        e.minute(),
        e.second(),
        e.millisecond(),
      ];
    }),
    (i.toObject = function () {
      var e = this;
      return {
        years: e.year(),
        months: e.month(),
        date: e.date(),
        hours: e.hours(),
        minutes: e.minutes(),
        seconds: e.seconds(),
        milliseconds: e.milliseconds(),
      };
    }),
    (i.toDate = function () {
      return new Date(this.valueOf());
    }),
    (i.toISOString = function (e) {
      if (!this.isValid()) return null;
      var t = (e = !0 !== e) ? this.clone().utc() : this;
      return t.year() < 0 || 9999 < t.year()
        ? re(
            t,
            e
              ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
              : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          )
        : d(Date.prototype.toISOString)
        ? e
          ? this.toDate().toISOString()
          : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
              .toISOString()
              .replace("Z", re(t, "Z"))
        : re(
            t,
            e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
    }),
    (i.inspect = function () {
      if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
      var e,
        t = "moment",
        n = "";
      return (
        this.isLocal() ||
          ((t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
          (n = "Z")),
        (t = "[" + t + '("]'),
        (e = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
        this.format(t + e + "-MM-DD[T]HH:mm:ss.SSS" + (n + '[")]'))
      );
    }),
    "undefined" != typeof Symbol &&
      null != Symbol.for &&
      (i[Symbol.for("nodejs.util.inspect.custom")] = function () {
        return "Moment<" + this.format() + ">";
      }),
    (i.toJSON = function () {
      return this.isValid() ? this.toISOString() : null;
    }),
    (i.toString = function () {
      return this.clone()
        .locale("en")
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }),
    (i.unix = function () {
      return Math.floor(this.valueOf() / 1e3);
    }),
    (i.valueOf = function () {
      return this._d.valueOf() - 6e4 * (this._offset || 0);
    }),
    (i.creationData = function () {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict,
      };
    }),
    (i.eraName = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].name;
        if (t[n].until <= e && e <= t[n].since) return t[n].name;
      }
      return "";
    }),
    (i.eraNarrow = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].narrow;
        if (t[n].until <= e && e <= t[n].since) return t[n].narrow;
      }
      return "";
    }),
    (i.eraAbbr = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].abbr;
        if (t[n].until <= e && e <= t[n].since) return t[n].abbr;
      }
      return "";
    }),
    (i.eraYear = function () {
      for (
        var e, t, n = this.localeData().eras(), s = 0, i = n.length;
        s < i;
        ++s
      )
        if (
          ((e = n[s].since <= n[s].until ? 1 : -1),
          (t = this.clone().startOf("day").valueOf()),
          (n[s].since <= t && t <= n[s].until) ||
            (n[s].until <= t && t <= n[s].since))
        )
          return (this.year() - f(n[s].since).year()) * e + n[s].offset;
      return this.year();
    }),
    (i.year = Ie),
    (i.isLeapYear = function () {
      return he(this.year());
    }),
    (i.weekYear = function (e) {
      return un.call(
        this,
        e,
        this.week(),
        this.weekday(),
        this.localeData()._week.dow,
        this.localeData()._week.doy
      );
    }),
    (i.isoWeekYear = function (e) {
      return un.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
    }),
    (i.quarter = i.quarters =
      function (e) {
        return null == e
          ? Math.ceil((this.month() + 1) / 3)
          : this.month(3 * (e - 1) + (this.month() % 3));
      }),
    (i.month = Ge),
    (i.daysInMonth = function () {
      return We(this.year(), this.month());
    }),
    (i.week = i.weeks =
      function (e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (i.isoWeek = i.isoWeeks =
      function (e) {
        var t = qe(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (i.weeksInYear = function () {
      var e = this.localeData()._week;
      return P(this.year(), e.dow, e.doy);
    }),
    (i.weeksInWeekYear = function () {
      var e = this.localeData()._week;
      return P(this.weekYear(), e.dow, e.doy);
    }),
    (i.isoWeeksInYear = function () {
      return P(this.year(), 1, 4);
    }),
    (i.isoWeeksInISOWeekYear = function () {
      return P(this.isoWeekYear(), 1, 4);
    }),
    (i.date = ve),
    (i.day = i.days =
      function (e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t,
          n,
          s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e
          ? ((t = e),
            (n = this.localeData()),
            (e =
              "string" != typeof t
                ? t
                : isNaN(t)
                ? "number" == typeof (t = n.weekdaysParse(t))
                  ? t
                  : null
                : parseInt(t, 10)),
            this.add(e - s, "d"))
          : s;
      }),
    (i.weekday = function (e) {
      if (!this.isValid()) return null != e ? this : NaN;
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d");
    }),
    (i.isoWeekday = function (e) {
      return this.isValid()
        ? null != e
          ? ((t = e),
            (n = this.localeData()),
            (n =
              "string" == typeof t
                ? n.weekdaysParse(t) % 7 || 7
                : isNaN(t)
                ? null
                : t),
            this.day(this.day() % 7 ? n : n - 7))
          : this.day() || 7
        : null != e
        ? this
        : NaN;
      var t, n;
    }),
    (i.dayOfYear = function (e) {
      var t =
        Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
      return null == e ? t : this.add(e - t, "d");
    }),
    (i.hour = i.hours = v),
    (i.minute = i.minutes = _e),
    (i.second = i.seconds = ke),
    (i.millisecond = i.milliseconds = ye),
    (i.utcOffset = function (e, t, n) {
      var s,
        i = this._offset || 0;
      if (!this.isValid()) return null != e ? this : NaN;
      if (null == e) return this._isUTC ? i : Et(this);
      if ("string" == typeof e) {
        if (null === (e = Vt(Ye, e))) return this;
      } else Math.abs(e) < 16 && !n && (e *= 60);
      return (
        !this._isUTC && t && (s = Et(this)),
        (this._offset = e),
        (this._isUTC = !0),
        null != s && this.add(s, "m"),
        i !== e &&
          (!t || this._changeInProgress
            ? qt(this, C(e - i, "m"), 1, !1)
            : this._changeInProgress ||
              ((this._changeInProgress = !0),
              f.updateOffset(this, !0),
              (this._changeInProgress = null))),
        this
      );
    }),
    (i.utc = function (e) {
      return this.utcOffset(0, e);
    }),
    (i.local = function (e) {
      return (
        this._isUTC &&
          (this.utcOffset(0, e),
          (this._isUTC = !1),
          e && this.subtract(Et(this), "m")),
        this
      );
    }),
    (i.parseZone = function () {
      var e;
      return (
        null != this._tzm
          ? this.utcOffset(this._tzm, !1, !0)
          : "string" == typeof this._i &&
            (null != (e = Vt(Se, this._i))
              ? this.utcOffset(e)
              : this.utcOffset(0, !0)),
        this
      );
    }),
    (i.hasAlignedHourOffset = function (e) {
      return (
        !!this.isValid() &&
        ((e = e ? W(e).utcOffset() : 0), (this.utcOffset() - e) % 60 == 0)
      );
    }),
    (i.isDST = function () {
      return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
      );
    }),
    (i.isLocal = function () {
      return !!this.isValid() && !this._isUTC;
    }),
    (i.isUtcOffset = function () {
      return !!this.isValid() && this._isUTC;
    }),
    (i.isUtc = At),
    (i.isUTC = At),
    (i.zoneAbbr = function () {
      return this._isUTC ? "UTC" : "";
    }),
    (i.zoneName = function () {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }),
    (i.dates = e("dates accessor is deprecated. Use date instead.", ve)),
    (i.months = e("months accessor is deprecated. Use month instead", Ge)),
    (i.years = e("years accessor is deprecated. Use year instead", Ie)),
    (i.zone = e(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      function (e, t) {
        return null != e
          ? (this.utcOffset((e = "string" != typeof e ? -e : e), t), this)
          : -this.utcOffset();
      }
    )),
    (i.isDSTShifted = e(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      function () {
        if (!o(this._isDSTShifted)) return this._isDSTShifted;
        var e,
          t = {};
        return (
          $(t, this),
          (t = Nt(t))._a
            ? ((e = (t._isUTC ? l : W)(t._a)),
              (this._isDSTShifted =
                this.isValid() &&
                0 <
                  (function (e, t, n) {
                    for (
                      var s = Math.min(e.length, t.length),
                        i = Math.abs(e.length - t.length),
                        r = 0,
                        a = 0;
                      a < s;
                      a++
                    )
                      ((n && e[a] !== t[a]) || (!n && g(e[a]) !== g(t[a]))) &&
                        r++;
                    return r + i;
                  })(t._a, e.toArray())))
            : (this._isDSTShifted = !1),
          this._isDSTShifted
        );
      }
    ));
  w = K.prototype;
  function cn(e, t, n, s) {
    var i = mt(),
      s = l().set(s, t);
    return i[n](s, e);
  }
  function fn(e, t, n) {
    if ((u(e) && ((t = e), (e = void 0)), (e = e || ""), null != t))
      return cn(e, t, n, "month");
    for (var s = [], i = 0; i < 12; i++) s[i] = cn(e, i, n, "month");
    return s;
  }
  function mn(e, t, n, s) {
    t =
      ("boolean" == typeof e
        ? u(t) && ((n = t), (t = void 0))
        : ((t = e), (e = !1), u((n = t)) && ((n = t), (t = void 0))),
      t || "");
    var i,
      r = mt(),
      a = e ? r._week.dow : 0,
      o = [];
    if (null != n) return cn(t, (n + a) % 7, s, "day");
    for (i = 0; i < 7; i++) o[i] = cn(t, (i + a) % 7, s, "day");
    return o;
  }
  (w.calendar = function (e, t, n) {
    return d((e = this._calendar[e] || this._calendar.sameElse))
      ? e.call(t, n)
      : e;
  }),
    (w.longDateFormat = function (e) {
      var t = this._longDateFormat[e],
        n = this._longDateFormat[e.toUpperCase()];
      return t || !n
        ? t
        : ((this._longDateFormat[e] = n
            .match(te)
            .map(function (e) {
              return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e
                ? e.slice(1)
                : e;
            })
            .join("")),
          this._longDateFormat[e]);
    }),
    (w.invalidDate = function () {
      return this._invalidDate;
    }),
    (w.ordinal = function (e) {
      return this._ordinal.replace("%d", e);
    }),
    (w.preparse = dn),
    (w.postformat = dn),
    (w.relativeTime = function (e, t, n, s) {
      var i = this._relativeTime[n];
      return d(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
    }),
    (w.pastFuture = function (e, t) {
      return d((e = this._relativeTime[0 < e ? "future" : "past"]))
        ? e(t)
        : e.replace(/%s/i, t);
    }),
    (w.set = function (e) {
      var t, n;
      for (n in e)
        c(e, n) && (d((t = e[n])) ? (this[n] = t) : (this["_" + n] = t));
      (this._config = e),
        (this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            "|" +
            /\d{1,2}/.source
        ));
    }),
    (w.eras = function (e, t) {
      for (
        var n, s = this._eras || mt("en")._eras, i = 0, r = s.length;
        i < r;
        ++i
      )
        switch (
          ("string" == typeof s[i].since &&
            ((n = f(s[i].since).startOf("day")), (s[i].since = n.valueOf())),
          typeof s[i].until)
        ) {
          case "undefined":
            s[i].until = 1 / 0;
            break;
          case "string":
            (n = f(s[i].until).startOf("day").valueOf()),
              (s[i].until = n.valueOf());
        }
      return s;
    }),
    (w.erasParse = function (e, t, n) {
      var s,
        i,
        r,
        a,
        o,
        u = this.eras();
      for (e = e.toUpperCase(), s = 0, i = u.length; s < i; ++s)
        if (
          ((r = u[s].name.toUpperCase()),
          (a = u[s].abbr.toUpperCase()),
          (o = u[s].narrow.toUpperCase()),
          n)
        )
          switch (t) {
            case "N":
            case "NN":
            case "NNN":
              if (a === e) return u[s];
              break;
            case "NNNN":
              if (r === e) return u[s];
              break;
            case "NNNNN":
              if (o === e) return u[s];
          }
        else if (0 <= [r, a, o].indexOf(e)) return u[s];
    }),
    (w.erasConvertYear = function (e, t) {
      var n = e.since <= e.until ? 1 : -1;
      return void 0 === t
        ? f(e.since).year()
        : f(e.since).year() + (t - e.offset) * n;
    }),
    (w.erasAbbrRegex = function (e) {
      return (
        c(this, "_erasAbbrRegex") || an.call(this),
        e ? this._erasAbbrRegex : this._erasRegex
      );
    }),
    (w.erasNameRegex = function (e) {
      return (
        c(this, "_erasNameRegex") || an.call(this),
        e ? this._erasNameRegex : this._erasRegex
      );
    }),
    (w.erasNarrowRegex = function (e) {
      return (
        c(this, "_erasNarrowRegex") || an.call(this),
        e ? this._erasNarrowRegex : this._erasRegex
      );
    }),
    (w.months = function (e, t) {
      return e
        ? (a(this._months)
            ? this._months
            : this._months[
                (this._months.isFormat || He).test(t) ? "format" : "standalone"
              ])[e.month()]
        : a(this._months)
        ? this._months
        : this._months.standalone;
    }),
    (w.monthsShort = function (e, t) {
      return e
        ? (a(this._monthsShort)
            ? this._monthsShort
            : this._monthsShort[He.test(t) ? "format" : "standalone"])[
            e.month()
          ]
        : a(this._monthsShort)
        ? this._monthsShort
        : this._monthsShort.standalone;
    }),
    (w.monthsParse = function (e, t, n) {
      var s, i;
      if (this._monthsParseExact)
        return function (e, t, n) {
          var s,
            i,
            r,
            e = e.toLocaleLowerCase();
          if (!this._monthsParse)
            for (
              this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = [],
                s = 0;
              s < 12;
              ++s
            )
              (r = l([2e3, s])),
                (this._shortMonthsParse[s] = this.monthsShort(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._longMonthsParse[s] = this.months(
                  r,
                  ""
                ).toLocaleLowerCase());
          return n
            ? "MMM" === t
              ? -1 !== (i = S.call(this._shortMonthsParse, e))
                ? i
                : null
              : -1 !== (i = S.call(this._longMonthsParse, e))
              ? i
              : null
            : "MMM" === t
            ? -1 !== (i = S.call(this._shortMonthsParse, e)) ||
              -1 !== (i = S.call(this._longMonthsParse, e))
              ? i
              : null
            : -1 !== (i = S.call(this._longMonthsParse, e)) ||
              -1 !== (i = S.call(this._shortMonthsParse, e))
            ? i
            : null;
        }.call(this, e, t, n);
      for (
        this._monthsParse ||
          ((this._monthsParse = []),
          (this._longMonthsParse = []),
          (this._shortMonthsParse = [])),
          s = 0;
        s < 12;
        s++
      ) {
        if (
          ((i = l([2e3, s])),
          n &&
            !this._longMonthsParse[s] &&
            ((this._longMonthsParse[s] = new RegExp(
              "^" + this.months(i, "").replace(".", "") + "$",
              "i"
            )),
            (this._shortMonthsParse[s] = new RegExp(
              "^" + this.monthsShort(i, "").replace(".", "") + "$",
              "i"
            ))),
          n ||
            this._monthsParse[s] ||
            ((i = "^" + this.months(i, "") + "|^" + this.monthsShort(i, "")),
            (this._monthsParse[s] = new RegExp(i.replace(".", ""), "i"))),
          n && "MMMM" === t && this._longMonthsParse[s].test(e))
        )
          return s;
        if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
        if (!n && this._monthsParse[s].test(e)) return s;
      }
    }),
    (w.monthsRegex = function (e) {
      return this._monthsParseExact
        ? (c(this, "_monthsRegex") || Ee.call(this),
          e ? this._monthsStrictRegex : this._monthsRegex)
        : (c(this, "_monthsRegex") || (this._monthsRegex = Le),
          this._monthsStrictRegex && e
            ? this._monthsStrictRegex
            : this._monthsRegex);
    }),
    (w.monthsShortRegex = function (e) {
      return this._monthsParseExact
        ? (c(this, "_monthsRegex") || Ee.call(this),
          e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        : (c(this, "_monthsShortRegex") || (this._monthsShortRegex = Fe),
          this._monthsShortStrictRegex && e
            ? this._monthsShortStrictRegex
            : this._monthsShortRegex);
    }),
    (w.week = function (e) {
      return qe(e, this._week.dow, this._week.doy).week;
    }),
    (w.firstDayOfYear = function () {
      return this._week.doy;
    }),
    (w.firstDayOfWeek = function () {
      return this._week.dow;
    }),
    (w.weekdays = function (e, t) {
      return (
        (t = a(this._weekdays)
          ? this._weekdays
          : this._weekdays[
              e && !0 !== e && this._weekdays.isFormat.test(t)
                ? "format"
                : "standalone"
            ]),
        !0 === e ? Be(t, this._week.dow) : e ? t[e.day()] : t
      );
    }),
    (w.weekdaysMin = function (e) {
      return !0 === e
        ? Be(this._weekdaysMin, this._week.dow)
        : e
        ? this._weekdaysMin[e.day()]
        : this._weekdaysMin;
    }),
    (w.weekdaysShort = function (e) {
      return !0 === e
        ? Be(this._weekdaysShort, this._week.dow)
        : e
        ? this._weekdaysShort[e.day()]
        : this._weekdaysShort;
    }),
    (w.weekdaysParse = function (e, t, n) {
      var s, i;
      if (this._weekdaysParseExact)
        return function (e, t, n) {
          var s,
            i,
            r,
            e = e.toLocaleLowerCase();
          if (!this._weekdaysParse)
            for (
              this._weekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._minWeekdaysParse = [],
                s = 0;
              s < 7;
              ++s
            )
              (r = l([2e3, 1]).day(s)),
                (this._minWeekdaysParse[s] = this.weekdaysMin(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._shortWeekdaysParse[s] = this.weekdaysShort(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._weekdaysParse[s] = this.weekdays(
                  r,
                  ""
                ).toLocaleLowerCase());
          return n
            ? "dddd" === t
              ? -1 !== (i = S.call(this._weekdaysParse, e))
                ? i
                : null
              : "ddd" === t
              ? -1 !== (i = S.call(this._shortWeekdaysParse, e))
                ? i
                : null
              : -1 !== (i = S.call(this._minWeekdaysParse, e))
              ? i
              : null
            : "dddd" === t
            ? -1 !== (i = S.call(this._weekdaysParse, e)) ||
              -1 !== (i = S.call(this._shortWeekdaysParse, e)) ||
              -1 !== (i = S.call(this._minWeekdaysParse, e))
              ? i
              : null
            : "ddd" === t
            ? -1 !== (i = S.call(this._shortWeekdaysParse, e)) ||
              -1 !== (i = S.call(this._weekdaysParse, e)) ||
              -1 !== (i = S.call(this._minWeekdaysParse, e))
              ? i
              : null
            : -1 !== (i = S.call(this._minWeekdaysParse, e)) ||
              -1 !== (i = S.call(this._weekdaysParse, e)) ||
              -1 !== (i = S.call(this._shortWeekdaysParse, e))
            ? i
            : null;
        }.call(this, e, t, n);
      for (
        this._weekdaysParse ||
          ((this._weekdaysParse = []),
          (this._minWeekdaysParse = []),
          (this._shortWeekdaysParse = []),
          (this._fullWeekdaysParse = [])),
          s = 0;
        s < 7;
        s++
      ) {
        if (
          ((i = l([2e3, 1]).day(s)),
          n &&
            !this._fullWeekdaysParse[s] &&
            ((this._fullWeekdaysParse[s] = new RegExp(
              "^" + this.weekdays(i, "").replace(".", "\\.?") + "$",
              "i"
            )),
            (this._shortWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$",
              "i"
            )),
            (this._minWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$",
              "i"
            ))),
          this._weekdaysParse[s] ||
            ((i =
              "^" +
              this.weekdays(i, "") +
              "|^" +
              this.weekdaysShort(i, "") +
              "|^" +
              this.weekdaysMin(i, "")),
            (this._weekdaysParse[s] = new RegExp(i.replace(".", ""), "i"))),
          n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
        )
          return s;
        if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
        if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
        if (!n && this._weekdaysParse[s].test(e)) return s;
      }
    }),
    (w.weekdaysRegex = function (e) {
      return this._weekdaysParseExact
        ? (c(this, "_weekdaysRegex") || nt.call(this),
          e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        : (c(this, "_weekdaysRegex") || (this._weekdaysRegex = Ke),
          this._weekdaysStrictRegex && e
            ? this._weekdaysStrictRegex
            : this._weekdaysRegex);
    }),
    (w.weekdaysShortRegex = function (e) {
      return this._weekdaysParseExact
        ? (c(this, "_weekdaysRegex") || nt.call(this),
          e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        : (c(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = et),
          this._weekdaysShortStrictRegex && e
            ? this._weekdaysShortStrictRegex
            : this._weekdaysShortRegex);
    }),
    (w.weekdaysMinRegex = function (e) {
      return this._weekdaysParseExact
        ? (c(this, "_weekdaysRegex") || nt.call(this),
          e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        : (c(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = tt),
          this._weekdaysMinStrictRegex && e
            ? this._weekdaysMinStrictRegex
            : this._weekdaysMinRegex);
    }),
    (w.isPM = function (e) {
      return "p" === (e + "").toLowerCase().charAt(0);
    }),
    (w.meridiem = function (e, t, n) {
      return 11 < e ? (n ? "pm" : "PM") : n ? "am" : "AM";
    }),
    ct("en", {
      eras: [
        {
          since: "0001-01-01",
          until: 1 / 0,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD",
        },
        {
          since: "0000-12-31",
          until: -1 / 0,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC",
        },
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (e) {
        var t = e % 10;
        return (
          e +
          (1 === g((e % 100) / 10)
            ? "th"
            : 1 == t
            ? "st"
            : 2 == t
            ? "nd"
            : 3 == t
            ? "rd"
            : "th")
        );
      },
    }),
    (f.lang = e("moment.lang is deprecated. Use moment.locale instead.", ct)),
    (f.langData = e(
      "moment.langData is deprecated. Use moment.localeData instead.",
      mt
    ));
  var _n = Math.abs;
  function yn(e, t, n, s) {
    t = C(t, n);
    return (
      (e._milliseconds += s * t._milliseconds),
      (e._days += s * t._days),
      (e._months += s * t._months),
      e._bubble()
    );
  }
  function gn(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
  }
  function wn(e) {
    return (4800 * e) / 146097;
  }
  function pn(e) {
    return (146097 * e) / 4800;
  }
  function vn(e) {
    return function () {
      return this.as(e);
    };
  }
  (pe = vn("ms")),
    (me = vn("s")),
    (Ce = vn("m")),
    (we = vn("h")),
    (ge = vn("d")),
    (Je = vn("w")),
    (v = vn("M")),
    (_e = vn("Q")),
    (ke = vn("y"));
  function kn(e) {
    return function () {
      return this.isValid() ? this._data[e] : NaN;
    };
  }
  var ye = kn("milliseconds"),
    ve = kn("seconds"),
    Ie = kn("minutes"),
    w = kn("hours"),
    Mn = kn("days"),
    Dn = kn("months"),
    Sn = kn("years");
  var Yn = Math.round,
    On = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
  function bn(e, t, n, s) {
    var i = C(e).abs(),
      r = Yn(i.as("s")),
      a = Yn(i.as("m")),
      o = Yn(i.as("h")),
      u = Yn(i.as("d")),
      l = Yn(i.as("M")),
      h = Yn(i.as("w")),
      i = Yn(i.as("y")),
      r =
        (r <= n.ss ? ["s", r] : r < n.s && ["ss", r]) ||
        (a <= 1 && ["m"]) ||
        (a < n.m && ["mm", a]) ||
        (o <= 1 && ["h"]) ||
        (o < n.h && ["hh", o]) ||
        (u <= 1 && ["d"]) ||
        (u < n.d && ["dd", u]);
    return (
      ((r = (r =
        null != n.w ? r || (h <= 1 && ["w"]) || (h < n.w && ["ww", h]) : r) ||
        (l <= 1 && ["M"]) ||
        (l < n.M && ["MM", l]) ||
        (i <= 1 && ["y"]) || ["yy", i])[2] = t),
      (r[3] = 0 < +e),
      (r[4] = s),
      function (e, t, n, s, i) {
        return i.relativeTime(t || 1, !!n, e, s);
      }.apply(null, r)
    );
  }
  var xn = Math.abs;
  function Tn(e) {
    return (0 < e) - (e < 0) || +e;
  }
  function Nn() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var e,
      t,
      n,
      s,
      i,
      r,
      a,
      o = xn(this._milliseconds) / 1e3,
      u = xn(this._days),
      l = xn(this._months),
      h = this.asSeconds();
    return h
      ? ((e = y(o / 60)),
        (t = y(e / 60)),
        (o %= 60),
        (e %= 60),
        (n = y(l / 12)),
        (l %= 12),
        (s = o ? o.toFixed(3).replace(/\.?0+$/, "") : ""),
        (i = Tn(this._months) !== Tn(h) ? "-" : ""),
        (r = Tn(this._days) !== Tn(h) ? "-" : ""),
        (a = Tn(this._milliseconds) !== Tn(h) ? "-" : ""),
        (h < 0 ? "-" : "") +
          "P" +
          (n ? i + n + "Y" : "") +
          (l ? i + l + "M" : "") +
          (u ? r + u + "D" : "") +
          (t || e || o ? "T" : "") +
          (t ? a + t + "H" : "") +
          (e ? a + e + "M" : "") +
          (o ? a + s + "S" : ""))
      : "P0D";
  }
  var U = Ct.prototype;
  return (
    (U.isValid = function () {
      return this._isValid;
    }),
    (U.abs = function () {
      var e = this._data;
      return (
        (this._milliseconds = _n(this._milliseconds)),
        (this._days = _n(this._days)),
        (this._months = _n(this._months)),
        (e.milliseconds = _n(e.milliseconds)),
        (e.seconds = _n(e.seconds)),
        (e.minutes = _n(e.minutes)),
        (e.hours = _n(e.hours)),
        (e.months = _n(e.months)),
        (e.years = _n(e.years)),
        this
      );
    }),
    (U.add = function (e, t) {
      return yn(this, e, t, 1);
    }),
    (U.subtract = function (e, t) {
      return yn(this, e, t, -1);
    }),
    (U.as = function (e) {
      if (!this.isValid()) return NaN;
      var t,
        n,
        s = this._milliseconds;
      if ("month" === (e = _(e)) || "quarter" === e || "year" === e)
        switch (((t = this._days + s / 864e5), (n = this._months + wn(t)), e)) {
          case "month":
            return n;
          case "quarter":
            return n / 3;
          case "year":
            return n / 12;
        }
      else
        switch (((t = this._days + Math.round(pn(this._months))), e)) {
          case "week":
            return t / 7 + s / 6048e5;
          case "day":
            return t + s / 864e5;
          case "hour":
            return 24 * t + s / 36e5;
          case "minute":
            return 1440 * t + s / 6e4;
          case "second":
            return 86400 * t + s / 1e3;
          case "millisecond":
            return Math.floor(864e5 * t) + s;
          default:
            throw new Error("Unknown unit " + e);
        }
    }),
    (U.asMilliseconds = pe),
    (U.asSeconds = me),
    (U.asMinutes = Ce),
    (U.asHours = we),
    (U.asDays = ge),
    (U.asWeeks = Je),
    (U.asMonths = v),
    (U.asQuarters = _e),
    (U.asYears = ke),
    (U.valueOf = function () {
      return this.isValid()
        ? this._milliseconds +
            864e5 * this._days +
            (this._months % 12) * 2592e6 +
            31536e6 * g(this._months / 12)
        : NaN;
    }),
    (U._bubble = function () {
      var e = this._milliseconds,
        t = this._days,
        n = this._months,
        s = this._data;
      return (
        (0 <= e && 0 <= t && 0 <= n) ||
          (e <= 0 && t <= 0 && n <= 0) ||
          ((e += 864e5 * gn(pn(n) + t)), (n = t = 0)),
        (s.milliseconds = e % 1e3),
        (e = y(e / 1e3)),
        (s.seconds = e % 60),
        (e = y(e / 60)),
        (s.minutes = e % 60),
        (e = y(e / 60)),
        (s.hours = e % 24),
        (t += y(e / 24)),
        (n += e = y(wn(t))),
        (t -= gn(pn(e))),
        (e = y(n / 12)),
        (n %= 12),
        (s.days = t),
        (s.months = n),
        (s.years = e),
        this
      );
    }),
    (U.clone = function () {
      return C(this);
    }),
    (U.get = function (e) {
      return (e = _(e)), this.isValid() ? this[e + "s"]() : NaN;
    }),
    (U.milliseconds = ye),
    (U.seconds = ve),
    (U.minutes = Ie),
    (U.hours = w),
    (U.days = Mn),
    (U.weeks = function () {
      return y(this.days() / 7);
    }),
    (U.months = Dn),
    (U.years = Sn),
    (U.humanize = function (e, t) {
      if (!this.isValid()) return this.localeData().invalidDate();
      var n = !1,
        s = On;
      return (
        "object" == typeof e && ((t = e), (e = !1)),
        "boolean" == typeof e && (n = e),
        "object" == typeof t &&
          ((s = Object.assign({}, On, t)),
          null != t.s && null == t.ss && (s.ss = t.s - 1)),
        (e = this.localeData()),
        (t = bn(this, !n, s, e)),
        n && (t = e.pastFuture(+this, t)),
        e.postformat(t)
      );
    }),
    (U.toISOString = Nn),
    (U.toString = Nn),
    (U.toJSON = Nn),
    (U.locale = Xt),
    (U.localeData = Kt),
    (U.toIsoString = e(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      Nn
    )),
    (U.lang = Xe),
    s("X", 0, 0, "unix"),
    s("x", 0, 0, "valueOf"),
    k("x", De),
    k("X", /[+-]?\d+(\.\d{1,3})?/),
    D("X", function (e, t, n) {
      n._d = new Date(1e3 * parseFloat(e));
    }),
    D("x", function (e, t, n) {
      n._d = new Date(g(e));
    }),
    (f.version = "2.29.4"),
    (H = W),
    (f.fn = i),
    (f.min = function () {
      return Rt("isBefore", [].slice.call(arguments, 0));
    }),
    (f.max = function () {
      return Rt("isAfter", [].slice.call(arguments, 0));
    }),
    (f.now = function () {
      return Date.now ? Date.now() : +new Date();
    }),
    (f.utc = l),
    (f.unix = function (e) {
      return W(1e3 * e);
    }),
    (f.months = function (e, t) {
      return fn(e, t, "months");
    }),
    (f.isDate = V),
    (f.locale = ct),
    (f.invalid = I),
    (f.duration = C),
    (f.isMoment = h),
    (f.weekdays = function (e, t, n) {
      return mn(e, t, n, "weekdays");
    }),
    (f.parseZone = function () {
      return W.apply(null, arguments).parseZone();
    }),
    (f.localeData = mt),
    (f.isDuration = Ut),
    (f.monthsShort = function (e, t) {
      return fn(e, t, "monthsShort");
    }),
    (f.weekdaysMin = function (e, t, n) {
      return mn(e, t, n, "weekdaysMin");
    }),
    (f.defineLocale = ft),
    (f.updateLocale = function (e, t) {
      var n, s;
      return (
        null != t
          ? ((s = ot),
            null != R[e] && null != R[e].parentLocale
              ? R[e].set(X(R[e]._config, t))
              : ((t = X((s = null != (n = dt(e)) ? n._config : s), t)),
                null == n && (t.abbr = e),
                ((s = new K(t)).parentLocale = R[e]),
                (R[e] = s)),
            ct(e))
          : null != R[e] &&
            (null != R[e].parentLocale
              ? ((R[e] = R[e].parentLocale), e === ct() && ct(e))
              : null != R[e] && delete R[e]),
        R[e]
      );
    }),
    (f.locales = function () {
      return ee(R);
    }),
    (f.weekdaysShort = function (e, t, n) {
      return mn(e, t, n, "weekdaysShort");
    }),
    (f.normalizeUnits = _),
    (f.relativeTimeRounding = function (e) {
      return void 0 === e ? Yn : "function" == typeof e && ((Yn = e), !0);
    }),
    (f.relativeTimeThreshold = function (e, t) {
      return (
        void 0 !== On[e] &&
        (void 0 === t ? On[e] : ((On[e] = t), "s" === e && (On.ss = t - 1), !0))
      );
    }),
    (f.calendarFormat = function (e, t) {
      return (e = e.diff(t, "days", !0)) < -6
        ? "sameElse"
        : e < -1
        ? "lastWeek"
        : e < 0
        ? "lastDay"
        : e < 1
        ? "sameDay"
        : e < 2
        ? "nextDay"
        : e < 7
        ? "nextWeek"
        : "sameElse";
    }),
    (f.prototype = i),
    (f.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      DATE: "YYYY-MM-DD",
      TIME: "HH:mm",
      TIME_SECONDS: "HH:mm:ss",
      TIME_MS: "HH:mm:ss.SSS",
      WEEK: "GGGG-[W]WW",
      MONTH: "YYYY-MM",
    }),
    f
  );
});
/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/daterangepicker@3.1.0/daterangepicker.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function (t, e) {
  if ("function" == typeof define && define.amd)
    define(["moment", "jquery"], function (t, a) {
      return (
        a.fn || (a.fn = {}),
        "function" != typeof t &&
          t.hasOwnProperty("default") &&
          (t = t.default),
        e(t, a)
      );
    });
  else if ("object" == typeof module && module.exports) {
    var a = "undefined" != typeof window ? window.jQuery : void 0;
    a || (a = require("jquery")).fn || (a.fn = {});
    var i =
      "undefined" != typeof window && void 0 !== window.moment
        ? window.moment
        : require("moment");
    module.exports = e(i, a);
  } else t.daterangepicker = e(t.moment, t.jQuery);
})(this, function (t, e) {
  var a = function (a, i, s) {
    if (
      ((this.parentEl = "body"),
      (this.element = e(a)),
      (this.startDate = t().startOf("day")),
      (this.endDate = t().endOf("day")),
      (this.minDate = !1),
      (this.maxDate = !1),
      (this.maxSpan = !1),
      (this.autoApply = !1),
      (this.singleDatePicker = !1),
      (this.showDropdowns = !1),
      (this.minYear = t().subtract(100, "year").format("YYYY")),
      (this.maxYear = t().add(100, "year").format("YYYY")),
      (this.showWeekNumbers = !1),
      (this.showISOWeekNumbers = !1),
      (this.showCustomRangeLabel = !0),
      (this.timePicker = !1),
      (this.timePicker24Hour = !1),
      (this.timePickerIncrement = 1),
      (this.timePickerSeconds = !1),
      (this.linkedCalendars = !0),
      (this.autoUpdateInput = !0),
      (this.alwaysShowCalendars = !1),
      (this.ranges = {}),
      (this.opens = "right"),
      this.element.hasClass("pull-right") && (this.opens = "left"),
      (this.drops = "down"),
      this.element.hasClass("dropup") && (this.drops = "up"),
      (this.buttonClasses = "btn btn-sm"),
      (this.applyButtonClasses = "btn-primary"),
      (this.cancelButtonClasses = "btn-default"),
      (this.locale = {
        direction: "ltr",
        format: t.localeData().longDateFormat("L"),
        separator: " - ",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: t.weekdaysMin(),
        monthNames: t.monthsShort(),
        firstDay: t.localeData().firstDayOfWeek(),
      }),
      (this.callback = function () {}),
      (this.isShowing = !1),
      (this.leftCalendar = {}),
      (this.rightCalendar = {}),
      ("object" == typeof i && null !== i) || (i = {}),
      "string" == typeof (i = e.extend(this.element.data(), i)).template ||
        i.template instanceof e ||
        (i.template =
          '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),
      (this.parentEl =
        i.parentEl && e(i.parentEl).length ? e(i.parentEl) : e(this.parentEl)),
      (this.container = e(i.template).appendTo(this.parentEl)),
      "object" == typeof i.locale &&
        ("string" == typeof i.locale.direction &&
          (this.locale.direction = i.locale.direction),
        "string" == typeof i.locale.format &&
          (this.locale.format = i.locale.format),
        "string" == typeof i.locale.separator &&
          (this.locale.separator = i.locale.separator),
        "object" == typeof i.locale.daysOfWeek &&
          (this.locale.daysOfWeek = i.locale.daysOfWeek.slice()),
        "object" == typeof i.locale.monthNames &&
          (this.locale.monthNames = i.locale.monthNames.slice()),
        "number" == typeof i.locale.firstDay &&
          (this.locale.firstDay = i.locale.firstDay),
        "string" == typeof i.locale.applyLabel &&
          (this.locale.applyLabel = i.locale.applyLabel),
        "string" == typeof i.locale.cancelLabel &&
          (this.locale.cancelLabel = i.locale.cancelLabel),
        "string" == typeof i.locale.weekLabel &&
          (this.locale.weekLabel = i.locale.weekLabel),
        "string" == typeof i.locale.customRangeLabel))
    ) {
      (p = document.createElement("textarea")).innerHTML =
        i.locale.customRangeLabel;
      var n = p.value;
      this.locale.customRangeLabel = n;
    }
    if (
      (this.container.addClass(this.locale.direction),
      "string" == typeof i.startDate &&
        (this.startDate = t(i.startDate, this.locale.format)),
      "string" == typeof i.endDate &&
        (this.endDate = t(i.endDate, this.locale.format)),
      "string" == typeof i.minDate &&
        (this.minDate = t(i.minDate, this.locale.format)),
      "string" == typeof i.maxDate &&
        (this.maxDate = t(i.maxDate, this.locale.format)),
      "object" == typeof i.startDate && (this.startDate = t(i.startDate)),
      "object" == typeof i.endDate && (this.endDate = t(i.endDate)),
      "object" == typeof i.minDate && (this.minDate = t(i.minDate)),
      "object" == typeof i.maxDate && (this.maxDate = t(i.maxDate)),
      this.minDate &&
        this.startDate.isBefore(this.minDate) &&
        (this.startDate = this.minDate.clone()),
      this.maxDate &&
        this.endDate.isAfter(this.maxDate) &&
        (this.endDate = this.maxDate.clone()),
      "string" == typeof i.applyButtonClasses &&
        (this.applyButtonClasses = i.applyButtonClasses),
      "string" == typeof i.applyClass &&
        (this.applyButtonClasses = i.applyClass),
      "string" == typeof i.cancelButtonClasses &&
        (this.cancelButtonClasses = i.cancelButtonClasses),
      "string" == typeof i.cancelClass &&
        (this.cancelButtonClasses = i.cancelClass),
      "object" == typeof i.maxSpan && (this.maxSpan = i.maxSpan),
      "object" == typeof i.dateLimit && (this.maxSpan = i.dateLimit),
      "string" == typeof i.opens && (this.opens = i.opens),
      "string" == typeof i.drops && (this.drops = i.drops),
      "boolean" == typeof i.showWeekNumbers &&
        (this.showWeekNumbers = i.showWeekNumbers),
      "boolean" == typeof i.showISOWeekNumbers &&
        (this.showISOWeekNumbers = i.showISOWeekNumbers),
      "string" == typeof i.buttonClasses &&
        (this.buttonClasses = i.buttonClasses),
      "object" == typeof i.buttonClasses &&
        (this.buttonClasses = i.buttonClasses.join(" ")),
      "boolean" == typeof i.showDropdowns &&
        (this.showDropdowns = i.showDropdowns),
      "number" == typeof i.minYear && (this.minYear = i.minYear),
      "number" == typeof i.maxYear && (this.maxYear = i.maxYear),
      "boolean" == typeof i.showCustomRangeLabel &&
        (this.showCustomRangeLabel = i.showCustomRangeLabel),
      "boolean" == typeof i.singleDatePicker &&
        ((this.singleDatePicker = i.singleDatePicker),
        this.singleDatePicker && (this.endDate = this.startDate.clone())),
      "boolean" == typeof i.timePicker && (this.timePicker = i.timePicker),
      "boolean" == typeof i.timePickerSeconds &&
        (this.timePickerSeconds = i.timePickerSeconds),
      "number" == typeof i.timePickerIncrement &&
        (this.timePickerIncrement = i.timePickerIncrement),
      "boolean" == typeof i.timePicker24Hour &&
        (this.timePicker24Hour = i.timePicker24Hour),
      "boolean" == typeof i.autoApply && (this.autoApply = i.autoApply),
      "boolean" == typeof i.autoUpdateInput &&
        (this.autoUpdateInput = i.autoUpdateInput),
      "boolean" == typeof i.linkedCalendars &&
        (this.linkedCalendars = i.linkedCalendars),
      "function" == typeof i.isInvalidDate &&
        (this.isInvalidDate = i.isInvalidDate),
      "function" == typeof i.isCustomDate &&
        (this.isCustomDate = i.isCustomDate),
      "boolean" == typeof i.alwaysShowCalendars &&
        (this.alwaysShowCalendars = i.alwaysShowCalendars),
      0 != this.locale.firstDay)
    )
      for (var r = this.locale.firstDay; r > 0; )
        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), r--;
    var o, h, l;
    if (
      void 0 === i.startDate &&
      void 0 === i.endDate &&
      e(this.element).is(":text")
    ) {
      var c = e(this.element).val(),
        d = c.split(this.locale.separator);
      (o = h = null),
        2 == d.length
          ? ((o = t(d[0], this.locale.format)),
            (h = t(d[1], this.locale.format)))
          : this.singleDatePicker &&
            "" !== c &&
            ((o = t(c, this.locale.format)), (h = t(c, this.locale.format))),
        null !== o && null !== h && (this.setStartDate(o), this.setEndDate(h));
    }
    if ("object" == typeof i.ranges) {
      for (l in i.ranges) {
        (o =
          "string" == typeof i.ranges[l][0]
            ? t(i.ranges[l][0], this.locale.format)
            : t(i.ranges[l][0])),
          (h =
            "string" == typeof i.ranges[l][1]
              ? t(i.ranges[l][1], this.locale.format)
              : t(i.ranges[l][1])),
          this.minDate &&
            o.isBefore(this.minDate) &&
            (o = this.minDate.clone());
        var m = this.maxDate;
        if (
          (this.maxSpan &&
            m &&
            o.clone().add(this.maxSpan).isAfter(m) &&
            (m = o.clone().add(this.maxSpan)),
          m && h.isAfter(m) && (h = m.clone()),
          !(
            (this.minDate &&
              h.isBefore(this.minDate, this.timepicker ? "minute" : "day")) ||
            (m && o.isAfter(m, this.timepicker ? "minute" : "day"))
          ))
        ) {
          var p;
          (p = document.createElement("textarea")).innerHTML = l;
          n = p.value;
          this.ranges[n] = [o, h];
        }
      }
      var f = "<ul>";
      for (l in this.ranges)
        f += '<li data-range-key="' + l + '">' + l + "</li>";
      this.showCustomRangeLabel &&
        (f +=
          '<li data-range-key="' +
          this.locale.customRangeLabel +
          '">' +
          this.locale.customRangeLabel +
          "</li>"),
        (f += "</ul>"),
        this.container.find(".ranges").prepend(f);
    }
    "function" == typeof s && (this.callback = s),
      this.timePicker ||
        ((this.startDate = this.startDate.startOf("day")),
        (this.endDate = this.endDate.endOf("day")),
        this.container.find(".calendar-time").hide()),
      this.timePicker && this.autoApply && (this.autoApply = !1),
      this.autoApply && this.container.addClass("auto-apply"),
      "object" == typeof i.ranges && this.container.addClass("show-ranges"),
      this.singleDatePicker &&
        (this.container.addClass("single"),
        this.container.find(".drp-calendar.left").addClass("single"),
        this.container.find(".drp-calendar.left").show(),
        this.container.find(".drp-calendar.right").hide(),
        !this.timePicker &&
          this.autoApply &&
          this.container.addClass("auto-apply")),
      ((void 0 === i.ranges && !this.singleDatePicker) ||
        this.alwaysShowCalendars) &&
        this.container.addClass("show-calendar"),
      this.container.addClass("opens" + this.opens),
      this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),
      this.applyButtonClasses.length &&
        this.container.find(".applyBtn").addClass(this.applyButtonClasses),
      this.cancelButtonClasses.length &&
        this.container.find(".cancelBtn").addClass(this.cancelButtonClasses),
      this.container.find(".applyBtn").html(this.locale.applyLabel),
      this.container.find(".cancelBtn").html(this.locale.cancelLabel),
      this.container
        .find(".drp-calendar")
        .on("click.daterangepicker", ".prev", e.proxy(this.clickPrev, this))
        .on("click.daterangepicker", ".next", e.proxy(this.clickNext, this))
        .on(
          "mousedown.daterangepicker",
          "td.available",
          e.proxy(this.clickDate, this)
        )
        .on(
          "mouseenter.daterangepicker",
          "td.available",
          e.proxy(this.hoverDate, this)
        )
        .on(
          "change.daterangepicker",
          "select.yearselect",
          e.proxy(this.monthOrYearChanged, this)
        )
        .on(
          "change.daterangepicker",
          "select.monthselect",
          e.proxy(this.monthOrYearChanged, this)
        )
        .on(
          "change.daterangepicker",
          "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",
          e.proxy(this.timeChanged, this)
        ),
      this.container
        .find(".ranges")
        .on("click.daterangepicker", "li", e.proxy(this.clickRange, this)),
      this.container
        .find(".drp-buttons")
        .on(
          "click.daterangepicker",
          "button.applyBtn",
          e.proxy(this.clickApply, this)
        )
        .on(
          "click.daterangepicker",
          "button.cancelBtn",
          e.proxy(this.clickCancel, this)
        ),
      this.element.is("input") || this.element.is("button")
        ? this.element.on({
            "click.daterangepicker": e.proxy(this.show, this),
            "focus.daterangepicker": e.proxy(this.show, this),
            "keyup.daterangepicker": e.proxy(this.elementChanged, this),
            "keydown.daterangepicker": e.proxy(this.keydown, this),
          })
        : (this.element.on("click.daterangepicker", e.proxy(this.toggle, this)),
          this.element.on(
            "keydown.daterangepicker",
            e.proxy(this.toggle, this)
          )),
      this.updateElement();
  };
  return (
    (a.prototype = {
      constructor: a,
      setStartDate: function (e) {
        "string" == typeof e && (this.startDate = t(e, this.locale.format)),
          "object" == typeof e && (this.startDate = t(e)),
          this.timePicker || (this.startDate = this.startDate.startOf("day")),
          this.timePicker &&
            this.timePickerIncrement &&
            this.startDate.minute(
              Math.round(this.startDate.minute() / this.timePickerIncrement) *
                this.timePickerIncrement
            ),
          this.minDate &&
            this.startDate.isBefore(this.minDate) &&
            ((this.startDate = this.minDate.clone()),
            this.timePicker &&
              this.timePickerIncrement &&
              this.startDate.minute(
                Math.round(this.startDate.minute() / this.timePickerIncrement) *
                  this.timePickerIncrement
              )),
          this.maxDate &&
            this.startDate.isAfter(this.maxDate) &&
            ((this.startDate = this.maxDate.clone()),
            this.timePicker &&
              this.timePickerIncrement &&
              this.startDate.minute(
                Math.floor(this.startDate.minute() / this.timePickerIncrement) *
                  this.timePickerIncrement
              )),
          this.isShowing || this.updateElement(),
          this.updateMonthsInView();
      },
      setEndDate: function (e) {
        "string" == typeof e && (this.endDate = t(e, this.locale.format)),
          "object" == typeof e && (this.endDate = t(e)),
          this.timePicker || (this.endDate = this.endDate.endOf("day")),
          this.timePicker &&
            this.timePickerIncrement &&
            this.endDate.minute(
              Math.round(this.endDate.minute() / this.timePickerIncrement) *
                this.timePickerIncrement
            ),
          this.endDate.isBefore(this.startDate) &&
            (this.endDate = this.startDate.clone()),
          this.maxDate &&
            this.endDate.isAfter(this.maxDate) &&
            (this.endDate = this.maxDate.clone()),
          this.maxSpan &&
            this.startDate.clone().add(this.maxSpan).isBefore(this.endDate) &&
            (this.endDate = this.startDate.clone().add(this.maxSpan)),
          (this.previousRightTime = this.endDate.clone()),
          this.container
            .find(".drp-selected")
            .html(
              this.startDate.format(this.locale.format) +
                this.locale.separator +
                this.endDate.format(this.locale.format)
            ),
          this.isShowing || this.updateElement(),
          this.updateMonthsInView();
      },
      isInvalidDate: function () {
        return !1;
      },
      isCustomDate: function () {
        return !1;
      },
      updateView: function () {
        this.timePicker &&
          (this.renderTimePicker("left"),
          this.renderTimePicker("right"),
          this.endDate
            ? this.container
                .find(".right .calendar-time select")
                .prop("disabled", !1)
                .removeClass("disabled")
            : this.container
                .find(".right .calendar-time select")
                .prop("disabled", !0)
                .addClass("disabled")),
          this.endDate &&
            this.container
              .find(".drp-selected")
              .html(
                this.startDate.format(this.locale.format) +
                  this.locale.separator +
                  this.endDate.format(this.locale.format)
              ),
          this.updateMonthsInView(),
          this.updateCalendars(),
          this.updateFormInputs();
      },
      updateMonthsInView: function () {
        if (this.endDate) {
          if (
            !this.singleDatePicker &&
            this.leftCalendar.month &&
            this.rightCalendar.month &&
            (this.startDate.format("YYYY-MM") ==
              this.leftCalendar.month.format("YYYY-MM") ||
              this.startDate.format("YYYY-MM") ==
                this.rightCalendar.month.format("YYYY-MM")) &&
            (this.endDate.format("YYYY-MM") ==
              this.leftCalendar.month.format("YYYY-MM") ||
              this.endDate.format("YYYY-MM") ==
                this.rightCalendar.month.format("YYYY-MM"))
          )
            return;
          (this.leftCalendar.month = this.startDate.clone().date(2)),
            this.linkedCalendars ||
            (this.endDate.month() == this.startDate.month() &&
              this.endDate.year() == this.startDate.year())
              ? (this.rightCalendar.month = this.startDate
                  .clone()
                  .date(2)
                  .add(1, "month"))
              : (this.rightCalendar.month = this.endDate.clone().date(2));
        } else
          this.leftCalendar.month.format("YYYY-MM") !=
            this.startDate.format("YYYY-MM") &&
            this.rightCalendar.month.format("YYYY-MM") !=
              this.startDate.format("YYYY-MM") &&
            ((this.leftCalendar.month = this.startDate.clone().date(2)),
            (this.rightCalendar.month = this.startDate
              .clone()
              .date(2)
              .add(1, "month")));
        this.maxDate &&
          this.linkedCalendars &&
          !this.singleDatePicker &&
          this.rightCalendar.month > this.maxDate &&
          ((this.rightCalendar.month = this.maxDate.clone().date(2)),
          (this.leftCalendar.month = this.maxDate
            .clone()
            .date(2)
            .subtract(1, "month")));
      },
      updateCalendars: function () {
        if (this.timePicker) {
          var t, e, a, i;
          if (this.endDate) {
            if (
              ((t = parseInt(
                this.container.find(".left .hourselect").val(),
                10
              )),
              (e = parseInt(
                this.container.find(".left .minuteselect").val(),
                10
              )),
              isNaN(e) &&
                (e = parseInt(
                  this.container.find(".left .minuteselect option:last").val(),
                  10
                )),
              (a = this.timePickerSeconds
                ? parseInt(this.container.find(".left .secondselect").val(), 10)
                : 0),
              !this.timePicker24Hour)
            )
              "PM" === (i = this.container.find(".left .ampmselect").val()) &&
                t < 12 &&
                (t += 12),
                "AM" === i && 12 === t && (t = 0);
          } else if (
            ((t = parseInt(
              this.container.find(".right .hourselect").val(),
              10
            )),
            (e = parseInt(
              this.container.find(".right .minuteselect").val(),
              10
            )),
            isNaN(e) &&
              (e = parseInt(
                this.container.find(".right .minuteselect option:last").val(),
                10
              )),
            (a = this.timePickerSeconds
              ? parseInt(this.container.find(".right .secondselect").val(), 10)
              : 0),
            !this.timePicker24Hour)
          )
            "PM" === (i = this.container.find(".right .ampmselect").val()) &&
              t < 12 &&
              (t += 12),
              "AM" === i && 12 === t && (t = 0);
          this.leftCalendar.month.hour(t).minute(e).second(a),
            this.rightCalendar.month.hour(t).minute(e).second(a);
        }
        this.renderCalendar("left"),
          this.renderCalendar("right"),
          this.container.find(".ranges li").removeClass("active"),
          null != this.endDate && this.calculateChosenLabel();
      },
      renderCalendar: function (a) {
        var i,
          s = (i =
            "left" == a ? this.leftCalendar : this.rightCalendar).month.month(),
          n = i.month.year(),
          r = i.month.hour(),
          o = i.month.minute(),
          h = i.month.second(),
          l = t([n, s]).daysInMonth(),
          c = t([n, s, 1]),
          d = t([n, s, l]),
          m = t(c).subtract(1, "month").month(),
          p = t(c).subtract(1, "month").year(),
          f = t([p, m]).daysInMonth(),
          u = c.day();
        ((i = []).firstDay = c), (i.lastDay = d);
        for (var D = 0; D < 6; D++) i[D] = [];
        var g = f - u + this.locale.firstDay + 1;
        g > f && (g -= 7), u == this.locale.firstDay && (g = f - 6);
        for (
          var y = t([p, m, g, 12, o, h]), k = ((D = 0), 0), b = 0;
          D < 42;
          D++, k++, y = t(y).add(24, "hour")
        )
          D > 0 && k % 7 == 0 && ((k = 0), b++),
            (i[b][k] = y.clone().hour(r).minute(o).second(h)),
            y.hour(12),
            this.minDate &&
              i[b][k].format("YYYY-MM-DD") ==
                this.minDate.format("YYYY-MM-DD") &&
              i[b][k].isBefore(this.minDate) &&
              "left" == a &&
              (i[b][k] = this.minDate.clone()),
            this.maxDate &&
              i[b][k].format("YYYY-MM-DD") ==
                this.maxDate.format("YYYY-MM-DD") &&
              i[b][k].isAfter(this.maxDate) &&
              "right" == a &&
              (i[b][k] = this.maxDate.clone());
        "left" == a
          ? (this.leftCalendar.calendar = i)
          : (this.rightCalendar.calendar = i);
        var v = "left" == a ? this.minDate : this.startDate,
          C = this.maxDate,
          Y =
            ("left" == a ? this.startDate : this.endDate,
            this.locale.direction,
            '<table class="table-condensed">');
        (Y += "<thead>"),
          (Y += "<tr>"),
          (this.showWeekNumbers || this.showISOWeekNumbers) &&
            (Y += "<th></th>"),
          (v && !v.isBefore(i.firstDay)) ||
          (this.linkedCalendars && "left" != a)
            ? (Y += "<th></th>")
            : (Y += '<th class="prev available"><span></span></th>');
        var w =
          this.locale.monthNames[i[1][1].month()] + i[1][1].format(" YYYY");
        if (this.showDropdowns) {
          for (
            var P = i[1][1].month(),
              x = i[1][1].year(),
              M = (C && C.year()) || this.maxYear,
              I = (v && v.year()) || this.minYear,
              S = x == I,
              B = x == M,
              A = '<select class="monthselect">',
              L = 0;
            L < 12;
            L++
          )
            (!S || (v && L >= v.month())) && (!B || (C && L <= C.month()))
              ? (A +=
                  "<option value='" +
                  L +
                  "'" +
                  (L === P ? " selected='selected'" : "") +
                  ">" +
                  this.locale.monthNames[L] +
                  "</option>")
              : (A +=
                  "<option value='" +
                  L +
                  "'" +
                  (L === P ? " selected='selected'" : "") +
                  " disabled='disabled'>" +
                  this.locale.monthNames[L] +
                  "</option>");
          A += "</select>";
          for (var N = '<select class="yearselect">', E = I; E <= M; E++)
            N +=
              '<option value="' +
              E +
              '"' +
              (E === x ? ' selected="selected"' : "") +
              ">" +
              E +
              "</option>";
          w = A + (N += "</select>");
        }
        if (
          ((Y += '<th colspan="5" class="month">' + w + "</th>"),
          (C && !C.isAfter(i.lastDay)) ||
          (this.linkedCalendars && "right" != a && !this.singleDatePicker)
            ? (Y += "<th></th>")
            : (Y += '<th class="next available"><span></span></th>'),
          (Y += "</tr>"),
          (Y += "<tr>"),
          (this.showWeekNumbers || this.showISOWeekNumbers) &&
            (Y += '<th class="week">' + this.locale.weekLabel + "</th>"),
          e.each(this.locale.daysOfWeek, function (t, e) {
            Y += "<th>" + e + "</th>";
          }),
          (Y += "</tr>"),
          (Y += "</thead>"),
          (Y += "<tbody>"),
          null == this.endDate && this.maxSpan)
        ) {
          var O = this.startDate.clone().add(this.maxSpan).endOf("day");
          (C && !O.isBefore(C)) || (C = O);
        }
        for (b = 0; b < 6; b++) {
          (Y += "<tr>"),
            this.showWeekNumbers
              ? (Y += '<td class="week">' + i[b][0].week() + "</td>")
              : this.showISOWeekNumbers &&
                (Y += '<td class="week">' + i[b][0].isoWeek() + "</td>");
          for (k = 0; k < 7; k++) {
            var W = [];
            i[b][k].isSame(new Date(), "day") && W.push("today"),
              i[b][k].isoWeekday() > 5 && W.push("weekend"),
              i[b][k].month() != i[1][1].month() && W.push("off", "ends"),
              this.minDate &&
                i[b][k].isBefore(this.minDate, "day") &&
                W.push("off", "disabled"),
              C && i[b][k].isAfter(C, "day") && W.push("off", "disabled"),
              this.isInvalidDate(i[b][k]) && W.push("off", "disabled"),
              i[b][k].format("YYYY-MM-DD") ==
                this.startDate.format("YYYY-MM-DD") &&
                W.push("active", "start-date"),
              null != this.endDate &&
                i[b][k].format("YYYY-MM-DD") ==
                  this.endDate.format("YYYY-MM-DD") &&
                W.push("active", "end-date"),
              null != this.endDate &&
                i[b][k] > this.startDate &&
                i[b][k] < this.endDate &&
                W.push("in-range");
            var H = this.isCustomDate(i[b][k]);
            !1 !== H &&
              ("string" == typeof H
                ? W.push(H)
                : Array.prototype.push.apply(W, H));
            var j = "",
              R = !1;
            for (D = 0; D < W.length; D++)
              (j += W[D] + " "), "disabled" == W[D] && (R = !0);
            R || (j += "available"),
              (Y +=
                '<td class="' +
                j.replace(/^\s+|\s+$/g, "") +
                '" data-title="r' +
                b +
                "c" +
                k +
                '">' +
                i[b][k].date() +
                "</td>");
          }
          Y += "</tr>";
        }
        (Y += "</tbody>"),
          (Y += "</table>"),
          this.container
            .find(".drp-calendar." + a + " .calendar-table")
            .html(Y);
      },
      renderTimePicker: function (t) {
        if ("right" != t || this.endDate) {
          var e,
            a,
            i,
            s = this.maxDate;
          if (
            (!this.maxSpan ||
              (this.maxDate &&
                !this.startDate
                  .clone()
                  .add(this.maxSpan)
                  .isBefore(this.maxDate)) ||
              (s = this.startDate.clone().add(this.maxSpan)),
            "left" == t)
          )
            (a = this.startDate.clone()), (i = this.minDate);
          else if ("right" == t) {
            (a = this.endDate.clone()), (i = this.startDate);
            var n = this.container.find(".drp-calendar.right .calendar-time");
            if (
              "" != n.html() &&
              (a.hour(
                isNaN(a.hour())
                  ? n.find(".hourselect option:selected").val()
                  : a.hour()
              ),
              a.minute(
                isNaN(a.minute())
                  ? n.find(".minuteselect option:selected").val()
                  : a.minute()
              ),
              a.second(
                isNaN(a.second())
                  ? n.find(".secondselect option:selected").val()
                  : a.second()
              ),
              !this.timePicker24Hour)
            ) {
              var r = n.find(".ampmselect option:selected").val();
              "PM" === r && a.hour() < 12 && a.hour(a.hour() + 12),
                "AM" === r && 12 === a.hour() && a.hour(0);
            }
            a.isBefore(this.startDate) && (a = this.startDate.clone()),
              s && a.isAfter(s) && (a = s.clone());
          }
          e = '<select class="hourselect">';
          for (
            var o = this.timePicker24Hour ? 0 : 1,
              h = this.timePicker24Hour ? 23 : 12,
              l = o;
            l <= h;
            l++
          ) {
            var c = l;
            this.timePicker24Hour ||
              (c = a.hour() >= 12 ? (12 == l ? 12 : l + 12) : 12 == l ? 0 : l);
            var d = a.clone().hour(c),
              m = !1;
            i && d.minute(59).isBefore(i) && (m = !0),
              s && d.minute(0).isAfter(s) && (m = !0),
              c != a.hour() || m
                ? (e += m
                    ? '<option value="' +
                      l +
                      '" disabled="disabled" class="disabled">' +
                      l +
                      "</option>"
                    : '<option value="' + l + '">' + l + "</option>")
                : (e +=
                    '<option value="' +
                    l +
                    '" selected="selected">' +
                    l +
                    "</option>");
          }
          (e += "</select> "), (e += ': <select class="minuteselect">');
          for (l = 0; l < 60; l += this.timePickerIncrement) {
            var p = l < 10 ? "0" + l : l;
            (d = a.clone().minute(l)), (m = !1);
            i && d.second(59).isBefore(i) && (m = !0),
              s && d.second(0).isAfter(s) && (m = !0),
              a.minute() != l || m
                ? (e += m
                    ? '<option value="' +
                      l +
                      '" disabled="disabled" class="disabled">' +
                      p +
                      "</option>"
                    : '<option value="' + l + '">' + p + "</option>")
                : (e +=
                    '<option value="' +
                    l +
                    '" selected="selected">' +
                    p +
                    "</option>");
          }
          if (((e += "</select> "), this.timePickerSeconds)) {
            e += ': <select class="secondselect">';
            for (l = 0; l < 60; l++) {
              (p = l < 10 ? "0" + l : l), (d = a.clone().second(l)), (m = !1);
              i && d.isBefore(i) && (m = !0),
                s && d.isAfter(s) && (m = !0),
                a.second() != l || m
                  ? (e += m
                      ? '<option value="' +
                        l +
                        '" disabled="disabled" class="disabled">' +
                        p +
                        "</option>"
                      : '<option value="' + l + '">' + p + "</option>")
                  : (e +=
                      '<option value="' +
                      l +
                      '" selected="selected">' +
                      p +
                      "</option>");
            }
            e += "</select> ";
          }
          if (!this.timePicker24Hour) {
            e += '<select class="ampmselect">';
            var f = "",
              u = "";
            i &&
              a.clone().hour(12).minute(0).second(0).isBefore(i) &&
              (f = ' disabled="disabled" class="disabled"'),
              s &&
                a.clone().hour(0).minute(0).second(0).isAfter(s) &&
                (u = ' disabled="disabled" class="disabled"'),
              a.hour() >= 12
                ? (e +=
                    '<option value="AM"' +
                    f +
                    '>AM</option><option value="PM" selected="selected"' +
                    u +
                    ">PM</option>")
                : (e +=
                    '<option value="AM" selected="selected"' +
                    f +
                    '>AM</option><option value="PM"' +
                    u +
                    ">PM</option>"),
              (e += "</select>");
          }
          this.container.find(".drp-calendar." + t + " .calendar-time").html(e);
        }
      },
      updateFormInputs: function () {
        this.singleDatePicker ||
        (this.endDate &&
          (this.startDate.isBefore(this.endDate) ||
            this.startDate.isSame(this.endDate)))
          ? this.container.find("button.applyBtn").prop("disabled", !1)
          : this.container.find("button.applyBtn").prop("disabled", !0);
      },
      move: function () {
        var t,
          a = { top: 0, left: 0 },
          i = this.drops,
          s = e(window).width();
        switch (
          (this.parentEl.is("body") ||
            ((a = {
              top: this.parentEl.offset().top - this.parentEl.scrollTop(),
              left: this.parentEl.offset().left - this.parentEl.scrollLeft(),
            }),
            (s = this.parentEl[0].clientWidth + this.parentEl.offset().left)),
          i)
        ) {
          case "auto":
            (t =
              this.element.offset().top + this.element.outerHeight() - a.top) +
              this.container.outerHeight() >=
              this.parentEl[0].scrollHeight &&
              ((t =
                this.element.offset().top -
                this.container.outerHeight() -
                a.top),
              (i = "up"));
            break;
          case "up":
            t =
              this.element.offset().top - this.container.outerHeight() - a.top;
            break;
          default:
            t = this.element.offset().top + this.element.outerHeight() - a.top;
        }
        this.container.css({ top: 0, left: 0, right: "auto" });
        var n = this.container.outerWidth();
        if (
          (this.container.toggleClass("drop-up", "up" == i),
          "left" == this.opens)
        ) {
          var r = s - this.element.offset().left - this.element.outerWidth();
          n + r > e(window).width()
            ? this.container.css({ top: t, right: "auto", left: 9 })
            : this.container.css({ top: t, right: r, left: "auto" });
        } else if ("center" == this.opens) {
          (o =
            this.element.offset().left -
            a.left +
            this.element.outerWidth() / 2 -
            n / 2) < 0
            ? this.container.css({ top: t, right: "auto", left: 9 })
            : o + n > e(window).width()
            ? this.container.css({ top: t, left: "auto", right: 0 })
            : this.container.css({ top: t, left: o, right: "auto" });
        } else {
          var o;
          (o = this.element.offset().left - a.left) + n > e(window).width()
            ? this.container.css({ top: t, left: "auto", right: 0 })
            : this.container.css({ top: t, left: o, right: "auto" });
        }
      },
      show: function (t) {
        this.isShowing ||
          ((this._outsideClickProxy = e.proxy(function (t) {
            this.outsideClick(t);
          }, this)),
          e(document)
            .on("mousedown.daterangepicker", this._outsideClickProxy)
            .on("touchend.daterangepicker", this._outsideClickProxy)
            .on(
              "click.daterangepicker",
              "[data-toggle=dropdown]",
              this._outsideClickProxy
            )
            .on("focusin.daterangepicker", this._outsideClickProxy),
          e(window).on(
            "resize.daterangepicker",
            e.proxy(function (t) {
              this.move(t);
            }, this)
          ),
          (this.oldStartDate = this.startDate.clone()),
          (this.oldEndDate = this.endDate.clone()),
          (this.previousRightTime = this.endDate.clone()),
          this.updateView(),
          this.container.show(),
          this.move(),
          this.element.trigger("show.daterangepicker", this),
          (this.isShowing = !0));
      },
      hide: function (t) {
        this.isShowing &&
          (this.endDate ||
            ((this.startDate = this.oldStartDate.clone()),
            (this.endDate = this.oldEndDate.clone())),
          (this.startDate.isSame(this.oldStartDate) &&
            this.endDate.isSame(this.oldEndDate)) ||
            this.callback(
              this.startDate.clone(),
              this.endDate.clone(),
              this.chosenLabel
            ),
          this.updateElement(),
          e(document).off(".daterangepicker"),
          e(window).off(".daterangepicker"),
          this.container.hide(),
          this.element.trigger("hide.daterangepicker", this),
          (this.isShowing = !1));
      },
      toggle: function (t) {
        this.isShowing ? this.hide() : this.show();
      },
      outsideClick: function (t) {
        var a = e(t.target);
        "focusin" == t.type ||
          a.closest(this.element).length ||
          a.closest(this.container).length ||
          a.closest(".calendar-table").length ||
          (this.hide(),
          this.element.trigger("outsideClick.daterangepicker", this));
      },
      showCalendars: function () {
        this.container.addClass("show-calendar"),
          this.move(),
          this.element.trigger("showCalendar.daterangepicker", this);
      },
      hideCalendars: function () {
        this.container.removeClass("show-calendar"),
          this.element.trigger("hideCalendar.daterangepicker", this);
      },
      clickRange: function (t) {
        var e = t.target.getAttribute("data-range-key");
        if (((this.chosenLabel = e), e == this.locale.customRangeLabel))
          this.showCalendars();
        else {
          var a = this.ranges[e];
          (this.startDate = a[0]),
            (this.endDate = a[1]),
            this.timePicker ||
              (this.startDate.startOf("day"), this.endDate.endOf("day")),
            this.alwaysShowCalendars || this.hideCalendars(),
            this.clickApply();
        }
      },
      clickPrev: function (t) {
        e(t.target).parents(".drp-calendar").hasClass("left")
          ? (this.leftCalendar.month.subtract(1, "month"),
            this.linkedCalendars &&
              this.rightCalendar.month.subtract(1, "month"))
          : this.rightCalendar.month.subtract(1, "month"),
          this.updateCalendars();
      },
      clickNext: function (t) {
        e(t.target).parents(".drp-calendar").hasClass("left")
          ? this.leftCalendar.month.add(1, "month")
          : (this.rightCalendar.month.add(1, "month"),
            this.linkedCalendars && this.leftCalendar.month.add(1, "month")),
          this.updateCalendars();
      },
      hoverDate: function (t) {
        if (e(t.target).hasClass("available")) {
          var a = e(t.target).attr("data-title"),
            i = a.substr(1, 1),
            s = a.substr(3, 1),
            n = e(t.target).parents(".drp-calendar").hasClass("left")
              ? this.leftCalendar.calendar[i][s]
              : this.rightCalendar.calendar[i][s],
            r = this.leftCalendar,
            o = this.rightCalendar,
            h = this.startDate;
          this.endDate ||
            this.container.find(".drp-calendar tbody td").each(function (t, a) {
              if (!e(a).hasClass("week")) {
                var i = e(a).attr("data-title"),
                  s = i.substr(1, 1),
                  l = i.substr(3, 1),
                  c = e(a).parents(".drp-calendar").hasClass("left")
                    ? r.calendar[s][l]
                    : o.calendar[s][l];
                (c.isAfter(h) && c.isBefore(n)) || c.isSame(n, "day")
                  ? e(a).addClass("in-range")
                  : e(a).removeClass("in-range");
              }
            });
        }
      },
      clickDate: function (t) {
        if (e(t.target).hasClass("available")) {
          var a = e(t.target).attr("data-title"),
            i = a.substr(1, 1),
            s = a.substr(3, 1),
            n = e(t.target).parents(".drp-calendar").hasClass("left")
              ? this.leftCalendar.calendar[i][s]
              : this.rightCalendar.calendar[i][s];
          if (this.endDate || n.isBefore(this.startDate, "day")) {
            if (this.timePicker) {
              var r = parseInt(
                this.container.find(".left .hourselect").val(),
                10
              );
              if (!this.timePicker24Hour)
                "PM" === (l = this.container.find(".left .ampmselect").val()) &&
                  r < 12 &&
                  (r += 12),
                  "AM" === l && 12 === r && (r = 0);
              var o = parseInt(
                this.container.find(".left .minuteselect").val(),
                10
              );
              isNaN(o) &&
                (o = parseInt(
                  this.container.find(".left .minuteselect option:last").val(),
                  10
                ));
              var h = this.timePickerSeconds
                ? parseInt(this.container.find(".left .secondselect").val(), 10)
                : 0;
              n = n.clone().hour(r).minute(o).second(h);
            }
            (this.endDate = null), this.setStartDate(n.clone());
          } else if (!this.endDate && n.isBefore(this.startDate))
            this.setEndDate(this.startDate.clone());
          else {
            if (this.timePicker) {
              var l;
              r = parseInt(this.container.find(".right .hourselect").val(), 10);
              if (!this.timePicker24Hour)
                "PM" ===
                  (l = this.container.find(".right .ampmselect").val()) &&
                  r < 12 &&
                  (r += 12),
                  "AM" === l && 12 === r && (r = 0);
              o = parseInt(
                this.container.find(".right .minuteselect").val(),
                10
              );
              isNaN(o) &&
                (o = parseInt(
                  this.container.find(".right .minuteselect option:last").val(),
                  10
                ));
              h = this.timePickerSeconds
                ? parseInt(
                    this.container.find(".right .secondselect").val(),
                    10
                  )
                : 0;
              n = n.clone().hour(r).minute(o).second(h);
            }
            this.setEndDate(n.clone()),
              this.autoApply &&
                (this.calculateChosenLabel(), this.clickApply());
          }
          this.singleDatePicker &&
            (this.setEndDate(this.startDate),
            !this.timePicker && this.autoApply && this.clickApply()),
            this.updateView(),
            t.stopPropagation();
        }
      },
      calculateChosenLabel: function () {
        var t = !0,
          e = 0;
        for (var a in this.ranges) {
          if (this.timePicker) {
            var i = this.timePickerSeconds
              ? "YYYY-MM-DD HH:mm:ss"
              : "YYYY-MM-DD HH:mm";
            if (
              this.startDate.format(i) == this.ranges[a][0].format(i) &&
              this.endDate.format(i) == this.ranges[a][1].format(i)
            ) {
              (t = !1),
                (this.chosenLabel = this.container
                  .find(".ranges li:eq(" + e + ")")
                  .addClass("active")
                  .attr("data-range-key"));
              break;
            }
          } else if (
            this.startDate.format("YYYY-MM-DD") ==
              this.ranges[a][0].format("YYYY-MM-DD") &&
            this.endDate.format("YYYY-MM-DD") ==
              this.ranges[a][1].format("YYYY-MM-DD")
          ) {
            (t = !1),
              (this.chosenLabel = this.container
                .find(".ranges li:eq(" + e + ")")
                .addClass("active")
                .attr("data-range-key"));
            break;
          }
          e++;
        }
        t &&
          (this.showCustomRangeLabel
            ? (this.chosenLabel = this.container
                .find(".ranges li:last")
                .addClass("active")
                .attr("data-range-key"))
            : (this.chosenLabel = null),
          this.showCalendars());
      },
      clickApply: function (t) {
        this.hide(), this.element.trigger("apply.daterangepicker", this);
      },
      clickCancel: function (t) {
        (this.startDate = this.oldStartDate),
          (this.endDate = this.oldEndDate),
          this.hide(),
          this.element.trigger("cancel.daterangepicker", this);
      },
      monthOrYearChanged: function (t) {
        var a = e(t.target).closest(".drp-calendar").hasClass("left"),
          i = a ? "left" : "right",
          s = this.container.find(".drp-calendar." + i),
          n = parseInt(s.find(".monthselect").val(), 10),
          r = s.find(".yearselect").val();
        a ||
          ((r < this.startDate.year() ||
            (r == this.startDate.year() && n < this.startDate.month())) &&
            ((n = this.startDate.month()), (r = this.startDate.year()))),
          this.minDate &&
            (r < this.minDate.year() ||
              (r == this.minDate.year() && n < this.minDate.month())) &&
            ((n = this.minDate.month()), (r = this.minDate.year())),
          this.maxDate &&
            (r > this.maxDate.year() ||
              (r == this.maxDate.year() && n > this.maxDate.month())) &&
            ((n = this.maxDate.month()), (r = this.maxDate.year())),
          a
            ? (this.leftCalendar.month.month(n).year(r),
              this.linkedCalendars &&
                (this.rightCalendar.month = this.leftCalendar.month
                  .clone()
                  .add(1, "month")))
            : (this.rightCalendar.month.month(n).year(r),
              this.linkedCalendars &&
                (this.leftCalendar.month = this.rightCalendar.month
                  .clone()
                  .subtract(1, "month"))),
          this.updateCalendars();
      },
      timeChanged: function (t) {
        var a = e(t.target).closest(".drp-calendar"),
          i = a.hasClass("left"),
          s = parseInt(a.find(".hourselect").val(), 10),
          n = parseInt(a.find(".minuteselect").val(), 10);
        isNaN(n) &&
          (n = parseInt(a.find(".minuteselect option:last").val(), 10));
        var r = this.timePickerSeconds
          ? parseInt(a.find(".secondselect").val(), 10)
          : 0;
        if (!this.timePicker24Hour) {
          var o = a.find(".ampmselect").val();
          "PM" === o && s < 12 && (s += 12), "AM" === o && 12 === s && (s = 0);
        }
        if (i) {
          var h = this.startDate.clone();
          h.hour(s),
            h.minute(n),
            h.second(r),
            this.setStartDate(h),
            this.singleDatePicker
              ? (this.endDate = this.startDate.clone())
              : this.endDate &&
                this.endDate.format("YYYY-MM-DD") == h.format("YYYY-MM-DD") &&
                this.endDate.isBefore(h) &&
                this.setEndDate(h.clone());
        } else if (this.endDate) {
          var l = this.endDate.clone();
          l.hour(s), l.minute(n), l.second(r), this.setEndDate(l);
        }
        this.updateCalendars(),
          this.updateFormInputs(),
          this.renderTimePicker("left"),
          this.renderTimePicker("right");
      },
      elementChanged: function () {
        if (this.element.is("input") && this.element.val().length) {
          var e = this.element.val().split(this.locale.separator),
            a = null,
            i = null;
          2 === e.length &&
            ((a = t(e[0], this.locale.format)),
            (i = t(e[1], this.locale.format))),
            (this.singleDatePicker || null === a || null === i) &&
              (i = a = t(this.element.val(), this.locale.format)),
            a.isValid() &&
              i.isValid() &&
              (this.setStartDate(a), this.setEndDate(i), this.updateView());
        }
      },
      keydown: function (t) {
        (9 !== t.keyCode && 13 !== t.keyCode) || this.hide(),
          27 === t.keyCode &&
            (t.preventDefault(), t.stopPropagation(), this.hide());
      },
      updateElement: function () {
        if (this.element.is("input") && this.autoUpdateInput) {
          var t = this.startDate.format(this.locale.format);
          this.singleDatePicker ||
            (t +=
              this.locale.separator + this.endDate.format(this.locale.format)),
            t !== this.element.val() && this.element.val(t).trigger("change");
        }
      },
      remove: function () {
        this.container.remove(),
          this.element.off(".daterangepicker"),
          this.element.removeData();
      },
    }),
    (e.fn.daterangepicker = function (t, i) {
      var s = e.extend(!0, {}, e.fn.daterangepicker.defaultOptions, t);
      return (
        this.each(function () {
          var t = e(this);
          t.data("daterangepicker") && t.data("daterangepicker").remove(),
            t.data("daterangepicker", new a(t, s, i));
        }),
        this
      );
    }),
    a
  );
});

!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.Scrollbar = e())
    : (t.Scrollbar = e());
})(this, function () {
  return (function (t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 67))
    );
  })([
    function (t, e, n) {
      (function (e) {
        var n = function (t) {
          return t && t.Math == Math && t;
        };
        t.exports =
          n("object" == typeof globalThis && globalThis) ||
          n("object" == typeof window && window) ||
          n("object" == typeof self && self) ||
          n("object" == typeof e && e) ||
          Function("return this")();
      }.call(this, n(43)));
    },
    function (t, e, n) {
      var r = n(0),
        o = n(51),
        i = n(3),
        u = n(29),
        c = n(56),
        a = n(76),
        s = o("wks"),
        f = r.Symbol,
        l = a ? f : (f && f.withoutSetter) || u;
      t.exports = function (t) {
        return (
          i(s, t) || (c && i(f, t) ? (s[t] = f[t]) : (s[t] = l("Symbol." + t))),
          s[t]
        );
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      };
    },
    function (t, e) {
      var n = {}.hasOwnProperty;
      t.exports = function (t, e) {
        return n.call(t, e);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    },
    function (t, e, n) {
      var r = n(6),
        o = n(46),
        i = n(7),
        u = n(25),
        c = Object.defineProperty;
      e.f = r
        ? c
        : function (t, e, n) {
            if ((i(t), (e = u(e, !0)), i(n), o))
              try {
                return c(t, e, n);
              } catch (t) {}
            if ("get" in n || "set" in n)
              throw TypeError("Accessors not supported");
            return "value" in n && (t[e] = n.value), t;
          };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports = !r(function () {
        return (
          7 !=
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1]
        );
      });
    },
    function (t, e, n) {
      var r = n(2);
      t.exports = function (t) {
        if (!r(t)) throw TypeError(String(t) + " is not an object");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(6),
        o = n(5),
        i = n(14);
      t.exports = r
        ? function (t, e, n) {
            return o.f(t, e, i(1, n));
          }
        : function (t, e, n) {
            return (t[e] = n), t;
          };
    },
    function (t, e, n) {
      var r,
        o,
        i,
        u = n(50),
        c = n(0),
        a = n(2),
        s = n(8),
        f = n(3),
        l = n(27),
        p = n(16),
        h = c.WeakMap;
      if (u) {
        var d = new h(),
          v = d.get,
          y = d.has,
          m = d.set;
        (r = function (t, e) {
          return m.call(d, t, e), e;
        }),
          (o = function (t) {
            return v.call(d, t) || {};
          }),
          (i = function (t) {
            return y.call(d, t);
          });
      } else {
        var g = l("state");
        (p[g] = !0),
          (r = function (t, e) {
            return s(t, g, e), e;
          }),
          (o = function (t) {
            return f(t, g) ? t[g] : {};
          }),
          (i = function (t) {
            return f(t, g);
          });
      }
      t.exports = {
        set: r,
        get: o,
        has: i,
        enforce: function (t) {
          return i(t) ? o(t) : r(t, {});
        },
        getterFor: function (t) {
          return function (e) {
            var n;
            if (!a(e) || (n = o(e)).type !== t)
              throw TypeError("Incompatible receiver, " + t + " required");
            return n;
          };
        },
      };
    },
    function (t, e, n) {
      var r = n(0);
      t.exports = r;
    },
    function (t, e, n) {
      var r = n(0),
        o = n(8),
        i = n(3),
        u = n(26),
        c = n(48),
        a = n(9),
        s = a.get,
        f = a.enforce,
        l = String(String).split("String");
      (t.exports = function (t, e, n, c) {
        var a = !!c && !!c.unsafe,
          s = !!c && !!c.enumerable,
          p = !!c && !!c.noTargetGet;
        "function" == typeof n &&
          ("string" != typeof e || i(n, "name") || o(n, "name", e),
          (f(n).source = l.join("string" == typeof e ? e : ""))),
          t !== r
            ? (a ? !p && t[e] && (s = !0) : delete t[e],
              s ? (t[e] = n) : o(t, e, n))
            : s
            ? (t[e] = n)
            : u(e, n);
      })(Function.prototype, "toString", function () {
        return ("function" == typeof this && s(this).source) || c(this);
      });
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e, n) {
      var r = n(0),
        o = n(44).f,
        i = n(8),
        u = n(11),
        c = n(26),
        a = n(70),
        s = n(54);
      t.exports = function (t, e) {
        var n,
          f,
          l,
          p,
          h,
          d = t.target,
          v = t.global,
          y = t.stat;
        if ((n = v ? r : y ? r[d] || c(d, {}) : (r[d] || {}).prototype))
          for (f in e) {
            if (
              ((p = e[f]),
              (l = t.noTargetGet ? (h = o(n, f)) && h.value : n[f]),
              !s(v ? f : d + (y ? "." : "#") + f, t.forced) && void 0 !== l)
            ) {
              if (typeof p == typeof l) continue;
              a(p, l);
            }
            (t.sham || (l && l.sham)) && i(p, "sham", !0), u(n, f, p, t);
          }
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    function (t, e, n) {
      var r = n(22),
        o = n(24);
      t.exports = function (t) {
        return r(o(t));
      };
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e, n) {
      var r = n(31),
        o = Math.min;
      t.exports = function (t) {
        return t > 0 ? o(r(t), 9007199254740991) : 0;
      };
    },
    function (t, e, n) {
      var r = n(16),
        o = n(2),
        i = n(3),
        u = n(5).f,
        c = n(29),
        a = n(75),
        s = c("meta"),
        f = 0,
        l =
          Object.isExtensible ||
          function () {
            return !0;
          },
        p = function (t) {
          u(t, s, { value: { objectID: "O" + ++f, weakData: {} } });
        },
        h = (t.exports = {
          REQUIRED: !1,
          fastKey: function (t, e) {
            if (!o(t))
              return "symbol" == typeof t
                ? t
                : ("string" == typeof t ? "S" : "P") + t;
            if (!i(t, s)) {
              if (!l(t)) return "F";
              if (!e) return "E";
              p(t);
            }
            return t[s].objectID;
          },
          getWeakData: function (t, e) {
            if (!i(t, s)) {
              if (!l(t)) return !0;
              if (!e) return !1;
              p(t);
            }
            return t[s].weakData;
          },
          onFreeze: function (t) {
            return a && h.REQUIRED && l(t) && !i(t, s) && p(t), t;
          },
        });
      r[s] = !0;
    },
    function (t, e, n) {
      var r = n(77);
      t.exports = function (t, e, n) {
        if ((r(t), void 0 === e)) return t;
        switch (n) {
          case 0:
            return function () {
              return t.call(e);
            };
          case 1:
            return function (n) {
              return t.call(e, n);
            };
          case 2:
            return function (n, r) {
              return t.call(e, n, r);
            };
          case 3:
            return function (n, r, o) {
              return t.call(e, n, r, o);
            };
        }
        return function () {
          return t.apply(e, arguments);
        };
      };
    },
    function (t, e, n) {
      var r = n(24);
      t.exports = function (t) {
        return Object(r(t));
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(13),
        o = n(0),
        i = n(54),
        u = n(11),
        c = n(18),
        a = n(33),
        s = n(35),
        f = n(2),
        l = n(4),
        p = n(60),
        h = n(36),
        d = n(78);
      t.exports = function (t, e, n) {
        var v = -1 !== t.indexOf("Map"),
          y = -1 !== t.indexOf("Weak"),
          m = v ? "set" : "add",
          g = o[t],
          b = g && g.prototype,
          x = g,
          w = {},
          S = function (t) {
            var e = b[t];
            u(
              b,
              t,
              "add" == t
                ? function (t) {
                    return e.call(this, 0 === t ? 0 : t), this;
                  }
                : "delete" == t
                ? function (t) {
                    return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : "get" == t
                ? function (t) {
                    return y && !f(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
                  }
                : "has" == t
                ? function (t) {
                    return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : function (t, n) {
                    return e.call(this, 0 === t ? 0 : t, n), this;
                  }
            );
          };
        if (
          i(
            t,
            "function" != typeof g ||
              !(
                y ||
                (b.forEach &&
                  !l(function () {
                    new g().entries().next();
                  }))
              )
          )
        )
          (x = n.getConstructor(e, t, v, m)), (c.REQUIRED = !0);
        else if (i(t, !0)) {
          var O = new x(),
            _ = O[m](y ? {} : -0, 1) != O,
            E = l(function () {
              O.has(1);
            }),
            T = p(function (t) {
              new g(t);
            }),
            A =
              !y &&
              l(function () {
                for (var t = new g(), e = 5; e--; ) t[m](e, e);
                return !t.has(-0);
              });
          T ||
            (((x = e(function (e, n) {
              s(e, x, t);
              var r = d(new g(), e, x);
              return null != n && a(n, r[m], r, v), r;
            })).prototype = b),
            (b.constructor = x)),
            (E || A) && (S("delete"), S("has"), v && S("get")),
            (A || _) && S(m),
            y && b.clear && delete b.clear;
        }
        return (
          (w[t] = x),
          r({ global: !0, forced: x != g }, w),
          h(x, t),
          y || n.setStrong(x, t, v),
          x
        );
      };
    },
    function (t, e, n) {
      var r = n(4),
        o = n(23),
        i = "".split;
      t.exports = r(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (t) {
            return "String" == o(t) ? i.call(t, "") : Object(t);
          }
        : Object;
    },
    function (t, e) {
      var n = {}.toString;
      t.exports = function (t) {
        return n.call(t).slice(8, -1);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t;
      };
    },
    function (t, e, n) {
      var r = n(2);
      t.exports = function (t, e) {
        if (!r(t)) return t;
        var n, o;
        if (e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
          return o;
        if ("function" == typeof (n = t.valueOf) && !r((o = n.call(t))))
          return o;
        if (!e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (t, e, n) {
      var r = n(0),
        o = n(8);
      t.exports = function (t, e) {
        try {
          o(r, t, e);
        } catch (n) {
          r[t] = e;
        }
        return e;
      };
    },
    function (t, e, n) {
      var r = n(51),
        o = n(29),
        i = r("keys");
      t.exports = function (t) {
        return i[t] || (i[t] = o(t));
      };
    },
    function (t, e) {
      t.exports = !1;
    },
    function (t, e) {
      var n = 0,
        r = Math.random();
      t.exports = function (t) {
        return (
          "Symbol(" +
          String(void 0 === t ? "" : t) +
          ")_" +
          (++n + r).toString(36)
        );
      };
    },
    function (t, e, n) {
      var r = n(10),
        o = n(0),
        i = function (t) {
          return "function" == typeof t ? t : void 0;
        };
      t.exports = function (t, e) {
        return arguments.length < 2
          ? i(r[t]) || i(o[t])
          : (r[t] && r[t][e]) || (o[t] && o[t][e]);
      };
    },
    function (t, e) {
      var n = Math.ceil,
        r = Math.floor;
      t.exports = function (t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? r : n)(t);
      };
    },
    function (t, e) {
      t.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ];
    },
    function (t, e, n) {
      var r = n(7),
        o = n(55),
        i = n(17),
        u = n(19),
        c = n(57),
        a = n(59),
        s = function (t, e) {
          (this.stopped = t), (this.result = e);
        };
      (t.exports = function (t, e, n, f, l) {
        var p,
          h,
          d,
          v,
          y,
          m,
          g,
          b = u(e, n, f ? 2 : 1);
        if (l) p = t;
        else {
          if ("function" != typeof (h = c(t)))
            throw TypeError("Target is not iterable");
          if (o(h)) {
            for (d = 0, v = i(t.length); v > d; d++)
              if (
                (y = f ? b(r((g = t[d]))[0], g[1]) : b(t[d])) &&
                y instanceof s
              )
                return y;
            return new s(!1);
          }
          p = h.call(t);
        }
        for (m = p.next; !(g = m.call(p)).done; )
          if (
            "object" == typeof (y = a(p, b, g.value, f)) &&
            y &&
            y instanceof s
          )
            return y;
        return new s(!1);
      }).stop = function (t) {
        return new s(!0, t);
      };
    },
    function (t, e, n) {
      var r = {};
      (r[n(1)("toStringTag")] = "z"), (t.exports = "[object z]" === String(r));
    },
    function (t, e) {
      t.exports = function (t, e, n) {
        if (!(t instanceof e))
          throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(5).f,
        o = n(3),
        i = n(1)("toStringTag");
      t.exports = function (t, e, n) {
        t &&
          !o((t = n ? t : t.prototype), i) &&
          r(t, i, { configurable: !0, value: e });
      };
    },
    function (t, e, n) {
      var r,
        o = n(7),
        i = n(80),
        u = n(32),
        c = n(16),
        a = n(81),
        s = n(47),
        f = n(27)("IE_PROTO"),
        l = function () {},
        p = function (t) {
          return "<script>" + t + "</script>";
        },
        h = function () {
          try {
            r = document.domain && new ActiveXObject("htmlfile");
          } catch (t) {}
          h = r
            ? (function (t) {
                t.write(p("")), t.close();
                var e = t.parentWindow.Object;
                return (t = null), e;
              })(r)
            : (function () {
                var t,
                  e = s("iframe");
                return (
                  (e.style.display = "none"),
                  a.appendChild(e),
                  (e.src = String("javascript:")),
                  (t = e.contentWindow.document).open(),
                  t.write(p("document.F=Object")),
                  t.close(),
                  t.F
                );
              })();
          for (var t = u.length; t--; ) delete h.prototype[u[t]];
          return h();
        };
      (c[f] = !0),
        (t.exports =
          Object.create ||
          function (t, e) {
            var n;
            return (
              null !== t
                ? ((l.prototype = o(t)),
                  (n = new l()),
                  (l.prototype = null),
                  (n[f] = t))
                : (n = h()),
              void 0 === e ? n : i(n, e)
            );
          });
    },
    function (t, e, n) {
      var r = n(11);
      t.exports = function (t, e, n) {
        for (var o in e) r(t, o, e[o], n);
        return t;
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(13),
        o = n(82),
        i = n(65),
        u = n(61),
        c = n(36),
        a = n(8),
        s = n(11),
        f = n(1),
        l = n(28),
        p = n(12),
        h = n(64),
        d = h.IteratorPrototype,
        v = h.BUGGY_SAFARI_ITERATORS,
        y = f("iterator"),
        m = function () {
          return this;
        };
      t.exports = function (t, e, n, f, h, g, b) {
        o(n, e, f);
        var x,
          w,
          S,
          O = function (t) {
            if (t === h && j) return j;
            if (!v && t in T) return T[t];
            switch (t) {
              case "keys":
              case "values":
              case "entries":
                return function () {
                  return new n(this, t);
                };
            }
            return function () {
              return new n(this);
            };
          },
          _ = e + " Iterator",
          E = !1,
          T = t.prototype,
          A = T[y] || T["@@iterator"] || (h && T[h]),
          j = (!v && A) || O(h),
          P = ("Array" == e && T.entries) || A;
        if (
          (P &&
            ((x = i(P.call(new t()))),
            d !== Object.prototype &&
              x.next &&
              (l ||
                i(x) === d ||
                (u ? u(x, d) : "function" != typeof x[y] && a(x, y, m)),
              c(x, _, !0, !0),
              l && (p[_] = m))),
          "values" == h &&
            A &&
            "values" !== A.name &&
            ((E = !0),
            (j = function () {
              return A.call(this);
            })),
          (l && !b) || T[y] === j || a(T, y, j),
          (p[e] = j),
          h)
        )
          if (
            ((w = {
              values: O("values"),
              keys: g ? j : O("keys"),
              entries: O("entries"),
            }),
            b)
          )
            for (S in w) (!v && !E && S in T) || s(T, S, w[S]);
          else r({ target: e, proto: !0, forced: v || E }, w);
        return w;
      };
    },
    function (t, e, n) {
      var r = n(34),
        o = n(11),
        i = n(85);
      r || o(Object.prototype, "toString", i, { unsafe: !0 });
    },
    function (t, e, n) {
      "use strict";
      var r = n(86).charAt,
        o = n(9),
        i = n(39),
        u = o.set,
        c = o.getterFor("String Iterator");
      i(
        String,
        "String",
        function (t) {
          u(this, { type: "String Iterator", string: String(t), index: 0 });
        },
        function () {
          var t,
            e = c(this),
            n = e.string,
            o = e.index;
          return o >= n.length
            ? { value: void 0, done: !0 }
            : ((t = r(n, o)), (e.index += t.length), { value: t, done: !1 });
        }
      );
    },
    function (t, e, n) {
      var r = n(0),
        o = n(87),
        i = n(88),
        u = n(8),
        c = n(1),
        a = c("iterator"),
        s = c("toStringTag"),
        f = i.values;
      for (var l in o) {
        var p = r[l],
          h = p && p.prototype;
        if (h) {
          if (h[a] !== f)
            try {
              u(h, a, f);
            } catch (t) {
              h[a] = f;
            }
          if ((h[s] || u(h, s, l), o[l]))
            for (var d in i)
              if (h[d] !== i[d])
                try {
                  u(h, d, i[d]);
                } catch (t) {
                  h[d] = i[d];
                }
        }
      }
    },
    function (t, e) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (n = window);
      }
      t.exports = n;
    },
    function (t, e, n) {
      var r = n(6),
        o = n(45),
        i = n(14),
        u = n(15),
        c = n(25),
        a = n(3),
        s = n(46),
        f = Object.getOwnPropertyDescriptor;
      e.f = r
        ? f
        : function (t, e) {
            if (((t = u(t)), (e = c(e, !0)), s))
              try {
                return f(t, e);
              } catch (t) {}
            if (a(t, e)) return i(!o.f.call(t, e), t[e]);
          };
    },
    function (t, e, n) {
      "use strict";
      var r = {}.propertyIsEnumerable,
        o = Object.getOwnPropertyDescriptor,
        i = o && !r.call({ 1: 2 }, 1);
      e.f = i
        ? function (t) {
            var e = o(this, t);
            return !!e && e.enumerable;
          }
        : r;
    },
    function (t, e, n) {
      var r = n(6),
        o = n(4),
        i = n(47);
      t.exports =
        !r &&
        !o(function () {
          return (
            7 !=
            Object.defineProperty(i("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (t, e, n) {
      var r = n(0),
        o = n(2),
        i = r.document,
        u = o(i) && o(i.createElement);
      t.exports = function (t) {
        return u ? i.createElement(t) : {};
      };
    },
    function (t, e, n) {
      var r = n(49),
        o = Function.toString;
      "function" != typeof r.inspectSource &&
        (r.inspectSource = function (t) {
          return o.call(t);
        }),
        (t.exports = r.inspectSource);
    },
    function (t, e, n) {
      var r = n(0),
        o = n(26),
        i = r["__core-js_shared__"] || o("__core-js_shared__", {});
      t.exports = i;
    },
    function (t, e, n) {
      var r = n(0),
        o = n(48),
        i = r.WeakMap;
      t.exports = "function" == typeof i && /native code/.test(o(i));
    },
    function (t, e, n) {
      var r = n(28),
        o = n(49);
      (t.exports = function (t, e) {
        return o[t] || (o[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: "3.6.4",
        mode: r ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)",
      });
    },
    function (t, e, n) {
      var r = n(3),
        o = n(15),
        i = n(73).indexOf,
        u = n(16);
      t.exports = function (t, e) {
        var n,
          c = o(t),
          a = 0,
          s = [];
        for (n in c) !r(u, n) && r(c, n) && s.push(n);
        for (; e.length > a; ) r(c, (n = e[a++])) && (~i(s, n) || s.push(n));
        return s;
      };
    },
    function (t, e) {
      e.f = Object.getOwnPropertySymbols;
    },
    function (t, e, n) {
      var r = n(4),
        o = /#|\.prototype\./,
        i = function (t, e) {
          var n = c[u(t)];
          return n == s || (n != a && ("function" == typeof e ? r(e) : !!e));
        },
        u = (i.normalize = function (t) {
          return String(t).replace(o, ".").toLowerCase();
        }),
        c = (i.data = {}),
        a = (i.NATIVE = "N"),
        s = (i.POLYFILL = "P");
      t.exports = i;
    },
    function (t, e, n) {
      var r = n(1),
        o = n(12),
        i = r("iterator"),
        u = Array.prototype;
      t.exports = function (t) {
        return void 0 !== t && (o.Array === t || u[i] === t);
      };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports =
        !!Object.getOwnPropertySymbols &&
        !r(function () {
          return !String(Symbol());
        });
    },
    function (t, e, n) {
      var r = n(58),
        o = n(12),
        i = n(1)("iterator");
      t.exports = function (t) {
        if (null != t) return t[i] || t["@@iterator"] || o[r(t)];
      };
    },
    function (t, e, n) {
      var r = n(34),
        o = n(23),
        i = n(1)("toStringTag"),
        u =
          "Arguments" ==
          o(
            (function () {
              return arguments;
            })()
          );
      t.exports = r
        ? o
        : function (t) {
            var e, n, r;
            return void 0 === t
              ? "Undefined"
              : null === t
              ? "Null"
              : "string" ==
                typeof (n = (function (t, e) {
                  try {
                    return t[e];
                  } catch (t) {}
                })((e = Object(t)), i))
              ? n
              : u
              ? o(e)
              : "Object" == (r = o(e)) && "function" == typeof e.callee
              ? "Arguments"
              : r;
          };
    },
    function (t, e, n) {
      var r = n(7);
      t.exports = function (t, e, n, o) {
        try {
          return o ? e(r(n)[0], n[1]) : e(n);
        } catch (e) {
          var i = t.return;
          throw (void 0 !== i && r(i.call(t)), e);
        }
      };
    },
    function (t, e, n) {
      var r = n(1)("iterator"),
        o = !1;
      try {
        var i = 0,
          u = {
            next: function () {
              return { done: !!i++ };
            },
            return: function () {
              o = !0;
            },
          };
        (u[r] = function () {
          return this;
        }),
          Array.from(u, function () {
            throw 2;
          });
      } catch (t) {}
      t.exports = function (t, e) {
        if (!e && !o) return !1;
        var n = !1;
        try {
          var i = {};
          (i[r] = function () {
            return {
              next: function () {
                return { done: (n = !0) };
              },
            };
          }),
            t(i);
        } catch (t) {}
        return n;
      };
    },
    function (t, e, n) {
      var r = n(7),
        o = n(79);
      t.exports =
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function () {
              var t,
                e = !1,
                n = {};
              try {
                (t = Object.getOwnPropertyDescriptor(
                  Object.prototype,
                  "__proto__"
                ).set).call(n, []),
                  (e = n instanceof Array);
              } catch (t) {}
              return function (n, i) {
                return r(n), o(i), e ? t.call(n, i) : (n.__proto__ = i), n;
              };
            })()
          : void 0);
    },
    function (t, e, n) {
      "use strict";
      var r = n(5).f,
        o = n(37),
        i = n(38),
        u = n(19),
        c = n(35),
        a = n(33),
        s = n(39),
        f = n(84),
        l = n(6),
        p = n(18).fastKey,
        h = n(9),
        d = h.set,
        v = h.getterFor;
      t.exports = {
        getConstructor: function (t, e, n, s) {
          var f = t(function (t, r) {
              c(t, f, e),
                d(t, {
                  type: e,
                  index: o(null),
                  first: void 0,
                  last: void 0,
                  size: 0,
                }),
                l || (t.size = 0),
                null != r && a(r, t[s], t, n);
            }),
            h = v(e),
            y = function (t, e, n) {
              var r,
                o,
                i = h(t),
                u = m(t, e);
              return (
                u
                  ? (u.value = n)
                  : ((i.last = u =
                      {
                        index: (o = p(e, !0)),
                        key: e,
                        value: n,
                        previous: (r = i.last),
                        next: void 0,
                        removed: !1,
                      }),
                    i.first || (i.first = u),
                    r && (r.next = u),
                    l ? i.size++ : t.size++,
                    "F" !== o && (i.index[o] = u)),
                t
              );
            },
            m = function (t, e) {
              var n,
                r = h(t),
                o = p(e);
              if ("F" !== o) return r.index[o];
              for (n = r.first; n; n = n.next) if (n.key == e) return n;
            };
          return (
            i(f.prototype, {
              clear: function () {
                for (var t = h(this), e = t.index, n = t.first; n; )
                  (n.removed = !0),
                    n.previous && (n.previous = n.previous.next = void 0),
                    delete e[n.index],
                    (n = n.next);
                (t.first = t.last = void 0), l ? (t.size = 0) : (this.size = 0);
              },
              delete: function (t) {
                var e = h(this),
                  n = m(this, t);
                if (n) {
                  var r = n.next,
                    o = n.previous;
                  delete e.index[n.index],
                    (n.removed = !0),
                    o && (o.next = r),
                    r && (r.previous = o),
                    e.first == n && (e.first = r),
                    e.last == n && (e.last = o),
                    l ? e.size-- : this.size--;
                }
                return !!n;
              },
              forEach: function (t) {
                for (
                  var e,
                    n = h(this),
                    r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3);
                  (e = e ? e.next : n.first);

                )
                  for (r(e.value, e.key, this); e && e.removed; )
                    e = e.previous;
              },
              has: function (t) {
                return !!m(this, t);
              },
            }),
            i(
              f.prototype,
              n
                ? {
                    get: function (t) {
                      var e = m(this, t);
                      return e && e.value;
                    },
                    set: function (t, e) {
                      return y(this, 0 === t ? 0 : t, e);
                    },
                  }
                : {
                    add: function (t) {
                      return y(this, (t = 0 === t ? 0 : t), t);
                    },
                  }
            ),
            l &&
              r(f.prototype, "size", {
                get: function () {
                  return h(this).size;
                },
              }),
            f
          );
        },
        setStrong: function (t, e, n) {
          var r = e + " Iterator",
            o = v(e),
            i = v(r);
          s(
            t,
            e,
            function (t, e) {
              d(this, {
                type: r,
                target: t,
                state: o(t),
                kind: e,
                last: void 0,
              });
            },
            function () {
              for (var t = i(this), e = t.kind, n = t.last; n && n.removed; )
                n = n.previous;
              return t.target && (t.last = n = n ? n.next : t.state.first)
                ? "keys" == e
                  ? { value: n.key, done: !1 }
                  : "values" == e
                  ? { value: n.value, done: !1 }
                  : { value: [n.key, n.value], done: !1 }
                : ((t.target = void 0), { value: void 0, done: !0 });
            },
            n ? "entries" : "values",
            !n,
            !0
          ),
            f(e);
        },
      };
    },
    function (t, e, n) {
      var r = n(52),
        o = n(32);
      t.exports =
        Object.keys ||
        function (t) {
          return r(t, o);
        };
    },
    function (t, e, n) {
      "use strict";
      var r,
        o,
        i,
        u = n(65),
        c = n(8),
        a = n(3),
        s = n(1),
        f = n(28),
        l = s("iterator"),
        p = !1;
      [].keys &&
        ("next" in (i = [].keys())
          ? (o = u(u(i))) !== Object.prototype && (r = o)
          : (p = !0)),
        null == r && (r = {}),
        f ||
          a(r, l) ||
          c(r, l, function () {
            return this;
          }),
        (t.exports = { IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: p });
    },
    function (t, e, n) {
      var r = n(3),
        o = n(20),
        i = n(27),
        u = n(83),
        c = i("IE_PROTO"),
        a = Object.prototype;
      t.exports = u
        ? Object.getPrototypeOf
        : function (t) {
            return (
              (t = o(t)),
              r(t, c)
                ? t[c]
                : "function" == typeof t.constructor &&
                  t instanceof t.constructor
                ? t.constructor.prototype
                : t instanceof Object
                ? a
                : null
            );
          };
    },
    function (t, e, n) {
      "use strict";
      (function (t) {
        var n = "object" == typeof t && t && t.Object === Object && t;
        e.a = n;
      }.call(this, n(43)));
    },
    function (t, e, n) {
      t.exports = n(105);
    },
    function (t, e, n) {
      n(69), n(40), n(41), n(42);
      var r = n(10);
      t.exports = r.Map;
    },
    function (t, e, n) {
      "use strict";
      var r = n(21),
        o = n(62);
      t.exports = r(
        "Map",
        function (t) {
          return function () {
            return t(this, arguments.length ? arguments[0] : void 0);
          };
        },
        o
      );
    },
    function (t, e, n) {
      var r = n(3),
        o = n(71),
        i = n(44),
        u = n(5);
      t.exports = function (t, e) {
        for (var n = o(e), c = u.f, a = i.f, s = 0; s < n.length; s++) {
          var f = n[s];
          r(t, f) || c(t, f, a(e, f));
        }
      };
    },
    function (t, e, n) {
      var r = n(30),
        o = n(72),
        i = n(53),
        u = n(7);
      t.exports =
        r("Reflect", "ownKeys") ||
        function (t) {
          var e = o.f(u(t)),
            n = i.f;
          return n ? e.concat(n(t)) : e;
        };
    },
    function (t, e, n) {
      var r = n(52),
        o = n(32).concat("length", "prototype");
      e.f =
        Object.getOwnPropertyNames ||
        function (t) {
          return r(t, o);
        };
    },
    function (t, e, n) {
      var r = n(15),
        o = n(17),
        i = n(74),
        u = function (t) {
          return function (e, n, u) {
            var c,
              a = r(e),
              s = o(a.length),
              f = i(u, s);
            if (t && n != n) {
              for (; s > f; ) if ((c = a[f++]) != c) return !0;
            } else
              for (; s > f; f++)
                if ((t || f in a) && a[f] === n) return t || f || 0;
            return !t && -1;
          };
        };
      t.exports = { includes: u(!0), indexOf: u(!1) };
    },
    function (t, e, n) {
      var r = n(31),
        o = Math.max,
        i = Math.min;
      t.exports = function (t, e) {
        var n = r(t);
        return n < 0 ? o(n + e, 0) : i(n, e);
      };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports = !r(function () {
        return Object.isExtensible(Object.preventExtensions({}));
      });
    },
    function (t, e, n) {
      var r = n(56);
      t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator;
    },
    function (t, e) {
      t.exports = function (t) {
        if ("function" != typeof t)
          throw TypeError(String(t) + " is not a function");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(2),
        o = n(61);
      t.exports = function (t, e, n) {
        var i, u;
        return (
          o &&
            "function" == typeof (i = e.constructor) &&
            i !== n &&
            r((u = i.prototype)) &&
            u !== n.prototype &&
            o(t, u),
          t
        );
      };
    },
    function (t, e, n) {
      var r = n(2);
      t.exports = function (t) {
        if (!r(t) && null !== t)
          throw TypeError("Can't set " + String(t) + " as a prototype");
        return t;
      };
    },
    function (t, e, n) {
      var r = n(6),
        o = n(5),
        i = n(7),
        u = n(63);
      t.exports = r
        ? Object.defineProperties
        : function (t, e) {
            i(t);
            for (var n, r = u(e), c = r.length, a = 0; c > a; )
              o.f(t, (n = r[a++]), e[n]);
            return t;
          };
    },
    function (t, e, n) {
      var r = n(30);
      t.exports = r("document", "documentElement");
    },
    function (t, e, n) {
      "use strict";
      var r = n(64).IteratorPrototype,
        o = n(37),
        i = n(14),
        u = n(36),
        c = n(12),
        a = function () {
          return this;
        };
      t.exports = function (t, e, n) {
        var s = e + " Iterator";
        return (
          (t.prototype = o(r, { next: i(1, n) })),
          u(t, s, !1, !0),
          (c[s] = a),
          t
        );
      };
    },
    function (t, e, n) {
      var r = n(4);
      t.exports = !r(function () {
        function t() {}
        return (
          (t.prototype.constructor = null),
          Object.getPrototypeOf(new t()) !== t.prototype
        );
      });
    },
    function (t, e, n) {
      "use strict";
      var r = n(30),
        o = n(5),
        i = n(1),
        u = n(6),
        c = i("species");
      t.exports = function (t) {
        var e = r(t),
          n = o.f;
        u &&
          e &&
          !e[c] &&
          n(e, c, {
            configurable: !0,
            get: function () {
              return this;
            },
          });
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(34),
        o = n(58);
      t.exports = r
        ? {}.toString
        : function () {
            return "[object " + o(this) + "]";
          };
    },
    function (t, e, n) {
      var r = n(31),
        o = n(24),
        i = function (t) {
          return function (e, n) {
            var i,
              u,
              c = String(o(e)),
              a = r(n),
              s = c.length;
            return a < 0 || a >= s
              ? t
                ? ""
                : void 0
              : (i = c.charCodeAt(a)) < 55296 ||
                i > 56319 ||
                a + 1 === s ||
                (u = c.charCodeAt(a + 1)) < 56320 ||
                u > 57343
              ? t
                ? c.charAt(a)
                : i
              : t
              ? c.slice(a, a + 2)
              : u - 56320 + ((i - 55296) << 10) + 65536;
          };
        };
      t.exports = { codeAt: i(!1), charAt: i(!0) };
    },
    function (t, e) {
      t.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0,
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(15),
        o = n(89),
        i = n(12),
        u = n(9),
        c = n(39),
        a = u.set,
        s = u.getterFor("Array Iterator");
      (t.exports = c(
        Array,
        "Array",
        function (t, e) {
          a(this, { type: "Array Iterator", target: r(t), index: 0, kind: e });
        },
        function () {
          var t = s(this),
            e = t.target,
            n = t.kind,
            r = t.index++;
          return !e || r >= e.length
            ? ((t.target = void 0), { value: void 0, done: !0 })
            : "keys" == n
            ? { value: r, done: !1 }
            : "values" == n
            ? { value: e[r], done: !1 }
            : { value: [r, e[r]], done: !1 };
        },
        "values"
      )),
        (i.Arguments = i.Array),
        o("keys"),
        o("values"),
        o("entries");
    },
    function (t, e, n) {
      var r = n(1),
        o = n(37),
        i = n(5),
        u = r("unscopables"),
        c = Array.prototype;
      null == c[u] && i.f(c, u, { configurable: !0, value: o(null) }),
        (t.exports = function (t) {
          c[u][t] = !0;
        });
    },
    function (t, e, n) {
      n(91), n(40), n(41), n(42);
      var r = n(10);
      t.exports = r.Set;
    },
    function (t, e, n) {
      "use strict";
      var r = n(21),
        o = n(62);
      t.exports = r(
        "Set",
        function (t) {
          return function () {
            return t(this, arguments.length ? arguments[0] : void 0);
          };
        },
        o
      );
    },
    function (t, e, n) {
      n(40), n(93), n(42);
      var r = n(10);
      t.exports = r.WeakMap;
    },
    function (t, e, n) {
      "use strict";
      var r,
        o = n(0),
        i = n(38),
        u = n(18),
        c = n(21),
        a = n(94),
        s = n(2),
        f = n(9).enforce,
        l = n(50),
        p = !o.ActiveXObject && "ActiveXObject" in o,
        h = Object.isExtensible,
        d = function (t) {
          return function () {
            return t(this, arguments.length ? arguments[0] : void 0);
          };
        },
        v = (t.exports = c("WeakMap", d, a));
      if (l && p) {
        (r = a.getConstructor(d, "WeakMap", !0)), (u.REQUIRED = !0);
        var y = v.prototype,
          m = y.delete,
          g = y.has,
          b = y.get,
          x = y.set;
        i(y, {
          delete: function (t) {
            if (s(t) && !h(t)) {
              var e = f(this);
              return (
                e.frozen || (e.frozen = new r()),
                m.call(this, t) || e.frozen.delete(t)
              );
            }
            return m.call(this, t);
          },
          has: function (t) {
            if (s(t) && !h(t)) {
              var e = f(this);
              return (
                e.frozen || (e.frozen = new r()),
                g.call(this, t) || e.frozen.has(t)
              );
            }
            return g.call(this, t);
          },
          get: function (t) {
            if (s(t) && !h(t)) {
              var e = f(this);
              return (
                e.frozen || (e.frozen = new r()),
                g.call(this, t) ? b.call(this, t) : e.frozen.get(t)
              );
            }
            return b.call(this, t);
          },
          set: function (t, e) {
            if (s(t) && !h(t)) {
              var n = f(this);
              n.frozen || (n.frozen = new r()),
                g.call(this, t) ? x.call(this, t, e) : n.frozen.set(t, e);
            } else x.call(this, t, e);
            return this;
          },
        });
      }
    },
    function (t, e, n) {
      "use strict";
      var r = n(38),
        o = n(18).getWeakData,
        i = n(7),
        u = n(2),
        c = n(35),
        a = n(33),
        s = n(95),
        f = n(3),
        l = n(9),
        p = l.set,
        h = l.getterFor,
        d = s.find,
        v = s.findIndex,
        y = 0,
        m = function (t) {
          return t.frozen || (t.frozen = new g());
        },
        g = function () {
          this.entries = [];
        },
        b = function (t, e) {
          return d(t.entries, function (t) {
            return t[0] === e;
          });
        };
      (g.prototype = {
        get: function (t) {
          var e = b(this, t);
          if (e) return e[1];
        },
        has: function (t) {
          return !!b(this, t);
        },
        set: function (t, e) {
          var n = b(this, t);
          n ? (n[1] = e) : this.entries.push([t, e]);
        },
        delete: function (t) {
          var e = v(this.entries, function (e) {
            return e[0] === t;
          });
          return ~e && this.entries.splice(e, 1), !!~e;
        },
      }),
        (t.exports = {
          getConstructor: function (t, e, n, s) {
            var l = t(function (t, r) {
                c(t, l, e),
                  p(t, { type: e, id: y++, frozen: void 0 }),
                  null != r && a(r, t[s], t, n);
              }),
              d = h(e),
              v = function (t, e, n) {
                var r = d(t),
                  u = o(i(e), !0);
                return !0 === u ? m(r).set(e, n) : (u[r.id] = n), t;
              };
            return (
              r(l.prototype, {
                delete: function (t) {
                  var e = d(this);
                  if (!u(t)) return !1;
                  var n = o(t);
                  return !0 === n
                    ? m(e).delete(t)
                    : n && f(n, e.id) && delete n[e.id];
                },
                has: function (t) {
                  var e = d(this);
                  if (!u(t)) return !1;
                  var n = o(t);
                  return !0 === n ? m(e).has(t) : n && f(n, e.id);
                },
              }),
              r(
                l.prototype,
                n
                  ? {
                      get: function (t) {
                        var e = d(this);
                        if (u(t)) {
                          var n = o(t);
                          return !0 === n ? m(e).get(t) : n ? n[e.id] : void 0;
                        }
                      },
                      set: function (t, e) {
                        return v(this, t, e);
                      },
                    }
                  : {
                      add: function (t) {
                        return v(this, t, !0);
                      },
                    }
              ),
              l
            );
          },
        });
    },
    function (t, e, n) {
      var r = n(19),
        o = n(22),
        i = n(20),
        u = n(17),
        c = n(96),
        a = [].push,
        s = function (t) {
          var e = 1 == t,
            n = 2 == t,
            s = 3 == t,
            f = 4 == t,
            l = 6 == t,
            p = 5 == t || l;
          return function (h, d, v, y) {
            for (
              var m,
                g,
                b = i(h),
                x = o(b),
                w = r(d, v, 3),
                S = u(x.length),
                O = 0,
                _ = y || c,
                E = e ? _(h, S) : n ? _(h, 0) : void 0;
              S > O;
              O++
            )
              if ((p || O in x) && ((g = w((m = x[O]), O, b)), t))
                if (e) E[O] = g;
                else if (g)
                  switch (t) {
                    case 3:
                      return !0;
                    case 5:
                      return m;
                    case 6:
                      return O;
                    case 2:
                      a.call(E, m);
                  }
                else if (f) return !1;
            return l ? -1 : s || f ? f : E;
          };
        };
      t.exports = {
        forEach: s(0),
        map: s(1),
        filter: s(2),
        some: s(3),
        every: s(4),
        find: s(5),
        findIndex: s(6),
      };
    },
    function (t, e, n) {
      var r = n(2),
        o = n(97),
        i = n(1)("species");
      t.exports = function (t, e) {
        var n;
        return (
          o(t) &&
            ("function" != typeof (n = t.constructor) ||
            (n !== Array && !o(n.prototype))
              ? r(n) && null === (n = n[i]) && (n = void 0)
              : (n = void 0)),
          new (void 0 === n ? Array : n)(0 === e ? 0 : e)
        );
      };
    },
    function (t, e, n) {
      var r = n(23);
      t.exports =
        Array.isArray ||
        function (t) {
          return "Array" == r(t);
        };
    },
    function (t, e, n) {
      n(41), n(99);
      var r = n(10);
      t.exports = r.Array.from;
    },
    function (t, e, n) {
      var r = n(13),
        o = n(100);
      r(
        {
          target: "Array",
          stat: !0,
          forced: !n(60)(function (t) {
            Array.from(t);
          }),
        },
        { from: o }
      );
    },
    function (t, e, n) {
      "use strict";
      var r = n(19),
        o = n(20),
        i = n(59),
        u = n(55),
        c = n(17),
        a = n(101),
        s = n(57);
      t.exports = function (t) {
        var e,
          n,
          f,
          l,
          p,
          h,
          d = o(t),
          v = "function" == typeof this ? this : Array,
          y = arguments.length,
          m = y > 1 ? arguments[1] : void 0,
          g = void 0 !== m,
          b = s(d),
          x = 0;
        if (
          (g && (m = r(m, y > 2 ? arguments[2] : void 0, 2)),
          null == b || (v == Array && u(b)))
        )
          for (n = new v((e = c(d.length))); e > x; x++)
            (h = g ? m(d[x], x) : d[x]), a(n, x, h);
        else
          for (
            p = (l = b.call(d)).next, n = new v();
            !(f = p.call(l)).done;
            x++
          )
            (h = g ? i(l, m, [f.value, x], !0) : f.value), a(n, x, h);
        return (n.length = x), n;
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(25),
        o = n(5),
        i = n(14);
      t.exports = function (t, e, n) {
        var u = r(e);
        u in t ? o.f(t, u, i(0, n)) : (t[u] = n);
      };
    },
    function (t, e, n) {
      n(103);
      var r = n(10);
      t.exports = r.Object.assign;
    },
    function (t, e, n) {
      var r = n(13),
        o = n(104);
      r(
        { target: "Object", stat: !0, forced: Object.assign !== o },
        { assign: o }
      );
    },
    function (t, e, n) {
      "use strict";
      var r = n(6),
        o = n(4),
        i = n(63),
        u = n(53),
        c = n(45),
        a = n(20),
        s = n(22),
        f = Object.assign,
        l = Object.defineProperty;
      t.exports =
        !f ||
        o(function () {
          if (
            r &&
            1 !==
              f(
                { b: 1 },
                f(
                  l({}, "a", {
                    enumerable: !0,
                    get: function () {
                      l(this, "b", { value: 3, enumerable: !1 });
                    },
                  }),
                  { b: 2 }
                )
              ).b
          )
            return !0;
          var t = {},
            e = {},
            n = Symbol();
          return (
            (t[n] = 7),
            "abcdefghijklmnopqrst".split("").forEach(function (t) {
              e[t] = t;
            }),
            7 != f({}, t)[n] || "abcdefghijklmnopqrst" != i(f({}, e)).join("")
          );
        })
          ? function (t, e) {
              for (
                var n = a(t), o = arguments.length, f = 1, l = u.f, p = c.f;
                o > f;

              )
                for (
                  var h,
                    d = s(arguments[f++]),
                    v = l ? i(d).concat(l(d)) : i(d),
                    y = v.length,
                    m = 0;
                  y > m;

                )
                  (h = v[m++]), (r && !p.call(d, h)) || (n[h] = d[h]);
              return n;
            }
          : f;
    },
    function (t, e, n) {
      "use strict";
      n.r(e);
      var r = {};
      n.r(r),
        n.d(r, "keyboardHandler", function () {
          return ot;
        }),
        n.d(r, "mouseHandler", function () {
          return it;
        }),
        n.d(r, "resizeHandler", function () {
          return ut;
        }),
        n.d(r, "selectHandler", function () {
          return ct;
        }),
        n.d(r, "touchHandler", function () {
          return at;
        }),
        n.d(r, "wheelHandler", function () {
          return st;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var o = function (t, e) {
          return (o =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(t, e);
        },
        i = function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var o in (e = arguments[n]))
                  Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
              return t;
            }).apply(this, arguments);
        };
      function u(t, e, n, r) {
        var o,
          i = arguments.length,
          u =
            i < 3
              ? e
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          u = Reflect.decorate(t, e, n, r);
        else
          for (var c = t.length - 1; c >= 0; c--)
            (o = t[c]) &&
              (u = (i < 3 ? o(u) : i > 3 ? o(e, n, u) : o(e, n)) || u);
        return i > 3 && u && Object.defineProperty(e, n, u), u;
      }
      n(68), n(90), n(92), n(98), n(102);
      var c = /\s/,
        a = /^\s+/,
        s = function (t) {
          return t
            ? t
                .slice(
                  0,
                  (function (t) {
                    for (var e = t.length; e-- && c.test(t.charAt(e)); );
                    return e;
                  })(t) + 1
                )
                .replace(a, "")
            : t;
        },
        f = function (t) {
          var e = typeof t;
          return null != t && ("object" == e || "function" == e);
        },
        l = n(66),
        p = "object" == typeof self && self && self.Object === Object && self,
        h = l.a || p || Function("return this")(),
        d = h.Symbol,
        v = Object.prototype,
        y = v.hasOwnProperty,
        m = v.toString,
        g = d ? d.toStringTag : void 0,
        b = Object.prototype.toString,
        x = d ? d.toStringTag : void 0,
        w = function (t) {
          return null == t
            ? void 0 === t
              ? "[object Undefined]"
              : "[object Null]"
            : x && x in Object(t)
            ? (function (t) {
                var e = y.call(t, g),
                  n = t[g];
                try {
                  t[g] = void 0;
                  var r = !0;
                } catch (t) {}
                var o = m.call(t);
                return r && (e ? (t[g] = n) : delete t[g]), o;
              })(t)
            : (function (t) {
                return b.call(t);
              })(t);
        },
        S = /^[-+]0x[0-9a-f]+$/i,
        O = /^0b[01]+$/i,
        _ = /^0o[0-7]+$/i,
        E = parseInt,
        T = function (t) {
          if ("number" == typeof t) return t;
          if (
            (function (t) {
              return (
                "symbol" == typeof t ||
                ((function (t) {
                  return null != t && "object" == typeof t;
                })(t) &&
                  "[object Symbol]" == w(t))
              );
            })(t)
          )
            return NaN;
          if (f(t)) {
            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = f(e) ? e + "" : e;
          }
          if ("string" != typeof t) return 0 === t ? t : +t;
          t = s(t);
          var n = O.test(t);
          return n || _.test(t)
            ? E(t.slice(2), n ? 2 : 8)
            : S.test(t)
            ? NaN
            : +t;
        },
        A = function (t, e, n) {
          return (
            void 0 === n && ((n = e), (e = void 0)),
            void 0 !== n && (n = (n = T(n)) == n ? n : 0),
            void 0 !== e && (e = (e = T(e)) == e ? e : 0),
            (function (t, e, n) {
              return (
                t == t &&
                  (void 0 !== n && (t = t <= n ? t : n),
                  void 0 !== e && (t = t >= e ? t : e)),
                t
              );
            })(T(t), e, n)
          );
        };
      function j(t, e) {
        return (
          void 0 === t && (t = -1 / 0),
          void 0 === e && (e = 1 / 0),
          function (n, r) {
            var o = "_" + r;
            Object.defineProperty(n, r, {
              get: function () {
                return this[o];
              },
              set: function (n) {
                Object.defineProperty(this, o, {
                  value: A(n, t, e),
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                });
              },
              enumerable: !0,
              configurable: !0,
            });
          }
        );
      }
      function P(t, e) {
        var n = "_" + e;
        Object.defineProperty(t, e, {
          get: function () {
            return this[n];
          },
          set: function (t) {
            Object.defineProperty(this, n, {
              value: !!t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            });
          },
          enumerable: !0,
          configurable: !0,
        });
      }
      var M = function () {
          return h.Date.now();
        },
        k = Math.max,
        D = Math.min,
        z = function (t, e, n) {
          var r,
            o,
            i,
            u,
            c,
            a,
            s = 0,
            l = !1,
            p = !1,
            h = !0;
          if ("function" != typeof t)
            throw new TypeError("Expected a function");
          function d(e) {
            var n = r,
              i = o;
            return (r = o = void 0), (s = e), (u = t.apply(i, n));
          }
          function v(t) {
            var n = t - a;
            return void 0 === a || n >= e || n < 0 || (p && t - s >= i);
          }
          function y() {
            var t = M();
            if (v(t)) return m(t);
            c = setTimeout(
              y,
              (function (t) {
                var n = e - (t - a);
                return p ? D(n, i - (t - s)) : n;
              })(t)
            );
          }
          function m(t) {
            return (c = void 0), h && r ? d(t) : ((r = o = void 0), u);
          }
          function g() {
            var t = M(),
              n = v(t);
            if (((r = arguments), (o = this), (a = t), n)) {
              if (void 0 === c)
                return (function (t) {
                  return (s = t), (c = setTimeout(y, e)), l ? d(t) : u;
                })(a);
              if (p) return clearTimeout(c), (c = setTimeout(y, e)), d(a);
            }
            return void 0 === c && (c = setTimeout(y, e)), u;
          }
          return (
            (e = T(e) || 0),
            f(n) &&
              ((l = !!n.leading),
              (i = (p = "maxWait" in n) ? k(T(n.maxWait) || 0, e) : i),
              (h = "trailing" in n ? !!n.trailing : h)),
            (g.cancel = function () {
              void 0 !== c && clearTimeout(c),
                (s = 0),
                (r = a = o = c = void 0);
            }),
            (g.flush = function () {
              return void 0 === c ? u : m(M());
            }),
            g
          );
        };
      function L() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return function (e, n, r) {
          var o = r.value;
          return {
            get: function () {
              return (
                this.hasOwnProperty(n) ||
                  Object.defineProperty(this, n, {
                    value: z.apply(
                      void 0,
                      (function () {
                        for (var t = 0, e = 0, n = arguments.length; e < n; e++)
                          t += arguments[e].length;
                        var r = Array(t),
                          o = 0;
                        for (e = 0; e < n; e++)
                          for (
                            var i = arguments[e], u = 0, c = i.length;
                            u < c;
                            u++, o++
                          )
                            r[o] = i[u];
                        return r;
                      })([o], t)
                    ),
                  }),
                this[n]
              );
            },
          };
        };
      }
      var I,
        R = (function () {
          function t(t) {
            var e = this;
            void 0 === t && (t = {}),
              (this.damping = 0.1),
              (this.thumbMinSize = 20),
              (this.renderByPixels = !0),
              (this.alwaysShowTracks = !1),
              (this.continuousScrolling = !0),
              (this.delegateTo = null),
              (this.plugins = {}),
              Object.keys(t).forEach(function (n) {
                e[n] = t[n];
              });
          }
          return (
            Object.defineProperty(t.prototype, "wheelEventTarget", {
              get: function () {
                return this.delegateTo;
              },
              set: function (t) {
                console.warn(
                  "[smooth-scrollbar]: `options.wheelEventTarget` is deprecated and will be removed in the future, use `options.delegateTo` instead."
                ),
                  (this.delegateTo = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            u([j(0, 1)], t.prototype, "damping", void 0),
            u([j(0, 1 / 0)], t.prototype, "thumbMinSize", void 0),
            u([P], t.prototype, "renderByPixels", void 0),
            u([P], t.prototype, "alwaysShowTracks", void 0),
            u([P], t.prototype, "continuousScrolling", void 0),
            t
          );
        })(),
        C = new WeakMap();
      function N() {
        if (void 0 !== I) return I;
        var t = !1;
        try {
          var e = function () {},
            n = Object.defineProperty({}, "passive", {
              get: function () {
                t = !0;
              },
            });
          window.addEventListener("testPassive", e, n),
            window.removeEventListener("testPassive", e, n);
        } catch (t) {}
        return (I = !!t && { passive: !1 });
      }
      function F(t) {
        var e = C.get(t) || [];
        return (
          C.set(t, e),
          function (t, n, r) {
            function o(t) {
              t.defaultPrevented || r(t);
            }
            n.split(/\s+/g).forEach(function (n) {
              e.push({ elem: t, eventName: n, handler: o }),
                t.addEventListener(n, o, N());
            });
          }
        );
      }
      function H(t) {
        var e = (function (t) {
          return t.touches ? t.touches[t.touches.length - 1] : t;
        })(t);
        return { x: e.clientX, y: e.clientY };
      }
      function W(t, e) {
        return (
          void 0 === e && (e = []),
          e.some(function (e) {
            return t === e;
          })
        );
      }
      var B = ["webkit", "moz", "ms", "o"],
        G = new RegExp("^-(?!(?:" + B.join("|") + ")-)");
      function U(t, e) {
        (e = (function (t) {
          var e = {};
          return (
            Object.keys(t).forEach(function (n) {
              if (G.test(n)) {
                var r = t[n];
                (n = n.replace(/^-/, "")),
                  (e[n] = r),
                  B.forEach(function (t) {
                    e["-" + t + "-" + n] = r;
                  });
              } else e[n] = t[n];
            }),
            e
          );
        })(e)),
          Object.keys(e).forEach(function (n) {
            var r = n.replace(/^-/, "").replace(/-([a-z])/g, function (t, e) {
              return e.toUpperCase();
            });
            t.style[r] = e[n];
          });
      }
      var X,
        V = (function () {
          function t(t) {
            (this.velocityMultiplier = /Android/.test(navigator.userAgent)
              ? window.devicePixelRatio
              : 1),
              (this.updateTime = Date.now()),
              (this.delta = { x: 0, y: 0 }),
              (this.velocity = { x: 0, y: 0 }),
              (this.lastPosition = { x: 0, y: 0 }),
              (this.lastPosition = H(t));
          }
          return (
            (t.prototype.update = function (t) {
              var e = this.velocity,
                n = this.updateTime,
                r = this.lastPosition,
                o = Date.now(),
                i = H(t),
                u = { x: -(i.x - r.x), y: -(i.y - r.y) },
                c = o - n || 16.7,
                a = (u.x / c) * 16.7,
                s = (u.y / c) * 16.7;
              (e.x = a * this.velocityMultiplier),
                (e.y = s * this.velocityMultiplier),
                (this.delta = u),
                (this.updateTime = o),
                (this.lastPosition = i);
            }),
            t
          );
        })(),
        Y = (function () {
          function t() {
            this._touchList = {};
          }
          return (
            Object.defineProperty(t.prototype, "_primitiveValue", {
              get: function () {
                return { x: 0, y: 0 };
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.isActive = function () {
              return void 0 !== this._activeTouchID;
            }),
            (t.prototype.getDelta = function () {
              var t = this._getActiveTracker();
              return t ? i({}, t.delta) : this._primitiveValue;
            }),
            (t.prototype.getVelocity = function () {
              var t = this._getActiveTracker();
              return t ? i({}, t.velocity) : this._primitiveValue;
            }),
            (t.prototype.getEasingDistance = function (t) {
              var e = 1 - t,
                n = { x: 0, y: 0 },
                r = this.getVelocity();
              return (
                Object.keys(r).forEach(function (t) {
                  for (var o = Math.abs(r[t]) <= 10 ? 0 : r[t]; 0 !== o; )
                    (n[t] += o), (o = (o * e) | 0);
                }),
                n
              );
            }),
            (t.prototype.track = function (t) {
              var e = this,
                n = t.targetTouches;
              return (
                Array.from(n).forEach(function (t) {
                  e._add(t);
                }),
                this._touchList
              );
            }),
            (t.prototype.update = function (t) {
              var e = this,
                n = t.touches,
                r = t.changedTouches;
              return (
                Array.from(n).forEach(function (t) {
                  e._renew(t);
                }),
                this._setActiveID(r),
                this._touchList
              );
            }),
            (t.prototype.release = function (t) {
              var e = this;
              delete this._activeTouchID,
                Array.from(t.changedTouches).forEach(function (t) {
                  e._delete(t);
                });
            }),
            (t.prototype._add = function (t) {
              this._has(t) && this._delete(t);
              var e = new V(t);
              this._touchList[t.identifier] = e;
            }),
            (t.prototype._renew = function (t) {
              this._has(t) && this._touchList[t.identifier].update(t);
            }),
            (t.prototype._delete = function (t) {
              delete this._touchList[t.identifier];
            }),
            (t.prototype._has = function (t) {
              return this._touchList.hasOwnProperty(t.identifier);
            }),
            (t.prototype._setActiveID = function (t) {
              this._activeTouchID = t[t.length - 1].identifier;
            }),
            (t.prototype._getActiveTracker = function () {
              return this._touchList[this._activeTouchID];
            }),
            t
          );
        })();
      !(function (t) {
        (t.X = "x"), (t.Y = "y");
      })(X || (X = {}));
      var q = (function () {
          function t(t, e) {
            void 0 === e && (e = 0),
              (this._direction = t),
              (this._minSize = e),
              (this.element = document.createElement("div")),
              (this.displaySize = 0),
              (this.realSize = 0),
              (this.offset = 0),
              (this.element.className = "scrollbar-thumb scrollbar-thumb-" + t);
          }
          return (
            (t.prototype.attachTo = function (t) {
              t.appendChild(this.element);
            }),
            (t.prototype.update = function (t, e, n) {
              (this.realSize = Math.min(e / n, 1) * e),
                (this.displaySize = Math.max(this.realSize, this._minSize)),
                (this.offset =
                  (t / n) * (e + (this.realSize - this.displaySize))),
                U(this.element, this._getStyle());
            }),
            (t.prototype._getStyle = function () {
              switch (this._direction) {
                case X.X:
                  return {
                    width: this.displaySize + "px",
                    "-transform": "translate3d(" + this.offset + "px, 0, 0)",
                  };
                case X.Y:
                  return {
                    height: this.displaySize + "px",
                    "-transform": "translate3d(0, " + this.offset + "px, 0)",
                  };
                default:
                  return null;
              }
            }),
            t
          );
        })(),
        Q = (function () {
          function t(t, e) {
            void 0 === e && (e = 0),
              (this.element = document.createElement("div")),
              (this._isShown = !1),
              (this.element.className = "scrollbar-track scrollbar-track-" + t),
              (this.thumb = new q(t, e)),
              this.thumb.attachTo(this.element);
          }
          return (
            (t.prototype.attachTo = function (t) {
              t.appendChild(this.element);
            }),
            (t.prototype.show = function () {
              this._isShown ||
                ((this._isShown = !0), this.element.classList.add("show"));
            }),
            (t.prototype.hide = function () {
              this._isShown &&
                ((this._isShown = !1), this.element.classList.remove("show"));
            }),
            (t.prototype.update = function (t, e, n) {
              U(this.element, { display: n <= e ? "none" : "block" }),
                this.thumb.update(t, e, n);
            }),
            t
          );
        })(),
        K = (function () {
          function t(t) {
            this._scrollbar = t;
            var e = t.options.thumbMinSize;
            (this.xAxis = new Q(X.X, e)),
              (this.yAxis = new Q(X.Y, e)),
              this.xAxis.attachTo(t.containerEl),
              this.yAxis.attachTo(t.containerEl),
              t.options.alwaysShowTracks &&
                (this.xAxis.show(), this.yAxis.show());
          }
          return (
            (t.prototype.update = function () {
              var t = this._scrollbar,
                e = t.size,
                n = t.offset;
              this.xAxis.update(n.x, e.container.width, e.content.width),
                this.yAxis.update(n.y, e.container.height, e.content.height);
            }),
            (t.prototype.autoHideOnIdle = function () {
              this._scrollbar.options.alwaysShowTracks ||
                (this.xAxis.hide(), this.yAxis.hide());
            }),
            u([L(300)], t.prototype, "autoHideOnIdle", null),
            t
          );
        })(),
        $ = new WeakMap();
      function J(t) {
        return Math.pow(t - 1, 3) + 1;
      }
      var Z,
        tt,
        et,
        nt = (function () {
          function t(t, e) {
            var n = this.constructor;
            (this.scrollbar = t),
              (this.name = n.pluginName),
              (this.options = i(i({}, n.defaultOptions), e));
          }
          return (
            (t.prototype.onInit = function () {}),
            (t.prototype.onDestroy = function () {}),
            (t.prototype.onUpdate = function () {}),
            (t.prototype.onRender = function (t) {}),
            (t.prototype.transformDelta = function (t, e) {
              return i({}, t);
            }),
            (t.pluginName = ""),
            (t.defaultOptions = {}),
            t
          );
        })(),
        rt = { order: new Set(), constructors: {} };
      function ot(t) {
        var e = F(t),
          n = t.containerEl;
        e(n, "keydown", function (e) {
          var r = document.activeElement;
          if (
            (r === n || n.contains(r)) &&
            !(function (t) {
              return (
                !(
                  "INPUT" !== t.tagName &&
                  "SELECT" !== t.tagName &&
                  "TEXTAREA" !== t.tagName &&
                  !t.isContentEditable
                ) && !t.disabled
              );
            })(r)
          ) {
            var o = (function (t, e) {
              var n = t.size,
                r = t.limit,
                o = t.offset;
              switch (e) {
                case Z.TAB:
                  return (function (t) {
                    requestAnimationFrame(function () {
                      t.scrollIntoView(document.activeElement, {
                        offsetTop: t.size.container.height / 2,
                        onlyScrollIfNeeded: !0,
                      });
                    });
                  })(t);
                case Z.SPACE:
                  return [0, 200];
                case Z.PAGE_UP:
                  return [0, 40 - n.container.height];
                case Z.PAGE_DOWN:
                  return [0, n.container.height - 40];
                case Z.END:
                  return [0, r.y - o.y];
                case Z.HOME:
                  return [0, -o.y];
                case Z.LEFT:
                  return [-40, 0];
                case Z.UP:
                  return [0, -40];
                case Z.RIGHT:
                  return [40, 0];
                case Z.DOWN:
                  return [0, 40];
                default:
                  return null;
              }
            })(t, e.keyCode || e.which);
            if (o) {
              var i = o[0],
                u = o[1];
              t.addTransformableMomentum(i, u, e, function (n) {
                n
                  ? e.preventDefault()
                  : (t.containerEl.blur(),
                    t.parent && t.parent.containerEl.focus());
              });
            }
          }
        });
      }
      function it(t) {
        var e,
          n,
          r,
          o,
          i,
          u = F(t),
          c = t.containerEl,
          a = t.track,
          s = a.xAxis,
          f = a.yAxis;
        function l(e, n) {
          var r = t.size,
            o = t.limit,
            i = t.offset;
          if (e === tt.X) {
            var u =
              r.container.width + (s.thumb.realSize - s.thumb.displaySize);
            return A((n / u) * r.content.width, 0, o.x) - i.x;
          }
          if (e === tt.Y) {
            var c =
              r.container.height + (f.thumb.realSize - f.thumb.displaySize);
            return A((n / c) * r.content.height, 0, o.y) - i.y;
          }
          return 0;
        }
        function p(t) {
          return W(t, [s.element, s.thumb.element])
            ? tt.X
            : W(t, [f.element, f.thumb.element])
            ? tt.Y
            : void 0;
        }
        u(c, "click", function (e) {
          if (!n && W(e.target, [s.element, f.element])) {
            var r = e.target,
              o = p(r),
              i = r.getBoundingClientRect(),
              u = H(e);
            if (o === tt.X) {
              var c = u.x - i.left - s.thumb.displaySize / 2;
              t.setMomentum(l(o, c), 0);
            }
            o === tt.Y &&
              ((c = u.y - i.top - f.thumb.displaySize / 2),
              t.setMomentum(0, l(o, c)));
          }
        }),
          u(c, "mousedown", function (n) {
            if (W(n.target, [s.thumb.element, f.thumb.element])) {
              e = !0;
              var u = n.target,
                a = H(n),
                l = u.getBoundingClientRect();
              (o = p(u)),
                (r = { x: a.x - l.left, y: a.y - l.top }),
                (i = c.getBoundingClientRect()),
                U(t.containerEl, { "-user-select": "none" });
            }
          }),
          u(window, "mousemove", function (u) {
            if (e) {
              n = !0;
              var c = H(u);
              if (o === tt.X) {
                var a = c.x - r.x - i.left;
                t.setMomentum(l(o, a), 0);
              }
              o === tt.Y &&
                ((a = c.y - r.y - i.top), t.setMomentum(0, l(o, a)));
            }
          }),
          u(window, "mouseup blur", function () {
            (e = n = !1), U(t.containerEl, { "-user-select": "" });
          });
      }
      function ut(t) {
        F(t)(window, "resize", z(t.update.bind(t), 300));
      }
      function ct(t) {
        var e,
          n = F(t),
          r = t.containerEl,
          o = t.contentEl,
          i = !1;
        n(window, "mousemove", function (n) {
          i &&
            (cancelAnimationFrame(e),
            (function n(r) {
              var o = r.x,
                i = r.y;
              if (o || i) {
                var u = t.offset,
                  c = t.limit;
                t.setMomentum(
                  A(u.x + o, 0, c.x) - u.x,
                  A(u.y + i, 0, c.y) - u.y
                ),
                  (e = requestAnimationFrame(function () {
                    n({ x: o, y: i });
                  }));
              }
            })(
              (function (t, e) {
                var n = t.bounding,
                  r = n.top,
                  o = n.right,
                  i = n.bottom,
                  u = n.left,
                  c = H(e),
                  a = c.x,
                  s = c.y,
                  f = { x: 0, y: 0 };
                return (
                  (0 === a && 0 === s) ||
                    (a > o - 20
                      ? (f.x = a - o + 20)
                      : a < u + 20 && (f.x = a - u - 20),
                    s > i - 20
                      ? (f.y = s - i + 20)
                      : s < r + 20 && (f.y = s - r - 20),
                    (f.x *= 2),
                    (f.y *= 2)),
                  f
                );
              })(t, n)
            ));
        }),
          n(o, "selectstart", function (t) {
            t.stopPropagation(), cancelAnimationFrame(e), (i = !0);
          }),
          n(window, "mouseup blur", function () {
            cancelAnimationFrame(e), (i = !1);
          }),
          n(r, "scroll", function (t) {
            t.preventDefault(), (r.scrollTop = r.scrollLeft = 0);
          });
      }
      function at(t) {
        var e,
          n = t.options.delegateTo || t.containerEl,
          r = new Y(),
          o = F(t),
          i = 0;
        o(n, "touchstart", function (n) {
          r.track(n),
            t.setMomentum(0, 0),
            0 === i &&
              ((e = t.options.damping), (t.options.damping = Math.max(e, 0.5))),
            i++;
        }),
          o(n, "touchmove", function (e) {
            if (!et || et === t) {
              r.update(e);
              var n = r.getDelta(),
                o = n.x,
                i = n.y;
              t.addTransformableMomentum(o, i, e, function (n) {
                n && e.cancelable && (e.preventDefault(), (et = t));
              });
            }
          }),
          o(n, "touchcancel touchend", function (n) {
            var o = r.getEasingDistance(e);
            t.addTransformableMomentum(o.x, o.y, n),
              0 == --i && (t.options.damping = e),
              r.release(n),
              (et = null);
          });
      }
      function st(t) {
        F(t)(
          t.options.delegateTo || t.containerEl,
          "onwheel" in window ||
            document.implementation.hasFeature("Events.wheel", "3.0")
            ? "wheel"
            : "mousewheel",
          function (e) {
            var n = (function (t) {
                if ("deltaX" in t) {
                  var e = pt(t.deltaMode);
                  return {
                    x: (t.deltaX / ft.STANDARD) * e,
                    y: (t.deltaY / ft.STANDARD) * e,
                  };
                }
                return "wheelDeltaX" in t
                  ? {
                      x: t.wheelDeltaX / ft.OTHERS,
                      y: t.wheelDeltaY / ft.OTHERS,
                    }
                  : { x: 0, y: t.wheelDelta / ft.OTHERS };
              })(e),
              r = n.x,
              o = n.y;
            t.addTransformableMomentum(r, o, e, function (t) {
              t && e.preventDefault();
            });
          }
        );
      }
      !(function (t) {
        (t[(t.TAB = 9)] = "TAB"),
          (t[(t.SPACE = 32)] = "SPACE"),
          (t[(t.PAGE_UP = 33)] = "PAGE_UP"),
          (t[(t.PAGE_DOWN = 34)] = "PAGE_DOWN"),
          (t[(t.END = 35)] = "END"),
          (t[(t.HOME = 36)] = "HOME"),
          (t[(t.LEFT = 37)] = "LEFT"),
          (t[(t.UP = 38)] = "UP"),
          (t[(t.RIGHT = 39)] = "RIGHT"),
          (t[(t.DOWN = 40)] = "DOWN");
      })(Z || (Z = {})),
        (function (t) {
          (t[(t.X = 0)] = "X"), (t[(t.Y = 1)] = "Y");
        })(tt || (tt = {}));
      var ft = { STANDARD: 1, OTHERS: -3 },
        lt = [1, 28, 500],
        pt = function (t) {
          return lt[t] || lt[0];
        },
        ht = new Map(),
        dt = (function () {
          function t(t, e) {
            var n = this;
            (this.offset = { x: 0, y: 0 }),
              (this.limit = { x: 1 / 0, y: 1 / 0 }),
              (this.bounding = { top: 0, right: 0, bottom: 0, left: 0 }),
              (this._plugins = []),
              (this._momentum = { x: 0, y: 0 }),
              (this._listeners = new Set()),
              (this.containerEl = t);
            var r = (this.contentEl = document.createElement("div"));
            (this.options = new R(e)),
              t.setAttribute("data-scrollbar", "true"),
              t.setAttribute("tabindex", "-1"),
              U(t, { overflow: "hidden", outline: "none" }),
              window.navigator.msPointerEnabled &&
                (t.style.msTouchAction = "none"),
              (r.className = "scroll-content"),
              Array.from(t.childNodes).forEach(function (t) {
                r.appendChild(t);
              }),
              t.appendChild(r),
              (this.track = new K(this)),
              (this.size = this.getSize()),
              (this._plugins = (function (t, e) {
                return Array.from(rt.order)
                  .filter(function (t) {
                    return !1 !== e[t];
                  })
                  .map(function (n) {
                    var r = new (0, rt.constructors[n])(t, e[n]);
                    return (e[n] = r.options), r;
                  });
              })(this, this.options.plugins));
            var o = t.scrollLeft,
              i = t.scrollTop;
            (t.scrollLeft = t.scrollTop = 0),
              this.setPosition(o, i, { withoutCallbacks: !0 });
            var u = window.ResizeObserver;
            "function" == typeof u &&
              ((this._observer = new u(function () {
                n.update();
              })),
              this._observer.observe(r)),
              ht.set(t, this),
              requestAnimationFrame(function () {
                n._init();
              });
          }
          return (
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                for (var t = this.containerEl.parentElement; t; ) {
                  var e = ht.get(t);
                  if (e) return e;
                  t = t.parentElement;
                }
                return null;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "scrollTop", {
              get: function () {
                return this.offset.y;
              },
              set: function (t) {
                this.setPosition(this.scrollLeft, t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "scrollLeft", {
              get: function () {
                return this.offset.x;
              },
              set: function (t) {
                this.setPosition(t, this.scrollTop);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getSize = function () {
              return (function (t) {
                var e = t.containerEl,
                  n = t.contentEl,
                  r = getComputedStyle(e),
                  o = [
                    "paddingTop",
                    "paddingBottom",
                    "paddingLeft",
                    "paddingRight",
                  ].map(function (t) {
                    return r[t] ? parseFloat(r[t]) : 0;
                  }),
                  i = o[0] + o[1],
                  u = o[2] + o[3];
                return {
                  container: { width: e.clientWidth, height: e.clientHeight },
                  content: {
                    width: n.offsetWidth - n.clientWidth + n.scrollWidth + u,
                    height:
                      n.offsetHeight - n.clientHeight + n.scrollHeight + i,
                  },
                };
              })(this);
            }),
            (t.prototype.update = function () {
              !(function (t) {
                var e = t.getSize(),
                  n = {
                    x: Math.max(e.content.width - e.container.width, 0),
                    y: Math.max(e.content.height - e.container.height, 0),
                  },
                  r = t.containerEl.getBoundingClientRect(),
                  o = {
                    top: Math.max(r.top, 0),
                    right: Math.min(r.right, window.innerWidth),
                    bottom: Math.min(r.bottom, window.innerHeight),
                    left: Math.max(r.left, 0),
                  };
                (t.size = e),
                  (t.limit = n),
                  (t.bounding = o),
                  t.track.update(),
                  t.setPosition();
              })(this),
                this._plugins.forEach(function (t) {
                  t.onUpdate();
                });
            }),
            (t.prototype.isVisible = function (t) {
              return (function (t, e) {
                var n = t.bounding,
                  r = e.getBoundingClientRect(),
                  o = Math.max(n.top, r.top),
                  i = Math.max(n.left, r.left),
                  u = Math.min(n.right, r.right);
                return o < Math.min(n.bottom, r.bottom) && i < u;
              })(this, t);
            }),
            (t.prototype.setPosition = function (t, e, n) {
              var r = this;
              void 0 === t && (t = this.offset.x),
                void 0 === e && (e = this.offset.y),
                void 0 === n && (n = {});
              var o = (function (t, e, n) {
                var r = t.options,
                  o = t.offset,
                  u = t.limit,
                  c = t.track,
                  a = t.contentEl;
                return (
                  r.renderByPixels &&
                    ((e = Math.round(e)), (n = Math.round(n))),
                  (e = A(e, 0, u.x)),
                  (n = A(n, 0, u.y)),
                  e !== o.x && c.xAxis.show(),
                  n !== o.y && c.yAxis.show(),
                  r.alwaysShowTracks || c.autoHideOnIdle(),
                  e === o.x && n === o.y
                    ? null
                    : ((o.x = e),
                      (o.y = n),
                      U(a, {
                        "-transform":
                          "translate3d(" + -e + "px, " + -n + "px, 0)",
                      }),
                      c.update(),
                      { offset: i({}, o), limit: i({}, u) })
                );
              })(this, t, e);
              o &&
                !n.withoutCallbacks &&
                this._listeners.forEach(function (t) {
                  t.call(r, o);
                });
            }),
            (t.prototype.scrollTo = function (t, e, n, r) {
              void 0 === t && (t = this.offset.x),
                void 0 === e && (e = this.offset.y),
                void 0 === n && (n = 0),
                void 0 === r && (r = {}),
                (function (t, e, n, r, o) {
                  void 0 === r && (r = 0);
                  var i = void 0 === o ? {} : o,
                    u = i.easing,
                    c = void 0 === u ? J : u,
                    a = i.callback,
                    s = t.options,
                    f = t.offset,
                    l = t.limit;
                  s.renderByPixels &&
                    ((e = Math.round(e)), (n = Math.round(n)));
                  var p = f.x,
                    h = f.y,
                    d = A(e, 0, l.x) - p,
                    v = A(n, 0, l.y) - h,
                    y = Date.now();
                  cancelAnimationFrame($.get(t)),
                    (function e() {
                      var n = Date.now() - y,
                        o = r ? c(Math.min(n / r, 1)) : 1;
                      if ((t.setPosition(p + d * o, h + v * o), n >= r))
                        "function" == typeof a && a.call(t);
                      else {
                        var i = requestAnimationFrame(e);
                        $.set(t, i);
                      }
                    })();
                })(this, t, e, n, r);
            }),
            (t.prototype.scrollIntoView = function (t, e) {
              void 0 === e && (e = {}),
                (function (t, e, n) {
                  var r = void 0 === n ? {} : n,
                    o = r.alignToTop,
                    i = void 0 === o || o,
                    u = r.onlyScrollIfNeeded,
                    c = void 0 !== u && u,
                    a = r.offsetTop,
                    s = void 0 === a ? 0 : a,
                    f = r.offsetLeft,
                    l = void 0 === f ? 0 : f,
                    p = r.offsetBottom,
                    h = void 0 === p ? 0 : p,
                    d = t.containerEl,
                    v = t.bounding,
                    y = t.offset,
                    m = t.limit;
                  if (e && d.contains(e)) {
                    var g = e.getBoundingClientRect();
                    if (!c || !t.isVisible(e)) {
                      var b = i ? g.top - v.top - s : g.bottom - v.bottom + h;
                      t.setMomentum(g.left - v.left - l, A(b, -y.y, m.y - y.y));
                    }
                  }
                })(this, t, e);
            }),
            (t.prototype.addListener = function (t) {
              if ("function" != typeof t)
                throw new TypeError(
                  "[smooth-scrollbar] scrolling listener should be a function"
                );
              this._listeners.add(t);
            }),
            (t.prototype.removeListener = function (t) {
              this._listeners.delete(t);
            }),
            (t.prototype.addTransformableMomentum = function (t, e, n, r) {
              this._updateDebounced();
              var o = this._plugins.reduce(
                  function (t, e) {
                    return e.transformDelta(t, n) || t;
                  },
                  { x: t, y: e }
                ),
                i = !this._shouldPropagateMomentum(o.x, o.y);
              i && this.addMomentum(o.x, o.y), r && r.call(this, i);
            }),
            (t.prototype.addMomentum = function (t, e) {
              this.setMomentum(this._momentum.x + t, this._momentum.y + e);
            }),
            (t.prototype.setMomentum = function (t, e) {
              0 === this.limit.x && (t = 0),
                0 === this.limit.y && (e = 0),
                this.options.renderByPixels &&
                  ((t = Math.round(t)), (e = Math.round(e))),
                (this._momentum.x = t),
                (this._momentum.y = e);
            }),
            (t.prototype.updatePluginOptions = function (t, e) {
              this._plugins.forEach(function (n) {
                n.name === t && Object.assign(n.options, e);
              });
            }),
            (t.prototype.destroy = function () {
              var t = this.containerEl,
                e = this.contentEl;
              !(function (t) {
                var e = C.get(t);
                e &&
                  (e.forEach(function (t) {
                    var e = t.elem,
                      n = t.eventName,
                      r = t.handler;
                    e.removeEventListener(n, r, N());
                  }),
                  C.delete(t));
              })(this),
                this._listeners.clear(),
                this.setMomentum(0, 0),
                cancelAnimationFrame(this._renderID),
                this._observer && this._observer.disconnect(),
                ht.delete(this.containerEl);
              for (var n = Array.from(e.childNodes); t.firstChild; )
                t.removeChild(t.firstChild);
              n.forEach(function (e) {
                t.appendChild(e);
              }),
                U(t, { overflow: "" }),
                (t.scrollTop = this.scrollTop),
                (t.scrollLeft = this.scrollLeft),
                this._plugins.forEach(function (t) {
                  t.onDestroy();
                }),
                (this._plugins.length = 0);
            }),
            (t.prototype._init = function () {
              var t = this;
              this.update(),
                Object.keys(r).forEach(function (e) {
                  r[e](t);
                }),
                this._plugins.forEach(function (t) {
                  t.onInit();
                }),
                this._render();
            }),
            (t.prototype._updateDebounced = function () {
              this.update();
            }),
            (t.prototype._shouldPropagateMomentum = function (t, e) {
              void 0 === t && (t = 0), void 0 === e && (e = 0);
              var n = this.options,
                r = this.offset,
                o = this.limit;
              if (!n.continuousScrolling) return !1;
              0 === o.x && 0 === o.y && this._updateDebounced();
              var i = A(t + r.x, 0, o.x),
                u = A(e + r.y, 0, o.y),
                c = !0;
              return (
                (c = (c = c && i === r.x) && u === r.y) &&
                (r.x === o.x || 0 === r.x || r.y === o.y || 0 === r.y)
              );
            }),
            (t.prototype._render = function () {
              var t = this._momentum;
              if (t.x || t.y) {
                var e = this._nextTick("x"),
                  n = this._nextTick("y");
                (t.x = e.momentum),
                  (t.y = n.momentum),
                  this.setPosition(e.position, n.position);
              }
              var r = i({}, this._momentum);
              this._plugins.forEach(function (t) {
                t.onRender(r);
              }),
                (this._renderID = requestAnimationFrame(
                  this._render.bind(this)
                ));
            }),
            (t.prototype._nextTick = function (t) {
              var e = this.options,
                n = this.offset,
                r = this._momentum,
                o = n[t],
                i = r[t];
              if (Math.abs(i) <= 0.1) return { momentum: 0, position: o + i };
              var u = i * (1 - e.damping);
              return (
                e.renderByPixels && (u |= 0),
                { momentum: u, position: o + i - u }
              );
            }),
            u([L(100, { leading: !0 })], t.prototype, "_updateDebounced", null),
            t
          );
        })(),
        vt = "smooth-scrollbar-style",
        yt = !1;
      function mt() {
        if (!yt && "undefined" != typeof window) {
          var t = document.createElement("style");
          (t.id = vt),
            (t.textContent =
              "\n[data-scrollbar] {\n  display: block;\n  position: relative;\n}\n\n.scroll-content {\n  display: flow-root;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.scrollbar-track {\n  position: absolute;\n  opacity: 0;\n  z-index: 1;\n  background: rgba(222, 222, 222, .75);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 0.5s 0.5s ease-out;\n          transition: opacity 0.5s 0.5s ease-out;\n}\n.scrollbar-track.show,\n.scrollbar-track:hover {\n  opacity: 1;\n  -webkit-transition-delay: 0s;\n          transition-delay: 0s;\n}\n\n.scrollbar-track-x {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 8px;\n}\n.scrollbar-track-y {\n  top: 0;\n  right: 0;\n  width: 8px;\n  height: 100%;\n}\n.scrollbar-thumb {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 8px;\n  height: 8px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 4px;\n}\n"),
            document.head && document.head.appendChild(t),
            (yt = !0);
        }
      }
      n.d(e, "ScrollbarPlugin", function () {
        return nt;
      });
      var gt = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (function (t, e) {
            function n() {
              this.constructor = t;
            }
            o(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          })(e, t),
          (e.init = function (t, e) {
            if (!t || 1 !== t.nodeType)
              throw new TypeError(
                "expect element to be DOM Element, but got " + t
              );
            return mt(), ht.has(t) ? ht.get(t) : new dt(t, e);
          }),
          (e.initAll = function (t) {
            return Array.from(
              document.querySelectorAll("[data-scrollbar]"),
              function (n) {
                return e.init(n, t);
              }
            );
          }),
          (e.has = function (t) {
            return ht.has(t);
          }),
          (e.get = function (t) {
            return ht.get(t);
          }),
          (e.getAll = function () {
            return Array.from(ht.values());
          }),
          (e.destroy = function (t) {
            var e = ht.get(t);
            e && e.destroy();
          }),
          (e.destroyAll = function () {
            ht.forEach(function (t) {
              t.destroy();
            });
          }),
          (e.use = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            return function () {
              for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
              t.forEach(function (t) {
                var e = t.pluginName;
                if (!e) throw new TypeError("plugin name is required");
                rt.order.add(e), (rt.constructors[e] = t);
              });
            }.apply(void 0, t);
          }),
          (e.attachStyle = function () {
            return mt();
          }),
          (e.detachStyle = function () {
            return (function () {
              if (yt && "undefined" != typeof window) {
                var t = document.getElementById(vt);
                t && t.parentNode && (t.parentNode.removeChild(t), (yt = !1));
              }
            })();
          }),
          (e.version = "8.7.4"),
          (e.ScrollbarPlugin = nt),
          e
        );
      })(dt);
      e.default = gt;
    },
  ]).default;
});
("use strict");
(function ($) {
  var items = [],
    current = 0;

  /* Callbacks */
  var OnStep = function (Percent) {};
  var OnComplete = function () {};

  // Get all images from css and <img> tag
  var getImages = function (element) {
    $(element)
      .find("*:not(script)")
      .each(function () {
        var url = "";

        if (
          $(this).css("background-image").indexOf("none") == -1 &&
          $(this).css("background-image").indexOf("-gradient") == -1
        ) {
          url = $(this).css("background-image");
          if (url.indexOf("url") != -1) {
            var temp = url.match(/url\((.*?)\)/);
            url = temp[1].replace(/\"/g, "");
          }
        } else if (
          $(this).get(0).nodeName.toLowerCase() == "img" &&
          typeof $(this).attr("src") != "undefined"
        ) {
          url = $(this).attr("src");
        }

        if (url.length > 0) {
          items.push(url);
        }
      });
  };

  var loadComplete = function () {
    current++;

    OnStep(Math.round((current / items.length) * 100));

    if (current == items.length) {
      OnComplete();
    }
  };

  var loadImg = function (url) {
    $(new Image())
      .on("load", loadComplete)
      .on("error", loadComplete)
      .attr("src", url);
  };

  $.fn.DEPreLoad = function (options) {
    return this.each(function () {
      /* Set Callbacks */
      if (typeof options.OnStep !== "undefined") OnStep = options.OnStep;
      if (typeof options.OnComplete !== "undefined")
        OnComplete = options.OnComplete;

      getImages(this);

      for (var i = 0; i < items.length; i++) {
        loadImg(items[i]);
      }
    });
  };
})(jQuery);
("use strict");
var app = app !== undefined ? app : {};
var $layout_break_point = 1200;
var $grid;
var gridCache = [];
var lazyloadImages;
var currentDeal = "";
var body = document.querySelector("body");
var $body = jQuery("body");
var bodyScrollBar;
var scrollPositionX = 0;
var scrollPositionY = 0;
var scrollBarOption = {
  damping: 0.06,
  delegateTo: document,
  continuousScrolling: true,
  renderByPixels: true,
  syncCallbacks: true,
};
var Scrollbar = window.Scrollbar;
var headerSearch = false;
var header = document.getElementsByTagName("header")[0];
(function ($) {
  app.events = function () {
    // $(document).on('click', '[data-slick-nav]', app.slickDummyNav);
    $(document).on("click", ".js-hb", app.hbHandler);
    $(document).on("click", ".js-toggle", app.footerToggle);
    // $(document).on('click', ".js-toggle-btn", app.toggleSlide)
    $(document).on("click", ".nav .nav-link-mobile", app.navLink);
    // $(document).on('click', "[data-link='spy']", app.spy)
    $(document).on("click", "a[href*='#']", app.spy);
    // $(document).on('click', "[data-link='media-filter']", app.mediaFilter)
    // $(document).on('change', ".js-form-item-gallery-type input", app.initMesonry)
    $(document).on(
      "click",
      ".js-grid-gallery [data-toggle='light-box']",
      app.gridGallery
    );
    $(document).on("click", "[data-toggle='openmodal']", app.openModal);
    $(document).on("click", "[data-toggle='static-item']", app.staticFilter);
    $(document).on("change", "input.deals-filter-opt", app.setCurrentDeal);
    $(document).on("click", ".js-search-trigger", app.searchHandler);
    $(document).on("click", ".js-open-booking-modal", app.bookingModal);
    $(document).ajaxComplete(function (event, xhr, option) {
      setTimeout(function () {
        if ($(".deals-slider-new").length > 0) {
          console.log("test");
          app.slickInit();
        }
      }, 100);

      if (option.extraData && option.extraData.view_display_id) {
        if (
          option.extraData.view_display_id.includes("the_shops_by_category")
        ) {
          // Remove the existing modal
          $(".scroll-content > #modalChef").remove();
          // move the new filtered modal to body
          app.moveElementPosition(".js-move-to-body", "body");
          app.modalSlick();
        }
        if (
          option.extraData.view_display_id.includes(
            "play_by_content_list_sub_category"
          )
        ) {
          // Remove the existing modal
          $(".scroll-content > .js-modal").remove();
          // move the new filtered modal to body
          app.moveElementPosition(".js-move-to-body", "body");
          app.modalSlick();
        }
        if (
          option.extraData.view_display_id.includes("gallery") ||
          option.extraData.view_display_id.includes("the_shops_by_category") ||
          option.extraData.view_display_id.includes("dining_list_by_category")
        ) {
          bodyScrollBar.scrollTo(0, bodyScrollBar.offset.y + 1, 300);
          app.lazyCheck();
          app.initMesonry();
        }
        if (option.extraData.view_display_id.includes("deals_by_category")) {
          var current_deal = "";
          if (
            option.extraData.view_display_id == "block_reward_deals_by_category"
          ) {
            var current_deal = "reward-deals";
          } else if (
            option.extraData.view_display_id == "block_dine_deals_by_category"
          ) {
            var current_deal = "dine-deals";
          } else if (
            option.extraData.view_display_id == "block_event_deals_by_category"
          ) {
            var current_deal = "event-deals";
          } else if (
            option.extraData.view_display_id == "block_stay_deals_by_category"
          ) {
            var current_deal = "stay-deals";
          } else if (
            option.extraData.view_display_id == "block_shop_deals_by_category"
          ) {
            var current_deal = "shop-deals";
          } else if (
            option.extraData.view_display_id ==
            "block_wellness_deals_by_category"
          ) {
            var current_deal = "wellness-deals";
          }

          if (current_deal != "") {
            bodyScrollBar.scrollTo(0, bodyScrollBar.offset.y + 1, 300);
            app.lazyCheck();
            var target = $(".slick[data-deals-source=" + current_deal + "]");
            app.reInitSlick(target[0]);
            //currentDeal = "";
          }
        }
        if (option.extraData.view_display_id.includes("gallery_filters")) {
          app.removeLeadingModal();
        }
      }
      bodyScrollBar.scrollTo(0, bodyScrollBar.offset.y + 1, 300);
    });
  };
  app.removeLeadingModal = function () {
    var element = $("#loadModal.modal");
    for (var i = 0; i < element.length - 1; ++i) {
      element[i].remove();
    }
  };
  app.searchHandler = function (event) {
    var ele = $(event.target).find(".icon");
    var target = $(".js-searchBar");
    if (headerSearch) {
      target.fadeOut();
      app.smoothScroll();
      headerSearch = false;
      header.classList.remove("set-fixed");
    } else {
      target.fadeIn();
      app.disableSmoothScroll();
      headerSearch = true;
      header.classList.add("set-fixed");
    }
  };
  app.setCurrentDeal = function (event) {
    currentDeal = event.target.getAttribute("data-deals-source");
  };
  app.staticFilter = function (event) {
    event.preventDefault();

    var $ele = $(event.target),
      target = $ele.attr("data-target"),
      items = $ele.attr("href");
    $ele.parent().siblings().removeClass("active");
    $ele.parent().addClass("active");
    $(target).find(".js-filter-item").hide();
    $(target)
      .find("[data-item=" + items + "]")
      .show();
  };
  app.openModal = function ($event) {
    $event.preventDefault();
    var ele = $($event.target),
      modal = ele.attr("href");
    initSlide = ele.attr("data-index");
    $(modal).modal("show");
  };
  app.reload = function ($container, items) {
    $container.empty();
    $(items).each(function () {
      $($container).append($(this).removeAttr("style"));
    });
    $container.masonry("reloadItems");
    $container.masonry();
  };
  // app.mediaFilter = function (event) {
  //   event.preventDefault();
  //   var $ele = $(event.target),
  //     parent = $ele.attr("data-parent"),
  //     type = $ele.attr("href");
  //   $container = $(parent).find(".grid-gallery");

  //   // Active selector
  //   $ele.parent().siblings().removeClass("active");
  //   $ele.parent().addClass("active");

  //   var matchItems;

  //   // check selection type
  //   if (type !== "all") {
  //     matchItems = app.filterItems(type);
  //   } else {
  //     matchItems = gridCache;
  //   }
  //   app.reload($container, matchItems);
  // };

  app.scrollToView = function (id) {
    if (id != "" && typeof id != "undefined") {
      var ele = document.getElementById(id);
      if (ele) {
        var offset = ele.getAttribute("data-spy-offset")
          ? ele.getAttribute("data-spy-offset")
          : 0;
        bodyScrollBar.scrollIntoView(ele, { offsetTop: offset });
      }
    }
  };
  app.checkSpy = function () {
    var location = window.location.href;
    var targetEle = location.split("#")[1];
    app.scrollToView(targetEle);
  };
  app.spy = function (event) {
    // event.preventDefault();
    var href = $(event.target).attr("href");
    if (typeof href !== "undefined" && href !== false) {
      var id = event.target.getAttribute("href").split("#")[1];
      if (id !== "") app.scrollToView(id);
    }
  };
  app.is_touch_enabled = function () {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };
  app.cacheGrid = function () {
    gridCache = [];
    $(".grid-gallery")
      .find(".grid-item")
      .each(function () {
        gridCache.push($(this));
      });
  };
  app.filterItems = function (select) {
    var result = [];
    $(gridCache).each(function (item) {
      if (gridCache[item].is("[data-filter*='" + select + "']")) {
        if ($.inArray(gridCache[item], result) === -1)
          result.push(gridCache[item]);
      }
    });
    return result;
  };
  app.initMesonry = function () {
    var $container = $(".grid-gallery");

    // Init masonry
    $container.imagesLoaded(function () {
      setTimeout(function () {
        $container.masonry({
          itemSelector: ".grid-item",
          percentPosition: true,
          gutter: 25,
          horizontalOrder: true,
          transitionDuration: 0,
        });
      }, 250);
    });
  };
  app.imgGrid = function () {
    app.cacheGrid();

    app.initMesonry();
  };

  app.resetMobileNav = function () {
    $(".nav").find(".nav-link").removeClass("open");
    $(".nav").find(".js-megamenu").slideUp();
  };
  app.navLink = function (event) {
    // app.is_touch_enabled ? event.preventDefault() : null;

    var ww = $(window).width(),
      $ele = $(event.target);
    ww <= $layout_break_point && $ele.parent().hasClass("has-megamenu")
      ? event.preventDefault()
      : null;

    if ($ele.parent(".nav-link").hasClass("open")) {
      $ele.parent(".nav-link").removeClass("open");
      $ele.parent(".nav-link").next(".js-megamenu").slideUp();
    } else {
      app.resetMobileNav();
      $ele.parent(".nav-link").addClass("open");
      $ele.parent(".nav-link").next(".js-megamenu").slideDown();
    }
  };
  app.toggleSlide = function (event) {
    var ele = event.target,
      $ele = $(ele),
      target = $ele.attr("data-target");
    $(target).slideToggle();
    $ele.toggleClass("open");
  };
  app.closeAllFooterTabs = function (ele) {
    var parent = ele.closest("footer");
    parent.find(".js-toggle").removeClass("open");
    parent.find(".toggle-menu").slideUp();
  };
  app.footerToggle = function (event) {
    if ($(window).width() <= 1199) {
      var ele = event.target,
        $ele = $(ele);
      if ($ele.hasClass("open")) {
        $ele.next(".js-toggle-menu").slideUp();
        $ele.removeClass("open");
      } else {
        app.closeAllFooterTabs($ele);
        $ele.next(".js-toggle-menu").slideDown();
        $ele.addClass("open");
      }
    }
  };
  app.hbHandler = function (event) {
    event.preventDefault();
    app.resetMobileNav();
    var ele = event.target,
      $ele = $(ele),
      target = $ele.attr("data-target");
    $(target).hasClass("active")
      ? app.smoothScroll()
      : app.disableSmoothScroll();
    $(target).toggleClass("active");
    console.log("click menu");
  };
  app.modalSlickHtml = function (items) {
    // console.log(items)

    var slick = "<div class='slick-big slick-modal'>",
      thumb = "<div class='slick-thumb slick-modal'>";

    items.each(function (i, item) {
      var $item = $(item),
        type = $item.attr("data-type");
      var _img = $item.find("img").attr("src");
      var large = $item.find("img").attr("data-image-large");
      var thumb_small = $item.find("img").attr("data-image-thumb");

      var img = "";
      var _thumb = "";

      typeof large !== "undefined" && large !== false
        ? (img = large)
        : (img = _img);
      typeof thumb_small !== "undefined" && thumb_small !== false
        ? (_thumb = thumb_small)
        : (_thumb = _img);
      var $class = $item.attr("class");

      if (type.toLowerCase() == "photos" || type.toLowerCase() == "photo") {
        var info = $item.find(".slide-info");
        if (info.length) {
          slick +=
            "<div class='" +
            $class +
            " slick-item'><img src='" +
            img +
            "' alt='' />" +
            info[0].outerHTML +
            "</div>";
        } else {
          slick +=
            "<div class='" +
            $class +
            " slick-item'><img src='" +
            img +
            "' alt='' /></div>";
        }
      }
      if (type.toLowerCase() == "videos" || type.toLowerCase() == "video") {
        var vId = $item.attr("data-vid");
        if (vId.indexOf("facebook") > -1) {
          slick +=
            "<div class='" +
            $class +
            " slick-item'><div class='embed'><iframe src='' data-src='" +
            vId +
            "' width='500' height='280' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowfullscreen='true' allow='autoplay, clipboard-write; encrypted-media; picture-in-picture; web-share' allowFullScreen='true'></iframe></div></div>";
        } else {
          slick +=
            "<div class='" +
            $class +
            " slick-item'><div class='embed'><iframe width='560' height='315' data-src='" +
            vId +
            "?autoplay=1' src='' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen=''></iframe></div></div>";
        }
      }

      thumb +=
        "<div class='slick-item'><img src='" + _thumb + "' alt='' /></div>";
    });
    slick += "</div>";
    thumb += "</div>";

    return slick + thumb;
  };
  app.commonLoader = function (status) {
    var html = "<div class='c_loader'>Loading...</div>";
    if (status) {
      $body.append(html);
    } else {
      $body.find(".c_loader").fadeOut(2000, function () {
        $body.find(".c_loader").remove();
      });
    }
  };
  app.gridGallery = function (event) {
    var $ele = $(event.target);
    $ele.addClass("js-init-slide");
    var visibleItems = $ele.parent().find('[data-toggle="light-box"]:visible');
    var buildHtml = app.modalSlickHtml(visibleItems);
    var $modal = $("#loadModal");
    $modal.find(".modal-body").html("");
    $modal.find(".modal-body").append(buildHtml);
    app.commonLoader(true);
    $modal.imagesLoaded().always(function () {
      app.commonLoader(false);
      $modal.modal("show");
    });
    $modal.on("shown.bs.modal", function () {
      // app.disableSmoothScroll();
      setTimeout(function () {
        $ele.removeClass("js-init-slide");
      }, 1000);
    });
    $modal.on("hide.bs.modal", function () {
      // app.smoothScroll();
    });
  };
  app.videoModalOpen = function (modal) {
    var iframe = modal.find("iframe");
    iframe.attr("src", iframe.attr("data-src"));
  };
  app.videoModalClose = function (modal) {
    var iframe = modal.find("iframe");
    iframe.attr("src", "");
  };

  app.modalType = function (modal) {
    var modalType = modal.attr("data-type");
    if (typeof modalType !== "undefined" && modalType !== false) {
      return modalType;
    }
  };

  var initSlide = 0;
  app.defaultSlider = function (modal) {
    modal.find(".slick-default").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      accessibility: false,
      adaptiveHeight: true,
      initialSlide: initSlide,
    });
  };
  app.modalSlick = function () {
    var activeSlide,
      $modal = $('.modal[role="dialog"]');
    $modal.on("show.bs.modal", function () {
      bodyScrollBar.updatePluginOptions("modal", { open: true });
      setTimeout(() => {
        $(".modal-backdrop").hide();
        $(".modal").css("background", "rgba(0,0,0,0.7)");
        $(".modal").css("height", "100vh");
        var yPos = getTranslate3d($(".scroll-content")[0])[1];
        console.log(yPos);
        $(".modal").css("top", Math.abs(yPos.split("px")[0]));
      }, 100);
    });

    function getTranslate3d(el) {
      var values = el.style.transform.split(/\w+\(|\);?/);
      if (!values[1] || !values[1].length) {
        return [];
      }
      return values[1].split(/,\s?/g);
    }

    $modal.on("shown.bs.modal", function ($event) {
      var modalContainer = $($event.target);

      if (app.modalType(modalContainer) === "single-video") {
        app.videoModalOpen(modalContainer);
      }

      if (modalContainer.find(".slick-modal").length) {
        var slideBig = modalContainer.find(".slick-modal.slick-big");
        var slideSmall = modalContainer.find(".slick-modal.slick-thumb");

        var targetEle = slideBig.find(".slick-item.js-init-slide");
        var index = slideBig.find(".slick-item").index(targetEle);

        initSlide = initSlide == 0 ? (index > 0 ? index : 0) : initSlide;
        var slideImg = slideBig
          .on("init", function (event, slick) {
            slideBig.fadeIn(1000);
            var currentSlide = slick.currentSlide;
            // var targetEle = slideBig.find('.slick-item.js-init-slide');
            // var index = slideBig.find('.slick-item').index(targetEle)
            app.updateVideoSlide(slick.$slider, currentSlide);
          })
          .slick({
            asNavFor: slideSmall,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            accessibility: false,
            adaptiveHeight: true,
            // variableWidth: true,
            initialSlide: initSlide,
          })
          .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            activeSlide = currentSlide;
          })
          .on("afterChange", function (event, slick, currentSlide) {
            if (activeSlide != currentSlide) {
              app.updateVideoSlide(slick.$slider, currentSlide);
            }
          });
        var slideThumb = slideSmall
          .on("init", function (slick) {
            slideSmall.fadeIn(1000);
          })
          .slick({
            slidesToShow: 11,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            focusOnSelect: true,
            centerMode: false,
            asNavFor: slideBig,
            initialSlide: initSlide,
            responsive: [
              {
                breakpoint: 1600,
                settings: { slidesToShow: 9, slidesToScroll: 1 },
              },
              {
                breakpoint: 1200,
                settings: { slidesToShow: 5, slidesToScroll: 1 },
              },
              {
                breakpoint: 567,
                settings: { slidesToShow: 3, slidesToScroll: 1 },
              },
            ],
          })
          .on("setPosition", function (slick) {
            var slickObj = slideThumb[0].slick;
            var totalItems = slickObj.slideCount,
              toBeshown = slickObj.options.slidesToShow,
              trace = $(slideThumb[0]).find(".slick-track");
            totalItems < toBeshown
              ? trace.addClass("no-slide")
              : trace.removeClass("no-slide");
          });

        setTimeout(function () {
          slideThumb.slick("slickGoTo", initSlide);
        }, 0);
      }
    });
    $modal.on("hidden.bs.modal", function ($event) {
      // Enable smooth on modal hide
      bodyScrollBar.updatePluginOptions("modal", { open: false });
      $(".scroll-content").css("height", "auto");
      var modalContainer = $($event.target);
      if (app.modalType(modalContainer) === "single-video") {
        app.videoModalClose(modalContainer);
      }

      if (modalContainer.find(".slick-modal").hasClass("slick-initialized")) {
        modalContainer.find(".slick-modal").slick("unslick");
        modalContainer.find(".slick-modal").removeAttr("style");
      }
      modalContainer.find(".slick-item iframe").attr("src", "");

      // Reset initial slide
      initSlide = 0;
      $(".c_loader").hide();
    });
  };
  app.updateVideoSlide = function (slider, current) {
    if (slider.find(".slick-item iframe").length) {
      slider.find(".slick-item iframe").attr("src", "");
      var currentslide = $(slider.find(".slick-item")[current]),
        iframe = currentslide.find("iframe")[0];
      if (iframe) {
        currentslide.prepend("<div class='loader'>Loading...</div>");
        var videoURL = iframe.getAttribute("data-src");
        currentslide.find("iframe").attr("src", videoURL);
        currentslide.find("iframe").on("load", function () {
          currentslide.find(".loader").fadeOut().remove();
        });
      }
    }
  };
  app.thumbSlideUpdate = function (ele, obj) {
    var totalItems = obj.slideCount,
      toBeshown = obj.options.slidesToShow,
      trace = $(ele).find(".slick-track");
    totalItems < toBeshown
      ? trace.addClass("no-slide")
      : trace.removeClass("no-slide");
  };
  app.hideLoader = function () {
    $("#loader").fadeOut();
  };
  app.loader = function () {
    $("body").DEPreLoad({
      OnStep: function (percent) {
        // $('#loader .progress').css({ "transition": "transform 400ms ease", "-webkit-transition": "transform 400ms ease", "transform": "translate3d(" + (percent - 100) + "%,0,0" });
        $("#loader .js-logo-progress").css({ width: percent + "%" });
      },
      OnComplete: function () {
        app.smoothScroll();
        setTimeout(function () {
          app.hideLoader();
          animation.play();
          app.moveElementPosition(".js-move-to-body", "body");
          app.moveElementPosition(".modal", "body");
          // trigger the scroll
          // To show animation element on load
          bodyScrollBar.scrollTo(0, 1, 500);
          var target = window.location.hash;
          var target = target.replace("#", "");
          if (target) {
            bodyScrollBar.scrollTo(0, bodyScrollBar.offset.y + 1, 100);
          }
        }, 400);
        setTimeout(function () {
          app.checkSpy();
        }, 800);
      },
    });
  };
  app.init = function () {
    app.scrollTo(0, 0);
    app.loader();
    app.events();
    app.lazyCheck();
    app.moveElementPosition(".js-move-to-body", "body");
    app.slickInit();
    app.modalSlick();
    app.is_touch_enabled()
      ? $("body").addClass("touch")
      : $("body").removeClass("touch");
    app.imgGrid();
  };
  app.smoothScroll = function () {
    // To make header over to smoothscroll
    header.classList.remove("set-fixed");
    class ModalPlugin extends Scrollbar.ScrollbarPlugin {
      static pluginName = "modal";
      static defaultOptions = {
        open: false,
      };
      transformDelta(delta) {
        return this.options.open ? { x: 0, y: 0 } : delta;
      }
    }
    Scrollbar.use(ModalPlugin);
    bodyScrollBar = Scrollbar.init(body, scrollBarOption);
    bodyScrollBar.track.xAxis.element.remove();
    bodyScrollBar.addListener(function (status) {
      scrollPositionX = status.offset.x;
      scrollPositionY = status.offset.y;
      header.style.top = scrollPositionY + "px";
      header.style.left = scrollPositionX + "px";
      var bottomGap = window.innerWidth <= 767 ? 150 : 150;
      var chatBottomGap = window.innerWidth <= 767 ? 150 : 80;
      var gttY = scrollPositionY + window.innerHeight - bottomGap;

      var bottomGap_cp = window.innerWidth <= 767 ? 90 : 60;

      var cp_position = scrollPositionY + window.innerHeight - bottomGap_cp;
      $(".scroll-to-top").css({ top: gttY + "px" });
      $(".cookies").css({ top: cp_position + "px" });
      $(".block-local-tasks-block").css({ top: gttY + "px" });
      app.scrollEvents(status.offset);
    });
  };
  app.scrollEvents = function (offset) {
    animation.checkAnimationType(offset);
    app.backToTop(offset);
  };
  app.moveElementPosition = function (selector, targetSelector) {
    var element = $(selector),
      _target = $(targetSelector),
      target = $(".scroll-content");
    if (element.length) {
      if (target.length) {
        element.appendTo(target);
      } else {
        element.appendTo(_target);
      }
    }
  };
  app.slickUpdateOnInit = function (_slick) {
    var slick,
      slidescount = !0;
    var options = _slick.getAttribute("data-slick");
    $(_slick).on("init", function (event, slick) {
      if (slick.slideCount <= slick.options.slidesToShow) {
        slidescount = 0;
      }
      if (slick.slideCount == slick.options.slidesToShow) {
        _slick.classList.add("slide-equal");
      }
      if (slick.slideCount < slick.options.slidesToShow) {
        _slick.classList.add("slide-less");
      }
      // check the slider has single slide
      slick.slideCount < 2 && _slick.classList.add("slide-mono");
    });
    slick = $(_slick).slick(JSON.parse(options));
    slick.on("afterChange", function (event, slick, currentSlide) {
      var slider = slick.$slider[0];
      slick.$slides.each(function (i, ele) {
        var img = $(ele).find("img");
        var src = $(ele).find("img").attr("src");
        if (src == "" || src == null || src == undefined) {
          img.attr("src", img.attr("data-src"));
        }
      });
    });
    // update if slides less then slides To Show value
    if (!slidescount) {
      $(_slick).slick("slickSetOption", "centerMode", false);
    }

    return slick;
  };
  app.reInitSlick = function (_slick) {
    // var slick, slidescount = 1;
    if (!_slick) return;
    app.slickUpdateOnInit(_slick);
    // var options = _slick.getAttribute('data-slick');
    // $(_slick).on("init", function(event, slick){
    //     if(slick.slideCount <= slick.options.slidesToShow){
    //         slidescount = 0
    //         _slick.classList.add("slide-less")
    //     }
    //     // check the slider has single slide
    //     slick.slideCount < 2 && _slick.classList.add("slide-mono")
    // })
    // slick = $(_slick).slick(JSON.parse(options));

    // // update if slides less then slides To Show value
    // if(!slidescount) {
    //     $(_slick).slick('slickSetOption', 'centerMode', false)
    // }
  };
  app.slickInit = function () {
    // var options = $('.slick').data('slick');
    // console.log(options)
    var slick;
    var slickElement = $(".slick");
    if (!slickElement.length) return;
    $(".slick").each(function (i, _slick) {
      slick = app.slickUpdateOnInit(_slick);
      // var options = _slick.getAttribute('data-slick');
      // $(_slick).on("init", function(event, slick){
      //     if(slick.slideCount <= slick.options.slidesToShow){
      //         slidescount = 0
      //         _slick.classList.add("slide-less")
      //     }
      //     // check the slider has single slide
      //     slick.slideCount < 2 && _slick.classList.add("slide-mono")
      // })
      // slick = $(_slick).slick(JSON.parse(options));

      // // update if slides less then slides To Show value
      // if(!slidescount) {
      //     $(_slick).slick('slickSetOption', 'centerMode', false)
      // }
    });
    slick.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      if (slick.options.lazy) {
        var next = $(slick.$slides[nextSlide]);
        if (!next.hasClass("loaded")) next.addClass("slick-loading");
      }
    });
    slick.on("afterChange", function (event, slick, currentSlide) {
      var current = $(slick.$slides[currentSlide]);
      var image = current.find("img")[0];
      var loaded = image.complete && image.naturalHeight !== 0;
      loaded && current.removeClass("slick-loading").addClass("loaded");
    });
  };
  var lazyOption = {
    root: document.getElementsByTagName("BODY")[0],
    rootMargin: "0px 0px 400px 0px",
  };
  app.checkSlick = function (image) {
    var $img = $(image);
    var parent = $img.parent();
    if (
      parent.hasClass("slick-item") ||
      parent.parent().hasClass("slick-item")
    ) {
      var cloned = $img.closest(".slick-track").find(".slick-cloned");
      $.each(cloned, function (i, ele) {
        var img = $(ele).find("img");
        if (img.hasClass("lazy")) {
          img.removeClass("lazy");
          img[0].src = img[0].dataset.src;
        }
      });
    }
    // console.log("parent", parent)
    if (parent.hasClass("grid-item") || parent.parent().hasClass("grid-item")) {
      app.initMesonry();
      // parent.parent().imagesLoaded(function(){
      //     app.initMesonry();
      // })
    }
  };
  app.lazyCallback = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove("lazy");
        observer.unobserve(image);
        app.checkSlick(image);
      }
    });
  };
  app.lazyLoadStatic = function () {
    var lazyloadThrottleTimeout;
    lazyloadImages = $(".lazy");
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = $(window).scrollTop();
      lazyloadImages.each(function () {
        var el = $(this);
        if (el.offset().top < window.innerHeight + scrollTop + 400) {
          var url = el.attr("data-src");
          el.attr("src", url);
          el.removeClass("lazy");
          lazyloadImages = $(".lazy");
        }
      });
      if (lazyloadImages.length == 0) {
        $(document).off("scroll");
        $(window).off("resize");
      }
    }, 20);
  };
  app.lazyCheck = function () {
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(
        app.lazyCallback,
        lazyOption
      );
      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      app.lazyLoadStatic();
      $(document).on("scroll", app.lazyLoadStatic);
      $(window).on("resize", app.lazyLoadStatic);
    }
  };
  app.scrollReachTarget = function (ele, offset) {
    var $ele = $(ele);
    return (
      $ele.offset().top + (offset ? offset : 0) <
      $(window).scrollTop() + $(window).height()
    );
  };
  app.scrollTo = function (x, y) {
    window.onbeforeunload = function () {
      window.scrollTo(x, y);
    };
  };
  app.backToTop = function (offset) {
    app.moveElementPosition(".scroll-to-top", "body");
    var $element = $(".scroll-to-top");
    offset.y >= 200 ? $element.fadeIn() : $element.fadeOut();
  };
  app.calanderPosition = function (e, picker) {
    var ele = picker.element[0].getAttribute("id");
    var calpos = $("#" + ele).attr("data-calpos");
    var calendar = picker.container[0];
    var boxSize = calendar.getBoundingClientRect();
    if (calpos == "down") {
      picker.container.addClass("drop-down");
      setTimeout(function () {
        picker.container.css({
          top: $(e.target).offset().top + bodyScrollBar.offset.y + 50,
          opacity: "1",
        });
      });
    } else {
      setTimeout(function () {
        picker.container.css({
          top:
            $(e.target).offset().top + bodyScrollBar.offset.y - boxSize.height,
          opacity: "1",
        });
      });
    }
  };
  app.checkOpenmodal = function () {
    var modals = $('.modal[role="dialog"]');
    var omodal = false;
    if (modals.length) {
      modals.each(function (i, modal) {
        if (modal.style.display == "block") omodal = true;
        else omodal = false;
      });
    } else {
      omodal = false;
    }
    return omodal;
  };
  app.calanderClose = function (e, picker) {
    if (window.innerWidth < 567) {
      if (app.checkOpenmodal() == false) app.smoothScroll();
    }
    setTimeout(function () {
      picker.container.css({
        opacity: "0",
      });
    }, 50);
  };
  app.disableSmoothScroll = function () {
    // set the header fixed default
    header.classList.add("set-fixed");
    bodyScrollBar.destroy(body);
    //$('.frontpage header').css('top','0');
  };
  app.bookingModal = function () {
    $("#roomPopUpModal").modal("show");
  };
  var picker_e, picker_obj;
  $("#rangeDatePicker, #edit-wf-stay-date")
    .daterangepicker({
      autoApply: true,
      opens: "center",
      drops: "up",
      linkedCalendars: false,
      showCustomRangeLabel: "true",
    })
    .val("")
    .on("show.daterangepicker", function (e, picker) {
      picker_e = e;
      picker_obj = picker;
      app.calanderPosition(e, picker);
      if (window.innerWidth < 567) {
        app.disableSmoothScroll();
      }
    })
    .on(
      "hideCalendar.daterangepicker hide.daterangepicker",
      function (e, picker) {
        app.calanderClose(e, picker);
      }
    );
  $('<p class="calenderLabel calenderLabel--left">Arrival</p>').insertBefore(
    ".drp-calendar.left"
  );
  $('<p class="calenderLabel calenderLabel--right">Departure</p>').insertBefore(
    ".drp-calendar.right"
  );

  $(
    "#dineDatePicker, #eventsDatePicker, #edit-wf-dine-date, #edit-wf-event-date, #edit-wf-enq-req-date"
  )
    .daterangepicker({
      singleDatePicker: true,
      autoApply: true,
      startDate: moment(),
      minDate: moment(),
      opens: "center",
      drops: "up",
    })
    .val("")
    .on("show.daterangepicker", function (e, picker) {
      picker_e = e;
      picker_obj = picker;
      app.calanderPosition(e, picker);
      if (window.innerWidth < 567) {
        if (Scrollbar.has(document.body)) app.disableSmoothScroll();
      }
    })
    .on(
      "hideCalendar.daterangepicker hide.daterangepicker",
      function (e, picker) {
        app.calanderClose(e, picker);
      }
    );
  // $(document).on('click', '.custom-dropdown-js', function(){
  $(document).on("click", ".js-form-type-select", function () {
    $(".custom-dropdown").hide();
    if (
      $(this).parents(".form-group").find(".custom-dropdown").css("display") !=
      "block"
    ) {
      $(this).parents(".form-group").find(".custom-dropdown").show();
    } else {
      $(".custom-dropdown").hide();
    }
  });
  $(document).on("click", ".custom-dropdown li", function () {
    var getVal = $(this).text();
    $(this).parents(".form-group").find(".form-select").val(getVal);
    $(".custom-dropdown").hide();
  });
  $("body").on("click", function () {
    $(".custom-dropdown").hide();
  });
  $(".custom-dropdown-js").on("click", function (e) {
    e.stopImmediatePropagation();
  });

  $(document).on("click", ".scroll-to-top", function () {
    // $("html, body").animate({ scrollTop: 0 }, 800);
    // bodyScrollBar.scrollTop = 0;
    bodyScrollBar.scrollTo(0, 0, 800);
    return false;
  });
  $(document).on("click", "th.next, th.prev", function () {
    app.calanderPosition(picker_e, picker_obj);
  });
  /* Testimonial Start */
  setTimeout(function () {
    var slickHeight = $(".testimonial__slider .slick-track").innerHeight();
    // $(".testimonial__slider .slick-track").find(".testimonial__content").css("height", parseInt(slickHeight-25) + "px");
  }, 2000);

  $(window).on("resize", function (e) {
    $(".testimonial__slider .slick-track")
      .find(".testimonial__content")
      .removeAttr("style");
    var slickHeight = $(".testimonial__slider .slick-track").innerHeight();
    // $(".testimonial__slider .slick-track").find(".testimonial__content").css("height", parseInt(slickHeight-25)  + "px");
  });
  /* Testimonial End */

  $('[data-type="single-video"]').on("hide.bs.modal", function () {
    // $('html, body').animate({scrollTop:0},500);
  });

  app.searchHandler = function (event) {
    var ele = $(event.target).find(".icon");
    var target = $(".js-searchBar");
    if (headerSearch) {
      target.fadeOut();
      bodyScrollBar.updatePluginOptions("modal", { open: false });
      headerSearch = false;
    } else {
      target.fadeIn();
      bodyScrollBar.updatePluginOptions("modal", { open: true });
      headerSearch = true;
    }
  };

  app.hbHandler = function (event) {
    event.preventDefault();
    app.resetMobileNav();
    var ele = event.target,
      $ele = $(ele),
      target = $ele.attr("data-target");
    $(target).hasClass("active")
      ? bodyScrollBar.updatePluginOptions("modal", { open: false })
      : bodyScrollBar.updatePluginOptions("modal", { open: true });
    setTimeout(() => {
      $(".canvas.js-canvas.active").css("height", "100vh");
      var yPos = getTranslate3d($(".scroll-content")[0])[1];
      $(".canvas.js-canvas.active").css("top", Math.abs(yPos.split("px")[0]));
    }, 50);
    function getTranslate3d(el) {
      var values = el.style.transform.split(/\w+\(|\);?/);
      if (!values[1] || !values[1].length) {
        return [];
      }
      return values[1].split(/,\s?/g);
    }
    $(target).toggleClass("active");
  };
})(jQuery);
document.addEventListener("DOMContentLoaded", function (event) {
  app.init();
});

/**
 *  Home page Inline video section
 */

jQuery(document).ready(function () {
  var inlineVideoPlay = function () {
    var ww = document.body.clientWidth;
    jQuery(".fImage").on("click tap touchstart", function (e) {
      if (ww < 991) {
        jQuery(this).hide();
        jQuery(".expand_icon").show();
        jQuery(".no-scroll").trigger("click");

        // var okadavideos_home = "https://www.youtube.com/embed/kOgvERGPS10?autoplay=1&controls=0"
        // jQuery('#video-okada ').show().attr('src', okadavideos_home)
        jQuery(".maindiv .no-scroll-wrapper iframe ").show();
        jQuery(this).closest(".maindiv").toggleClass("expandshadow_section");
        jQuery(".maindiv").toggleClass("shadow");
        jQuery(".ifrm_video").toggleClass("slide-right");
        jQuery(".fImage").hide();
        // jQuery("body").toggleClass("heightauto")
        var yPos = getTranslate3d(jQuery(".scroll-content")[0])[1];
        jQuery(".maindiv").css("top", Math.abs(yPos.split("px")[0]));
        bodyScrollBar.updatePluginOptions("modal", { open: true });
        function getTranslate3d(el) {
          var values = el.style.transform.split(/\w+\(|\);?/);
          if (!values[1] || !values[1].length) {
            return [];
          }
          return values[1].split(/,\s?/g);
        }
      } else if (ww >= 992) {
        jQuery(".no-scroll").trigger("click");
        jQuery(this).hide();
        jQuery(".expand_icon").show();
        jQuery(".maindiv .no-scroll-wrapper iframe").show();

        jQuery(this).closest(".section-image").toggleClass("playing");

        // jQuery("#player_0")[0].src += "&autoplay=1";
        // ev.preventDefault();
        // jQuery('.maindiv .no-scroll-wrapper iframe').addClass('ifrm_video');
        // var okadavideos_home = "https://www.youtube.com/embed/kOgvERGPS10?autoplay=1&controls=0&rel=0"
        // jQuery('ifrm_video ').show().attr('src', okadavideos_home)
      }
    });

    // Expand icon with play
    jQuery(document).on("click", ".expand_icon", function () {
      console.log("test");
      if (ww < 991) {
        jQuery(this).closest(".maindiv").toggleClass("expandshadow_section");
        jQuery(".maindiv").toggleClass("shadow");
        // jQuery('.ifrm_video').toggleClass('slide-right')
        jQuery(".ifrm_video").hide();
        jQuery(".expand_icon").hide();
        jQuery(".maindiv .no-scroll-wrapper iframe ").hide();

        setTimeout(function () {
          jQuery(".fImage").show();
          jQuery(".maindiv").css("top", "0");
          jQuery(".maindiv .no-scroll-wrapper #player_0").each(function () {
            var frame = document.getElementById("player_0");
            frame.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          });
        }, 450);

        var yPos = getTranslate3d(jQuery(".scroll-content")[0])[1];
        jQuery(".maindiv").css("top", Math.abs(yPos.split("px")[0]));
        bodyScrollBar.updatePluginOptions("modal", { open: true });
        function getTranslate3d(el) {
          var values = el.style.transform.split(/\w+\(|\);?/);
          if (!values[1] || !values[1].length) {
            return [];
          }
          return values[1].split(/,\s?/g);
        }
      } else if (ww >= 992) {
        jQuery(".fImage").hide();
        jQuery(this).closest(".maindiv").toggleClass("expandshadow_section");
        jQuery(".maindiv").toggleClass("shadow");
        jQuery(".ifrm_video").toggleClass("slide-right");
        var yPos = getTranslate3d(jQuery(".scroll-content")[0])[1];
        console.log("yPos", yPos);
        jQuery(".maindiv").css("top", Math.abs(yPos.split("px")[0]));
        // }, 50);
        bodyScrollBar.updatePluginOptions("modal", { open: true });
        function getTranslate3d(el) {
          var values = el.style.transform.split(/\w+\(|\);?/);
          if (!values[1] || !values[1].length) {
            return [];
          }
          return values[1].split(/,\s?/g);
        }
      }
    });

    jQuery(document).on(
      "click tap touchstart",
      ".shadow .expand_icon",
      function () {
        if (ww < 991) {
          bodyScrollBar.updatePluginOptions("modal", { open: false });
        } else if (ww >= 992) {
          jQuery("#video-okada").show();
          jQuery(".maindiv").css("top", "0");
          bodyScrollBar.updatePluginOptions("modal", { open: false });
        }
      }
    );
  };

  jQuery(window).resize(function () {
    inlineVideoPlay();
  });

  inlineVideoPlay();
});

("use strict");
var animation = animation != undefined ? animation : {};
(function ($) {
  animation.play = function () {
    animation.header();
    animation.hero();
  };

  animation.header = function () {
    var header = document.querySelectorAll(".js-header > div");
    var nav = document.querySelectorAll(".nav > div");
    var header_reward = document.querySelectorAll(".js-reward");
    anime({
      targets: header,
      easing: "easeOutQuad",
      translateY: ["-120%", 0],
      opacity: [0, 1],
      duration: 1000,
      delay: function (el, i, l) {
        return i * 150;
      },
    });
    anime({
      targets: nav,
      easing: "easeOutQuad",
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: function (el, i, l) {
        return i * 120;
      },
      complete: function (ele) {
        var group = ele.animatables;
        $.each(group, function (i, ele) {
          var ele = $(ele.target);
          $(ele).removeAttr("style");
        });
      },
    });
    anime({
      targets: header_reward,
      easing: "easeOutQuad",
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      complete: function (ele) {
        var group = ele.animatables;
        $.each(group, function (i, ele) {
          var ele = $(ele.target);
          $(ele).removeAttr("style");
        });
      },
    });
  };
  animation.hero = function () {
    var firstItem = $(".slider-hero .slick-item").eq(0);
    var heroImage = firstItem.find("img")[0];
    var h2 = firstItem.find(".h2")[0];
    var desc = firstItem.find("p")[0];
    var heroFilter = document.querySelector(".js-hero-filter");
    animation.fadeIn(heroImage);
    animation.slideUpYSmall(h2);
    animation.slideUpYSmall(desc);
    animation.slideUpYSmall(heroFilter);
  };
  animation.getStaggeritem = function (parent) {
    var child = parent.getAttribute("data-child");
    var targets = child
      ? parent.querySelectorAll(child)
      : parent.querySelectorAll(".slick-item");
    return targets;
  };
  animation.getAnimeValuse = function (target) {
    var values = {};
    values.duration = target.getAttribute("data-duration")
      ? parseInt(target.getAttribute("data-duration"))
      : 2000;
    values.duration = window.innerWidth > 992 ? values.duration : 500;
    values.delay = target.getAttribute("data-delay")
      ? parseInt(target.getAttribute("data-delay"))
      : 100;
    values.easing = target.getAttribute("data-easing")
      ? target.getAttribute("data-easing")
      : "easeOutQuint";
    values.from = target.getAttribute("data-from")
      ? parseInt(target.getAttribute("data-from"))
      : "150";
    return values;
  };
  animation.cardsStaggerBTT = function (target) {
    // var duration = target.getAttribute('data-duration') ? parseInt(target.getAttribute('data-duration')) : 2000,
    // delay = target.getAttribute('data-delay') ? parseInt(target.getAttribute('data-delay')) : 100;
    var values = animation.getAnimeValuse(target);
    var stagger = window.innerWidth > 991 ? 200 : 10;
    anime({
      targets: animation.getStaggeritem(target),
      opacity: [0, 1],
      translateY: [values.from, 0],
      duration: values.duration,
      delay: anime.stagger(stagger, { start: values.delay }),
      easing: values.easing,
    });
  };
  animation.cardsStaggerTTB = function (target) {
    // var duration = target.getAttribute('data-duration') ? parseInt(target.getAttribute('data-duration')) : 2000,
    // delay = target.getAttribute('data-delay') ? parseInt(target.getAttribute('data-delay')) : 100;
    var values = animation.getAnimeValuse(target);
    var stagger = window.innerWidth > 991 ? 200 : 10;
    anime({
      targets: animation.getStaggeritem(target),
      opacity: [0, 1],
      translateY: [values.from, 0],
      duration: values.duration,
      delay: anime.stagger(stagger, { start: values.delay }),
      easing: values.easing,
    });
  };
  animation.cardsStaggerRTL = function (target) {
    // var duration = target.getAttribute('data-duration') ? parseInt(target.getAttribute('data-duration')) : 2000,
    // delay = target.getAttribute('data-delay') ? parseInt(target.getAttribute('data-delay')) : 100;
    var values = animation.getAnimeValuse(target);
    var stagger = window.innerWidth > 991 ? 100 : 10;
    anime({
      targets: animation.getStaggeritem(target),
      opacity: [0, 1],
      translateX: [values.from, 0],
      duration: values.duration,
      delay: anime.stagger(stagger, { start: values.delay }),
      easing: values.easing,
    });
  };
  animation.cardsStaggerRTLBig = function (target) {
    // var duration = target.getAttribute('data-duration') ? parseInt(target.getAttribute('data-duration')) : 2000,
    // delay = target.getAttribute('data-delay') ? parseInt(target.getAttribute('data-delay')) : 100;
    var values = animation.getAnimeValuse(target);
    var stagger = window.innerWidth > 991 ? 100 : 10;
    anime({
      targets: animation.getStaggeritem(target),
      opacity: [0, 1],
      translateX: ["100%", 0],
      duration: values.duration,
      delay: anime.stagger(stagger, { start: values.delay }),
      easing: values.easing,
    });
  };
  animation.bgimage = function (target) {
    var container = target,
      image = container.getElementsByTagName("img")[0],
      duration = container.getAttribute("data-duration")
        ? parseInt(container.getAttribute("data-duration"))
        : 2000;
    duration = window.innerWidth > 991 ? duration : 500;
    anime({
      targets: image,
      scale: image.classList.contains("js-anime-zoom") ? [2, 1] : 1,
      easing: "easeInOutCubic",
      duration: function (ele, i) {
        return duration + 150 * i;
      },
    });
  };
  animation.imageWrapper = function (target) {
    var container = target,
      duration = container.getAttribute("data-duration")
        ? parseInt(container.getAttribute("data-duration"))
        : 2000;
    duration = window.innerWidth > 991 ? duration : 500;
    anime({
      targets: target,
      opacity: [0, 1],
      width: [0, "100%"],
      easing: "easeInOutCubic",
      duration: function (ele, i) {
        return duration + 150 * i;
      },
    });
  };
  animation.imageRevealLTR_small = function (target) {
    animation.imageWrapper(target);
    animation.bgimage(target);
  };
  animation.imageRevealLTR = function (target) {
    animation.imageWrapper(target);
    animation.bgimage(target);
  };

  animation.imageRevealLTR_toRight = function (target) {
    if (window.innerWidth < 1200) return;
    var container = target;
    anime
      .timeline({
        easing: "easeOutExpo",
        loop: false,
      })
      .add({
        targets: target,
        opacity: [0, 1],
        // width: [0, "100%"],
        scaleX: [0, "100%"],
        duration: 1000,
      })
      .add({
        targets: target,
        translateX: [0, "50%"],
        duration: 2000,
      });
  };
  animation.imageRevealRTL_toLeft = function (target) {
    if (window.innerWidth < 1200) return;
    var ww = window.innerWidth;
    var container = target;
    anime
      .timeline({
        easing: "easeOutExpo",
        loop: false,
      })
      .add({
        targets: target,
        opacity: [0, 1],
        // width: [0, "100%"],
        scaleX: [0, "100%"],
        duration: ww > 992 ? 1000 : 200,
      })
      .add({
        targets: target,
        translateX: [0, "-50%"],
        duration: ww > 992 ? 2000 : 200,
      });
  };
  animation.fadeIn = function (target) {
    anime({
      targets: target,
      opacity: [0, 1],
      duration: function (ele, i) {
        var duration = ele.getAttribute("data-duration")
          ? parseInt(ele.getAttribute("data-duration"))
          : 2000;
        return duration + 150 * i;
      },
      delay: function (ele, i) {
        var delay = ele.getAttribute("data-delay")
          ? parseInt(ele.getAttribute("data-delay"))
          : 200;
        return delay + 150 * i;
      },
    });
  };
  animation.slideInBigLTR = function (target) {
    anime({
      targets: target,
      translateX: ["-100%", 0],
      delay: function (ele, i) {
        var delay = ele.getAttribute("data-delay")
          ? parseInt(ele.getAttribute("data-delay"))
          : 1500;
        return delay + 150 * i;
      },
      // easing: function(ele, i){
      //     return ele.getAttribute('data-ease') ? ele.getAttribute('data-ease') : "spring(1, 80, 10, 0)";
      // },
      easing: "easeInOutCubic",
    });
  };
  animation.slideInBigRTL = function (target) {
    anime({
      targets: target,
      translateX: ["100%", 0],
      delay: function (ele, i) {
        var delay = ele.getAttribute("data-delay")
          ? parseInt(ele.getAttribute("data-delay"))
          : 1500;
        return delay + 150 * i;
      },
      // easing: function(ele, i){
      //     return ele.getAttribute('data-ease') ? ele.getAttribute('data-ease') : "spring(1, 80, 10, 0)";
      // },
      easing: "easeInOutCubic",
    });
  };
  animation.slideUpYSmall = function (target) {
    var y = window.innerWidth > 991 ? 40 : 10;
    anime({
      targets: target,
      opacity: [0, 1],
      translateY: [y, 0],
      duration: function (ele, i) {
        var delay = ele.getAttribute("data-duration")
          ? parseInt(ele.getAttribute("data-duration"))
          : 2000;
        delay = window.innerWidth > 991 ? delay : 500;
        return delay + 150 * i;
      },
      delay: function (ele, i) {
        var delay = ele.getAttribute("data-delay")
          ? parseInt(ele.getAttribute("data-delay"))
          : 200;
        delay = window.innerWidth > 991 ? delay : 10;
        return delay + 150 * i;
      },
      easing: "easeOutQuint",
    });
  };
  animation.revealImg = function (target) {
    anime({
      targets: target,
      scale: [1.5, 1],
      opacity: [0, 1],
      duration: 400,
      delay: function (ele, i) {
        // console.log(ele)
        var delay = ele.getAttribute("data-delay")
          ? parseInt(ele.getAttribute("data-delay"))
          : 200;
        // console.log(i)
        return delay + 150 * i;
      },
      easing: "easeOutQuad",
    });
  };
  animation.revealLayerLTR = function (target) {
    anime({
      targets: target,
      easing: "easeOutQuad",
      keyframes: [
        {
          scaleX: [0, 1],
          duration: 240,
          delay: 300,
          transformOrigin: ["100% 0"],
        },
        { scaleX: [1, 0], duration: 480, delay: 50 },
      ],
    });
  };
  animation.zoomIn = function (target) {
    anime({
      targets: target,
      opacity: [0, 1],
      scale: [0.5, 1],
      delay: function (ele, i) {
        var delay = ele.getAttribute("data-delay")
          ? parseInt(ele.getAttribute("data-delay"))
          : 400;
        return delay + 150 * i;
      },
      duration: function (ele, i) {
        var delay = ele.getAttribute("data-duration")
          ? parseInt(ele.getAttribute("data-duration"))
          : 2000;
        return delay + 150 * i;
      },
      easing: function (ele, i) {
        return ele.getAttribute("data-ease")
          ? ele.getAttribute("data-ease")
          : "spring(1, 80, 10, 0)";
      },
    });
  };

  animation.snippet = function (target, type) {
    switch (type) {
      case "fadeIn":
        animation.fadeIn(target);
        break;
      case "slideInBigLTR":
        animation.slideInBigLTR(target);
        break;
      case "slideInBigRTL":
        animation.slideInBigRTL(target);
        break;
      case "slideInUp":
        animation.slideUpYSmall(target);
        break;
      case "imgReveal":
        animation.revealImg(target);
        break;
      case "zoomIn":
        animation.zoomIn(target);
        break;
      case "revealLayerLTR":
        animation.revealLayerLTR(target);
        break;
      case "imageRevealLTR":
        animation.imageRevealLTR(target);
        break;
      case "cardsStaggerRTL":
        animation.cardsStaggerRTL(target);
        break;
      case "cardsStaggerBTT":
        animation.cardsStaggerBTT(target);
        break;
      case "cardsStaggerTTB":
        animation.cardsStaggerTTB(target);
        break;
      case "cardsStaggerRTLBig":
        animation.cardsStaggerRTLBig(target);
        break;
      case "imageRevealLTR_small":
        animation.imageRevealLTR_small(target);
        break;
      case "imageRevealLTR_toRight":
        animation.imageRevealLTR_toRight(target);
        break;
      case "imageRevealRTL_toLeft":
        animation.imageRevealRTL_toLeft(target);
        break;
      default:
    }
  };
  // animation.zoomIn = function(){
  //     var eles = document.querySelectorAll('.js-reveal');
  //     $.each(eles, function(i, ele){
  //         var $ele = $(ele),
  //         img = $ele.find('img')[0];
  //         if(app.scrollReachTarget(ele, 150) && ele.classList.contains('js-reveal')){
  //             animation.revealImg(ele, img);
  //             ele.classList.remove('js-reveal');
  //         }
  //     })
  // }
  animation.checkAnimationType = function () {
    var $elms = $("[data-animation]");
    $.each($elms, function (i, item) {
      var show_at = 100;
      if (item.hasAttribute("data-showat")) {
        show_at = parseInt(item.dataset.showat);
      }
      if (app.scrollReachTarget(item, show_at)) {
        // console.log("item")
        var type = item.dataset.animation;
        animation.snippet(item, type);
        $(item).removeAttr("data-animation");
      }
    });
  };
})(jQuery);
window.addEventListener("scroll", function (e) {
  // animation.checkAnimationType();
});
/**
 * @file
 * Behaviors of Boostrap Layout Builder local video background.
 */

(function ($, _, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.scrollEffectsInit = {
    attach: function (context, settings) {
      AOS.init();
    },
  };
})(window.jQuery, window._, window.Drupal, window.drupalSettings);
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function ($, Drupal) {
  Drupal.theme.progressBar = function (id) {
    return (
      '<div id="'.concat(id, '" class="progress" aria-live="polite">') +
      '<div class="progress__label">&nbsp;</div>' +
      '<div class="progress__track"><div class="progress__bar"></div></div>' +
      '<div class="progress__percentage"></div>' +
      '<div class="progress__description">&nbsp;</div>' +
      "</div>"
    );
  };

  Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
    this.id = id;
    this.method = method || "GET";
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;
    this.element = $(Drupal.theme("progressBar", id));
  };

  $.extend(Drupal.ProgressBar.prototype, {
    setProgress: function setProgress(percentage, message, label) {
      if (percentage >= 0 && percentage <= 100) {
        $(this.element)
          .find("div.progress__bar")
          .css("width", "".concat(percentage, "%"));
        $(this.element)
          .find("div.progress__percentage")
          .html("".concat(percentage, "%"));
      }

      $("div.progress__description", this.element).html(message);
      $("div.progress__label", this.element).html(label);

      if (this.updateCallback) {
        this.updateCallback(percentage, message, this);
      }
    },
    startMonitoring: function startMonitoring(uri, delay) {
      this.delay = delay;
      this.uri = uri;
      this.sendPing();
    },
    stopMonitoring: function stopMonitoring() {
      clearTimeout(this.timer);
      this.uri = null;
    },
    sendPing: function sendPing() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.uri) {
        var pb = this;
        var uri = this.uri;

        if (uri.indexOf("?") === -1) {
          uri += "?";
        } else {
          uri += "&";
        }

        uri += "_format=json";
        $.ajax({
          type: this.method,
          url: uri,
          data: "",
          dataType: "json",
          success: function success(progress) {
            if (progress.status === 0) {
              pb.displayError(progress.data);
              return;
            }

            pb.setProgress(
              progress.percentage,
              progress.message,
              progress.label
            );
            pb.timer = setTimeout(function () {
              pb.sendPing();
            }, pb.delay);
          },
          error: function error(xmlhttp) {
            var e = new Drupal.AjaxError(xmlhttp, pb.uri);
            pb.displayError("<pre>".concat(e.message, "</pre>"));
          },
        });
      }
    },
    displayError: function displayError(string) {
      var error = $('<div class="messages messages--error"></div>').html(
        string
      );
      $(this.element).before(error).hide();

      if (this.errorCallback) {
        this.errorCallback(this);
      }
    },
  });
})(jQuery, Drupal);
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

(function ($, window, Drupal, drupalSettings, _ref) {
  var isFocusable = _ref.isFocusable,
    tabbable = _ref.tabbable;
  Drupal.behaviors.AJAX = {
    attach: function attach(context, settings) {
      function loadAjaxBehavior(base) {
        var elementSettings = settings.ajax[base];

        if (typeof elementSettings.selector === "undefined") {
          elementSettings.selector = "#".concat(base);
        }

        once("drupal-ajax", $(elementSettings.selector)).forEach(function (el) {
          elementSettings.element = el;
          elementSettings.base = base;
          Drupal.ajax(elementSettings);
        });
      }

      Object.keys(settings.ajax || {}).forEach(function (base) {
        return loadAjaxBehavior(base);
      });
      Drupal.ajax.bindAjaxLinks(document.body);
      once("ajax", ".use-ajax-submit").forEach(function (el) {
        var elementSettings = {};
        elementSettings.url = $(el.form).attr("action");
        elementSettings.setClick = true;
        elementSettings.event = "click";
        elementSettings.progress = {
          type: "throbber",
        };
        elementSettings.base = el.id;
        elementSettings.element = el;
        Drupal.ajax(elementSettings);
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === "unload") {
        Drupal.ajax.expired().forEach(function (instance) {
          Drupal.ajax.instances[instance.instanceIndex] = null;
        });
      }
    },
  };

  Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
    var statusCode;
    var statusText;
    var responseText;

    if (xmlhttp.status) {
      statusCode = "\n"
        .concat(Drupal.t("An AJAX HTTP error occurred."), "\n")
        .concat(
          Drupal.t("HTTP Result Code: !status", {
            "!status": xmlhttp.status,
          })
        );
    } else {
      statusCode = "\n".concat(
        Drupal.t("An AJAX HTTP request terminated abnormally.")
      );
    }

    statusCode += "\n".concat(Drupal.t("Debugging information follows."));
    var pathText = "\n".concat(
      Drupal.t("Path: !uri", {
        "!uri": uri,
      })
    );
    statusText = "";

    try {
      statusText = "\n".concat(
        Drupal.t("StatusText: !statusText", {
          "!statusText": xmlhttp.statusText.trim(),
        })
      );
    } catch (e) {}

    responseText = "";

    try {
      responseText = "\n".concat(
        Drupal.t("ResponseText: !responseText", {
          "!responseText": xmlhttp.responseText.trim(),
        })
      );
    } catch (e) {}

    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
    responseText = responseText.replace(/[\n]+\s+/g, "\n");
    var readyStateText =
      xmlhttp.status === 0
        ? "\n".concat(
            Drupal.t("ReadyState: !readyState", {
              "!readyState": xmlhttp.readyState,
            })
          )
        : "";
    customMessage = customMessage
      ? "\n".concat(
          Drupal.t("CustomMessage: !customMessage", {
            "!customMessage": customMessage,
          })
        )
      : "";
    this.message =
      statusCode +
      pathText +
      statusText +
      customMessage +
      responseText +
      readyStateText;
    this.name = "AjaxError";
  };

  Drupal.AjaxError.prototype = new Error();
  Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;

  Drupal.ajax = function (settings) {
    if (arguments.length !== 1) {
      throw new Error(
        "Drupal.ajax() function must be called with one configuration object only"
      );
    }

    var base = settings.base || false;
    var element = settings.element || false;
    delete settings.base;
    delete settings.element;

    if (!settings.progress && !element) {
      settings.progress = false;
    }

    var ajax = new Drupal.Ajax(base, element, settings);
    ajax.instanceIndex = Drupal.ajax.instances.length;
    Drupal.ajax.instances.push(ajax);
    return ajax;
  };

  Drupal.ajax.instances = [];

  Drupal.ajax.expired = function () {
    return Drupal.ajax.instances.filter(function (instance) {
      return (
        instance &&
        instance.element !== false &&
        !document.body.contains(instance.element)
      );
    });
  };

  Drupal.ajax.bindAjaxLinks = function (element) {
    once("ajax", ".use-ajax", element).forEach(function (ajaxLink) {
      var $linkElement = $(ajaxLink);
      var elementSettings = {
        progress: {
          type: "throbber",
        },
        dialogType: $linkElement.data("dialog-type"),
        dialog: $linkElement.data("dialog-options"),
        dialogRenderer: $linkElement.data("dialog-renderer"),
        base: $linkElement.attr("id"),
        element: ajaxLink,
      };
      var href = $linkElement.attr("href");

      if (href) {
        elementSettings.url = href;
        elementSettings.event = "click";
      }

      Drupal.ajax(elementSettings);
    });
  };

  Drupal.Ajax = function (base, element, elementSettings) {
    var defaults = {
      event: element ? "mousedown" : null,
      keypress: true,
      selector: base ? "#".concat(base) : null,
      effect: "none",
      speed: "none",
      method: "replaceWith",
      progress: {
        type: "throbber",
        message: Drupal.t("Please wait..."),
      },
      submit: {
        js: true,
      },
    };
    $.extend(this, defaults, elementSettings);
    this.commands = new Drupal.AjaxCommands();
    this.instanceIndex = false;

    if (this.wrapper) {
      this.wrapper = "#".concat(this.wrapper);
    }

    this.element = element;
    this.element_settings = elementSettings;
    this.elementSettings = elementSettings;

    if (this.element && this.element.form) {
      this.$form = $(this.element.form);
    }

    if (!this.url) {
      var $element = $(this.element);

      if ($element.is("a")) {
        this.url = $element.attr("href");
      } else if (this.element && element.form) {
        this.url = this.$form.attr("action");
      }
    }

    var originalUrl = this.url;
    this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, "/ajax$1");

    if (drupalSettings.ajaxTrustedUrl[originalUrl]) {
      drupalSettings.ajaxTrustedUrl[this.url] = true;
    }

    var ajax = this;
    ajax.options = {
      url: ajax.url,
      data: ajax.submit,
      beforeSerialize: function beforeSerialize(elementSettings, options) {
        return ajax.beforeSerialize(elementSettings, options);
      },
      beforeSubmit: function beforeSubmit(
        formValues,
        elementSettings,
        options
      ) {
        ajax.ajaxing = true;
        return ajax.beforeSubmit(formValues, elementSettings, options);
      },
      beforeSend: function beforeSend(xmlhttprequest, options) {
        ajax.ajaxing = true;
        return ajax.beforeSend(xmlhttprequest, options);
      },
      success: function success(response, status, xmlhttprequest) {
        if (typeof response === "string") {
          response = $.parseJSON(response);
        }

        if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url]) {
          if (xmlhttprequest.getResponseHeader("X-Drupal-Ajax-Token") !== "1") {
            var customMessage = Drupal.t(
              "The response failed verification so will not be processed."
            );
            return ajax.error(xmlhttprequest, ajax.url, customMessage);
          }
        }

        return ajax.success(response, status);
      },
      complete: function complete(xmlhttprequest, status) {
        ajax.ajaxing = false;

        if (status === "error" || status === "parsererror") {
          return ajax.error(xmlhttprequest, ajax.url);
        }
      },
      dataType: "json",
      jsonp: false,
      type: "POST",
    };

    if (elementSettings.dialog) {
      ajax.options.data.dialogOptions = elementSettings.dialog;
    }

    if (ajax.options.url.indexOf("?") === -1) {
      ajax.options.url += "?";
    } else {
      ajax.options.url += "&";
    }

    var wrapper = "drupal_".concat(elementSettings.dialogType || "ajax");

    if (elementSettings.dialogRenderer) {
      wrapper += ".".concat(elementSettings.dialogRenderer);
    }

    ajax.options.url += ""
      .concat(Drupal.ajax.WRAPPER_FORMAT, "=")
      .concat(wrapper);
    $(ajax.element).on(elementSettings.event, function (event) {
      if (
        !drupalSettings.ajaxTrustedUrl[ajax.url] &&
        !Drupal.url.isLocal(ajax.url)
      ) {
        throw new Error(
          Drupal.t("The callback URL is not local and not trusted: !url", {
            "!url": ajax.url,
          })
        );
      }

      return ajax.eventResponse(this, event);
    });

    if (elementSettings.keypress) {
      $(ajax.element).on("keypress", function (event) {
        return ajax.keypressResponse(this, event);
      });
    }

    if (elementSettings.prevent) {
      $(ajax.element).on(elementSettings.prevent, false);
    }
  };

  Drupal.ajax.WRAPPER_FORMAT = "_wrapper_format";
  Drupal.Ajax.AJAX_REQUEST_PARAMETER = "_drupal_ajax";

  Drupal.Ajax.prototype.execute = function () {
    if (this.ajaxing) {
      return;
    }

    try {
      this.beforeSerialize(this.element, this.options);
      return $.ajax(this.options);
    } catch (e) {
      this.ajaxing = false;
      window.alert(
        "An error occurred while attempting to process "
          .concat(this.options.url, ": ")
          .concat(e.message)
      );
      return $.Deferred().reject();
    }
  };

  Drupal.Ajax.prototype.keypressResponse = function (element, event) {
    var ajax = this;

    if (
      event.which === 13 ||
      (event.which === 32 &&
        element.type !== "text" &&
        element.type !== "textarea" &&
        element.type !== "tel" &&
        element.type !== "number")
    ) {
      event.preventDefault();
      event.stopPropagation();
      $(element).trigger(ajax.elementSettings.event);
    }
  };

  Drupal.Ajax.prototype.eventResponse = function (element, event) {
    event.preventDefault();
    event.stopPropagation();
    var ajax = this;

    if (ajax.ajaxing) {
      return;
    }

    try {
      if (ajax.$form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }

        ajax.$form.ajaxSubmit(ajax.options);
      } else {
        ajax.beforeSerialize(ajax.element, ajax.options);
        $.ajax(ajax.options);
      }
    } catch (e) {
      ajax.ajaxing = false;
      window.alert(
        "An error occurred while attempting to process "
          .concat(ajax.options.url, ": ")
          .concat(e.message)
      );
    }
  };

  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.detachBehaviors(this.$form.get(0), settings, "serialize");
    }

    options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
    var pageState = drupalSettings.ajaxPageState;
    options.data["ajax_page_state[theme]"] = pageState.theme;
    options.data["ajax_page_state[theme_token]"] = pageState.theme_token;
    options.data["ajax_page_state[libraries]"] = pageState.libraries;
  };

  Drupal.Ajax.prototype.beforeSubmit = function (
    formValues,
    element,
    options
  ) {};

  Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    if (this.$form) {
      options.extraData = options.extraData || {};
      options.extraData.ajax_iframe_upload = "1";
      var v = $.fieldValue(this.element);

      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    $(this.element).prop("disabled", true);

    if (!this.progress || !this.progress.type) {
      return;
    }

    var progressIndicatorMethod = "setProgressIndicator"
      .concat(this.progress.type.slice(0, 1).toUpperCase())
      .concat(this.progress.type.slice(1).toLowerCase());

    if (
      progressIndicatorMethod in this &&
      typeof this[progressIndicatorMethod] === "function"
    ) {
      this[progressIndicatorMethod].call(this);
    }
  };

  Drupal.theme.ajaxProgressThrobber = function (message) {
    var messageMarkup =
      typeof message === "string"
        ? Drupal.theme("ajaxProgressMessage", message)
        : "";
    var throbber = '<div class="throbber">&nbsp;</div>';
    return '<div class="ajax-progress ajax-progress-throbber">'
      .concat(throbber)
      .concat(messageMarkup, "</div>");
  };

  Drupal.theme.ajaxProgressIndicatorFullscreen = function () {
    return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
  };

  Drupal.theme.ajaxProgressMessage = function (message) {
    return '<div class="message">'.concat(message, "</div>");
  };

  Drupal.theme.ajaxProgressBar = function ($element) {
    return $('<div class="ajax-progress ajax-progress-bar"></div>').append(
      $element
    );
  };

  Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
    var progressBar = new Drupal.ProgressBar(
      "ajax-progress-".concat(this.element.id),
      $.noop,
      this.progress.method,
      $.noop
    );

    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }

    if (this.progress.url) {
      progressBar.startMonitoring(
        this.progress.url,
        this.progress.interval || 1500
      );
    }

    this.progress.element = $(
      Drupal.theme("ajaxProgressBar", progressBar.element)
    );
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    this.progress.element = $(
      Drupal.theme("ajaxProgressThrobber", this.progress.message)
    );
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(Drupal.theme("ajaxProgressIndicatorFullscreen"));
    $("body").append(this.progress.element);
  };

  Drupal.Ajax.prototype.success = function (response, status) {
    var _this = this;

    if (this.progress.element) {
      $(this.progress.element).remove();
    }

    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.element).prop("disabled", false);
    var elementParents = $(this.element)
      .parents("[data-drupal-selector]")
      .addBack()
      .toArray();
    var focusChanged = false;
    Object.keys(response || {}).forEach(function (i) {
      if (response[i].command && _this.commands[response[i].command]) {
        _this.commands[response[i].command](_this, response[i], status);

        if (
          (response[i].command === "invoke" &&
            response[i].method === "focus") ||
          response[i].command === "focusFirst"
        ) {
          focusChanged = true;
        }
      }
    });

    if (
      !focusChanged &&
      this.element &&
      !$(this.element).data("disable-refocus")
    ) {
      var target = false;

      for (var n = elementParents.length - 1; !target && n >= 0; n--) {
        target = document.querySelector(
          '[data-drupal-selector="'.concat(
            elementParents[n].getAttribute("data-drupal-selector"),
            '"]'
          )
        );
      }

      if (target) {
        $(target).trigger("focus");
      }
    }

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    this.settings = null;
  };

  Drupal.Ajax.prototype.getEffect = function (response) {
    var type = response.effect || this.effect;
    var speed = response.speed || this.speed;
    var effect = {};

    if (type === "none") {
      effect.showEffect = "show";
      effect.hideEffect = "hide";
      effect.showSpeed = "";
    } else if (type === "fade") {
      effect.showEffect = "fadeIn";
      effect.hideEffect = "fadeOut";
      effect.showSpeed = speed;
    } else {
      effect.showEffect = "".concat(type, "Toggle");
      effect.hideEffect = "".concat(type, "Toggle");
      effect.showSpeed = speed;
    }

    return effect;
  };

  Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
    if (this.progress.element) {
      $(this.progress.element).remove();
    }

    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.wrapper).show();
    $(this.element).prop("disabled", false);

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
  };

  Drupal.theme.ajaxWrapperNewContent = function ($newContent, ajax, response) {
    return (response.effect || ajax.effect) !== "none" &&
      $newContent.filter(function (i) {
        return !(
          $newContent[i].nodeName === "#comment" ||
          ($newContent[i].nodeName === "#text" &&
            /^(\s|\n|\r)*$/.test($newContent[i].textContent))
        );
      }).length > 1
      ? Drupal.theme("ajaxWrapperMultipleRootElements", $newContent)
      : $newContent;
  };

  Drupal.theme.ajaxWrapperMultipleRootElements = function ($elements) {
    return $("<div></div>").append($elements);
  };

  Drupal.AjaxCommands = function () {};

  Drupal.AjaxCommands.prototype = {
    insert: function insert(ajax, response) {
      var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
      var method = response.method || ajax.method;
      var effect = ajax.getEffect(response);
      var settings = response.settings || ajax.settings || drupalSettings;
      var $newContent = $($.parseHTML(response.data, document, true));
      $newContent = Drupal.theme(
        "ajaxWrapperNewContent",
        $newContent,
        ajax,
        response
      );

      switch (method) {
        case "html":
        case "replaceWith":
        case "replaceAll":
        case "empty":
        case "remove":
          Drupal.detachBehaviors($wrapper.get(0), settings);
          break;

        default:
          break;
      }

      $wrapper[method]($newContent);

      if (effect.showEffect !== "show") {
        $newContent.hide();
      }

      var $ajaxNewContent = $newContent.find(".ajax-new-content");

      if ($ajaxNewContent.length) {
        $ajaxNewContent.hide();
        $newContent.show();
        $ajaxNewContent[effect.showEffect](effect.showSpeed);
      } else if (effect.showEffect !== "show") {
        $newContent[effect.showEffect](effect.showSpeed);
      }

      if ($newContent.parents("html").length) {
        $newContent.each(function (index, element) {
          if (element.nodeType === Node.ELEMENT_NODE) {
            Drupal.attachBehaviors(element, settings);
          }
        });
      }
    },
    remove: function remove(ajax, response, status) {
      var settings = response.settings || ajax.settings || drupalSettings;
      $(response.selector)
        .each(function () {
          Drupal.detachBehaviors(this, settings);
        })
        .remove();
    },
    changed: function changed(ajax, response, status) {
      var $element = $(response.selector);

      if (!$element.hasClass("ajax-changed")) {
        $element.addClass("ajax-changed");

        if (response.asterisk) {
          $element
            .find(response.asterisk)
            .append(
              ' <abbr class="ajax-changed" title="'.concat(
                Drupal.t("Changed"),
                '">*</abbr> '
              )
            );
        }
      }
    },
    alert: function alert(ajax, response, status) {
      window.alert(response.text);
    },
    announce: function announce(ajax, response) {
      if (response.priority) {
        Drupal.announce(response.text, response.priority);
      } else {
        Drupal.announce(response.text);
      }
    },
    redirect: function redirect(ajax, response, status) {
      window.location = response.url;
    },
    css: function css(ajax, response, status) {
      $(response.selector).css(response.argument);
    },
    settings: function settings(ajax, response, status) {
      var ajaxSettings = drupalSettings.ajax;

      if (ajaxSettings) {
        Drupal.ajax.expired().forEach(function (instance) {
          if (instance.selector) {
            var selector = instance.selector.replace("#", "");

            if (selector in ajaxSettings) {
              delete ajaxSettings[selector];
            }
          }
        });
      }

      if (response.merge) {
        $.extend(true, drupalSettings, response.settings);
      } else {
        ajax.settings = response.settings;
      }
    },
    data: function data(ajax, response, status) {
      $(response.selector).data(response.name, response.value);
    },
    focusFirst: function focusFirst(ajax, response, status) {
      var focusChanged = false;
      var container = document.querySelector(response.selector);

      if (container) {
        var tabbableElements = tabbable(container);

        if (tabbableElements.length) {
          tabbableElements[0].focus();
          focusChanged = true;
        } else if (isFocusable(container)) {
          container.focus();
          focusChanged = true;
        }
      }

      if (ajax.hasOwnProperty("element") && !focusChanged) {
        ajax.element.focus();
      }
    },
    invoke: function invoke(ajax, response, status) {
      var $element = $(response.selector);
      $element[response.method].apply(
        $element,
        _toConsumableArray(response.args)
      );
    },
    restripe: function restripe(ajax, response, status) {
      $(response.selector)
        .find("> tbody > tr:visible, > tr:visible")
        .removeClass("odd even")
        .filter(":even")
        .addClass("odd")
        .end()
        .filter(":odd")
        .addClass("even");
    },
    update_build_id: function update_build_id(ajax, response, status) {
      document
        .querySelectorAll(
          'input[name="form_build_id"][value="'.concat(response.old, '"]')
        )
        .forEach(function (item) {
          item.value = response.new;
        });
    },
    add_css: function add_css(ajax, response, status) {
      $("head").prepend(response.data);
    },
    message: function message(ajax, response) {
      var messages = new Drupal.Message(
        document.querySelector(response.messageWrapperQuerySelector)
      );

      if (response.clearPrevious) {
        messages.clear();
      }

      messages.add(response.message, response.messageOptions);
    },
  };
})(jQuery, window, Drupal, drupalSettings, window.tabbable);
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function (Drupal) {
  Drupal.theme.ajaxProgressBar = function ($element) {
    return $element.addClass("ajax-progress ajax-progress-bar");
  };
})(Drupal);
!(function (s, t) {
  "use strict";
  var c,
    i,
    u = t.blazy || {};
  (t = (t.Ajax || {}).prototype).success =
    ((i = t.success),
    function (t, e) {
      var n,
        o = u.init;
      return (
        o &&
          ((n = u.options),
          clearTimeout(c),
          (c = setTimeout(function () {
            var t = s.findAll(document, s.selector(n, !0));
            t.length && o.load(t, !0, n);
          }, 100))),
        i.apply(this, arguments)
      );
    });
})(dBlazy, Drupal);
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!(function (r) {
  "function" == typeof define && define.amd
    ? define(["jquery"], r)
    : "object" == typeof module && module.exports
    ? (module.exports = function (e, t) {
        return (
          void 0 === t &&
            (t =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(e)),
          r(t),
          t
        );
      })
    : r(jQuery);
})(function (q) {
  "use strict";
  var m = /\r?\n/g,
    S = {};
  (S.fileapi = void 0 !== q('<input type="file">').get(0).files),
    (S.formdata = void 0 !== window.FormData);
  var _ = !!q.fn.prop;
  function o(e) {
    var t = e.data;
    e.isDefaultPrevented() ||
      (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t));
  }
  function i(e) {
    var t = e.target,
      r = q(t);
    if (!r.is("[type=submit],[type=image]")) {
      var a = r.closest("[type=submit]");
      if (0 === a.length) return;
      t = a[0];
    }
    var n,
      o = t.form;
    "image" === (o.clk = t).type &&
      (void 0 !== e.offsetX
        ? ((o.clk_x = e.offsetX), (o.clk_y = e.offsetY))
        : "function" == typeof q.fn.offset
        ? ((n = r.offset()),
          (o.clk_x = e.pageX - n.left),
          (o.clk_y = e.pageY - n.top))
        : ((o.clk_x = e.pageX - t.offsetLeft),
          (o.clk_y = e.pageY - t.offsetTop))),
      setTimeout(function () {
        o.clk = o.clk_x = o.clk_y = null;
      }, 100);
  }
  function N() {
    var e;
    q.fn.ajaxSubmit.debug &&
      ((e = "[jquery.form] " + Array.prototype.join.call(arguments, "")),
      window.console && window.console.log
        ? window.console.log(e)
        : window.opera && window.opera.postError && window.opera.postError(e));
  }
  (q.fn.attr2 = function () {
    if (!_) return this.attr.apply(this, arguments);
    var e = this.prop.apply(this, arguments);
    return (e && e.jquery) || "string" == typeof e
      ? e
      : this.attr.apply(this, arguments);
  }),
    (q.fn.ajaxSubmit = function (M, e, t, r) {
      if (!this.length)
        return (
          N("ajaxSubmit: skipping submit process - no element selected"), this
        );
      var O,
        a,
        n,
        o,
        X = this;
      "function" == typeof M
        ? (M = { success: M })
        : "string" == typeof M || (!1 === M && 0 < arguments.length)
        ? ((M = { url: M, data: e, dataType: t }),
          "function" == typeof r && (M.success = r))
        : void 0 === M && (M = {}),
        (O = M.method || M.type || this.attr2("method")),
        (n =
          (n =
            (n =
              "string" == typeof (a = M.url || this.attr2("action"))
                ? q.trim(a)
                : "") ||
            window.location.href ||
            "") && (n.match(/^([^#]+)/) || [])[1]),
        (o =
          /(MSIE|Trident)/.test(navigator.userAgent || "") &&
          /^https/i.test(window.location.href || "")
            ? "javascript:false"
            : "about:blank"),
        (M = q.extend(
          !0,
          {
            url: n,
            success: q.ajaxSettings.success,
            type: O || q.ajaxSettings.type,
            iframeSrc: o,
          },
          M
        ));
      var i = {};
      if ((this.trigger("form-pre-serialize", [this, M, i]), i.veto))
        return (
          N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
        );
      if (M.beforeSerialize && !1 === M.beforeSerialize(this, M))
        return (
          N("ajaxSubmit: submit aborted via beforeSerialize callback"), this
        );
      var s = M.traditional;
      void 0 === s && (s = q.ajaxSettings.traditional);
      var u,
        c,
        C = [],
        l = this.formToArray(M.semantic, C, M.filtering);
      if (
        (M.data &&
          ((c = q.isFunction(M.data) ? M.data(l) : M.data),
          (M.extraData = c),
          (u = q.param(c, s))),
        M.beforeSubmit && !1 === M.beforeSubmit(l, this, M))
      )
        return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
      if ((this.trigger("form-submit-validate", [l, this, M, i]), i.veto))
        return (
          N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this
        );
      var f = q.param(l, s);
      u && (f = f ? f + "&" + u : u),
        "GET" === M.type.toUpperCase()
          ? ((M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f),
            (M.data = null))
          : (M.data = f);
      var d,
        m,
        p,
        h = [];
      M.resetForm &&
        h.push(function () {
          X.resetForm();
        }),
        M.clearForm &&
          h.push(function () {
            X.clearForm(M.includeHidden);
          }),
        !M.dataType && M.target
          ? ((d = M.success || function () {}),
            h.push(function (e, t, r) {
              var a = arguments,
                n = M.replaceTarget ? "replaceWith" : "html";
              q(M.target)
                [n](e)
                .each(function () {
                  d.apply(this, a);
                });
            }))
          : M.success &&
            (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)),
        (M.success = function (e, t, r) {
          for (var a = M.context || this, n = 0, o = h.length; n < o; n++)
            h[n].apply(a, [e, t, r || X, X]);
        }),
        M.error &&
          ((m = M.error),
          (M.error = function (e, t, r) {
            var a = M.context || this;
            m.apply(a, [e, t, r, X]);
          })),
        M.complete &&
          ((p = M.complete),
          (M.complete = function (e, t) {
            var r = M.context || this;
            p.apply(r, [e, t, X]);
          }));
      var v =
          0 <
          q("input[type=file]:enabled", this).filter(function () {
            return "" !== q(this).val();
          }).length,
        g = "multipart/form-data",
        x = X.attr("enctype") === g || X.attr("encoding") === g,
        y = S.fileapi && S.formdata;
      N("fileAPI :" + y);
      var b,
        T = (v || x) && !y;
      !1 !== M.iframe && (M.iframe || T)
        ? M.closeKeepAlive
          ? q.get(M.closeKeepAlive, function () {
              b = w(l);
            })
          : (b = w(l))
        : (b =
            (v || x) && y
              ? (function (e) {
                  for (var r = new FormData(), t = 0; t < e.length; t++)
                    r.append(e[t].name, e[t].value);
                  if (M.extraData) {
                    var a = (function (e) {
                      var t,
                        r,
                        a = q.param(e, M.traditional).split("&"),
                        n = a.length,
                        o = [];
                      for (t = 0; t < n; t++)
                        (a[t] = a[t].replace(/\+/g, " ")),
                          (r = a[t].split("=")),
                          o.push([
                            decodeURIComponent(r[0]),
                            decodeURIComponent(r[1]),
                          ]);
                      return o;
                    })(M.extraData);
                    for (t = 0; t < a.length; t++)
                      a[t] && r.append(a[t][0], a[t][1]);
                  }
                  M.data = null;
                  var n = q.extend(!0, {}, q.ajaxSettings, M, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: O || "POST",
                  });
                  M.uploadProgress &&
                    (n.xhr = function () {
                      var e = q.ajaxSettings.xhr();
                      return (
                        e.upload &&
                          e.upload.addEventListener(
                            "progress",
                            function (e) {
                              var t = 0,
                                r = e.loaded || e.position,
                                a = e.total;
                              e.lengthComputable &&
                                (t = Math.ceil((r / a) * 100)),
                                M.uploadProgress(e, r, a, t);
                            },
                            !1
                          ),
                        e
                      );
                    });
                  n.data = null;
                  var o = n.beforeSend;
                  return (
                    (n.beforeSend = function (e, t) {
                      M.formData ? (t.data = M.formData) : (t.data = r),
                        o && o.call(this, e, t);
                    }),
                    q.ajax(n)
                  );
                })(l)
              : q.ajax(M)),
        X.removeData("jqxhr").data("jqxhr", b);
      for (var j = 0; j < C.length; j++) C[j] = null;
      return this.trigger("form-submit-notify", [this, M]), this;
      function w(e) {
        var t,
          r,
          l,
          f,
          o,
          d,
          m,
          p,
          a,
          n,
          h,
          v,
          i = X[0],
          g = q.Deferred();
        if (
          ((g.abort = function (e) {
            p.abort(e);
          }),
          e)
        )
          for (r = 0; r < C.length; r++)
            (t = q(C[r])),
              _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
        ((l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l),
          (o = "jqFormIO" + new Date().getTime());
        var s = i.ownerDocument,
          u = X.closest("body");
        if (
          (l.iframeTarget
            ? (n = (d = q(l.iframeTarget, s)).attr2("name"))
              ? (o = n)
              : d.attr2("name", o)
            : (d = q(
                '<iframe name="' + o + '" src="' + l.iframeSrc + '" />',
                s
              )).css({ position: "absolute", top: "-1000px", left: "-1000px" }),
          (m = d[0]),
          (p = {
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: "n/a",
            getAllResponseHeaders: function () {},
            getResponseHeader: function () {},
            setRequestHeader: function () {},
            abort: function (e) {
              var t = "timeout" === e ? "timeout" : "aborted";
              N("aborting upload... " + t), (this.aborted = 1);
              try {
                m.contentWindow.document.execCommand &&
                  m.contentWindow.document.execCommand("Stop");
              } catch (e) {}
              d.attr("src", l.iframeSrc),
                (p.error = t),
                l.error && l.error.call(l.context, p, t, e),
                f && q.event.trigger("ajaxError", [p, l, t]),
                l.complete && l.complete.call(l.context, p, t);
            },
          }),
          (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"),
          f && q.event.trigger("ajaxSend", [p, l]),
          l.beforeSend && !1 === l.beforeSend.call(l.context, p, l))
        )
          return l.global && q.active--, g.reject(), g;
        if (p.aborted) return g.reject(), g;
        (a = i.clk) &&
          (n = a.name) &&
          !a.disabled &&
          ((l.extraData = l.extraData || {}),
          (l.extraData[n] = a.value),
          "image" === a.type &&
            ((l.extraData[n + ".x"] = i.clk_x),
            (l.extraData[n + ".y"] = i.clk_y)));
        var x = 1,
          y = 2;
        function b(t) {
          var r = null;
          try {
            t.contentWindow && (r = t.contentWindow.document);
          } catch (e) {
            N("cannot get iframe.contentWindow document: " + e);
          }
          if (r) return r;
          try {
            r = t.contentDocument ? t.contentDocument : t.document;
          } catch (e) {
            N("cannot get iframe.contentDocument: " + e), (r = t.document);
          }
          return r;
        }
        var c = q("meta[name=csrf-token]").attr("content"),
          T = q("meta[name=csrf-param]").attr("content");
        function j() {
          var e = X.attr2("target"),
            t = X.attr2("action"),
            r =
              X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
          i.setAttribute("target", o),
            (O && !/post/i.test(O)) || i.setAttribute("method", "POST"),
            t !== l.url && i.setAttribute("action", l.url),
            l.skipEncodingOverride ||
              (O && !/post/i.test(O)) ||
              X.attr({
                encoding: "multipart/form-data",
                enctype: "multipart/form-data",
              }),
            l.timeout &&
              (v = setTimeout(function () {
                (h = !0), A(x);
              }, l.timeout));
          var a = [];
          try {
            if (l.extraData)
              for (var n in l.extraData)
                l.extraData.hasOwnProperty(n) &&
                  (q.isPlainObject(l.extraData[n]) &&
                  l.extraData[n].hasOwnProperty("name") &&
                  l.extraData[n].hasOwnProperty("value")
                    ? a.push(
                        q(
                          '<input type="hidden" name="' +
                            l.extraData[n].name +
                            '">',
                          s
                        )
                          .val(l.extraData[n].value)
                          .appendTo(i)[0]
                      )
                    : a.push(
                        q('<input type="hidden" name="' + n + '">', s)
                          .val(l.extraData[n])
                          .appendTo(i)[0]
                      ));
            l.iframeTarget || d.appendTo(u),
              m.attachEvent
                ? m.attachEvent("onload", A)
                : m.addEventListener("load", A, !1),
              setTimeout(function e() {
                try {
                  var t = b(m).readyState;
                  N("state = " + t),
                    t &&
                      "uninitialized" === t.toLowerCase() &&
                      setTimeout(e, 50);
                } catch (e) {
                  N("Server abort: ", e, " (", e.name, ")"),
                    A(y),
                    v && clearTimeout(v),
                    (v = void 0);
                }
              }, 15);
            try {
              i.submit();
            } catch (e) {
              document.createElement("form").submit.apply(i);
            }
          } finally {
            i.setAttribute("action", t),
              i.setAttribute("enctype", r),
              e ? i.setAttribute("target", e) : X.removeAttr("target"),
              q(a).remove();
          }
        }
        T && c && ((l.extraData = l.extraData || {}), (l.extraData[T] = c)),
          l.forceSync ? j() : setTimeout(j, 10);
        var w,
          S,
          k,
          D = 50;
        function A(e) {
          if (!p.aborted && !k) {
            if (
              ((S = b(m)) || (N("cannot access response document"), (e = y)),
              e === x && p)
            )
              return p.abort("timeout"), void g.reject(p, "timeout");
            if (e === y && p)
              return (
                p.abort("server abort"),
                void g.reject(p, "error", "server abort")
              );
            if ((S && S.location.href !== l.iframeSrc) || h) {
              m.detachEvent
                ? m.detachEvent("onload", A)
                : m.removeEventListener("load", A, !1);
              var t,
                r = "success";
              try {
                if (h) throw "timeout";
                var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                if (
                  (N("isXml=" + a),
                  !a &&
                    window.opera &&
                    (null === S.body || !S.body.innerHTML) &&
                    --D)
                )
                  return (
                    N("requeing onLoad callback, DOM not available"),
                    void setTimeout(A, 250)
                  );
                var n = S.body ? S.body : S.documentElement;
                (p.responseText = n ? n.innerHTML : null),
                  (p.responseXML = S.XMLDocument ? S.XMLDocument : S),
                  a && (l.dataType = "xml"),
                  (p.getResponseHeader = function (e) {
                    return { "content-type": l.dataType }[e.toLowerCase()];
                  }),
                  n &&
                    ((p.status = Number(n.getAttribute("status")) || p.status),
                    (p.statusText =
                      n.getAttribute("statusText") || p.statusText));
                var o,
                  i,
                  s,
                  u = (l.dataType || "").toLowerCase(),
                  c = /(json|script|text)/.test(u);
                c || l.textarea
                  ? (o = S.getElementsByTagName("textarea")[0])
                    ? ((p.responseText = o.value),
                      (p.status = Number(o.getAttribute("status")) || p.status),
                      (p.statusText =
                        o.getAttribute("statusText") || p.statusText))
                    : c &&
                      ((i = S.getElementsByTagName("pre")[0]),
                      (s = S.getElementsByTagName("body")[0]),
                      i
                        ? (p.responseText = i.textContent
                            ? i.textContent
                            : i.innerText)
                        : s &&
                          (p.responseText = s.textContent
                            ? s.textContent
                            : s.innerText))
                  : "xml" === u &&
                    !p.responseXML &&
                    p.responseText &&
                    (p.responseXML = F(p.responseText));
                try {
                  w = E(p, u, l);
                } catch (e) {
                  (r = "parsererror"), (p.error = t = e || r);
                }
              } catch (e) {
                N("error caught: ", e), (r = "error"), (p.error = t = e || r);
              }
              p.aborted && (N("upload aborted"), (r = null)),
                p.status &&
                  (r =
                    (200 <= p.status && p.status < 300) || 304 === p.status
                      ? "success"
                      : "error"),
                "success" === r
                  ? (l.success && l.success.call(l.context, w, "success", p),
                    g.resolve(p.responseText, "success", p),
                    f && q.event.trigger("ajaxSuccess", [p, l]))
                  : r &&
                    (void 0 === t && (t = p.statusText),
                    l.error && l.error.call(l.context, p, r, t),
                    g.reject(p, "error", t),
                    f && q.event.trigger("ajaxError", [p, l, t])),
                f && q.event.trigger("ajaxComplete", [p, l]),
                f && !--q.active && q.event.trigger("ajaxStop"),
                l.complete && l.complete.call(l.context, p, r),
                (k = !0),
                l.timeout && clearTimeout(v),
                setTimeout(function () {
                  l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(),
                    (p.responseXML = null);
                }, 100);
            }
          }
        }
        var F =
            q.parseXML ||
            function (e, t) {
              return (
                window.ActiveXObject
                  ? (((t = new ActiveXObject("Microsoft.XMLDOM")).async =
                      "false"),
                    t.loadXML(e))
                  : (t = new DOMParser().parseFromString(e, "text/xml")),
                t &&
                t.documentElement &&
                "parsererror" !== t.documentElement.nodeName
                  ? t
                  : null
              );
            },
          L =
            q.parseJSON ||
            function (e) {
              return window.eval("(" + e + ")");
            },
          E = function (e, t, r) {
            var a = e.getResponseHeader("content-type") || "",
              n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
              o = n ? e.responseXML : e.responseText;
            return (
              n &&
                "parsererror" === o.documentElement.nodeName &&
                q.error &&
                q.error("parsererror"),
              r && r.dataFilter && (o = r.dataFilter(o, t)),
              "string" == typeof o &&
                (("json" === t || !t) && 0 <= a.indexOf("json")
                  ? (o = L(o))
                  : ("script" === t || !t) &&
                    0 <= a.indexOf("javascript") &&
                    q.globalEval(o)),
              o
            );
          };
        return g;
      }
    }),
    (q.fn.ajaxForm = function (e, t, r, a) {
      if (
        (("string" == typeof e || (!1 === e && 0 < arguments.length)) &&
          ((e = { url: e, data: t, dataType: r }),
          "function" == typeof a && (e.success = a)),
        ((e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on)),
        e.delegation || 0 !== this.length)
      )
        return e.delegation
          ? (q(document)
              .off("submit.form-plugin", this.selector, o)
              .off("click.form-plugin", this.selector, i)
              .on("submit.form-plugin", this.selector, e, o)
              .on("click.form-plugin", this.selector, e, i),
            this)
          : (e.beforeFormUnbind && e.beforeFormUnbind(this, e),
            this.ajaxFormUnbind()
              .on("submit.form-plugin", e, o)
              .on("click.form-plugin", e, i));
      var n = { s: this.selector, c: this.context };
      return (
        !q.isReady && n.s
          ? (N("DOM not ready, queuing ajaxForm"),
            q(function () {
              q(n.s, n.c).ajaxForm(e);
            }))
          : N(
              "terminating; zero elements found by selector" +
                (q.isReady ? "" : " (DOM not ready)")
            ),
        this
      );
    }),
    (q.fn.ajaxFormUnbind = function () {
      return this.off("submit.form-plugin click.form-plugin");
    }),
    (q.fn.formToArray = function (e, t, r) {
      var a = [];
      if (0 === this.length) return a;
      var n,
        o,
        i,
        s,
        u,
        c,
        l,
        f,
        d,
        m,
        p = this[0],
        h = this.attr("id"),
        v =
          (v =
            e || void 0 === p.elements
              ? p.getElementsByTagName("*")
              : p.elements) && q.makeArray(v);
      if (
        (h &&
          (e || /(Edge|Trident)\//.test(navigator.userAgent)) &&
          (n = q(':input[form="' + h + '"]').get()).length &&
          (v = (v || []).concat(n)),
        !v || !v.length)
      )
        return a;
      for (
        q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length;
        o < c;
        o++
      )
        if ((m = (u = v[o]).name) && !u.disabled)
          if (e && p.clk && "image" === u.type)
            p.clk === u &&
              (a.push({ name: m, value: q(u).val(), type: u.type }),
              a.push(
                { name: m + ".x", value: p.clk_x },
                { name: m + ".y", value: p.clk_y }
              ));
          else if ((s = q.fieldValue(u, !0)) && s.constructor === Array)
            for (t && t.push(u), i = 0, l = s.length; i < l; i++)
              a.push({ name: m, value: s[i] });
          else if (S.fileapi && "file" === u.type) {
            t && t.push(u);
            var g = u.files;
            if (g.length)
              for (i = 0; i < g.length; i++)
                a.push({ name: m, value: g[i], type: u.type });
            else a.push({ name: m, value: "", type: u.type });
          } else
            null != s &&
              (t && t.push(u),
              a.push({
                name: m,
                value: s,
                type: u.type,
                required: u.required,
              }));
      return (
        e ||
          !p.clk ||
          ((m = (d = (f = q(p.clk))[0]).name) &&
            !d.disabled &&
            "image" === d.type &&
            (a.push({ name: m, value: f.val() }),
            a.push(
              { name: m + ".x", value: p.clk_x },
              { name: m + ".y", value: p.clk_y }
            ))),
        a
      );
    }),
    (q.fn.formSerialize = function (e) {
      return q.param(this.formToArray(e));
    }),
    (q.fn.fieldSerialize = function (n) {
      var o = [];
      return (
        this.each(function () {
          var e = this.name;
          if (e) {
            var t = q.fieldValue(this, n);
            if (t && t.constructor === Array)
              for (var r = 0, a = t.length; r < a; r++)
                o.push({ name: e, value: t[r] });
            else null != t && o.push({ name: this.name, value: t });
          }
        }),
        q.param(o)
      );
    }),
    (q.fn.fieldValue = function (e) {
      for (var t = [], r = 0, a = this.length; r < a; r++) {
        var n = this[r],
          o = q.fieldValue(n, e);
        null == o ||
          (o.constructor === Array && !o.length) ||
          (o.constructor === Array ? q.merge(t, o) : t.push(o));
      }
      return t;
    }),
    (q.fieldValue = function (e, t) {
      var r = e.name,
        a = e.type,
        n = e.tagName.toLowerCase();
      if (
        (void 0 === t && (t = !0),
        t &&
          (!r ||
            e.disabled ||
            "reset" === a ||
            "button" === a ||
            (("checkbox" === a || "radio" === a) && !e.checked) ||
            (("submit" === a || "image" === a) && e.form && e.form.clk !== e) ||
            ("select" === n && -1 === e.selectedIndex)))
      )
        return null;
      if ("select" !== n) return q(e).val().replace(m, "\r\n");
      var o = e.selectedIndex;
      if (o < 0) return null;
      for (
        var i = [],
          s = e.options,
          u = "select-one" === a,
          c = u ? o + 1 : s.length,
          l = u ? o : 0;
        l < c;
        l++
      ) {
        var f = s[l];
        if (f.selected && !f.disabled) {
          var d =
            (d = f.value) ||
            (f.attributes && f.attributes.value && !f.attributes.value.specified
              ? f.text
              : f.value);
          if (u) return d;
          i.push(d);
        }
      }
      return i;
    }),
    (q.fn.clearForm = function (e) {
      return this.each(function () {
        q("input,select,textarea", this).clearFields(e);
      });
    }),
    (q.fn.clearFields = q.fn.clearInputs =
      function (r) {
        var a =
          /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
          var e = this.type,
            t = this.tagName.toLowerCase();
          a.test(e) || "textarea" === t
            ? (this.value = "")
            : "checkbox" === e || "radio" === e
            ? (this.checked = !1)
            : "select" === t
            ? (this.selectedIndex = -1)
            : "file" === e
            ? /MSIE/.test(navigator.userAgent)
              ? q(this).replaceWith(q(this).clone(!0))
              : q(this).val("")
            : r &&
              ((!0 === r && /hidden/.test(e)) ||
                ("string" == typeof r && q(this).is(r))) &&
              (this.value = "");
        });
      }),
    (q.fn.resetForm = function () {
      return this.each(function () {
        var t = q(this),
          e = this.tagName.toLowerCase();
        switch (e) {
          case "input":
            this.checked = this.defaultChecked;
          case "textarea":
            return (this.value = this.defaultValue), !0;
          case "option":
          case "optgroup":
            var r = t.parents("select");
            return (
              r.length && r[0].multiple
                ? "option" === e
                  ? (this.selected = this.defaultSelected)
                  : t.find("option").resetForm()
                : r.resetForm(),
              !0
            );
          case "select":
            return (
              t.find("option").each(function (e) {
                if (
                  ((this.selected = this.defaultSelected),
                  this.defaultSelected && !t[0].multiple)
                )
                  return (t[0].selectedIndex = e), !1;
              }),
              !0
            );
          case "label":
            var a = q(t.attr("for")),
              n = t.find("input,select,textarea");
            return a[0] && n.unshift(a[0]), n.resetForm(), !0;
          case "form":
            return (
              ("function" != typeof this.reset &&
                ("object" != typeof this.reset || this.reset.nodeType)) ||
                this.reset(),
              !0
            );
          default:
            return t.find("form,input,label,select,textarea").resetForm(), !0;
        }
      });
    }),
    (q.fn.enable = function (e) {
      return (
        void 0 === e && (e = !0),
        this.each(function () {
          this.disabled = !e;
        })
      );
    }),
    (q.fn.selected = function (r) {
      return (
        void 0 === r && (r = !0),
        this.each(function () {
          var e,
            t = this.type;
          "checkbox" === t || "radio" === t
            ? (this.checked = r)
            : "option" === this.tagName.toLowerCase() &&
              ((e = q(this).parent("select")),
              r &&
                e[0] &&
                "select-one" === e[0].type &&
                e.find("option").selected(!1),
              (this.selected = r));
        })
      );
    }),
    (q.fn.ajaxSubmit.debug = !1);
});

/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function ($, Drupal, drupalSettings) {
  Drupal.Views = {};

  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf("?");

    if (pos !== -1) {
      query = query.substring(pos + 1);
    }

    var pair;
    var pairs = query.split("&");

    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i].split("=");

      if (pair[0] !== "q" && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, " "))] =
          decodeURIComponent(pair[1].replace(/\+/g, " "));
      }
    }

    return args;
  };

  Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {};
    var path = Drupal.Views.getPath(href);
    var viewHref = Drupal.url(viewPath).substring(
      drupalSettings.path.baseUrl.length
    );

    if (
      viewHref &&
      path.substring(0, viewHref.length + 1) === "".concat(viewHref, "/")
    ) {
      returnObj.view_args = decodeURIComponent(
        path.substring(viewHref.length + 1, path.length)
      );
      returnObj.view_path = path;
    }

    return returnObj;
  };

  Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;

    if (href.substring(0, protocol.length) === protocol) {
      href = href.substring(href.indexOf("/", protocol.length + 2));
    }

    return href;
  };

  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(drupalSettings.path.baseUrl.length, href.length);

    if (href.substring(0, 3) === "?q=") {
      href = href.substring(3, href.length);
    }

    var chars = ["#", "?", "&"];

    for (var i = 0; i < chars.length; i++) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }

    return href;
  };
})(jQuery, Drupal, drupalSettings);
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ViewsAjaxView = {};

  Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
    if (settings && settings.views && settings.views.ajaxViews) {
      var ajaxViews = settings.views.ajaxViews;
      Object.keys(ajaxViews || {}).forEach(function (i) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
      });
    }
  };

  Drupal.behaviors.ViewsAjaxView.detach = function (
    context,
    settings,
    trigger
  ) {
    if (trigger === "unload") {
      if (settings && settings.views && settings.views.ajaxViews) {
        var ajaxViews = settings.views.ajaxViews;
        Object.keys(ajaxViews || {}).forEach(function (i) {
          var selector = ".js-view-dom-id-".concat(ajaxViews[i].view_dom_id);

          if ($(selector, context).length) {
            delete Drupal.views.instances[i];
            delete settings.views.ajaxViews[i];
          }
        });
      }
    }
  };

  Drupal.views = {};
  Drupal.views.instances = {};

  Drupal.views.ajaxView = function (settings) {
    var selector = ".js-view-dom-id-".concat(settings.view_dom_id);
    this.$view = $(selector);
    var ajaxPath = drupalSettings.views.ajax_path;

    if (ajaxPath.constructor.toString().indexOf("Array") !== -1) {
      ajaxPath = ajaxPath[0];
    }

    var queryString = window.location.search || "";

    if (queryString !== "") {
      queryString = queryString
        .slice(1)
        .replace(/q=[^&]+&?|&?render=[^&]+/, "");

      if (queryString !== "") {
        queryString = (/\?/.test(ajaxPath) ? "&" : "?") + queryString;
      }
    }

    this.element_settings = {
      url: ajaxPath + queryString,
      submit: settings,
      setClick: true,
      event: "click",
      selector: selector,
      progress: {
        type: "fullscreen",
      },
    };
    this.settings = settings;
    this.$exposed_form = $(
      'form.views-exposed-form[data-drupal-target-view="'
        .concat(
          settings.view_dom_id,
          '"], form.views-exposed-form[data-drupal-target-view="'
        )
        .concat(settings.view_name, "-")
        .concat(settings.view_display_id, '"]')
    );
    once("exposed-form", this.$exposed_form).forEach(
      $.proxy(this.attachExposedFormAjax, this)
    );
    once(
      "ajax-pager",
      this.$view.filter($.proxy(this.filterNestedViews, this))
    ).forEach($.proxy(this.attachPagerAjax, this));
    var selfSettings = $.extend({}, this.element_settings, {
      event: "RefreshView",
      base: this.selector,
      element: this.$view.get(0),
    });
    this.refreshViewAjax = Drupal.ajax(selfSettings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];
    $(
      "input[type=submit], button[type=submit], input[type=image]",
      this.$exposed_form
    )
      .not("[data-drupal-selector=edit-reset]")
      .each(function (index) {
        var selfSettings = $.extend({}, that.element_settings, {
          base: $(this).attr("id"),
          element: this,
        });
        that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
      });
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function () {
    return !this.$view.parents(".view").length;
  };

  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view
      .find(
        "ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a"
      )
      .each($.proxy(this.attachPagerLinkAjax, this));
  };

  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr("href");
    $.extend(
      viewData,
      this.settings,
      Drupal.Views.parseQueryString(href),
      Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
    );
    var selfSettings = $.extend({}, this.element_settings, {
      submit: viewData,
      base: false,
      element: link,
    });
    this.pagerAjax = Drupal.ajax(selfSettings);
  };

  Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
    var offset = $(response.selector).offset();
    var scrollTarget = response.selector;

    while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }

    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate(
        {
          scrollTop: offset.top - 10,
        },
        500
      );
    }
  };
})(jQuery, Drupal, drupalSettings);
("use strict");
(function ($) {
  function loadScript() {
    if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
      $("head").prepend(
        "<script type='text/javascript' src='https://www.youtube.com/iframe_api' />"
      );
    }
  }

  function loadPlayer() {
    window.onYouTubePlayerAPIReady = function () {
      $("iframe").each(function (index) {
        var src_val = $(this)[0].src;
        if (src_val.includes("youtube") === true) {
          var $this = $(this)[0];
          var $thisHTML = $(this)[0].outerHTML;
          $(this)[0].outerHTML =
            "<div class='no-scroll-wrapper'><div class='no-scroll'></div><div id='player_" +
            index +
            "'>" +
            $thisHTML +
            "</div></div>";
        }
      });

      setTimeout(() => {
        $(".no-scroll-wrapper").each(function (index) {
          var $this = $(this).find("iframe");
          var embeddedCode = getId($this.attr("src"));
          onYouTubeIframeAPIReady(embeddedCode, "player_" + index);
        });
      }, 500);
    };
  }

  $(document).delegate(".no-scroll", "click", function () {
    var thisEle = $(this);
    thisEle
      .closest(".no-scroll-wrapper")
      .find("iframe")
      .each(function () {
        var thisFrame = $(this)[0];
        thisFrame.contentWindow.postMessage(
          '{"event":"command","func":"' + "playVideo" + '","args":""}',
          "*"
        );
        console.log("removed-noscroll");
      });
    $(this).removeClass("no-scroll");
  });

  var player;
  function onYouTubeIframeAPIReady(videoId, id) {
    player = new YT.Player(id, {
      width: "100%",
      height: "600",
      videoId: videoId, //replace VIDEO_ID with the videoId from Youtube
      playerVars: {
        rel: 0,
        controls: 0,
      },
      events: {
        onPlayerReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    console.log("player ready 1");
  }

  function onPlayerStateChange(newState) {
    console.log("playing");
    console.log(newState);
    console.log(newState.data);
    if (newState.data == 1) {
      // heap.track('Video Playing');
      console.log("playing video");
      $(".no-scroll-wrapper>div").removeClass("no-scroll");
    } else if (newState.data == 0) {
      // heap.track('Video Finished');
      $(".no-scroll-wrapper>div").addClass("no-scroll");
      console.log("Finished");
    } else if (newState.data == 2) {
      // heap.track('Video Paused');
      console.log("paused");
      $(".no-scroll-wrapper>div").addClass("no-scroll");
    }
  }

  function getId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  loadScript();
  setTimeout(function () {
    loadPlayer();
  }, 200);
})(jQuery);
