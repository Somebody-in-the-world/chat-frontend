<script setup lang="ts">
import { loginUser } from "@/auth";
import { init } from "@/core";
import { expect, resolveErr } from "@/result";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { router } from "../router";
import { createUser } from "../users";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const canSignup = computed(
    () => username.value !== "" && password.value !== "" && password.value === confirmPassword.value
);
const isLoading = ref(false);

async function signup() {
    isLoading.value = true;
    if (
        !resolveErr(await createUser(username.value, password.value), (err) => {
            isLoading.value = false;
            switch (err.code) {
                case 409:
                    window.alert("Username taken!");
                case 429:
                    window.alert("Too many attempts, please try again later");
                    break;
            }
        })
    ) {
        return;
    }

    expect(await loginUser(username.value, password.value));
    await init();
    router.push("/");
}
</script>

<template>
    <div class="h-dvh p-4 md:p-8 grid place-items-center">
        <form
            class="border-2 rounded-2xl p-4 shadow-2xl text-center w-full bg-bg-secondary"
            @submit.prevent
        >
            <h3 class="text-4xl text-shadow-lg mb-2">Sign up</h3>
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
            <div class="mb-2">
                <label for="password" class="block">Password</label>
                <input
                    type="password"
                    id="password"
                    class="border-[1.5px] rounded-sm"
                    required
                    v-model="password"
                />
            </div>
            <div class="mb-6">
                <label for="confirm-password" class="block">Confirm password</label>
                <input
                    type="password"
                    id="confirm-password"
                    class="border-[1.5px] rounded-sm"
                    required
                    v-model="confirmPassword"
                />
            </div>
            <div class="mb-4">
                <button
                    type="submit"
                    class="w-[50%] p-2 rounded-3xl text-lg transition-all duration-500 hover:text-xl active:text-2xl"
                    @click="signup"
                    :disabled="!canSignup || isLoading"
                    :class="{
                        'pointer-events-none': !canSignup || isLoading,
                        '[box-shadow:0_0_10px_blue]': canSignup && !isLoading
                    }"
                >
                    {{ isLoading ? "Creating your account..." : "Create account!" }}
                </button>
            </div>
            <RouterLink to="/login" class="underline text-blue-600 hover:text-blue-800 text-md"
                >Log in</RouterLink
            >
        </form>
    </div>
</template>
