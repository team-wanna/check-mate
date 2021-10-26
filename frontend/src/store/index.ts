import { createStore } from 'vuex';
import { RootState, SocialType } from '@/utils/define';
import User from '@/store/modules/user';

const store = createStore<RootState>({
  state: {
    token: '',
    loginType: '',
  },
  mutations: {
    setToken: (state: RootState, token: string) => {
      state.token = token;
    },
    setLoginType: (state: RootState, loginType: SocialType) => {
      state.loginType = loginType;
    },
  },
  getters: {
    getToken: (state: RootState) => state.token,
    getLoginType: (state: RootState) => state.loginType,
  },
  modules: User,
});

export default store;
