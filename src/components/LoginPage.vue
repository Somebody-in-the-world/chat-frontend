<script setup lang="ts">
import { init } from "@/core";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { loginUser } from "../auth";
import { resolve } from "../result";
import { router } from "../router";

const username = ref("");
const password = ref("");
const canLogin = computed(() => username.value !== "" && password.value !== "");
const isLoading = ref(false);

async function login() {
    isLoading.value = true;
    resolve(
        await loginUser(username.value, password.value),
        async () => {
            await init();
            router.push("/");
        },
        (err) => {
            isLoading.value = false;
            switch (err.code) {
                case 401:
                    window.alert("Wrong username or password!");
                    break;
                case 429:
                    window.alert("Too many attempts, please try again later");
                    break;
            }
        }
    );
}
</script>

<template>
    <div class="h-dvh p-4 md:p-8 grid place-items-center">
        <form
            class="border-2 rounded-2xl p-4 shadow-2xl text-center w-full bg-bg-secondary"
            @submit.prevent
        >
            <h3 class="text-4xl text-shadow-lg mb-2">Login</h3>
            <div class="mb-2">
                <label for="username" class="block">Username</label>
                <input
                    type="text"
                    id="username"
                    class="border-[1.5px] rounded-sm"
                    required
                    v-model="username"
                />
            </div>
            <div class="mb-6">
                <label for="password" class="block">Password</label>
                <input
                    type="password"
                    id="password"
                    class="border-[1.5px] rounded-sm"
                    required
                    v-model="password"
                />
            </div>
            <div class="mb-4">
                <button
                    type="submit"
                    class="w-[50%] p-2 rounded-3xl text-lg transition-all duration-500 hover:text-xl active:text-2xl"
                    @click="login"
                    :disabled="!canLogin || isLoading"
                    :class="{
                        'pointer-events-none': !canLogin || isLoading,
                        '[box-shadow:0_0_10px_blue]': canLogin && !isLoading
                    }"
                    ref="login-btn"
                >
                    {{ isLoading ? "Logging in..." : "Log in" }}
                </button>
            </div>
            <RouterLink to="/signup" class="underline text-blue-600 hover:text-blue-800 text-md"
                >Create account</RouterLink
            >
        </form>
    </div>
</template>
