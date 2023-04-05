<template>
<nav 
  v-if="meta.last_page > 1" 
  class="pagination" role="navigation" aria-label="pagination"
>
  <a v-if="current > 1" class="pagination-previous" @click="changePage(current - 1)">
    Previous
  </a>
  <a v-if="meta.total > current" class="pagination-next" @click="changePage(current + 1)">
    Next
  </a>

  <p class="mr-2">
    全<span class="has-text-weight-bold">{{ meta.total }}</span>件
  </p>

  <div class="select">
    <select name="limits" v-model="currentLimit" @change="(e) => changeLimit(e.target.value)">
      <option value="">表示件数</option>
      <option value="10">10件</option>
      <option value="20">20件</option>
      <option value="50">50件</option>
      <option value="100">100件</option>
      <option value="200">200件</option>
    </select>
  </div>

  <ul class="pagination-list">
    <li v-for="index in meta.last_page">
      <a
        v-if="index !== current
          && (index < 6
          || index > meta.last_page - 5
          || (index > current - 2 && index < current + 2))"
        class="pagination-link"
        @click="changePage(index)">
        {{index}}
      </a>
      <li v-if="(current > 7 && index == 6) || (current < meta.last_page - 6 && index == meta.last_page - 5)">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <a 
        v-if="index == current"
        class="pagination-link is-current">
        {{index}}
      </a>
    </li>
  </ul>
</nav>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useNuxtApp, useRoute, useRouter } from 'nuxt/app'

export default defineComponent({
  props: {
    meta: Object
  },
  setup() {
    const { $Airporter } = useNuxtApp()
    const route = useRoute()
    const router = useRouter()
    const isActive = ref(false)

    const current = computed({
      get: () => Number(route.query.page || 1),
      set: () => {}
    })

    const currentLimit = computed({
      get: () => route.query.limit ? Number(route.query.limit) : '',
      set: () => {}
    })

    const changePage = (page) => {
      $Airporter.updateQuery({ page })
    }

    const changeLimit = (limit) => {
      $Airporter.updateQuery({ limit })
    }

    return {
      current,
      currentLimit,
      changePage,
      changeLimit,
      isActive
    }
  }
})
</script>