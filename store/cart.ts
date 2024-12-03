import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Product } from '~/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
}

// Cargar datos del carrito desde localStorage (solo en el cliente)
function loadCartFromLocalStorage(): CartItem[] {
  if (process.client) {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      return JSON.parse(savedCart)
    }
  }
  return []
}

// Guardar datos del carrito en localStorage (solo en el cliente)
function saveCartToLocalStorage(cartItems: CartItem[]): void {
  if (process.client) {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }
}

export const state = (): CartState => ({
  cartItems: loadCartFromLocalStorage() // Cargar los productos del carrito desde localStorage
})

export const getters: GetterTree<CartState, any> = {
  cartItems(state): CartItem[] {
    return state.cartItems
  },
  cartTotal(state): number {
    return state.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }
}

export const mutations: MutationTree<CartState> = {
  addToCart(state, product: Product): void {
    const item = state.cartItems.find(item => item.product.id === product.id)
    if (item) {
      item.quantity++
    } else {
      state.cartItems.push({ product, quantity: 1 })
    }
    saveCartToLocalStorage(state.cartItems) // Guardar el carrito en localStorage
  },
  removeFromCart(state, productId: number): void {
    state.cartItems = state.cartItems.filter(item => item.product.id !== productId)
    saveCartToLocalStorage(state.cartItems) // Guardar el carrito en localStorage
  },
  increaseQuantity(state, productId: number): void {
    const item = state.cartItems.find(item => item.product.id === productId)
    if (item) {
      item.quantity++
      saveCartToLocalStorage(state.cartItems) // Guardar el carrito en localStorage
    }
  },
  decreaseQuantity(state, productId: number): void {
    const item = state.cartItems.find(item => item.product.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
      saveCartToLocalStorage(state.cartItems) // Guardar el carrito en localStorage
    }
  },
  clearCart(state): void {
    state.cartItems = []
    saveCartToLocalStorage(state.cartItems) // Guardar el carrito vacío en localStorage
  }
}

export const actions: ActionTree<CartState, any> = {
  addToCart({ commit }, product: Product): void {
    commit('addToCart', product)
  },
  removeFromCart({ commit }, productId: number): void {
    commit('removeFromCart', productId)
  },
  increaseQuantity({ commit }, productId: number): void {
    commit('increaseQuantity', productId)
  },
  decreaseQuantity({ commit }, productId: number): void {
    commit('decreaseQuantity', productId)
  },
  clearCart({ commit }): void {
    commit('clearCart')
  }
}
