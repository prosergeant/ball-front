<template>
    <div class="ellipse" />
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
                <h4>Kifs на Шевченко игра</h4>
                <p>Поле «UZB на Аль-Фараби» —  левое поле крытое летнее/зимнее включительно»</p>
            </div>

            <div class="select-card" @click="modalType = true">
                <span>Выберите тип поля:</span>
                <div class="card">
                    <span class="circle" />

                    <div class="card-infos">
                        <h3>не выбран тип поля</h3>
                        <p>выбрать тип поля</p>
                    </div>
                    <UIIcon icon="chevron-right" color="green1" />
                </div>
            </div>

            <div class="select-card" @click="modalTime = true">
                <span>Выберите дату и время:</span>
                <div class="card">
                    <span class="circle" />

                    <div class="card-infos">
                        <template v-if="dateTime.date === null || dateTime.time === null">
                            <h3>не выбрана дата и время</h3>
                            <p>выберите дату и время в календаре</p>
                        </template>
                       <template v-else>
                           <h3 class="filled">{{ dateTime.date }} {{ getMontes[new Date().getMonth()] }} {{ dateTime.time}}</h3>
                       </template>
                    </div>
                    <UIIcon icon="chevron-right" color="green1" />
                </div>
            </div>

            <UIButton icon="arrow-right" icon-color="black" @click="step = 1">Продолжить бронирование</UIButton>

            <UIModalBottom v-if="modalTime">
                <div class="modal-body-fixed" v-click-outside="() => {(modalTime) && (modalTime = false)}">
                    <div class="modal-body">
                        <hr />
                        <DateTime v-model="dateTime" />
                    </div>
                </div>
            </UIModalBottom>

            <UIModalBottom v-if="modalType">
                <div class="modal-body-fixed" v-click-outside="() => {(modalType) && (modalType = false)}">
                    <div class="modal-type-body">
                        <hr />
                        <UIAccordion title="Крытое поле">
                            <div class="d-column">
                                <div class="type-card" @click="testpupa = !testpupa">
                                    <UICheckboxView :value="testpupa" />
                                    <div>
                                        <p>Аренда на 1 час</p>
                                        <span>Любое примечание</span>
                                    </div>
                                </div>

                                <div class="type-card">
                                    <UICheckboxView :value="testpupa" />
                                    <div>
                                        <p>Аренда на 2 часа</p>
                                        <span>Любое примечание</span>
                                    </div>
                                </div>
                            </div>
                        </UIAccordion>
                    </div>
                </div>
            </UIModalBottom>
        </div>
    </template>
    <template v-if="step === 1">
        <div class="step-1">
            <div class="header">
                <h4>Kifs на Шевченко игра</h4>
                <p>Поле «UZB на Аль-Фараби» —  левое поле крытое летнее/зимнее включительно»</p>
            </div>

            <div class="playtime-info-wrapper">
                <div class="playtime-info">
                    <div class="playtime-info-block">
                        <UIIcon icon="clock" color="green1" />
                        <div>
                            <p>Время игры:</p>
                            <span>19:00-21:00</span>
                        </div>
                    </div>

                    <div class="playtime-info-block">
                        <UIIcon icon="calendar" color="green1" />
                        <div>
                            <p>Дата игры:</p>
                            <span>4 января 2023</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="price">
                <p>Сумма к оплате:</p>
                <span>12 699 ₸</span>
            </div>

            <div class="important-info">
                <p class="red">Важная информация:</p>

                <div class="cases">
                    <div
                        v-for="_case in cases"
                        :key="_case.id"
                        class="case"
                    >
                        <UIIcon :icon="_case.icon" color="white" />
                        <p>{{ _case.name }}</p>
                    </div>
                </div>
            </div>

            <UIButton style="margin-top: unset" icon="arrow-right" icon-color="black" @click="step = 2">Продолжить бронирование</UIButton>
        </div>
    </template>

    <template v-if="step === 2">
        <div class="step-1">
            <div class="header">
                <h4>Контактная информация:</h4>
            </div>

            <UIInput v-model="login" label="Ваше имя:" />
            <UIInput v-model="phone" label="Номер телефона:" type="tel" />

            <UIButton icon="arrow-right" icon-color="black" @click="step = 3">Продолжить бронирование</UIButton>
        </div>
    </template>

    <template v-if="step === 3">
        <div class="step-1">
            <div class="header">
                <h4>Введите код подтверждения</h4>
                <p>Мы отправили код подтверждения на номер + 7 ... .. {{phone.slice(-2)}}</p>
            </div>

            <div class="pass-code">
                <div class="pass-code-digit" v-for="i in passcode" :key="i">
                    <input placeholder="0" :value="passcode[i]" maxlength="1" type="tel" inputmode="tel" />
<!--                    <p :class="{inactive: i === 0}">{{ i }}</p>-->
                </div>
            </div>

            <p style="text-align: center; color: #B9FD02; margin-top: auto">Выслать код еще раз</p>
            <UIButton style="margin-top: unset" icon="arrow-right" icon-color="black" @click="step = 4">Продолжить бронирование</UIButton>
        </div>
    </template>

    <template v-if="step === 4">
        <div class="step-1">
            <div class="header">
                <h4>Эквайринг</h4>
            </div>
            <UIButton icon="arrow-right" icon-color="black" @click="step = 5">Продолжить бронирование</UIButton>
        </div>
    </template>

    <template v-if="step === 5">
        <div class="step-1">
            <div class="accepted">
                <UIIcon icon="arrow-accept" color="black" />
            </div>
            <div class="header">
                <h4 style="text-align: center">Оплачено!</h4>
                <p style="text-align: center">Спасибо! Ваша бронь активна, вы сможете посмотреть данные о ней во вкладке “мои игры”</p>
            </div>

            <div class="playtime-info-wrapper">
                <div class="playtime-info">
                    <div class="playtime-info-block">
                        <UIIcon icon="clock" color="green1" />
                        <div>
                            <p>Время игры:</p>
                            <span>19:00-21:00</span>
                        </div>
                    </div>

                    <div class="playtime-info-block">
                        <UIIcon icon="calendar" color="green1" />
                        <div>
                            <p>Дата игры:</p>
                            <span>4 января 2023</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="price">
                <p>Крытое поле (3 часа):</p>
                <span>12 699 ₸</span>
            </div>

            <div class="icon-group">
                <div>
                    <div class="icon-holder">
                        <UIIcon icon="map-pin" color="black" />
                    </div>
                    <h3>2 GIS</h3>
                    <p>Посмотреть на карте</p>
                </div>

                <div>
                    <div class="icon-holder">
                        <UIIcon icon="calendar" color="black" />
                    </div>
                    <h3>В календарь</h3>
                    <p>Добавить в Google-календарь</p>
                </div>

                <div>
                    <div class="icon-holder">
                        <UIIcon icon="export" color="black" />
                    </div>
                    <h3>Поделиться</h3>
                    <p>Поделиться с друзьями</p>
                </div>
            </div>

            <UIButton class="btn back-to-main" @click="$router.push('/')">Перейти на главную</UIButton>
            <UIButton class="btn back-to-games" @click="$router.push('/')">Перейти в мои игры</UIButton>
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
        name: 'крытое поле',

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

const cases = ref([
    {
        id: 1,
        icon: 'clock',
        name: 'Приходить заранее за 15 часов.'
    },
    {
        id: 2,
        icon: 'ball',
        name: 'Предоставляется мяч/не предоставляется'
    },
    {
        id: 3,
        icon: 'trash',
        name: 'Не мусорить в раздевалке и тд'
    }
])

const testpupa = ref(true)

const login = ref('')
const phone = ref('')

const passcode = ref([,,,,])
</script>

<style scoped lang="scss">
.mini-navigation-block {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;

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
    padding: 28px 30px;
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(20px);    margin-top: 40px;
    border-radius: 28px;
    min-height: calc(100dvh - 40px);
    //width: 410px;

    .header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        h4 {
            color: white;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        P {
            color: #AFAFAF;
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

        span {
            color: white;

            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        .card {
            border-radius: 22px;
            background: $black2;
            backdrop-filter: blur(20px);

            padding: 13px 14px;

            display: flex;
            align-items: center;
            gap: 16px;

            i {
                width: 18px;
                height: 18px;
            }

            .circle {
                background: $green1;
                min-width: 42px;
                min-height: 42px;
                border-radius: 50%;
            }

            .card-infos {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-right: auto;

                h3 {
                    color: white;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
                p {
                    color: white;
                    font-size: 11px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }

                .filled {
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
            }
        }
    }

    .btn {
        width: 100%;
        padding: 15px 18px;
        margin-top: auto;
        color: black;
        font-weight: 600;
        background: $green1;

        &.back-to-main, &.back-to-games {
            margin-top: unset;
            justify-content: center;
        }

        &.back-to-games {
            background: transparent;
            color: $green1;
        }
    }
}

.playtime-info-wrapper {
    border-radius: 24px;
    background: var(--black-1, #040404);
    backdrop-filter: blur(20px);
    padding: 22px 26px;

    .playtime-info {
        &-block {
            span {
                color: white;
            }
        }
    }
}

.price {
    display: flex;
    justify-content: space-between;
    p {
        color: white;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    span {
        color: $green1;
        text-align: right;
        font-size: 18px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
    }
}

.important-info {
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-top: auto;

    p {
        color: white;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 127.336%;
    }

    .cases {
        border-radius: 24px;
        border: 1px solid #FD4D02;
        background: #040404;
        backdrop-filter: blur(20px);
        padding: 20px 23px;
        display: flex;
        flex-direction: column;
        gap: 11px;

        .case {
            display: flex;
            align-items: flex-end;
            gap: 10px;
        }
    }

    .red {
        color: #FD4D02;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
    }
}

.accepted {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.pass-code {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    &-digit {
        border-radius: 22px;
        background: $black2;
        padding: 18px;

        input {
            width: 36px;
            background: $black2;
            border: none;
            outline: none;
            text-align: center;
            font-size: 46px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            color: $green1;

            &.inactive {
                color: #5E5E5E;
            }
        }
    }
}

.icon-group {
    display: flex;
    gap: 24px;
    margin-top: auto;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 11px;

        .icon-holder {
            border-radius: 10px;
            background: $green1;
            padding: 7.5px;
            width: fit-content;
            margin: 0 auto;
        }

        h3 {
            color: white;
            text-align: center;
            font-size: 15px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
        }

        p {
            color: #AFAFAF;
            text-align: center;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}

.modal-body-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 420px;

    hr {
        width: 100px;
        margin: 0 auto 35px auto;

        border: 1px solid black;
        border-top: 3px solid $green1;
        filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.75));
    }

    .modal-body {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        width: 100%;
        min-height: 452px;
        max-height: calc(100dvh - 40px);
        overflow-y: auto;
        margin-top: auto;
        background: black;
        position: relative;
        padding: 22px;

        display: flex;
        flex-direction: column;


    }

    .modal-type-body {
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        width: 100%;
        min-height: 452px;
        max-height: calc(100dvh - 40px);
        overflow-y: auto;
        margin-top: auto;
        background: #3A3A3A;
        position: relative;
        padding: 28px;

        display: flex;
        flex-direction: column;

        .type-card {
            border-radius: 22px;
            background: $black2;
            backdrop-filter: blur(20px);
            padding: 22px 25px;
            display: flex;
            align-items: center;
            gap: 20px;

            & > div {
                p {
                    color: white;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
                span {
                    color: white;
                    font-size: 11px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }
            }
        }
    }
}
</style>
