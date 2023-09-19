<template lang="jade">
.main-wrapper
    UINotify
    .maxwidth(:style="`--width: ${deviceWidth}px;`")
        NuxtPage
        template(v-if="isFooter")
            UIFooter(:width="deviceWidth")
</template>

<style scoped lang="scss">
.main-wrapper {
    -webkit-overflow-scrolling: touch;

    display: flex;
    width: 100%;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    background: $background;

    .maxwidth {
        max-width: var(--width, 420px);
        width: 100%; //var(--width);
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
import {authStore} from "~/store/auth";

const {saveData} = authStore()

const route = useRoute()
const onlyIn = ref(['/', '/profile/', '/profile', '/profile/my-games/', '/profile/my-games', '/auth/', '/auth'])
const isFooter = computed(() => onlyIn.value.includes(route.path))
const deviceWidth = ref(420)

onMounted(() => {
    deviceWidth.value = window.innerWidth < 420 ? window.innerWidth : 420
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iP(hone|od|ad)/.test(userAgent)) {
        window.location="bronkz://bronkz.app"
    } else if (/android/i.test(userAgent)) {
        window.location="bronkz://bronkz.app"
    } else {
        window.location="bronkz://bronkz.app"
    }
})

useHead({
    meta: [
        {
            name: 'viewport',
            content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover'
        },
        {
            name: 'theme-color',
            content: '010101'
        }
    ]
})

onMounted(async () => {
    if(window) {
        const is_auth = localStorage.getItem('is_auth') === 'true'
        const access_token = localStorage.getItem('access')
        const user_info = JSON.parse(localStorage.getItem('user') || '{}')

        await saveData({
            is_auth,
            user_info,
            access_token
        })

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
