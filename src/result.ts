interface Success<T> {
    success: true;
    value: T;
}

interface Failure<E> {
    success: false;
    error: E;
}

export type Result<T, E> = Success<T> | Failure<E>;
const NO_RESULT_SYMBOL = Symbol("no result");
export const NO_RESULT = success(NO_RESULT_SYMBOL);
export type NoResult = typeof NO_RESULT_SYMBOL;

export function success<const T>(value: T): Success<T> {
    return { success: true, value };
}

export function failure<const E>(error: E): Failure<E> {
    return { success: false, error };
}

export function resolve<const T, const E>(
    result: Result<T, E>,
    successCb: (value: T) => void,
    errorCb: (err: E) => void
) {
    if (result.success) {
        successCb(result.value);
    } else {
        errorCb(result.error);
    }
}

export function resolveErr<const T, const E, const R>(
    result: Result<T, E>,
    errorCb: (err: E) => R
): T | R {
    if (!result.success) {
        return errorCb(result.error);
    }
    return result.value;
}

export function expect<const T>(result: Result<T, unknown>): T {
    if (!result.success) {
        const err = result.error;
        if (err instanceof Error) throw err;
        throw new Error(String(err));
    }
    return result.value;
}
