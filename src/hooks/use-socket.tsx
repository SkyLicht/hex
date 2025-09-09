import { useState, useEffect, useRef, useCallback } from 'react'

export interface HourlySummary {
    [key: string]: number
}

export interface LatestRecordSummaryData {
    [key: string]: string
}

export interface HourlySummaryMessage {
    massage_type: 'LAST_HOUR'
    massage: HourlySummary
}

export interface LatestRecordSummaryMessage {
    massage_type: 'LAST_UPDATE'
    massage: LatestRecordSummaryData
}

export type WebSocketMessage3 =
    | HourlySummaryMessage
    | LatestRecordSummaryMessage
export type WebSocketReturn = {
    hourlySummary: HourlySummary
    latestRecordSummary: LatestRecordSummaryData
    connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
    error: string | null
    reconnect: () => void
}
export const useSocket = (
    url: string,
    options?: {
        reconnectAttempts?: number
        reconnectInterval?: number
        onError?: (error: Event) => void
        onConnect?: () => void
        onDisconnect?: () => void
        onMessage?: (message: WebSocketMessage3) => void
    }
): WebSocketReturn => {
    const [hourlySummary, setHourlySummary] = useState<HourlySummary>({})
    const [latestRecordSummary, setLatestRecordSummary] =
        useState<LatestRecordSummaryData>({})

    const [connectionStatus, setConnectionStatus] = useState<
        'connecting' | 'connected' | 'disconnected' | 'error'
    >('disconnected')
    const [error, setError] = useState<string | null>(null)

    const wsRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const reconnectAttemptsRef = useRef(0)
    const optionsRef = useRef(options)

    // Update options ref when options change
    useEffect(() => {
        optionsRef.current = options
    }, [options])

    const connect = useCallback(() => {
        // Prevent multiple connections
        if (
            wsRef.current?.readyState === WebSocket.OPEN ||
            wsRef.current?.readyState === WebSocket.CONNECTING
        ) {
            return
        }

        // Clean up existing connection
        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null
        }

        const opts = optionsRef.current || {}
        const {
            reconnectAttempts = 5,
            reconnectInterval = 3000,
            onError,
            onConnect,
            onDisconnect,
            onMessage,
        } = opts

        try {
            console.log('Attempting to connect to WebSocket:', url)
            setConnectionStatus('connecting')
            setError(null)

            wsRef.current = new WebSocket(url)

            wsRef.current.onopen = (event) => {
                console.log('WebSocket connected successfully')
                setConnectionStatus('connected')
                reconnectAttemptsRef.current = 0
                onConnect?.()
            }

            wsRef.current.onmessage = (event) => {
                try {
                    const message: WebSocketMessage3 = JSON.parse(event.data)

                    onMessage?.(message)

                    switch (message.massage_type) {
                        case 'LAST_HOUR':
                            // console.log(message.massage)
                            setHourlySummary(message.massage)
                            break
                        case 'LAST_UPDATE':
                            // console.log(message.massage)
                            setLatestRecordSummary(message.massage)
                            break
                    }
                } catch (parseError) {
                    console.error(
                        'Failed to parse WebSocket message:',
                        parseError
                    )
                    setError('Failed to parse message data')
                }
            }

            wsRef.current.onclose = (event) => {
                console.log(
                    'WebSocket disconnected:',
                    event.code,
                    event.reason,
                    'wasClean:',
                    event.wasClean
                )
                setConnectionStatus('disconnected')
                onDisconnect?.()

                // Only attempt to reconnect if it wasn't a clean close and we haven't exceeded attempts
                if (
                    !event.wasClean &&
                    reconnectAttemptsRef.current < reconnectAttempts
                ) {
                    reconnectAttemptsRef.current++
                    console.log(
                        `Attempting reconnect ${reconnectAttemptsRef.current}/${reconnectAttempts} in ${reconnectInterval}ms`
                    )

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect()
                    }, reconnectInterval)
                } else if (reconnectAttemptsRef.current >= reconnectAttempts) {
                    console.log('Max reconnection attempts reached')
                    setError('Max reconnection attempts reached')
                }
            }

            wsRef.current.onerror = (event) => {
                console.error('WebSocket error:', event)
                setConnectionStatus('error')
                setError('WebSocket connection error')
                onError?.(event)
            }
        } catch (connectError) {
            console.error(
                'Failed to create WebSocket connection:',
                connectError
            )
            setConnectionStatus('error')
            setError('Failed to create WebSocket connection')
        }
    }, [url])

    const reconnect = useCallback(() => {
        console.log('Manual reconnect requested')

        // Clear any pending reconnection
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }

        // Close existing connection
        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null
        }

        // Reset reconnection attempts
        reconnectAttemptsRef.current = 0

        // Attempt to connect
        connect()
    }, [connect])

    useEffect(() => {
        console.log('WebSocket Data Collector V2 hook initializing...')
        connect()

        return () => {
            console.log('WebSocket Data Collector V2 hook cleaning up...')

            // Clear reconnection timeout
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current)
                reconnectTimeoutRef.current = null
            }

            // Close WebSocket connection
            if (wsRef.current) {
                // Set a flag to prevent reconnection on cleanup
                const ws = wsRef.current
                wsRef.current = null
                ws.close(1000, 'Component unmounting') // Clean close
            }
        }
    }, [connect])

    return {
        hourlySummary,
        latestRecordSummary,
        connectionStatus,
        error,
        reconnect,
    }
}
