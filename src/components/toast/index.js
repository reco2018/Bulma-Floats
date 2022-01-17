import Toast from './Toast'
import { defineComponent } from "vue";
import { mount } from 'mount-vue-component'
import * as components from 'vuetify/components'

import config from '../../utils/config'
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
            extends: Toast,
            components,
        })
        mount(ToastComponent, { props: propsData })
        return ToastComponent
    }
}

export {
    ToastProgrammatic,
    Toast
}
