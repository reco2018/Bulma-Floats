import * as components from './components'
import { ToastProgrammatic, ToastSymbol } from './components/toast'

const VuetifyFloats = {
    install (app) {
        for (const key in components) {
            const component = components[key]
            app.component(key, component)
        }

        app.config.globalProperties.$floats = {
            toast: ToastProgrammatic
        }

        app.provide(ToastSymbol, ToastProgrammatic)
    }
}

export default VuetifyFloats

export * from './components'
export {
    ToastProgrammatic,
    ToastSymbol
}