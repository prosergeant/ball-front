<template>
    <div class="accordion">
        <div class="head" @click="closed = !closed">
            <h3>{{ title }}</h3>
            <UIIcon icon="chevron-right" :class="{deg270: !closed}" color="green1" />
        </div>
        <div class="body" :class="{close: closed}">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
}>()

const closed = ref(true)
</script>

<style scoped lang="scss">
.accordion {
    display: flex;
    flex-direction: column;

    .head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            color: white;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }

    .body {
        color: white;
        padding-top: 24px;

        &.close {
            height: 0;
            overflow: hidden;
        }
    }
}
</style>