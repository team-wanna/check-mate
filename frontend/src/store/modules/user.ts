import { Module } from 'vuex';
import { RootState } from '@/utils/define';
import { EditProfile, Profile } from '@/api/modules/users/types';
import { editProfileAPI, getUserProfileAPI } from '@/api/modules/users';

interface State {
  profile: Profile;
}

const user: Module<State, RootState> = {
  namespaced: true,
  state: {
    profile: JSON.parse(window.sessionStorage.getItem('profile') || '{}'),
  },
  mutations: {
    setProfile: (state: State, profile: Partial<Profile>) => {
      const newProfile = { ...state.profile, ...profile };
      window.sessionStorage.setItem('profile', JSON.stringify(newProfile));
      state.profile = newProfile;
    },
  },
  actions: {
    fetchProfile: async ({ commit }) => {
      const { data } = await getUserProfileAPI();
      commit('setProfile', data.data[0]);
    },
    updateProfile: async ({ commit }, payload: Partial<EditProfile>) => {
      const { data } = await editProfileAPI(payload);
      commit('setProfile', data.data[0]);
    },
  },
  getters: {
    getProfile: (state: State) => state.profile,
  },
};

export default user;
