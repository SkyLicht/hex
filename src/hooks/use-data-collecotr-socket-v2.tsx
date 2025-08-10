import { useState, useEffect, useRef, useCallback } from 'react'

// Types for the new message structures
export interface HourlySummaryData {
    [key: string]: number // e.g., "J01_AOI_B2": 85, "J01_AOI_T2": 49
}

export interface WipSummaryData {
    [key: string]: number // e.g., "J01_AOI_B2": 21, "J01_AOI_T2": 20
}

export interface LatestRecordData {
    collected_timestamp: string
    group_name: string
    line_name: string
    next_station: string
    ppid: string
    station_name: string
}

export interface LatestRecordSummaryData {
    [key: string]: LatestRecordData // e.g., "J01_AOI_B2": { collected_timestamp: "...", ... }
}

export interface HourlySummaryMessage {
    type: 'HOURLY_SUMMARY'
    data: HourlySummaryData
}

export interface WipSummaryMessage {
    type: 'WIP_SUMMARY'
    data: WipSummaryData
}

export interface LatestRecordSummaryMessage {
    type: 'LATEST_RECORD_SUMMARY'
    data: LatestRecordSummaryData
}

export type WebSocketMessageV2 =
    | HourlySummaryMessage
    | WipSummaryMessage
    | LatestRecordSummaryMessage

export interface UseWebSocketDataCollectorV2Return {
    hourlySummary: HourlySummaryData
    wipSummary: WipSummaryData
    latestRecordSummary: LatestRecordSummaryData
    latestMessage: WebSocketMessageV2 | null
    connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
    error: string | null
    reconnect: () => void
}

export const useWebSocketDataCollectorV2 = (
    url: string,
    options?: {
        reconnectAttempts?: number
        reconnectInterval?: number
        onHourlySummary?: (data: HourlySummaryData) => void
        onWipSummary?: (data: WipSummaryData) => void
        onLatestRecordSummary?: (data: LatestRecordSummaryData) => void
        onMessage?: (message: WebSocketMessageV2) => void
        onError?: (error: Event) => void
        onConnect?: () => void
        onDisconnect?: () => void
    }
): UseWebSocketDataCollectorV2Return => {
    // State for each message type
    const [hourlySummary, setHourlySummary] = useState<HourlySummaryData>({})
    const [wipSummary, setWipSummary] = useState<WipSummaryData>({})
    const [latestRecordSummary, setLatestRecordSummary] =
        useState<LatestRecordSummaryData>({})

    const [latestMessage, setLatestMessage] =
        useState<WebSocketMessageV2 | null>(null)
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
            onHourlySummary,
            onWipSummary,
            onLatestRecordSummary,
            onMessage,
            onError,
            onConnect,
            onDisconnect,
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
                    const message: WebSocketMessageV2 = JSON.parse(event.data)
                    setLatestMessage(message)
                    onMessage?.(message)

                    // Handle different message types
                    switch (message.type) {
                        case 'HOURLY_SUMMARY':
                            console.log(
                                'Received HOURLY_SUMMARY:',
                                message.data
                            )
                            setHourlySummary(message.data)
                            onHourlySummary?.(message.data)
                            break

                        case 'WIP_SUMMARY':
                            console.log('Received WIP_SUMMARY:', message.data)
                            setWipSummary(message.data)
                            onWipSummary?.(message.data)
                            break

                        case 'LATEST_RECORD_SUMMARY':
                            console.log(
                                'Received LATEST_RECORD_SUMMARY:',
                                message.data
                            )
                            setLatestRecordSummary(message.data)
                            onLatestRecordSummary?.(message.data)
                            break

                        default:
                            console.warn('Unknown message type:', message)
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
        wipSummary,
        latestRecordSummary,
        latestMessage,
        connectionStatus,
        error,
        reconnect,
    }
}
