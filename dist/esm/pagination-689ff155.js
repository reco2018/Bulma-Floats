import { defineComponent, ref, computed, openBlock, createElementBlock, createCommentVNode, createElementVNode, createTextVNode, toDisplayString, withDirectives, createStaticVNode, vModelSelect, Fragment, renderList } from 'vue';
import { useNuxtApp, useRoute, useRouter } from 'nuxt/app';

var script = defineComponent({
  props: {
    meta: Object,
    defaultLimit: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const { $Airporter } = useNuxtApp();
    const route = useRoute();
    useRouter();
    const isActive = ref(false);

    const current = computed({
      get: () => Number(route.query.page || 1),
      set: () => {}
    });

    const currentLimit = computed({
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
  return (openBlock(), createElementBlock("nav", _hoisted_1, [
    (_ctx.current > 1)
      ? (openBlock(), createElementBlock("a", {
          key: 0,
          class: "pagination-previous",
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.changePage(_ctx.current - 1)))
        }, " 前へ "))
      : createCommentVNode("v-if", true),
    (_ctx.meta.last_page > _ctx.current)
      ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: "pagination-next",
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.changePage(_ctx.current + 1)))
        }, " 次へ "))
      : createCommentVNode("v-if", true),
    createElementVNode("p", _hoisted_2, [
      _cache[4] || (_cache[4] = createTextVNode(" 全", -1 /* CACHED */)),
      createElementVNode("span", _hoisted_3, toDisplayString(_ctx.meta?.total), 1 /* TEXT */),
      _cache[5] || (_cache[5] = createTextVNode("件 ", -1 /* CACHED */))
    ]),
    createElementVNode("div", _hoisted_4, [
      withDirectives(createElementVNode("select", {
        name: "limits",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.currentLimit) = $event)),
        onChange: _cache[3] || (_cache[3] = (e) => _ctx.changeLimit(e.target.value))
      }, [...(_cache[6] || (_cache[6] = [
        createStaticVNode("<option value=\"\" disabled>表示件数</option><option value=\"10\">10件</option><option value=\"20\">20件</option><option value=\"50\">50件</option><option value=\"100\">100件</option><option value=\"200\">200件</option>", 6)
      ]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [
        [vModelSelect, _ctx.currentLimit]
      ])
    ]),
    createElementVNode("ul", _hoisted_5, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.meta?.last_page, (index) => {
        return (openBlock(), createElementBlock("li", null, [
          (index !== _ctx.current
          && (index < 6
          || index > _ctx.meta?.last_page - 5
          || (index > _ctx.current - 2 && index < _ctx.current + 2)))
            ? (openBlock(), createElementBlock("a", {
                key: 0,
                class: "pagination-link",
                onClick: $event => (_ctx.changePage(index))
              }, toDisplayString(index), 9 /* TEXT, PROPS */, _hoisted_6))
            : createCommentVNode("v-if", true),
          ((_ctx.current > 7 && index == 6) || (_ctx.current < _ctx.meta?.last_page - 6 && index == _ctx.meta?.last_page - 5))
            ? (openBlock(), createElementBlock("li", _hoisted_7, [...(_cache[7] || (_cache[7] = [
                createElementVNode("span", { class: "pagination-ellipsis" }, "…", -1 /* CACHED */)
              ]))]))
            : createCommentVNode("v-if", true),
          (index == _ctx.current)
            ? (openBlock(), createElementBlock("a", _hoisted_8, toDisplayString(index), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ])
  ]))
}

script.render = render;
script.__file = "src/components/pagination/pagination.vue";

export { script as s };
