<template>
  <v-layout justify-center="true">
    <v-flex sm5 xs11>
      <template v-if="loadCompleted">
        <v-card>
          <v-layout row>
            <v-flex>
              <h2>{{product.title}}</h2>
              <v-card-text>
                <strong>количество:</strong>
                {{product.amount}}
              </v-card-text>
              <v-card-text>
                <strong>стоимтось:</strong>
                {{product.price}}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      loadCompleted: false
    };
  },
  props: ["id"],
  computed: {
    ...mapState("products", ["product"])
  },
  methods: {
    ...mapActions("products", ["getProduct"])
  },
  beforeMount() {
    this.loadCompleted = false;
    this.getProduct(this.id).then(() => {
      this.loadCompleted = true;
    });
  }
};
</script>

