import Toast from './Toast'
import { defineComponent } from "vue";
import { mount } from 'mount-vue-component'

import config from '../../utils/config'
import { merge } from '../../utils/helpers'

const ToastProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: config.defaultToastPosition || 'is-top'
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = merge(defaultParam, params)
        const ToastComponent = defineComponent({
            extends: Toast,
        })
        mount(ToastComponent, { props: propsData })
        return ToastComponent
    }
}

export {
    ToastProgrammatic,
    Toast
}
