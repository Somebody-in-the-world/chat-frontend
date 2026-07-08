import { getToken } from "./auth";
import { client } from "./config";
import { failure, NO_RESULT, success } from "./result";

export interface User {
    username: string | null;
    uid: string;
}

export async function createUser(username: string, password: string) {
    const { error } = await client.POST("/api/users/", {
        body: { username, password }
    });
    if (error) return failure(error);
    return NO_RESULT;
}

export async function deleteUser(uid: string) {
    const { error } = await client.DELETE("/api/users/{id}", {
        headers: {
            Authorization: getToken()
        },
        params: {
            path: { id: uid }
        }
    });
    if (error) return failure(error);
    return NO_RESULT;
}

export async function getUserInfo(id: string) {
    const { data, error } = await client.GET(`/api/users/{id}`, {
        params: { path: { id } }
    });
    if (error) return failure(error);
    return success(data);
}
