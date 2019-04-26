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
        getComments({ commit}, id) {
            return HTTP().get(`/comments/${id}`)
                .then(({
                    data
                }) => {
                    console.log(data.data);
                    commit('setComments', data.data);
                });
        },
    }
}