<template>
  <div>
    <b-container>
      <b-row>
        <b-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="product" />
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col>
          <h4>Carrito de Compras</h4>
          <ul>
            <li v-for="(item, index) in cartItems" :key="index">
              {{ item.product.name }} - Cantidad: {{ item.quantity }} - \${{ (item.product.price * item.quantity).toFixed(2) }}
            </li>
          </ul>
          <h5>Total: \${{ cartTotal ? cartTotal.toFixed(2) : '0.00' }}</h5>
          <b-button variant="danger" @click="clearCart">Vaciar Carrito</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductCard from '~/components/ProductCard.vue'
import { Product } from '~/types/product'

@Component({
  components: {
    ProductCard
  }
})
export default class ProductsPage extends Vue {
  products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 25.99,
      rating: 4.5,
      image: 'https://via.placeholder.com/300x200?text=Producto+1',
      availableQuantity: 10
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 19.99,
      rating: 4.0,
      image: 'https://via.placeholder.com/300x200?text=Producto+2',
      availableQuantity: 5
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      price: 10.49,
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200?text=Producto+3',
      availableQuantity: 20
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      price: 12.99,
      rating: 3.9,
      image: 'https://via.placeholder.com/300x200?text=Producto+4',
      availableQuantity: 15
    }
  ]

  get cartItems() {
    return this.$store.getters['cart/cartItems']
  }

  get cartTotal() {
    return this.$store.getters['cart/cartTotal']
  }

  clearCart() {
    this.$store.dispatch('cart/clearCart')
  }
}
</script>

<style scoped>
b-container {
  margin-top: 30px;
}
</style>
