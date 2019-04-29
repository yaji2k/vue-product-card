<template>
  <v-card class="mt-2">
    <slot></slot>
    <div>
        <div v-for="comment in comments" :key="comment.id">
            <span>{{comment.comment}}</span> <span>{{comment.rate}}</span>
        </div>
    </div>
  </v-card>
</template>

<script>
export default {
    props:["comments"],
};
</script>
