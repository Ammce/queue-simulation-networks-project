"use client";
import { useEffect, useState } from "react";

type Process = {
  id: number | null;
  burstDuration: number | null;
  priority: number | null;
};

const fakeProcesses: Process[] = [
  { id: 1, burstDuration: 10, priority: 1 },
  { id: 2, burstDuration: 5, priority: 2 },
];

const Page = (props) => {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    setProcesses(fakeProcesses);
  }, []);

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: processes.length + 1, burstDuration: null, priority: null },
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
              {processes.map((process) => {
                return (
                  <tr key={process.id}>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      {process.id}
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      {process.burstDuration}
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      {process.priority}
                    </td>
                    <td className="border border-emerald-500  text-emerald-600 font-medium">
                      X
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
      <div>Simulation</div>
    </div>
  );
};

export default Page;
