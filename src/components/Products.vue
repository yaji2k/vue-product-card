<template>
  <v-item-group>
    <v-container grid-list-md>
      <v-layout wrap justify-center>
        <v-flex v-for="product in products" :key="product.id" xs12 md2>
          <v-item>
            <v-card @click="pushPage(product.id)">
              <p>{{ product.title }}</p>
              <p>{{ product.price }}</p>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("products", ["products"])
  },
  methods: {
    ...mapActions("products", ["getProducts"]),
    pushPage(userId) {
      let id = userId;
      this.$router.push({ name: 'product', params: { id } })
    },
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style scoped>
  p {
    margin: 0;
  }
</style>


