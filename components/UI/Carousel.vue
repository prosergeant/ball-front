<template lang="jade">
.carousel(ref="carouselRef")
    img(v-for="i in photos" ":src"="i")
</template>

<script setup lang="ts">

const props = defineProps<{
    photos: string[]
}>()

const carouselRef = ref()
let scrollingTimeout: any;

const calculateCarousel = () => {
    const carouselEl = ref(document.getElementsByTagName('img')?.[0])
    console.log(carouselEl.value)

    if(carouselEl.value) {
        carouselRef.value.addEventListener('scroll', () => {
            clearTimeout(scrollingTimeout);

            scrollingTimeout = setTimeout(() => {
                // Определяем, на каком элементе карусели остановился скролл
                const scrollPosition = carouselRef.value.scrollLeft;
                const itemWidth = carouselEl.value.offsetWidth; // Ширина каждого элемента карусели
                const centeredItemIndex = Math.round(scrollPosition / itemWidth);

                // Вычисляем новую позицию скролла для центрирования выбранного элемента
                const newScrollPosition = centeredItemIndex * itemWidth;

                // Анимируем прокрутку к новой позиции
                carouselRef.value.scrollTo({
                    left: newScrollPosition,
                    behavior: 'smooth' // Для плавной анимации
                });
            }, 200)
        })
    }
}

defineExpose({calculateCarousel})

</script>

<style scoped lang="scss">
.carousel {
    display: flex;
    overflow-x: auto;

    img {
        min-width: 100%;
        height: 200px;
        border-radius: 20px;
    }
}
</style>
