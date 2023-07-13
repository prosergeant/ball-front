<template>
    <template v-if="is_auth">
        <div style="padding: 0 28px">
            <UINavigation title="Мои игры" go-to="/" />

            <div class="my-games">
                <h3>Доступные поля</h3>

                <CardStandardInfo v-for="i in requests" :key="i.id" :data="i.field_type.field" />
            </div>
        </div>
    </template>
    <template v-else>
        <div class="auth-wrapper">
            <div class="auth">
                <h3>Авторизация</h3>
                <UIInput v-model="login" label="Номер" type="tel" />
                <UIInput v-model="password" label="Пароль" type="password" />
                <UIButton icon="arrow-right" color="black" @click="authorize">Войти</UIButton>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";

const {is_auth, user_info} = storeToRefs(authStore())
const router = useRouter()

const requests = ref<IField[]>([])

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
            const keys = {...res.data.value}

            const access = useCookie('access')
            access.value = keys.access
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
                    userCookie.value = JSON.stringify(user_info.value)

                    is_auth.value = true
                    router.go(0)
                })
        })
}

// const test = useCookie('is_auth')
// test.value = 'true'

onMounted(() => {
    setTimeout(() => {
        if(is_auth.value) {
            useFetch(`${baseUrl}/requests/?user=${user_info.value?.id}`)
                .then(res => {
                    requests.value = res.data.value as IField[]
                })
        }
    }, 0)
})

//sdelat filter po useru
</script>

<style scoped lang="scss">
.my-games {
    margin-top: 52px;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 38px;

    h3 {
        color: white;
        font-size: 18px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;

    }
}

.auth-wrapper {
    padding: 28px;
    display: flex;
    align-items: center;

    .auth {
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 16px 12px 20px 12px;

        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.20);

        background: #3A3A3A;
        backdrop-filter: blur(20px);

        h3 {
            color: white;
        }

        button {
            width: 100%;

        }
    }
}
</style>