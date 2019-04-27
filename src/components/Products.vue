<template>
  <v-container grid-list-md>
    <v-layout v-if="isLoggedIn">
      <v-flex xs12 md2>
        <v-btn-toggle mandatory>
          <v-btn class="btn" @click="runSortProducts(key)" v-for="(item, key) in filter" :key="key">
            {{ item.name }}
            <template v-if="key === isACtive">
              <v-icon small v-if="arrowUp">arrow_upward</v-icon>
              <v-icon small v-else>arrow_downward</v-icon>
            </template>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex v-for="product in products" :key="product.id" xs12 md3>
        <v-item-group>
          <v-item>
            <v-card @click="pushPage(product.id)">
              <h2 class="py-3">{{ product.title }}</h2>
              <p class="pb-3">price: {{ product.price }}</p>
            </v-card>
          </v-item>
        </v-item-group>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      isACtive: 0,
      arrowUp: true
    };
  },
  computed: {
    ...mapState("products", ["products", "filter"]),
    ...mapGetters("auth", ["isLoggedIn",]),
  },
  methods: {
    ...mapMutations("products", ["sortProducts"]),
    ...mapActions("products", ["getProducts"]),
    pushPage(userId) {
      let id = userId;
      this.$router.push({ name: "product", params: { id } });
    },
    runSortProducts(key) {
      let reverse = false;
      if (this.isACtive == key) {
        reverse = true;
        this.arrowUp = !this.arrowUp;
      } else {
        this.arrowUp = true;
      }

      this.isACtive = key;
      this.sortProducts({ key, reverse });
    }
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
.btn {
  /* font-size: 10px; */
  min-width: 70px;
  text-transform: none;
  text-align: left;
}
</style>


