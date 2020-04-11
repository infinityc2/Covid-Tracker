<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col lg="6">
          <v-card :loading="load">
            <v-card-title>
              Countries Cases
            </v-card-title>
            <bar-chart :data="dataChartCases" v-if="!barChartLoad" :options="options" />
          </v-card>
        </v-col>
        <v-col lg="6">
          <v-card :loading="load">
            <v-card-title>
              Countries Deaths
            </v-card-title>
            <bar-chart :data="dataChartDeaths" v-if="!barChartLoad" :options="options" />
          </v-card>
        </v-col>
        <v-col lg="6">
          <v-card :loading="load">
            <v-card-title>
              Countries Recovered
            </v-card-title>
            <bar-chart :data="dataChartRecovered" v-if="!barChartLoad" :options="options" />
          </v-card>
        </v-col>
        <v-col lg="6">
          <v-card :loading="load">
            <v-card-title>
              Countries Critical
            </v-card-title>
            <bar-chart :data="dataChartCritical" v-if="!barChartLoad" :options="options" />
          </v-card>
        </v-col>
        <v-col lg="12">
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
              <template v-slot:item.details="{ }"></template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import BarChart from "@/components/Bar.js";

export default {
  components: {
    BarChart
  },

  data: () => ({
    datas: [],
    dataChartCases: null,
    dataChartDeaths: null,
    dataChartRecovered: null,
    dataChartCritical: null,
    load: false,
    barChartLoad: false,
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
        value: "details"
      }
    ]
  }),
  async created() {
    this.load = true;
    await this.getCountries();
    await this.getChartCountriesCases();
    await this.getChartCountriesDeaths();
    await this.getChartCountriesRecovered();
    await this.getChartCountriesCritical();
    this.load = false;
  },
  methods: {
    async getCountries() {
      await this.$http.get("countries").then(response => {
        this.datas = response.data;
      });
    },
    async getChartCountriesCases() {
      this.barChartLoad = true;
      await this.$http.get("countries").then(response => {
        let res = response.data;
        let datasets = [];
        let data = []
        let labels = []
        res.forEach(r => {
          labels.push(r.country)
          data.push(r.cases)
        });
        datasets.push({
          data: data,
          backgroundColor: '#F44336'
        })
        this.dataChartCases = {
          labels: labels,
          datasets: datasets
        };
      });
      this.barChartLoad = false;
    },
    async getChartCountriesDeaths() {
      this.barChartLoad = true;
      await this.$http.get("countries").then(response => {
        let res = response.data;
        let datasets = [];
        let data = []
        let labels = []
        res.forEach(r => {
          labels.push(r.country)
          data.push(r.deaths)
        });
        datasets.push({
          data: data,
          backgroundColor: '#F44336'
        })
        this.dataChartDeaths = {
          labels: labels,
          datasets: datasets
        };
      });
      this.barChartLoad = false;
    },
    async getChartCountriesRecovered() {
      this.barChartLoad = true;
      await this.$http.get("countries").then(response => {
        let res = response.data;
        let datasets = [];
        let data = []
        let labels = []
        res.forEach(r => {
          labels.push(r.country)
          data.push(r.recovered)
        });
        datasets.push({
          data: data,
          backgroundColor: '#F44336'
        })
        this.dataChartRecovered = {
          labels: labels,
          datasets: datasets
        };
      });
      this.barChartLoad = false;
    },
    async getChartCountriesCritical() {
      this.barChartLoad = true;
      await this.$http.get("countries").then(response => {
        let res = response.data;
        let datasets = [];
        let data = []
        let labels = []
        res.forEach(r => {
          labels.push(r.country)
          data.push(r.critical)
        });
        datasets.push({
          data: data,
          backgroundColor: '#F44336'
        })
        this.dataChartCritical = {
          labels: labels,
          datasets: datasets
        };
      });
      this.barChartLoad = false;
    }
  },
  computed: {
    options() {
      return {
        responsive: true,
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        title: {
          display: false,
          text: "Covid in State",
          fontSize: 20
        },
        legend: {
          position: "right",
          align: "start",
          display: false
        },
        maintainAspectRatio: false
      };
    }
  }
};
</script>