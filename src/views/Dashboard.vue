<template>
  <v-container fluid>
    <v-row dense>
      <v-col md="4" sm="4" lg="3" xl="3">
        <v-card class="yellow lighten-1">
          <v-card-text>
            <v-toolbar-title class="black--text">Cases</v-toolbar-title>
            <p class="subtitle-1 black--text" v-if="!load">{{ data.cases }}</p>
            <v-progress-circular indeterminate color="blue-grey" v-else></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" sm="4" lg="3" xl="3">
        <v-card class="red lighten-1">
          <v-card-text>
            <v-toolbar-title class="white--text">Deaths</v-toolbar-title>
            <p class="subtitle-1 white--text" v-if="!load">{{ data.deaths }}</p>
            <v-progress-circular indeterminate color="blue-grey" v-else></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" sm="4" lg="3" xl="3">
        <v-card class="cyan lighten-1">
          <v-card-text>
            <v-toolbar-title class="white--text">Recovered</v-toolbar-title>
            <p class="subtitle-1 white--text" v-if="!load">{{ data.recovered }}</p>
            <v-progress-circular indeterminate color="blue-grey" v-else></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="12" sm="12" lg="3" xl="3" cols="12">
        <v-card class="light-green accent-2">
          <v-card-text>
            <v-toolbar-title class="black--text">Updated</v-toolbar-title>
            <p
              class="subtitle-1 black--text"
              v-if="!load"
            >{{ new Date(data.updated).toUTCString() }}</p>
            <v-progress-circular indeterminate color="blue-grey" v-else></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card :loading="lineChartLoad">
          <v-card-title>
            Summary Country
            <v-spacer />
          </v-card-title>
          <line-chart :data="dateSum" :options="options" v-if="!lineChartLoad" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" sm="12">
        <v-card :loading="barChartLoad">
          <v-card-title>
            Summary State
            <v-spacer />
            <v-autocomplete
              label="State"
              :items="dataStates"
              item-text="state"
              @change="getChartState"
              item-value="state"
              v-model="searchState"
            ></v-autocomplete>
          </v-card-title>
          <bar-chart :options="options" :data="chartState" v-if="!barChartLoad"></bar-chart>
        </v-card>
      </v-col>
      <v-col lg="6" sm="12">
        <v-card>
          <v-card-title>
            State Case
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="dataStates"
            :search="search"
            dense
            multi-sort
            :loading="load"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChart from "@/components/Bar.js";
import LineChart from "@/components/Line.js";

export default {
  components: {
    BarChart,
    LineChart
  },
  data: () => ({
    data: null,
    dataStates: [],
    chartState: null,
    dateSum: null,
    states: [],
    headers: [
      {
        text: "state",
        value: "state"
      },
      {
        text: "cases",
        value: "cases"
      },
      {
        text: "today cases",
        value: "todayCases"
      },
      {
        text: "deaths",
        value: "deaths"
      },
      {
        text: "today deaths",
        value: "todayDeaths"
      },
      {
        text: "active",
        value: "active"
      },
      {
        text: "tests",
        value: "tests"
      },
      {
        text: "tests per 1M",
        value: "testsPerOneMillion"
      }
    ],
    search: "",
    searchState: "",
    load: false,
    barChartLoad: false,
    lineChartLoad: false
  }),
  methods: {
    async getCovidToday() {
      await this.$http.get("all").then(response => {
        this.data = response.data;
      });
    },
    async getCovidStates() {
      await this.$http.get("states").then(response => {
        this.dataStates = response.data;
      });
    },
    async getChartState() {
      this.barChartLoad = true;
      if (this.searchState === "") this.searchState = "New York";
      await this.$http.get(`states/${this.searchState}`).then(response => {
        let res = response.data;
        this.chartState = {
          labels: [
            "cases",
            "today cases",
            "deaths",
            "today deaths",
            "active",
            "tests",
            "tests per 1m"
          ],
          datasets: [
            {
              label: res.state,
              backgroundColor: this.colorHex,
              data: [
                res.cases,
                res.todayCases,
                res.deaths,
                res.todayDeaths,
                res.active,
                res.tests,
                res.testsPerOneMillion
              ]
            }
          ]
        };
      });

      this.barChartLoad = false;
    },
    async getTimelineCovid() {
      this.lineChartLoad = true;
      await this.$http.get("v2/historical/all").then(response => {
        let res = response.data;
        let datasets = [];
        let caseLabel = Object.keys(res.cases);
        datasets.push({
          label: "cases",
          data: Object.values(res.cases),
          backgroundColor: '#FFF9C4'
        });
        datasets.push({
          label: "deaths",
          data: Object.values(res.deaths),
          backgroundColor: '#F44336'
        });
        datasets.push({
          label: "recovered",
          data: Object.values(res.recovered),
          backgroundColor: '#BBDEFB'
        });
        this.dateSum = {
          labels: caseLabel,
          datasets: datasets,
        };
      });
      this.lineChartLoad = false;
    }
  },
  async created() {
    this.load = true;
    await this.getCovidToday();
    await this.getCovidStates();
    await this.getChartState();
    await this.getTimelineCovid();
    this.load = false;
  },
  computed: {
    colorHex() {
      return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
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