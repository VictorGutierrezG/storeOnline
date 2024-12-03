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

      <!-- Mostrar productos filtrados -->
      <b-row>
        <b-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="product" />
        </b-col>
      </b-row>

      <!-- Sección del carrito -->
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
import productsData from '~/assets/data/products.json'  // Importar el archivo JSON

@Component({
  components: {
    ProductCard
  }
})
export default class ProductsPage extends Vue {
  searchQuery: string = ''  // Variable reactiva para el texto de búsqueda

  // Utilizamos los datos importados del archivo JSON
  products: Product[] = productsData

  // Getter de Vuex para obtener los productos en el carrito y el total
  get cartItems() {
    return this.$store.getters['cart/cartItems']
  }

  get cartTotal() {
    return this.$store.getters['cart/cartTotal']
  }

  // Filtrar productos según el texto de búsqueda
  get filteredProducts() {
    const query = this.searchQuery.toLowerCase()
    return this.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // Vaciar carrito
  clearCart() {
    this.$store.dispatch('cart/clearCart')
  }
}
</script>

<style scoped>
/* Estilo para la página de productos */
b-container {
  margin-top: 30px;
}
</style>
