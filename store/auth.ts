// store/auth.ts
import { MutationTree, ActionTree } from 'vuex'

export interface AuthState {
  isAuthenticated: boolean
  user: { username: string; email: string } | null
}

// Estado inicial con tipo explícito
export const state = (): AuthState => ({
  isAuthenticated: false,
  user: null
})

// Tipar las mutaciones
export const mutations: MutationTree<AuthState> = {
  SET_AUTH(state, user: { username: string; email: string }) {
    state.isAuthenticated = true
    state.user = user
  },
  LOGOUT(state) {
    state.isAuthenticated = false
    state.user = null
  }
}

// Tipar las acciones
export const actions: ActionTree<AuthState, any> = {
  async login(
    { commit }: { commit: Function },
    { username, password }: { username: string; password: string }
  ): Promise<void> {
    const dummyUser = await { username: 'admin', email: 'admin@example.com', password: 'password123' }

    if (username === dummyUser.username && password === dummyUser.password) {
      commit('SET_AUTH', { username: dummyUser.username, email: dummyUser.email })
    } else {
      throw new Error('Invalid credentials')
    }
  },

  logout({ commit }: { commit: Function }) {
    commit('LOGOUT')
  }
}
