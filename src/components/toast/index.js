import Toast from './Toast'
import { defineComponent } from "vue";

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

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
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        const propsData = merge(defaultParam, params)
        const toastComponent = defineComponent(Toast)
        if (slot) {
            toastComponent.slot = slot
        }
        console.log(toastComponent)
        // const component = toastComponent({
        //     parent,
        //     el: document.createElement('div'),
        //     propsData
        // })
        // if (slot) {
        //     component.$slots.default = slot
        //     component.$forceUpdate()
        // }
        return toastComponent
    }
}

export {
    ToastProgrammatic,
    Toast
}
