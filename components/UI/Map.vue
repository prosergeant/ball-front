<template>
    <div id="map" class="map"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
const map = ref(null)
const layerGroup = ref(null)

onMounted(async () => {
    const L = await import('leaflet/dist/leaflet')

    const icon = L.icon({
        iconUrl: '/images/marker.svg',
        iconSize: [20, 20],
    })

    map.value = L.map('map').setView([43.23, 76.9], 14)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
    layerGroup.value = L.layerGroup().addTo(map.value)

    map.value.on('click', (e) => {
        console.log(e)
    })

    const ll = document.getElementsByClassName('leaflet-control-attribution leaflet-control')
    if(ll?.[0]) {
        ll[0].style.display = 'none'
    }

    const marker = L.marker([43.23, 76.9], {icon: icon}).addTo(layerGroup.value);
    marker.on('click', (e) => {
        console.log('marker', e.latlng)
    })
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
</style>