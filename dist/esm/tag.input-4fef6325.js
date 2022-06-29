import { defineComponent, ref, watch, openBlock, createElementBlock, toDisplayString, createCommentVNode, createElementVNode, normalizeClass, withDirectives, vModelText, Fragment, renderList, createTextVNode } from 'vue';
import { s as styleInject } from './style-inject.es-1f59c1d0.js';

var script = defineComponent({
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
    const isActive = ref(false);
    const search = ref('');

    watch(search, () => {
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
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("label", _hoisted_2, toDisplayString(_ctx.title), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(["dropdown", { 'is-active': _ctx.isActive }])
    }, [
      createElementVNode("div", _hoisted_3, [
        withDirectives(createElementVNode("input", {
          class: normalizeClass(["input", {'is-small': _ctx.isSmall}]),
          type: "text",
          placeholder: "検索",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.search) = $event)),
          onFocus: _cache[1] || (_cache[1] = $event => (_ctx.isActive = true)),
          onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args)))
        }, null, 34 /* CLASS, HYDRATE_EVENTS */), [
          [vModelText, _ctx.search]
        ])
      ]),
      createElementVNode("div", _hoisted_4, [
        createElementVNode("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
            return (openBlock(), createElementBlock("span", {
              key: index,
              onClick: $event => (_ctx.select(item)),
              class: "dropdown-item is-clickable"
            }, toDisplayString(item[_ctx.itemValue]), 9 /* TEXT, PROPS */, _hoisted_6))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ])
    ], 2 /* CLASS */),
    (_ctx.selected.length > 0)
      ? (openBlock(), createElementBlock("div", _hoisted_7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selected, (item, index) => {
            return (openBlock(), createElementBlock("span", {
              key: index,
              class: "tag"
            }, [
              createTextVNode(toDisplayString(_ctx.returnObject ? item[_ctx.itemValue] : item) + " ", 1 /* TEXT */),
              createElementVNode("button", {
                type: "button",
                class: "delete is-small",
                onClick: $event => (_ctx.remove(item))
              }, null, 8 /* PROPS */, _hoisted_8)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : createCommentVNode("v-if", true)
  ]))
}

var css_248z = "\n.dropdown[data-v-279d21bd],\n.dropdown-trigger[data-v-279d21bd],\n.dropdown-menu[data-v-279d21bd] {\n  width: 100%;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-279d21bd";
script.__file = "src/components/tag.input/tag.input.vue";

export { script as s };
