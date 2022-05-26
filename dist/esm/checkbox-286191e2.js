import { defineComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, createTextVNode, toDisplayString } from 'vue';

var script = defineComponent({
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
  return (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option) => {
    return (openBlock(), createElementBlock("label", {
      class: "checkbox mr-3 mb-2",
      key: option[_ctx.itemKey]
    }, [
      createElementVNode("input", {
        type: "checkbox",
        value: option[_ctx.itemKey],
        onInput: $event => (_ctx.input(option)),
        checked: _ctx.isChecked(option)
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1),
      createTextVNode(" " + toDisplayString(option[_ctx.itemValue]), 1 /* TEXT */)
    ]))
  }), 128 /* KEYED_FRAGMENT */))
}

script.render = render;
script.__file = "src/components/checkbox/checkbox.vue";

export { script as s };
