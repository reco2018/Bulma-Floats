'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index-a79783a3.js');
require('vue');
var index$1 = require('./index-17c6abab.js');
var auto_complete = require('./auto.complete-95214dd7.js');
var checkbox = require('./checkbox-426c325b.js');
var pagination = require('./pagination-b7605f77.js');
var tag_input = require('./tag.input-80ed8268.js');
var config = require('./config-4ce33493.js');
require('./helpers-8cc69401.js');
require('./style-inject.es-dcee06b6.js');
require('nuxt/app');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FToast: index.script,
    FAlert: index$1.script,
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
      toast: index.ToastProgrammatic,
      alert: index$1.AlertProgrammatic
    };
  }
};

exports.FToast = index.script;
exports.ToastProgrammatic = index.ToastProgrammatic;
exports.AlertProgrammatic = index$1.AlertProgrammatic;
exports.FAlert = index$1.script;
exports.AutoComplete = auto_complete.script;
exports.CheckBox = checkbox.script;
exports.Pagination = pagination.script;
exports.TagInput = tag_input.script;
exports["default"] = BulmaFloats;
