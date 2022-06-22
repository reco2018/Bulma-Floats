import { c as config, V as VueInstance } from './config-b6f98b99.js';
import { r as removeElement, m as merge } from './helpers-f3bc336f.js';
import { openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, toDisplayString, vShow, defineComponent, createApp } from 'vue';
import { s as styleInject } from './style-inject.es-1f59c1d0.js';

var NoticeMixin = {
  props: {
    type: {
      type: String,
      "default": config.defaultType
    },
    message: [String, Array],
    duration: Number,
    queue: {
      type: Boolean,
      "default": undefined
    },
    indefinite: {
      type: Boolean,
      "default": false
    },
    pauseOnHover: {
      type: Boolean,
      "default": false
    },
    position: {
      type: String,
      "default": 'is-top',
      validator: function validator(value) {
        return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
      }
    },
    container: String
  },
  data: function data() {
    return {
      isActive: false,
      isPaused: false,
      parentTop: null,
      parentBottom: null,
      newContainer: this.container || config.defaultContainerElement
    };
  },
  computed: {
    correctParent: function correctParent() {
      switch (this.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return this.parentTop;

        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return this.parentBottom;
      }
    },
    transition: function transition() {
      switch (this.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return {
            enter: 'fadeInDown',
            leave: 'fadeOut'
          };

        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return {
            enter: 'fadeInUp',
            leave: 'fadeOut'
          };
      }
    }
  },
  methods: {
    pause: function pause() {
      if (this.pauseOnHover && !this.indefinite) {
        this.isPaused = true;
        clearInterval(this.$floats.globalNoticeInterval);
      }
    },
    removePause: function removePause() {
      if (this.pauseOnHover && !this.indefinite) {
        this.isPaused = false;
        this.close();
      }
    },
    shouldQueue: function shouldQueue() {
      var queue = this.queue !== undefined ? this.queue : config.defaultNoticeQueue;
      if (!queue) return false;
      return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
    },
    click: function click() {
      this.$emit('click');
    },
    close: function close() {
      var _this = this;

      if (!this.isPaused) {
        clearTimeout(this.timer);
        this.isActive = false;
        this.$emit('close');
        setTimeout(function () {
          removeElement(_this.$el);
        }, 150);
      }
    },
    timeoutCallback: function timeoutCallback() {
      return this.close();
    },
    showNotice: function showNotice() {
      var _this2 = this;

      console.log(this.$el);
      if (this.shouldQueue()) this.correctParent.innerHTML = '';
      this.correctParent.insertAdjacentElement('afterbegin', this.$el);
      this.isActive = true;

      if (!this.indefinite) {
        this.timer = setTimeout(function () {
          return _this2.timeoutCallback();
        }, this.newDuration);
      }
    },
    setupContainer: function setupContainer() {
      this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-top');
      this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.notices.is-bottom');
      if (this.parentTop && this.parentBottom) return;

      if (!this.parentTop) {
        this.parentTop = document.createElement('div');
        this.parentTop.className = 'notices is-top';
      }

      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div');
        this.parentBottom.className = 'notices is-bottom';
      }

      var container = document.querySelector(this.newContainer) || document.body;
      container.appendChild(this.parentTop);
      container.appendChild(this.parentBottom);

      if (this.newContainer) {
        this.parentTop.classList.add('has-custom-container');
        this.parentBottom.classList.add('has-custom-container');
      }
    }
  },
  beforeMount: function beforeMount() {
    this.setupContainer();
  },
  mounted: function mounted() {
    this.showNotice();
  }
};

var script = {
    name: 'FToast',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultToastDuration
        }
    }
};

const _hoisted_1 = ["aria-hidden"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        onMouseenter: _cache[0] || (_cache[0] = (...args) => (_ctx.pause && _ctx.pause(...args))),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => (_ctx.removePause && _ctx.removePause(...args))),
        class: normalizeClass(["toast notification", [_ctx.type, _ctx.position]]),
        "aria-hidden": !_ctx.isActive
      }, toDisplayString(_ctx.message), 43 /* TEXT, CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["enter-active-class", "leave-active-class"]))
}

var css_248z = "\n.notices {\n    position: fixed;\n    display: flex;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    padding: 2em;\n    overflow: hidden;\n    z-index: 1000;\n    pointer-events: none;\n}\n.notices .toast {\n    animation-duration: 150ms;\n    padding: 0.75em 1.5em;\n    margin: 0.5em 0;\n}\n.notices .notification {\n    pointer-events: auto;\n    max-width: 600px;\n}\n.notices .toast.is-top, .notices .toast.is-bottom {\n    align-self: center;\n}\n.notices .toast.is-top-right, .notices .toast.is-bottom-right {\n    align-self: flex-end;\n}\n.notices .toast.is-top-left, .notices .toast.is-bottom-left {\n    align-self: flex-start;\n}\n.notices .toast.is-toast {\n    opacity: 0.92;\n}\n.notices.is-top {\n    flex-direction: column;\n}\n.notices.is-bottom {\n    flex-direction: column-reverse;\n}\n.notices.is-bottom .notification {\n    margin-bottom: 0;\n}\n.notices.is-bottom .notification:not(:first-child) {\n    margin-bottom: 1.5rem;\n}\n.notices.has-custom-container {\n    position: absolute;\n}\n@keyframes fadeOut {\nfrom {\n        opacity: 1;\n}\nto {\n        opacity: 0;\n}\n}\n.fadeOut {\n    animation-name: fadeOut;\n}\n@keyframes fadeInDown {\nfrom {\n        opacity: 0;\n        transform: translate3d(0, -100%, 0);\n}\nto {\n        opacity: 1;\n        transform: none;\n}\n}\n@keyframes fadeInUp {\nfrom {\n        opacity: 0;\n        transform: translate3d(0, 100%, 0);\n}\nto {\n        opacity: 1;\n        transform: none;\n}\n}\n.fadeInUp {\n    animation-name: fadeInUp;\n}\n.fadeInDown {\n    animation-name: fadeInDown;\n}\n\n";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/toast/Toast.vue";

var ToastProgrammatic = {
  open: function open(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      position: 'is-top'
    };
    var propsData = merge(defaultParam, params);
    var ToastComponent = defineComponent({
      "extends": script
    });

    var _app = createApp(ToastComponent, propsData);

    if (VueInstance._instance && VueInstance._instance.appContext) {
      Object.assign(_app._context, VueInstance._instance.appContext);
    } else if (VueInstance._context) {
      Object.assign(_app._context, VueInstance._context);
    }

    _app.mount(document.createElement('div'));

    return ToastComponent;
  }
};

export { ToastProgrammatic as T, script as s };
