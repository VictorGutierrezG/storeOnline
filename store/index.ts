import Vuex from 'vuex'
import { mutations, actions, getters, state } from './cart'
import { mutations as mutationAuth, actions as actionsAuth, state as stateAuth } from './auth'

const store = () => {
  return new Vuex.Store({
    modules: {
      cart: {
        namespaced: true,
        state,
        mutations,
        actions,
        getters
      },
      auth: {
        namespaced: true,
        mutations: mutationAuth,
        actions: actionsAuth,
        state: stateAuth
      }
    }
  })
}

export default store
