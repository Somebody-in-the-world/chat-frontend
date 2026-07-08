import { resolveErr } from "@/result";
import { getUserInfo, type User } from "@/users";
import { reactive, toValue, watch, type MaybeRefOrGetter, type Reactive } from "vue";

const userCache = new Map<string, User>();

async function getUserByUid(id: string) {
    if (userCache.has(id)) return userCache.get(id)!;
    const user = resolveErr(await getUserInfo(id), (err) => {
        if (err.code === 404) {
            return {
                uid: id,
                username: null
            };
        }
        if (err.code === 429) {
            return {
                uid: id,
                username: null
            };
        }
        throw new Error(err);
    });
    userCache.set(id, user);
    return user;
}

export function useFetchUsers(uids: MaybeRefOrGetter<string[]>) {
    const users: Reactive<Map<string, User>> = reactive(new Map());

    watch(
        () => toValue(uids),
        async () => {
            for (const uid of toValue(uids)) {
                users.set(uid, await getUserByUid(uid));
            }
        },
        { immediate: true }
    );

    return { users };
}
