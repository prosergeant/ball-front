<template>
    <div class="btn" >
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
    border-radius: 10px;
    background: $green-1;
    color: white;

    &:hover {
        background: $success-700;
        cursor: pointer;
    }
}
</style>