// stores/useGetAuthorStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGetAuthorStore = defineStore('getAuthor', () => {
  const authors = ref({})
  const loading = ref(false)
  const error = ref(null)

  const getAuthorById = async (id) => {
    if (authors.value[id]) {
      return authors.value[id]
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://startbook-api.onrender.com/api/v1/author/${id}`)
      if (!response.ok) {
        throw new Error('Autor não encontrado')
      }

      const data = await response.json()
      authors.value[id] = data.name 
      return data.name
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    authors,
    loading,
    error,
    getAuthorById
  }
})
