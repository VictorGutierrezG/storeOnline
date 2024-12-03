<template>
    <div>
      <b-container>
        <h4>Formulario de Pago</h4>
  
        <!-- Resumen del pedido -->
        <b-row>
          <b-col>
            <h5>Resumen del Pedido</h5>
  
            <!-- Verificación si el carrito está cargado -->
            <ul v-if="cartItems.length > 0">
              <li v-for="(item, index) in cartItems" :key="index">
                {{ item.product.name }} - Cantidad: {{ item.quantity }} - \${{ (item.product.price * item.quantity).toFixed(2) }}
              </li>
            </ul>
  
            <b-alert variant="warning" show v-else-if="cartItems.length === 0">
              No hay productos en el carrito.
            </b-alert>
  
            <h5>Total: \${{ cartTotal ? cartTotal.toFixed(2) : '0.00' }}</h5>
          </b-col>
        </b-row>
  
        <!-- Formulario de información del cliente -->
        <b-row class="mt-4">
          <b-col>
            <b-form @submit.prevent="handleSubmit">
              <!-- Nombre del cliente -->
              <b-form-group label="Nombre Completo">
                <b-form-input v-model="form.name" required placeholder="Ingresa tu nombre completo" />
              </b-form-group>
  
              <!-- Dirección de envío -->
              <b-form-group label="Dirección de Envío">
                <b-form-input v-model="form.address" required placeholder="Ingresa tu dirección de envío" />
              </b-form-group>
  
              <!-- Número de tarjeta -->
              <b-form-group label="Número de Tarjeta">
                <b-form-input v-model="form.cardNumber" required placeholder="Ingresa el número de tarjeta" type="text" />
              </b-form-group>
  
              <!-- Fecha de expiración -->
              <b-form-group label="Fecha de Expiración">
                <b-form-input v-model="form.expiryDate" required placeholder="MM/AA" type="text" />
              </b-form-group>
  
              <!-- Código de seguridad (CVV) -->
              <b-form-group label="Código de Seguridad (CVV)">
                <b-form-input v-model="form.cvv" required placeholder="Código CVV" type="text" />
              </b-form-group>
  
              <!-- Botón para abrir el modal de confirmación -->
              <b-button variant="primary" @click="openConfirmationModal" :disabled="cartItems.length === 0">
                Confirmar Compra
              </b-button>
            </b-form>
          </b-col>
        </b-row>
  
        <!-- Modal de Confirmación -->
        <b-modal v-show="showModal" v-model="showModal" title="Confirmación de Compra" ok-title="Confirmar" cancel-title="Cancelar" @ok="confirmPurchase" @cancel="closeModal">
          <p>¿Estás seguro de que deseas confirmar la compra?</p>
        </b-modal>
  
        <!-- Modal de Éxito después de confirmar la compra -->
        <b-modal v-show="showSuccessModal" v-model="showSuccessModal" title="Compra Exitosa" hide-footer>
          <h4 class="text-center">¡Compra Confirmada!</h4>
          <p class="text-center">¡Tu compra se ha realizado con éxito!</p>
          <b-button variant="success" @click="redirectToProducts" block>
            Ir a Productos
          </b-button>
        </b-modal>
      </b-container>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue } from 'vue-property-decorator'
  import { CartItem } from '~/store/cart'
  
  interface PaymentForm {
    name: string;
    address: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }
  
  export default class PaymentPage extends Vue {
    form: PaymentForm = {
      name: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  
    showModal: boolean = false
    showSuccessModal: boolean = false
  
    mounted() {
        this.$store.dispatch('cart/loadCart')
    }
  
    get cartItems(): CartItem[] {
      return this.$store.getters['cart/cartItems'] || [] // Devolvemos siempre un arreglo vacío
    }
  
    get cartTotal(): number {
      return this.$store.getters['cart/cartTotal'] || 0 // Siempre devolvemos un valor numérico
    }
  
    openConfirmationModal(): void {
      if (this.cartItems.length > 0) {
        this.showModal = true
      } else {
        console.warn("No hay productos en el carrito.")
      }
    }
  
    confirmPurchase(): void {
      this.$store.dispatch('cart/clearCart')
      this.showSuccessModal = true
      this.showModal = false
    }
  
    closeModal(): void {
      this.showModal = false
    }
  
    redirectToProducts(): void {
      this.$router.push('/products')
    }
  
    handleSubmit(): void {
      console.log('Formulario enviado:', this.form)
    }
  }
  </script>
  
  <style scoped>
  b-container {
    margin-top: 30px;
  }
  </style>
  