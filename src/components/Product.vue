<template>
  <Panel>
    <v-toolbar-title>
      id:{{id}}
    </v-toolbar-title>

  </Panel>
</template>

<script>
// import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: ['id'],
  computed: {
    // ...mapState("products", ["products"])
  },
  methods: {
    // ...mapActions("products", ["getProducts"])
  },
  mounted() {
    // this.getProducts();
  }
};
</script>

