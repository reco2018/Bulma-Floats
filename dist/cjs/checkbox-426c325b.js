'use strict';

var vue = require('vue');

var script = vue.defineComponent({
  props: {
    options: Array,
    selected: Array,
    itemKey: {
      type: String,
      default: 'id'
    },
    itemValue: {
      type: String,
      default: 'name'
    },
  },
  emits: [
    'update:selected', 'updated'
  ],
  setup(props, {emit}) {
    const isChecked = (option) => {
      return props.selected.find(i => i == option[props.itemKey])
    };

    const input = (option) => {
      const isExists = props.selected.find(i => i == option[props.itemKey]);
      let data = [];
      if (isExists) {
        data = props.selected.filter((i) => option[props.itemKey] != i);
      }else {
        data = [...props.selected, option[props.itemKey]];
      }
      emit('update:selected', data);
      emit('updated');
    };

    return {
      isChecked,
      input
    }
  }
});

const _hoisted_1 = ["value", "onInput", "checked"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.options, (option) => {
    return (vue.openBlock(), vue.createElementBlock("label", {
      class: "checkbox mr-3 mb-2",
      key: option[_ctx.itemKey]
    }, [
      vue.createElementVNode("input", {
        type: "checkbox",
        value: option[_ctx.itemKey],
        onInput: $event => (_ctx.input(option)),
        checked: _ctx.isChecked(option)
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1),
      vue.createTextVNode(" " + vue.toDisplayString(option[_ctx.itemValue]), 1 /* TEXT */)
    ]))
  }), 128 /* KEYED_FRAGMENT */))
}

script.render = render;
script.__file = "src/components/checkbox/checkbox.vue";

exports.script = script;
