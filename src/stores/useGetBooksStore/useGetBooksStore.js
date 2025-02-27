import { defineStore } from "pinia";

export const useGetBooksStore = defineStore('books',
    {
        state: () => ({
            books: null,
            loading: false,
            error: null
        }),
        actions: {
            async getBooks() {
                this.loading = true
                this.error = null
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                    const data =  await response.json()
                    this.books = data
                } catch (error) {
                    this.error(error.message)
                }
            }
        }
    }
) 