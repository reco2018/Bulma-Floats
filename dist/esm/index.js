import { s as script, T as ToastProgrammatic } from './index-3f5777b6.js';
export { s as FToast, T as ToastProgrammatic } from './index-3f5777b6.js';
import 'vue';
import { s as script$1, A as AlertProgrammatic } from './index-c9e621ea.js';
export { A as AlertProgrammatic, s as FAlert } from './index-c9e621ea.js';
import { s as setVueInstance } from './style-inject.es-41074691.js';
import './helpers-f3bc336f.js';

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
