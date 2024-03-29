import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/HomePage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../pages/SignupPage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/LoginPage.vue')
        },
        {
            path: "/tasks",
            name: "tasks",
            component: () => import("../pages/TasksPage.vue"),
        },    
    ]
})

export default router