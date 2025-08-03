export  enum ViewBoxType {
    H_F_S_720,
    H_F_M_1536,
    H_F_L_1080,
    H_F_XL_2160,
    H_W_S_720,
    H_W_M_1536,
    H_W_L_1080,
    V_F_XL_2160,
}
export type ViewBoxResolution = {
    width: number;
    height: number;
}

export function GetResolution(type: ViewBoxType): ViewBoxResolution {
    switch (type) {
        case ViewBoxType.H_F_S_720:
            return {width: 1280, height: 720};
        case ViewBoxType.H_F_M_1536:
            return {width: 1536, height: 1024};
        case ViewBoxType.H_F_L_1080:
            return {width: 1920, height: 1080};
        case ViewBoxType.H_F_XL_2160:
            return {width: 2160, height: 1440};
        case ViewBoxType.H_W_S_720:
            return {width: 1280, height: 400};
        case ViewBoxType.H_W_M_1536:
            return {width: 1536, height: 400};
        case ViewBoxType.H_W_L_1080:
            return {width: 1920, height: 400};
        case ViewBoxType.V_F_XL_2160:
            return {width: 2160, height: 3840};
    }
}