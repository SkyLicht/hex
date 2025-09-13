import React from 'react'
import WorkPlan from '@/src/features/workplan/views/WorkPlan'
import { catchErrorTyped } from '@/src/http_utils'
import { getWorkPlan } from '@/src/requests/request-uph_records'
import { customPackagedError } from '@/lib/sl-request'

const WorkPlanPage = async () => {
    const [error, uph] = await catchErrorTyped(getWorkPlan(), [
        ...customPackagedError,
        Error,
    ])

    if (error) return <div>error{error.message}</div>

    if (!uph) return <div>No data</div>

    return (
        <div className={'h-full w-full border-2 border-white'}>
            <p>{JSON.stringify(uph)}</p>
            <WorkPlan />
        </div>
    )
}

export default WorkPlanPage
