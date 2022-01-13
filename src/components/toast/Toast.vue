<template>
    <transition
        :enter-active-class="transition.enter"
        :leave-active-class="transition.leave">
        <div
            @mouseenter="pause"
            @mouseleave="removePause"
            v-show="isActive"
            class="toast"
            :class="[type, position]"
            :aria-hidden="!isActive"
            role="alert">
            <template v-if="$slots.default">
                <slot />
            </template>
            <template v-else>
                <div v-html="message" />
            </template>
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

<style lang="scss">
$notices-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04) !default;

$toast-border-radius: 2em !default;
$toast-opacity: 0.92 !default;
$toast-box-shadow: $notices-box-shadow !default;
$speed-slow: 150ms !default;

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
    .toast {
        display: inline-flex;
        animation-duration: $speed-slow;
        margin: 0.5em 0;
        text-align: center;
        box-shadow: $toast-box-shadow;
        border-radius: $toast-border-radius;
        padding: 0.75em 1.5em;
        pointer-events: auto;
        opacity: $toast-opacity;
        color: rgba(255, 255, 255, 0.96);
        background: rgba(0, 0, 0, 0.96);
    }
    .notification {
        pointer-events: auto;
        max-width: 600px;
    }

    .toast,
    .snackbar,
    .notification {
        // Modifiers
        &.is-top, &.is-bottom {
            align-self: center;
        }
        &.is-top-right, &.is-bottom-right {
            align-self: flex-end;
        }
        &.is-top-left, &.is-bottom-left {
            align-self: flex-start;
        }
        &.is-toast {
            opacity: $toast-opacity;
        }
    }

    // Modifiers
    &.is-top {
        flex-direction: column;
    }
    &.is-bottom {
        flex-direction: column-reverse;

        // Since the columns are reversed, we need to reverse the margin logic from
        // :not(:last-child) to :not(:first-child)
        .notification {
            margin-bottom: 0;
            &:not(:first-child) {
                margin-bottom: 1.5rem;
            }
        }
    }
    &.has-custom-container {
        position: absolute;
    }

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
