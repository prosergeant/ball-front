<template>
    <div class="mini-navigation-block">
        <div class="mini-navigation" @click="$router.push(`/`)">
            <UIIcon icon="chevron-left" color="white" />
            <p>Kifs на Шевченко игра в футболл</p>
        </div>
        <UIIcon icon="search" color="white" />
    </div>
    <div class="object-info">
        <span>активна</span>
        <h3>Kifs на Шевченко игра в футболл</h3>
    </div>
    <div class="object-content">
        <h4>Подробное описание локации</h4>
        <p>Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Vel quam elementum pulvinar etiamnim lobortis scelerisque. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur....</p>
        <span>Show more</span>
        <hr />
        <h4>Смотреть поля на карте</h4>
        <img src="/sample-map.png" alt="map" />
        <h4>Адрес</h4>
        <div class="address">
            <h4>Байзакова 280</h4>
            <p>г. Алматы</p>
        </div>
        <UIButton @click="$router.push('boocking')">Забронировать</UIButton>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.mini-navigation-block {
    display: flex;
    align-items: center;
    gap: 20px;

    i {
        width: 22px;
        height: 22px;
    }

    .mini-navigation {
        height: 40px;
        width: 335px;
        padding: 10px 25px 10px 25px;
        display: flex;
        align-items: center;
        gap: 20px;

        i {
            width: 11px;
            height: 12px;
        }

        p {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            color: $light;
        }
    }
}
.object-info {
    height: 334px;
    width: 100%;
    max-width: 420px;

    display: flex;
    flex-direction: column-reverse;
    padding: 0 44px 44px 29px;
    gap: 17px;

    h3 {
        font-size: 24px;
        font-weight: 700;
        line-height: 31px;
        color: $light;
    }

    span {
        width: fit-content;
        height: 30px;
        padding: 12px;
        border-radius: 30px;
        background: $green-1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $light;

        font-size: 10px;
        font-weight: 400;
        line-height: 13px;

    }
}
.object-content {
    background: white;
    min-height: 334px;
    width: 100%;
    max-width: 420px;
    position: relative;
    padding: 0 33px 31px 26px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &::before {
        position: absolute;
        content: '';
        background: white;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        top: -19px;
        left: 0;
        height: 20px;
        width: 100%;
    }

    h4 {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0;
        text-align: left;
        color: $light3;
    }

    p {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0;
        text-align: left;

    }

    span {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0;
        text-align: left;
        color: $primary;
    }

    hr {
        border-top: 1px solid $grey-300;
    }

    img {
        height: 158px;
        width: 100%;
    }

    .address {
        display: flex;
        flex-direction: column;
        gap: 6px;
        border-radius: 20px;
        background: $light2;
        padding: 15px 18px;

        h4 {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            text-align: left;
        }

        p {
            font-size: 10px;
            font-weight: 400;
            line-height: 13px;
            color: $light3;
        }
    }

    .btn {
        width: 100%;
        height: 46px;
        margin-top: 34px;
    }
}

</style>
