<script setup>
import { onMounted, ref, computed } from 'vue'
import { useGetBooksStore } from '../../stores/useGetBooksStore/useGetBooksStore.js'

const booksList = ref([])
const getBooks = useGetBooksStore()

onMounted(async () => {
  await getBooks.getBooks()
  booksList.value = getBooks.books
})

const fields = ['id', 'title', 'body', 'actions']
const perPage = 6
const currentPage = ref(1)
const totalRows = computed(() => booksList.value.length)

// Dados mockados de autores
const fieldsAuthors = ['id', 'name']
const authors = ref([
  { id: 1, name: "Bruna" },
  { id: 2, name: "Carlos" },
  { id: 3, name: "Fernando" }
])

// Variáveis de controle de visibilidade
const showAuthors = ref(false)
const showBooks = ref(true)
const toggleAuthors = () => {
  showAuthors.value = !showAuthors.value
  showBooks.value = !showBooks.value
}

// Para o modal de edição
const editBook = ref({
  id: null,
  title: '',
  body: '',
  published_date: ''
})
const modalShow = ref(false)

const openModal = (book) => {
  editBook.value = { ...book }
  modalShow.value = true
}

const updateBook = () => {
  console.log('Livro atualizado:', editBook.value)
  modalShow.value = false
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary">Bem-vindo, ao Startbooks.com</h1>
    <router-link to="/book/register">
      <b-button v-if="showBooks" variant="primary">Registrar Livro</b-button>
    </router-link>
    <router-link to="/author/register">
      <b-button v-if="showAuthors" variant="primary">Registrar Autor</b-button>
    </router-link>

    <!-- Botão de Autores -->
    <b-button v-if="showBooks" variant="info" @click="toggleAuthors">
      Autores
    </b-button>
    <b-button v-if="showAuthors" variant="info" @click="toggleAuthors">
      Livros
    </b-button>
  </div>

  <!-- Exibindo dados de autores -->
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
  <div v-if="showBooks" class="container">
    <b-table 
      striped 
      hover 
      :items="booksList" 
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
    >
      <template v-slot:cell(actions)="row">
        <b-button @click="openModal(row.item)" variant="warning" size="sm">
          Editar
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>

  <!-- Modal de Edição -->
  <b-modal v-model="modalShow" title="Editar Livro">
    <b-form @submit.prevent="updateBook">
      <b-form-group label="Título do Livro">
        <b-form-input v-model="editBook.title" type="text" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Descrição">
        <b-form-input v-model="editBook.body" type="text" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Data de Publicação">
        <b-form-input v-model="editBook.published_date" type="date" required></b-form-input>
      </b-form-group>
      
    </b-form>
  </b-modal>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>