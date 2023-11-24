"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { ChartOptions } from "./types";
import { Chart } from "./components/Chart/chart";
import { v1 } from "uuid";

function getRandomColor() {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert the values to hexadecimal and format as a CSS color code
  const color = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;

  return color;
}

// Helper function to convert a decimal value to a two-digit hexadecimal value
function toHex(decimalValue: number) {
  const hex = decimalValue.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

type Process = {
  id: number;
  burstDuration: string;
  priority: string;
};

const fakeProcesses: Process[] = [
  { id: 1, burstDuration: "10", priority: "" },
  { id: 2, burstDuration: "5", priority: "2" },
  { id: 3, burstDuration: "15", priority: "" },
  { id: 4, burstDuration: "20", priority: "4" },
];

const Page = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [renderId, setRenderId] = useState("renrer-id");

  const [options, setOptions] = useState<ChartOptions>({
    animationEnabled: true,
    theme: "dark2",
    axisX: {
      valueFormatString: "-",
    },
    axisY: {
      suffix: "ms",
      minimum: 0,
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      // itemclick: (e) => console.log(e),
    },
    data: [],
  });

  useEffect(() => {
    setProcesses(fakeProcesses);
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

  const simulateQueue = () => {
    setRenderId(v1());
    const formattedData = processes
      .map((process) => {
        return {
          type: "stackedBar",
          name: `P${process.id}`,
          showInLegend: "true",
          dataPoints: [{ x: 0, y: Number(process.burstDuration) }],
          color: getRandomColor(),
          priority: process.priority,
        };
      })
      .sort((a, b) => {
        const priorityA = a.priority;
        const priorityB = b.priority;

        if (priorityA === "") {
          return 1;
        } else if (priorityB === "") {
          return -1;
        } else {
          return Number(priorityA) - Number(priorityB);
        }
      });

    setOptions({ ...options, data: formattedData });

    setIsSimulating(true);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex-1 flex flex-col justify-center items-center rounded-t-xl overflow-hidden bg-gradient-to-r">
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
                    <td className="w-22 text-center border border-emerald-500  text-emerald-600 font-medium">
                      {process.id}
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      <input
                        type="number"
                        value={String(process.burstDuration)}
                        className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        name="burstDuration"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      <input
                        type="number"
                        value={String(process.priority)}
                        className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="priority"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td className="w-12 border border-emerald-500  text-emerald-600 font-medium">
                      <div className="flex items-center justify-center">
                        <svg
                          onClick={() => removeProcess(index)}
                          className="w-6 h-6 text-gray-800 dark:text-red-600 cursor-pointer"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-3 mb-3">
            <button
              onClick={addProcess}
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2"
            >
              <svg
                className="ww-6 h-5 me-2 -ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
              </svg>
              Add process
            </button>
            <button
              onClick={simulateQueue}
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2"
            >
              <svg
                className="ww-6 h-5 me-2 -ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
                />
              </svg>
              Simulate Queue
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          Instructions
        </div>
      </div>
      {isSimulating && (
        <div>
          <Chart options={options} renderId={renderId} />
        </div>
      )}
    </div>
  );
};

export default Page;
