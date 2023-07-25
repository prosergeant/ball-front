<template>
    <div style="padding: 0 28px 120px 28px">
        <UINavigation title="Мои игры" go-to="/" :padding-x="28" />

        <div class="my-games">
            <h3>Доступные поля</h3>

            <CardStandardInfo
                v-for="i in requests"
                :key="i.id" :data="convertData(i)"
                @click="navigateTo(`/object/${i?.field_type?.field?.id}/`)"
            />
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
    return useFetch(`/requests/?user=${user_info.value?.id}`)
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