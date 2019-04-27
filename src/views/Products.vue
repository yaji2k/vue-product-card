<template>
  <v-container class="m-top">
    <v-layout justify-center="">
      <v-flex xs10 >
        <Products/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Products from "@/components/Products.vue";

export default {
  components: {
    Products,
  }
};
</script>

<style>
  
</style>

