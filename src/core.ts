import { resolve } from "./result";
import { isAuthenticated, initAuth, initSocketWithToken } from "./auth";

export async function init() {
    if (isAuthenticated()) {
        resolve(
            await initAuth(),
            () => {
                initSocketWithToken();
            },
            () => {}
        );
    }
}
