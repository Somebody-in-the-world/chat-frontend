import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import SignupPage from "@/components/SignupPage.vue";
import MainPage from "@/components/MainPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: MainPage
    },
    {
        path: "/login",
        component: LoginPage
    },
    {
        path: "/signup",
        component: SignupPage
    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
