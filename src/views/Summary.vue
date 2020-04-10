<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Countries
              <v-spacer />
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="datas" :search="search" :loading="load">
              <template v-slot:item.countryInfo.flag="{ item }">
                <v-avatar :size="36">
                  <v-img :src="item.countryInfo.flag"></v-img>
                </v-avatar>
              </template>
              <template v-slot:item.details="{ item }">
                  <details-dialog :country="item.country" />
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import DetailsDialog from '@/components/Details'

export default {
    components: {
        DetailsDialog
    },
  data: () => ({
    datas: [],
    load: false,
    search: "",
    headers: [
      {
        text: "Flag",
        value: "countryInfo.flag"
      },
      {
        text: "Country",
        value: "country"
      },
      {
        text: "Cases",
        value: "cases"
      },
      {
        text: "Deaths",
        value: "deaths"
      },
      {
        text: "Recovered",
        value: "recovered"
      },
      {
        text: "Critical",
        value: "critical"
      },
      {
        text: "Details",
        value: 'details'
      }
    ]
  }),
  methods: {
    async getCountries() {
      await this.$http.get("countries").then(response => {
        this.datas = response.data;
      });
    }
  },
  async created() {
    this.load = true;
    await this.getCountries();
    this.load = false;
  }
};
</script>