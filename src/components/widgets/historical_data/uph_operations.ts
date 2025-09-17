export const uph_less_quantity = (uph: number, qty: number) => {
    if (qty < 0) {
        return 0
    }

    return qty - uph
}
