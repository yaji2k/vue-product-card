<template>
  <v-container>
    <v-layout justify-center>
      <v-flex sm4>
        <Panel>
          <v-layout column wrap class="mt-4">
            <v-flex class="mt-4">
              <v-text-field
                placeholder="product name"
                label="product name"
                :value="newProduct.title"
                @input="inputValue('title', $event)"
              ></v-text-field>
            </v-flex>
            <v-flex class="mt-4">
              <v-layout row justify-space-around>
                <v-flex xs2>
                  <v-text-field
                    placeholder="price"
                    label="price"
                    :value="newProduct.price"
                    @input="inputValue('price', $event)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    placeholder="amount"
                    label="amount"
                    :value="newProduct.amount"
                    @input="inputValue('amount', $event)"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs4 class="text-xs-center mt-4">
              <v-btn color="green" small dark @click="pushNewProduct">
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
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  beforeMount() {
    if (!this.isAdmin) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters("auth", ["isAdmin"]),
    ...mapState("products", ["newProduct"])
  },
  methods: {
    ...mapMutations("products", ["setNewProduct"]),
    ...mapActions("products", ["pushNewProduct"]),
    inputValue(name, value) {
      this.setNewProduct({
        name,
        value
      });
    }
  }
};
</script>

<style>
</style>

