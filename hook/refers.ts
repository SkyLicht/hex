export const HEX_API_IP: string = 'http://10.13.33.131:3010/api/v1'

export const HEX_CREATE_ROUTE = (route: string) => {
    return `${HEX_API_IP}/${route}`
}
