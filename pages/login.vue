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

      <b-alert v-if="error" show variant="danger" class="mt-3">
        {{ error }}
      </b-alert>

      <b-button type="submit" variant="primary" block>Login</b-button>
    </b-form>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginPage extends Vue {

  username: string = '';
  password: string = '';
  error: string | null = null;
  

  async handleLogin(): Promise<void> {
    this.error = null;


    try {
      await this.$store.dispatch('auth/login', { username: this.username, password: this.password });
      
      this.$router.push('/products');
    } catch (err: unknown) {
      this.handleLoginError(err);
    }
  }

  private handleLoginError(err: unknown): void {
    if (err instanceof Error) {
      this.error = err.message;
    } else {
      this.error = 'Ocurrió un error desconocido';
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
