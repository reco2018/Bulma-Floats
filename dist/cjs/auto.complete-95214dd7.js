'use strict';

var vue = require('vue');
var styleInject_es = require('./style-inject.es-dcee06b6.js');

var script = vue.defineComponent({
  props: {
    title: String,
    items: Array,
    item: Object,
    placeHolder: {
      type: String,
      default: '選択してください'
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
  },
  emits: [
    'update:item', 'updated'
  ],
  setup(props, {emit}) {
    const isActive = vue.ref(false);
    const search = vue.ref('');

    vue.watch(search, () => {
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
      search.value = '';
      isActive.value = false;
      if (props.returnObject) {
        emit('update:item', item);
      } else {
        emit('update:item', item[props.itemKey]);
      }
    };

    const onBlur = () => {
      setTimeout(() => {
        isActive.value = false;
      }, 100);
    };

    return {
      isActive,
      search,
      remove,
      select,
      onBlur
    }
  }
});

const _withScopeId = n => (vue.pushScopeId("data-v-5f95ed01"),n=n(),vue.popScopeId(),n);
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
const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("i", { class: "fas fa-trash" }, null, -1 /* HOISTED */));
const _hoisted_11 = [
  _hoisted_10
];
const _hoisted_12 = { class: "column is-narrow" };
const _hoisted_13 = {
  key: 0,
  class: "icon"
};
const _hoisted_14 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("i", { class: "fas fa-chevron-down" }, null, -1 /* HOISTED */));
const _hoisted_15 = [
  _hoisted_14
];
const _hoisted_16 = {
  key: 1,
  class: "icon"
};
const _hoisted_17 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("i", { class: "fas fa-chevron-up" }, null, -1 /* HOISTED */));
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
const _hoisted_22 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (vue.openBlock(), vue.createElementBlock("label", _hoisted_2, vue.toDisplayString(_ctx.title), 1 /* TEXT */))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(["dropdown", { 'is-active': _ctx.isActive }])
    }, [
      vue.createElementVNode("div", {
        class: "dropdown-trigger",
        onClick: _cache[1] || (_cache[1] = $event => (_ctx.disabled ? null : (_ctx.isActive = !_ctx.isActive)))
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["columns is-gapless input is-mobile auto-complete", {'is-small': _ctx.isSmall}])
        }, [
          (_ctx.returnObject)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                (_ctx.item[_ctx.itemKey])
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, vue.toDisplayString(_ctx.item[_ctx.itemValue]), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                (!_ctx.item[_ctx.itemKey])
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, vue.toDisplayString(_ctx.placeHolder), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                (_ctx.item)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, vue.toDisplayString(_ctx.items.find((i) => i[_ctx.itemKey] == _ctx.item)?.[_ctx.itemValue]), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                (!_ctx.item)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8, vue.toDisplayString(_ctx.placeHolder), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ])),
          (_ctx.item.id && !_ctx.isActive)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
                vue.createElementVNode("span", {
                  class: "icon",
                  onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.remove && _ctx.remove(...args)))
                }, _hoisted_11)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", _hoisted_12, [
            (!_ctx.isActive)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_13, _hoisted_15))
              : vue.createCommentVNode("v-if", true),
            (_ctx.isActive)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_16, _hoisted_18))
              : vue.createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */)
      ]),
      vue.createElementVNode("div", _hoisted_19, [
        vue.createElementVNode("div", _hoisted_20, [
          (_ctx.searchable)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_21, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "input",
                  type: "text",
                  placeholder: "検索",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.search) = $event)),
                  onBlur: _cache[3] || (_cache[3] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args)))
                }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
                  [vue.vModelText, _ctx.search]
                ])
              ]))
            : vue.createCommentVNode("v-if", true),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.items, (item, index) => {
            return (vue.openBlock(), vue.createElementBlock("span", {
              key: index,
              onClick: $event => (_ctx.select(item)),
              class: "dropdown-item is-clickable"
            }, vue.toDisplayString(item[_ctx.itemValue]), 9 /* TEXT, PROPS */, _hoisted_22))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ])
    ], 2 /* CLASS */)
  ]))
}

var css_248z = "\n.dropdown[data-v-5f95ed01],\n.dropdown-trigger[data-v-5f95ed01],\n.dropdown-menu[data-v-5f95ed01] {\n  width: 100%;\n}\n.auto-complete[data-v-5f95ed01] {\n  border: 1px solid #ccc;\n  min-height: 24px;\n}\n";
styleInject_es.styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-5f95ed01";
script.__file = "src/components/auto.complete/auto.complete.vue";

exports.script = script;
