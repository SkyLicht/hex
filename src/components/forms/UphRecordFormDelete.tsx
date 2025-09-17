'use client'
import React, { useActionState } from 'react'

import { Trash } from 'lucide-react'
import { serverActionResponse } from '@/src/http_utils'
import { deleteUPHRecord } from '@/src/actions/action-uph-record'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
interface Props {
    id: string
    onClose: (open: boolean) => void
}
function DeleteUHPForm<T>({ id, onClose }: Props) {
    const router = useRouter()
    const handleFormSubmit = async (
        prevState: serverActionResponse<T>,
        formData: FormData
    ) => {
        try {
            formData.append('id', '1')
            const result = await deleteUPHRecord(id)
            if (result.status == 'SUCCESS') {
                router.refresh()
                onClose(false)

                // toast("Take deleted successfully");

                return result
            }
            if (result.status == 'ERROR') {
                // toast.error("An unexpected error occurred", {
                //     description: result.error,
                // });
            }
            onClose(false)
            return result
        } catch (error) {
            onClose(false)
            // toast(`An unexpected error occurred ${error}`);
            return {
                ...prevState,
                error: 'An unexpected error occurred',
                status: 'ERROR',
            }
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: '',
        status: 'INITIAL',
    })

    return (
        <div className="flex items-center justify-center gap-4">
            <button
                className={cn(
                    'h-8  px-4 rounded-full border-0 text-sm font-medium shadow-lg focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none transition-colors duration-300',
                    'bg-neutral-800 text-neutral-100 btn_props hover:bg-neutral-700'
                )}
                onClick={() => {
                    onClose(false)
                }}
            >
                Cancel
            </button>
            <form action={formAction}>
                <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                        'h-8  px-4 rounded-full border-0 text-sm font-medium shadow-lg focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none transition-colors duration-300',
                        'flex flex-row gap-2  items-center bg-red-600 text-neutral-100 btn_props hover:bg-red-700'
                    )}
                >
                    <Trash />
                </button>
            </form>
        </div>
    )
}

export default DeleteUHPForm
