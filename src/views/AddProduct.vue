<template>
  <v-container>
    <v-layout justify-center>
      <v-flex sm4>
        <Panel>
          <v-layout column wrap class="mt-4">
            <v-flex class="mt-4">
              <v-text-field placeholder="product name"></v-text-field>
            </v-flex>
            <v-flex class="mt-4">
              <v-layout row justify-space-around>
                <v-flex xs2>
                  <v-text-field placeholder="price"></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field placeholder="amount"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs4 class="text-xs-center mt-4">
              <v-btn color="green" small dark>
                <v-icon class="mr-2">add_circle</v-icon>Add Product
              </v-btn>
            </v-flex>
          </v-layout>
        </Panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import Projects from "@/components/Projects.vue";
// import Tasks from "@/components/Tasks.vue";
import { mapGetters, mapState } from "vuex";
// import router from "../router";

export default {
  beforeMount() {
    if(!this.isAdmin) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters("auth", ["isAdmin",]),
  }
};
</script>

<style>
</style>

