import { Module } from 'vuex';
import { RootState } from '@/utils/define';

type UserState = 'signUp' | 'loggedIn' | 'loggedOut';

interface State {
  userState: UserState;
  profileImageUrl: string;
  name: string;
  intro: string;
}

const user: Module<State, RootState> = {
  namespaced: true,
  state: {
    userState: 'loggedOut',
    profileImageUrl: '',
    name: '',
    intro: '',
  },
  mutations: {
    setUserState: (state: State, userState: UserState) => {
      state.userState = userState;
    },
    setProfileImageUrl: (state: State, profileImageUrl: string) => {
      state.profileImageUrl = profileImageUrl;
    },
    setName: (state: State, name: string) => {
      state.name = name;
    },
    setIntro: (state: State, intro: string) => {
      state.intro = intro;
    },
  },
  getters: {
    getUserState: (state: State) => state.userState,
    getProfileImageUrl: (state: State) => state.profileImageUrl,
    getName: (state: State) => state.name,
    getIntro: (state: State) => state.intro,
  },
};

export default user;
