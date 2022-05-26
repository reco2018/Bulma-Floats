import { default as AutoComplete } from './atoms/auto.complete.vue';
import { default as Checkbox } from './atoms/checkbox.vue';
import { default as Pagination } from './atoms/pagination.vue';
import { default as TagInput } from './atoms/tag.input.vue';

const components = {
  AutoComplete,
  Checkbox,
  Pagination,
  TagInput
}

const plugin = {
  install(Vue, settings = {}, router = null) {
    Vue.component('AutoComplete', AutoComplete)
    Vue.component('CheckBox', Checkbox)
    Vue.component('Pagination', Pagination)
    Vue.component('TagInput', TagInput)
  }
}; 

export default plugin;