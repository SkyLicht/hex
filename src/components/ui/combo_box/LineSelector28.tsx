'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const frameworks = [
    {
        value: 'J01',
        label: 'Line J01',
    },

    {
        value: 'J02',
        label: 'Line J02',
    },
    {
        value: 'J03',
        label: 'Line J03',
    },
    {
        value: 'J05',
        label: 'Line J05',
    },
    {
        value: 'J06',
        label: 'Line J06',
    },
    {
        value: 'J07',
        label: 'Line J07',
    },
    {
        value: 'J08',
        label: 'Line J08',
    },
    {
        value: 'J09',
        label: 'Line J09',
    },
    {
        value: 'J10',
        label: 'Line J10',
    },
    {
        value: 'J11',
        label: 'Line J11',
    },
]

interface Props {
    onSelect: (value: string) => void
}

export function LineSelector28({ onSelect }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find(
                              (framework) => framework.value === value
                          )?.label
                        : 'Select framework...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        )
                                        onSelect(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === framework.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
