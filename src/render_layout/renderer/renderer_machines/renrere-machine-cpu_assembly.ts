import { RendererMachineContainer } from '@/src/render_layout/renderer/renderer_machines/renderer-machine-container'
import { ViewBoxType } from '@/src/render_layout/type/view-box-type'

class RendererMachineCPU extends RendererMachineContainer {
    constructor(x: number, y: number, viewBox: ViewBoxType, direction: string) {
        // Call the parent constructor with a ShapePointType
        super({ x, y }, direction)

        // Set the proper dimensions and calculate anchors
        const dimensions = this.getContainerSize(viewBox)
        this.measureContainer(dimensions)
    }

    getContainerSize(viewBox: ViewBoxType) {
        switch (viewBox) {
            case ViewBoxType.H_W_M_1536:
                return { width: 35, height: 35 } // Loader-specific dimensions
            case ViewBoxType.H_W_L_1080:
                return { width: 35, height: 35 } // Larger loader for bigger viewport
            default:
                return { width: 35, height: 35 }
        }
    }

    measureShape() {
        // This method can be used for any additional measurements or calculations
        // The basic container measurement is already done in the constructor
    }
}

export default RendererMachineCPU
