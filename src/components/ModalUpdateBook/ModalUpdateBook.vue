<script setup>
import { defineProps, defineEmits, onMounted, ref, watch } from 'vue'
import { useGetAuthorsStore } from '../../stores/useGetAuthorsStore'
import { useUpdateBookData } from '../../stores/useUpdateBookData'

const props = defineProps({
    editBook: Object,
    modalShow: Boolean
})

const emit = defineEmits(['update', 'update:modalShow', 'refresh']) 
const authorsStore = useGetAuthorsStore()
const updateBookStore = useUpdateBookData()
const authors = ref([])
const bookData = ref({...props.editBook})
const isSubmitting = ref(false)  

watch(() => props.editBook, (newValue) => {
    bookData.value = {...newValue}
    if (bookData.value.published_date) {
        bookData.value.published_date = bookData.value.published_date.split('T')[0]
    }

    if (typeof bookData.value.author === 'string') {
        const authorId = bookData.value.author
        if (authors.value.length > 0) {
            const matchedAuthor = authors.value.find(author => author.id === authorId)
            if (matchedAuthor) {
                bookData.value.author = matchedAuthor
            }
        }
    }
}, { immediate: true, deep: true })
onMounted(async () => {
    await authorsStore.getAuthors()
    authors.value = authorsStore.authors

    if (typeof bookData.value.author === 'string') {
        const matchedAuthor = authors.value.find(author => author.id === bookData.value.author)
        if (matchedAuthor) {
            bookData.value.author = matchedAuthor
        }
    }
})

const updateBook = async () => {
    if (isSubmitting.value) return;  
    
    isSubmitting.value = true;
    try {
        const authorId = typeof bookData.value.author === 'object' 
            ? bookData.value.author.id 
            : bookData.value.author

        const updatedBook = await updateBookStore.updateBook(bookData.value.id, {
            ...bookData.value,
            author: authorId
        })
        
        emit('update', updatedBook) 
        emit('refresh')  
        emit('update:modalShow', false) 
        
        window.location.reload()
    } catch (error) {
        console.error('Falha ao atualizar livro:', error)
    } finally {
        isSubmitting.value = false
    }
}

const emitHide = () => {
    emit('update:modalShow', false)
}

const formattedDate = (dateString) => {
    if (!dateString) return ''
    return dateString.split('T')[0]
}
</script>

<template>
<div v-if="modalShow" class="modal-overlay">
    <div class="modal-container">
    <h3>Editar Livro</h3>
    <form @submit.prevent="updateBook">
        <div class="form-group">
        <label for="title">Título do Livro</label>
        <input
            id="title"
            v-model="bookData.title"
            type="text"
            required
            placeholder="Digite o título do livro"
        />
        </div>
        
        <div class="form-group">
        <label for="published_date">Data de Publicação</label>
        <input
            id="published_date"
            v-model="bookData.published_date"
            type="date"
            required
        />
        </div>
        
        <div class="form-group">
        <label for="author">Autor</label>
        <select v-model="bookData.author" id="author" required>
            <option disabled value="">Selecione um autor</option>
            <option v-for="author in authors" :key="author.id" :value="author.id">
                {{ author.name }}
            </option>
        </select>
        </div>
        
        <div class="modal-actions">
        <button type="submit" class="btn-save" :disabled="isSubmitting">
            {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
        </button>
        <button type="button" class="btn-cancel" @click="emitHide" :disabled="isSubmitting">Cancelar</button>
        </div>
    </form>
    </div>
</div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-size: 1rem;
    margin-bottom: 5px;
    display: block;
}

input, select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-save {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
}

.btn-cancel {
    background-color: #f8f9fa;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-save:hover:not(:disabled) {
    background-color: #0056b3;
}

.btn-cancel:hover:not(:disabled) {
    background-color: #e2e6ea;
}
</style>