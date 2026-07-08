import { getSocket } from "./socket";

export interface Message {
    content: string;
    createdBy: string;
    createdAt: Date;
    id: string;
    chatroomId: string;
}

export function sendMessage(message: string) {
    getSocket().emit("messages:send", {
        message
    });
}
