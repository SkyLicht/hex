'use client'
import {Button} from "@/components/ui/button";
import React from "react";
import {useSearchParams, useRouter} from "next/navigation";

export const MenuLayout = () => {
    const params = useSearchParams();
    const router = useRouter();

    return <div className={"h-[50px] w-full flex flex-row justify-between items-center p-2 "}>
        <section></section>
        <section className={"flex flex-row gap-2"}>
            {["J01", "J02", "J03", "J05", "J06", "J07", "J08", "J09", "J10", "J11"].map((lineName: string) => {
                return (
                    <Button
                        variant="secondary"
                        key={lineName}
                        onClick={() => {
                            router.push(`?selected_line=${lineName}`);
                        }}
                    >
                        {lineName}

                    </Button>
                )
            })}
        </section>
    </div>
}