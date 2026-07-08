<script setup lang="ts">
import { getUser } from "@/auth";
import type { Message } from "@/chats";
import { useFetchUsers } from "@/composables/useFetchUsers";
import { computed } from "vue";

const { chats } = defineProps<{
    chats: Message[];
}>();
const userIds = computed(() => chats.map((chat) => chat.createdBy));
const { users } = useFetchUsers(userIds);
</script>

<template>
    <div class="p-3 overflow-scroll">
        <div
            v-for="(chat, id) in chats"
            :key="id"
            class="flex"
            :class="{ ' [justify-content:right]': getUser()?.uid === chat.createdBy }"
        >
            <div class="bg-bg-secondary p-2 pl-4 pr-4 rounded-xl w-fit mb-2">
                <span v-show="getUser()?.uid !== chat.createdBy">{{
                    users.get(chat.createdBy)?.username ?? "[Deleted user]"
                }}</span>
                <div class="text-xl">{{ chat.content }}</div>
            </div>
        </div>
    </div>
</template>
