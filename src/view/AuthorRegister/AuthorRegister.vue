<script setup>
import { reactive } from 'vue'

// Definindo o formulário como reativo
const form = reactive({
    name: "",
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
        <h1 class="text-primary">Registre Autor!</h1>
        
        <!-- Formulário de registro -->
        <b-form @submit="onSubmit">
        
        <b-form-group
            id="input-group-1"
            label="Nome do Autor:"
            label-for="input-1"
        >
            <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            placeholder="Nome do autor ..."
            required
            ></b-form-input>
        </b-form-group>


        <b-button type="submit" variant="primary">Salvar</b-button>
        </b-form>
    </div>
</template>

<style scoped>
.container {
    width: 80%;
    margin: 0 auto;
}
</style>
