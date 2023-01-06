'use strict';

var vue = require('vue');

function createContext() {
  let currentInstance = null;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  return {
    use: () => currentInstance,
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = null;
      isSingleton = false;
    },
    call: (instance, cb) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return cb();
      } finally {
        if (!isSingleton) {
          currentInstance = null;
        }
      }
    },
    async callAsync(instance, cb) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = cb();
        if (!isSingleton) {
          currentInstance = null;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace() {
  const contexts = {};
  return {
    get(key) {
      if (!contexts[key]) {
        contexts[key] = createContext();
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key) => defaultNamespace.get(key);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

function createMock(name, overrides = {}) {
  const fn = function() {
  };
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    enumerate(_target) {
      return [];
    }
  });
}
createMock("mock");

({
  isClient: process.client,
  isServer: process.server,
  isDev: process.dev,
  isStatic: void 0,
  target: "server",
  modern: false
});

const nuxtAppCtx = getContext("nuxt-app");
function useNuxtApp() {
  const vm = vue.getCurrentInstance();
  if (!vm) {
    const nuxtAppInstance = nuxtAppCtx.use();
    if (!nuxtAppInstance) {
      throw new Error("nuxt instance unavailable");
    }
    return nuxtAppInstance;
  }
  return vm.appContext.app.$nuxt;
}

const PROTOCOL_REGEX = /^\w+:(\/\/)?/;
const PROTOCOL_RELATIVE_REGEX = /^\/\/[^/]+/;
function hasProtocol(inputStr, acceptProtocolRelative = false) {
  return PROTOCOL_REGEX.test(inputStr) || acceptProtocolRelative && PROTOCOL_RELATIVE_REGEX.test(inputStr);
}

const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  return useNuxtApp()._route;
};

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const checkPropConflicts = (props, main, sub) => {
    if (process.dev && props[main] !== void 0 && props[sub] !== void 0) {
      console.warn(`[${componentName}] \`${main}\` and \`${sub}\` cannot be used together. \`${sub}\` will be ignored.`);
    }
  };
  return vue.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue.computed(() => {
        checkPropConflicts(props, "to", "href");
        return props.to || props.href || "";
      });
      const isExternal = vue.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        if (!isExternal.value) {
          return vue.h(vue.resolveComponent("RouterLink"), {
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue
          }, slots.default);
        }
        const href = typeof to.value === "object" ? router.resolve(to.value)?.href ?? null : to.value || null;
        const target = props.target || null;
        checkPropConflicts(props, "noRel", "rel");
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        return vue.h("a", { href, rel, target }, slots.default?.());
      };
    }
  });
}
defineNuxtLink({ componentName: "NuxtLink" });

var script = vue.defineComponent({
  props: {
    meta: Object
  },
  setup() {
    const { $Airporter } = useNuxtApp();
    const route = useRoute();
    useRouter();
    const isActive = vue.ref(false);

    const current = vue.computed({
      get: () => Number(route.query.page || 1)
    });

    const currentLimit = vue.computed({
      get: () => Number(route.query.limit || 10)
    });

    const changePage = (page) => {
      $Airporter.updateQuery({ page });
    };

    const changeLimit = (limit) => {
      $Airporter.updateQuery({ limit });
    };

    return {
      current,
      currentLimit,
      changePage,
      changeLimit,
      isActive
    }
  }
});

const _hoisted_1 = {
  key: 0,
  class: "pagination",
  role: "navigation",
  "aria-label": "pagination"
};
const _hoisted_2 = { class: "select" };
const _hoisted_3 = /*#__PURE__*/vue.createStaticVNode("<option value=\"\">表示件数</option><option value=\"10\">10件</option><option value=\"20\">20件</option><option value=\"50\">50件</option><option value=\"100\">100件</option><option value=\"200\">200件</option>", 6);
const _hoisted_9 = [
  _hoisted_3
];
const _hoisted_10 = { class: "pagination-list" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { key: 1 };
const _hoisted_13 = /*#__PURE__*/vue.createElementVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_14 = [
  _hoisted_13
];
const _hoisted_15 = {
  key: 2,
  class: "pagination-link is-current"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.meta.last_page > 1)
    ? (vue.openBlock(), vue.createElementBlock("nav", _hoisted_1, [
        (_ctx.current > 1)
          ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 0,
              class: "pagination-previous",
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.changePage(_ctx.current - 1)))
            }, " Previous "))
          : vue.createCommentVNode("v-if", true),
        (_ctx.meta.total > _ctx.current)
          ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 1,
              class: "pagination-next",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.changePage(_ctx.current + 1)))
            }, " Next "))
          : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", _hoisted_2, [
          vue.withDirectives(vue.createElementVNode("select", {
            name: "limits",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.currentLimit) = $event)),
            onChange: _cache[3] || (_cache[3] = (e) => _ctx.changeLimit(e.target.value))
          }, _hoisted_9, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
            [vue.vModelSelect, _ctx.currentLimit]
          ])
        ]),
        vue.createElementVNode("ul", _hoisted_10, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.meta.last_page, (index) => {
            return (vue.openBlock(), vue.createElementBlock("li", null, [
              (index !== _ctx.current
          && (index < 6
          || index > _ctx.meta.last_page - 5
          || (index > _ctx.current - 2 && index < _ctx.current + 2)))
                ? (vue.openBlock(), vue.createElementBlock("a", {
                    key: 0,
                    class: "pagination-link",
                    onClick: $event => (_ctx.changePage(index))
                  }, vue.toDisplayString(index), 9 /* TEXT, PROPS */, _hoisted_11))
                : vue.createCommentVNode("v-if", true),
              ((_ctx.current > 7 && index == 6) || (_ctx.current < _ctx.meta.last_page - 6 && index == _ctx.meta.last_page - 5))
                ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_12, _hoisted_14))
                : vue.createCommentVNode("v-if", true),
              (index == _ctx.current)
                ? (vue.openBlock(), vue.createElementBlock("a", _hoisted_15, vue.toDisplayString(index), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true)
            ]))
          }), 256 /* UNKEYED_FRAGMENT */))
        ])
      ]))
    : vue.createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "src/components/pagination/pagination.vue";

exports.script = script;
