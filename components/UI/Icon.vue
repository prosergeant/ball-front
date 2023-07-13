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

.black {
    background-color: black !important;
}

.white {
    background-color: white !important;
}

.main-link {
    background-color: $main-link !important;
}

.green1 {
    background-color: $green1 !important;
}

// HOVERS
// MASKS FOR ICONS
// Navigation

.arrow-down {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/arrow-down.svg);
    mask-image: url(/icons/arrow-down.svg);
}
.chevron-down-old {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/chevron-down-old.svg);
    mask-image: url(/icons/chevron-down-old.svg);
}
.chevron-right {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/chevron-right.svg);
    mask-image: url(/icons/chevron-right.svg);
}
.chevron-left {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/chevron-left.svg);
    mask-image: url(/icons/chevron-left.svg);
}
.offer-card-image {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/offer-card-image.svg);
    mask-image: url(/icons/offer-card-image.svg);
}
.search {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/search.svg);
    mask-image: url(/icons/search.svg);
}
.booking-card-square {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/booking-card-square.svg);
    mask-image: url(/icons/booking-card-square.svg);
}
.clock {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/clock.svg);
    mask-image: url(/icons/clock.svg);
}
.calendar {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/calendar.svg);
    mask-image: url(/icons/calendar.svg);
}
.car {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/car.svg);
    mask-image: url(/icons/car.svg);
}
.closet {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/closet.svg);
    mask-image: url(/icons/closet.svg);
}
.shower {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/shower.svg);
    mask-image: url(/icons/shower.svg);
}
.appliances {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/appliances.svg);
    mask-image: url(/icons/appliances.svg);
}
.lamp {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/lamp.svg);
    mask-image: url(/icons/lamp.svg);
}
.arrow-right {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/arrow-right.svg);
    mask-image: url(/icons/arrow-right.svg);
}
.checkbox-black {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/checkbox-black.svg);
    mask-image: url(/icons/checkbox-black.svg);
}
.arrow-accept {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/arrow-accept.svg);
    mask-image: url(/icons/arrow-accept.svg);
}
.ball {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/ball.svg);
    mask-image: url(/icons/ball.svg);
}
.trash {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/trash.svg);
    mask-image: url(/icons/trash.svg);
}

.map-pin {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/map-pin.svg);
    mask-image: url(/icons/map-pin.svg);
}
.export {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/export.svg);
    mask-image: url(/icons/export.svg);
}
.home {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/home.svg);
    mask-image: url(/icons/home.svg);
}
.user {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/user.svg);
    mask-image: url(/icons/user.svg);
}
.vertical-dots {
    @extend i, .icon;
    -webkit-mask-image: url(/icons/vertical-dots.svg);
    mask-image: url(/icons/vertical-dots.svg);
}
</style>