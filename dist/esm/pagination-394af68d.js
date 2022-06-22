import { defineComponent, computed, openBlock, createElementBlock, createCommentVNode, createElementVNode, Fragment, renderList, toDisplayString } from 'vue';
import { useNuxtApp, useRoute, useRouter } from 'nuxt/app';

var script = defineComponent({
  props: {
    meta: Object
  },
  setup() {
    const { $Airporter } = useNuxtApp();
    const route = useRoute();
    useRouter();

    const current = computed({
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
const _hoisted_5 = /*#__PURE__*/createElementVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* HOISTED */);
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = {
  key: 2,
  class: "pagination-link is-current"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.meta.last_page > 1)
    ? (openBlock(), createElementBlock("nav", _hoisted_1, [
        (_ctx.current > 1)
          ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "pagination-previous",
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.changePage(_ctx.current - 1)))
            }, " Previous "))
          : createCommentVNode("v-if", true),
        (_ctx.meta.total > _ctx.current)
          ? (openBlock(), createElementBlock("a", {
              key: 1,
              class: "pagination-next",
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.changePage(_ctx.current + 1)))
            }, " Next "))
          : createCommentVNode("v-if", true),
        createElementVNode("ul", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.meta.last_page, (index) => {
            return (openBlock(), createElementBlock("li", null, [
              (index !== _ctx.current
          && (index < 6
          || index > _ctx.meta.last_page - 5
          || (index > _ctx.current - 2 && index < _ctx.current + 2)))
                ? (openBlock(), createElementBlock("a", {
                    key: 0,
                    class: "pagination-link",
                    onClick: $event => (_ctx.changePage(index))
                  }, toDisplayString(index), 9 /* TEXT, PROPS */, _hoisted_3))
                : createCommentVNode("v-if", true),
              ((_ctx.current > 7 && index == 6) || (_ctx.current < _ctx.meta.last_page - 6 && index == _ctx.meta.last_page - 5))
                ? (openBlock(), createElementBlock("li", _hoisted_4, _hoisted_6))
                : createCommentVNode("v-if", true),
              (index == _ctx.current)
                ? (openBlock(), createElementBlock("a", _hoisted_7, toDisplayString(index), 1 /* TEXT */))
                : createCommentVNode("v-if", true)
            ]))
          }), 256 /* UNKEYED_FRAGMENT */))
        ])
      ]))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "src/components/pagination/pagination.vue";

export { script as s };
