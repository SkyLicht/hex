export function DataCollectorNameToGroupName(name: string) {
    switch (name) {
        case "SMT_INPUT1":
            return "SMT INPUT1"
        case "SPI1":
            return "SPI1"
        case "AOI_B2":
            return "AOI B2"
        case "REFLOW_VI1":
            return "REFLOW VI1"
        case "SMT_INPUT2":
            return "SMT INPUT2"
        case "SPI2":
            return "SPI2"
        case "REFLOW_VI2":
            return "REFLOW VI2"
        case "AOI_T2":
            return "AOI T2"
        case "PTH_INPUT":
            return "PTH INPUT"
        case "TOUCH_INSPECT":
            return "TOUCH INSPECT"
        case "TOUCH_UP":
            return "TOUCH UP"
        case "ICT":
            return "ICT"
        case "FT":
            return "FT1"
        case "FINAL_VI":
            return "FINAL_VI"
        case "FINAL_INSPECT":
            return "FINAL INSPECT"
        case "PACKING":
            return "PACKING"
        default:
            return "none"
    }
}
