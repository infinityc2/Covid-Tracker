<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="secondary" fab x-small dark v-on="on">
        <v-icon>mdi-television</v-icon>
      </v-btn>
    </template>
    <v-card :loading="load">
      <v-toolbar color="primary">
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ country }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col>
            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
              <v-card-title>
                <v-icon class="mr-12" size="64">mdi-heart-pulse</v-icon>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ data.cases }}</v-list-item-title>
                    <v-list-item-subtitle>Cases</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-spacer></v-spacer>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    data: null,
    dataChart: null,
    load: false
  }),
  props: {
    country: {
      type: String,
      required: true
    }
  },
  methods: {
    async getData() {
      await this.$http.get(`countries/${this.country}`).then(response => {
        this.data = response.data;
      });
    }
  },
  async created() {
    this.load = true;
    await this.getData();
    this.load = false;
  }
};
</script>