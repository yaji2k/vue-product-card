// import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state: {
        comments: [],
        comment: {},
    },
    getters: {

    },
    mutations: {
        setComments(
            state,
            comments
        ) {
            state.comments = comments;
        },
        setComment(
            state,
            comment
        ) {
            state.comment = comment;
        },
    },
    actions: {
        async getComments({ commit, rootState}) {
            const { data } = await HTTP().get(`/comments/${rootState.products.product.id}`);
            commit('setComments', data); 
        },
    }
}