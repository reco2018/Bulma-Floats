<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">
        <div
            @mouseenter="pause"
            @mouseleave="removePause"
            v-show="isActive"
            class="toast notification"
            :class="[type, position]"
            :aria-hidden="!isActive">
            {{ message }}
        </div>
    </transition>
</template>

<script>
import config from '../../utils/config'
import NoticeMixin from '../../utils/NoticeMixin.js'

export default {
    name: 'FToast',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || config.defaultToastDuration
        }
    }
}
</script>

<style>
.notices {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2em;
    overflow: hidden;
    z-index: 1000;
    pointer-events: none;
}

.notices .toast {
    animation-duration: 150ms;
    padding: 0.75em 1.5em;
    margin: 0.5em 0;
}

.notices .notification {
    pointer-events: auto;
    max-width: 600px;
}

.notices .toast.is-top, .notices .toast.is-bottom {
    align-self: center;
}

.notices .toast.is-top-right, .notices .toast.is-bottom-right {
    align-self: flex-end;
}

.notices .toast.is-top-left, .notices .toast.is-bottom-left {
    align-self: flex-start;
}

.notices .toast.is-toast {
    opacity: 0.92;
}

.notices.is-top {
    flex-direction: column;
}

.notices.is-bottom {
    flex-direction: column-reverse;
}

.notices.is-bottom .notification {
    margin-bottom: 0;
}

.notices.is-bottom .notification:not(:first-child) {
    margin-bottom: 1.5rem;
}

.notices.has-custom-container {
    position: absolute;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
.fadeOut {
    animation-name: fadeOut;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}
.fadeInUp {
    animation-name: fadeInUp;
}

.fadeInDown {
    animation-name: fadeInDown;
}

</style>
