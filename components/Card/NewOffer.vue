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
    min-height: 195px;
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
            color: #FFF;
            font-size: 22px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
        }

        p {
            color: #FFF;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            margin-bottom: 8px;
        }

        .btn {
            width: 100%;
            padding: 8px 20px;
            border-radius: 32px;
            color: black;
            font-size: 13px;
            border: 2px solid var(--gray-m, #CCD2E3);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
            background: $green1;
            margin-bottom: 8px;
            display: flex;
            justify-content: center;
        }
    }

    .dots {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;

        .dot {
            background: white;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            cursor: pointer;

            &.active {
                background: $green1;
                width: 10px;
                height: 10px;
            }
        }
    }
}
</style>
