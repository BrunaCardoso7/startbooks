<script setup>
import { reactive, onMounted } from 'vue';
import { useGetAuthorsStore } from '../../stores/useGetAuthorsStore';
import { useCreateBookStore } from '../../stores/usePostBookStore';

const form = reactive({
  title: "",
  published_date: "",
  author: "" 
});

const authorsStore = useGetAuthorsStore();  
const createBookStore = useCreateBookStore(); 

onMounted(() => {
  authorsStore.getAuthors();
});

const onSubmit = async (event) => { 
  event.preventDefault();

  const bookData = {
    title: form.title,
    published_date: form.published_date,
    author: form.author, 
  };

  try {
    await createBookStore.createBook(bookData);

    form.title = '';
    form.published_date = '';
    form.author = '';
  } catch (error) {
    console.error('Erro ao criar o livro:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary">Registre seu livro!</h1>
    
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
          :options="authorsStore.authors.map(author => ({ value: author.id, text: author.name }))"
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
