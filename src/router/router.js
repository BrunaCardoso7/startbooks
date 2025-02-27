import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../view/HomePage/HomePage.vue";
import Book from "../view/BookRegister/BookRegister.vue"; // Certifique-se de que esse caminho está correto
import AuthorRegister from "../view/AuthorRegister/AuthorRegister.vue";

const routes = [
    {
        path: "/", 
        component: HomePage,
    },
    {
        path: "/book/register", 
        component: Book,
    },
    {
        path: "/author/register", 
        component: AuthorRegister,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
