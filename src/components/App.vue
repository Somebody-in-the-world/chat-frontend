<script setup lang="ts">
import { isAuthenticated } from "@/auth";
import { router } from "@/router";

if (!isAuthenticated()) {
    router.push("/login");
}
</script>

<template>
    <RouterView />
</template>
