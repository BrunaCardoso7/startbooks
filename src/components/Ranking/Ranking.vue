<script setup>
import { onMounted, computed } from 'vue';
import { useRankingStore } from '../../stores/useRankingStore';

const rankingStore = useRankingStore();

const authorsRanking = computed(() => rankingStore.authorsRanking.value);

onMounted(async () => {
    console.log("Iniciando requisição de ranqueamento...");
    await rankingStore.fetchRanking();
    console.log("Authors Ranking Atualizado:", authorsRanking.value);
});
</script>

<template>
    <div>
        <h2>Top 5 Autores com mais de 5 Livros</h2>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Livros</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(author, index) in authorsRanking" :key="author.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ author.name }}</td>
                    <td>{{ author.book_count }}</td>
                </tr>
            </tbody>
        </table>

        <p v-if="authorsRanking.length === 0">Nenhum autor encontrado com mais de 5 livros.</p>
    </div>
</template>
