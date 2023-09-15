<template>
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
                    :startDate="dateForCalendar"
                    :endDate="dateForCalendar"
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

<script setup lang="ts">
import 'add-to-calendar-button';
import {computed} from "@vue/reactivity";

const props = defineProps<{
    data: IField
    selectedFieldType: any
    dateTime: TDateTime
    resFieldType: TSelectedField | null
}>()

const makeDateFromMyDate = (date: string) => {
    const [day, month] = date.split('.').map(Number)
    return `${new Date().getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}
const dateForCalendar = computed(() => props.dateTime?.date ? new Date(makeDateFromMyDate(props.dateTime?.date)).toLocaleDateString('en-CA') : '2023-01-01')
const share = async () => {
    try {
        await navigator.share({
            title: 'BRONKZ.app',
            text: 'Играть в футбол',
            url: `${justURL}/object/${props.selectedFieldType.field_id}/`,
        });
    } catch (err: any) {
        console.error(`${err?.name}: ${err?.message}`);
    }
}

</script>
