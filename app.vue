<template>
    <div class="main-wrapper" :class="{greyground: isGreyground}">
        <div
            class="maxwidth"
            :class="{'footer-padding': isFooter && isPadding}"
            :style="`--width: ${deviceWidth}px`"
        >
            <NuxtPage />
            <UIFooter v-if="isFooter" :width="deviceWidth" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-wrapper {
    display: flex;
    width: 100%;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    background: $background;

    .maxwidth {
        max-width: var(--width, 420px);
        width: var(--width);
        position: relative;
    }

    &.greyground {
        background: #AFAFAF;
    }
}

.footer-padding {
    padding-bottom: 82px;
}
</style>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
const onlyIn = ref(['/', '/profile/my-games/'])
const isFooter = computed(() => onlyIn.value.includes(route.path))
const greyground = ref(['/profile/my-games/'])
const isGreyground = computed(() => greyground.value.includes(route.path))
const padding = ref(['/profile/my-games/'])
const isPadding = computed(() => !padding.value.includes(route.path))
const deviceWidth = ref(420)

onMounted(() => {
    deviceWidth.value = window.innerWidth < 420 ? window.innerWidth : 420
})

useHead({
    meta: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
            name: 'theme-color',
            content: '010101'
        }
    ]
})

onMounted(() => {
    if(window) {
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            document.body.style.zoom = 1;
        });

        document.addEventListener('gesturechange', function(e) {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            document.body.style.zoom = 1;
        });

        document.addEventListener('gestureend', function(e) {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            document.body.style.zoom = 1;
        });

        document.ondblclick = function(e) {
            e.preventDefault();
        }
    }
})
</script>