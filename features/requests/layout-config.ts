import layout from "@/public/render/layout.json";

type RenderType =
    "default"
    | "conveyor"
    | "conveyor_x5"
    | "conveyor_x4"
    | "conveyor_x3"
    | "conveyor_x7"
    | "rotator"
    | "shuttle"
    | "ict"
    | "ft_grid"
    | "back_plate"
    | "panasonic_npm"
    | "battery_insert"
    | "spi"
    | "loader"
    | "install_socket"
    | "buffer_ng"
    | "carrier"
    | "ft_cell"
    | "fuzion"
    | "reflow_oven"
    | "wave_oven"
    | "facc"
    | "install_hs"
    | "sliding"
    | "ict_auto"
    | "juki"
    | "manual_ass"
    | "pallet"; // add more as you grow

export type DataCollector = {
    name: string;
    "render": {
        "direction": string
    }
} | null;

export interface StationRender {
    index: number;
    name: string;
    owner: string;
    automatic?: boolean;
    data_collector: DataCollector;
    render_type: RenderType
    "operators": {
        "render": "front" | "rear",
        "bound": string
    }[] | null
}

interface StationModel {
    index: number;
    name: string;
    owner: string;
    automatic?: boolean;
    data_collector: DataCollector;
    render_type: string
    "operators": {
        "render": string,
        "bound": string
    }[] | null
}

interface Line {
    smt: StationModel[]
    pth: StationModel[]
}

interface Lines {
    J01: Line,
    J02: Line,
    J03: Line,
    J05: Line,
    J06: Line,
    J07: Line,
    J08: Line,
    J09: Line,
    J10: Line,
    J11: Line
}


export interface LineRender {
    smt: StationRender[]
    pth: StationRender[]
}

// export interface LinesRender {
//     J01: LineRender,
//     J02: LineRender,
//     J03: LineRender,
//     J05: LineRender,
//     J06: LineRender,
//     J07: LineRender,
//     J08: LineRender,
//     J09: LineRender,
//     J10: LineRender,
//     J11: LineRender
// }

export const getLayoutLines = (): Lines => {

    return layout as Lines;
}



const transformStationToRender = (station: StationModel): StationRender => {
    return <StationRender>{
        ...station,
        render_type: station.render_type || "default" as RenderType
    };
};

// Transform Line to LineRender
const transformLineToRender = (line: Line): LineRender => {
    return {
        smt: line.smt.map(transformStationToRender),
        pth: line.pth.map(transformStationToRender)
    };
};

export const getLayoutLine = (line: string): LineRender => {
    const lines = layout as Lines;

    if (line === "J01") {
        return transformLineToRender(lines.J01);
    }
    if (line === "J02") {
        return transformLineToRender(lines.J02);
    }
    if (line === "J03") {
        return transformLineToRender(lines.J03);
    }
    if (line === "J05") {
        return transformLineToRender(lines.J05);
    }
    if (line === "J06") {
        return transformLineToRender(lines.J06);
    }
    if (line === "J07") {
        return transformLineToRender(lines.J07);
    }
    if (line === "J08") {
        return transformLineToRender(lines.J08);
    }
    if (line === "J09") {
        return transformLineToRender(lines.J09);
    }
    if (line === "J10") {
        return transformLineToRender(lines.J10);
    }
    if (line === "J11") {
        return transformLineToRender(lines.J11);
    }

    throw new Error(`Invalid line: ${line}`);
}