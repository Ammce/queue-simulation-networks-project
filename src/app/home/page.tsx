"use client";
import { useEffect, useState, ChangeEvent } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type Process = {
  id: number;
  burstDuration: string;
  priority: string;
};

const fakeProcesses: Process[] = [
  { id: 1, burstDuration: "10", priority: "1" },
  { id: 2, burstDuration: "5", priority: "2" },
];

const Page = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  const [options, setOptions] = useState({
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Evening Sales in a Restaurant",
    },
    axisX: {
      valueFormatString: "-",
    },
    axisY: {
      suffix: "ms",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      // itemclick: (e) => console.log(e),
    },
    data: [
      {
        type: "stackedBar",
        name: "Meals",
        showInLegend: "true",

        dataPoints: [{ x: 1, y: 10 }],
        color: "blue",
      },
      {
        type: "stackedBar",
        name: "Snacks",
        showInLegend: "true",

        dataPoints: [{ x: 1, y: 20 }],
        color: "purple",
      },
      {
        type: "stackedBar",
        name: "Drinks",
        showInLegend: "true",

        dataPoints: [{ x: 1, y: 30 }],
      },
      {
        type: "stackedBar",
        name: "Dessert",
        showInLegend: "true",

        dataPoints: [{ x: 1, y: 40 }],
      },
      {
        type: "stackedBar",
        name: "Takeaway",
        showInLegend: "true",

        dataPoints: [{ x: 1, y: 60 }],
      },
    ],
  });

  useEffect(() => {
    setProcesses(fakeProcesses);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Blaaa");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newProcesses = [...processes];
    newProcesses[index] = {
      ...newProcesses[index],
      [e.target.name]: e.target.value,
    };
    setProcesses(newProcesses);
  };

  const removeProcess = (processIndex: number) => {
    let newProcesses = [...processes];
    newProcesses.splice(processIndex, 1);
    newProcesses = newProcesses.map((process, index) => ({
      ...process,
      id: index + 1,
    }));
    setProcesses(newProcesses);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, burstDuration: "", priority: "" },
    ]);
  };

  return (
    <div>
      <div>Heading</div>
      <div>
        <div>Instructions</div>
        <div className="rounded-t-xl overflow-hidden bg-gradient-to-r">
          <table className="table-auto">
            <thead>
              <tr>
                <th className=" text-emerald-600">Process</th>
                <th className=" text-emerald-600">Burst duration</th>
                <th className=" text-emerald-600">Priority</th>
                <th className=" text-emerald-600"></th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => {
                return (
                  <tr key={process.id}>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      {process.id}
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      <input
                        type="number"
                        value={String(process.burstDuration)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="10s"
                        required
                        name="burstDuration"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      <input
                        type="number"
                        value={String(process.priority)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="10s"
                        name="priority"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      <span onClick={() => removeProcess(index)}>X</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <button
              onClick={addProcess}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add process
            </button>
          </div>
        </div>
      </div>
      <div>
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default Page;
