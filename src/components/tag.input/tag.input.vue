<template>
  <div class="field">
    <label v-if="title" class="label">{{ title }}</label>
    <div class="dropdown" :class="{ 'is-active': isActive }">
      <div class="dropdown-trigger">
        <input 
          class="input" :class="{'is-small': isSmall}"
          type="text" placeholder="検索"
          v-model="search" @focus="isActive = true"
          @blur="onBlur"
        />
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <span v-for="(item, index) in items" :key="index" @mousedown="select(item)" class="dropdown-item is-clickable">
            {{ item[itemValue] }}
          </span>
        </div>
      </div>
    </div>

    <div class="tags mt-2" v-if="selected.length > 0">
      <slot name="tags">
        <span v-for="(item, index) in selected" :key="index" class="tag">
          {{ returnObject ? item[itemValue] : item }}
          <button type="button" class="delete is-small" @mousedown="remove(item)"></button>
        </span>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
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
    const isActive = ref(false)
    const search = ref('')

    watch(search, () => {
      emit('updated', search.value)
    })

    const select = (item) => {
      search.value = ''
      let isExits = null
      if (props.returnObject) {
        isExits = props.selected.find((i) => item[props.itemKey] == i[props.itemKey])  
      } else {
        isExits = props.selected.find((i) => item[props.itemKey] == i)
      }
      isExits ? remove(item) : append(item)
    }

    const append = (item) => {
      let data = []
      if (props.returnObject) {
        data = [...props.selected, item]
      } else {
        data = [...props.selected, item[props.itemKey]]
      }
      emit('update:selected', data)
    }

    const remove = (item) => {
      let data = []
      if (props.returnObject) {
        data = props.selected.filter((i) => item[props.itemKey] !== i[props.itemKey])
      } else {
        data = props.selected.filter((i) => item !== i)
      }
      emit('update:selected', data)
    }

    const onBlur = () => {
      setTimeout(() => {
        isActive.value = false
      }, 100)
    }

    return {
      isActive,
      search,
      select,
      append,
      remove,
      onBlur
    }
  }
})
</script>
<style scoped>
.dropdown,
.dropdown-trigger,
.dropdown-menu {
  width: 100%;
}
</style>
