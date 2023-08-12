<template>
    <div style="position: relative; width: 100%; height: 100%">
        <div id="map" class="map"></div>
        <div v-if="selectedMapCard !== -1" class="field-map-card">
            <div class="info">
                <img src="/cover.png" alt="field" />
                <div class="description">
                    <h4>{{ fieldData?.[selectedMapCard]?.field?.name }}</h4>
                    <p>{{ fieldData?.[selectedMapCard]?.field?.text }}</p>
                </div>
            </div>
            <hr />
            <div class="price-block">
                <h3>Стоимость аренды:</h3>
                <p>{{ fieldData?.[selectedMapCard]?.coast }} ₸</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";

const props = defineProps({
    fieldData: Array
})

const selectedMapCard = ref(-1)
const map = ref(null)
const layerGroup = ref(null)

onMounted(async () => {
    const L = await import('leaflet/dist/leaflet')

    const icon = L.icon({
        iconUrl: '/images/marker.svg',
        iconSize: [20, 20],
    })

    map.value = L.map('map').setView(props.fieldData?.[0]?.lat ? [props.fieldData?.[0].lat, props.fieldData?.[0].lng] : [43.23, 76.9], 14)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
    layerGroup.value = L.layerGroup().addTo(map.value)

    map.value.on('click', (e) => {
        console.log(e)
        selectedMapCard.value = -1
    })

    const ll = document.getElementsByClassName('leaflet-control-attribution leaflet-control')
    if(ll?.[0]) {
        ll[0].style.display = 'none'
    }

    if(props.fieldData) {
        for(const [index, i] of props.fieldData.entries()) {
            if(i?.lat && i?.lng) {
                const l_marker = L.marker([i.lat, i.lng], {icon: icon}).addTo(layerGroup.value);
                l_marker.on('click', (e) => {
                    console.log('marker', e, props.marker)
                    selectedMapCard.value = index
                })
            }
        }
    }
})
</script>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;

    &:deep(.leaflet-bottom.leaflet-right) {
        display: none !important;
    }
}

.field-map-card {
    position: absolute;
    bottom: 20px;

    display: flex;
    flex-direction: column;
    gap: 11px;
    width: calc(100% - 60px);
    z-index: 1234;
    border-radius: 22px;
    padding: 15px;
    margin: 0 30px;
    background: #3A3A3A;
    backdrop-filter: blur(20px);
    color: white;

    hr {
        border: none;
        border-top: 1px solid #666;
    }

    .info {
        display: flex;
        gap: 15px;

        img {
            width: 72px;
            height: 72px;
            border-radius: 20px;
            object-fit: cover;
        }

        .description {
            display: flex;
            flex-direction: column;
            gap: 6px;

            h4 {
                font-feature-settings: 'clig' off, 'liga' off;
                font-size: 15px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
            }
            p {
                font-feature-settings: 'clig' off, 'liga' off;
                font-size: 11px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }
    }

    .price-block {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        p {
            color: $green1;
            text-align: right;
            font-feature-settings: 'clig' off, 'liga' off;
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
        }
    }
}
</style>
