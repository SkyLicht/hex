
// WIP Summary types
type WipSummary = {
    currentPpidCount: number;
}

export type WipGroupName = {
    SMT_INPUT1: WipSummary
    SPI1: WipSummary
    REFLOW_VI1: WipSummary
    AOI_B2: WipSummary
    SMT_INPUT2: WipSummary
    SPI2: WipSummary
    REFLOW_VI2: WipSummary
    AOI_T2: WipSummary
    PTH_INPUT: WipSummary
    TOUCH_INSPECT: WipSummary
    TOUCH_UP: WipSummary
    ICT: WipSummary
    FT: WipSummary
    FINAL_VI: WipSummary
    FINAL_INSPECT: WipSummary
    PACKING: WipSummary
}

export type WipSummaryLines = {
    J01: WipGroupName,
    J02: WipGroupName,
    J03: WipGroupName,
    J04: WipGroupName,
    J05: WipGroupName,
    J06: WipGroupName,
    J07: WipGroupName,
    J08: WipGroupName,
    J09: WipGroupName,
    J10: WipGroupName,
    J11: WipGroupName,
}

// Define proper types for the WIP structure
interface WipGroupData {
    groupName: string;
    currentPpidCount: number;
}

interface WipLineData {
    lineName: string;
    groups: Record<string, WipGroupData>;
}

interface WipLines {
    [key: string]: WipLineData;
}

interface WipSummaryData {
    lines: WipLines;
}

interface WipWebSocketData {
    type: string;
    wipSummary: WipSummaryData;
}

export function InitWipSummaryLines(): WipSummaryLines {
    const createDefaultWipSummary = (): WipSummary => ({
        currentPpidCount: 0
    });

    const createDefaultWipGroupName = (): WipGroupName => ({
        SMT_INPUT1: createDefaultWipSummary(),
        SPI1: createDefaultWipSummary(),
        REFLOW_VI1: createDefaultWipSummary(),
        AOI_B2: createDefaultWipSummary(),
        SMT_INPUT2: createDefaultWipSummary(),
        SPI2: createDefaultWipSummary(),
        REFLOW_VI2: createDefaultWipSummary(),
        AOI_T2: createDefaultWipSummary(),
        PTH_INPUT: createDefaultWipSummary(),
        TOUCH_INSPECT: createDefaultWipSummary(),
        TOUCH_UP: createDefaultWipSummary(),
        ICT: createDefaultWipSummary(),
        FT: createDefaultWipSummary(),
        FINAL_VI: createDefaultWipSummary(),
        FINAL_INSPECT: createDefaultWipSummary(),
        PACKING: createDefaultWipSummary()
    });

    return {
        J01: createDefaultWipGroupName(),
        J02: createDefaultWipGroupName(),
        J03: createDefaultWipGroupName(),
        J04: createDefaultWipGroupName(),
        J05: createDefaultWipGroupName(),
        J06: createDefaultWipGroupName(),
        J07: createDefaultWipGroupName(),
        J08: createDefaultWipGroupName(),
        J09: createDefaultWipGroupName(),
        J10: createDefaultWipGroupName(),
        J11: createDefaultWipGroupName(),
    };
}

export function DecodeWipSummary(data: WipWebSocketData): WipSummaryLines {
    const wipSummaryLines = InitWipSummaryLines();

    // Check if data and wipSummary.lines exist
    if (!data || !data.wipSummary || !data.wipSummary.lines) {
        return wipSummaryLines;
    }

    const lines = data.wipSummary.lines;

    // Process each line
    Object.entries(lines).forEach(([lineCode, lineData]: [string, WipLineData]) => {
        if (lineCode in wipSummaryLines && lineData.groups) {
            const lineGroups: WipGroupName = {
                SMT_INPUT1: { currentPpidCount: 0 },
                SPI1: { currentPpidCount: 0 },
                REFLOW_VI1: { currentPpidCount: 0 },
                AOI_B2: { currentPpidCount: 0 },
                SMT_INPUT2: { currentPpidCount: 0 },
                SPI2: { currentPpidCount: 0 },
                REFLOW_VI2: { currentPpidCount: 0 },
                AOI_T2: { currentPpidCount: 0 },
                PTH_INPUT: { currentPpidCount: 0 },
                TOUCH_INSPECT: { currentPpidCount: 0 },
                TOUCH_UP: { currentPpidCount: 0 },
                ICT: { currentPpidCount: 0 },
                FT: { currentPpidCount: 0 },
                FINAL_VI: { currentPpidCount: 0 },
                FINAL_INSPECT: { currentPpidCount: 0 },
                PACKING: { currentPpidCount: 0 },
            };

            // Process each group within the line
            Object.entries(lineData.groups).forEach(([groupName, groupData]: [string, WipGroupData]) => {
                const wipSummary: WipSummary = {
                    currentPpidCount: groupData.currentPpidCount || 0
                };

                // Map group names to our structure
                switch (groupName) {
                    case "SMT INPUT1":
                        lineGroups.SMT_INPUT1 = wipSummary;
                        break;
                    case "SPI1":
                        lineGroups.SPI1 = wipSummary;
                        break;
                    case "AOI B2":
                        lineGroups.AOI_B2 = wipSummary;
                        break;
                    case "REFLOW VI1":
                        lineGroups.REFLOW_VI1 = wipSummary;
                        break;
                    case "SMT INPUT2":
                        lineGroups.SMT_INPUT2 = wipSummary;
                        break;
                    case "SPI2":
                        lineGroups.SPI2 = wipSummary;
                        break;
                    case "REFLOW VI2":
                        lineGroups.REFLOW_VI2 = wipSummary;
                        break;
                    case "AOI T2":
                        lineGroups.AOI_T2 = wipSummary;
                        break;
                    case "PTH INPUT":
                        lineGroups.PTH_INPUT = wipSummary;
                        break;
                    case "TOUCH INSPECT":
                        lineGroups.TOUCH_INSPECT = wipSummary;
                        break;
                    case "TOUCH UP":
                        lineGroups.TOUCH_UP = wipSummary;
                        break;
                    case "ICT":
                        lineGroups.ICT = wipSummary;
                        break;
                    case "FT1":
                        lineGroups.FT = wipSummary;
                        break;
                    case "FINAL_VI":
                        lineGroups.FINAL_VI = wipSummary;
                        break;
                    case "FINAL INSPECT":
                        lineGroups.FINAL_INSPECT = wipSummary;
                        break;
                    case "PACKING":
                        lineGroups.PACKING = wipSummary;
                        break;
                    // Handle additional groups that might be in WIP but not in regular summary
                    case "PCB CLEAN2":
                    case "TUP REPAIR":
                    case "ICT REPAIR":
                    case "FT1 REPAIR":
                    case "OBE":
                    case "OUT STORE":
                    case "SCRAP":
                    case "SHIPPING":
                    case "X-RAY":
                        // These groups exist in the WIP data but don't have corresponding fields in our GroupName structure
                        // You might want to extend the GroupName type to include these if needed
                        break;
                }
            });

            // Update the WIP summary for this line
            wipSummaryLines[lineCode as keyof WipSummaryLines] = lineGroups;
        }
    });

    return wipSummaryLines;
}