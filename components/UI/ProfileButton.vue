<template lang="jade">
.new-profile(@click="goTo(link, isPdf)")
    .new-profile-button
        div
            UIIcon(:icon="icon")
            p {{ text }}
        UIIcon(icon="chevron-right" class="right-icon")
</template>

<script setup lang="ts">
import {justURL} from "~/composables/baseUrl";

const props = defineProps<{
    icon: string,
    text: string,
    link: string,
    isPdf?: boolean
}>()

const goTo = (link: string, isPdf = false) => {
    if(isPdf) {
        window.location.href = `${justURL}${link}`
    } else {
        navigateTo(link)
    }
}
</script>

<style scoped lang="scss">
.new-profile {
    width: 100%;
    &-button {
        display: flex;
        justify-content: space-between;

        div {
            display: flex;
            gap: 12px;
        }

        .right-icon {
            height: 10px;
            margin: auto 0;
        }
    }
}
</style>
