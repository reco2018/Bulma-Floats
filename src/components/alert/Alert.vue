<template>
    <transition :name="animation">
        <div :class="`modal ${isActive ? 'is-active' : ''}`">
            <div v-if="!isFullScreen" @click="cancel('outside')" class="modal-background"></div>
            <div :class="`modal-card ${!isFullScreen ? 'px-3' : ''}`" :style="isFullScreen ? 'width: 100%; height: 100%; max-height: 100vh;' : ''">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-centered is-size-5">{{ title }}</p>
                    <button @click="cancel('x')" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <ChildComponent v-if="component" :result="newResult" @onOk="ok" @onCancel="cancel('button')" @onResultChanged="onResultChanged" />
                    <span v-else>{{ content }}</span>
                </section>
                <footer class="modal-card-foot is-justify-content-end">
                    <button @click="cancel('button')" v-if="cancelVisible" class="button">{{ newCancelText }}</button>
                    <button @click="ok" v-if="okVisible" class="button is-success">{{ newOkText }}</button>
                </footer>
            </div>
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
            newCancelText: this.cancelText || config.defaultAlertCancelText,
            newResult: this.defaultResult || {}
        }
    },
    methods: {
        onResultChanged(result) {
            this.newResult = result
        },
        ok() {
            this.$emit('onOk', this.newResult)
            this.close()
        },
    }
}
</script>