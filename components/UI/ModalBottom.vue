<template>
    <teleport to="body">
        <div class="modal-wrapper" @click.self="emit('closeModal', true)">
            <slot></slot>
        </div>
    </teleport>
</template>

<script setup lang="ts">

const emit = defineEmits<{ (e: 'closeModal', value: boolean): void }>()
const disableParentScroll = (e: Event) => {
    e.preventDefault();
}

onMounted(() => {
    document.body.addEventListener('wheel', disableParentScroll, {passive: false})
    document.body.addEventListener('touchmove', disableParentScroll, {passive: false})
})

onUnmounted(() => {
    document.body.removeEventListener('wheel', disableParentScroll)
    document.body.removeEventListener('touchmove', disableParentScroll)
})
</script>

<style scoped lang="scss">
.modal-wrapper {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
}
</style>
