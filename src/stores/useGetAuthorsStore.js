import { defineStore } from "pinia";
import { ref } from "vue";

export const useGetAuthorsStore = defineStore('getAuthors', () => {
    const authors = ref([]);
    const loading = ref(true);
    
    const getAuthors = async () => {
        loading.value = true;
        try {
            const response = await fetch('https://startbook-api.onrender.com/api/v1/author/');
            const data = await response.json();
            authors.value = data; 
        } catch (error) {
            console.error("Erro ao listar autores: ", error);
        } finally {
            loading.value = false;
        }
    };

    return { authors, loading, getAuthors };
});
