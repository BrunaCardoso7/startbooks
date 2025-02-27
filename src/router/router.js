import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../view/HomePage/HomePage.vue";
import Book from "../view/BookRegister/BookRegister.vue"; // Certifique-se de que esse caminho está correto

const routes = [
    {
        path: "/", 
        component: HomePage,
    },
    {
        path: "/book/register", 
        component: Book,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
