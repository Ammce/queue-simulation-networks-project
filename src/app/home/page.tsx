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
    title: {
      text: "FIFO Queue simulation",
    },
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
          <div>
            <h3> Controls </h3>
            <button
              onClick={simulateQueue}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Simulate queue
            </button>
          </div>
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
