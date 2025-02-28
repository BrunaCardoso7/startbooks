<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useGetAuthorsStore } from '../../stores/useGetAuthorsStore';
import { useCreateBookStore } from '../../stores/usePostBookStore';
import { useRouter } from 'vue-router';

const form = reactive({
  title: '',
  published_date: '',
  author: ''
});

const errors = reactive({
  title: '',
  published_date: '',
  author: ''
});

const successMessage = ref('');
const authorsStore = useGetAuthorsStore();  
const createBookStore = useCreateBookStore(); 
const router = useRouter();

onMounted(() => {
  authorsStore.getAuthors();
});

const validateForm = () => {
  let isValid = true;
  
  if (!form.title) {
    errors.title = 'O nome do livro é obrigatório.';
    isValid = false;
  } else {
    errors.title = '';
  }

  if (!form.published_date) {
    errors.published_date = 'A data de publicação é obrigatória.';
    isValid = false;
  } else {
    errors.published_date = '';
  }

  if (!form.author) {
    errors.author = 'Selecione um autor.';
    isValid = false;
  } else {
    errors.author = '';
  }

  return isValid;
};

const onSubmit = async (event) => { 
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const bookData = {
    title: form.title,
    published_date: form.published_date,
    author: form.author
  };

  try {
    await createBookStore.createBook(bookData);

    form.title = '';
    form.published_date = '';
    form.author = '';

    successMessage.value = 'Livro cadastrado com sucesso!';
    
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);

  } catch (error) {
    console.error('Erro ao criar o livro:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary">Registre seu livro!</h1>

    <b-button variant="secondary" class="mb-3" @click="router.push('/')">
      ← Voltar
    </b-button>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <b-form @submit="onSubmit">
      
      <b-form-group label="Nome do Livro:" label-for="input-title">
        <b-form-input
          id="input-title"
          v-model="form.title"
          type="text"
          placeholder="Nome do livro ..."
        ></b-form-input>
        <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
      </b-form-group>

      <b-form-group label="Data de Publicação:" label-for="input-date">
        <b-form-input
          id="input-date"
          v-model="form.published_date"
          type="date"
        ></b-form-input>
        <p v-if="errors.published_date" class="error-message">{{ errors.published_date }}</p>
      </b-form-group>

      <b-form-group label="Autor:" label-for="input-author">
        <b-form-select
          id="input-author"
          v-model="form.author"
          :options="authorsStore.authors.map(author => ({ value: author.id, text: author.name }))"
        ></b-form-select>
        <p v-if="errors.author" class="error-message">{{ errors.author }}</p>
      </b-form-group>

      <b-button type="submit" variant="primary">Cadastrar</b-button>
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
