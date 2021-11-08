import { Module } from 'vuex';
import { RootState } from '@/utils/define';

type UserState = 'signUp' | 'loggedIn' | 'loggedOut';

interface State {
  name: string;
  profileImageUrl: string;
  userState: UserState;
}

const user: Module<State, RootState> = {
  namespaced: true,
  state: {
    name: '',
    profileImageUrl: '',
    userState: 'loggedOut',
  },
  mutations: {
    setName: (state: State, name: string) => {
      state.name = name;
    },
    setProfileImageUrl: (state: State, profileImageUrl: string) => {
      state.profileImageUrl = profileImageUrl;
    },
    setUserState: (state: State, userState: UserState) => {
      state.userState = userState;
    },
  },
  getters: {
    getName: (state: State) => state.name,
    getProfileImageUrl: (state: State) => state.profileImageUrl,
    getUserState: (state: State) => state.userState,
  },
};

export default user;
