# Bulma-Floats
```ts
import { defineNuxtPlugin } from '#app'
import BulmaFloats, { ToastProgrammatic } from '@reco2018/bulma-floats'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(BulmaFloats);
    const Floats = {
        toast: ToastProgrammatic,
    }
    nuxtApp.provide('Floats', Floats)
})
```

## Toast Example

```html
<template>
  <div>
    <v-btn @click="onClick">Show Toast</v-btn>
  </div>
</template>

<script setup lang="ts">
  const onClick = () => useNuxtApp().$Floats.toast.open({ message: 'Toasty!', duration: 2000, type: 'is-danger' })
  // types: [ 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger' ]
  // see https://bulma.io/documentation/elements/notification/#colors
</script>
```