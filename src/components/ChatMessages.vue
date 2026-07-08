<script setup lang="ts">
import { joinChatroom, type Chatroom } from "@/chatrooms";
import { sendMessage, type Message } from "@/chats";
import { EventBus } from "@/event-bus";
import { getSocket } from "@/socket";
import { computed, onMounted, onUnmounted, ref, type Ref } from "vue";
import ChatMessagesView from "./ChatMessagesView.vue";

const chatroom: Ref<Chatroom | null> = ref(null);
const chats: Ref<Message[] | null> = ref(null);
const chatMessage = ref("");
const canSendMessage = computed(() => chatMessage.value !== "");

const emit = defineEmits<{
    leaveChatroom: [];
}>();

async function joinChatroomHandler(room: Chatroom) {
    chatroom.value = room;
    chats.value = (await joinChatroom(room.id)).messages;
}

async function recievedMessageHandler(message: Message) {
    chats.value?.push(message);
}

function sendMessageHandler() {
    sendMessage(chatMessage.value);
    chatMessage.value = "";
}

onMounted(() => {
    EventBus.on("joinChatroom", joinChatroomHandler);
    getSocket().on("messages:received", recievedMessageHandler);
});

onUnmounted(() => {
    EventBus.off("joinChatroom", joinChatroomHandler);
    getSocket().off("messages:received", recievedMessageHandler);
});
</script>

<template>
    <div>
        <div
            v-if="chatroom !== null && chats !== null"
            class="grid h-dvh grid-rows-[auto_1fr_auto]"
        >
            <div class="bg-bg-secondary p-3 border-b">
                <button
                    class="tertiary-btn p-1 rounded-lg mr-2 md:hidden"
                    @click="emit('leaveChatroom')"
                >
                    &lt;-
                </button>
                <div class="text-xl inline">#{{ chatroom.name }}</div>
                <div>Chatroom</div>
            </div>
            <ChatMessagesView :chats />
            <div class="m-4 flex gap-2">
                <textarea
                    placeholder="Type in a message..."
                    class="resize-none text-lg field-sizing-content max-h-[50vh] w-full p-4 rounded-2xl bg-bg-secondary border"
                    v-model="chatMessage"
                ></textarea>
                <div class="flex flex-col justify-end">
                    <button
                        class="p-3 aspect-square rounded-[50%] border transition-all duration-100"
                        :disabled="!canSendMessage"
                        :class="{
                            'pointer-events-none': !canSendMessage,
                            '[box-shadow:0_0_10px_blue]': canSendMessage
                        }"
                        @click="sendMessageHandler"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center items-center h-dvh text-3xl opacity-25">
            Select a chatroom to start chatting!
        </div>
    </div>
</template>
