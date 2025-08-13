// global.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_URL: string
        NEXT_PUBLIC_ANALYTICS_ID?: string
        HEX_API: string
        // add more as needed
    }
}
