import React from 'react'

export default function ManagerLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className={'max-w-screen'}>
            <section
                className={
                    'mx-auto w-full max-w-screen min-h-screen max-h-screen h-screen bg-[#1d1d1d] '
                }
            >
                {children}
            </section>
        </main>
    )
}
