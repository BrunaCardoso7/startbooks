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

    <!-- ModalUpdateBook importado e utilizado -->
    <ModalUpdateBook
      :editBook="editBook"
      :modalShow="modalShow"
      @update="updateBook"
      @update:modalShow="modalShow = $event" 
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGetBooksStore } from '../../stores/useGetBooksStore'
import { useGetAuthorsStore } from '../../stores/useGetAuthorsStore'
import AuthorsTable from '../../components/AuthorsTable/AuthorsTable.vue'
import BooksTable from '../../components/BooksTable/BooksTable.vue'
import ModalUpdateBook from '../../components/ModalUpdateBook/ModalUpdateBook.vue'

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
  console.log('Abrindo modal...', book)  // Verifique se este log aparece
  editBook.value = { ...book }  // Copiar os dados do livro para a variável editBook
  modalShow.value = true  // Isso deve disparar a exibição do modal
  console.log('modalShow antes:', modalShow.value)  // Verifique se o modalShow é alterado
}

const updateBook = (updatedBook) => {
  console.log('Livro atualizado:', updatedBook)  // Verifique se o livro está sendo atualizado corretamente
  // Atualize o livro com os novos dados
  const index = booksList.value.findIndex(b => b.id === updatedBook.id)
  if (index !== -1) {
    booksList.value[index] = updatedBook
  }
  modalShow.value = false  // Fechar o modal após a atualização
  console.log('modalShow após atualização:', modalShow.value)  // Verifique o estado do modal
}
</script>
