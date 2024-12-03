import Vuex from 'vuex'
import { mutations, actions, getters, state } from './cart'

const store = () => {
  return new Vuex.Store({
    modules: {
      cart: {
        namespaced: true,
        state,
        mutations,
        actions,
        getters
      }
    }
  })
}

export default store
