'use client'
import React from 'react'
import {useSocket} from "@/src/hooks/use-socket";

const ManagerPage = () => {



    const {} = useSocket('ws://10.13.32.220:9091/ws/monitor', {
        onConnect: () => {
            console.log('Connected')
        }
        ,
        onDisconnect: () => {
            console.log('Disconnected')
        },
        onMessage: (message) => {
            console.log('Message received:', message)
        }
    })

    return <div className={'h-full w-full'}>{'Hello'}</div>
}

export default ManagerPage
