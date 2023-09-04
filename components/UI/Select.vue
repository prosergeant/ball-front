<template>
    <div class="select-hour" @click.self="(items?.length) && (setState(!isOpen))">
        <p>{{ selectedItem?.name || 'Выберите' }}</p>
        <UIIcon icon="chevron-down-old" color="green1" />
        <div class="select-list" v-if="isOpen">
            <ul>
                <li v-for="i in items" :key="i" @click.stop="selectItem(i)">{{ i?.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    items?: ISelect[]
    value?: string | number
}>()

const emit = defineEmits<{ (e: 'selectedItem', value: ISelect): void }>()

const isOpen = ref(false)

const setState = (state: boolean) => {
    const selectCard = document.getElementsByClassName('select-card')?.[0] as HTMLElement

    if(state) {
        isOpen.value = true
        if(selectCard)
            selectCard.style.zIndex = '-1'
    } else {
        isOpen.value = false
        if(selectCard)
            selectCard.style.zIndex = '1'
    }
}

const selectedItem = ref<ISelect | null>(null)
const selectItem = (item: ISelect) => {
    selectedItem.value = item
    emit('selectedItem', item)
    setState(false)
}

watch(() => props.value, (v) => {
    if(v) {
        selectedItem.value = {name: `${v} час`, value: v}
        selectItem(selectedItem.value)
    }
})

</script>

<style scoped lang="scss">
.select-hour {
    width: 100%;
    height: 56px;
    border-radius: 22px;
    border: 1px solid $green1;
    background: $black2;
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0 26px;
    position: relative;

    .select-list {
        position: absolute;
        top: 56px;
        left: 0;
        background: $black2;
        width: 100%;
        padding: 12px 26px;
        border-radius: 22px;
        border: 1px solid $green1;

        ul {
            display: flex;
            flex-direction: column;
            gap: 16px;
            list-style-type: none;
        }
    }
}
</style>
