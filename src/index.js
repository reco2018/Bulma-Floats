import * as components from './components'
import { ToastProgrammatic } from './components/toast'
import { setVueInstance } from './utils/config'

const BulmaFloats = {
    install (app, options) {
        setVueInstance(app)
        
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

export default BulmaFloats

export * from './components'
export {
    ToastProgrammatic
}
