<script setup lang="ts">
import { getUser, logoutUser } from "@/auth";
import { expect } from "@/result";
import { router } from "@/router";
import SeperatorComponent from "./SeperatorComponent.vue";
import { ref, watch } from "vue";
import { applyTheme, getTheme, setTheme } from "@/themes.ts";
import { deleteUser } from "@/users.ts";
const user = getUser();
const menuOpened = ref(false);
const theme = ref(getTheme());

watch(theme, (val) => {
    setTheme(val);
    applyTheme(val);
});

async function logout() {
    expect(await logoutUser());
    router.push("/login");
}

async function deleteAccount() {
    if (
        !window.confirm(
            "Do you want to delete your account? This action is permanent and cannot be reversed!"
        )
    )
        return;
    if (
        window.prompt('Type "I want to delete my account" to continue') !==
        "I want to delete my account"
    )
        return;
    expect(await deleteUser(getUser()!.uid));
    router.push("/login");
}
</script>

<template>
    <div class="mb-4">
        <SeperatorComponent class="mb-4" />
        <div class="pl-4 pr-4 flex justify-between items-center w-full">
            <span class="text-xl">{{ user?.username }}</span>
            <div>
                <button
                    class="p-2 rounded-2xl pl-4 pr-4 tertiary-btn"
                    @click="menuOpened = !menuOpened"
                >
                    ...
                </button>
                <div
                    class="w-max absolute md:bottom-1/12 -translate-x-8/12 md:-translate-x-4/12 p-4 opacity-0 bg-bg-primary border rounded-2xl text-left z-10 transition-all duration-100"
                    :class="{
                        'opacity-100': menuOpened,
                        'pointer-events-none': !menuOpened
                    }"
                    :inert="!menuOpened"
                >
                    <div class="mb-2">
                        <label for="theme-picker" class="text-lg mr-2">Theme:</label>
                        <select
                            id="theme-picker"
                            class="p-1 pl-2 pr-2 border rounded-md"
                            v-model="theme"
                        >
                            <option value="default">System</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                    <button class="p-2 rounded-2xl pl-4 pr-4 block" @click="logout">Logout</button>
                    <SeperatorComponent class="mt-2 mb-2" />
                    <details>
                        <summary class="text-lg">⚠️ Danger zone</summary>
                        <button
                            class="p-2 rounded-2xl pl-4 pr-4 secondary-btn block mt-2"
                            @click="deleteAccount"
                        >
                            Delete account
                        </button>
                    </details>
                </div>
            </div>
        </div>
    </div>
</template>
