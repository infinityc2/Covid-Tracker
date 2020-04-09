<template>
  <v-container fluid>
    <v-row>
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

      <v-col md="12" sm="12" lg="3" xl="3">
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
      <v-col lg="6">
        <v-card>
          <bar-chart :options="options"></bar-chart>
        </v-card>
      </v-col>
      <v-col lg="6">
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

export default {
  components: {
    BarChart
  },
  data: () => ({
    data: null,
    dataStates: [],
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
    load: false
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
    }
  },
  async created() {
    this.load = true;
    await this.getCovidToday();
    await this.getCovidStates();
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