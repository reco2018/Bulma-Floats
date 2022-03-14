'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toast = require('./index-b203a406.js');
require('vue');
require('./helpers.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: toast.script
});

var BulmaFloats = {
  install: function install(app, options) {
    toast.setVueInstance(app);

    for (var key in components) {
      var component = components[key];
      app.component(key, component);
    }

    app.config.globalProperties.$floats = {
      toast: toast.ToastProgrammatic
    };
    app.provide('floats:toast', toast.ToastProgrammatic);
  }
};

exports.FToast = toast.script;
exports.ToastProgrammatic = toast.ToastProgrammatic;
exports["default"] = BulmaFloats;
