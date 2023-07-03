<template>
    <i :class="[icon, size, color, deg]" class="icon" />
</template>

<script setup>
const props = defineProps({
    icon: String,
    size: String,
    color: {
        type: String,
        deflaut: 'transparent'
    },
    deg: String,
});
</script>

<style lang="scss" scoped>
i.icon {
    -webkit-mask-size: calc(100% - 4px);
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: $grey-400;
    // cursor: pointer; // Есть иконки где не нужен пальчик (глобально такое не делают)
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    transition: .2s;

    &.up {
        transform: rotate(-180deg);
    }

    &.down {
        transform: rotate(180deg);
    }

    &.left {
        transform: rotate(-90deg);
    }

    &.right {
        transform: rotate(90deg);
    }
}

// SIZES

.xl {
    width: 52px !important;
    height: 52px !important;
    -webkit-mask-size: calc(100% - 4px);
}

.big {
    width: 24px !important;
    min-width: 24px;
    height: 24px !important;
}
.bigger {
    width: 30px !important;
    height: 30px !important;
    -webkit-mask-size: calc(100% - 4px);
}
.biger {
    width: 42px !important;
    height: 42px !important;
    -webkit-mask-size: calc(100% - 4px);
    color: #1570ef;
}
.normal {
    width: 20px !important;
    height: 20px !important;
    -webkit-mask-size: calc(100% - 4px);
}
.small {
    width: 16px !important;
    height: 16px !important;
    -webkit-mask-size: calc(100% - 4px);
}
.xsmall {
    width: 13.33px !important;
    height: 13.33px !important;
    -webkit-mask-size: calc(100% - 4px);

    // width: 13px;
    // height: 13px;
}

// COLORS
.transparent {
    background-color: transparent !important;
}

// blue
.blue-500 {
    background-color: $blue-500 !important;
}
.blue-600 {
    background-color: $blue-600 !important;
}
.blue-700 {
    background-color: $blue-700 !important;
}

.blue-800 {
    background-color: $blue-800 !important;
}

.blue-900 {
    background-color: $blue-900 !important;
}

//
.white {
    background-color: white !important;
}
.success-500 {
    background-color: $success-500 !important ;
}
.success-700 {
    background-color: $success-700 !important ;
}

// grey
.grey-200 {
    background-color: $grey-200 !important;
}

.grey-500 {
    background-color: $grey-500 !important;
    &:hover {
        background-color: $grey-800 !important;
    }
}
.grey-600 {
    background-color: $grey-600 !important;
    // &:hover {
    //   background-color: $grey-800;
    // }
}
.grey-700 {
    background-color: $grey-700 !important;
    &:hover {
        background-color: $grey-900 !important;
    }
}
.grey-800 {
    background-color: $grey-800 !important;
}

.grey-900 {
    background-color: $grey-900 !important;
}

.whatsapp-color {
    background-color: #25D366 !important;
}

.telegram-color {
    background: linear-gradient(180deg, #2AABEE 0%, #229ED9 99.26%) !important;
}

// error
.error-100 {
    background-color: $error-100 !important;
}
.error-500 {
    background-color: $error-500 !important;
}
.error-700 {
    background-color: $error-700 !important;
}
.error-900 {
    background-color: $error-900 !important;
}

// warning
.warning-500 {
    background-color: $warning-500 !important;
}
.warning-400 {
    background-color: $warning-400 !important;
}
.warning-600 {
    background-color: $warning-600 !important;
}
.warning-900 {
    background-color: $warning-900 !important;
}

// HOVERS
// MASKS FOR ICONS
// Navigation

.arrow-down {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/arrow-down.svg);
    mask-image: url(/icons/arrow-down.svg);
}
.chevron-down {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/chevron-down.svg);
    mask-image: url(/icons/chevron-down.svg);
}
</style>