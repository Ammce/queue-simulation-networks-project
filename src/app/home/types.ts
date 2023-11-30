export type ChartOptions = {
  animationEnabled: boolean;
  theme: string;
  axisX: {
    valueFormatString: string;
  };
  axisY: {
    suffix: string;
    minimum?: number;
  };
  title: {
    text: string;
    fontSize: number;
    padding: number;
  };
  toolTip: {
    shared: boolean;
  };
  legend: {
    cursor: string;
    verticalAlign: string;
  };
  data: Array<{
    type: string;
    name: string;
    showInLegend: string;
    dataPoints: Array<{ x: number; y: number }>;
    color: string;
    priority: string;
  }>;
};
