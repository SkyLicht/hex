import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const lines: string[] = [
    'J01',
    'J02',
    'J03',
    'J05',
    'J06',
    'J08',
    'J09',
    'J10',
    'J11',
]

const LineSelector = () => {
    const params = useSearchParams()
    const router = useRouter()
    return (
        <div className={'flex flex-row gap-2 select-none'}>
            {' '}
            {lines.map((line) => (
                <Button
                    key={`line-selector-${line}`}
                    className={cn(
                        'rounded-full font-semibold h-fit py-1 text-md cursor-pointer',
                        params.get('selected_line') === line
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                    )}
                    onClick={() => {
                        router.push(`?selected_line=${line}`)
                    }}
                >
                    {line}
                </Button>
            ))}
        </div>
    )
}

export default LineSelector
