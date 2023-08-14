<template>
    <client-only>
        <div
            class="notification-container"
            ref="notificationContainer"
        >
            <div class="notification" v-for="message in messages" :key="message">{{ message }}</div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import {useNotifyStore} from "~/store/useNotify";
import {storeToRefs} from "pinia";

const {eraseNotify} = useNotifyStore()
const {messages} = storeToRefs(useNotifyStore())
const height = ref(0)

const notificationContainer = ref()

watch(() => messages.value, (v) => {
    if(!v.length) return

    setTimeout(() => {
        height.value = notificationContainer.value.offsetHeight
        notificationContainer.value.style.top = '0'
    }, 1000)

    setTimeout(() => {
        notificationContainer.value.style.top = `-${height.value}px`

        setTimeout(() => {
            eraseNotify()
        }, 500)
    }, 5000)
}, {deep: true})

</script>

<style scoped lang="scss">
.notification-container {
    position: fixed;
    top: -50px;
    left: 0;
    width: 100%;
    background-color: #ff5733;
    text-align: center;
    transition: top 0.5s ease-in-out;

    z-index: 10;
    opacity: 0.9;
}

.notification {
    padding: 10px;
    color: white;
    font-size: 18px;
    white-space: pre;
}
</style>
