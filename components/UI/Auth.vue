<template>
    <div class="auth-wrapper">
        <div class="avatar-block" v-if="!noReg">
            <div class="avatar">
                <div class="avatar-wrapper">
                    <img src="/icons/logo-black.svg" alt="avatar" />
                </div>
            </div>
        </div>
        <div class="auth" v-on-click-outside="() => {emit('onOutside', true)}">
            <h3>Уже есть аккаунт?</h3>
            <p>Если у вас уже есть аккаунт перейдите на страницу авторизации</p>
            <template v-if="noReg">
                <UIInput v-model="login" label="Номер" type="tel" />
                <UIInput v-model="password" label="Пароль" type="password" />
            </template>
            <UIButton v-if="!noReg" class="btn-green-demi-outline" @click="navigateTo('/reg-only/')">Регистрация</UIButton>
            <UIButton class="login" @click="authHandler">Авторизоваться</UIButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";
import {useNotifyStore} from "~/store/useNotify";

const props = defineProps<{
    noRedirect?: boolean
    noReg?: boolean
}>()

const emit = defineEmits<{
    (e: 'status', value: boolean): void
    (e: 'onOutside', value: boolean): void
}>()

const {addNotify} = useNotifyStore()

const authHandler = () => {
    if(props.noReg)
        authorize()
    else
        navigateTo('/auth-only/')
}

const {is_auth, user_info, access_token} = storeToRefs(authStore())
const router = useRouter()

const login = ref('')
const password = ref('')

const authorize = () => {
    if(!login.value || !password.value) return

    myFetch(`/api-token/`, {
        method: 'post',
        body: {
            'phone': login.value,
            "password": password.value
        }
    })
        .then((res) => {
            const keys = res._data as {access: string, refresh: string}

            access_token.value = keys.access
            is_auth.value = true
            localStorage.setItem('access', access_token.value)
            localStorage.setItem('refresh', keys.refresh)
            localStorage.setItem('is_auth', 'true')

            myFetch(`/user-info/`)
                .then((res) => {
                    user_info.value = res._data as typeof user_info.value
                    localStorage.setItem('user', JSON.stringify(user_info.value))

                    if(!props.noRedirect)
                        navigateTo('/profile')

                    emit('status', true)
                })
        })
        .catch((err) => {
            if(!props.noRedirect)
                router.go(0)
            addNotify('Не правильный номер или пароль' + `\n${err?._data?.detail}`)
            console.log()
            // emit('status', false)
        })
}
</script>

<style scoped lang="scss">
.avatar-block {
    width: 100%;
    height: calc(100% - var(--menu-block, 385px));
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
        position: relative;
        .edit-image {
            position: absolute;
            bottom: 0;
            right: 10px;
            width: 34px;
            height: 34px;
        }
        .avatar-wrapper {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            overflow: hidden;
            img {
                object-fit: cover;
                width: 110px;
                height: 110px;
            }
        }
    }
}

.auth-wrapper {
    padding: 0 28px;
    //display: flex;
    //align-items: center;
    height: 100dvh;


    .auth {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 385px;

        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 48px 28px 28px 28px;

        border: 1px solid rgba(255, 255, 255, 0.20);

        background: black;
        backdrop-filter: blur(20px);

        h3 {
            color: white;
        }

        p {
            color: #AFAFAF;
            text-align: center;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        button {
            width: 100%;
            &.login {
                display: flex;
                height: 47px;
                padding: 15px 16px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;

                border-radius: 10px;
                background: #B9FD02;

                color: $black1;
                text-align: center;
                font-size: 13px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
            }
        }
    }
}
</style>
