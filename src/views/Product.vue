<template>
  <v-layout justify-center>
    <v-flex lg4 md5 sm6 xs11>
      <template v-if="product">
        <Product :product="product"
                  :isAdmin="isAdmin"
                  :rating="getRating"
                  @input="inputProduct($event)"
                  @delete="deleteProduct($event)"
                  @edit="setEditMode($event)"
                  @update="updateProduct($event)"
                  />
        <Comments :comments="comments" :isAdmin="isAdmin" @onDelete="deleteComment($event)">
          <AddComment
            :CommitError="CommitError"
            :newComment="newComment"
            @onInput="editNewC($event)"
            @addComment="addComment"
            v-if="isLoggedIn"
          />
        </Comments>
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
import Comments from "@/components/Comments.vue";
import AddComment from "@/components/AddComment.vue";
import Product from "@/components/Product.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Comments,
    AddComment,
    Product,
  },
  data() {
    return {
      loadCompleted: false
    };
  },
  props: ["id"],
  computed: {
    ...mapState("products", ["product"]),
    ...mapState("comments", ["comments", "newComment", "CommitError"]),
    ...mapGetters("auth", ["isAdmin", "isLoggedIn"]),
    getRating() {
      let sum = 0;
      let count = 0;
      this.comments.forEach(element => {
        if(element.rate) {
          sum +=element.rate;
          count++;
        }
      });
      return sum/count;
    }
  },
  methods: {
    ...mapActions("products", ["getProduct", "deleteProduct", "updateProduct"]),
    ...mapActions("comments", ["getComments", "addComment", "deleteComment"]),
    ...mapMutations("products", [
      "setEditMode",
      "unsetEditMode",
      "editProduct"
    ]),
    ...mapMutations("comments", ["editNewComment"]),
    inputProduct(event) {
      const { name, value } = event;
      this.editProduct({
        name,
        value
      });
    },
    editNewC(event) {
      this.editNewComment(event);
    }
  },
  beforeMount() {
    // this.loadCompleted = false;
    this.getProduct(this.id).then(() => {
      this.getComments();
      // this.loadCompleted = true;
    });
  }
};
</script>

<style scoped>
</style>


