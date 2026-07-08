import mitt from "mitt";
import type { Chatroom } from "./chatrooms";

export const EventBus = mitt<{
    joinChatroom: Chatroom;
    refreshChatroomList: void;
}>();
