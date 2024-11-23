import { defineComponent, ref, watch, onMounted, openBlock, createElementBlock, withModifiers, toDisplayString, createCommentVNode, createElementVNode, normalizeClass, withDirectives, vShow, vModelText, normalizeStyle, Fragment, renderList, renderSlot, pushScopeId, popScopeId } from 'vue';
import { s as styleInject } from './style-inject.es-1f59c1d0.js';

var script = defineComponent({
  props: {
    title: String,
    items: {
      type: Array,
      default: () => [{}]
    },
    item : {
      type: Object,
      default: () => ({})
    },
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
    },
    menuHeight: {
      type: Number,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    hideSelectBox: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:item', 'updated'
  ],
  setup(props, { emit, slots }) {
    const isActive = ref(false);
    const search = ref('');
    const hasItemContent = ref(false);
    const input = ref(null);
    const mousedownElement = ref(null);

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
      // search.value = ''
      isActive.value = false;
    };

    const onBlur = () => {
      if (hideSelectBox) return
      setTimeout(() => {
        isActive.value = false;
      }, 100);
    };
    
    onMounted(() => {
      window.document.addEventListener('mousedown', (event) => {
        mousedownElement.value = event.target;
      });
      
      window.document.addEventListener('click', event => {
        // クリック開始された要素がinput要素の場合は何もしない
         // input内のテキストを選択したままinput要素の外までいくとclickイベントが発火してしまうため
        // console.log('input.value', input.value)
        if (mousedownElement.value === input.value) return

        isActive.value = false;
      });
    });

    const hideSelectBox = ref(props.hideSelectBox);

    return {
      isActive,
      search,
      hasItemContent,
      hideSelectBox,
      input,
      remove,
      select,
      onBlur
    }
  }
});

const _withScopeId = n => (pushScopeId("data-v-5f95ed01"),n=n(),popScopeId(),n);
const _hoisted_1 = {
  key: 0,
  class: "label"
};
const _hoisted_2 = {
  key: 0,
  class: "column"
};
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = {
  key: 1,
  class: "column"
};
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = {
  key: 2,
  class: "column is-narrow"
};
const _hoisted_9 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "fas fa-trash" }, null, -1 /* HOISTED */));
const _hoisted_10 = [
  _hoisted_9
];
const _hoisted_11 = { class: "column is-narrow" };
const _hoisted_12 = {
  key: 0,
  class: "icon"
};
const _hoisted_13 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "fas fa-chevron-down" }, null, -1 /* HOISTED */));
const _hoisted_14 = [
  _hoisted_13
];
const _hoisted_15 = {
  key: 1,
  class: "icon"
};
const _hoisted_16 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("i", { class: "fas fa-chevron-up" }, null, -1 /* HOISTED */));
const _hoisted_17 = [
  _hoisted_16
];
const _hoisted_18 = {
  class: "dropdown-menu",
  id: "dropdown-menu",
  role: "menu"
};
const _hoisted_19 = { class: "dropdown-content" };
const _hoisted_20 = {
  key: 0,
  class: "mx-2 mb-1"
};
const _hoisted_21 = ["placeholder"];
const _hoisted_22 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: "field",
    onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
  }, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("label", _hoisted_1, toDisplayString(_ctx.title), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(["dropdown", { 'is-active': _ctx.hideSelectBox ? true : _ctx.isActive }])
    }, [
      withDirectives(createElementVNode("div", {
        class: normalizeClass(["dropdown-trigger", { 'disabled': _ctx.disabled}]),
        onClick: _cache[1] || (_cache[1] = withModifiers($event => (_ctx.disabled ? null : (_ctx.isActive = !_ctx.isActive)), ["stop"]))
      }, [
        createElementVNode("div", {
          class: normalizeClass(["columns is-gapless input is-mobile auto-complete", {'is-small': _ctx.isSmall}])
        }, [
          (_ctx.returnObject)
            ? (openBlock(), createElementBlock("div", _hoisted_2, [
                (_ctx.item[_ctx.itemKey])
                  ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.item[_ctx.itemValue]), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (!_ctx.item[_ctx.itemKey])
                  ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.placeHolder), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_5, [
                (_ctx.item)
                  ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(_ctx.items?.find((i) => i[_ctx.itemKey] == _ctx.item)?.[_ctx.itemValue]), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (!_ctx.item)
                  ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(_ctx.placeHolder), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ])),
          (_ctx.item.id && !_ctx.isActive && !_ctx.disabled)
            ? (openBlock(), createElementBlock("div", _hoisted_8, [
                createElementVNode("span", {
                  class: "icon",
                  onClick: _cache[0] || (_cache[0] = withModifiers((...args) => (_ctx.remove && _ctx.remove(...args)), ["stop"]))
                }, _hoisted_10)
              ]))
            : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_11, [
            (!_ctx.isActive)
              ? (openBlock(), createElementBlock("span", _hoisted_12, _hoisted_14))
              : createCommentVNode("v-if", true),
            (_ctx.isActive)
              ? (openBlock(), createElementBlock("span", _hoisted_15, _hoisted_17))
              : createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */)
      ], 2 /* CLASS */), [
        [vShow, !_ctx.hideSelectBox]
      ]),
      createElementVNode("div", _hoisted_18, [
        createElementVNode("div", _hoisted_19, [
          (_ctx.searchable)
            ? (openBlock(), createElementBlock("div", _hoisted_20, [
                createElementVNode("div", {
                  class: normalizeClass(`control is-medium ${_ctx.isLoading ? 'is-loading' : ''} has-icons-right mt-2`)
                }, [
                  withDirectives(createElementVNode("input", {
                    ref: "input",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.search) = $event)),
                    class: "input",
                    type: "text",
                    placeholder: _ctx.inputPlaceHolder,
                    onBlur: _cache[3] || (_cache[3] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args)))
                  }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_21), [
                    [vModelText, _ctx.search]
                  ])
                ], 2 /* CLASS */)
              ]))
            : createCommentVNode("v-if", true),
          createElementVNode("div", {
            style: normalizeStyle(_ctx.menuHeight ? { overflow: 'scroll', height: _ctx.menuHeight + 'px' } : {})
          }, [
            (_ctx.hasItemContent)
              ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.items, (item, index) => {
                  return (openBlock(), createElementBlock("span", null, [
                    renderSlot(_ctx.$slots, "itemContent", {
                      key: item[_ctx.itemKey],
                      item: item,
                      click: ()=>_ctx.select(item)
                    })
                  ]))
                }), 256 /* UNKEYED_FRAGMENT */))
              : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.items, (item, index) => {
                  return (openBlock(), createElementBlock("span", null, [
                    (openBlock(), createElementBlock("span", {
                      key: item[_ctx.itemKey],
                      onClick: withModifiers($event => (_ctx.select(item)), ["stop"]),
                      class: "dropdown-item is-clickable"
                    }, toDisplayString(item[_ctx.itemValue]), 9 /* TEXT, PROPS */, _hoisted_22))
                  ]))
                }), 256 /* UNKEYED_FRAGMENT */))
          ], 4 /* STYLE */)
        ])
      ])
    ], 2 /* CLASS */)
  ]))
}

var css_248z = "\n.dropdown[data-v-5f95ed01],\n.dropdown-trigger[data-v-5f95ed01],\n.dropdown-menu[data-v-5f95ed01] {\n  width: 100%;\n}\n.dropdown-trigger.disabled .input[data-v-5f95ed01] {\n  cursor: not-allowed;\n  background-color: #f5f5f5;\n  color:gray !important;\n}\n.auto-complete[data-v-5f95ed01] {\n  border: 1px solid #ccc;\n  min-height: 24px;\n}\n.control.is-loading[data-v-5f95ed01]::after {\n  border: 2px solid #157562;\n  border-right-color: transparent;\n  border-top-color: transparent;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-5f95ed01";
script.__file = "src/components/auto.complete/auto.complete.vue";

export { script as s };
