<template>
  <v-container class="m-top">
    <v-layout>
      <v-flex xs11>
        <Products/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Products from "@/components/Products.vue";
import Product from "@/components/Product.vue";

export default {
  components: {
    Products,
    Product
  }
};
</script>

<style>
</style>

