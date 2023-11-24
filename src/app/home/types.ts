export type ChartOptions = {
  animationEnabled: boolean;
  theme: string;
  title: {
    text: string;
  };
  axisX: {
    valueFormatString: string;
  };
  axisY: {
    suffix: string;
    minimum?: number;
  };
  toolTip: {
    shared: boolean;
  };
  legend: {
    cursor: string;
    // itemclick?: (e: any) => void; // Uncomment if you want to include the itemclick property
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
