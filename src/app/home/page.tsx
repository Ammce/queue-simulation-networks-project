"use client";
import { useState } from "react";

type Process = {
  id: number;
  burstDuration: number;
  priority?: number;
};

const Page = (props) => {
  const [processes, setProcesses] = useState<Process[]>([]);

  return (
    <div>
      <div>Heading</div>
      <div>
        <div>Instructions</div>
        <div>Table</div>
      </div>
      <div>Simulation</div>
    </div>
  );
};

export default Page;
