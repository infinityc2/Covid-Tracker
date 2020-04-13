<template>
  <v-app>
    <v-navigation-drawer app v-model="navbar" :mini-variant.sync="mini">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-list-item-title></v-list-item-title>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon v-if="!mini">mdi-chevron-left</v-icon>
            <v-icon v-else>mdi-chevron-right</v-icon>
          </v-btn> 
        </v-list-item-avatar>
        <v-list-item-title>Covid Tracker</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list rounded nav dense>
        <v-list-item to="/" link color="primary">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/summary" link color="primary">
          <v-list-item-icon>
            <v-icon>mdi-monitor</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Summary</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/map" link color="primary">
          <v-list-item-icon>
            <v-icon>mdi-map</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Map</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="navbar = !navbar"></v-app-bar-nav-icon>
      <v-toolbar-title>Covid Tracker</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    navbar: false,
    mini: false
  })
};
</script>