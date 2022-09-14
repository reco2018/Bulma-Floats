<template>
    <transition :name="animation">
        <div class="modal" :class="{'is-active': isActive, 'sheetModal': isSheet}">
            <div v-if="!isFullScreen" @click="cancel('outside')" class="modal-background"></div>
            <button @click="cancel('x')" class="delete" aria-label="close"></button>
            <div class="modal-card" :class="{'px-2': !isFullScreen, 'fullScreenModal': isFullScreen}">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-centered is-size-5">{{ title }}</p>
                    
                </header>
                <section class="modal-card-body">
                    <ChildComponent v-bind:is="component" :result="newResult" :customProps="props" @onOk="ok" @onCancel="cancel('button')" @onResultChanged="onResultChanged" />
                    <span v-if="content">{{ content }}</span>
                </section>
                <footer v-if="cancelVisible || okVisible" class="modal-card-foot is-justify-content-center">
                    <button @click="cancel('button')" v-if="cancelVisible" class="button">{{ newCancelText }}</button>
                    <button @click="ok" v-if="okVisible" class="button is-success">{{ newOkText }}</button>
                </footer>
                <footer v-else-if="!cancelVisible && !okVisible && !isSheet" class="modal-card-foot no-button">
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
            this.onOk(this.newResult)
            this.close()
        },
    }
}
</script>
<style lang="scss">
.fullScreenModal {
    width: 100%;
    height: 100%;
    max-height: 100vh;
}

.sheetModal {
    justify-content: end !important;
    padding-top: 60px;
}

.modal {
    .modal-card {
        margin-left: 5px;
        margin-right: 5px;
    }

    .modal-card-title {
        flex-shrink: 1;
    }

    .modal-card-head {
        background-color: #fff;

        .modal-card-title {
            font-size: 16px !important;
        }
    }

    .modal-card-body {
        padding: 20px 25px;

        hr.has-background-accent {
            margin-left: -25px !important;
            margin-right: -25px !important;
        }
    }

    .modal-card-foot {
        background-color: #fff;
        border-top: none;
        justify-content: center !important;

        .button {
            padding: 0.5em 1.5em;
            min-width: 7em;
        }
        &.no-button {
            height: 10px;
            padding: 0;
            margin: 0;
        }
    }

    .modal-background ~ button.delete {
        position: absolute;
        top: 0px;
        right: 10px;
        height: 60px !important;
        width: 60px !important;
        max-height: initial;
        max-width: initial;
        padding: 0;
        margin: 0;
        background-color: transparent;
    }
}
</style>