import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCreateBookStore = defineStore('createBook', () => {
    const loading = ref(false);

    const createBook = async (bookData) => {
        loading.value = true;
        try {
        const response = await fetch('https://startbook-api.onrender.com/api/v1/book/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) throw new Error('Erro ao criar o livro');

        const data = await response.json();
        console.log('Livro criado com sucesso:', data);
        return data;
        } catch (error) {
        console.error('Erro ao criar o livro:', error);
        throw error; 
        } finally {
        loading.value = false;
        }
    };

    return { createBook, loading };
});
