<template>
    <div class="step-1">
        <div class="header">
            <h4>Контактная информация:</h4>
        </div>

        <UIInput v-model="inputs.login" label="Ваше имя:" />
        <UIInput v-model="inputs.phone" label="Номер телефона:" type="tel" />

        <div style="color: white; text-align: center;">
            <h3>Уже есть аккаунт?</h3>
            <p style="margin-bottom: 10px">Если у вас уже есть аккаунт перейдите на страницу авторизации</p>
            <UIButton class="btn-green-demi-outline" @click.stop="isNeedAuth = !isNeedAuth">Авторизоваться</UIButton>
        </div>

        <UIButton :disabled="!login || !phone" icon="arrow-right" icon-color="black" @click="checkAccount(phone, step)">
            Продолжить бронирование
        </UIButton>

        <UIModalBottom v-if="isNeedAuth">
            <div class="modal-body-fixed">
                <UIAuth
                    no-redirect
                    no-reg
                    @status="modalStatus"
                    @onOutside="() => {isNeedAuth = false}"
                />
            </div>
        </UIModalBottom>
    </div>
</template>

<script setup lang="ts">
import {checkAccount} from "~/pages/object/[id]/misc";

const props = defineProps<{
    login: string
    phone: string
    step: number
}>()

const emit = defineEmits<{
    (e: 'update:login', value: string): void
    (e: 'update:phone', value: string): void
    (e: 'update:step', value: number): void
}>()

const isNeedAuth = ref(false)
const inputs = ref({
    login: props.login || '',
    phone: props.phone || ''
})

const modalStatus = (e: boolean) => {
    if(e)
        emit('update:step', 4)
    isNeedAuth.value = false
}

watch(() => inputs.value.login, (v) => {
    emit('update:login', v)
})

watch(() => inputs.value.phone, (v) => {
    emit('update:phone', v)
})
</script>
