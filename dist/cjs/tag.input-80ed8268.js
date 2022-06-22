'use strict';

var vue = require('vue');
var styleInject_es = require('./style-inject.es-dcee06b6.js');

var script = vue.defineComponent({
  props: {
    title: String,
    items: Array,
    selected: Array,
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
    isSmall: {
      type: Boolean,
      default: false
    },
  },
  emits: [
    'update:selected', 'updated'
  ],
  setup(props, {emit}) {
    const isActive = vue.ref(false);
    const search = vue.ref('');

    vue.watch(search, () => {
      emit('updated', search.value);
    });

    const select = (item) => {
      search.value = '';
      let isExits = null;
      if (props.returnObject) {
        isExits = props.selected.find((i) => item[props.itemKey] == i[props.itemKey]);  
      } else {
        isExits = props.selected.find((i) => item[props.itemValue] == i);
      }
      isExits ? remove(item) : append(item);
    };

    const append = (item) => {
      let data = [];
      if (props.returnObject) {
        data = [...props.selected, item];
      } else {
        data = [...props.selected, item[props.itemValue]];
      }
      emit('update:selected', data);
    };

    const remove = (item) => {
      let data = [];
      if (props.returnObject) {
        data = props.selected.filter((i) => item[props.itemKey] !== i[props.itemKey]);
      } else {
        data = props.selected.filter((i) => item[props.itemValue] !== i);
      }
      emit('update:selected', data);
    };

    const onBlur = () => {
      setTimeout(() => {
        isActive.value = false;
      }, 100);
    };

    return {
      isActive,
      search,
      select,
      append,
      remove,
      onBlur
    }
  }
});

const _hoisted_1 = { class: "field" };
const _hoisted_2 = {
  key: 0,
  class: "label"
};
const _hoisted_3 = { class: "dropdown-trigger" };
const _hoisted_4 = {
  class: "dropdown-menu",
  id: "dropdown-menu",
  role: "menu"
};
const _hoisted_5 = { class: "dropdown-content" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 1,
  class: "tags mt-2"
};
const _hoisted_8 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (vue.openBlock(), vue.createElementBlock("label", _hoisted_2, vue.toDisplayString(_ctx.title), 1 /* TEXT */))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(["dropdown", { 'is-active': _ctx.isActive }])
    }, [
      vue.createElementVNode("div", _hoisted_3, [
        vue.withDirectives(vue.createElementVNode("input", {
          class: vue.normalizeClass(["input", {'is-small': _ctx.isSmall}]),
          type: "text",
          placeholder: "検索",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.search) = $event)),
          onFocus: _cache[1] || (_cache[1] = $event => (_ctx.isActive = true)),
          onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args)))
        }, null, 34 /* CLASS, HYDRATE_EVENTS */), [
          [vue.vModelText, _ctx.search]
        ])
      ]),
      vue.createElementVNode("div", _hoisted_4, [
        vue.createElementVNode("div", _hoisted_5, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.items, (item, index) => {
            return (vue.openBlock(), vue.createElementBlock("span", {
              key: index,
              onClick: $event => (_ctx.select(item)),
              class: "dropdown-item is-clickable"
            }, vue.toDisplayString(item[_ctx.itemValue]), 9 /* TEXT, PROPS */, _hoisted_6))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ])
    ], 2 /* CLASS */),
    (_ctx.selected.length > 0)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.selected, (item, index) => {
            return (vue.openBlock(), vue.createElementBlock("span", {
              key: index,
              class: "tag"
            }, [
              vue.createTextVNode(vue.toDisplayString(_ctx.returnObject ? item[_ctx.itemValue] : item) + " ", 1 /* TEXT */),
              vue.createElementVNode("button", {
                class: "delete is-small",
                onClick: $event => (_ctx.remove(item))
              }, null, 8 /* PROPS */, _hoisted_8)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : vue.createCommentVNode("v-if", true)
  ]))
}

var css_248z = "\n.dropdown[data-v-279d21bd],\n.dropdown-trigger[data-v-279d21bd],\n.dropdown-menu[data-v-279d21bd] {\n  width: 100%;\n}\n";
styleInject_es.styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-279d21bd";
script.__file = "src/components/tag.input/tag.input.vue";

exports.script = script;
