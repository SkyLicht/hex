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

export class HTTP_422_Error extends Error {
    name = 'HTTP 422 Error'
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
    HTTP_422_Error,
    ServerUnreachableError,
    LoggedInError,
]

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

// Define the standard API response structure
export interface ApiResponse<T = never> {
    message: string
    data: T | null
    status: number
    error: string | null
}

// Updated response handlers that extracts data from the standard response format
export async function responseHandler<T = never>(
    response: Response,
    url: string
): Promise<T> {
    // 1) Handle specific status codes first
    if (response.status === 401) {
        throw new HTTP_401_Error('You are not logged in!')
    }

    if (response.status === 404) {
        throw new HTTP_404_Error(`Not Found: ${response.statusText}   ${url}`)
    }

    if (response.status === 422) {
        // Read the actual error message from the response body
        const errorBody = await response.json()
        if (errorBody.detail) {
            throw new HTTP_422_Error(errorBody.detail)
        } else {
            throw new HTTP_422_Error('An unexpected error occurred')
        }
    }

    // 2) If the response is NOT in the range 200-299,
    //    handle it as an unexpected error
    if (!response.ok) {
        throw new ServerUnreachableError('An unexpected error occurred')
    }

    // 3) Parse the JSON response
    const jsonResponse: ApiResponse<T> = await response.json()

    // 4) Check if the API returned an error in the response body
    if (jsonResponse.error) {
        throw new ServerUnreachableError(jsonResponse.error)
    }

    // 5) Check if status in response indicates an error
    if (jsonResponse.status >= 400) {
        throw new ServerUnreachableError(
            jsonResponse.message || 'API returned error status'
        )
    }

    // 6) Return the data field from the response
    if (jsonResponse.data === null || jsonResponse.data === undefined) {
        throw new ServerUnreachableError('No data returned from API')
    }

    return jsonResponse.data
}

// Alternative version that returns the full response if you need access to message, status, etc.
export async function responseHandlerFull<T = never>(
    response: Response,
    url: string
): Promise<ApiResponse<T>> {
    // 1) Handle specific status codes first
    if (response.status === 401) {
        throw new HTTP_401_Error('You are not logged in!')
    }

    if (response.status === 404) {
        throw new HTTP_404_Error(`Not Found: ${response.statusText}   ${url}`)
    }

    if (response.status === 422) {
        const errorBody = await response.json()
        if (errorBody.detail) {
            throw new HTTP_422_Error(errorBody.detail)
        } else {
            throw new HTTP_422_Error('An unexpected error occurred')
        }
    }

    if (!response.ok) {
        throw new ServerUnreachableError('An unexpected error occurred')
    }

    const jsonResponse: ApiResponse<T> = await response.json()

    // Check if the API returned an error in the response body
    if (jsonResponse.error) {
        throw new ServerUnreachableError(jsonResponse.error)
    }

    // Check if status in response indicates an error
    if (jsonResponse.status >= 400) {
        throw new ServerUnreachableError(
            jsonResponse.message || 'API returned error status'
        )
    }

    return jsonResponse
}
