<template>
    <div>
      <b-container>
        <h2>Carrito de Compras</h2>

        {{ prueba }}
  
        <!-- Si el carrito está vacío -->
        <b-alert variant="warning" show v-if="cartItems.length === 0">
          El carrito está vacío.
        </b-alert>
  
        <!-- Mostrar productos del carrito -->
        <b-row v-else>
          <b-col
            v-for="item in cartItems"
            :key="item.product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <b-card>
              <b-card-img :src="item.product.image" alt="Product image" />
              <b-card-body>
                <b-card-title>{{ item.product.name }}</b-card-title>
                <p>{{ item.product.description }}</p>
                <p><strong>Precio: \${{ item.product.price.toFixed(2) }}</strong></p>
                <p><strong>Cantidad: {{ item.quantity }}</strong></p>
  
                <!-- Botones para aumentar y disminuir la cantidad -->
                <b-button @click="increaseQuantity(item.product.id)" variant="success">+</b-button>
                <b-button @click="decreaseQuantity(item.product.id)" variant="danger">-</b-button>
  
                <!-- Eliminar producto -->
                <b-button 
                  @click="removeFromCart(item.product.id)" 
                  variant="outline-danger" 
                  class="ml-2">
                  Eliminar
                </b-button>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
  
        <!-- Total y Vaciar carrito -->
        <b-row class="mt-4">
          <b-col>
            <h4>Total: \${{ cartTotal.toFixed(2) }}</h4>
            <b-button variant="danger" @click="clearCart">Vaciar Carrito</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { CartItem } from '~/store/cart'  // Importar el tipo `CartItem`
  
  @Component
  export default class CartPage extends Vue {
    prueba:any = []
    // Getter de Vuex para obtener los productos en el carrito
    get cartItems(): CartItem[] {
      return this.$store.getters['cart/cartItems']
    }
  
    // Getter de Vuex para obtener el total del carrito
    get cartTotal(): number {
      return this.$store.getters['cart/cartTotal']
    }
  
    // Métodos para aumentar la cantidad de un producto en el carrito
    increaseQuantity(productId: number): void {
      this.$store.dispatch('cart/increaseQuantity', productId)
    }
  
    // Métodos para disminuir la cantidad de un producto en el carrito
    decreaseQuantity(productId: number): void {
      this.$store.dispatch('cart/decreaseQuantity', productId)
    }
  
    // Método para eliminar un producto del carrito
    removeFromCart(productId: number): void {
      this.$store.dispatch('cart/removeFromCart', productId)
    }
  
    // Método para vaciar el carrito
    clearCart(): void {
      this.$store.dispatch('cart/clearCart')
    }

    // En CartPage.vue
    mounted() {
  console.log(this.$store.getters['cart/cartItems']);  // Debe mostrar el carrito cargado desde el store
  console.log(this.$store.getters['cart/cartTotal']);  // Debe mostrar el total calculado
}


  }
  </script>
  
  <style scoped>
  /* Estilos específicos para la página del carrito */
  b-container {
    margin-top: 30px;
  }
  b-button {
    margin-right: 5px;
  }
  </style>
  