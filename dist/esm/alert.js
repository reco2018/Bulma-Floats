import { c as config, V as VueInstance } from './config-b6f98b99.js';
import { removeElement, merge } from './helpers.js';
import { openBlock, createBlock, Transition, withCtx, createElementVNode, normalizeClass, toDisplayString, createElementBlock, createCommentVNode, defineComponent, createApp } from 'vue';

var DialogMixin = {
  props: {
    active: Boolean,
    component: [Object, Function, String],
    title: [String, Array],
    content: [String, Array],
    okVisible: Boolean,
    okText: String,
    cancelVisible: Boolean,
    cancelText: String,
    programmatic: Boolean,
    props: Object,
    events: Object,
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
      this.$emit('onOk');
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
            newCancelText: this.cancelText || config.defaultAlertCancelText
        }
    }
};

const _hoisted_1 = { class: "modal-card" };
const _hoisted_2 = { class: "modal-card-head" };
const _hoisted_3 = { class: "modal-card-title" };
const _hoisted_4 = { class: "modal-card-body" };
const _hoisted_5 = { class: "modal-card-foot is-justify-content-end" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass(`modal ${_ctx.isActive ? 'is-active' : ''}`)
      }, [
        createElementVNode("div", {
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.cancel('outside'))),
          class: "modal-background"
        }),
        createElementVNode("div", _hoisted_1, [
          createElementVNode("header", _hoisted_2, [
            createElementVNode("p", _hoisted_3, toDisplayString(_ctx.title), 1 /* TEXT */),
            createElementVNode("button", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.cancel('x'))),
              class: "delete",
              "aria-label": "close"
            })
          ]),
          createElementVNode("section", _hoisted_4, toDisplayString(_ctx.content), 1 /* TEXT */),
          createElementVNode("footer", _hoisted_5, [
            (_ctx.cancelVisible)
              ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: _cache[2] || (_cache[2] = $event => (_ctx.cancel('button'))),
                  class: "button"
                }, toDisplayString($data.newCancelText), 1 /* TEXT */))
              : createCommentVNode("v-if", true),
            (_ctx.okVisible)
              ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.ok && _ctx.ok(...args))),
                  class: "button is-success"
                }, toDisplayString($data.newOkText), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ])
        ]),
        createElementVNode("button", {
          onClick: _cache[4] || (_cache[4] = $event => (_ctx.cancel('x'))),
          class: "modal-close is-large",
          "aria-label": "close"
        })
      ], 2 /* CLASS */)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]))
}

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
      emits: {
        onCancel: function onCancel() {
          propsData.onCancelPressed();
          return true;
        },
        onOk: function onOk() {
          propsData.onOkPressed();
          return true;
        }
      }
    });

    var _app = createApp(AlertComponent, propsData);

    Object.assign(_app._context, VueInstance._instance.appContext);

    _app.mount(document.createElement('div'));

    return AlertComponent;
  }
};

export { script as Alert, AlertProgrammatic };
