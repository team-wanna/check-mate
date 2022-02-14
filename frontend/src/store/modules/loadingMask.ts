import { Module } from 'vuex';
import { RootState } from '@/utils/define';

interface State {
  showLoadingMask: boolean;
}

const loadingMask: Module<State, RootState> = {
  namespaced: true,
  state: {
    showLoadingMask: false,
  },
  mutations: {
    setLoadingMask: (state: State, payload: boolean): void => {
      state.showLoadingMask = payload;
    },
  },
  actions: {
    showLoadingMask: ({ commit }) => {
      commit('setLoadingMask', true);
    },
    hideLoadingMask: ({ commit }) => {
      commit('setLoadingMask', false);
    },
  },
  getters: {
    getShowLoadingMask: (state: State) => state.showLoadingMask,
  },
};

export default loadingMask;
