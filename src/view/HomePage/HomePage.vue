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
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="container mt-5">
    <h1 class="text-primary">Olá, Bootstrap com Vue 3!</h1>
    <button class="btn btn-success">Clique Aqui</button>
  </div>

  <div class="container">
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
