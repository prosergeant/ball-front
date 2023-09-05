<template lang="jade">
.dashboard-wrapper
    .main-field-wrapper
        template(v-for="field in allFields")
            .field-type-card(@click="setSelectedField(field.id)")
                .field-checkbox(":class"="{active: selectedField === field.id}")
                .field-info
                    p {{ field.name }}
                img(":class"="{active: selectedField === field.id}" src="/cover.png" alt="field-img")

    .calendar-wrapper
        .select-field
            template(v-for="fieldtype in field_types")
                .field-type-card(@click="setSelectedFieldType(fieldtype.id)")
                    .field-checkbox(":class"="{active: selectedFieldType.id === fieldtype.id}")
                    .field-info
                        p {{ fieldtype.title }}
                        span 1 час - {{fieldtype.coast}}

                    img(":class"="{active: selectedFieldType.id === fieldtype.id}" src="/cover.png" alt="field-img")

        .calendar(":class"="{disabled: !selectedFieldType?.id}")
            .header
                //UIIcon(icon="chevron-right" color="black" class="rotate")
                div
                h3 {{ getMontes[month] }}
                //UIIcon(icon="chevron-right" color="black")
                div

            .days
                p Пн
                p Вт
                p Ср
                p Чт
                p Пт
                p Сб
                p Вс

            .days.bordered
                p(
                    v-for="i in allDays"
                    class="date-day"
                    @click="() => {getInfoFromDate(i.value, i.Class)}"
                    ":class"="{active: selectedDay === i.value && i.Class !== 'disabled', disabled: i.Class === 'disabled'}"
                ) {{ i.value }}
                    span.has-request(v-if="i.has_request")

    .booking-info-wrapper(":class"="{disabled: !selectedFieldType?.id}")
        .booking-info
            table
                tr
                    th(v-for="i in times") {{ i }}:00
                tr
                    td(
                        v-if="selectedDay"
                        v-for="i in bookedTimes"
                        ":colspan"="i.duration"
                        ":class"="i.book ? 'red' : 'green'"
                        @click="setSelectedTime(i)"
                    ) {{ i.book ? "Занято" : "Свободно" }}

            .req-info(v-if="selectedTime?.id && selectedTime.id !== -1" )
                .req-info-card
                    img(:src="bookedUser?.photo ? `${baseUrl}${bookedUser?.photo}` : '/cover.png'" alt="avatar")
                    .body-info
                        p {{ bookedUser?.name }}
                        p {{ bookedUser?.phone }}
                    UIButton(@click="isCancelModal = true") Отменить бронь
            .req-clear-info(v-if="selectedTime?.id === -1" )
                p Выбранное время: {{ selectedTime?.hour }}:00
                p На сколько часов:
                select(v-model="adminSelectedHours")
                    option 1
                    option 2
                    option 3
                UIButton(@click="book") Забронировать

    ModalBottom(v-if="isCancelModal")
        .cancel-modal-wrapper
            .cancel-modal
                hr.green-hr
                h3 Вы уверены что хотите отменить бронь?
                hr
                span Отменяя бронь вы рискуете упустить поле и его забронирует другая команда
                p.green-bg(@click="cancelBook") Да, отменить бронь
                p(@click="isCancelModal = false") Не отменять бронь

</template>

<script setup lang="ts">
import {authStore} from "~/store/auth";
import {storeToRefs} from "pinia";
import ModalBottom from "~/components/UI/ModalBottom.vue";
import {useNotifyStore} from "~/store/useNotify";

const {addNotify} = useNotifyStore()
const {waitForData} = authStore()
const {user_info} = storeToRefs(authStore())
const isCancelModal = ref(false)

const maxwidth = ref<HTMLElement | null>(null)
const mainwrapper = ref<HTMLElement | null>(null)

const allFields = ref<IField[]>([])
const selectedField = ref(0)

onMounted(() => {
    maxwidth.value = document.getElementsByClassName('maxwidth')[0] as HTMLElement
    maxwidth.value.classList.remove('maxwidth')
    maxwidth.value.classList.add('w-100')

    mainwrapper.value = document.getElementsByClassName('main-wrapper')[0] as HTMLElement
    mainwrapper.value.style.background = 'white'

    waitForData().then(async () => {
        allFields.value = (await myFetch(`/fields/?user_id=${user_info.value?.id}`))._data as IField[]
    })
})

onUnmounted(() => {
    if(maxwidth.value) {
        maxwidth.value.classList.add('maxwidth')
        maxwidth.value.classList.remove('w-100')
    }

    if(mainwrapper.value)
        mainwrapper.value.style.background = 'black'
})

const selectedDay = ref<null | number|string>(null)
const selectedTime = ref<null | TBookedTimes>(null)
const adminSelectedHours = ref(1)

const allDays = ref<IDateTime[]>([]) // тут должно быть 35 дней для квадратной таблицы
const oldDays = ref<IDateTime[]>([]) // тут дни предыдущего месяца, могут быть пустыми

const date = ref(new Date())
const month = ref(date.value.getMonth())
const startDay = ref(new Date(date.value.getFullYear(), month.value, 1).getDay())
const daysCount = ref(new Date(date.value.getFullYear(), month.value+1, 0).getDate()) // сколько дней в этом месяце
const oldDaysCount = ref(new Date(date.value.getFullYear(), month.value, 0).getDate()) // сколько дней в пред месяце

// узнаем нужно ли вообще рисовать дни предыдущего месяца
if(startDay.value-1) {
    let temp = oldDaysCount.value
    for(let i = startDay.value-1; i > 0; i--) {
        oldDays.value.push({
            id: Math.random() * 123456,
            value: temp,
            Class: 'disabled',
            prevDay: true
        })
        temp--
    }
}

for(let i = 1; i <= daysCount.value; ++i)
    allDays.value.push({
        id: Math.random() * 123456,
        value: i
    })

// добавляем дни прошедшего месяца в начало
allDays.value.unshift(...oldDays.value.reverse())

// если дней меньше 35 то добиваем для выравнивания таблицы
if(allDays.value.length < 35) {
    const len = allDays.value.length
    for(let i = 1; i <= 35-len; i++)
        allDays.value.push({
            id: Math.random() * 123456,
            value: i,
            Class: 'disabled',
            nextDay: true
        })
}
// если оказалось так что 31 число стало 36 элементом
// то добиваем оставшиеся чтобы ровная таблица была
else if(allDays.value.length > 35 && allDays.value.length < 42) {
    const len = allDays.value.length
    for(let i = 1; i <= 42-len; i++)
        allDays.value.push({
            id: Math.random() * 123456,
            value: i,
            Class: 'disabled',
            nextDay: true
        })
}

const data = ref<IRequest[] | null>(null)
const times = ref<number[]>([])
type TBookedTimes = {
    id: number
    hour: number
    duration: number
    book: boolean
}
const bookedTimes = ref<TBookedTimes[]>([])
const bookedUser = ref<null | IUserInfo>(null)
const filteredData = computed(() =>
    data.value?.filter((el) => {
        const [d,m] = el.date.split('.').map(Number)
        return d === selectedDay.value && m === month.value+1
    }) || []
)

const getInfoFromDate = (day: number | string, Class: string) => {
    if(Class === 'disabled') return

    selectedDay.value = day

    bookedTimes.value.length = 0
    selectedTime.value = null
    let offset = 0

    for(let i = 0; i < times.value.length + offset; i++) {
        bookedTimes.value.push({
            id: 0,
            book: false,
            hour: times.value[i] + Math.abs(offset),
            duration: 1
        })
        for(const req of filteredData.value) {
            if(req?.book && req?.paid && parseInt(req.time.split(':')?.[0]) - Math.abs(offset) === times.value[i]) {
                bookedTimes.value.pop()
                bookedTimes.value.push({
                    id: req.id,
                    book: true,
                    hour: times.value[i],
                    duration: req.duration
                })
                offset -= req.duration-1
                break
            }
        }
    }
}

const field_types = ref<IFieldType[]>([])

const selectedFieldType = ref({
    id: 0,
    value: 0
})

const setSelectedField = (id: number) => {
    selectedField.value = id
    myFetch(`/fields/?field=${id}`)
        .then(field_res => {
            const data = field_res._data as IField[]
            field_types.value = data?.[0]?.field_types as IFieldType[]
            const time_start = parseInt(data?.[0]?.time_start.split(':')?.[0] || '')
            const time_end = parseInt(data?.[0]?.time_end.split(':')?.[0] || '')

            times.value.length = 0
            for(let i = time_start; i <= time_end; i++) {
                times.value.push(i)
            }
        })
}

const setSelectedFieldType = (id?: number | null) => {
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null) {
            reject()
            return
        }

        selectedDay.value = 0
        selectedTime.value = null
        for(const day of allDays.value)
            day.has_request = false

        selectedFieldType.value.id = id
        myFetch(`/requests/?fieldtype=${id}`)
            .then(res => {
                data.value = res._data as IRequest[]

                for(const day of allDays.value.filter(el => !el?.prevDay && !el?.nextDay)) {
                    for(const req of data.value) {
                        const [req_day, req_month] = req.date.split('.').map(Number)
                        if(req?.book && req?.paid && req_day === day.value && req_month === month.value+1) {
                            day.has_request = true
                            break
                        }
                    }
                }

                resolve(true)
            })
    })
}

const setSelectedTime = (time: TBookedTimes) => {
    if(!time.book) {
        selectedTime.value = {
            id: -1,
            book: false,
            hour: time.hour,
            duration: time.duration
        }
        return
    }

    selectedTime.value = time
    const user_id = data.value?.find(el => el.id === time.id)?.user || null

    myFetch(`/find-user-by-id/?id=${user_id}`)
        .then(res => {
            bookedUser.value = res._data as IUserInfo
        })
}

const book = () => {
    if(!selectedTime.value) return

    const hour = selectedTime.value.hour

    myFetch(`/requests/`, {
        method: "POST",
        body: {
            "date": `${selectedDay.value}.${month.value+1}`,
            "time": `${hour < 10 ? '0' + `${hour}` : hour}:00`,
            "field_type": selectedFieldType.value.id,
            "duration": adminSelectedHours.value,
            "user": user_info.value?.id,
            "paid": true,
            "book": true
        }
    })
        .then(() => {
            const temp_day = selectedDay.value
            setSelectedFieldType(selectedFieldType.value.id)
                .then(() => {
                    if(temp_day)
                        getInfoFromDate(temp_day, '')
                })
        })
}

const cancelBook = () => {
    if(!selectedTime.value?.id) {
        isCancelModal.value = false
        return
    }

    myFetch(`/requests/${selectedTime.value.id}/`, {
        method: 'PATCH',
        body: {
            paid: false,
            book: false
        }
    })
        .then(res => {
            const temp_day = selectedDay.value
            setSelectedFieldType(selectedFieldType.value.id)
                .then(() => {
                    if(temp_day)
                        getInfoFromDate(temp_day, '')
                })
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
table {
    width: 100%;
    //border: 1px solid;
    th, td {
        border: 1px solid;
    }
    td {
        padding: 4px;
        color: white;

        &.red {
            background: red;
        }
        &.green {
            background: green;
        }
    }
}

.rotate {
    transform: rotate(180deg);
}

.dashboard-wrapper {
    width: 100%;
    min-width: 390px;
    min-height: 100dvh;
    background: #3c4357;
    padding: 10px;

    display: flex;
    gap: 40px;

    @media screen and (max-width: 1010px) {
        flex-direction: column;
        align-items: center;
        padding: 10px 40px 10px 20px;
        gap: 16px;
    }

    .main-field-wrapper {
        background: white;
        position: relative;
        width: 100%;
        max-width: 430px;
        padding: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;

        & > div {
            width: 100%;
        }

        &::before, &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100%;
            width: 12px;
            height: 97%;
            border-radius: 0 5px 5px 0;
            background: #d3d5d6d7;
            transform: translateY(-50%);
        }
        &::before {
            height: 94%;
            left: calc(100% + 12px);
            background: rgb(153,153,153);
        }
    }

    .booking-info-wrapper {
        //border: 2px solid red;
        //width: 50%;
        //overflow-x: scroll;
        background: white;
        position: relative;
        max-width: 600px;
        margin-right: 30px;

        @media screen and (max-width: 1010px) {
            max-width: 430px;
            margin-right: unset;
        }

        &::before, &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100%;
            width: 12px;
            height: 97%;
            border-radius: 0 5px 5px 0;
            background: #d3d5d6d7;
            transform: translateY(-50%);
        }
        &::before {
            height: 94%;
            left: calc(100% + 12px);
            background: rgb(153,153,153);
        }
        &.disabled {
            filter: blur(4px);
            position: relative;
            pointer-events: none;

            &::before, &::after {
                all: initial;
            }
        }

        .booking-info {
            display: flex;
            flex-direction: column;
            overflow-x: auto;
            width: 100%;
            height: 100%;

            .table-like-wrapper {
                width: 100%;

                div {
                    width: 100%;
                    color: white;
                    text-align: center;

                    &.red {
                        background: red;
                    }
                    &.green {
                        background: green;
                    }
                }
            }

            .req-info {
                width: 90%;
                height: 100%;
                padding: 8px;
                position: sticky;
                left: 0;

                &-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;

                    background: black;
                    color: white;
                    border-radius: 10px;
                    padding: 4px 10px;
                    min-width: 310px;

                    img {
                        width: 64px;
                        height: 64px;
                        object-fit: cover;
                        border-radius: 6px;
                        border: 2px solid $green1;
                    }

                    .body-info {
                        display: flex;
                        flex-direction: column;
                        p {
                            font-size: 14px;
                        }
                    }
                }
            }

            .req-clear-info {
                position: sticky;
                left: 0;
                padding: 8px;
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
        }

        @media screen and (max-width: 1010px) {
            width: 100%;
            height: 300px;
        }
    }

    .calendar-wrapper {
        display: flex;
        flex-direction: column;
        max-width: 430px;
        width: 50%;
        gap: 10px;

        @media screen and (max-width: 1010px) {
            width: 100%;
        }

        .select-field {
            //border: 2px solid blue;
            background: white;
            padding: 8px 4px;
            position: relative;
            min-height: 140px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 5px;
            gap: 8px;

            &::before, &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 100%;
                width: 10px;
                height: 97%;
                border-radius: 0 5px 5px 0;
                background: #d3d5d6d7;
                transform: translateY(-50%);
            }
            &::before {
                height: 90%;
                left: calc(100% + 10px);
                background: rgb(153,153,153);
            }
        }

        .calendar {
            position: relative;
            max-width: 430px;
            height: 300px;
            background: white;
            border-radius: 5px;
            padding: 8px;
            //width: 50%;
            width: 100%;

            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            &.disabled {
                filter: blur(4px);
                position: relative;
                pointer-events: none;

                &::before, &::after {
                    all: initial;
                }
            }

            @media screen and (max-width: 1010px) {
                width: 100%;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20%;
            }

            &::before, &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 100%;
                width: 12px;
                height: 97%;
                border-radius: 0 5px 5px 0;
                background: #d3d5d6d7;
                transform: translateY(-50%);
            }
            &::before {
                height: 94%;
                left: calc(100% + 12px);
                background: rgb(153,153,153);
            }

            .days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                text-align: center;

                &.bordered {
                    border-right: 1px solid #999;
                    border-bottom: 1px solid #999;

                    p {
                        border: 1px solid #999;
                        border-bottom: none;
                        border-right: none;

                        position: relative;
                        span.has-request {
                            &::after {
                                position: absolute;
                                content: '';
                                width: 8px;
                                height: 8px;
                                border-radius: 50%;
                                background: $green1;
                                right: 1px;
                                top: 1px;
                            }
                        }
                    }
                }

                p {
                    color: #5E5E5E;
                    font-size: 20px;
                }

                .date-day {
                    &:hover {
                        background: $green1;
                    }

                    &.active {
                        background: $green1;
                        box-shadow: 0 0 10px 2px $green1;
                    }

                    &.disabled {
                        color: rgba(0, 0, 0, 0.5);

                        &:hover {
                            background: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
