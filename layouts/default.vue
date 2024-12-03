<template>
  <div>
    <b-navbar toggleable="lg" bg="primary">
    <b-navbar-brand href="/">Tienda Online</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/products">Productos</b-nav-item>
        <b-nav-item href="/offers">Ofertas</b-nav-item>
        
        <b-nav-item href="/cart">
          <span>Carrito</span> 
          
          <b-badge v-if="cartItemCount > 0" variant="danger" class="ml-1">
            {{ cartItemCount }}
          </b-badge>
        </b-nav-item>
        
        <b-nav-item v-if="!isLoggedIn" href="/login">Ingresar</b-nav-item>
        <b-nav-item v-if="isLoggedIn" @click="handleLogout">Cerrar sesión</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-container class="mt-4">
      <nuxt />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  get cartItemCount(): number {
    return this.$store.getters['cart/cartItemCount']
  }

  get isLoggedIn(): boolean {
    return this.$store.getters['auth.isLoggedIn']
  }

  handleLogout(): void {
    this.$store.dispatch('auth/logout')
    this.$router.push('/login')
  }

  mounted() {
    this.$store.dispatch('cart/loadCart')
  }
}
</script>

<style scoped>
/* Estilos opcionales para el Navbar */
b-nav-item span {
  font-weight: bold;
  color: white;
}

.ml-1 {
  margin-left: 8px;
}
</style>
