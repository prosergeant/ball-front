<template>
    <div>
        <div class="ellipse" />
        <UINavigation title="Авторизоваться" go-to="/auth/" :padding-x="24" />

        <div class="auth-wrapper">
            <div class="auth">
                <template v-if="codeNotSent">
                    <h3>Авторизоваться по:</h3>
                    <UIInput type="tel" label="Номеру телефона:" v-model="phone" />
                    <UIButton icon="arrow-right" color="black" @click.stop="getPassCode">Авторизоваться</UIButton>
                </template>
                <template v-else>
                    <div class="auth-passcode">
                        <UIPasscode @get-value="(e) => {passcode = e}" />
                        <UIButton :disabled="passcode !== `${otp}` || isAuthBtnDisabled" icon="arrow-right" icon-color="black" @click.stop="authorize">Войти</UIButton>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";

const {is_auth, user_info, access_token} = storeToRefs(authStore())

const codeNotSent = ref(true)
const passcode = ref('')
const phone = ref('')
const otp = ref(1111) //Math.floor(Math.random() * (9999 - 1000) + 1000 ))
const isAuthBtnDisabled = ref(false)

const getPassCode = () => {
    codeNotSent.value = false
    // otp.value = Math.floor(Math.random() * (9999 - 1000) + 1000 )
    // let phoneForOtp = phone.value
    // phoneForOtp = phoneForOtp.replace(/[^a-zA-Z0-9]/g, '')
    // phoneForOtp = phoneForOtp.replace('7', '8')

    // const {data: code} = useFetch(`${baseUrl}/send-otp/`, {
    //     lazy: true,
    //     method: 'POST',
    //     body: {
    //         otp: otp.value,
    //         phone: phoneForOtp
    //     }
    // })
}

const authorize = () => {
    isAuthBtnDisabled.value = true
    useFetch(`/change-password/`, {
        lazy: true,
        method: 'post',
        body: {
            "phone": phone.value,
            "password": `${otp.value}`
        }
    })
        .then(res => {
            console.log(res)

            useFetch(`/api-token/`, {
                lazy: true,
                method: 'post',
                body: {
                    'phone': phone.value,
                    "password": otp.value
                }
            })
                .then((res: any) => {
                    const keys = {...res.data.value}

                    access_token.value = keys.access
                    is_auth.value = true
                    localStorage.setItem('access', access_token.value)
                    localStorage.setItem('refresh', keys.refresh)
                    localStorage.setItem('is_auth', 'true')

                    useFetch(`/user-info/`)
                        .then((res: any) => {
                            user_info.value = res.data.value
                            localStorage.setItem('user', JSON.stringify(user_info.value))

                            // is_auth.value = true
                            navigateTo('/profile')
                        })
                })
        })
        .finally(() => {
            isAuthBtnDisabled.value = false
        })
}
</script>

<style scoped lang="scss">
.auth-wrapper {
    height: calc(100dvh - 36px);
    display: flex;
    align-items: flex-end;
    .auth {
        border-radius: 28px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        background: rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(20px);
        width: 100%;
        height: 80%;
        padding: 28px;

        display: flex;
        flex-direction: column;
        gap: 26px;

        h3 {
            color: white;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 24px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
        }

        button {
            display: flex;
            width: 100%;
            height: 60px;
            padding: 15px 16px;
            gap: 10px;
            border-radius: 10px;
            background: $green1;
            color: #111518;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin-top: auto;
        }
    }
}

.auth-passcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    button {
        margin-top: auto;
    }
}
</style>