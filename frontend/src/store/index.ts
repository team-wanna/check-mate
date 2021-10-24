import { createStore } from 'vuex';
import { RootState } from '@/utils/define';
import User from '@/store/modules/user';

const store = createStore<RootState>({
  state: {
    token: '',
  },
  mutations: {
    setToken: (state: RootState, token: string) => {
      state.token = token;
    },
  },
  getters: {
    getToken: (state: RootState) => state.token,
  },
  modules: User,
});

export default store;
