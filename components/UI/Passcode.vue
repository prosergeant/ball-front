<template>
    <div class="otp-wrapper">
        <vue3-otp-input
            ref="otpInput"
            input-classes="otp-input"
            :conditionalClass="['one', 'two', 'three', 'four']"
            separator=""
            inputType="letter-numeric"
            :num-inputs="4"
            v-model:value="bindValue"
            :should-auto-focus="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
            :placeholder="['0', '0', '0', '0']"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Vue3OtpInput from 'vue3-otp-input'

const emit = defineEmits<{(e: 'getValue', value: string): void}>()

const otpInput = ref<typeof Vue3OtpInput | null>(null);
const bindValue = ref("");

const handleOnComplete = (value: string) => {
    emit('getValue', bindValue.value)
};

const handleOnChange = (value: string) => {
    // console.log("OTP changed: ", value);
    // console.log("OTP v-model:value: ", unref(bindValue));
};
</script>

<style scoped lang="scss">
.otp-wrapper {
    display: flex;

    & > div {
        justify-content: center;
        align-items: center;
        gap: 12px;

        &:deep(div) {
            border-radius: 22px;
            background: $black2;
            padding: 18px;
        }
    }

    &:deep(.otp-input) {
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
</style>