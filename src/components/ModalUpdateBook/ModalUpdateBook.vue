<template>
<b-modal :visible="modalShow" @hide="emitHide" title="Editar Livro">
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

    <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
</b-modal>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
editBook: Object,
modalShow: Boolean
})

const emit = defineEmits(['update', 'update:modalShow'])

const updateBook = () => {
emit('update', props.editBook)  // Emitir os dados do livro atualizado
emit('update:modalShow', false) // Fechar o modal após atualização
}

const emitHide = () => {
emit('update:modalShow', false)  // Fechar o modal quando o evento de esconder for acionado
}
</script>
