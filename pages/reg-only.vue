<template>
    <div>
        <div class="ellipse" />
        <UINavigation title="Зарегистрироваться" go-to="/auth/" :padding-x="24" />

        <div class="auth-wrapper">
            <div class="auth">
                <template v-if="codeNotSent">
                    <h3>Зарегистрироваться:</h3>
                    <UIInput label="Имя:" v-model="name" />
                    <UIInput type="tel" label="Номер телефона:" v-model="phone" />
                    <UIButton icon="arrow-right" color="black" @click.stop="getPassCode">Продолжить</UIButton>
                </template>
                <template v-else>
                    <div class="auth-passcode">
                        <UIPasscode @get-value="(e) => {passcode = e}" />
                        <UIButton :disabled="passcode !== `${otp}`" icon="arrow-right" icon-color="black" @click.stop="authorize">Войти</UIButton>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useNotifyStore} from "~/store/useNotify";

const {is_auth, user_info, access_token} = storeToRefs(authStore())
const {addNotify} = useNotifyStore()

const codeNotSent = ref(true)
const passcode = ref('')
const phone = ref('')
const name = ref('')
const otp = ref(1111) //Math.floor(Math.random() * (9999 - 1000) + 1000 ))

const getPassCode = async () => {
    if(!name.value || !phone.value)
        return

    try {
        await myFetch(`/find-user/`, {
            method: 'POST',
            body: {phone: phone.value}
        })

        codeNotSent.value = false
        otp.value = Math.floor(Math.random() * (9999 - 1000) + 1000 )
        let phoneForOtp = phone.value
        phoneForOtp = phoneForOtp.replace(/[^a-zA-Z0-9]/g, '')
        phoneForOtp = phoneForOtp.replace('7', '8')

        await myFetch(`${baseUrl}/send-otp/`, {
            method: 'POST',
            body: {
                otp: otp.value,
                phone: phoneForOtp
            }
        })

    } catch (e: any) {
        if(e?.status === 400)
            addNotify('Такой пользователь уже существует')
        else
            addNotify('Ошибки при создании пользователя')
    }
}

const authorize = () => {
    myFetch(`/users/`, {
        method: 'POST',
        body: {
            "phone": phone.value,
            "name": name.value,
            "password": `${otp.value}`
        }
    })
        .then(() => {
            myFetch(`/api-token/`, {
                method: 'POST',
                body: {
                    'phone': phone.value,
                    "password": otp.value
                }
            })
                .then((res) => {
                    // if (res?.error?.value?.statusCode === 401) {
                    //     console.log('user does not exist')
                    //     return
                    // }

                    const keys = res._data as {access: string, refresh: string}

                    access_token.value = keys.access
                    localStorage.setItem('access', access_token.value)
                    localStorage.setItem('refresh', keys.refresh)
                    localStorage.setItem('is_auth', 'true')

                    myFetch(`/user-info/`)
                        .then((res) => {
                            user_info.value = res._data as typeof user_info.value
                            localStorage.setItem('user', JSON.stringify(user_info.value))

                            is_auth.value = true
                            navigateTo('/profile')
                        })
                })
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
