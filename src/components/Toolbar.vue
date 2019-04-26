<template>
  <v-toolbar color="green" dark fixed>
    <v-toolbar-title class="mr-4" to="/">Product card</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">
        <v-icon class="mr-2">shop</v-icon>Products
      </v-btn>
      <v-btn flat v-if="isAdmin" to="/add-product">
        <v-icon class="mr-2">add_circle</v-icon>Add Product
      </v-btn>
      <v-btn flat to="/register" v-if="!isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>Register
      </v-btn>
      <v-btn flat v-if="!isLoggedIn" to="/login">
        <v-icon class="mr-2">fingerprint</v-icon>Login
      </v-btn>
      <v-btn flat v-if="isLoggedIn" @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "isAdmin"])
  },
  methods: {
    ...mapActions("auth", ["logout"])
  }
};
</script>

