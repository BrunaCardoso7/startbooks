<script setup>
import { reactive } from 'vue';
import { useCreateAuthorStore } from '../../stores/usePostAuthorsStore';

const form = reactive({
    name: "",  // Nome do autor
});

const createAuthorStore = useCreateAuthorStore(); 

const onSubmit = async (event) => { 
    event.preventDefault();

    // Enviar o nome do autor no formato correto
    const authorData = {
        name: form.name,  // Certifique-se de que o backend espera "name" e não "title"
    };

    try {
        // Chama o store para criar o autor
        await createAuthorStore.createAuthor(authorData);
        form.name = '';  // Limpa o campo após o sucesso
    } catch (error) {
        console.error('Erro ao criar o autor:', error);
    }
};
</script>

<template>
    <div class="container mt-5">
        <h1 class="text-primary">Registre Autor!</h1>
        
        <!-- Formulário de registro -->
        <b-form @submit="onSubmit">
            <b-form-group id="input-group-1" label="Nome do Autor:" label-for="input-1">
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
