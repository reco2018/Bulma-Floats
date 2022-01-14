import { App }  from 'vue'
import { Plugin as Nuxt3Plugin } from "nuxt3";

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

declare const createVuetifyFloats: Nuxt3Plugin;

declare const _default: {
    install: (app: App, options: FloatsConfig) => void;
};

export {
    createVuetifyFloats,
    ToastProgrammatic
}

export default _default;
