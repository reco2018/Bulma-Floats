import config from './config'
import { removeElement } from './helpers'

export default {
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
            default: 960
        },
        hasModalCard: Boolean,
        animation: {
            type: String,
            default: 'zoom-out'
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return config.defaultModalCanCancel
            }
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return config.defaultModalScroll
                    ? config.defaultModalScroll
                    : 'clip'
            },
            validator: (value) => {
                return [
                    'clip',
                    'keep'
                ].indexOf(value) >= 0
            }
        },
        fullScreen: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        autoFocus: {
            type: Boolean,
            default: () => {
                return config.defaultAutoFocus
            }
        },
        customClass: String,
        ariaRole: {
            type: String,
            validator: (value) => {
                return [
                    'dialog',
                    'alertdialog'
                ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean,
        ariaLabel: {
            type: String,
            validator: (value) => {
                return Boolean(value)
            }
        },
        closeButtonAriaLabel: String,
        destroyOnHide: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: typeof this.width === 'number'
                ? this.width + 'px'
                : this.width,
            animating: !this.active,
            destroyed: !this.active
        }
    },
    computed: {
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? config.defaultModalCanCancel
                    : []
                : this.canCancel
        },
        showX() {
            return this.cancelOptions.indexOf('x') >= 0
        },
        customStyle() {
            if (!this.fullScreen) {
                return { maxWidth: this.newWidth }
            }
            return null
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        isActive(value) {
            if (value) this.destroyed = false
            this.handleScroll()
            this.$nextTick(() => {
                if (value && this.$el && this.$el.focus && this.autoFocus) {
                    this.$el.focus()
                }
            })
        }
    },
    methods: {
        handleScroll() {
            if (typeof window === 'undefined') return
            if (this.scroll === 'clip') {
                if (this.isActive) {
                    document.documentElement.classList.add('is-clipped')
                } else {
                    document.documentElement.classList.remove('is-clipped')
                }
                return
            }
            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop
            if (this.isActive) {
                document.body.classList.add('is-noscroll')
            } else {
                document.body.classList.remove('is-noscroll')
            }
            if (this.isActive) {
                document.body.style.top = `-${this.savedScrollTop}px`
                return
            }
            document.documentElement.scrollTop = this.savedScrollTop
            document.body.style.top = null
            this.savedScrollTop = null
        },
        ok() {
            this.onOk(this.defaultResult)
            this.close()
        },
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            this.onCancel()
            this.onCancel.apply(null, arguments)
            this.close()
        },
        close() {
            if (this.programmatic) {
                this.isActive = false
                setTimeout(() => {
                    // this.$destroy()
                    removeElement(this.$el)
                }, 150)
            }
        },
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape')
        },
        afterEnter() {
            this.animating = false
            this.$emit('after-enter')
        },
        beforeLeave() {
            this.animating = true
        },
        afterLeave() {
            if (this.destroyOnHide) {
                this.destroyed = true
            }
            this.$emit('after-leave')
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    mounted() {
        this.programmatic && document.body.appendChild(this.$el)
        if (this.programmatic) this.isActive = true
        else if (this.isActive) this.handleScroll()
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
            // reset scroll
            document.documentElement.classList.remove('is-clipped')
            const savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop
            document.body.classList.remove('is-noscroll')
            document.documentElement.scrollTop = savedScrollTop
            document.body.style.top = null
        }
    }
}
