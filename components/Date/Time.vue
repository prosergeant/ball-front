<template>
    <div class="modal-time-month">
        <p> {{ months?.[currMonth] }}</p>
        <div class="modal-time-month-more">
<!--            <span @click="prev">Назад</span>-->
<!--            <span @click="next">Вперед</span>-->
            <span>Еще</span>
            <UIIcon icon="chevron-right" color="main-link" />
        </div>
    </div>

    <div class="week">
        <p class="weekDay" v-for="day in weekDays" :key="day">{{ day }}</p>

        <div
            class="day"
            :class="{active: currDay === day.value, inactive: day.Class === 'inactive'}"
            v-for="day in days"
            :key="day.id"
            @click="setDate(day)"
        >
            {{ day.value }}
        </div>
    </div>

    <div class="w-100 d-flex center jc" v-if="loading">
        <div class="loader" />
    </div>
    <div class="times" v-else>
        <div
            v-for="time in times"
            :key="time.id"
            class="time"
            :class="{active: currTime === time.value, inactive: time.Class === 'inactive'}"
            @click="setTime(time)"
        >
            {{ time.value }}
        </div>
    </div>
</template>

<script setup lang="ts">
import getMontes from "~/composables/getMontes";

const props = defineProps<{
    modelValue: {
        date: string | null
        time: string | null
    },

    startFrom?: number
    endTo?: number

    fieldtype?: number
    duration?: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: {
        date: string
        time: string
    }): void
    (e: 'closeModal', value: boolean): void
}>()

const loading = ref(false)
const date = ref(new Date())
const currYear = ref(date.value.getFullYear())
const currMonth = ref(date.value.getMonth())
const firstDayInMonth = ref(new Date(currYear.value, currMonth.value, 1).getDay())
const currDaysInMonth = ref(new Date(currYear.value, currMonth.value+1, 0).getDate())
const lastDayInPrevMonth = ref(new Date(currYear.value, currMonth.value, 0).getDate())
const lastDayInCurrMonth = ref(new Date(currYear.value, currMonth.value, currDaysInMonth.value).getDate())

const weekDays = ref(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
const months = ref(getMontes)

const days = ref<IDateTime[]>([])
const times = ref<IDateTime[]>([])
const currDay = ref(parseInt(props.modelValue.date?.split('.')?.[0] || '0'))//props.modelValue.date || date.value.getDate() || 1)
const isDaySet = ref(false)
const initTime = () => {
    const tempHour = date.value.getHours()
    if(tempHour < 9 || tempHour > 18) {
        return '09:00'
    }
    return `${tempHour < 12 ? '0' + tempHour : tempHour}:00`
}
const currTime = ref(props.modelValue.time || '') //props.modelValue.time || initTime())

const calculateDays = () => {
    days.value.length = 0
    firstDayInMonth.value = new Date(currYear.value, currMonth.value, 1).getDay()
    currDaysInMonth.value = new Date(currYear.value, currMonth.value+1, 0).getDate()
    lastDayInPrevMonth.value = new Date(currYear.value, currMonth.value, 0).getDate()
    lastDayInCurrMonth.value = new Date(currYear.value, currMonth.value, currDaysInMonth.value).getDay()

    for(let i = firstDayInMonth.value-1; i > 0; --i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            value: lastDayInPrevMonth.value - i + 1,
            Class: 'inactive'
        })
    }

    for(let i = 1; i <= currDaysInMonth.value; ++i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            value: i,
            Class: i < date.value.getDate() ? 'inactive' : undefined
        })
    }

    for(let i = lastDayInCurrMonth.value; i < 7; ++i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            value: i - lastDayInCurrMonth.value + 1,
            Class: 'inactive'
        })
    }

    resetTime()
}

const resetTime = () => {
    times.value.length = 0
    const currTime = parseInt(date.value.toLocaleTimeString().split(':')?.[0])
    const currentDay = date.value.getDate()
    if(props.startFrom && props.endTo)
        for(let i = props.startFrom; i <= props.endTo; i++) {
            times.value.push({
                id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
                value: `${ i < 10 ? '0' + i : i}:00`,
                Class: i < currTime && currDay.value === currentDay ? 'inactive' : undefined
            })
        }
}

const setDate = (day: IDateTime) => {
    if(day.Class !== 'inactive') {
        currDay.value = day.value as number
        emit('update:modelValue', {date: `${currDay.value}.${currMonth.value+1}`, time: props.modelValue.time as string})
        isDaySet.value = true
    }
}
const setTime = (time: IDateTime) => {
    if(props.duration && props.duration > 1) {
        const index = times.value.findIndex(el => el.value === time.value)
        for(let i = 0; i < props.duration; i++) {
            if(times.value[index + i].Class === 'inactive')
                return
        }
    }
    if(time.Class !== 'inactive') {
        currTime.value = time.value as string
        emit('update:modelValue', {date: props.modelValue.date as string, time: currTime.value})
        if(isDaySet.value)
            emit('closeModal', true)
    }
}
const next = () => {
    currMonth.value++
    if(currMonth.value > 11) currMonth.value = 0
    calculateDays()
}
const prev = () => {
    currMonth.value--
    if(currMonth.value < 0) currMonth.value = 11
    calculateDays()
}

async function fetchBlockedDays(fieldtype: number, date: number): Promise<IRequest[]> {
    loading.value = true
    const res = (await myFetch(`/requests/?fieldtype=${fieldtype}&date=${date}.${currMonth.value + 1}`))._data as IRequest[]
    await delay(200)
    loading.value = false
    return res
}

function handleBlockedDays(blockedDays?: IRequest[]) {
    if(!blockedDays) return

    for(const i of blockedDays) {
        if(i?.paid || i?.book) {
            const index = times.value.findIndex(el => el.value === i?.time)
            const temp_time = times.value[index]
            if(i?.duration > 1) {
                for(let k = 0; k < i.duration-1; k++) {
                    times.value[index + k + 1].Class = 'inactive'
                }
            }
            if(temp_time)
                temp_time.Class = 'inactive'
        }
    }
}

watch(() => currDay.value, async (v) => {
    if(!props.fieldtype)
        return

    const bockedDays = ref(await fetchBlockedDays(props.fieldtype, v))
    resetTime()
    currTime.value = ''
    emit('update:modelValue', {date: props.modelValue.date as string, time: currTime.value})

    handleBlockedDays(bockedDays.value)
})

onMounted(async () => {
    calculateDays()

    if(props.fieldtype) {
        handleBlockedDays(await fetchBlockedDays(props.fieldtype, currDay.value))
    }
    if(props.modelValue?.date !== null) {
        isDaySet.value = true
    }
})
</script>

<style scoped lang="scss">
.week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 8px;

    margin-bottom: 35px;

    .weekDay {
        color: $light3;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .day {
        padding: 12px 13px;
        background: $light;
        border: 2px solid $light;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        cursor: pointer;

        &.active {
            background: #474747;
            color: white;
            border: 2px solid $green1;
        }

        &.inactive {
            background: #F6F6F6;
            color: #DFDEFF;
            border: none;
        }
    }
}

.times {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 18px;

    .time {
        padding: 12px 13px;
        background: $light;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        cursor: pointer;

        &.active {
            background: #474747;
            color: white;
            border: 2px solid $green1;
        }

        &.inactive {
            background: #F6F6F6;
            color: #DFDEFF;
            border: none;
        }
    }
}

.modal-time-month {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    p {
        text-transform: capitalize;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    &-more {
        display: flex;
        align-items: center;
        gap: 8px;
        color: $main-link;

        span {
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            cursor: pointer;
        }

        i {
            width: 13px;
            height: 11px;
        }
    }
}
</style>
