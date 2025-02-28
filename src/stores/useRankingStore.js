import { ref } from 'vue';

export const useRankingStore = () => {
    const authorsRanking = ref([]);

    const fetchRanking = async () => {
        try {
            const response = await fetch('https://startbook-api.onrender.com/api/v1/ranking/');
            const data = await response.json();
            console.log("API response: ", data); 

            authorsRanking.value = data.filter(author => author.book_count > 5).slice(0, 5);
            console.log("Filtered ranking: ", authorsRanking.value); 
        } catch (error) {
            console.error('Error fetching ranking data:', error);
        }
    };

    return {
        authorsRanking,
        fetchRanking,
    };
};
