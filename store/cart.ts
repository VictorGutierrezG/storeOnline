import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Product } from '~/types/product'

export interface CartState {
  items: { product: Product, quantity: number }[]
}

export const state = (): CartState => ({
  items: []
})

export const mutations: MutationTree<CartState> = {
  ADD_TO_CART(state, product: Product) {
    const existingItem = state.items.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.items.push({ product, quantity: 1 })
    }
  },
  REMOVE_FROM_CART(state, productId: number) {
    state.items = state.items.filter(item => item.product.id !== productId)
  },
  CLEAR_CART(state) {
    state.items = []
  }
}

export const actions: ActionTree<CartState, any> = {
  addToCart({ commit }, product: Product) {
    commit('ADD_TO_CART', product)
  },
  removeFromCart({ commit }, productId: number) {
    commit('REMOVE_FROM_CART', productId)
  },
  clearCart({ commit }) {
    commit('CLEAR_CART')
  }
}

export const getters: GetterTree<CartState, any> = {
  cartItems: (state) => state.items,
  cartTotal: (state) => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0
  }
}
