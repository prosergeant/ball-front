<template>
    <div class="profile-wrapper">
        <div class="profile">
            <h4>Обо мне</h4>

            <div class="info-blocks">
                <div class="block"
                     v-for="i in profileInfo"
                     :key="i.id"
                >
                    <span>{{ i.value }}</span>
                    <p>{{ i.name }}</p>
                </div>
            </div>

            <div class="logout" @click="_logout">
                <UIIcon icon="logout" color="green1" />
                <p>Выйти из аккаунта</p>
                <UIIcon icon="chevron-right" color="green1" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";

const {logout} = authStore()

const {is_auth} = storeToRefs(authStore())
const router = useRouter()

const profileInfo = ref([
    {
        id: 1,
        name: 'Возраст',
        value: 18
    },
    {
        id: 2,
        name: 'Сыграно игр',
        value: 0
    },
    {
        id: 3,
        name: 'Победы',
        value: 0
    },
    {
        id: 4,
        name: 'S/L',
        value: 0
    },
])

const _logout = () => {
    logout()
    navigateTo('/')
}

onMounted(() => {
    setTimeout(() => {
        if(!is_auth.value) {
            navigateTo('/auth/')
        }
    }, 0)
})
</script>

<style scoped lang="scss">
.profile-wrapper {
    padding: 0 28px;
    height: 100dvh;


    .profile {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 455px;

        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 25px;

        border: 1px solid rgba(255, 255, 255, 0.20);

        background: black;
        backdrop-filter: blur(20px);

        h3 {
            color: white;
        }

        h4 {
            color: white;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        p {
            color: white;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}

.info-blocks {

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 18px;

    .block {
        display: flex;
        padding: 14px 12px;
        flex-direction: column;
        align-items: center;
        gap: 9px;

        border-radius: 24px;
        background: $black2;
        backdrop-filter: blur(20px);

        span {
            color: $green1;
            text-align: center;
            font-size: 42px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
        p {
            color: white;
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}

.logout {
    display: flex;

    &:first-child {
        margin-right: 16px;
    }
    p {
        margin-right: auto;
    }
}
</style>