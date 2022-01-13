# Vuetify-Floats
```ts
import { defineNuxtPlugin } from "#app";
import VuetifyFloats from "@reco2018/vuetify-floats";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VuetifyFloats)
});
```

## Toast Example
```vue
<template>
  <div>
    <button @click="onClick">Show Toast</button>
  </div>
</template>

<script lang="ts">
  import { ToastProgrammatic } from '@reco2018/vuetify-floats'
  export default defineComponent({
    setup() {
      const toast: typeof ToastProgrammatic = inject('floats:toast')
      const onClick = () => toast.open('Toasty!')
      return {
        onClick,
      }
    }
  })
</script>
```
OR

```vue
<template>
  <div>
    <button @click="onClick">Show Toast</button>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    setup() {
      const onClick = () => useNuxtApp().vueApp.config.globalProperties.$floats.toast.open('Toasty!')
      return {
        onClick,
      }
    }
  })
</script>
```