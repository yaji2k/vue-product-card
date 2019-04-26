<template>
  <v-layout justify-center="true">
    <v-flex sm4 xs11>
      <template v-if="product">
        <v-card>
          <v-layout row>
            <v-flex align-self-center>
              <h2>{{product.title}}</h2>
            </v-flex>
            <v-flex text-sm-left>
              <v-card-text>
                <strong>количество:</strong>
                {{product.amount}}
              </v-card-text>
              <v-card-text>
                <strong>стоимтось:</strong>
                {{product.price}}
              </v-card-text>
            </v-flex>
            <v-flex shrink>
              <v-layout column class="absolute" v-if="isAdmin">
                <v-icon class="btn" @click="deleteProduct(product)">delete</v-icon>
                <v-icon class="mt-3 btn">edit</v-icon>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </template>
      <template v-else>
        <v-card>
          <v-layout row>
            <v-flex align-self-center>
              <h2 class="my-4">Product not found</h2>
            </v-flex>
          </v-layout>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loadCompleted: false
    };
  },
  props: ["id"],
  computed: {
    ...mapState("products", ["product"]),
    ...mapGetters("auth", ["isAdmin"])
  },
  methods: {
    ...mapActions("products", ["getProduct", "deleteProduct"])
  },
  beforeMount() {
    this.loadCompleted = false;
    this.getProduct(this.id).then(() => {
      this.loadCompleted = true;
    });
  }
};
</script>

<style scoped>
.absolute {
  top: 15%;
  right: 2%;
  position: absolute;
}
.btn {
  cursor: pointer;
}
.btn:hover {
  color: #333;
}
</style>


