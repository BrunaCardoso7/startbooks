<template>
<b-modal v-model="modalShow" title="Editar Livro">
    <b-form @submit.prevent="$emit('update', editBook)">
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

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({ editBook: Object, modalShow: Boolean })
const emit = defineEmits(['update'])
</script>
