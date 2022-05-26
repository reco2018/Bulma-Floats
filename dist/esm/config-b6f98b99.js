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
  VueInstance = Vue;
};
var VueInstance;

export { VueInstance as V, config as c, setVueInstance as s };
