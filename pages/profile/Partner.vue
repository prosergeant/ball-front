<template lang="jade">
UINavigation(title="Стать партнером" go-to="/profile/" padding-x="20" )
.partner-page
    h2 Чтобы стать партнером необходимо:

    .block
        p Рассказать нам об объекте
        span
            | Заполните анкету указав характеристики Ваших
            | площадок, например место расположения, вид спорта, тип покрытия, размер площадки и прочее.

    .block
        p Яркая и заметная страница
        span Добавьте до 5 фотографий, можете придумать запоминающиеся название для Вашей площадки, например "Поле Камп Hov"

    .block
        p Размещайте объявление
        span
            | Укажите длительность и стоимость броней ваших площадок. После заполнения активируйте вашу площадку и готовьтесь встречать посетителей.
            | Больше никаких уточняющих звонков

    UIButton(style="width: 100%; justify-content: center; margin-top: auto;") Стать партнером
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.partner-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
    padding: 20px 20px;
    height: calc(100dvh - 30px);

    h2 {
        max-width: 80%;
    }

    .block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0 0 6px 0;

        p {
            font-weight: 600;
        }
        span {
            font-size: 14px;
            font-weight: 400;
            padding: 0 12px;
        }
    }
}
</style>
