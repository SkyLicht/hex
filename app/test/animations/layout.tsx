import React from "react";

export default function ManagerLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    return <main className={"max-w-screen"}>
        <section
            className={"mx-auto w-full max-w-screen min-h-screen max-h-screen h-screen"}>
            {children}
        </section>
    </main>
}