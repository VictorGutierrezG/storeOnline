<template>
  <div>
    <b-container>
      <!-- Filtro de búsqueda -->
      <b-row class="mb-4">
        <b-col md="6">
          <b-form-input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
          />
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col>
          <h4>Carrito de Compras</h4>
          <b-row v-if="cartItems.length > 0">
            <b-col
              v-for="(item, index) in cartItems"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <b-card v-if="item" :header="item.name" class="mb-3">
                <b-card-img :src="item.image" alt="Product image" />
                <b-card-body>
                  <p>{{ item.description }}</p>
                  <p><strong>Precio:</strong> \${{ item.price.toFixed(2) }}</p>
                  <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
                  <p><strong>Total:</strong> \${{ (item.price * item.quantity).toFixed(2) }}</p>
                  <b-button @click="increaseQuantity(item.id)" variant="success">+</b-button>
                  <b-button @click="decreaseQuantity(item.id)" variant="danger">-</b-button>
                  <b-button
                    @click="removeFromCart(item.id)"
                    variant="outline-danger"
                    class="ml-2"
                  >
                    Eliminar
                  </b-button>
                </b-card-body>
              </b-card>
              <b-card v-else class="mb-3">
                <b-card-body>
                  <p>Producto no disponible</p>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-alert variant="warning" show v-else>
            El carrito está vacío.
          </b-alert>

          <h5>Total: \${{ cartTotal ? cartTotal.toFixed(2) : '0.00' }}</h5>
          <b-button variant="danger" @click="clearCart" class="mr-2">Vaciar Carrito</b-button>
          <b-button variant="primary" @click="goToCheckout" :disabled="cartItems.length === 0">Finalizar Compra</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CartItem } from '~/store/cart'

@Component
export default class CartPage extends Vue {
  searchQuery: string = ''

  get cartItems(): CartItem[] {
    return this.$store.getters['cart/cartItems']
  }

  get cartTotal(): number {
    return this.$store.getters['cart/cartTotal']
  }

  clearCart(): void {
    this.$store.dispatch('cart/clearCart')
  }

  increaseQuantity(productId: number): void {
    this.$store.dispatch('cart/increaseQuantity', productId)
  }

  decreaseQuantity(productId: number): void {
    this.$store.dispatch('cart/decreaseQuantity', productId)
  }

  removeFromCart(productId: number): void {
    this.$store.dispatch('cart/removeFromCart', productId)
  }

  goToCheckout(): void {
    this.$router.push('/checkout')
  }

  mounted(): void {
    this.$store.dispatch('cart/loadCart')
  }
}
</script>

<style scoped>
/* Estilos específicos para la página del carrito */
b-container {
  margin-top: 30px;
}
b-card {
  cursor: pointer;
}
b-button {
  margin-top: 10px;
  margin-right: 5px;
}
</style>
