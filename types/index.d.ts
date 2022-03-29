import { App }  from 'vue'

import {
    FloatsConfig,
    ToastProgrammatic,
    AlertProgrammatic } from "./components"

declare module 'nuxt3' {
    export interface NuxtApp {
        $floats: FloatsNamespace
    }
}

export declare type FloatsNamespace = {
    toast: typeof ToastProgrammatic
    alert: typeof AlertProgrammatic
}

declare const _default: {
    install: (app: App, options: FloatsConfig) => void
}

export {
    ToastProgrammatic,
    AlertProgrammatic
}

export default _default
