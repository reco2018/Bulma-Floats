import { App, reactive } from 'vue';
import * as components from './components'
import { use } from './utils/plugins'
// import { ToastProgrammatic } from './components/toast'

const VuetifyFloats = {
    install (app: App) {
        for (const key in components) {
            const component = components[key]
            app.component(key, component)
        }

        // app.provide('FToast', ToastProgrammatic)

        // function inject(key) {
        //     var _vm$parent$provides, _vm$parent, _vm$vnode$appContext;

        //     const vm = this.$;
        //     const provides = (_vm$parent$provides = (_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) != null ? _vm$parent$provides : (_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides;

        //     if (provides && key in provides) {
        //         return provides[key];
        //     }
        // }

        app.mixin({
            computed: {
                $floats() {
                    return reactive({
                        // toast: inject.call(this, 'FToast'),
                        // toast: ToastProgrammatic,
                        msg: 'hello'
                    })
                }
            }
        });
    }
}

use(VuetifyFloats)

export default VuetifyFloats

export * from './components'
export { ToastProgrammatic } from './components/toast'