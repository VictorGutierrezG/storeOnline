import { ActionContext } from 'vuex'
import { Product } from '~/types/product'

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export const state = (): CartState => ({
  items: [] as CartItem[],
})

export const mutations = {
  ADD_TO_CART(state: CartState, product: CartItem) {
    const existingProduct = state.items.find(item => item.id === product.id)
    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      state.items.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cartItems', JSON.stringify(state.items))
  },

  REMOVE_FROM_CART(state: CartState, productId: number) {
    state.items = state.items.filter(item => item.id !== productId)
    localStorage.setItem('cartItems', JSON.stringify(state.items))
  },

  CLEAR_CART(state: CartState) {
    state.items = []
    localStorage.removeItem('cartItems')
  },

  SET_CART(state: CartState, items: CartItem[]) {
    state.items = items
  },

  INCREASE_QUANTITY(state: CartState, productId: number) {
    const product = state.items.find(item => item.id === productId)
    if (product) {
      product.quantity += 1
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    }
  },

  DECREASE_QUANTITY(state: CartState, productId: number) {
    const product = state.items.find(item => item.id === productId)
    if (product && product.quantity > 1) {
      product.quantity -= 1
      localStorage.setItem('cartItems', JSON.stringify(state.items)) 
    }
  },

}

export const actions = {
  addToCart(
    { commit }: ActionContext<CartState, any>,
    product: CartItem
  ) {
    commit('ADD_TO_CART', product)
  },

  removeFromCart(
    { commit }: ActionContext<CartState, any>,
    productId: number
  ) {
    commit('REMOVE_FROM_CART', productId)
  },

  clearCart({ commit }: ActionContext<CartState, any>) {
    console.log('clearCart')
    commit('CLEAR_CART')
  },

  loadCart({ commit }: ActionContext<CartState, any>) {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      commit('SET_CART', JSON.parse(cartItems))
    }
  },

    increaseQuantity({ commit }: { commit: Function }, productId: number) {
      commit('INCREASE_QUANTITY', productId)
    },
  
    decreaseQuantity({ commit }: { commit: Function }, productId: number) {
      commit('DECREASE_QUANTITY', productId)
    },

}

export const getters = {
  cartItemCount(state: CartState): number {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },

  cartItems(state: CartState): CartItem[] {
    return state.items
  },

  cartTotal(state: CartState): number {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },
}
