<template>
    <div>
      <b-container>
        <b-row class="mt-5">
          <b-col>
            <h4>Resumen de la Compra</h4>
            <b-row v-if="cartItems.length > 0">
              <b-col
                v-for="(item, index) in cartItems"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <b-card :header="item.name" class="mb-3">
                  <b-card-img :src="item.image" alt="Product image" />
                  <b-card-body>
                    <p>{{ item.description }}</p>
                    <p><strong>Precio:</strong> \${{ item.price.toFixed(2) }}</p>
                    <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
                    <p><strong>Total:</strong> \${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </b-card-body>
                </b-card>
              </b-col>
            </b-row>
  
            <b-alert variant="warning" show v-else>
              El carrito está vacío.
            </b-alert>
  
            <h5>Total de la Compra: \${{ cartTotal ? cartTotal.toFixed(2) : '0.00' }}</h5>
            <b-button variant="success" @click="completePurchase" class="mt-3">Confirmar Compra</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { CartItem } from '~/store/cart'
  
  @Component
  export default class CheckoutPage extends Vue {
  
    get cartItems(): CartItem[] {
      return this.$store.getters['cart/cartItems']
    }
  
    get cartTotal(): number {
      return this.$store.getters['cart/cartTotal']
    }
  
    completePurchase() {
        this.$router.push('/payment')
    }

    mounted(): void {
      this.$store.dispatch('cart/loadCart')
    }
  }
  </script>
  
  <style scoped>
  b-container {
    margin-top: 30px;
  }
  b-card {
    cursor: pointer;
  }
  b-button {
    margin-top: 10px;
  }
  </style>
  