'use strict';

var vue = require('vue');
var app = require('nuxt/app');

var script = vue.defineComponent({
  props: {
    meta: Object
  },
  setup() {
    const { $Airporter } = app.useNuxtApp();
    const route = app.useRoute();
    app.useRouter();

    const current = vue.computed({
      get: () => Number(route.query.page || 1)
    });

    const changePage = (page) => {
      $Airporter.updateQuery({ page });
    };

    return {
      current,
      changePage
    }
  }
});

const _hoisted_1 = {
  key: 0,
  class: "pagination",
  role: "navigation",
  "aria-label": "pagination"
};
const _hoisted_2 = { class: "pagination-list" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { key: 1 };
const _hoisted_5 = /*#__PURE__*/vue.createElementVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = {
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
        vue.createElementVNode("ul", _hoisted_2, [
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
                  }, vue.toDisplayString(index), 9 /* TEXT, PROPS */, _hoisted_3))
                : vue.createCommentVNode("v-if", true),
              ((_ctx.current > 7 && index == 6) || (_ctx.current < _ctx.meta.last_page - 6 && index == _ctx.meta.last_page - 5))
                ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_4, _hoisted_6))
                : vue.createCommentVNode("v-if", true),
              (index == _ctx.current)
                ? (vue.openBlock(), vue.createElementBlock("a", _hoisted_7, vue.toDisplayString(index), 1 /* TEXT */))
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
