'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index-1b8de993.js');
require('vue');
var index$1 = require('./index-db87e810.js');
var styleInject_es = require('./style-inject.es-691dc3e9.js');
require('./helpers-8cc69401.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: index.script,
    FAlert: index$1.script
});

var BulmaFloats = {
  install: function install(app, options) {
    styleInject_es.setVueInstance(app);

    for (var key in components) {
      var component = components[key];
      app.component(key, component);
    }

    app.config.globalProperties.$floats = {
      toast: index.ToastProgrammatic,
      alert: index$1.AlertProgrammatic
    };
  }
};

exports.FToast = index.script;
exports.ToastProgrammatic = index.ToastProgrammatic;
exports.AlertProgrammatic = index$1.AlertProgrammatic;
exports.FAlert = index$1.script;
exports["default"] = BulmaFloats;
