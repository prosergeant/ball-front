<template>
    <div>
        <div v-if="step < 4" class="mini-navigation-block">
            <div class="mini-navigation" @click="navigationHandler">
                <UIIcon icon="chevron-left" color="white" />
                <p>Выберите параметры</p>
            </div>
            <UIIcon icon="search" color="white" />
        </div>
        <div style="padding: 0 10px">
            <Step0
                v-if="step === 0"
                :data="data"
                :fields="fields"
                :selected-field-type="selectedFieldType"
                :res-field-type="resFieldType"
                v-model:is-warning-modal="isWarningModal"
                v-model:step="step"
                v-model:date-time="dateTime"
            />
            <Step1
                v-if="step === 1"
                :date-time="dateTime"
                :data="data"
                :selected-field-type="selectedFieldType"
                :res-field-type="resFieldType"
                v-model:step="step"
            />
            <Step2
                v-if="step === 2"
                v-model:phone="phone"
                v-model:login="login"
                v-model:step="step"
            />
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
            <!-- <template v-if="step === 4">
                <div class="step-1">
                    <div class="header">
                        <UIButton class="btn back-to-main" @click="navigateTo('/')">Перейти на главную</UIButton>
                    </div>
                </div>
            </template> -->
            <Step5
                v-if="step === 5"
                :date-time="dateTime"
                :data="data"
                :selected-field-type="selectedFieldType"
                :res-field-type="resFieldType"
            />
        </div>


        <UIModalBottom v-if="isWarningModal && isWarningModalShowAgain">
            <div class="cancel-modal-wrapper">
                <div class="cancel-modal">
                    <hr class="green-hr" />
                    <h3>Важная информация</h3>
                    <hr />
                    <span>Отмена брони без списания средств с карты возможна только за 10 часов до игры</span>
                    <p class="green-bg" @click="isWarningModal = false">Понятно</p>
                    <p @click="hideWarning">Больше не показывать</p>
                </div>
            </div>
        </UIModalBottom>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "@vue/reactivity";
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {createRequest} from "~/pages/object/[id]/misc";
import Step0 from "~/pages/object/[id]/steps/Step0.vue";
import Step1 from "~/pages/object/[id]/steps/Step1.vue";
import Step2 from "~/pages/object/[id]/steps/Step2.vue";
import Step5 from "~/pages/object/[id]/steps/Step5.vue";

const {auth} = authStore()
const {is_auth, user_info} = storeToRefs(authStore())

const route = useRoute()
const id = route.params?.id || -1

const fields = ref((await myFetch<IFieldType[]>(`/fieldstypes/?field=${id}`))._data)
const data = ref<IField>((await myFetch(`/fields/${id}/`))._data as IField)

const hideWarning = () => {
    localStorage.setItem('isWarningModalShowAgain', 'true')
    isWarningModal.value = false
}
const isWarningModal = ref(false)
const isWarningModalShowAgain = ref(localStorage.getItem('isWarningModalShowAgain') !== 'true')
const step = ref(0)
const dateTime = ref({
    date: null, //10,
    time: null //'10:00'
})
const selectedFieldType = ref<TSelectedField>({} as TSelectedField)

const login = ref('')
const phone = ref('')
const passcode = ref('')
const otp = ref(Math.floor(Math.random() * (9999 - 1000) + 1000 ))

watch(() => selectedFieldType.value?.id, () => {
    dateTime.value.date = null
    dateTime.value.time = null
    selectedFieldType.value.duration = 1
}, {deep: true})

const resFieldType = computed(() => {
    if (selectedFieldType.value?.value && fields.value?.length) {
        return fields.value.find(el => el?.id === selectedFieldType.value?.id)
    }
    return null
})

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

watch(() => step.value, async (v) => {
    if (v === 2 && is_auth.value) {
        step.value = 4
    }

    if (v === 3) {
        let phoneForOtp = phone.value
        phoneForOtp = phoneForOtp.replace(/[^a-zA-Z0-9]/g, '')
        phoneForOtp = phoneForOtp.replace('7', '8')

        await myFetch(`${baseUrl}/send-otp/`, {
            method: 'POST',
            body: {
                otp: otp.value,
                phone: phoneForOtp
            }
        })
    }

    if (v === 4) {
        step.value = 5
        await createRequest(
            dateTime.value,
            selectedFieldType.value,
            is_auth.value,
            user_info.value,
            phone.value,
            otp.value,
            login.value,
            data.value
        )
    }
})
</script>

<style lang="scss">
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
            align-items: center;
            gap: 10px;

            i {
                min-width: 20px;
                min-height: 20px;
                max-width: 20px;
                max-height: 20px;
            }
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
