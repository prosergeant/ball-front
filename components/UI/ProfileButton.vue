<template lang="jade">
.new-profile(@click="navigateTo(link)")
    .new-profile-button
        div
            UIIcon(:icon="icon")
            p {{ text }}
        UIIcon(icon="chevron-right" class="right-icon")
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
