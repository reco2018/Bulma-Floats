'use strict';

var config = {
  defaultType: 'is-info',
  defaultToastType: 'is-info',
  defaultToastDuration: 2000,
  defaultToastPosition: null,
  defaultAlertOkVisible: true,
  defaultAlertOkText: 'OK',
  defaultAlertCancelVisible: true,
  defaultAlertCancelText: 'Cancel',
  defaultModalCanCancel: ['escape', 'x', 'outside', 'button']
};
var setVueInstance = function setVueInstance(Vue) {
  exports.VueInstance = Vue;
};
exports.VueInstance = void 0;

exports.config = config;
exports.setVueInstance = setVueInstance;
