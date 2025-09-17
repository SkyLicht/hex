import React from 'react'
import UPHReordsView from '@/src/features/uph_records/views/UphRecords'
import { catchErrorTyped } from '@/src/http_utils'
import { getUphrecords } from '@/src/requests/request-uph_records'
import { customPackagedError } from '@/lib/sl-request'
import { getLines } from '@/src/requests/request-lines'
import { getPlatformsInService } from '@/src/requests/request-platforms'

const WorkPlanPage = async () => {


    const [error_lines, lines] = await catchErrorTyped(getLines(), [
        ...customPackagedError,
        Error,
    ])

    const [error_platforms, platforms] = await catchErrorTyped(
        getPlatformsInService(),
        [...customPackagedError, Error]
    )



    if (error_lines) return <div>{error_lines.message}</div>

    if (!lines) return <div>No data</div>

    if (error_platforms) return <div>{error_platforms.message}</div>
    if (!platforms) return <div>No data</div>



    return (
        <div className={'h-full w-full border-2 border-white'}>
            <UPHReordsView
                lines={lines}
                platforms={platforms}
            />
        </div>
    )
}

export default WorkPlanPage
