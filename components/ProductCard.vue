<template>
    <b-card :title="product.name" class="mb-4" style="max-width: 300px; margin: auto;">
      <b-card-img :src="product.image" alt="Product image" top height="200px" />
      <b-card-body>
        <p class="card-text">{{ product.description }}</p>
        <b-row>
          <b-col>
            <h5>\${{ product.price.toFixed(2) }}</h5>
          </b-col>
          <b-col class="text-right">
            <b-badge variant="success">{{ product.rating }} ★</b-badge>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <p>Disponible: {{ product.availableQuantity }} en stock</p>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-button variant="primary" @click="addToCart">Añadir al carrito</b-button>
      </b-card-footer>
    </b-card>
  </template>
  
  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Product } from '~/types/product'
  
  @Component
  export default class ProductCard extends Vue {
    @Prop({ required: true }) product!: Product
  
    // Función para añadir al carrito utilizando Vuex
    addToCart() {
      // Asegúrate de usar el nombre completo para la acción: 'cart/addToCart'
      this.$store.dispatch('cart/addToCart', this.product)
    }
  }
  </script>
  