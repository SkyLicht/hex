import { createUPHRecord } from '@/src/actions/action-uph-record'
import { LineDTO, PlatformDTO } from '@/src/dto/planner_dto'
import { useRouter } from 'next/navigation'
import { useState, useActionState } from 'react'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const UphRecordSchema = z.object({
    line_id: z.string().min(1, { message: 'Line is required' }),
    platform_id: z.string().min(1, { message: 'Platform is required' }),
    target_oee: z
        .number()
        .min(0, { message: 'Target OEE must be at least 0' })
        .max(1, { message: 'Target OEE cannot exceed 1' }),
    uph: z.number().min(1, { message: 'UPH must be at least 1' }),
    start_date: z.string().min(1, { message: 'Start date is required' }),
    end_date: z.string().min(1, { message: 'End date is required' }),
})

interface Props {
    lines: LineDTO[]
    platforms: PlatformDTO[]
    onSuccess: () => void
}

const UPHRecordForm = (props: Props) => {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [formValues, setFormValues] = useState({
        platform_id: '',
        line_id: '',
        target_oee: '',
        uph: '',
        start_date: '',
        end_date: '',
    })

    const router = useRouter()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            // Extract values from formData
            const submittedData = {
                line_id: formData.get('line_id'),
                platform_id: formData.get('platform_id'),
                target_oee: formData.get('target_oee'),
                uph: formData.get('uph'),
                start_date: formData.get('start_date'),
                end_date: formData.get('end_date'),
            }

            const parsedValues = {
                ...submittedData,
                target_oee: Number(submittedData.target_oee),
                uph: Number(submittedData.uph),
            }

            await UphRecordSchema.parseAsync(parsedValues)

            const create = await createUPHRecord(formData)

            if (create.status === 'SUCCESS') {
                // Clear only after successful submission
                setFormValues({
                    platform_id: '',
                    line_id: '',
                    target_oee: '',
                    uph: '',
                    start_date: '',
                    end_date: '',
                })
                setErrors({})

                router.refresh()
                props.onSuccess()
            }

            if (create.status === 'ERROR') {
                console.log('Error creating UPH record:', create.error)
            }

            return create
        } catch (error) {
            console.error('Error submitting form:', error)

            // inside your catch block
            if (error instanceof z.ZodError) {
                // Map each issue to its .message so fieldErrors is Record<string, string[]>
                const { fieldErrors } = error.flatten((issue) => issue.message)

                // Take the first message per field (or empty string)
                const formattedErrors: Record<string, string> =
                    Object.fromEntries(
                        Object.entries(fieldErrors).map(([key, messages]) => [
                            key,
                            (messages as string[])?.[0] ?? '',
                        ])
                    )

                setErrors(formattedErrors)

                return {
                    ...prevState,
                    error: 'Validation failed',
                    status: 'ERROR',
                }
            }

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
        <form action={formAction} className="flex flex-col gap-2">
            <div>
                <label
                    htmlFor="line_id"
                    className="block text-sm font-medium text-gray-300"
                >
                    Line
                </label>
                <select
                    id="line_id"
                    name="line_id"
                    className={cn(
                        'mt-1 block w-full rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:border-0 focus:ring focus:ring-transparent focus:ring-opacity-0',
                        'h-8 p-1'
                    )}
                    value={formValues.line_id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled className="text-gray-500">
                        Select a Line
                    </option>
                    {props.lines.map((line) => (
                        <option key={line.id} value={line.id}>
                            {line.name}
                        </option>
                    ))}
                </select>
                {errors.line_id && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.line_id}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="platform_id"
                    className="block text-sm font-medium text-gray-300"
                >
                    Platform
                </label>
                <select
                    id="platform_id"
                    name="platform_id"
                    className={cn(
                        'mt-1 block w-full rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:border-0 focus:ring focus:ring-transparent focus:ring-opacity-0',
                        'h-8 p-1'
                    )}
                    value={formValues.platform_id}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled className="text-gray-500">
                        Select a Platform
                    </option>
                    {props.platforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                            {platform.platform}
                        </option>
                    ))}
                </select>
                {errors.platform_id && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.platform_id}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="target_oee"
                    className="block text-sm font-medium text-gray-300"
                >
                    Target OEE
                </label>
                <Input
                    id="target_oee"
                    name="target_oee"
                    type="number"
                    className=""
                    value={formValues.target_oee}
                    onChange={handleInputChange}
                    required
                    placeholder="Target OEE"
                />

                {errors.target_oee && (
                    <p className="text-red-500">{errors.target_oee}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="uph"
                    className="block text-sm font-medium text-gray-300"
                >
                    UPH
                </label>
                <Input
                    id="uph"
                    name="uph"
                    type="number"
                    className=""
                    value={formValues.uph}
                    onChange={handleInputChange}
                    required
                    placeholder="UPH"
                />

                {errors.uph && <p className="text-red-500">{errors.uph}</p>}
            </div>

            <div>
                <label
                    htmlFor="start_date"
                    className="block text-sm font-medium text-gray-300"
                >
                    Start Date
                </label>
                <Input
                    id="start_date"
                    name="start_date"
                    type="datetime-local"
                    step="1"
                    className=""
                    value={formValues.start_date}
                    onChange={handleInputChange}
                    required
                />

                {errors.start_date && (
                    <p className="text-red-500">{errors.start_date}</p>
                )}
            </div>

            <div>
                <label
                    htmlFor="end_date"
                    className="block text-sm font-medium text-gray-300"
                >
                    End Date
                </label>
                <Input
                    id="end_date"
                    name="end_date"
                    type="datetime-local"
                    step="1"
                    className=""
                    value={formValues.end_date}
                    onChange={handleInputChange}
                    required
                />

                {errors.end_date && (
                    <p className="text-red-500">{errors.end_date}</p>
                )}
            </div>

            <Button type="submit" variant="default" disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit'}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    )
}

export default UPHRecordForm
