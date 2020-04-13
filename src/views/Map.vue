<template>
  <l-map
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-circle v-for="area in areas" :key="area.country" :lat-lng="area.center" :radius="area.radius" :color="area.color"></l-circle>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LCircle } from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LCircle
  },
  data: () => ({
    zoom: 3,
    center: [47.41322, -1.219482],
    bounds: null,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    areas: [],
    countries: [],
    load: false,
  }),
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    async covidArea() {
        await this.$http.get('v2/jhucsse').then(response => {
            let res = response.data
            this.countries = res
            res.forEach(el => {
                this.areas.push({
                    center: [el.coordinates.latitude, el.coordinates.longitude],
                    radius: 4500,
                    color: 'red'
                })
            })
        })
    }
  },
  async created () {
      this.load = true
      await this.covidArea()
      this.load = false
  }
};
</script>