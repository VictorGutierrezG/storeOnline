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
          <p v-if="existUser">Hola {{ userName }}</p>
          <b-nav-item v-if="!existUser" href="/login">Ingresar</b-nav-item>
          <b-nav-item v-if="existUser" @click="handleLogout">Cerrar sesión</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="mt-4">
        <nuxt />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {

  existUser: boolean = false
  userName: string | null= null

  get cartItemCount(): number {
    return this.$store.getters['cart/cartItemCount']
  }

  get isLoggedIn(): boolean {
    return this.$store.getters['auth/isLoggedIn']
  }

  handleLogout(): void {
    this.existUser = false
    this.userName = null
    this.$store.dispatch('auth/logout')
    this.$router.push('/')
  }

  mounted() {
    this.$store.dispatch('cart/loadCart')
  }

  @Watch('$store.state.auth.user')
  onUserChange(newUser: any) {

    if (newUser?.username) {
      this.existUser = true
      this.userName = newUser.username
    } else {
      this.existUser = false
    }
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
