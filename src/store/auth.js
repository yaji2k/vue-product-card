import router from '../router';
import HTTP from '../http';

export default {
    namespaced: true,
    state: {
        registerName: null,
        registerEmail: null,
        registerPassword: null,
        registerError: null,
        loginEmail: "",
        loginPassword: "",
        loginError: null,
        token: null,
        isAdmin: false,
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        isAdmin(state) {
            return (!!state.token && state.isAdmin);
        }
    },
    mutations: {
        setRegisterName(state, name) {
            state.registerName = name;
        },
        setRegisterEmail(state, email) {
            state.registerEmail = email;
        },
        setRegisterPassword(state, password) {
            state.registerPassword = password;
        },
        setRegisterError(state, error) {
            state.registerError = error;
        },
        setLoginEmail(state, email) {
            state.loginEmail = email;
        },
        setLoginPassword(state, password) {
            state.loginPassword = password;
        },
        setLoginError(state, error) {
            state.loginError = error;
        },
        setToken(state, token) {
            state.token = token;
        },
        setAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        },
    },
    actions: {
        logout({
            commit
        }) {
            commit('setToken', null);
            router.push('/login');
        },
        async register({
            state,
            commit
        }) {
            commit('setRegisterError', null);
            const { data } = await HTTP().post('/register', {
                    username: state.registerName,
                    email: state.registerEmail,
                    password: state.registerPassword,
                });
            if(!data.success) {
                commit('setRegisterError', data.e.detail);
            } else {
                commit('setToken', data.token);
                commit('setAdmin', data.is_admin);
                router.push('/');
            };
        },
        login({
            state,
            commit
        }) {
            commit('setLoginError', null);
            return HTTP().post('/login', {
                    email: state.loginEmail,
                    password: state.loginPassword,
                })
                .then(({
                    data
                }) => {
                    commit('setToken', data.token);
                    commit('setAdmin', data.is_admin);
                    router.push('/');
                })
                .catch(() => {
                    commit('setLoginError', 'Invalid Login. Information');
                });
        }
    },
};
