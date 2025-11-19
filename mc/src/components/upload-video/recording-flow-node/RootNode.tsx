import React from "react";
import { Handle, Position } from "reactflow";

export function RootNode({ data }: any) {
  return (
    <div className="bg-green-700 text-white border-2 border-green-900 rounded-lg px-4 py-2 shadow-md text-center text-sm font-semibold font-['Poppins']">
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
