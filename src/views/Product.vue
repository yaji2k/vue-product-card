<template>
  <v-layout justify-center>
    <v-flex lg4 md5 sm6 xs11>
      <template v-if="product">
        <v-card>
          <v-layout row>
            <v-flex align-self-center xs5>
              <h2>
                <span v-if="!product.isEditMode">{{product.title}}</span>
                <v-text-field
                  class="input"
                  :value="product.title"
                  v-if="product.isEditMode"
                  @input="inputProduct('title', $event)"
                ></v-text-field>
              </h2>
            </v-flex>
            <v-flex text-sm-left>
              <v-card-text>
                <strong>количество:</strong>
                <span v-if="!product.isEditMode">{{product.amount}}</span>
                <v-text-field
                  class="input"
                  :value="product.amount"
                  v-if="product.isEditMode"
                  @input="inputProduct('amount', $event)"
                ></v-text-field>
              </v-card-text>
              <v-card-text>
                <strong>стоимтось:</strong>
                <span v-if="!product.isEditMode">{{product.price}}</span>
                <v-text-field
                  class="input"
                  :value="product.price"
                  v-if="product.isEditMode"
                  @input="inputProduct('price', $event)"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex shrink>
              <v-layout column class="absolute" v-if="isAdmin">
                <v-icon class="btn" @click="deleteProduct(product)">delete</v-icon>
                <v-icon
                  class="mt-3 btn"
                  v-if="!product.isEditMode"
                  @click="setEditMode(product)"
                >edit</v-icon>
                <v-icon
                  class="mt-3 btn"
                  v-if="product.isEditMode"
                  @click="updateProduct(product)"
                >check</v-icon>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
        <Comments :comments="comments" v-if="isLoggedIn">
          <AddComment :newComment="newComment" @onInput="editNewC($event)" @addComment ="addComment"/>
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
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Comments,
    AddComment,
  },
  data() {
    return {
      loadCompleted: false
    };
  },
  props: ["id"],
  computed: {
    ...mapState("products", ["product"]),
    ...mapState("comments", ["comments", "newComment"]),
    ...mapGetters("auth", ["isAdmin", "isLoggedIn"]),
  },
  methods: {
    ...mapActions("products", ["getProduct", "deleteProduct", "updateProduct"]),
    ...mapActions("comments", ["getComments", "addComment"]),
    ...mapMutations("products", [
      "setEditMode",
      "unsetEditMode",
      "editProduct"
    ]),
    ...mapMutations("comments", ["editNewComment"]),
    inputProduct(name, value) {
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
.input {
  display: inline-block;
}
</style>


