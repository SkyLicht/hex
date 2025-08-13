'use client'

import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
const queryClient = new QueryClient()
export default function ManagerLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className={'max-w-screen'}>
            <section
                className={
                    'mx-auto w-full max-w-screen min-w-[1024px]  min-h-screen max-h-screen h-screen bg-[#1d1d1d] flex justify-center'
                }
            >
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </section>
        </main>
    )
}
