import React from 'react'
import { XIcon } from 'lucide-react'
import { Calendar28 } from '@/src/components/ui/Calendar28'
import HistoricalData from '@/src/components/widgets/historical_data/HistoricalData'
import { LineSelector28 } from '@/src/components/ui/combo_box/LineSelector28'

interface Props {
    onClose: () => void
}

const HistoricalDataContainer = ({ onClose }: Props) => {
    const [date, setDate] = React.useState<string | undefined>(undefined)
    const [selected_line, setSelectedLine] = React.useState<string | undefined>(
        undefined
    )

    return (
        <div className={'w-full h-full flex flex-col '}>
            <div
                className={
                    'w-full h-fit flex flex-row items-center justify-between '
                }
            >
                <div className={'flex flex-row gap-2 items-center'}>
                    <Calendar28
                        onDateChange={(_date: string) => {
                            setDate(_date)
                        }}
                    />
                    <LineSelector28
                        onSelect={(line) => {
                            setSelectedLine(line)
                        }}
                    />
                </div>
                <XIcon className={'w-6 h-6 cursor-pointer'} onClick={onClose} />
            </div>
            <div className={'w-full h-full flex  overflow-y-auto'}>
                <HistoricalDataResultContainer
                    isDate={date}
                    isLine={selected_line}
                />
            </div>
        </div>
    )
}

const HistoricalDataResultContainer = ({
    isDate,
    isLine,
}: {
    isDate?: string
    isLine?: string
}) => {
    if (isDate === undefined) {
        return <div>Select a date</div>
    }

    if (isLine === undefined) {
        return <div>Select a line</div>
    }

    return (
        <HistoricalData
            selectedDate={isDate}
            selected_line={isLine}
            isLoading={false}
        />
    )
}

export default HistoricalDataContainer
