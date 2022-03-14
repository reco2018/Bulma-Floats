import { s as script, a as setVueInstance, T as ToastProgrammatic } from './index-2bbd5180.js';
export { s as FToast, T as ToastProgrammatic } from './index-2bbd5180.js';
import 'vue';
import './helpers.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: script
});

var BulmaFloats = {
  install: function install(app, options) {
    setVueInstance(app);

    for (var key in components) {
      var component = components[key];
      app.component(key, component);
    }

    app.config.globalProperties.$floats = {
      toast: ToastProgrammatic
    };
    app.provide('floats:toast', ToastProgrammatic);
  }
};

export { BulmaFloats as default };
