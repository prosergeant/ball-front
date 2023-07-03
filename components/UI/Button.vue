<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    color?: string
}>()

</script>

<style scoped lang="scss">
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    border-radius: 8px;
    background: $success-400;
    color: white;
}
</style>