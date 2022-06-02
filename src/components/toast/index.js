import Toast from './Toast'
import { defineComponent, createApp } from "vue";

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'

const ToastProgrammatic = {
    open(params) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultToastPosition || 'is-top'
        }
        const propsData = merge(defaultParam, params)
        const ToastComponent = defineComponent({
            extends: Toast
        })

        let _app = createApp(ToastComponent, propsData)
        if (VueInstance._instance && VueInstance._instance.appContext) {
            Object.assign(_app._context, VueInstance._instance.appContext)
        } else if (VueInstance._context) {
            Object.assign(_app._context, VueInstance._context)
        }
        _app.mount(document.createElement('div'))

        return ToastComponent
    }
}

export {
    ToastProgrammatic,
    Toast
}
