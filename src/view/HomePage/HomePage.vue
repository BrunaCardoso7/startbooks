<template>
  <div class="container mt-5">
    <h1 class="text-primary">Bem-vindo ao Startbooks.com</h1>
    <router-link to="/book/register">
      <b-button v-if="!showAuthors" variant="primary">Registrar Livro</b-button>
    </router-link>
    <router-link to="/author/register">
      <b-button v-if="showAuthors" variant="primary">Registrar Autor</b-button>
    </router-link>
    <b-button variant="info" @click="toggleView">
      {{ showAuthors ? 'Livros' : 'Autores' }}
    </b-button>

    <AuthorsTable v-if="showAuthors" :authorsList="authorList" />
    <BooksTable v-if="!showAuthors" :booksList="booksList" @edit="openModal" />
    <!-- <EditBookModal v-if="modalShow" :editBook="editBook" @update="updateBook" /> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGetBooksStore } from '../../stores/useGetBooksStore'
import { useGetAuthorsStore } from '../../stores/useGetAuthorsStore'
import AuthorsTable from '../../components/AuthorsTable/AuthorsTable.vue'
import BooksTable from '../../components/BooksTable/BooksTable.vue'
// import ModalU from '../components/EditBookModal.vue'

const getBooks = useGetBooksStore()
const booksList = ref([])

const getAuthors = useGetAuthorsStore()
const authorList = ref([])

const showAuthors = ref(false)
const modalShow = ref(false)
const editBook = ref({})

onMounted(async () => {
  await getBooks.getBooks()
  booksList.value = getBooks.books

  await getAuthors.getAuthors()
  authorList.value = getAuthors.authors
})

const toggleView = () => showAuthors.value = !showAuthors.value

const openModal = (book) => {
  editBook.value = { ...book }
  modalShow.value = true
}

const updateBook = () => {
  console.log('Livro atualizado:', editBook.value)
  modalShow.value = false
}
</script>
