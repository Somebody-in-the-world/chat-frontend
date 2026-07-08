import { io, Socket, type ManagerOptions, type SocketOptions } from "socket.io-client";
import { API_BASE_URL } from "./config";

let socket: Socket | null = null;

export function getSocket() {
    if (socket === null) throw new Error("Socket not initialized");
    return socket;
}
export function initSocket(opts?: Partial<ManagerOptions & SocketOptions>) {
    socket = io(API_BASE_URL, opts);
}
