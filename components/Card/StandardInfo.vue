<template>
    <div class="card-wrapper">
        <img src="/cover.png" alt="" />
        <span
            v-if="data?.is_ended !== undefined"
            class="is_ended"
            :class="{ended: data?.is_ended || !data?.paid, active: data?.is_ended === false || data?.paid}"
        >
            {{ data?.is_ended || !data?.paid ? 'Завершена' : 'Активна' }}
        </span>

        <div class="inner-card">
            <h3>{{ data.name }}</h3>
            <p>{{ data.text }}</p>
            <hr />

            <div class="playtime-info">
                <div class="playtime-info-block">
                    <UIIcon icon="clock" color="green1" />
                    <div>
                        <p>Время игры:</p>
                        <span>{{ data.time_start }}-{{ data.time_end }}</span>
                    </div>
                </div>

                <div class="playtime-info-block">
                    <UIIcon icon="calendar" color="green1" />
                    <div>
                        <p>Дата игры:</p>
                        <span>{{ getDateFromDateTime(data?.date) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="data?.paid && !data?.is_ended" class="cancel" @click.stop="isCancelModal = true">
            <p>Отменить запись</p>
        </div>

        <ModalBottom v-if="isCancelModal">
            <div class="cancel-modal-wrapper">
                <div class="cancel-modal">
                    <hr class="green-hr" />
                    <h3>Вы уверены что хотите отменить бронь?</h3>
                    <hr />
                    <span>Отменяя бронь вы рискуете упустить поле и его забронирует другая команда</span>
                    <p class="green-bg" @click="cancel">Да, отменить бронь</p>
                    <p @click="isCancelModal = false">Не отменять бронь</p>
                </div>
            </div>
        </ModalBottom>
    </div>
</template>

<script setup lang="ts">
import ModalBottom from "~/components/UI/ModalBottom.vue";
import {useNotifyStore} from "~/store/useNotify";
import {getCurrDate} from "~/composables/getCurrDate";

const {addNotify} = useNotifyStore()

const props = defineProps<{
    data: {
        id: number
        name: string
        text: string
        time_start: string
        time_end: string
        date: string
        is_ended: boolean
        paid: boolean
    }
}>()

const isCancelModal = ref(false)
const cancel = () => {
    myFetch(`/requests/${props.data.id}/`, {
        method: 'PATCH',
        body: {
            paid: false,
            cancel_time: getCurrDate()
        }
    })
        .then(res => {
            console.log(res)
            props.data.paid = false
        })
        .catch(err => {
            console.log(err?._data?.detail)
            addNotify('Ошибка при отмене брони')
        })
        .finally(() => {
            isCancelModal.value = false
        })
}
</script>

<style scoped lang="scss">
.card-wrapper {
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    background: #3A3A3A;
    backdrop-filter: blur(20px);
    padding: 12px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    position: relative;
    span.is_ended {
        position: absolute;
        top: calc(169px - 18px - 16px);
        left: 17px;

        border-radius: 28px;
        backdrop-filter: blur(20px);
        padding: 10px 19px;

        color: $black1;
        font-size: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        &.active {
            background: $green1;
        }
        &.ended {
            background: red;
        }
    }

    img {
        width: 100%;
        min-height: 169px;
        max-height: 169px;
    }

    .inner-card {
        padding: 19px 15px;
        background: black;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        gap: 7px;
        color: white;

        h3 {
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        p {
            color: #AFAFAF;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            margin-bottom: 13px;
        }

        hr {
            border: 1px solid black;
            border-top: 1px solid #333;
        }
    }

    .cancel {
        display: flex;
        width: 100%;
        height: 37px;
        padding: 8px 20px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: 32px;
        border: 2px solid $green1;
        background: #FFF;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
        cursor: pointer;
        p {
            color: $black2;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 13px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
}
</style>
