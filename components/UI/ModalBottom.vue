<template>
    <teleport to="body">
        <div class="modal-wrapper">
            <slot></slot>
        </div>
    </teleport>
</template>

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