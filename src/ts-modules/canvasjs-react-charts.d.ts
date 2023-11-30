declare module "@canvasjs/react-charts" {
  import { ComponentType } from "react";

  // Assuming CanvasJSChart is part of the CanvasJSReact module
  export interface CanvasJSReactModule {
    CanvasJSChart: ComponentType<any>; // Adjust 'any' to the actual prop type if known
  }

  const CanvasJSReact: CanvasJSReactModule;
  export default CanvasJSReact;
}
