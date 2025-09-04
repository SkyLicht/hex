import React from 'react'
import { UnitItem } from '@/src/types/hex_api'

interface Props {
    units: UnitItem[]
    open: boolean
    onClose: () => void
}
const WipDetailsModal = ({ units, open, onClose }: Props) => {
    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 rounded-xl"
            onClick={onClose}
        >
            <div
                className="bg-neutral-900 text-stone-100 border border-neutral-700 rounded-lg w-[570px] max-w-[95vw] max-h-[85vh] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold">Wop Units</h4>
                        <p className="text-xs text-stone-400">At the </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-stone-300 hover:text-white px-2 py-1 rounded-md"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-3 overflow-y-auto max-h-[70vh]">
                    <div className="bg-neutral-950/40 border border-neutral-800 rounded-md">
                        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-2 px-2 py-2 text-[11px] uppercase tracking-wide text-stone-400">
                            <div>PPID</div>
                            <div>Station</div>
                            <div>Time</div>
                        </div>
                        <div className="divide-y divide-neutral-800">
                            {units.length === 0 ? (
                                <div className="px-2 py-3 text-stone-400 text-sm">
                                    No suspicious PCBs in this batch
                                </div>
                            ) : (
                                units.map((pcb) => (
                                    <div
                                        key={pcb.ppid}
                                        className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-2 px-2 py-2 hover:bg-neutral-800/40"
                                    >
                                        <div className="text-stone-200 font-mono text-sm truncate">
                                            {pcb.ppid}
                                        </div>
                                        <div className="text-stone-300 font-mono text-xs">
                                            {pcb.group_name}
                                        </div>
                                        <div className="text-stone-300 font-mono text-xs">
                                            {pcb.timestamp}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WipDetailsModal
