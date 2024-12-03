<template>
  <b-card title="Login" class="my-4" style="max-width: 400px; margin: auto;">
    <b-form @submit.prevent="handleLogin">
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          placeholder="Enter your username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" block>Login</b-button>

      <b-alert v-if="error" variant="danger" class="mt-3">
        {{ error }}
      </b-alert>
    </b-form>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface LoginError {
  message: string;
}

@Component
export default class LoginPage extends Vue {
  username: string = ''
  password: string = ''
  error: LoginError | null = null

  get isLoggedIn(): boolean {
    return this.$store.getters['auth/isLoggedIn']
  }

  async handleLogin(): Promise<void> {
    try {
      await this.$store.dispatch('auth/login', { username: this.username, password: this.password })
      this.$router.push('/products')
    } catch (err: unknown) {
      this.handleLoginError(err)
    }
  }

  private handleLoginError(err: unknown): void {
    if (err instanceof Error) {
      // Verificamos si err es una instancia de Error
      this.error = { message: err.message }
    } else {
      // En caso de que err no sea una instancia de Error, asignamos un mensaje genérico
      this.error = { message: 'An unknown error occurred' }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>
