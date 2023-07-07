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

    <div class="times">
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
import {computed} from "@vue/reactivity";
import {ID} from "@vue/devtools-api";

const props = defineProps<{
    modelValue: {
        date: number | null
        time: string | null
    }
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: {
        date: number
        time: string
    }): void
}>()

const date = ref(new Date())
const currYear = ref(date.value.getFullYear())
const currMonth = ref(date.value.getMonth())
const firstDayInMonth = ref(new Date(currYear.value, currMonth.value, 1).getDay())
const currDaysInMonth = ref(new Date(currYear.value, currMonth.value+1, 0).getDate())
const lastDayInPrevMonth = ref(new Date(currYear.value, currMonth.value, 0).getDate())
const lastDayInCurrMonth = ref(new Date(currYear.value, currMonth.value, currDaysInMonth.value).getDate())

const weekDays = ref(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
const months = ref(["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"])
interface IDateTime {
    id: number
    value: number | string
    Class?: string
}
const days = ref<IDateTime[]>([])
const times = ref<IDateTime[]>([])
const currDay = ref(props.modelValue.date || date.value.getDate() || 1)
const initTime = () => {
    const tempHour = date.value.getHours()
    if(tempHour < 9 || tempHour > 18) {
        return '09:00'
    }
    return `${tempHour < 12 ? '0' + tempHour : tempHour}:00`
}
const currTime = ref(props.modelValue.time || initTime())

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
        })
    }

    for(let i = lastDayInCurrMonth.value; i < 7; ++i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            value: i - lastDayInCurrMonth.value + 1,
            Class: 'inactive'
        })
    }

    for(let i = 9; i <= 18; i++) {
        times.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            value: `${ i < 10 ? '0' + i : i}:00`,
            Class: i === 17 || i === 18 ? 'inactive' : undefined
        })
    }
}
const setDate = (day: IDateTime) => {
    if(day.Class !== 'inactive') {
        currDay.value = day.value as number
        emit('update:modelValue', {date: currDay.value as number, time: props.modelValue.time as string})
    }
}
const setTime = (time: IDateTime) => {
    if(time.Class !== 'inactive') {
        currTime.value = time.value as string
        emit('update:modelValue', {date: props.modelValue.date as number, time: currTime.value})
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

onMounted(() => {
    calculateDays()
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
        }

        &.inactive {
            background: #F6F6F6;
            color: #DFDEFF;
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
        }

        &.inactive {
            background: #F6F6F6;
            color: #DFDEFF;
        }
    }
}

.modal-time-month {
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