'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-4ce33493.js');
var helpers = require('./helpers.js');
var vue = require('vue');
var styleInject_es = require('./style-inject.es-dcee06b6.js');

var DialogMixin = {
  props: {
    active: Boolean,
    component: [Object, Function, String],
    title: [String, Array],
    content: [String, Array],
    isFullScreen: Boolean,
    isSheet: Boolean,
    okVisible: Boolean,
    okText: String,
    cancelVisible: Boolean,
    cancelText: String,
    programmatic: Boolean,
    props: Object,
    events: Object,
    defaultResult: [Object, Array, String, Number, Boolean],
    width: {
      type: [String, Number],
      "default": 960
    },
    hasModalCard: Boolean,
    animation: {
      type: String,
      "default": 'zoom-out'
    },
    canCancel: {
      type: [Array, Boolean],
      "default": function _default() {
        return config.config.defaultModalCanCancel;
      }
    },
    onCancel: {
      type: Function,
      "default": function _default() {}
    },
    scroll: {
      type: String,
      "default": function _default() {
        return 'clip';
      },
      validator: function validator(value) {
        return ['clip', 'keep'].indexOf(value) >= 0;
      }
    },
    fullScreen: Boolean,
    trapFocus: {
      type: Boolean,
      "default": function _default() {
        return config.config.defaultTrapFocus;
      }
    },
    autoFocus: {
      type: Boolean,
      "default": function _default() {
        return config.config.defaultAutoFocus;
      }
    },
    customClass: String,
    ariaRole: {
      type: String,
      validator: function validator(value) {
        return ['dialog', 'alertdialog'].indexOf(value) >= 0;
      }
    },
    ariaModal: Boolean,
    ariaLabel: {
      type: String,
      validator: function validator(value) {
        return Boolean(value);
      }
    },
    closeButtonAriaLabel: String,
    destroyOnHide: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      isActive: this.active || false,
      savedScrollTop: null,
      newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
      animating: !this.active,
      destroyed: !this.active
    };
  },
  computed: {
    cancelOptions: function cancelOptions() {
      return typeof this.canCancel === 'boolean' ? this.canCancel ? config.config.defaultModalCanCancel : [] : this.canCancel;
    },
    showX: function showX() {
      return this.cancelOptions.indexOf('x') >= 0;
    },
    customStyle: function customStyle() {
      if (!this.fullScreen) {
        return {
          maxWidth: this.newWidth
        };
      }

      return null;
    }
  },
  watch: {
    active: function active(value) {
      this.isActive = value;
    },
    isActive: function isActive(value) {
      var _this = this;

      if (value) this.destroyed = false;
      this.handleScroll();
      this.$nextTick(function () {
        if (value && _this.$el && _this.$el.focus && _this.autoFocus) {
          _this.$el.focus();
        }
      });
    }
  },
  methods: {
    handleScroll: function handleScroll() {
      if (typeof window === 'undefined') return;

      if (this.scroll === 'clip') {
        if (this.isActive) {
          document.documentElement.classList.add('is-clipped');
        } else {
          document.documentElement.classList.remove('is-clipped');
        }

        return;
      }

      this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

      if (this.isActive) {
        document.body.classList.add('is-noscroll');
      } else {
        document.body.classList.remove('is-noscroll');
      }

      if (this.isActive) {
        document.body.style.top = "-".concat(this.savedScrollTop, "px");
        return;
      }

      document.documentElement.scrollTop = this.savedScrollTop;
      document.body.style.top = null;
      this.savedScrollTop = null;
    },
    ok: function ok() {
      this.$emit('onOk', this.defaultResult);
      this.close();
    },
    cancel: function cancel(method) {
      if (this.cancelOptions.indexOf(method) < 0) return;
      this.$emit('onCancel');
      this.onCancel.apply(null, arguments);
      this.close();
    },
    close: function close() {
      var _this2 = this;

      if (this.programmatic) {
        this.isActive = false;
        setTimeout(function () {
          // this.$destroy()
          helpers.removeElement(_this2.$el);
        }, 150);
      }
    },
    keyPress: function keyPress(_ref) {
      var key = _ref.key;
      if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
    },
    afterEnter: function afterEnter() {
      this.animating = false;
      this.$emit('after-enter');
    },
    beforeLeave: function beforeLeave() {
      this.animating = true;
    },
    afterLeave: function afterLeave() {
      if (this.destroyOnHide) {
        this.destroyed = true;
      }

      this.$emit('after-leave');
    }
  },
  created: function created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress);
    }
  },
  mounted: function mounted() {
    this.programmatic && document.body.appendChild(this.$el);
    if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress); // reset scroll

      document.documentElement.classList.remove('is-clipped');
      var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      document.body.classList.remove('is-noscroll');
      document.documentElement.scrollTop = savedScrollTop;
      document.body.style.top = null;
    }
  }
};

var script = {
    name: 'FAlert',
    mixins: [DialogMixin],
    data() {
        return {
            newOkText: this.okText || config.config.defaultAlertOkText,
            newCancelText: this.cancelText || config.config.defaultAlertCancelText,
            newResult: this.defaultResult || {}
        }
    },
    methods: {
        onResultChanged(result) {
            this.newResult = result;
        },
        ok() {
            this.$emit('onOk', this.newResult);
            this.close();
        },
    }
};

const _hoisted_1 = { class: "modal-card-head" };
const _hoisted_2 = { class: "modal-card-title has-text-centered is-size-5" };
const _hoisted_3 = { class: "modal-card-body" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = {
  key: 0,
  class: "modal-card-foot is-justify-content-end"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChildComponent = vue.resolveComponent("ChildComponent");

  return (vue.openBlock(), vue.createBlock(vue.Transition, { name: _ctx.animation }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(["modal", {'is-active': _ctx.isActive, 'sheetModal': _ctx.isSheet}])
      }, [
        (!_ctx.isFullScreen)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.cancel('outside'))),
              class: "modal-background"
            }))
          : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["modal-card", {'px-3': !_ctx.isFullScreen, 'fullScreenModal': _ctx.isFullScreen}])
        }, [
          vue.createElementVNode("header", _hoisted_1, [
            vue.createElementVNode("p", _hoisted_2, vue.toDisplayString(_ctx.title), 1 /* TEXT */),
            vue.createElementVNode("button", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.cancel('x'))),
              class: "delete",
              "aria-label": "close"
            })
          ]),
          vue.createElementVNode("section", _hoisted_3, [
            vue.createVNode(_component_ChildComponent, {
              is: _ctx.component,
              result: $data.newResult,
              onOnOk: $options.ok,
              onOnCancel: _cache[2] || (_cache[2] = $event => (_ctx.cancel('button'))),
              onOnResultChanged: $options.onResultChanged
            }, null, 8 /* PROPS */, ["is", "result", "onOnOk", "onOnResultChanged"]),
            (_ctx.content)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, vue.toDisplayString(_ctx.content), 1 /* TEXT */))
              : vue.createCommentVNode("v-if", true)
          ]),
          (_ctx.cancelVisible || _ctx.okVisible)
            ? (vue.openBlock(), vue.createElementBlock("footer", _hoisted_5, [
                (_ctx.cancelVisible)
                  ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      onClick: _cache[3] || (_cache[3] = $event => (_ctx.cancel('button'))),
                      class: "button"
                    }, vue.toDisplayString($data.newCancelText), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                (_ctx.okVisible)
                  ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 1,
                      onClick: _cache[4] || (_cache[4] = (...args) => ($options.ok && $options.ok(...args))),
                      class: "button is-success"
                    }, vue.toDisplayString($data.newOkText), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */)
      ], 2 /* CLASS */)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]))
}

var css_248z = "\n.fullScreenModal {\n    width: 100%; \n    height: 100%;\n    max-height: 100vh;\n}\n.sheetModal {\n   justify-content: end !important;\n}\n";
styleInject_es.styleInject(css_248z);

script.render = render;
script.__file = "src/components/alert/Alert.vue";

var AlertProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      programmatic: true,
      isFullScreen: false,
      okVisible: config.config.defaultAlertOkVisible,
      okText: config.config.defaultAlertOkText,
      onOkPressed: function onOkPressed() {},
      cancelVisible: config.config.defaultAlertCancelVisible,
      cancelText: config.config.defaultAlertCancelText,
      onCancelPressed: function onCancelPressed() {}
    };
    var propsData = helpers.merge(defaultParam, params);
    var AlertComponent = vue.defineComponent({
      "extends": script,
      components: {
        ChildComponent: propsData.component
      },
      emits: {
        onCancel: function onCancel() {
          propsData.onCancelPressed();
          return true;
        },
        onOk: function onOk(result) {
          propsData.onOkPressed(result);
          return true;
        }
      }
    });

    var _app = vue.createApp(AlertComponent, propsData);

    Object.assign(_app._context, config.VueInstance._instance.appContext);

    _app.mount(document.createElement('div'));

    return AlertComponent;
  }
};

exports.Alert = script;
exports.AlertProgrammatic = AlertProgrammatic;
