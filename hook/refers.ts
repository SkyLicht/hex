export const HEX_API_IP: string = 'http://10.13.32.222:3010/api/v1'

export const HEX_CREATE_ROUTE = (route: string) => {
    return `${HEX_API_IP}/${route}`
}
