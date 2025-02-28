<template>
    <h3>Livros</h3>
    <div class="container">
        <b-table 
            striped 
            hover 
            :items="formattedBooksList" 
            :fields="fields"
        >
            <template v-slot:cell(actions)="row">
                <b-button @click="$emit('edit', row.item)" variant="warning" size="sm">
                    Editar
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import { useGetAuthorStore } from '../../stores/useGetAuthorStore'

const props = defineProps({
    booksList: Array
})

const fields = ['title', 'published_date', 'author', 'actions']

const { getAuthorById, authors } = useGetAuthorStore()

const formattedBooksList = ref([])

const loadAuthorNames = async () => {
    const booksWithAuthors = []

    for (const book of props.booksList) {
        const authorName = await getAuthorById(book.author) 
        booksWithAuthors.push({
            ...book,
            published_date: new Date(book.published_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            author: authorName || 'Desconhecido'  
        })
    }

    formattedBooksList.value = booksWithAuthors 
}

onMounted(() => {
    loadAuthorNames()
})
</script>
