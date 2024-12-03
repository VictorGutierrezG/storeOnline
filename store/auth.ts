interface User {
  username: string;
}

interface AuthState {
  user: User | null;
}

export const state = (): AuthState => ({
  user: null,
});

export const mutations = {
  SET_USER(state: AuthState, user: User | null): void {
    state.user = user;
  },
  
  CLEAR_USER(state: AuthState): void {
    state.user = null;
  },
};

export const actions = {
  login({ commit }: { commit: Function }, credentials: { username: string; password: string }) {
    const { username, password } = credentials;


    if (username === 'admin' && password === 'admin123') {
      const user = { username };
      commit('SET_USER', user);
      return user;
    } else {
      return Promise.reject(new Error('Invalid username or password'));
    }
  },

  logout({ commit }: { commit: Function }): void {
    commit('CLEAR_USER');
  },
};


export const getters = {
  isLoggedIn(state: AuthState): boolean {
    return !!state.user;
  },
  
  getUser(state: AuthState): User | null {
    return state.user;
  },
};
