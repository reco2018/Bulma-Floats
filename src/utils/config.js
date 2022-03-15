let config = {
    defaultType: 'is-info',
    defaultToastType: 'is-info',
    defaultToastDuration: 2000,
    defaultToastPosition: null,
    defaultAlertOkVisible: true,
    defaultAlertOkText: 'OK',
    defaultAlertCancelVisible: true,
    defaultAlertCancelText: 'Cancel',
    defaultModalCanCancel: ['escape', 'x', 'outside', 'button']
}

export { config as default }

export const setVueInstance = (Vue) => { VueInstance = Vue }

export let VueInstance