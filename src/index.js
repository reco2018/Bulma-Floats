import * as components from './components'
import { ToastProgrammatic } from './components/toast'

const VuetifyFloats = {
    install (app, options) {
        for (const key in components) {
            const component = components[key]
            app.component(key, component)
        }

        app.config.globalProperties.$floats = {
            toast: ToastProgrammatic
        }

        app.provide('floats:toast', ToastProgrammatic)
    }
}

const createVuetifyFloats = (nuxtApp) => {
    nuxtApp.vueApp.use(VuetifyFloats, {})
    return {
        provide: {
            floats: {
                toast: ToastProgrammatic,
            },
        }
    }
}

export default VuetifyFloats

export * from './components'
export {
    ToastProgrammatic,
    createVuetifyFloats
}