<template lang="jade">
.card-wrapper
    UICarousel(v-if="carousel_photos.length" ":photos"="carousel_photos" ref="_UICarousel")
    .d-flex.center.jc(v-else="" style="height: 200px;")
        .loader

    .card-wrapper-info
        h3 {{ data?.name }}
        p {{ data?.text }}

</template>

<script setup lang="ts">
import remakeUrl from "~/composables/remakeUrl";

const props = defineProps<{
    data: IField
}>()

const _UICarousel = ref()
const carousel_photos = ref<string[]>([])

onMounted(async () => {
    const photos = (await myFetch(`/fieldsphotos/?field=${props.data?.id}`))._data as IFieldPhoto[]
    if(props.data?.photo)
        carousel_photos.value = [props.data.photo, ...photos.map(el => remakeUrl(el?.photo))]
    else
        carousel_photos.value = [...photos.map(el => remakeUrl(el?.photo))]
    delay(150).then(() => {
        _UICarousel.value.calculateCarousel()
    })
})
</script>

<style scoped lang="scss">
.card-wrapper {
    background: rgba(255, 255, 255, 0.22);
    color: white;
    border-radius: 30px;
    width: 100%;

    .image {
        position: relative;
        overflow: hidden;
        border-radius: 30px;
        width: 100%;

        &:before {
            content: '';
            width: 100%;
            height: 200px;
            background-image: var(--image);
            background-size: cover;
            background-position: center;
            z-index: 0;
            position: absolute;
            display: block;
            filter: blur(5px);
        }

        div {
            width: 100%;
            height: 200px;
            background-image: var(--image);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
            z-index: 1;
        }
    }

    &-info {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        h3 {
            max-width: 250px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
        }
        p {
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}
</style>
