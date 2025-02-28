import { reactive } from 'vue'

export const useUpdateBookData = () => {
    const state = reactive({
        book: {}
    })

    const updateBook = async (bookId, updatedBookData) => {
        try {
        const response = await fetch(`https://startbook-api.onrender.com/api/v1/book/${bookId}/`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBookData),
        })
        if (response.ok) {
            const data = await response.json()
            state.book = data
        } else {
            throw new Error('Failed to update book data')
        }
        } catch (error) {
        console.error('Error updating book:', error)
        }
    }

    return {
        state,
        updateBook
    }
}
