<template>
    <div class="input-wrapper">
        <h3 v-if="label">{{ label }}</h3>
        <div class="input">
            <input
                v-maska
                :data-maska="getMask"
                :value="modelValue"
                @input="update"
                :type="type"
                :inputmode="type"
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from "@vue/reactivity";

const props = defineProps<{
    modelValue: string
    label?: string
    type?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const update = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const getMask = computed(() => {
    if(props?.type === 'tel')
        return '+7 (###) ###-##-##'
    return ''
})

</script>

<style scoped lang="scss">
.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;

    h3 {
        color: white;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .input {
        width: 100%;
        border-radius: 22px;
        background: $black2;
        backdrop-filter: blur(20px);
        padding: 18px 25px;

        input {
            width: 100%;
            background: transparent;
            border: unset;
            color: white;

            &:focus {
                outline: none;
            }

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active{
                -webkit-box-shadow: 0 0 0 30px $black2 inset !important;
                color: white;
            }

            &:-webkit-autofill{
                -webkit-text-fill-color: white !important;
            }
        }
    }
}
</style>