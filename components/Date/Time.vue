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
            :class="{active: currDay === day.day, inactive: day.Class === 'inactive'}"
            v-for="day in days"
            :key="day.id"
            @click="() => {(day.Class !== 'inactive') && (currDay = day.day)}"
        >
            {{ day.day }}
        </div>

    </div>
</template>

<script setup lang="ts">

const date = ref(new Date())
const currYear = ref(date.value.getFullYear())
const currMonth = ref(date.value.getMonth())
const firstDayInMonth = ref(new Date(currYear.value, currMonth.value, 1).getDay())
const currDaysInMonth = ref(new Date(currYear.value, currMonth.value+1, 0).getDate())
const lastDayInPrevMonth = ref(new Date(currYear.value, currMonth.value, 0).getDate())
const lastDayInCurrMonth = ref(new Date(currYear.value, currMonth.value, currDaysInMonth.value).getDate())

const weekDays = ref(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
const months = ref(["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"])
const days = ref<{
    id: number,
    day: number,
    Class?: string
}[]>([])
const currDay = ref(date.value.getDate() || 1)

const calculateDays = () => {
    days.value.length = 0
    firstDayInMonth.value = new Date(currYear.value, currMonth.value, 1).getDay()
    currDaysInMonth.value = new Date(currYear.value, currMonth.value+1, 0).getDate()
    lastDayInPrevMonth.value = new Date(currYear.value, currMonth.value, 0).getDate()
    lastDayInCurrMonth.value = new Date(currYear.value, currMonth.value, currDaysInMonth.value).getDay()

    for(let i = firstDayInMonth.value-1; i > 0; --i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            day: lastDayInPrevMonth.value - i + 1,
            Class: 'inactive'
        })
    }

    for(let i = 1; i <= currDaysInMonth.value; ++i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            day: i,
        })
    }

    for(let i = lastDayInCurrMonth.value; i < 7; ++i) {
        days.value.push({
            id: Math.random() * 100500 + i + currMonth.value + currDaysInMonth.value,
            day: i - lastDayInCurrMonth.value + 1,
            Class: 'inactive'
        })
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