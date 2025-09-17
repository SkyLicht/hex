export interface UphRecordDTO {
    line_id: string
    platform_id: string
    target_oee: number
    end_date: string
    uph: number
    id: string
    start_date: string
    line: LineDTO
    platform: PlatformDTO
}


//   {
//     "id": "lxL6Pz3KSOmnefj",
//     "name": "J01",
//     "description": null,
//     "is_active": 1,
//     "factory_id": "VmexuunYopH4ycw"
//   }

export interface LineDTO {
    id: string
    name: string
    description: string | null
    is_active: number
    factory_id: string
}

//   {
//     "id": "cujtjjhpgyb2lg0",
//     "f_n": 0,
//     "platform": "D13 Kyoto P SFF RPL-R",
//     "sku": "GYWX8",
//     "uph": 125,
//     "cost": 0,
//     "in_service": 1,
//     "components": 0,
//     "components_list_id": "",
//     "width": 0,
//     "height": 0,
//     "created_at": "2025-07-28 14:02:21.747257",
//     "updated_at": "2025-07-28 14:02:21.747266"
//   }




//   {
//     "line_id": "lxL6Pz3KSOmnefj",
//     "platform_id": "t1iwmdwlx3d0k7z",
//     "target_oee": 0.6,
//     "end_date": "2025-09-13T19:00:00",
//     "id": "NDJSIKsqv9kmVHe",
//     "uph": 100,
//     "start_date": "2025-09-13T14:10:00",
//     "line": {
//       "description": null,
//       "factory_id": "VmexuunYopH4ycw",
//       "updated_at": "2025-09-16T23:00:55.750527",
//       "name": "J01",
//       "id": "lxL6Pz3KSOmnefj",
//       "is_active": true,
//       "created_at": "2025-09-16T23:00:55.750498"
//     },
//     "platform": {
//       "f_n": 0,
//       "id": "t1iwmdwlx3d0k7z",
//       "sku": "5J42H",
//       "cost": 0.0,
//       "components": 0,
//       "width": 0.0,
//       "created_at": "2025-09-16T23:00:55.751931",
//       "platform": "Caribou MT",
//       "uph": 0,
//       "in_service": true,
//       "components_list_id": "",
//       "height": 0.0,
//       "updated_at": "2025-09-16T23:00:55.751946"
//     }
//   }

export interface PlatformDTO {
    id: string
    f_n: number
    platform: string
    sku: string
    uph: number
    cost: number
    in_service: number
    components: number
    components_list_id: string
    width: number
    height: number
    created_at: string
    updated_at: string
}