<template>
    <div class="offer-card">
       <div class="info">
           <div class="left">
               <h3>Новая игра на Шевченко</h3>
               <p>Бронируйте поля заранее!</p>
           </div>
           <div class="right">
               <img src="/icons/offer-card-image.svg" alt="" />
           </div>
       </div>
        <div class="dots">
            <span v-for="dot in ids" :key="dot" class="dot" :class="{active: curr_id === dot}" @click="curr_id=dot" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    ids: number[]
}>()

const curr_id = ref(0)

</script>

<style scoped lang="scss">
.offer-card {
    width: 300px;
    height: 115px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    overflow: hidden;

    background-image: url("/sample.png");
    background-size: cover;

    .info {
        display: flex;
        gap: 16px;
        h3 {
            font-size: 15px;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 0;
            text-align: left;
        }

        p {
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: 0;
            text-align: left;
        }

        .left {
            display: flex;
            flex-direction: column;
            gap: 6px;
            white-space: nowrap;
        }

        .right {
            img {
                width: 60px;
                height: 60px;
            }
        }
    }

    .dots {
        display: flex;
        justify-content: center;
        gap: 16px;

        .dot {
            background: white;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            cursor: pointer;

            &.active {
                background: $green-1;
            }
        }
    }
}
</style>
