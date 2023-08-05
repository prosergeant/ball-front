<template>
    <div class="card-wrapper">
        <img src="/cover.png" alt=""/>
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
        <div v-if="data?.paid && !data?.is_ended" class="cancel" @click.stop="CancelModal(true)">
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
                    <p @click="CancelModal(false)">Не отменять бронь</p>
                </div>
            </div>
        </ModalBottom>
    </div>
</template>

<script setup lang="ts">
import ModalBottom from "~/components/UI/ModalBottom.vue";

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
const disableParentScroll = (e: Event) => {
    e.preventDefault();
}
const CancelModal = (modalIs: boolean) => {
    const body = document.body
    if(modalIs) {
        body.addEventListener('wheel', disableParentScroll, {passive: false})
        isCancelModal.value = true
    } else {
        body.removeEventListener('wheel', disableParentScroll)
        isCancelModal.value = false
    }
}
const cancel = () => {
    myFetch(`/requests/${props.data.id}/`, {
        method: 'PATCH',
        body: {
            paid: false
        }
    })
        .then(res => {
            console.log(res)
            props.data.paid = false
        })
        .finally(() => {
            CancelModal(false)
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

.cancel-modal-wrapper {
    backdrop-filter: blur(15px);
    display: flex;
    align-items: center;

    .cancel-modal {
        border-radius: 24px;
        background: $black1;
        backdrop-filter: blur(20px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        width: 300px;
        top: calc(50% - 125px);
        left: calc(50% - 150px);
        padding: 30px 15px;

        hr {
            border: none;
            border-top: 1px solid #333;
            width: 100%;

            &.green-hr {
                border-top: 3px solid $green1;
                position: absolute;
                top: 0;
                width: 100px;
            }
        }
        h3 {
            color: white;
            text-align: center;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        span {
            color: #AFAFAF;
            text-align: center;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
        p {
            color: $green1;
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            cursor: pointer;

            &.green-bg {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 38px;
                padding: 15px 16px;
                border-radius: 10px;
                background: $green1;
                color: #111518;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }
        }
    }
}
</style>
