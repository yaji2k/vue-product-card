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
        filter: [{
                name: 'name',
                sort: true,
                fn: (a, b) => {

                    var A = a['title'].toLowerCase(),
                        B = b['title'].toLowerCase();
                    if (A < B) return -1;
                    if (A > B) return 1;
                    return 0;
                }
            },
            {
                name: 'price',
                sort: true,
                fn: (a, b) => {
                    return a['price'] - b['price'];
                }
            },
        ],
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
        editProduct(state, payLoad) {
            const {
                name,
                value
            } = payLoad;
            Vue.set(state.product, name, value);
        },
        clearNewProduct(state, payLoad) {
            state.newProduct = payLoad;
        },
        removeProduct(state, product) {
            state.products.splice(state.products.indexOf(product), 1);
        },
        setEditMode(state, product) {
            Vue.set(product, 'isEditMode', true);
        },
        unsetEditMode(state, product) {
            Vue.set(product, 'isEditMode', false);
        },
        sortProducts(state, payLoad) {
            const {
                key,
                reverse
            } = payLoad;
            if (reverse) {
                state.products.reverse();
            } else {
                state.products = state.products.sort(state.filter[key].fn);
            }
        },
    },
    actions: {
        getProducts({
            commit
        }) {
            return HTTP().get('/products')
                .then(({
                    data
                }) => {
                    commit('setProducts', data.data);
                    commit('sortProducts', {
                        key: 0,
                        reverse: false
                    });
                });
        },
        async getProduct({
            commit,
            state
        }, id) {
            const {
                data
            } = await HTTP().get(`/products/${id}`);
            commit('setProduct', data);
        },
        async updateProduct({
            commit
        }, product) {
            await HTTP().patch(`/products/${product.id}`, product);
            commit('unsetEditMode', product);
        },
        async pushNewProduct({
            commit,
            state,
        }) {
            const {
                data
            } = await HTTP().post(`/products/`, state.newProduct);
            const {
                data: product
            } = await HTTP().get(`/products/${data.product_id}`);
            commit("appendProduct", product);
            commit("clearNewProduct", {});
        },
        async deleteProduct({
            commit
        }, product) {
            await HTTP().delete(`/products/${product.id}`);
            commit("removeProduct", product);
            router.push("/");
        }
    }
}