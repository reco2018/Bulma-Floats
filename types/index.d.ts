import { App }  from 'vue'

import {
    FloatsConfig,
    ToastProgrammatic } from "./components"

declare module 'nuxt3' {
    export interface NuxtApp {
        $floats: FloatsNamespace
    }
}

export declare type FloatsNamespace = {
    toast: typeof ToastProgrammatic
}

declare const _default: {
    install: (app: App, options: FloatsConfig) => void;
};

export {
    ToastProgrammatic
}

export default _default;
