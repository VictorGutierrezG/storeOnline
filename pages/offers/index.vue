<template>
  <div>
    <b-container>
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
      <b-row>
        <b-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
        <ProductCard v-if="product" :product="product" />
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductCard from '~/components/ProductCard.vue'
import { Product } from '~/types/product'
import productsData from '~/assets/data/products.json'

@Component({
  components: {
    ProductCard
  }
})
export default class ProductsPage extends Vue {
  searchQuery: string = ''
  products: Product[] = productsData

  get filteredProducts() {
    const query = this.searchQuery.toLowerCase()
    return this.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }
}
</script>

<style scoped>
b-container {
  margin-top: 30px;
}
</style>
