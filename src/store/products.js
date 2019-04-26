// import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state: {
        products: [],
        product: {},
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
        }
    }
}