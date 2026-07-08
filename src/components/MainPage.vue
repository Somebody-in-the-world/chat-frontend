<script setup lang="ts">
import { EventBus } from "@/event-bus.ts";
import { onMounted, onUnmounted, ref } from "vue";
import { isAuthenticated } from "../auth.ts";
import { router } from "../router/index.ts";
import ChatMessages from "./ChatMessages.vue";
import ChatroomsList from "./ChatroomsList.vue";
import Seperator from "./SeperatorComponent.vue";
import UserProfile from "./UserProfile.vue";

if (!isAuthenticated()) {
    router.push("/login");
}

const inChatroomListView = ref(true);

function joinChatroomHandler() {
    inChatroomListView.value = false;
}

onMounted(() => {
    EventBus.on("joinChatroom", joinChatroomHandler);
});

onUnmounted(() => {
    EventBus.off("joinChatroom", joinChatroomHandler);
});
</script>

<template>
    <div v-if="isAuthenticated()">
        <div class="grid-cols-[1fr_3fr] h-dvh hidden md:grid">
            <div class="grid grid-rows-[9fr_auto] h-dvh border bg-bg-secondary">
                <ChatroomsList />
                <UserProfile />
            </div>
            <ChatMessages />
        </div>
        <div class="md:hidden">
            <div
                class="grid grid-rows-[auto_auto_9fr] h-dvh border bg-bg-secondary"
                v-show="inChatroomListView"
            >
                <UserProfile />
                <Seperator />
                <ChatroomsList />
            </div>
            <ChatMessages
                v-show="!inChatroomListView"
                @leave-chatroom="inChatroomListView = true"
            />
        </div>
    </div>
</template>
