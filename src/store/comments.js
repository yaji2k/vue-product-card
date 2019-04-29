// import router from '../router';
import HTTP from '../http';
import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        comments: [],
        comment: {},
        newComment: {},
    },
    getters: {

    },
    mutations: {
        setComments(
            state,
            comments
        ) {
            state.comments = comments.reverse();
        },
        setComment(
            state,
            comment
        ) {
            state.comment = comment;
        },
        removeComments(state, id) {
            const comment = state.comments.find((comment) => comment.id === id);
            state.comments.splice(state.comments.indexOf(comment), 1);
        },
        editNewComment(state, payload) {
            const {
                name,
                value
            } = payload;
            state.newComment = {
                ...state.newComment,
                ...payload
            };
            // Vue.set(state.newComment, name, value);
        }
    },
    actions: {
        async getComments({
            commit,
            rootState
        }) {
            const {
                data
            } = await HTTP().get(`/comments/${rootState.products.product.id}`);
            commit('setComments', data);
        },
        async addComment({
            state,
            commit,
            dispatch,
            rootState
        }) {
            const {
                data
            } = await HTTP().post(`/comments/${rootState.products.product.id}`, {
                "comment": state.newComment.comment,
                "rate": state.newComment.rate
            });
            dispatch("getComments");
        },
        async deleteComment({
            commit
        }, id) {
            const {
                data
            } = await HTTP().delete(`/comments/${id}`);
            commit('removeComments', id);
        },
    },
}