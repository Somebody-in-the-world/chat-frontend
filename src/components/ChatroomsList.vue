<script setup lang="ts">
import { leaveChatroom, listChatrooms, type Chatroom } from "@/chatrooms";
import { useFetchUsers } from "@/composables/useFetchUsers";
import { EventBus } from "@/event-bus";
import { expect } from "@/result";
import { computed, onMounted, onUnmounted, ref, type Ref } from "vue";
import CreateChatroomButton from "./CreateChatroomButton.vue";
import Seperator from "./SeperatorComponent.vue";

const chatrooms: Ref<Chatroom[] | null> = ref(null);
const chatroomCreatedBy = computed(() => chatrooms.value?.map((room) => room.createdBy) ?? []);
const { users } = useFetchUsers(chatroomCreatedBy);
const selectedChatroomId: Ref<string | null> = ref(null);

async function refreshChatroomList() {
    chatrooms.value = expect(await listChatrooms());
}

onMounted(() => {
    EventBus.on("refreshChatroomList", refreshChatroomList);
    refreshChatroomList();
});

onUnmounted(() => {
    EventBus.off("refreshChatroomList", refreshChatroomList);
});

function selectChatroom(chatroom: Chatroom) {
    if (selectedChatroomId.value !== null) {
        leaveChatroom();
    }
    selectedChatroomId.value = chatroom.id;
    EventBus.emit("joinChatroom", chatroom);
}
</script>

<template>
    <div class="text-center overflow-scroll">
        <div v-for="(chatroom, id) in chatrooms" :key="id">
            <div class="p-1">
                <button
                    class="p-2 text-left rounded-xl bg-transparent block text-text-primary w-full"
                    :class="{
                        'md:bg-[#d6d2ee]': selectedChatroomId === chatroom.id,
                        'md:dark:bg-[#2a2838]': selectedChatroomId === chatroom.id,
                        'md:hover:bg-[#e2def5]': selectedChatroomId !== chatroom.id,
                        'md:dark:hover:bg-[#1e1c2a]': selectedChatroomId !== chatroom.id
                    }"
                    @click="selectChatroom(chatroom)"
                >
                    <div class="text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                        #{{ chatroom.name }}
                    </div>
                    Created by
                    {{ users.get(chatroom.createdBy)?.username ?? "[Deleted user]" }}
                </button>
            </div>
        </div>
        <Seperator class="mb-1" />
        <CreateChatroomButton />
    </div>
</template>
