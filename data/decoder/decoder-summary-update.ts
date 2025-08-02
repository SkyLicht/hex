type Summary = {
    total: number;
    fail_test: number;
    last_added: string;
    to_repair_last_added: string;
}

export type SummaryGroupName = {
    SMT_INPUT1: Summary
    SPI1: Summary
    REFLOW_VI1: Summary
    AOI_B2: Summary
    SMT_INPUT2: Summary
    SPI2: Summary
    REFLOW_VI2: Summary
    AOI_T2: Summary
    PTH_INPUT: Summary
    TOUCH_INSPECT: Summary
    TOUCH_UP: Summary
    ICT: Summary
    FT: Summary
    FINAL_VI: Summary
    FINAL_INSPECT: Summary
    PACKING: Summary
}

export type SummaryLines = {
    J01: SummaryGroupName,
    J02: SummaryGroupName,
    J03: SummaryGroupName,
    J04: SummaryGroupName,
    J05: SummaryGroupName,
    J06: SummaryGroupName,
    J07: SummaryGroupName,
    J08: SummaryGroupName,
    J09: SummaryGroupName,
    J10: SummaryGroupName,
    J11: SummaryGroupName,
}

// Define proper types for the new structure
interface GroupData {
    total: number;
    to_repair: number;
    last_added: string;
    to_repair_last_added: string;
}

interface LineData {
    groups: Record<string, GroupData>;
}

interface Lines {
    [key: string]: LineData;
}

interface SummaryData {
    lines: Lines;
}

interface WebSocketData {
    type: string;
    summary: SummaryData;
}

export function InitSummaryLines(): SummaryLines {
    const createDefaultSummary = (): Summary => ({
        total: 0,
        fail_test: 0,
        to_repair_last_added: "",
        last_added: ""
    });

    const createDefaultGroupName = (): SummaryGroupName => ({
        SMT_INPUT1: createDefaultSummary(),
        SPI1: createDefaultSummary(),
        REFLOW_VI1: createDefaultSummary(),
        AOI_B2: createDefaultSummary(),
        SMT_INPUT2: createDefaultSummary(),
        SPI2: createDefaultSummary(),
        REFLOW_VI2: createDefaultSummary(),
        AOI_T2: createDefaultSummary(),
        PTH_INPUT: createDefaultSummary(),
        TOUCH_INSPECT: createDefaultSummary(),
        TOUCH_UP: createDefaultSummary(),
        ICT: createDefaultSummary(),
        FT: createDefaultSummary(),
        FINAL_VI: createDefaultSummary(),
        FINAL_INSPECT: createDefaultSummary(),
        PACKING: createDefaultSummary()
    });

    return {
        J01: createDefaultGroupName(),
        J02: createDefaultGroupName(),
        J03: createDefaultGroupName(),
        J04: createDefaultGroupName(),
        J05: createDefaultGroupName(),
        J06: createDefaultGroupName(),
        J07: createDefaultGroupName(),
        J08: createDefaultGroupName(),
        J09: createDefaultGroupName(),
        J10: createDefaultGroupName(),
        J11: createDefaultGroupName(),
    };
}

export function DecodeSummary(data: WebSocketData): SummaryLines {

    const summaryLines = InitSummaryLines();

    // Check if data and summary.lines exist
    if (!data || !data.summary || !data.summary.lines) {
        return summaryLines;
    }

    const lines = data.summary.lines;

    // Process each line
    Object.entries(lines).forEach(([lineCode, lineData]: [string, LineData]) => {
        if (lineCode in summaryLines && lineData.groups) {
            const lineGroups: SummaryGroupName = {
                SMT_INPUT1: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                SPI1: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                REFLOW_VI1: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                AOI_B2: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                SMT_INPUT2: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                SPI2: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                REFLOW_VI2: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                AOI_T2: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                PTH_INPUT: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                TOUCH_INSPECT: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                TOUCH_UP: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                ICT: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                FT: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                FINAL_VI: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                FINAL_INSPECT: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
                PACKING: {
                    total: 0, fail_test: 0, to_repair_last_added: "",
                    last_added: ""
                },
            };

            // Process each group within the line - no more hours nesting
            Object.entries(lineData.groups).forEach(([groupName, groupData]: [string, GroupData]) => {

                const summary: Summary = {
                    total: groupData.total || 0,
                    fail_test: groupData.to_repair || 0,
                    last_added: groupData.last_added || "",
                    to_repair_last_added: groupData.to_repair_last_added || ""
                };

                // Map group names directly to our structure
                switch (groupName) {
                    case "SMT INPUT1":
                        lineGroups.SMT_INPUT1 = summary;
                        break;
                    case "SPI1":
                        lineGroups.SPI1 = summary;
                        break;
                    case "AOI B2":
                        lineGroups.AOI_B2 = summary;
                        break;
                    case "REFLOW VI1":
                        lineGroups.REFLOW_VI1 = summary;
                        break;
                    case "SMT INPUT2":
                        lineGroups.SMT_INPUT2 = summary;
                        break;
                    case "SPI2":
                        lineGroups.SPI2 = summary;
                        break
                    case "REFLOW VI2":
                        lineGroups.REFLOW_VI2 = summary;
                        break
                    case "AOI T2":
                        lineGroups.AOI_T2 = summary;
                        break;
                    case "PTH INPUT":
                        lineGroups.PTH_INPUT = summary;
                        break;
                    case "TOUCH INSPECT":
                        lineGroups.TOUCH_INSPECT = summary;
                        break;
                    case "TOUCH UP":
                        lineGroups.TOUCH_UP = summary;
                        break;
                    case "ICT":
                        lineGroups.ICT = summary;
                        break;
                    case "FT1":
                        lineGroups.FT = summary;
                        break;
                    case "FINAL_VI":
                        lineGroups.FINAL_VI = summary;
                        break;
                    case "FINAL INSPECT":
                        lineGroups.FINAL_INSPECT = summary;
                        break;
                    case "PACKING":
                        lineGroups.PACKING = summary;
                        break;
                }
            });

            // Update the summary for this line
            summaryLines[lineCode as keyof SummaryLines] = lineGroups;
        }
    });

    return summaryLines;
}

