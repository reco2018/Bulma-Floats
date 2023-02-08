'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toast = require('./toast.js');
require('vue');
var alert = require('./alert.js');
var auto_complete = require('./auto.complete-94380e94.js');
var checkbox = require('./checkbox-426c325b.js');
var pagination = require('./pagination-d0a9395c.js');
var tag_input = require('./tag.input-7d254687.js');
var config = require('./config-4ce33493.js');
require('./helpers.js');
require('./style-inject.es-dcee06b6.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: toast.Toast,
    FAlert: alert.Alert,
    AutoComplete: auto_complete.script,
    CheckBox: checkbox.script,
    Pagination: pagination.script,
    TagInput: tag_input.script
});

var BulmaFloats = {
  install: function install(app, options) {
    config.setVueInstance(app);

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
exports.AutoComplete = auto_complete.script;
exports.CheckBox = checkbox.script;
exports.Pagination = pagination.script;
exports.TagInput = tag_input.script;
exports["default"] = BulmaFloats;
