'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toast = require('./toast.js');
require('vue');
var alert = require('./alert.js');
var styleInject_es = require('./style-inject.es-691dc3e9.js');
require('./helpers.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: toast.Toast,
    FAlert: alert.Alert
});

var BulmaFloats = {
  install: function install(app, options) {
    styleInject_es.setVueInstance(app);

    for (var key in components) {
      var component = components[key];
      app.component(key, component);
    }

    app.config.globalProperties.$floats = {
      toast: toast.ToastProgrammatic,
      alert: alert.AlertProgrammatic
    };
  }
};

exports.FToast = toast.Toast;
exports.ToastProgrammatic = toast.ToastProgrammatic;
exports.AlertProgrammatic = alert.AlertProgrammatic;
exports.FAlert = alert.Alert;
exports["default"] = BulmaFloats;
