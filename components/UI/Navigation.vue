<template>
    <div class="navigation">
        <div class="left" @click="navigateTo(goTo)">
            <UIIcon icon="chevron-left" color="white" />
            <p>{{ title }}</p>
        </div>
        <UIIcon icon="search" color="white" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    goTo: string
}>()
</script>

<style scoped lang="scss">
.navigation {
    height: 26px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 10px;

    .left {
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 12px;

        p {
            font-size: 20px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0;
            text-align: left;
            color: white;
        }
        i {
            width: 14px;
            height: 14px;
        }
    }



    i {
        width: 26px;
        height: 26px;
    }


}
</style>