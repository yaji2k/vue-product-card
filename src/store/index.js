// import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import products from './products';
import comments from './comments';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    products,
    comments
  },
  state: {
    baseUrl: '/api'
  },
  mutations: {

  },
  actions: {

  },
  // plugins: [
  //   createPersistedState(),
  // ],
});
