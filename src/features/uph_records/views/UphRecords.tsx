
import { LineDTO, PlatformDTO } from '@/src/dto/planner_dto'
import { catchErrorTyped, customPackagedError } from '@/src/http_utils'
import { getUphrecords } from '@/src/requests/request-uph_records'
import React from 'react'
import UPHRecordsTable from './UPHRecordsTable'
interface Props {
    lines: LineDTO[]
    platforms: PlatformDTO[]
}


const UPHReordsView = async(
    props: Props
) => {

    const [error_uph, uph] = await catchErrorTyped(getUphrecords(), [
        ...customPackagedError,
        Error,
    ])

        
    if (error_uph) return <div>{error_uph.message}</div>

    if (!uph) return <div>No data</div>
    return <UPHRecordsTable uphRecords={uph} lines={props.lines} platforms={props.platforms} />
}

export default UPHReordsView


