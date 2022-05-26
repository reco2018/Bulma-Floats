<template>
  <label class="checkbox mr-3 mb-2" v-for="option in options" :key="option[itemKey]">
    <input type="checkbox" :value="option[itemKey]" @input="input(option)" :checked="isChecked(option)" />
    {{option[itemValue]}}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
    }

    const input = (option) => {
      const isExists = props.selected.find(i => i == option[props.itemKey])
      let data = []
      if (isExists) {
        data = props.selected.filter((i) => option[props.itemKey] != i)
      }else{
        data = [...props.selected, option[props.itemKey]]
      }
      emit('update:selected', data)
      emit('updated')
    }

    return {
      isChecked,
      input
    }
  }
})
</script>
