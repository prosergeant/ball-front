<template>
    <div class="offer-card">
       <div class="info">
           <h2>Новая игра на Шевченко!</h2>
           <p>Бронируте поля заранее, просим вас учитывать сезональность</p>
           <UIButton>Посмотреть все поля</UIButton>

           <div class="dots">
               <span v-for="dot in ids" :key="dot" class="dot" :class="{active: curr_id === dot}" @click="curr_id=dot" />
           </div>
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
    //width: 319px;
    height: 195px;
    padding: 22px 17px 16px 24px;
    display: flex;
    flex-direction: column;

    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(20px);

    .info {
        display: flex;
        flex-direction: column;
        gap: 10px;

        h2 {
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

            margin-bottom: 8px;
        }

        .btn {
            width: 100%;
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
