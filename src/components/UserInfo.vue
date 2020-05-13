<template>
    <transition name="fade">
        <div 
            class="user_info-dialog-wrapper"
            :class="dialog ? 'visible' : ''"
        >
            <div class="user_info-dialog" @mousedown="drag" :class="dialog ? 'animated' : ''">
                <div>
                    <img class="img-fluid rounded" :src="user.avatar" alt="avatar">
                    <div class="float-right m-4">
                        <h3>
                            {{ user.first_name }} {{ user.last_name }}
                        </h3>
                        <p>
                            {{ user.email }}
                        </p>
                    </div>
                </div>
                <div class="close_button" @click="close">&times;</div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class UserInfo extends Vue {

    @Prop()
    private user!: any
    @Prop()
    private dialog!: boolean

    close() {
        this.$emit('onDialogClose')
    }

    drag(event: any) {
        const element = event.target.closest('.user_info-dialog')
        const close = event.target.closest('.close_button')
        element.ondragstart = function() {
            return false;
        };
        function moveAt(event: any) {
            if(!close) {
                element.style.left = event.pageX + 'px';
                element.style.top = event.pageY + 'px';
            }
        }
        document.onmousemove = function(e) {
            moveAt(e);
        }

        element.onmouseup = function() {
            document.onmousemove = null;
            element.onmouseup = null;
        }
    }
    
}
</script>

<style lang="scss" scoped>
.user_info-dialog-wrapper {
    // display: none;
    transform: scale(0);
    width: 100vw;
    height: 100vh;
    // opacity: 0.5;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    &>.user_info-dialog {
        position: absolute;
        user-select: none;
        left: 50%;
        top: 50%;
        transform: scale(0);
        transform-origin: 0% 0%;
        // transform: translate(-50%, -50%);
        background-color: #fff;
        min-width: 300px;
        max-width: 500px;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 1px 5px 2px solid rgba(33, 33, 33, 0.5);
        // opacity: 1;
        transition: transform .5s;
        &.animated {
            transform: scale(1) translate(-50%, -50%);
        }
    }
    &.visible {
        // display: block;
        transform: scale(1);
    }
    & .close_button {
        position: absolute;
        cursor: pointer;
        top: -.5rem;
        right: .5rem;
        font-size: 2rem;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: all 500ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transform: scale(1);
}
</style>