import Toast from './Toast'
import { defineComponent, createApp } from "vue";

import config from '../../utils/config'
import { merge } from '../../utils/helpers'

const ToastProgrammatic = {
    open(app, params) {
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
        Object.assign(_app._context, app._instance.appContext)
        _app.mount(document.createElement('div'))

        return ToastComponent
    }
}

export {
    ToastProgrammatic,
    Toast
}
