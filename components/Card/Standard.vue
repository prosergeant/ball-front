<template>
    <div class="card-wrapper">
        <img src="/cover.png">
        <div class="card-wrapper-info">
            <h3>{{ data?.name }}</h3>
            <p>{{ data?.text }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: IField
}>()
</script>

<style scoped lang="scss">
.card-wrapper {
    background: rgba(255, 255, 255, 0.22);
    color: white;
    border-radius: 30px;
    width: 294px;

    img {
        max-width: 294px;
    }

    &-info {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        h3 {
            max-width: 250px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
        }
        p {
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}
</style>