<template>
    <div class="auth-wrapper no-main-padding">
        <div class="auth">
            <h3>Уже есть аккаунт?</h3>
            <p>Если у вас уже есть аккаунт перейдите на страницу авторизации</p>
            <UIInput v-model="login" label="Номер" type="tel" />
            <UIInput v-model="password" label="Пароль" type="password" />
            <UIButton class="register">Регистрация</UIButton>
            <UIButton class="login" @click="authorize">Войти</UIButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";

const {is_auth, user_info, access_token} = storeToRefs(authStore())
const router = useRouter()

const login = ref('')
const password = ref('')

const authorize = () => {
    if(!login.value || !password.value) return

    useFetch(`${baseUrl}/api-token/`, {
        method: 'POST',
        body: {
            phone: login.value,
            password: password.value
        }
    })
        .then((res: any) => {
            if(res?.error?.value?.statusCode === 401) {
                router.go(0)
                return
            }

            const keys = {...res.data.value}

            const access = useCookie('access')
            access.value = keys.access
            access_token.value = access.value || ''
            const refresh = useCookie('refresh')
            refresh.value = keys.refresh
            const auth = useCookie('is_auth')
            auth.value = 'true'

            useFetch(`${baseUrl}/user-info/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access.value}`
                }
            })
                .then((res: any) => {
                    user_info.value = res.data.value
                    const userCookie = useCookie('user')
                    userCookie.value = user_info.value

                    is_auth.value = true
                    router.go(0)
                })
        })
}
</script>

<style scoped lang="scss">
.auth-wrapper {
    padding: 0 28px;
    //display: flex;
    //align-items: center;
    height: 100dvh;


    .auth {
        position: absolute;
        bottom: 0;
        width: 87%;

        border-radius: 30px;
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

            &.register {
                display: flex;
                height: 47px;
                padding: 15px 16px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                flex-shrink: 0;

                border-radius: 10px;
                border: 1px solid $green1;
                background: rgba(185, 253, 2, 0.32);

                color: $green1;
                text-align: center;
                font-size: 13px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
            }
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