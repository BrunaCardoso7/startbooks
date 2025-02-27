<script setup>
import { onMounted, ref, computed } from 'vue'
import { useGetBooksStore } from '../../stores/useGetBooksStore/useGetBooksStore.js'

const booksList = ref([]) 
const getBooks = useGetBooksStore()

onMounted(async () => {
  await getBooks.getBooks()
  booksList.value = getBooks.books 
})

const fields = ['id', 'title', 'body']
const perPage = 6
const currentPage = ref(1) 

const totalRows = computed(() => booksList.value.length)

// Dados mockados de autores
const fieldsAuthors = ['id', 'name']
const authors = ref([
  { id: 1, name: "Bruna" },
  { id: 2, name: "Carlos" },
  { id: 3, name: "Fernando" },
])

// Variável de controle para exibir ou ocultar autores
const showAuthors = ref(false)
const showBooks = ref(true)

const toggleAuthors = () => {
  showAuthors.value = !showAuthors.value
  showBooks.value = !showBooks.value
}

</script>
<template>
  <h1>{{ msg }}</h1>
  <div class="container mt-5 ">
    <h1 class="text-primary">Bem-vindo, ao Startbooks.com</h1>
    <router-link to="/book/register">
      <b-button v-if="showBooks" variant="primary">Registrar Livro</b-button>
    </router-link>
    <router-link to="/author/register">
      <b-button  v-if="showAuthors" variant="primary">Registrar Autor</b-button>
    </router-link>
    
    <!-- Botão de Autores -->
    <b-button v-if="showBooks" variant="info" @click="toggleAuthors">
      Autores
    </b-button>
    <b-button v-if="showAuthors" variant="info" @click="toggleAuthors">
      Livros
    </b-button>
  </div>

  <!-- Exibindo dados de autores se showAuthors for true -->
  <div v-if="showAuthors" class="container mt-4">
    <h3>Autores</h3>
    <b-table 
      striped 
      hover 
      :items="authors" 
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fieldsAuthors"
    ></b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>

  <!-- Tabela de livros -->
  <div 
    v-if="showBooks"
    class="container"
  >
    <b-table 
      striped 
      hover 
      :items="booksList" 
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
    ></b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
