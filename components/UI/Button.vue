<template>
    <div class="btn" >
        <slot></slot>
        <UIIcon v-if="icon" :icon="icon" :color="iconColor || color || ''" />
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    color?: string
    icon?: string
    iconColor?: string
}>()

</script>

<style scoped lang="scss">
.btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
    background: $green-1;
    color: white;

    &:hover {
        cursor: pointer;
    }
}
</style>