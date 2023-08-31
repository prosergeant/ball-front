<template>
    <div class="navigation" :class="{black: black}" :style="`--padding-x: ${paddingX}px`">
        <div class="left" @click="(goTo) && (navigateTo(goTo))">
            <UIIcon icon="chevron-left" :color="black ? 'black' : 'white'" />
            <p>{{ title }}</p>
        </div>
        <div v-if="noSearch"/>
        <UIIcon v-else icon="search" :color="black ? 'black' : 'white'" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    goTo?: string
    paddingX?: number
    noSearch?: boolean
    black?: boolean
}>()
</script>

<style scoped lang="scss">
.navigation {
    height: 26px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--padding-x, 0px);

    margin-top: 10px;

    &.black .left p {
        color: black;
    }

    .left {
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 12px;

        p {
            color: #FFF;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 20px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
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
