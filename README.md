# Bulma-Floats

Nuxt 3 (`nuxt` is a peer dependency).

## Setup

`Pagination` imports `nuxt/app`, so the package must be transpiled by Nuxt.
Without this, the production server fails to render (`#build/nuxt.config.mjs` is not defined).

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  build: {
    transpile: ['@reco2018/bulma-floats']
  }
})
```

```ts
// plugins/bulma-floats.ts
import { defineNuxtPlugin } from '#app'
import BulmaFloats, { ToastProgrammatic, AlertProgrammatic } from '@reco2018/bulma-floats'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(BulmaFloats);
    const Floats = {
        toast: ToastProgrammatic,
        alert: AlertProgrammatic
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

## Alert Example

```html
<template>
  <div>
    <v-btn @click="onClick">Show Alert</v-btn>
  </div>
</template>

<script setup lang="ts">
  const onClick = () => useNuxtApp().$Floats.alert.open({
    title: 'エラー',
    content: '内容',
    okText: '了解',
    cancelText: 'キャンセル',
    onCancelPressed: () => {
      console.log('onCancel')
    }
  })
</script>
```