import { s as script, T as ToastProgrammatic } from './index-2c044d76.js';
export { s as FToast, T as ToastProgrammatic } from './index-2c044d76.js';
import 'vue';
import { s as script$1, A as AlertProgrammatic } from './index-2635658d.js';
export { A as AlertProgrammatic, s as FAlert } from './index-2635658d.js';
import { s as script$2 } from './auto.complete-a9000653.js';
export { s as AutoComplete } from './auto.complete-a9000653.js';
import { s as script$3 } from './checkbox-286191e2.js';
export { s as CheckBox } from './checkbox-286191e2.js';
import { s as script$4 } from './pagination-394af68d.js';
export { s as Pagination } from './pagination-394af68d.js';
import { s as script$5 } from './tag.input-292a8363.js';
export { s as TagInput } from './tag.input-292a8363.js';
import { s as setVueInstance } from './config-b6f98b99.js';
import './helpers-f3bc336f.js';
import './style-inject.es-1f59c1d0.js';
import 'nuxt/app';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: script,
    FAlert: script$1,
    AutoComplete: script$2,
    CheckBox: script$3,
    Pagination: script$4,
    TagInput: script$5
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
