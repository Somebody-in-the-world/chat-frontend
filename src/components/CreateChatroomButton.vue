<script setup lang="ts">
import { createChatroom } from "@/chatrooms";
import { EventBus } from "@/event-bus";
import { expect } from "@/result";

async function createChatroomHandler() {
    const name = window.prompt("Chatroom name:");
    if (!name) return;
    expect(await createChatroom(name));
    EventBus.emit("refreshChatroomList");
}
</script>

<template>
    <button class="w-10/12 p-2 text-lg rounded-2xl" @click="createChatroomHandler">
        Create a new chatroom
    </button>
</template>
