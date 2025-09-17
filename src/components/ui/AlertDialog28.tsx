import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
type Props = {
    title: string

    open: boolean
    setOpen: (open: boolean) => void
    description: React.ReactNode
    trigger: React.ReactNode
    children?: React.ReactNode
}
const AlertDialog28 = ({
    title,
    description,
    open,
    setOpen,
    children,
    trigger,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className=" h-fit container"
                aria-description="alert-dialog"
            >
                <DialogHeader className="flex  items-center ">
                    <DialogTitle className="card_title">{title}</DialogTitle>
                    <DialogDescription asChild>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default AlertDialog28
