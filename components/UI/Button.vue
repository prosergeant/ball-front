<template>
    <button class="btn" :class="{disabled: disabled}" :disabled="disabled">
        <slot></slot>
        <UIIcon v-if="icon" :icon="icon" :color="iconColor || color || ''" />
    </button>
</template>

<script setup lang="ts">

const props = defineProps<{
    color?: string
    icon?: string
    iconColor?: string
    disabled?: boolean
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
    background: $green1;
    color: black;
    outline: none;
    border: none;

    &:hover {
        cursor: pointer;
    }

    &.disabled {
        background: grey !important;
    }
}
</style>
