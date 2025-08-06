import { RendererMachineContainer } from '@/src/render_layout/renderer/renderer_machines/renderer-machine-container'
import { ViewBoxType } from '@/src/render_layout/type/view-box-type'

class RendererMachineConveyor extends RendererMachineContainer {
    variant: string
    constructor(
        x: number,
        y: number,
        viewBox: ViewBoxType,
        variant: string,
        direction: string
    ) {
        // Call the parent constructor with a ShapePointType
        super({ x, y }, direction)
        this.variant = variant
        // Set the proper dimensions and calculate anchors
        const dimensions = this.getContainerSize(viewBox)
        this.measureContainer(dimensions)
    }

    getContainerSize(viewBox: ViewBoxType) {
        if (this.variant === 'x1') {
            if (this.direction === 'top') {
                switch (viewBox) {
                    case ViewBoxType.H_W_M_1536:
                        return { width: 15, height: 15 } // Loader-specific dimensions
                    case ViewBoxType.H_W_L_1080:
                        return { width: 15, height: 15 } // Larger loader for bigger viewport
                    default:
                        return { width: 15, height: 15 }
                }
            }
            switch (viewBox) {
                case ViewBoxType.H_W_M_1536:
                    return { width: 15, height: 15 } // Loader-specific dimensions
                case ViewBoxType.H_W_L_1080:
                    return { width: 15, height: 15 } // Larger loader for bigger viewport
                default:
                    return { width: 15, height: 15 }
            }
        }

        if (this.variant === 'x2') {
            if (this.direction === 'top' || this.direction === 'bottom') {
                switch (viewBox) {
                    case ViewBoxType.H_W_M_1536:
                        return { width: 15, height: 20 } // Loader-specific dimensions
                    case ViewBoxType.H_W_L_1080:
                        return { width: 15, height: 20 } // Larger loader for bigger viewport
                    default:
                        return { width: 15, height: 20 }
                }
            }
            switch (viewBox) {
                case ViewBoxType.H_W_M_1536:
                    return { width: 20, height: 15 } // Loader-specific dimensions
                case ViewBoxType.H_W_L_1080:
                    return { width: 20, height: 15 } // Larger loader for bigger viewport
                default:
                    return { width: 20, height: 15 }
            }
        }

        if (this.variant === 'x3') {
            switch (viewBox) {
                case ViewBoxType.H_W_M_1536:
                    return { width: 30, height: 15 } // Loader-specific dimensions
                case ViewBoxType.H_W_L_1080:
                    return { width: 30, height: 15 } // Larger loader for bigger viewport
                default:
                    return { width: 30, height: 15 }
            }
        }

        if (this.variant === 'x5') {
            switch (viewBox) {
                case ViewBoxType.H_W_M_1536:
                    return { width: 50, height: 15 } // Loader-specific dimensions
                case ViewBoxType.H_W_L_1080:
                    return { width: 50, height: 15 } // Larger loader for bigger viewport
                default:
                    return { width: 50, height: 15 }
            }
        }

        if (this.variant === 'x7') {
            switch (viewBox) {
                case ViewBoxType.H_W_M_1536:
                    return { width: 60, height: 15 } // Loader-specific dimensions
                case ViewBoxType.H_W_L_1080:
                    return { width: 60, height: 15 } // Larger loader for bigger viewport
                default:
                    return { width: 60, height: 15 }
            }
        }

        switch (viewBox) {
            case ViewBoxType.H_W_M_1536:
                return { width: 20, height: 50 } // Loader-specific dimensions
            case ViewBoxType.H_W_L_1080:
                return { width: 20, height: 50 } // Larger loader for bigger viewport
            default:
                return { width: 20, height: 50 }
        }
    }

    measureShape() {
        // This method can be used for any additional measurements or calculations
        // The basic container measurement is already done in the constructor
    }
}

export default RendererMachineConveyor
