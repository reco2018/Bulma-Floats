<template>
    <transition :name="animation">
        <div class="modal" :class="{'is-active': isActive, 'sheetModal': isSheet}">
            <div v-if="!isFullScreen" @click="cancel('outside')" class="modal-background"></div>
            <div class="modal-card" :class="{'px-3': !isFullScreen, 'fullScreenModal': isFullScreen}">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-centered is-size-5">{{ title }}</p>
                    <button @click="cancel('x')" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <ChildComponent v-bind:is="component" :result="newResult" @onOk="ok" @onCancel="cancel('button')" @onResultChanged="onResultChanged" />
                    <span v-if="content">{{ content }}</span>
                </section>
                <footer v-if="cancelVisible || okVisible" class="modal-card-foot is-justify-content-end">
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
            console.log('okokok')
            console.log(this.newResult)
            this.onOk(this.newResult)
            this.close()
        },
    }
}
</script>
<style>
.fullScreenModal {
    width: 100%; 
    height: 100%;
    max-height: 100vh;
}
.sheetModal {
   justify-content: end !important; 
}
</style>