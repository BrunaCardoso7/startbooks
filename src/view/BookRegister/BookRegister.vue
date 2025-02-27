<script setup>
import { reactive } from 'vue'

// Definindo o formulário como reativo
const form = reactive({
  title: "",
  published_date: "",
  author: ""
})

// Lista de autores com valores específicos
const authors = [
  { value: "bruna", text: "Bruna" },
  { value: "bruna2", text: "Bruna2" }
]

// Função para lidar com o envio do formulário
const onSubmit = (event) => { 
  event.preventDefault();
  console.log(JSON.stringify(form)) // Acessando 'form' diretamente, sem 'this'
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary">Registre seu livro!</h1>
    
    <!-- Formulário de registro -->
    <b-form @submit="onSubmit">
      
      <b-form-group
        id="input-group-1"
        label="Nome do Livro:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          placeholder="Nome do livro ..."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Data de Publicação:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.published_date"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Autor:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.author"
          :options="authors"
          required
          value-field="value"   
          text-field="text"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
