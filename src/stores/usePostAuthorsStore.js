import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCreateAuthorStore = defineStore('createAuthor', () => {
    const loading = ref(false);

    const createAuthor = async (authorData) => {
        loading.value = true;
        try {
        const response = await fetch('https://startbook-api.onrender.com/api/v1/author/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(authorData),
        });

        if (!response.ok) throw new Error('Erro ao criar o autor');

        const data = await response.json();
        console.log('Autor criado com sucesso:', data);
        return data;
        } catch (error) {
        console.error('Erro ao criar o autor:', error);
        throw error; 
        } finally {
        loading.value = false;
        }
    };

    return { createAuthor, loading };
});