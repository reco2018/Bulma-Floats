let config = {
    defaultType: 'is-info',
    defaultToastType: 'is-info',
    defaultToastDuration: 2000,
    defaultToastPosition: null
}

export { config as default }

export const setVueInstance = (Vue) => { VueInstance = Vue }

export let VueInstance