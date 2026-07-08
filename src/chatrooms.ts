import { getToken } from "./auth";
import type { Message } from "./chats";
import { client } from "./config";
import { failure, NO_RESULT, success } from "./result";
import { getSocket } from "./socket";

export interface Chatroom {
    id: string;
    name: string;
    createdBy: string;
}

export async function listChatrooms() {
    const { data } = await client.GET("/api/chatrooms/");
    return success(data!);
}

export async function joinChatroom(id: string) {
    const response: { messages: Message[] } = await getSocket().emitWithAck("chatrooms:join", {
        roomId: id
    });
    return response;
}

export async function createChatroom(name: string) {
    const { error } = await client.POST("/api/chatrooms/", {
        body: { name, visibility: "public" },
        headers: { Authorization: getToken() }
    });
    if (error) return failure(error);
    return NO_RESULT;
}

export function leaveChatroom() {
    getSocket().emit("chatrooms:leave");
}
