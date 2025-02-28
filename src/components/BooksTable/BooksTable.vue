<template>
<div class="container">
    <b-table 
    striped 
    hover 
    :items="booksList" 
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
import { defineProps } from 'vue'
const props = defineProps({ booksList: Array })
const fields = ['id', 'title', 'body', 'actions']
</script>