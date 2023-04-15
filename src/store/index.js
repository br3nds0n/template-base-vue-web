import { createStore } from 'vuex';
import loadingModule from './loading';

export default createStore({
    modules: {
        loading: loadingModule
    }
});
