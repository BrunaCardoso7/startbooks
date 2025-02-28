<script setup>
import { reactive, ref } from 'vue';
import { useCreateAuthorStore } from '../../stores/usePostAuthorsStore';
import { useRouter } from 'vue-router';

const form = reactive({
    name: '',
});

const errors = reactive({
    name: ''
});

const successMessage = ref('');
const createAuthorStore = useCreateAuthorStore(); 
const router = useRouter();

const validateForm = () => {
    let isValid = true;

    if (!form.name.trim()) {
        errors.name = 'O nome do autor é obrigatório.';
        isValid = false;
    } else {
        errors.name = '';
    }

    return isValid;
};

const onSubmit = async (event) => { 
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {
        await createAuthorStore.createAuthor({ name: form.name });

        form.name = '';

        successMessage.value = 'Autor cadastrado com sucesso!';

        setTimeout(() => {
            successMessage.value = '';
        }, 3000);

    } catch (error) {
        console.error('Erro ao criar o autor:', error);
    }
};
</script>

<template>
    <div class="container mt-5">
        <h1 class="text-primary">Registre Autor!</h1>

        <b-button variant="secondary" class="mb-3" @click="router.push('/')">
            ← Voltar
        </b-button>

        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <b-form @submit="onSubmit">
            <b-form-group label="Nome do Autor:" label-for="input-name">
                <b-form-input
                    id="input-name"
                    v-model="form.name"
                    type="text"
                    placeholder="Nome do autor ..."
                ></b-form-input>
                <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
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

.success-message {
    background-color: #d4edda;
    color: #155724;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #c3e6cb;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 15px;
    font-weight: bold;
}

.error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: 5px;
}
</style>
