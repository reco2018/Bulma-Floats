# Vuetify-Floats
```ts
import { defineNuxtPlugin } from "#app";
import { createVuetifyFloats } from "@reco2018/vuetify-floats";

export default defineNuxtPlugin(createVuetifyFloats);
```

## Toast Example

```vue
<template>
  <div>
    <v-btn @click="onClick">Show Toast</v-btn>
  </div>
</template>

<script setup lang="ts">
  const onClick = () => useNuxtApp().$floats.toast.open(useNuxtApp().vueApp, {message: 'Toasty!', duration: 2000})
</script>
```
OR

```vue
<template>
  <div>
    <v-btn @click="onClick">Show Toast</v-btn>
  </div>
</template>

<script setup lang="ts">
  import { ToastProgrammatic } from '@reco2018/vuetify-floats'
  const toast: typeof ToastProgrammatic = inject('floats:toast')
  const onClick = () => toast.open(useNuxtApp().vueApp, 'Toasty!')
</script>
```
OR

```vue
<template>
  <div>
    <v-btn @click="onClick">Show Toast</v-btn>
  </div>
</template>

<script setup lang="ts">
  const onClick = () => useNuxtApp().vueApp.config.globalProperties.$floats.toast.open(useNuxtApp().vueApp, 'Toasty!')
</script>
```
