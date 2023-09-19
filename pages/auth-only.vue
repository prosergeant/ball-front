<template lang="jade">
div
    UINavigation(title="Авторизоваться" go-to="/auth/" ":padding-x"="24")

    .auth-wrapper
        .auth
            template(v-if="codeNotSent")
                h3 Авторизоваться по:
                UIInput(type="tel" label="Номеру телефона:" v-model="phone")
                UIButton(icon="arrow-right" color="black" @click.stop="getPassCode") Авторизоваться
            template(v-else="")
                .auth-passcode
                    UIPasscode(@get-value="checkPassCode")
                    .flex.j-center.a-center.h-100(v-if="loading")
                        .loader
                    UIButton(":disabled"="passcode !== `${otp}` || isAuthBtnDisabled" icon="arrow-right" icon-color="black" @click.stop="authorize") Войти
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useNotifyStore} from "~/store/useNotify";

const {addNotify} = useNotifyStore()
const {is_auth, user_info, access_token} = storeToRefs(authStore())

const codeNotSent = ref(true)
const passcode = ref('')
const phone = ref('')
const otp = ref(1111) //Math.floor(Math.random() * (9999 - 1000) + 1000 ))
const isAuthBtnDisabled = ref(false)
const loading = ref(false)

const checkPassCode = (e: string) => {
    passcode.value = e
    if(passcode.value === otp.value.toString())
        authorize()
}

const getPassCode = () => {
    if(!phone.value)
        return

    codeNotSent.value = false
    otp.value = Math.floor(Math.random() * (9999 - 1000) + 1000 )
    let phoneForOtp = phone.value
    phoneForOtp = phoneForOtp.replace(/[^a-zA-Z0-9]/g, '')
    phoneForOtp = phoneForOtp.replace('7', '8')

    if(phone.value === '+7 (000) 000-00-00') {
        otp.value = 5555
        return
    }

    myFetch(`${baseUrl}/send-otp/`, {
        method: 'POST',
        body: {
            otp: otp.value,
            phone: phoneForOtp
        }
    })
}

const authorize = async () => {
    try {
        isAuthBtnDisabled.value = true;
        loading.value = true;

        await myFetch(`/change-password/`, {
            method: 'POST',
            body: {
                "phone": phone.value,
                "password": `${otp.value}`
            }
        });

        const tokenResponse = await myFetch(`/api-token/`, {
            method: 'POST',
            body: {
                'phone': phone.value,
                "password": otp.value
            }
        });

        const { access, refresh } = tokenResponse._data as {access: string, refresh: string}

        access_token.value = access;
        is_auth.value = true;
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('is_auth', 'true');

        const userInfoResponse = await myFetch(`/user-info/`);
        user_info.value = userInfoResponse._data as IUserInfo
        localStorage.setItem('user', JSON.stringify(user_info.value));

        const fcmToken = localStorage.getItem('fcmToken');
        if (fcmToken) {
            await myFetch(`/change-fcm-token/`, {
                method: 'POST',
                body: {
                    phone: phone.value,
                    fcmToken
                }
            });
        }

        // Navigate to the profile page
        navigateTo('/profile');
    } catch (error) {
        addNotify('Ошибка во время авторизации');
        console.log(error)
        isAuthBtnDisabled.value = false;
        loading.value = false;
    }
};

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
