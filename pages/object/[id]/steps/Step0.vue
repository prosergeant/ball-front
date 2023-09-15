<template>
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
                @click="setFieldType(selectedFieldType, fields, modalType, fieldtype.id, fieldtype.hours)"
            >
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
            @selected-item="(e) => {
                            dateTime.date = null;
                            dateTime.time = null;
                            selectedFieldType.duration = e.value as number;
                        }"
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

        <UIButton :disabled="!dateTime.date || !dateTime.time" icon="arrow-right" icon-color="black" @click="nextStep">{{ !dateTime.date || !dateTime.time ? 'Продолжить бронирование' : `Забронировать за ${resFieldType?.coast * selectedFieldType.duration} ₸` }}</UIButton>

        <UIModalBottom v-if="modalTime" @close-modal="modalTime = false">
            <div class="modal-body-fixed">
                <div class="modal-body"> <!-- v-on-click-outside.bubble="() => {modalTime = false}" -->
                    <hr />
                    <DateTime v-model="localDateTime" :duration="selectedFieldType?.duration" :fieldtype="selectedFieldType?.id" :startFrom="selectedFieldType?.startFrom" :endTo="selectedFieldType?.endTo" @closeModal="() => {modalTime = false}" />
                </div>
            </div>
        </UIModalBottom>
    </div>
</template>
<script setup lang="ts">
import {setFieldType} from "~/pages/object/[id]/misc"

const props = defineProps<{
    data: IField
    fields: IFieldType[]
    selectedFieldType: any
    dateTime: TDateTime
    resFieldType: TSelectedField | null
    step: number
    isWarningModal: boolean
}>()

const emit = defineEmits<{
    (e: 'update:step', value: number): void
    (e: 'update:isWarningModal', value: boolean): void
    (e: 'update:dateTime', value: TDateTime): void
}>()

const localDateTime = ref<TDateTime>(props.dateTime)
const modalType = ref(false)
const modalTime = ref(false)

watch(() => localDateTime.value, (v) => {
    emit('update:dateTime', v)
})

const nextStep = () => {
    emit('update:step', 1)
    emit('update:isWarningModal', true)
}
</script>
