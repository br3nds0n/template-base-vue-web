const loadingModule = {
    state() {
        return {
            loading: false,
            numeroRequests: 0
        };
    },

    mutations: {
        setLoading(state, status) {
            state.loading = status;
        },

        addRequest(state) {
            state.numeroRequests++;
            state.loading = state.numeroRequests > 0;
        },

        removeRequest(state) {
            state.numeroRequests--;
            if (state.numeroRequests < 0) {
                state.numeroRequests = 0;
            }
            state.loading = state.numeroRequests > 0;
        },

        resetRequest(state) {
            state.numeroRequests = 0;
            state.loading = state.numeroRequests > 0;
        }
    },

    actions: {
        showLoading({ commit }) {
            commit('setLoading', true);
        },

        hideLoading({ commit }) {
            commit('setLoading', false);
        },

        addRequest({ commit }) {
            commit('addRequest');
        },

        removeRequest({ commit }) {
            commit('removeRequest');
        },

        resetRequest({ commit }) {
            commit('resetRequest');
        }
    },

    getters: {
        isLoading(state) {
            return state.loading;
        }
    }
};

export default loadingModule;
