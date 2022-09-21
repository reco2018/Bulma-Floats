<template>
  <div class="field">
    <label v-if="title" class="label">{{ title }}</label>
    <div class="dropdown" :class="{ 'is-active': isActive }">
      <div class="dropdown-trigger" @click="disabled ? null : (isActive = !isActive)">
        <div class="columns is-gapless input is-mobile auto-complete" :class="{'is-small': isSmall}">
          <div class="column" v-if="returnObject">
            <span v-if="item[itemKey]">{{ item[itemValue] }}</span>
            <span v-if="!item[itemKey]">{{placeHolder}}</span>
          </div>
          <div class="column" v-else>
            <span v-if="item">{{ items.find((i) => i[itemKey] == item)?.[itemValue] }}</span>
            <span v-if="!item">{{placeHolder}}</span>
          </div>

          <div v-if="item.id && !isActive" class="column is-narrow">
            <span class="icon" @click="remove"><i class="fas fa-trash"></i></span>
          </div>
          <div class="column is-narrow">
            <span v-if="!isActive" class="icon"><i class="fas fa-chevron-down"></i></span>
            <span v-if="isActive" class="icon"><i class="fas fa-chevron-up"></i></span>
          </div>
        </div>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="mx-2 mb-1" v-if="searchable">
            <input class="input" type="text" :placeholder="inputPlaceHolder" v-model="search" @blur="onBlur" />
          </div>
          <span v-for="(item, index) in items" :key="item[itemKey]" @click="select(item)" class="dropdown-item is-clickable">
            {{ item[itemValue] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
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
  },
  emits: [
    'update:item', 'updated'
  ],
  setup(props, {emit}) {
    const isActive = ref(false)
    const search = ref('')

    watch(search, () => {
      emit('updated', search.value)
    })

    const remove = (item) => {
      if (props.returnObject) {
        emit('update:item', {})
      } else {
        emit('update:item', '')
      }
    }

    const select = (item) => {
      if (props.returnObject) {
        emit('update:item', item)
      } else {
        emit('update:item', item[props.itemKey])
      }
      search.value = ''
      isActive.value = false
    }

    const onBlur = () => {
      setTimeout(() => {
        isActive.value = false
      }, 100)
    }

    return {
      isActive,
      search,
      remove,
      select,
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
.auto-complete {
  border: 1px solid #ccc;
  min-height: 24px;
}
</style>
