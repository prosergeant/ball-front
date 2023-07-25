<template>
    <div class="footer" :style="`--width: ${width}px`">
        <div
            v-for="icon in icons"
            :key="icon.id"
            class="icon-item"
            @click="navigateTo(icon.key)"
        >
            <UIIcon
                :icon="icon.icon"
                :color="route.path === icon?.key ? 'green1' : 'black'"
            />
            <p v-if="icon?.name" :class="{green: route.path === icon?.key}">{{ icon.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

const props = defineProps<{
    width: number
}>()

const route = useRoute()

type TIcon = {
    id: number
    icon: string
    name?: string
    key?: string
}
const icons = ref<TIcon[]>([
    {
        id: 1,
        icon: 'home',
        name: 'Главная',
        key: '/'
    },
    {
        id: 2,
        icon: 'ball',
        name: 'Мои игры',
        key: '/profile/my-games'
    },
    {
        id: 3,
        icon: 'user',
        name: 'Мой профиль',
        key: '/profile'
    },
])

</script>

<style scoped lang="scss">
.footer {
    position: fixed;
    bottom: 24px;
    left: calc(50% - (var(--width, 420px) / 2) + 45px);
    height: 68px;
    width: calc(var(--width, 420px) - 90px);
    border-radius: 49px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(20px);

    padding: 0 29px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    .icon-item {
        cursor: pointer;

        i {
            width: 22px;
            height: 22px;
        }

        p {
            color: rgba(255, 255, 255, 0.42);
            text-align: center;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        p.green {
            color: $green1
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
}
</style>