<template>
  <div>
    <v-layout justify-center>
      <v-flex xs11 class="mt-4">
        <v-layout column>
          <v-flex>
            <v-textarea
              outline
              rows="4"
              name="input-7-4"
              label="send your comment"
              color="green"
              :value="newComment.comment"
              @input="onInput('comment', $event)"
            ></v-textarea>
          </v-flex>
          <v-flex>
            <v-layout wrap>
              <v-flex xs12 md5>
                <v-rating
                  :value="newComment.rate"
                  @input="onInput('rate', $event)"
                  background-color="orange"
                  color="orange"
                ></v-rating>
              </v-flex>
              <v-flex xs12 md3 offset-xs0 offset-md4>
                <v-btn color="green" dark @click="$emit('addComment')">send</v-btn>
              </v-flex>
            </v-layout>
            <v-alert type="error" :value="CommitError">{{ CommitError }}</v-alert>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ["newComment", "CommitError"],
  methods: {
    onInput(name, event) {
      this.$emit("onInput", {
        [name]: event
      });
    }
  }
};
</script>

