<template>
    <div>
<!--        <div class="ellipse"/>-->
        <div v-if="step < 4" class="mini-navigation-block">
            <div class="mini-navigation" @click="navigationHandler">
                <UIIcon icon="chevron-left" color="white" />
                <p>Выберите параметры</p>
            </div>
            <UIIcon icon="search" color="white" />
        </div>
        <div style="padding: 0 10px">
            <template v-if="step === 0">
                <div class="step-1">
                    <div class="header">
                        <h4>{{ data.name }}</h4>
                        <p>{{ data.text }}</p>
                    </div>

                    <template
                        v-for="fieldtype in fields"
                        :key="fieldtype.id"
                    >
                        <div
                            class="field-type-card"
                            @click="setFieldType(fieldtype.id, fieldtype.hours)"
                        >
<!--                            v-for="hour in fieldtype.hours" :key="hour"-->

                            <div class="field-checkbox" :class="{active: !!selectedFieldType?.value && selectedFieldType.id === fieldtype.id}" />
                            <div class="field-info">
                                <p>{{ fieldtype.title }}</p>
                                <span>1 час - {{fieldtype.coast}}</span>
                            </div>
                            <img :class="{active: !!selectedFieldType?.value && selectedFieldType.id === fieldtype.id}" src="/cover.png" alt="field-img" />
                        </div>
                    </template>

                    <UISelect
                        :items="Array.from(Array(selectedFieldType?.max_hours).keys()).map(el => ({name: `${el+1} час`, value: el+1} as ISelect))"
                        :value="selectedFieldType.duration"
                        @selected-item="(e) => {selectedFieldType.duration = e.value as number}"
                    />

                    <div class="select-card" @click.stop="(!!selectedFieldType?.value) && (modalTime = !modalTime)">
                        <span>Выберите дату и время:</span>
                        <div class="card">
                            <span class="circle" :class="{checked: dateTime.date && dateTime.time, disabled: !selectedFieldType?.value}"/>

                            <div class="card-infos">
                                <template v-if="!dateTime.date || !dateTime.time">
                                    <h3>не выбрана дата и время</h3>
                                    <p>выберите дату и время в календаре</p>
                                </template>
                                <template v-else>
                                    <h3 class="filled">{{ dateTime.date.split('.')?.[0] }} {{ getMontes[new Date().getMonth()] }} {{ dateTime.time}}</h3>
                                </template>
                            </div>
                            <UIIcon icon="chevron-right" color="green1" />
                        </div>
                    </div>

                    <UIButton :disabled="!dateTime.date || !dateTime.time" icon="arrow-right" icon-color="black" @click="step = 1">{{ !dateTime.date || !dateTime.time ? 'Продолжить бронирование' : `Забронировать за ${resFieldType?.coast * selectedFieldType.duration} ₸` }}</UIButton>

                    <UIModalBottom v-if="modalTime" @close-modal="modalTime = false">
                        <div class="modal-body-fixed">
                            <div class="modal-body"> <!-- v-on-click-outside.bubble="() => {modalTime = false}" -->
                                <hr />
                                <DateTime v-model="dateTime" :duration="selectedFieldType?.duration" :fieldtype="selectedFieldType?.id" :startFrom="selectedFieldType?.startFrom" :endTo="selectedFieldType?.endTo" @closeModal="() => {modalTime = false}" />
                            </div>
                        </div>
                    </UIModalBottom>
                </div>
            </template>
            <template v-if="step === 1">
                <div class="step-1">
                    <div class="header">
                        <h4>{{ data.name }}</h4>
                        <p>{{ data.text }}</p>
                    </div>

                    <div class="playtime-info-wrapper">
                        <div class="playtime-info">
                            <div class="playtime-info-block">
                                <UIIcon icon="clock" color="green1" />
                                <div>
                                    <p>Время игры:</p>
                                    <span>{{ dateTime.time }}-{{ getTimeWithDuration(dateTime.time, selectedFieldType.duration) }}</span>
                                </div>
                            </div>

                            <div class="playtime-info-block">
                                <UIIcon icon="calendar" color="green1" />
                                <div>
                                    <p>Дата игры:</p>
                                    <span>{{ getDateFromDateTime(dateTime.date) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="price">
                        <p>Сумма к оплате:</p>
                        <span>{{ resFieldType?.coast * selectedFieldType.duration }} ₸</span>
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

                    <UIButton style="margin-top: unset" icon="arrow-right" icon-color="black" @click="step = 2">
                        Продолжить бронирование
                    </UIButton>
                </div>
            </template>
            <template v-if="step === 2">
                <div class="step-1">
                    <div class="header">
                        <h4>Контактная информация:</h4>
                    </div>

                    <UIInput v-model="login" label="Ваше имя:" />
                    <UIInput v-model="phone" label="Номер телефона:" type="tel" />

                    <div style="color: white; text-align: center;">
                        <h3>Уже есть аккаунт?</h3>
                        <p style="margin-bottom: 10px">Если у вас уже есть аккаунт перейдите на страницу авторизации</p>
                        <UIButton class="btn-green-demi-outline" @click.stop="isNeedAuth = !isNeedAuth">Авторизоваться</UIButton>
                    </div>

                    <UIButton :disabled="!login || !phone" icon="arrow-right" icon-color="black" @click="checkAccount">
                        Продолжить бронирование
                    </UIButton>
                </div>
            </template>
            <template v-if="step === 3">
                <div class="step-1">
                    <div class="header">
                        <h4>Введите код подтверждения</h4>
                        <p>Мы отправили код подтверждения на номер + 7 ... .. {{ phone.slice(-2) }}</p>
                    </div>

                    <UIPasscode @get-value="(e) => {passcode = e}" />

                    <p style="text-align: center; color: #B9FD02; margin-top: auto">Выслать код еще раз</p>
                    <UIButton
                        :disabled="passcode !== `${otp}`"
                        style="margin-top: unset"
                        icon="arrow-right"
                        icon-color="black"
                        @click="step = 4"
                    >
                        Продолжить бронирование
                    </UIButton>
                </div>
            </template>
            <template v-if="step === 4">
                <div class="step-1">
                    <div class="header">
<!--                        <h4>Эквайринг</h4>-->
                        <UIButton class="btn back-to-main" @click="navigateTo('/')">Перейти на главную</UIButton>
                    </div>
<!--                    <UIButton icon="arrow-right" icon-color="black" @click="step = 5">Продолжить бронирование</UIButton>-->
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
                                    <span>{{ dateTime.time }}-{{ getTimeWithDuration(dateTime.time, selectedFieldType.duration) }}</span>
                                </div>
                            </div>

                            <div class="playtime-info-block">
                                <UIIcon icon="calendar" color="green1" />
                                <div>
                                    <p>Дата игры:</p>
                                    <span>{{ getDateFromDateTime(dateTime.date) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="price">
                        <p> {{ resFieldType?.title }} ({{ selectedFieldType.duration }} час):</p>
                        <span>{{ resFieldType?.coast * selectedFieldType.duration }} ₸</span>
                    </div>

                    <div class="icon-group">
                        <a :href="`https://maps.yandex.kz/?ll=${selectedFieldType.lng},${selectedFieldType.lat}&z=18&pt=${selectedFieldType.lng},${selectedFieldType.lat}`" target="_blank">
                            <div class="icon-holder">
                                <UIIcon icon="map-pin" color="black" />
                            </div>
                            <h3>Yandex</h3>
                            <p>Посмотреть на карте</p>
                        </a>

                        <div>
                            <div class="icon-holder">
                                <UIIcon icon="calendar" color="black" />
                            </div>
                            <h3>В календарь</h3>
                            <add-to-calendar-button
                                name="BRONKZ game"
                                options="'Apple','Google'"
                                :location="selectedFieldType.address || ''"
                                :startDate="new Date(makeDateFromMyDate(dateTime?.date || '')).toLocaleDateString('en-CA') || '2023-01-01'"
                                :endDate="new Date(makeDateFromMyDate(dateTime?.date || '')).toLocaleDateString('en-CA') || '2023-01-01'"
                                :startTime="dateTime.time || '10:00'"
                                :endTime="getTimeWithDuration(dateTime?.time || '', selectedFieldType?.duration || 0) || '11:00'"
                                timeZone="Asia/Almaty"
                                label="Добавить в календарь"

                                trigger="click"
                                listStyle="overlay"
                                lightMode="bodyScheme"
                                :customCss="`${justURL}/css/addToCalendar.css`"
                                buttonStyle="custom"
                            />
                        </div>

                        <div @click="share">
                            <div class="icon-holder">
                                <UIIcon icon="export" color="black" />
                            </div>
                            <h3>Поделиться</h3>
                            <p>Поделиться с друзьями</p>
                        </div>
                    </div>

                    <UIButton class="btn back-to-main" @click="navigateTo('/')">Перейти на главную</UIButton>
                    <UIButton class="btn back-to-games" @click="navigateTo('/profile/my-games')">Перейти в мои игры</UIButton>
                </div>
            </template>

            <UIModalBottom v-if="isNeedAuth">
                <div class="modal-body-fixed">
                    <UIAuth
                        no-redirect
                        no-reg
                        @status="(e) => ((e) && ((step = 4) && (isNeedAuth = false))) || ((!e) && (isNeedAuth = false))"
                        @onOutside="() => {isNeedAuth = false}"
                    />
                </div>
            </UIModalBottom>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "@vue/reactivity";
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useNotifyStore} from "~/store/useNotify";
import 'add-to-calendar-button';
import {justURL} from "../../../composables/baseUrl";

const {auth} = authStore()
const {is_auth, user_info} = storeToRefs(authStore())
const {addNotify} = useNotifyStore()

const route = useRoute()
const id = route.params?.id || -1

const fields = ref((await myFetch<IFieldType[]>(`/fieldstypes/?field=${id}`))._data)
const data = ref((await myFetch(`/fields/${id}/`))._data)

const makeDateFromMyDate = (date: string) => date.split('.').reverse().join('.') + `.${new Date().getFullYear()}`

const share = async () => {
    try {
        await navigator.share({
            title: 'BRONKZ.app',
            text: 'Играть в футбол',
            url: `${window.location.host}/object/${selectedFieldType.value.field_id}/`,
        });
    } catch (err: any) {
        console.error(`${err?.name}: ${err?.message}`);
    }
}

let widget: any = null

useHead({
    script: [
        {
            src: "https://widget.cloudpayments.ru/bundles/cloudpayments.js",
            defer: true,
            onload: () => {
                // @ts-ignore
                widget = new cp.CloudPayments()
                console.log(widget)
            }
        }
    ]
})

const pay = (amount: number) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        widget.pay('auth', // или 'charge'
            { //options
                publicId: 'test_api_00000000000000000000002', //id из личного кабинета
                description: 'Оплата поля в BRONKZ.app', //назначение
                amount: amount, //сумма
                currency: 'KZT', //валюта
                // accountId: 'user@example.com', //идентификатор плательщика (необязательно)
                // invoiceId: '1234567', //номер заказа  (необязательно)
                email: 'user@example.com', //email плательщика (необязательно)
                skin: "mini", //дизайн виджета (необязательно)
                autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
                // data: {
                //     myProp: 'myProp value'
                // },
                // configuration: {
                //     common: {
                //         successRedirectUrl: "https://{ваш сайт}/success", // адреса для перенаправления
                //         failRedirectUrl: "https://{ваш сайт}/fail"        // при оплате по Tinkoff Pay
                //     }
                // },
                // payer: {
                //     firstName: 'Тест',
                //     lastName: 'Тестов',
                //     middleName: 'Тестович',
                //     birth: '1955-02-24',
                //     address: 'тестовый проезд дом тест',
                //     street: 'Lenina',
                //     city: 'MO',
                //     country: 'RU',
                //     phone: '123',
                //     postcode: '345'
                // }
            },
            {
                // @ts-ignore
                onSuccess: (options) => { // success
                    console.log('success', options)
                    step.value = 5
                    resolve(true)
                    //действие при успешной оплате
                },
                // @ts-ignore
                onFail: (reason, options) =>{ // fail
                    console.log('fail', reason, options)
                    reject(reason)
                    //действие при неуспешной оплате
                },
                // @ts-ignore
                onComplete: (paymentResult, options) => { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                    //например вызов вашей аналитики
                }
            }
        )
    })
}

const step = ref(0)
const modalTime = ref(false)
const modalType = ref(false)
const dateTime = ref({
    date: null, //10,
    time: null //'10:00'
})

type TSelectedField = {
    value?: boolean
    duration?: number
    max_hours?: number
    startFrom?: number
    endTo?: number
} & IFieldType

const selectedFieldType = ref<TSelectedField>({} as TSelectedField)
watch(() => selectedFieldType.value?.id, () => {
    dateTime.value.date = null
    dateTime.value.time = null
    selectedFieldType.value.duration = 1
}, {deep: true})
const setFieldType = (id: number, max_hours: number) => {
    const temp_field_type = fields.value?.find(el => el.id === id)
    if(!temp_field_type) return

    selectedFieldType.value.id = id
    selectedFieldType.value.value = true //selectedFieldType.value.value !== undefined ? !selectedFieldType.value.value : true
    // selectedFieldType.value.duration = duration
    selectedFieldType.value.max_hours = max_hours
    selectedFieldType.value.startFrom = parseInt(temp_field_type?.field.time_start.slice(0, 2) || '0')
    selectedFieldType.value.endTo = parseInt(temp_field_type?.field.time_end.slice(0, 2) || '0')
    selectedFieldType.value.lat = temp_field_type.lat
    selectedFieldType.value.lng = temp_field_type.lng
    selectedFieldType.value.field_id = temp_field_type.field.id
    selectedFieldType.value.address = temp_field_type.field.address
    modalType.value = false
}
const resFieldType = computed(() => {
    if (selectedFieldType.value?.value && (fields.value as any[])?.length) {
        return (fields.value as any[]).find(el => el?.id === selectedFieldType.value?.id)
    }

    return null
})

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

const isNeedAuth = ref(false)
const login = ref('')
const phone = ref('')
const passcode = ref('')
const otp = ref(Math.floor(Math.random() * (9999 - 1000) + 1000 ))

const checkAccount = () => {
    myFetch(`/find-user/`, {
        method: 'POST',
        body: {
            phone: phone.value
        }
    })
        .then((res) => {
            step.value = 3
        })
        .catch(() => {
            addNotify('Такой пользователь уже существует')
        })
}

const navigationHandler = () => {
    if (step.value === 0)
        navigateTo(`/object/${route?.params?.id}/`)
    else {
        if (!is_auth.value)
            step.value--
        else if (is_auth.value) {
            if (step.value === 4)
                step.value = 1
            else
                step.value--
        }
    }
}

const boockErrorHandler = (err: any, errorNum: number, req_id?: number) => {
    addNotify(`Ошибка при создании заявки #${errorNum}`)
    console.log(err?.data?.detail)
    if(req_id)
        myFetch(`/requests/${req_id}/`, {method: 'DELETE'})
}

watch(() => step.value, (v) => {
    if (v === 2 && is_auth.value) {
        step.value = 4
    }
    if (v === 3) {
        let phoneForOtp = phone.value
        phoneForOtp = phoneForOtp.replace(/[^a-zA-Z0-9]/g, '')
        phoneForOtp = phoneForOtp.replace('7', '8')

        myFetch(`${baseUrl}/send-otp/`, {
            method: 'POST',
            body: {
                otp: otp.value,
                phone: phoneForOtp
            }
        })
    }

    if (v === 4) {
        // todo: сделать тут лоадер
        if (is_auth.value) {
            myFetch(`/requests/`, {
                method: "POST",
                body: {
                    "date": dateTime.value.date,
                    "time": dateTime.value.time,
                    "field_type": selectedFieldType.value.id,
                    "duration": selectedFieldType.value.duration,
                    "user": user_info.value?.id,
                    "paid": false,
                    "book": true
                }
            })
                .then(res => {
                    pay(resFieldType.value?.coast * (selectedFieldType.value?.duration || 1))
                        .then(() => {
                            myFetch(`/requests/${res._data?.id}/`, {
                                method: 'PATCH',
                                body: {
                                    "paid": true,
                                }
                            })
                        })
                        .catch(err => {
                            boockErrorHandler(err,  1, res?._data?.id)
                        })
                })
                .catch((err) => {
                    boockErrorHandler(err,  2)
                })
        } else {
            //create user
            myFetch(`/users/`, {
                method: 'POST',
                body: {
                    "phone": phone.value,
                    "password": otp.value,
                    "name": login.value
                }
            })
                .then((res) => {
                    //create request
                    myFetch(`/requests/`, {
                        method: "POST",
                        body: {
                            "date": dateTime.value.date,
                            "time": dateTime.value.time,
                            "field_type": selectedFieldType.value.id,
                            "user": res._data?.id,
                            "paid": false,
                            "book": true
                        }
                    })
                        .then((res) => {
                            auth(phone.value, `${otp.value}`)
                            pay(resFieldType.value?.coast * (selectedFieldType.value?.duration || 1))
                                .then(() => {
                                    myFetch(`/requests/${res._data?.id}/`, {
                                        method: 'PATCH',
                                        body: {
                                            "paid": true,
                                        }
                                    })
                                })
                                .catch(err => {
                                    boockErrorHandler(err,  3, res._data?.id)
                                })
                        })
                        .catch(err => {
                            boockErrorHandler(err,  4)
                        })
                })
                .catch(err => {
                    boockErrorHandler(err,  5)
                })
        }
    }
})

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

.field-type-card {
    display: flex;
    align-items: center;

    .field-checkbox {
        margin-right: 20px;
        margin-left: 27px;
        width: 20px;
        height: 20px;
        border-radius: 22px;
        border: 2px solid #B9FD02;
        background: #373C34;
        position: relative;

        &.active {
            &:after {
                position: absolute;
                content: '';
                width: 12px;
                height: 12px;
                background: $green1;
                border-radius: 50%;
                left: 2px;
                top: 2px;
            }
        }
    }

    .field-info {
        margin-right: auto;

        p {
            color: white;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        span {
            color: white;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    img {
        width: 68px;
        height: 68px;
        border-radius: 21px;
        overflow: hidden;
        object-fit: cover;
        border: 2px solid $black2;

        &.active {
            border: 2px solid $green1;
        }
    }

    //width: 319px;
    height: 68px;

    border-radius: 22px;
    background: $black2;
    backdrop-filter: blur(20px);
}

.step-1 {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 28px 30px;
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(20px);
    border-radius: 28px;
    min-height: 655px; //calc(100dvh - 140px);
    margin-top: 40px;

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
                background: $black2; //$green1;
                border: 2px solid #B9FD02;
                min-width: 42px;
                min-height: 42px;
                border-radius: 50%;

                position: relative;

                &.checked {
                    &::after {
                        position: absolute;
                        content: '';
                        width: 24px;
                        height: 24px;
                        background: #B9FD02;
                        border-radius: 50%;
                        top: 7px;
                        left: 7px;
                    }
                }

                &.disabled {
                    border: 2px solid #666;
                }
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

.icon-group {
    display: flex;
    gap: 24px;
    margin-top: auto;

    &:deep(add-to-calendar-button) {
        width: 100px;
    }

    & > div, & > a {
        display: flex;
        flex-direction: column;
        gap: 11px;
        text-decoration: none;

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

        border: 1px solid rgba(255, 255, 255, 0.20);
        background: rgba(75, 73, 73, 0.9);
        backdrop-filter: blur(20px);

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
        gap: 10px;

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
