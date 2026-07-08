import { client } from "./config";
import { failure, NO_RESULT } from "./result";
import { initSocket } from "./socket";
import type { User } from "./users";

const TOKEN_KEY = "token";
let userInfo: User | null = null;
export function getUser() {
    return userInfo;
}

export function getRawToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getToken() {
    return `Bearer ${getRawToken()}`;
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function isAuthenticated() {
    return localStorage.getItem(TOKEN_KEY) !== null;
}

export async function initAuth() {
    const { data, error } = await client.GET("/api/userinfo", {
        headers: {
            Authorization: getToken()
        }
    });
    if (error?.code === 401) deleteToken();
    if (error) return failure(error);
    userInfo = data;
    return NO_RESULT;
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function initSocketWithToken() {
    initSocket({
        auth: {
            token: getRawToken()
        }
    });
}

export async function loginUser(username: string, password: string) {
    const { data, error } = await client.POST("/api/login", {
        body: {
            username,
            password
        }
    });
    if (error) return failure(error);
    setToken(data.token);
    return NO_RESULT;
}

export async function logoutUser() {
    const { error } = await client.POST("/api/logout", {
        headers: {
            Authorization: getToken()
        }
    });
    if (error) {
        return failure(error);
    }
    return NO_RESULT;
}
