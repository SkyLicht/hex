'use client'

import React, { useState } from 'react'
import { LineDTO, PlatformDTO, UphRecordDTO } from '@/src/dto/planner_dto'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { MoreHorizontal, PlusIcon } from 'lucide-react'
import UphRecordFormCreate from '@/src/components/forms/UphRecordFormCreate'
import DeleteUHPForm from '@/src/components/forms/UphRecordFormDelete'

interface Props {
    uphRecords: UphRecordDTO[]
    lines: LineDTO[]
    platforms: PlatformDTO[]
}

const UPHRecordsTable: React.FC<Props> = ({
    lines,
    platforms,
    uphRecords,
}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<UphRecordDTO | null>()

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col bg-neutral-900">
            <Dialog open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
                <DialogContent
                    className=" h-fit container"
                    aria-description="alert-dialog"
                >
                    <DialogHeader className="flex  items-start justify-center ">
                        <DialogTitle className="">{'Delete'}</DialogTitle>
                        <DialogDescription asChild>
                            {selectedRecord && (
                                <div>
                                    <DeleteUHPForm
                                        id={selectedRecord.id}
                                        onClose={() => {
                                            setIsMoreMenuOpen(false)
                                            setSelectedRecord(null)
                                        }}
                                    ></DeleteUHPForm>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="w-full h-fit p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-stone-300">
                        UPH Records ({uphRecords.length})
                    </h3>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <PlusIcon className="mr-2" />
                                Add UPH Record
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-neutral-800 border-neutral-700">
                            <DialogHeader>
                                <DialogTitle className="text-stone-200">
                                    Add UPH Record
                                </DialogTitle>
                            </DialogHeader>
                            <UphRecordFormCreate
                                lines={lines}
                                platforms={platforms}
                                onSuccess={() => setIsModalOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="w-full h-full overflow-y-auto pr-2 font-sans text-neutral-300">
                <div className="flex justify-center items-center p-2">
                    <table className="w-fit bg-neutral-950 shadow-xl text-sm border-collapse rounded-lg overflow-hidden">
                        <thead className=" text-stone-400 uppercase text-xs tracking-wide">
                            <tr>
                                <th className="px-3 py-2 text-left w-[50px]">
                                    Line
                                </th>
                                <th className="px-3 py-2 text-left w-[300px]">
                                    Platform
                                </th>
                                <th className="px-3 py-2 text-left w-[100px]">
                                    OEE
                                </th>
                                <th className="px-3 py-2 text-left w-[50px]">
                                    UPH
                                </th>
                                <th className="px-3 py-2 text-left w-[200px]">
                                    Start Date
                                </th>
                                <th className="px-3 py-2 text-left w-[200px]">
                                    End Date
                                </th>
                                <th className="px-3 py-2 text-left w-[40px]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="  divide-y divide-neutral-700/50 cursor-pointer">
                            {uphRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className=" hover:bg-neutral-600/40 transition-all duration-200"
                                >
                                    <td className="px-2 py-1 text-stone-200 font-bold ">
                                        {record.line.name}
                                    </td>
                                    <td className="px-2 py-1 text-stone-200 font-bold">
                                        {record.platform.platform}
                                    </td>
                                    <td className="px-2 py-1">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800 text-blue-200">
                                            {(record.target_oee * 100).toFixed(
                                                1
                                            )}
                                            %
                                        </span>
                                    </td>
                                    <td className="px- py-1">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-800 text-purple-200">
                                            {record.uph}
                                        </span>
                                    </td>
                                    <td className="px-2 py-1 font-mono text-stone-300 ">
                                        {formatDate(record.start_date)}
                                    </td>
                                    <td className="px-2 py-1 font-mono text-stone-300">
                                        {formatDate(record.end_date)}
                                    </td>
                                    <td className=" px-2 py-1 font-mono text-stone-300  ">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            className={
                                                'inline-flex items-center'
                                            }
                                            onClick={() => {
                                                setSelectedRecord(record)
                                                setIsMoreMenuOpen(true)
                                            }}
                                        >
                                            <MoreHorizontal />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24h format
        timeZone: 'UTC', // <-- prevents adding local offset
    }).format(date)
}

export default UPHRecordsTable
