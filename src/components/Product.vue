<template>
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
          <v-icon class="btn" @click="$emit('delete', product)">delete</v-icon>
          <v-icon class="mt-3 btn" v-if="!product.isEditMode" @click="$emit('edit', product)">edit</v-icon>
          <v-icon class="mt-3 btn" v-if="product.isEditMode" @click="$emit('update', product)">check</v-icon>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>


export default {
  props: ["id", "product", "isAdmin", "isEditMode"],
  methods: {
    inputProduct(name, value) {
      this.$emit("input", {
        name,
        value
      });
    }
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

