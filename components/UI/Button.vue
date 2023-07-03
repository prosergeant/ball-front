<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    border-radius: 8px;
    background: $green-1;
    color: white;
}
</style>