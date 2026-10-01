'use strict';

var vue = require('vue');
var app = require('nuxt/app');

var script = vue.defineComponent({
  props: {
    meta: Object,
    defaultLimit: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const { $Airporter } = app.useNuxtApp();
    const route = app.useRoute();
    app.useRouter();
    const isActive = vue.ref(false);

    const current = vue.computed({
      get: () => Number(route.query.page || 1),
      set: () => {}
    });

    const currentLimit = vue.computed({
      get: () => route.query.limit ? Number(route.query.limit) : props.defaultLimit,
      set: () => {}
    });

    const changePage = (page) => {
      $Airporter.updateQuery({ page });
    };

    const changeLimit = (limit) => {
      $Airporter.updateQuery({ limit, page: 1 });
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
  class: "pagination",
  role: "navigation",
  "aria-label": "pagination"
};
const _hoisted_2 = { class: "mr-2" };
const _hoisted_3 = { class: "has-text-weight-bold" };
const _hoisted_4 = { class: "select" };
const _hoisted_5 = { class: "pagination-list" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { key: 1 };
const _hoisted_8 = {
  key: 2,
  class: "pagination-link is-current"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("nav", _hoisted_1, [
    (_ctx.current > 1)
      ? (vue.openBlock(), vue.createElementBlock("a", {
          key: 0,
          class: "pagination-previous",
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.changePage(_ctx.current - 1)))
        }, " 前へ "))
      : vue.createCommentVNode("v-if", true),
    (_ctx.meta.last_page > _ctx.current)
      ? (vue.openBlock(), vue.createElementBlock("a", {
          key: 1,
          class: "pagination-next",
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.changePage(_ctx.current + 1)))
        }, " 次へ "))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("p", _hoisted_2, [
      _cache[4] || (_cache[4] = vue.createTextVNode(" 全", -1 /* CACHED */)),
      vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.meta?.total), 1 /* TEXT */),
      _cache[5] || (_cache[5] = vue.createTextVNode("件 ", -1 /* CACHED */))
    ]),
    vue.createElementVNode("div", _hoisted_4, [
      vue.withDirectives(vue.createElementVNode("select", {
        name: "limits",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.currentLimit) = $event)),
        onChange: _cache[3] || (_cache[3] = (e) => _ctx.changeLimit(e.target.value))
      }, [...(_cache[6] || (_cache[6] = [
        vue.createStaticVNode("<option value=\"\" disabled>表示件数</option><option value=\"10\">10件</option><option value=\"20\">20件</option><option value=\"50\">50件</option><option value=\"100\">100件</option><option value=\"200\">200件</option>", 6)
      ]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [
        [vue.vModelSelect, _ctx.currentLimit]
      ])
    ]),
    vue.createElementVNode("ul", _hoisted_5, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.meta?.last_page, (index) => {
        return (vue.openBlock(), vue.createElementBlock("li", null, [
          (index !== _ctx.current
          && (index < 6
          || index > _ctx.meta?.last_page - 5
          || (index > _ctx.current - 2 && index < _ctx.current + 2)))
            ? (vue.openBlock(), vue.createElementBlock("a", {
                key: 0,
                class: "pagination-link",
                onClick: $event => (_ctx.changePage(index))
              }, vue.toDisplayString(index), 9 /* TEXT, PROPS */, _hoisted_6))
            : vue.createCommentVNode("v-if", true),
          ((_ctx.current > 7 && index == 6) || (_ctx.current < _ctx.meta?.last_page - 6 && index == _ctx.meta?.last_page - 5))
            ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_7, [...(_cache[7] || (_cache[7] = [
                vue.createElementVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* CACHED */)
              ]))]))
            : vue.createCommentVNode("v-if", true),
          (index == _ctx.current)
            ? (vue.openBlock(), vue.createElementBlock("a", _hoisted_8, vue.toDisplayString(index), 1 /* TEXT */))
            : vue.createCommentVNode("v-if", true)
        ]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ])
  ]))
}

script.render = render;
script.__file = "src/components/pagination/pagination.vue";

exports.script = script;
