import { Toast as script, ToastProgrammatic } from './toast.js';
export { Toast as FToast, ToastProgrammatic } from './toast.js';
import 'vue';
import { Alert as script$1, AlertProgrammatic } from './alert.js';
export { AlertProgrammatic, Alert as FAlert } from './alert.js';
import { s as setVueInstance } from './config-b6f98b99.js';
import './helpers.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: script,
    FAlert: script$1
});

var BulmaFloats = {
  install: function install(app, options) {
    setVueInstance(app);

    for (var key in components) {
      var component = components[key];
      app.component(key, component);
    }

    app.config.globalProperties.$floats = {
      toast: ToastProgrammatic,
      alert: AlertProgrammatic
    };
  }
};

export { BulmaFloats as default };
