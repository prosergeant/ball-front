<template>
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

        <UIButton style="margin-top: unset" icon="arrow-right" icon-color="black" @click="emit('update:step', 2)">
            Продолжить бронирование
        </UIButton>
    </div>
</template>

<script setup lang="ts">
import {cases} from "~/pages/object/[id]/misc"

const props = defineProps<{
    data: IField
    selectedFieldType: any
    dateTime: TDateTime
    resFieldType: TSelectedField | null
    step: number
}>()

const emit = defineEmits<{
    (e: 'update:step', value: number): void
}>()
</script>
