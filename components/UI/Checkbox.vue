<template>
    <div @click="emit('update:modelValue', !modelValue)">
        <div v-if="modelValue" class="checkbox-on">
            <UIIcon icon="arrow-accept" color="black" />
        </div>
        <div v-else class="checkbox-off" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{(e: 'update:modelValue', value: boolean): void }>()

</script>

<style scoped lang="scss">

</style>