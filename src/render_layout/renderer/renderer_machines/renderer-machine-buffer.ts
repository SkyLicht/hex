import { RendererMachineContainer } from '@/src/render_layout/renderer/renderer_machines/renderer-machine-container'
import { ViewBoxType } from '@/src/render_layout/type/view-box-type'

class RendererMachineBuffer extends RendererMachineContainer {
    constructor(
        x: number,
        y: number,
        viewBox: ViewBoxType,
        direction: string,
        variant: string
    ) {
        // Call the parent constructor with a ShapePointType
        super({ x, y }, direction)

        // Set the proper dimensions and calculate anchors
        const dimensions = this.getContainerSize(viewBox, variant)
        this.measureContainer(dimensions)
    }

    getContainerSize(viewBox: ViewBoxType, variant: string) {
        if (variant === 'sorted_buffer_machine') {
            switch (viewBox) {
                case ViewBoxType.H_W_M_1536:
                    return { width: 15, height: 20 } // Loader-specific dimensions
                case ViewBoxType.H_W_L_1080:
                    return { width: 18, height: 30 } // Larger loader for bigger viewport
                default:
                    return { width: 18, height: 30 }
            }
        }
        switch (viewBox) {
            case ViewBoxType.H_W_M_1536:
                return { width: 25, height: 20 } // Loader-specific dimensions
            case ViewBoxType.H_W_L_1080:
                return { width: 18, height: 30 } // Larger loader for bigger viewport
            default:
                return { width: 18, height: 30 }
        }
    }

    measureShape() {
        // This method can be used for any additional measurements or calculations
        // The basic container measurement is already done in the constructor
    }
}

export default RendererMachineBuffer
