import CanvasJSReact from "@canvasjs/react-charts";
import { ChartOptions } from "../../types";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type IProps = {
  options: ChartOptions;
  renderId: string;
};

export const Chart = ({ options, renderId }: IProps) => {
  return (
    <div key={renderId}>
      <CanvasJSChart options={options} />
    </div>
  );
};
