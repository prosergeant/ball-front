<template lang="jade">
.new-profile(@click="navigateTo(link)")
    .new-profile-button
        div
            UIIcon(:icon="icon")
            p {{ text }}
        UIIcon(icon="arrow-right")
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: string,
    text: string,
    link: string
}>()
</script>

<style scoped lang="scss">
.new-profile {
    width: 100%;
    &-button {
        display: flex;
        justify-content: space-between;
        padding: 0 0 4px 0;
        border-bottom: 1px solid #999;

        div {
            display: flex;
            gap: 12px;
        }
    }
}
</style>
