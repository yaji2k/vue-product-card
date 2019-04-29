<template>
  <v-card class="mt-2 pb-1">
    <slot></slot>
    <div class="font-weight-bold text-xs-left ma-4">Comments:</div>

    <div v-for="comment in comments" :key="comment.id">
      <v-card class="ma-4">
        <v-card-text class="text-xs-left">{{comment.comment}}</v-card-text>
        <v-icon class="icon" small v-if="isAdmin" @click="onDelete(comment.id)">delete</v-icon>
        <v-layout wrap>
          <v-flex xs11 md6>
            <v-card-text class="font-weight-bold text-xs-left">{{comment.user.username}}</v-card-text>
          </v-flex>
          <v-flex xs11 md6>
            <v-card-text class="text-xs-left text-md-right">
              <span v-for="rate in comment.rate" :key="rate">
                <v-icon small color="orange">star</v-icon>
              </span>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["comments", "isAdmin"],
  methods: {
      onDelete(id) {
          this.$emit("onDelete", id);
      }
  }
};
</script>
<style scoped>
    .icon {
        position: absolute;
        top: 8%;
        right: 1%;
        cursor: pointer;
    }
    .icon:hover {
        color: #333;
    }
</style>

