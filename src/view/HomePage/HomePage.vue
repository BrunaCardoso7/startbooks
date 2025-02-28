<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useGetBooksStore } from '../../stores/useGetBooksStore'
import { useWebSocketStore } from '../../stores/useWebSocketStore'
import AuthorsTable from '../../components/AuthorsTable/AuthorsTable.vue'
import BooksTable from '../../components/BooksTable/BooksTable.vue'
import ModalUpdateBook from '../../components/ModalUpdateBook/ModalUpdateBook.vue'
import { useGetAuthorsStore } from '../../stores/useGetAuthorsStore'
import Ranking from '../../components/Ranking/Ranking.vue'

const getBooks = useGetBooksStore()
const booksList = ref([])

const getAuthors = useGetAuthorsStore()
const authorList = ref([])

const activeTab = ref('books') 
const modalShow = ref(false)
const editBook = ref({})
const isRefreshing = ref(false)

const { notification, initWebSocket, closeWebSocket } = useWebSocketStore()

const fetchBooks = async () => {
  isRefreshing.value = true
  try {
    await getBooks.getBooks()
    booksList.value = getBooks.books
    console.log('Livros atualizados!')
  } catch (error) {
    console.error('Erro ao buscar livros:', error)
  } finally {
    isRefreshing.value = false
  }
}

const fetchAuthors = async () => {
  isRefreshing.value = true
  try {
    await getAuthors.getAuthors()
    authorList.value = getAuthors.authors
    console.log('Autores atualizados!')
  } catch (error) {
    console.error('Erro ao buscar autores:', error)
  } finally {
    isRefreshing.value = false
  }
}

onMounted(async () => {
  await fetchBooks()
  await fetchAuthors()
  initWebSocket()
})

onUnmounted(() => {
  closeWebSocket()
})

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const openModal = (book) => {
  console.log('Abrindo modal...', book)
  editBook.value = { ...book }
  modalShow.value = true
  console.log('modalShow antes:', modalShow.value)
}

const updateBook = async (updatedBook) => {
  console.log('Livro atualizado:', updatedBook)
  
  const index = booksList.value.findIndex(b => b.id === updatedBook.id)
  if (index !== -1) {
    booksList.value[index] = updatedBook
  }
  
  await fetchBooks()
  
  modalShow.value = false
  console.log('modalShow após atualização:', modalShow.value)
}

const refreshBooksList = async () => {
  console.log('Solicitação de atualização recebida')
  await fetchBooks()
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary">Bem-vindo ao Startbooks.com</h1>
    <Ranking/>
    
    <div class="container-buttons-notification">
      <div class="container-buttons">
        <router-link to="/book/register">
          <b-button variant="primary">Registrar Livro</b-button>
        </router-link>
        <router-link to="/author/register">
          <b-button variant="primary">Registrar Autor</b-button>
        </router-link>
        
        <b-button 
          :class="{ active: activeTab === 'books' }" 
          variant="info" 
          @click="setActiveTab('books')"
        >
          Livros
        </b-button>

        <b-button 
          :class="{ active: activeTab === 'authors' }" 
          variant="info" 
          @click="setActiveTab('authors')"
        >
          Autores
        </b-button>
      </div>
      
      <p v-if="notification" class="notification-message">
        {{ notification }}
      </p>
    </div>
    
    <b-alert variant="success" show>Success Alert</b-alert>
    
    <div v-if="isRefreshing" class="text-center my-3">
      <b-spinner label="Atualizando..." variant="primary"></b-spinner>
      <span class="ml-2">Atualizando dados...</span>
    </div>
    
    <AuthorsTable v-if="activeTab === 'authors' && authorList.length > 0" :authorsList="authorList" />
    
    <BooksTable 
      v-if="activeTab === 'books' && booksList.length > 0" 
      :booksList="booksList" 
      @edit="openModal" 
    />

    <ModalUpdateBook
      :editBook="editBook"
      :modalShow="modalShow"
      @update="updateBook"
      @update:modalShow="modalShow = $event"
      @refresh="refreshBooksList"
    />
  </div>
</template>

<style scoped>
.notification-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #c3e6cb;
  font-size: 1.2rem;
  margin-top: 20px;
  display: inline-block;
  font-weight: bold;
  animation: fadeIn 1s ease-out;
}

.container-buttons-notification {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.container-buttons {
  display: flex;
  gap: 10px;
}

.b-button.active {
  background-color: #007bff !important;
  color: white !important;
  border-color: #0056b3 !important;
}
</style>
