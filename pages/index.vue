<template>
  <div>
    <h1>Variable en Vuex: {{ myVariable }}</h1>
    <input v-model="newValue" placeholder="Nueva variable" />
    <button @click="setVariable">Actualizar Variable</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  // Computed properties para acceder a Vuex
  get myVariable(): string {
    return this.$store.state.myVariable
  }

  get newValue(): string {
    return this.$store.state.myVariable
  }

  set newValue(value: string) {
    this.$store.dispatch('updateMyVariable', value)
  }

  // Método para actualizar la variable en Vuex
  setVariable() {
    const value = this.newValue
    this.$store.dispatch('updateMyVariable', value)
  }
}
</script>

<style scoped>
/* Puedes añadir tu estilo aquí */
</style>
