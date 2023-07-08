<template>
    <div>
        <div v-if="value" class="checkbox-on">
            <UIIcon icon="arrow-accept" color="black" />
        </div>
        <div v-else class="checkbox-off" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: boolean
}>()
</script>

<style scoped lang="scss">

</style>