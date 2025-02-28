<template>
<div class="container mt-4">
    <h3>Autores</h3>
    <b-table 
    striped 
    hover 
    :items="authorsList"  
    :fields="fieldsAuthors"
    ></b-table>
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
authorsList: {
    type: Array,
    required: true
}
});

const fieldsAuthors = ['id', 'name']
</script>
