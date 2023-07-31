<template>
    <div class="main-wrapper" :class="{greyground: isGreyground}">
        <div
            class="maxwidth"
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
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";

const {is_auth, access_token, user_info} = storeToRefs(authStore())

const route = useRoute()
const greyground = ref(['/auth/', '/profile/', "/auth", "/profile"])
const onlyIn = ref(['/', '/profile/', '/profile', '/profile/my-games/', '/profile/my-games', '/auth/', '/auth'])
const isFooter = computed(() => onlyIn.value.includes(route.path))
const isGreyground = computed(() => greyground.value.includes(route.path))
const deviceWidth = ref(420)

onMounted(() => {
    deviceWidth.value = window.innerWidth < 420 ? window.innerWidth : 420
})

useHead({
    meta: [
        {
            name: 'viewport',
            content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover'
            // content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
            name: 'theme-color',
            content: '010101'
        }
    ]
})

onMounted(() => {
    if(window) {
        is_auth.value = localStorage.getItem('is_auth') === 'true'
        access_token.value = localStorage.getItem('access')
        user_info.value = JSON.parse(localStorage.getItem('user') || '{}')

        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
            document.body.style.zoom = 1;
        });

        document.addEventListener('gesturechange', function(e) {
            e.preventDefault();
            document.body.style.zoom = 1;
        });

        document.addEventListener('gestureend', function(e) {
            e.preventDefault();
            document.body.style.zoom = 1;
        });

        document.ondblclick = function(e) {
            e.preventDefault();
        }
    }
})
</script>