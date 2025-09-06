import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'

interface QueryButtonProps {
    onQuery: () => void
    isDisabled: boolean
}

export default function QueryButton({
    onQuery,
    isDisabled = false,
}: QueryButtonProps) {
    return (
        <Button
            onClick={onQuery}
            variant={'default'}
            size="icon"
            disabled={isDisabled}
            className={cn('cursor-pointer')}
        >
            <SearchIcon />
        </Button>
    )
}
