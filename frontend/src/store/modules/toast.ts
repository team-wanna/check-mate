import { Commit, Module } from 'vuex';
import { RootState } from '@/utils/define';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger';
}

interface State {
  toasts: Toast[];
}

const toast: Module<State, RootState> = {
  namespaced: true,
  state: {
    toasts: [] as Toast[],
  },
  mutations: {
    addToast: (state: State, payload: Toast): void => {
      state.toasts.push(payload);
    },
    removeToast: (state: State): void => {
      state.toasts.shift();
    },
  },
  actions: {
    triggerToast({ commit }: { commit: Commit }, payload: Toast): void {
      commit('addToast', payload);

      setTimeout(() => {
        commit('removeToast');
      }, 3000);
    },
  },
  getters: {
    getToasts: (state: State) => state.toasts,
  },
};

export default toast;
