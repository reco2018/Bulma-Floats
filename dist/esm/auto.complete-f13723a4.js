import { defineComponent, ref, watch, openBlock, createElementBlock, toDisplayString, createCommentVNode, createElementVNode, normalizeClass, withDirectives, vModelText, Fragment, renderList, renderSlot, pushScopeId, popScopeId } from 'vue';
import { s as styleInject } from './style-inject.es-1f59c1d0.js';

var script = defineComponent({
  props: {
    title: String,
    items: Array,
    item: Object,
    placeHolder: {
      type: String,
      default: '選択してください'
    },
    inputPlaceHolder: {
      type: String,
      default: '検索'
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    itemValue: {
      type: String,
      default: 'name'
    },
    returnObject: {
      type: Boolean,
      default: true
    },
    searchable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    itemTemplete: {
      type: String,
      default: null
    }
  },
  emits: [
    'update:item', 'updated'
  ],
  setup(props, { emit, slots }) {
    const isActive = ref(false);
    const search = ref('');
    const hasItemContent = ref(false);

    if (slots.itemContent) {
      hasItemContent.value = true;
    }

    watch(search, () => {
      emit('updated', search.value);
    });

    const remove = (item) => {
      if (props.returnObject) {
        emit('update:item', {});
      } else {
        emit('update:item', '');
      }
    };

    const select = (item) => {
      if (props.returnObject) {
        emit('update:item', item);
      } else {
        emit('update:item', item[props.itemKey]);
      }
      search.value = '';
      isActive.value = false;
    };

    const onBlur = () => {
      setTimeout(() => {
        isActive.value = false;
      }, 100);
    };

    return {
      isActive,
      search,
      hasItemContent,
      remove,
      select,
      onBlur
    }
  }
});

const _withScopeId = n => (pushScopeId("data-v-5f95ed01"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "field" };
const _hoisted_2 = {
  key: 0,
  class: "label"
};
const _hoisted_3 = {
  key: 0,
  class: "column"
};
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = {
  key: 1,
  class: "column"
};
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = {
  key: 2,
  class: "column is-narrow"
};
const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "fas fa-trash" }, null, -1 /* HOISTED */));
const _hoisted_11 = [
  _hoisted_10
];
const _hoisted_12 = { class: "column is-narrow" };
const _hoisted_13 = {
  key: 0,
  class: "icon"
};
const _hoisted_14 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "fas fa-chevron-down" }, null, -1 /* HOISTED */));
const _hoisted_15 = [
  _hoisted_14
];
const _hoisted_16 = {
  key: 1,
  class: "icon"
};
const _hoisted_17 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "fas fa-chevron-up" }, null, -1 /* HOISTED */));
const _hoisted_18 = [
  _hoisted_17
];
const _hoisted_19 = {
  class: "dropdown-menu",
  id: "dropdown-menu",
  role: "menu"
};
const _hoisted_20 = { class: "dropdown-content" };
const _hoisted_21 = {
  key: 0,
  class: "mx-2 mb-1"
};
const _hoisted_22 = ["placeholder"];
const _hoisted_23 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("label", _hoisted_2, toDisplayString(_ctx.title), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(["dropdown", { 'is-active': _ctx.isActive }])
    }, [
      createElementVNode("div", {
        class: "dropdown-trigger",
        onClick: _cache[1] || (_cache[1] = $event => (_ctx.disabled ? null : (_ctx.isActive = !_ctx.isActive)))
      }, [
        createElementVNode("div", {
          class: normalizeClass(["columns is-gapless input is-mobile auto-complete", {'is-small': _ctx.isSmall}])
        }, [
          (_ctx.returnObject)
            ? (openBlock(), createElementBlock("div", _hoisted_3, [
                (_ctx.item[_ctx.itemKey])
                  ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.item[_ctx.itemValue]), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (!_ctx.item[_ctx.itemKey])
                  ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(_ctx.placeHolder), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_6, [
                (_ctx.item)
                  ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(_ctx.items.find((i) => i[_ctx.itemKey] == _ctx.item)?.[_ctx.itemValue]), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (!_ctx.item)
                  ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(_ctx.placeHolder), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ])),
          (_ctx.item.id && !_ctx.isActive)
            ? (openBlock(), createElementBlock("div", _hoisted_9, [
                createElementVNode("span", {
                  class: "icon",
                  onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.remove && _ctx.remove(...args)))
                }, _hoisted_11)
              ]))
            : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_12, [
            (!_ctx.isActive)
              ? (openBlock(), createElementBlock("span", _hoisted_13, _hoisted_15))
              : createCommentVNode("v-if", true),
            (_ctx.isActive)
              ? (openBlock(), createElementBlock("span", _hoisted_16, _hoisted_18))
              : createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */)
      ]),
      createElementVNode("div", _hoisted_19, [
        createElementVNode("div", _hoisted_20, [
          (_ctx.searchable)
            ? (openBlock(), createElementBlock("div", _hoisted_21, [
                withDirectives(createElementVNode("input", {
                  class: "input",
                  type: "text",
                  placeholder: _ctx.inputPlaceHolder,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.search) = $event))
                }, null, 8 /* PROPS */, _hoisted_22), [
                  [vModelText, _ctx.search]
                ])
              ]))
            : createCommentVNode("v-if", true),
          (_ctx.hasItemContent)
            ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.items, (item, index) => {
                return (openBlock(), createElementBlock("span", null, [
                  renderSlot(_ctx.$slots, "itemContent", {
                    key: item[_ctx.itemKey],
                    item: item,
                    click: () => _ctx.select(item)
                  })
                ]))
              }), 256 /* UNKEYED_FRAGMENT */))
            : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(_ctx.items, (item, index) => {
                return (openBlock(), createElementBlock("span", null, [
                  (openBlock(), createElementBlock("span", {
                    key: item[_ctx.itemKey],
                    onClick: $event => (_ctx.select(item)),
                    class: "dropdown-item is-clickable"
                  }, toDisplayString(item[_ctx.itemValue]), 9 /* TEXT, PROPS */, _hoisted_23))
                ]))
              }), 256 /* UNKEYED_FRAGMENT */))
        ])
      ])
    ], 2 /* CLASS */)
  ]))
}

var css_248z = "\n.dropdown[data-v-5f95ed01],\n.dropdown-trigger[data-v-5f95ed01],\n.dropdown-menu[data-v-5f95ed01] {\n  width: 100%;\n}\n.auto-complete[data-v-5f95ed01] {\n  border: 1px solid #ccc;\n  min-height: 24px;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-5f95ed01";
script.__file = "src/components/auto.complete/auto.complete.vue";

export { script as s };
