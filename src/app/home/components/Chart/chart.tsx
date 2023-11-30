import CanvasJSReact from "@canvasjs/react-charts";
import { ChartOptions } from "../../types";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type IProps = {
  options: ChartOptions;
  renderId: string;
};

const Chart = ({ options, renderId }: IProps) => {
  return (
    <div key={renderId}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
