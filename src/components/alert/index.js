import Alert from './Alert'
import { defineComponent, createApp } from "vue";

import config, { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'

const AlertProgrammatic = {
    open(params) {
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            programmatic: true,
            isFullScreen: false,
            okVisible: config.defaultAlertOkVisible,
            okText: config.defaultAlertOkText,
            onOkPressed: () => {},
            cancelVisible: config.defaultAlertCancelVisible,
            cancelText: config.defaultAlertCancelText,
            onCancelPressed: () => {}
        }
        const propsData = merge(defaultParam, params)
        const AlertComponent = defineComponent({
            extends: Alert,
            components: {
                ChildComponent: propsData.component,
            },
            emits: {
                onCancel() {
                    propsData.onCancelPressed()
                    return true;
                },
                onOk(result) {
                    propsData.onOkPressed(result)
                    return true;
                }
            }
        })

        let _app = createApp(AlertComponent, propsData)
        if (VueInstance._instance && VueInstance._instance.appContext) {
            Object.assign(_app._context, VueInstance._instance.appContext)
        } else if (VueInstance._context) {
            Object.assign(_app._context, VueInstance._context)
        }
        _app.mount(document.createElement('div'))

        return AlertComponent
    }
}

export {
    AlertProgrammatic,
    Alert
}
