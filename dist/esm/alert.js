import { c as config, V as VueInstance } from './config-b6f98b99.js';
import { removeElement, merge } from './helpers.js';
import { resolveComponent, openBlock, createBlock, Transition, withCtx, createElementVNode, normalizeClass, createElementBlock, createCommentVNode, toDisplayString, createVNode, defineComponent, createApp } from 'vue';
import { s as styleInject } from './style-inject.es-1f59c1d0.js';

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
        return config.defaultModalCanCancel;
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
        return config.defaultTrapFocus;
      }
    },
    autoFocus: {
      type: Boolean,
      "default": function _default() {
        return config.defaultAutoFocus;
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
      return typeof this.canCancel === 'boolean' ? this.canCancel ? config.defaultModalCanCancel : [] : this.canCancel;
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
      this.onOk(this.defaultResult);
      this.close();
    },
    cancel: function cancel(method) {
      if (this.cancelOptions.indexOf(method) < 0) return;
      this.onCancel();
      this.onCancel.apply(null, arguments);
      this.close();
    },
    close: function close() {
      var _this2 = this;

      if (this.programmatic) {
        this.isActive = false;
        setTimeout(function () {
          // this.$destroy()
          removeElement(_this2.$el);
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
            newOkText: this.okText || config.defaultAlertOkText,
            newCancelText: this.cancelText || config.defaultAlertCancelText,
            newResult: this.defaultResult || {}
        }
    },
    methods: {
        onResultChanged(result) {
            this.newResult = result;
        },
        ok() {
            this.onOk(this.newResult);
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
  class: "modal-card-foot is-justify-content-center"
};
const _hoisted_6 = {
  key: 1,
  class: "modal-card-foot no-button"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChildComponent = resolveComponent("ChildComponent");

  return (openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass(["modal", {'is-active': _ctx.isActive, 'sheetModal': _ctx.isSheet}])
      }, [
        (!_ctx.isFullScreen)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.cancel('outside'))),
              class: "modal-background"
            }))
          : createCommentVNode("v-if", true),
        createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.cancel('x'))),
          class: "delete",
          "aria-label": "close"
        }),
        createElementVNode("div", {
          class: normalizeClass(["modal-card", {'px-2': !_ctx.isFullScreen, 'fullScreenModal': _ctx.isFullScreen}])
        }, [
          createElementVNode("header", _hoisted_1, [
            createElementVNode("p", _hoisted_2, toDisplayString(_ctx.title), 1 /* TEXT */)
          ]),
          createElementVNode("section", _hoisted_3, [
            createVNode(_component_ChildComponent, {
              is: _ctx.component,
              result: $data.newResult,
              customProps: _ctx.props,
              onOnOk: $options.ok,
              onOnCancel: _cache[2] || (_cache[2] = $event => (_ctx.cancel('button'))),
              onOnResultChanged: $options.onResultChanged
            }, null, 8 /* PROPS */, ["is", "result", "customProps", "onOnOk", "onOnResultChanged"]),
            (_ctx.content)
              ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.content), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ]),
          (_ctx.cancelVisible || _ctx.okVisible)
            ? (openBlock(), createElementBlock("footer", _hoisted_5, [
                (_ctx.cancelVisible)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: _cache[3] || (_cache[3] = $event => (_ctx.cancel('button'))),
                      class: "button"
                    }, toDisplayString($data.newCancelText), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (_ctx.okVisible)
                  ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      onClick: _cache[4] || (_cache[4] = (...args) => ($options.ok && $options.ok(...args))),
                      class: "button is-success"
                    }, toDisplayString($data.newOkText), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ]))
            : (!_ctx.cancelVisible && !_ctx.okVisible && !_ctx.isSheet)
              ? (openBlock(), createElementBlock("footer", _hoisted_6))
              : createCommentVNode("v-if", true)
        ], 2 /* CLASS */)
      ], 2 /* CLASS */)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]))
}

var css_248z = ".fullScreenModal {\n  width: 100%;\n  height: 100%;\n  max-height: 100vh;\n}\n\n.sheetModal {\n  justify-content: end !important;\n  padding-top: 60px;\n}\n\n.modal .modal-card {\n  margin-left: 5px;\n  margin-right: 5px;\n}\n.modal .modal-card-title {\n  flex-shrink: 1;\n}\n.modal .modal-card-head {\n  background-color: #fff;\n}\n.modal .modal-card-head .modal-card-title {\n  font-size: 16px !important;\n}\n.modal .modal-card-body {\n  padding: 20px 25px;\n}\n.modal .modal-card-body hr.has-background-accent {\n  margin-top: 0;\n  margin-left: -25px !important;\n  margin-right: -25px !important;\n}\n.modal .modal-card-foot {\n  background-color: #fff;\n  border-top: none;\n  justify-content: center !important;\n}\n.modal .modal-card-foot .button {\n  padding: 0.5em 1.5em;\n  min-width: 7em;\n}\n.modal .modal-card-foot.no-button {\n  height: 10px;\n  padding: 0;\n  margin: 0;\n}\n.modal button.delete {\n  position: absolute;\n  top: 0px;\n  right: 10px;\n  height: 60px !important;\n  width: 60px !important;\n  max-height: initial;\n  max-width: initial;\n  padding: 0;\n  margin: 0;\n}";
styleInject(css_248z);

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
      okVisible: config.defaultAlertOkVisible,
      okText: config.defaultAlertOkText,
      onOkPressed: function onOkPressed() {},
      cancelVisible: config.defaultAlertCancelVisible,
      cancelText: config.defaultAlertCancelText,
      onCancelPressed: function onCancelPressed() {}
    };
    var propsData = merge(defaultParam, params);
    var AlertComponent = defineComponent({
      "extends": script,
      components: {
        ChildComponent: propsData.component
      },
      methods: {
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

    var _app = createApp(AlertComponent, propsData);

    if (VueInstance._instance && VueInstance._instance.appContext) {
      Object.assign(_app._context, VueInstance._instance.appContext);
    } else if (VueInstance._context) {
      Object.assign(_app._context, VueInstance._context);
    }

    console.log(_app);

    _app.mount(document.createElement('div'));

    return AlertComponent;
  }
};

export { script as Alert, AlertProgrammatic };
