<template>
    <div class="mini-navigation-block">
        <div class="mini-navigation" @click="$router.push(`/object/${$route?.params?.id}/`)">
            <UIIcon icon="chevron-left" color="white" />
            <p>Выберите параметры</p>
        </div>
        <UIIcon icon="search" color="white" />
    </div>
    <template v-if="step === 0">
        <div class="step-1">
            <div class="header">
                <h4>Kifs на Шевченко игра в футболл</h4>
                <p>Поле «Uzbekistan на Аль-Фараби»</p>
            </div>

            <div class="select-card type-card"> <!-- @click="modalType = true" -->
                <span>Выберите тип поля:</span>
                <div
                    class="card type-card"
                    v-for="cardType in fields"
                    :key="cardType.id"
                    :class="{active: cardType.id === selectedFieldType}"
                    @click="selectedFieldType = cardType.id"
                >
                    <img src="/icons/booking-card-square.svg" alt="" />

                    <div class="card-infos">
                        <h3>{{ cardType.name }}</h3>
                        <p>нужно выбрать крытое или открытое поле</p>
                    </div>
                    <UIIcon icon="chevron-right" />
                </div>
            </div>

            <div class="select-card" @click="modalTime = true">
                <span>Выберите дату и время:</span>
                <div class="card">
                    <img src="/icons/booking-card-square.svg" alt="" />

                    <div class="card-infos">
                        <h3>не выбрана дата и время</h3>
                        <p>выберите дату и время в календаре</p>
                    </div>
                    <UIIcon icon="chevron-right" />
                </div>
            </div>

            <UIButton>Продолжить бронирование</UIButton>

            <UIModalBottom v-if="modalTime">
                <div class="modal-time-fixed" v-click-outside="() => {(modalTime) && (modalTime = false)}">
                    <div class="modal-time">
                        <DateTime v-model="dateTime" />
                    </div>
                </div>
            </UIModalBottom>

            <UIModalBottom v-if="modalType">
                <div class="modal-time-fixed" v-click-outside="() => {(modalType) && (modalType = false)}">
                    <div class="modal-time">
                        pupa
                    </div>
                </div>
            </UIModalBottom>
        </div>
    </template>
</template>

<script setup lang="ts">
const step = ref(0)
const modalTime = ref(false)
const modalType = ref(false)
const dateTime = ref({
    date: null, //10,
    time: null //'10:00'
})

const selectedFieldType = ref<number | null>(null)
const fields = ref([
    {
        id: 1,
        name: 'крытое поле'
    },
    {
        id: 2,
        name: 'открытое поле:'
    },
    {
        id: 3,
        name: 'открытое поле: 2'
    },

])
</script>

<style scoped lang="scss">
.mini-navigation-block {
    display: flex;
    align-items: center;
    gap: 20px;

    i {
        width: 22px;
        height: 22px;
    }

    .mini-navigation {
        height: 40px;
        width: 335px;
        padding: 10px 25px;
        display: flex;
        align-items: center;
        gap: 20px;

        i {
            width: 11px;
            height: 12px;
        }

        p {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            color: $light;
        }
    }
}

.step-1 {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 5px 25px 35px 25px;
    background: $light;
    margin-top: 20px;
    min-height: calc(100dvh - 40px);
    width: 100%;
    max-width: 420px;

    &::before {
        position: absolute;
        content: '';
        background: $light;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        top: -19px;
        left: 0;
        height: 20px;
        width: 100%;
    }

    .header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        h4 {
            font-size: 16px;
            font-weight: 700;
        }
        P {
            color: #565656;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    .select-card {
        display: flex;
        flex-direction: column;
        gap: 13px;
        cursor: pointer;

        &.type-card {
            padding-left: 20px;
        }

        span {
            color: $light3;

            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .card {
            background: white;
            border-radius: 10px;
            padding: 15px;

            display: flex;
            align-items: center;
            gap: 16px;

            .card-infos {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            &.type-card {
                position: relative;

                &.active {
                    &::before {
                        background: $green-1;
                    }
                }

                &::before {
                    position: absolute;
                    content: '';
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid $blue-500;
                    left: -35px;
                    top: calc(50% - 14px);


                }
            }
        }
    }

    .btn {
        width: 100%;
        padding: 15px 8px;
        margin-top: auto;
    }
}

.modal-time-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 420px;;

    &::before {
        overflow-y: unset;
        position: absolute;
        content: '';
        background: white;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        top: -19px;
        left: 0;
        height: 20px;
        width: 100%;
    }

    .modal-time {
        width: 100%;
        max-width: 420px;
        min-height: 452px;
        max-height: calc(100dvh - 40px);
        overflow-y: auto;
        margin-top: auto;
        background: white;
        position: relative;
        padding: 20px;

        display: flex;
        flex-direction: column;



        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: calc(50% - 40px);
            width: 80px;
            height: 3px;
            border-radius: 30px;
            background: $light3;
        }
    }
}
</style>
