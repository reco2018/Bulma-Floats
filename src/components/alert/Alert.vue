<template>
    <transition :name="animation">
        <div :class="`modal ${isActive ? 'is-active' : ''}`">
            <div @click="cancel('outside')" class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{ title }}</p>
                    <button @click="cancel('x')" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    {{ content }}
                </section>
                <footer class="modal-card-foot is-justify-content-end">
                    <button @click="cancel('button')" v-if="cancelVisible" class="button">{{ newCancelText }}</button>
                    <button @click="ok" v-if="okVisible" class="button is-success">{{ newOkText }}</button>
                </footer>
            </div>
            <button @click="cancel('x')" class="modal-close is-large" aria-label="close"></button>
        </div>
    </transition>
</template>

<script>
import config from '../../utils/config'
import DialogMixin from '../../utils/DialogMixin.js'

export default {
    name: 'FAlert',
    mixins: [DialogMixin],
    data() {
        return {
            newOkText: this.okText || config.defaultAlertOkText,
            newCancelText: this.cancelText || config.defaultAlertCancelText
        }
    }
}
</script>