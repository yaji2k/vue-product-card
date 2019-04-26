// import router from '../router';
import Vue from 'vue';
import HTTP from '../http';
import router from '../router';

export default {
    namespaced: true,
    state: {
        products: [],
        product: {},
        newProduct: {},
    },
    getters: {

    },
    mutations: {
        setProducts(
            state,
            products
        ) {
            state.products = products;
        },
        setProduct(
            state,
            product
        ) {
            state.product = product;
        },
        appendProduct(state, product) {
            state.products.push(product);
        },
        setNewProduct(state, payLoad) {
            const {
                name,
                value
            } = payLoad;
            Vue.set(state.newProduct, name, value);
        },
        clearNewProduct(state, payLoad) {
            state.newProduct = payLoad;
        },
        removeProduct(state, product) {
            state.products.splice(state.products.indexOf(product),1);
        }
    },
    actions: {
        getProducts({
            commit
        }) {
            return HTTP().get('/products')
                .then(({
                    data
                }) => {
                    console.log(data.data);
                    commit('setProducts', data.data);
                });
        },
        getProduct({
            commit
        }, id) {
            return HTTP().get(`/products/${id}`)
                .then(({
                    data
                }) => {
                    console.log(data);
                    commit('setProduct', data);
                });
        },
        async pushNewProduct({
            commit,
            state,
        }) {
            const { data } = await HTTP().post(`/products/`, state.newProduct);
            const { data: product } = await  HTTP().get(`/products/${data.product_id}`);
            commit("appendProduct", product);
            commit("clearNewProduct", {});
        },
        async deleteProduct({commit}, product) {
            await HTTP().delete(`/products/${product.id}`);
            commit("removeProduct",product);
            router.push("/");
        }
    }
}