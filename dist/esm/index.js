import { Toast as script, ToastProgrammatic } from './toast.js';
export { Toast as FToast, ToastProgrammatic } from './toast.js';
import 'vue';
import { Alert as script$1, AlertProgrammatic } from './alert.js';
export { AlertProgrammatic, Alert as FAlert } from './alert.js';
import { s as script$2 } from './auto.complete-18862a3f.js';
export { s as AutoComplete } from './auto.complete-18862a3f.js';
import { s as script$3 } from './checkbox-9fdb8e33.js';
export { s as CheckBox } from './checkbox-9fdb8e33.js';
import { s as script$4 } from './pagination-689ff155.js';
export { s as Pagination } from './pagination-689ff155.js';
import { s as script$5 } from './tag.input-cfaaad7f.js';
export { s as TagInput } from './tag.input-cfaaad7f.js';
import { s as setVueInstance } from './config-b6f98b99.js';
import './helpers.js';
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
