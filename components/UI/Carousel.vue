<template lang="jade">
.carousel(ref="carouselRef")
    .loader-wrapper(v-for="i in loaders" style="height: 200px;").flex.j-center.a-center
        .loader
    img(v-for="i in photos" ref="imgRefV").hidden
</template>

<script setup lang="ts">

const props = defineProps<{
    photos: string[]
}>()

const loaders = ref<number[]>([])
const imgRefV = ref()
const carouselRef = ref()
let scrollingTimeout: any;

const loadImgWithFetch = (img_url: string, index: number) => {
    fetch(img_url)
        .then(response => {
            loaders.value.push(1)
            return response.blob();
        })
        .then(blob => {
            loaders.value.pop()
            imgRefV.value[index].src = URL.createObjectURL(blob);
            imgRefV.value[index].classList.remove('hidden')
        })
        .catch(error => console.error('Failed to load image:', error));
}

const calculateCarousel = () => {
    const carouselEl = ref(document.getElementsByTagName('img')?.[0])

    if(carouselEl.value) {
        for(let i = 0; i < props.photos.length; i++) {
            loadImgWithFetch(props.photos[i], i)
        }

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

    .loader-wrapper {
        height: 200px;
        min-width: 100%;
    }
}

.hidden {
    visibility: hidden;
}
</style>
