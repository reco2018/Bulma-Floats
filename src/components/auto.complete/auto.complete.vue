<template>
  <div class="field" @click.stop="()=>{}">
    <label v-if="title" class="label">{{ title }}</label>
    <div class="dropdown" :class="{ 'is-active': hideSelectBox ? true : isActive }">
      <div v-show="!hideSelectBox" class="dropdown-trigger" @click.stop="disabled ? null : (isActive = !isActive)">
        <div class="columns is-gapless input is-mobile auto-complete" :class="{'is-small': isSmall}">
          <div class="column" v-if="returnObject">
            <span v-if="item[itemKey]">{{ item[itemValue] }}</span>
            <span v-if="!item[itemKey]">{{placeHolder}}</span>
          </div>
          <div class="column" v-else>
            <span v-if="item">{{ items?.find((i) => i[itemKey] == item)?.[itemValue] }}</span>
            <span v-if="!item">{{placeHolder}}</span>
          </div>

          <div v-if="item.id && !isActive && !disabled" class="column is-narrow">
            <span class="icon" @click.stop="remove"><i class="fas fa-trash"></i></span>
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
            <div :class="`control is-medium ${isLoading ? 'is-loading' : ''} has-icons-right mt-2`">
              <input ref="input" class="input" type="text" :placeholder="inputPlaceHolder" v-model="search"
              @blur="onBlur" />
            </div>
          </div>
          <div :style="menuHeight ? { overflow: 'scroll', height: menuHeight + 'px' } : {}">
            <span v-if="hasItemContent" v-for="(item, index) in items">
              <slot :key="item[itemKey]" name="itemContent" :item="item" :click="() => select(item)"></slot>
            </span>
            <span v-else v-for="(item, index) in items">
              <span :key="item[itemKey]" @click.stop="select(item)" class="dropdown-item is-clickable">
                {{ item[itemValue] }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  props: {
    title: String,
    items: Array,
    item : Object,
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
    const isActive = ref(false)
    const search = ref('')
    const hasItemContent = ref(false)

    if (slots.itemContent) {
      hasItemContent.value = true
    }

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
      // search.value = ''
      isActive.value = false
    }

    const onBlur = () => {
      setTimeout(() => {
        isActive.value = false
      }, 100)
    }
    
    onMounted(() => {
      console.log('mounted')
      window.document.addEventListener('click', event => {
        isActive.value = false
      })
    })

    const hideSelectBox = ref(props.hideSelectBox)

    return {
      isActive,
      search,
      hasItemContent,
      hideSelectBox,
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

.control.is-loading::after {
  border: 2px solid #157562;
  border-right-color: transparent;
  border-top-color: transparent;
}
</style>
