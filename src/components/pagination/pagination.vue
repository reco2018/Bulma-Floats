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
import { defineComponent, computed } from 'vue'
import { useNuxtApp, useRoute, useRouter } from 'nuxt/app'

export default defineComponent({
  props: {
    meta: Object
  },
  setup() {
    const { $Airporter } = useNuxtApp()
    const route = useRoute()
    const router = useRouter()

    const current = computed({
      get: () => Number(route.query.page || 1)
    })

    const changePage = (page) => {
      $Airporter.updateQuery({ page })
    }

    return {
      current,
      changePage
    }
  }
})
</script>