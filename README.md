# Vuetify-Floats
```ts
import { defineNuxtPlugin } from '#app'
import VuetifyFloats, { ToastProgrammatic } from '@reco2018/vuetify-floats'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VuetifyFloats);
    return {
        provide: {
            floats: {
                toast: ToastProgrammatic,
            },
        }
    }
})
```

## Toast Example

```vue
<template>
  <div>
    <v-btn @click="onClick">Show Toast</v-btn>
  </div>
</template>

<script setup lang="ts">
  const onClick = () => useNuxtApp().$floats.toast.open({message: 'Toasty!', duration: 2000})
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
  const onClick = () => toast.open('Toasty!')
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
  const onClick = () => useNuxtApp().vueApp.config.globalProperties.$floats.toast.open('Toasty!')
</script>
```
