<template>
    <div style="padding: 0 28px 120px 28px">
        <UINavigation title="Мои игры" go-to="/" />

        <div class="my-games">
            <h3>Доступные поля</h3>

            <CardStandardInfo v-for="i in requests" :key="i.id" :data="convertData(i)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";

const {is_auth, user_info, access_token} = storeToRefs(authStore())
const {logout} = authStore()

const router = useRouter()
const requests = ref<IField[]>([])

// todo: добавить интерцепторы и вообще сделать кастомный фетч с базовым урлом
const getData = () => {
    return useFetch(`${baseUrl}/requests/?user=${user_info.value?.id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token.value || useCookie('access').value}`
        }
    })
}

const convertData = (data: any) => ({
    name: data?.field_type?.field?.name,
    text: data?.field_type?.field?.text,
    time_start: data?.time,
    time_end: getTimeWithDuration(data?.time, data?.duration),
    date: data?.date,
    is_ended: data?.is_ended
})

onMounted(() => {
    setTimeout(() => {
        if(is_auth.value && user_info.value?.id) {
            getData()
                .then(res => {
                    if(res?.error?.value?.statusCode === 401) {
                        useFetch(`${baseUrl}/api-token-refresh/`, {
                            method: 'POST',
                            body: {
                                refresh: localStorage.getItem('refresh')
                            }
                        })
                            .then(res => {
                                if(res?.error?.value?.statusCode === 401
                                    || res?.error?.value?.statusCode === 400) {
                                    logout()
                                    router.go(0)
                                    return
                                }
                                // const access = useCookie('access')
                                // access.value = res.data.value?.access
                                // access_token.value = access.value || ''
                                access_token.value = res.data.value?.access
                                localStorage.setItem('access', access_token.value)
                                getData().then(res => requests.value = res.data.value as IField[])
                            })
                    }
                    requests.value = res.data.value as IField[]
                })
        } else {
            navigateTo('/auth/')
        }
    }, 0)
})
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
</style>