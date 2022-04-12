import { createStore } from 'vuex';
import { RootState, SocialType } from '@/utils/define';
import user from '@/store/modules/user';
import toast from '@/store/modules/toast';
import loadingMask from '@/store/modules/loadingMask';

export default createStore<RootState>({
  state: {
    loginType: '',
  },
  mutations: {
    setLoginType: (state: RootState, loginType: SocialType) => {
      state.loginType = loginType;
    },
  },
  getters: {
    getLoginType: (state: RootState) => state.loginType,
  },
  modules: { user, toast, loadingMask },
});
