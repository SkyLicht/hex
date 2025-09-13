export interface serverActionResponse<T> {
    status: string
    error?: string
    error_massage?: string
    data?: T
}

// todo: add type to dataParser and check if async is needed
export async function catchErrorTyped<
    T,
    E extends new (message?: string) => Error,
>(
    promise: Promise<T>,
    errorToCatch?: E[],
    dataParser?: (data: T) => void
): Promise<[undefined, T] | [InstanceType<E>]> {
    return promise
        .then((data) => {
            if (dataParser) {
                dataParser(data)
            }
            return [undefined, data] as [undefined, T]
        })
        .catch((error) => {
            if (errorToCatch == undefined) {
                return [error]
            }

            if (errorToCatch.some((err) => error instanceof err)) {
                return [error]
            }

            throw error
        })
}

export class CustomError extends Error {
    name = 'CustomError'
    extraProp = 'ERROR: test'
}

export class HTTP_401_Error extends Error {
    name = 'HTTP 401 Error'
    extraProp = 'ERROR: test'
}

export class HTTP_404_Error extends Error {
    name = 'HTTP 404 Error'
    extraProp = 'ERROR: test'
}

export class ServerUnreachableError extends Error {
    name = 'Server Unreachable Error'
    extraProp = 'ERROR: test'
}

export class LoggedInError extends Error {
    name = 'Logged In Error'
    extraProp = 'ERROR: test'
}

export const customPackagedError = [
    CustomError,
    HTTP_401_Error,
    HTTP_404_Error,
    ServerUnreachableError,
    LoggedInError,
]

export async function responseHandler(response: Response, url: string) {
    // 1) Handle specific status codes first
    if (response.status === 401) {
        throw new HTTP_401_Error('You are not logged in!')
    }

    if (response.status === 404) {
        throw new HTTP_404_Error(`Not Found: ${response.statusText}   ${url}`)
    }

    if (response.status === 422) {
        throw new Error('Unprocessable Entity')
    }

    // 2) If the response is NOT in the range 200-299,
    //    handle it as an unexpected error
    if (!response.ok) {
        throw new ServerUnreachableError('An unexpected error occurred')
    }

    // 3) If everything is okay, parse the JSON and return
    return response.json()
}

export type RequestRespondsError = {
    message?: string
    code: number
}

export type RequestResponds<T> = {
    data?: T
    status?: 'SUCCESS' | 'ERROR' | 'LOADING'
    error?: RequestRespondsError | null
}
