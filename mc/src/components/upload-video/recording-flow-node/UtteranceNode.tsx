import React, { useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { useNodeHeights } from "../../../store/useNodeHeightStore";

export function UtteranceNode({ id, data }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const setHeight = useNodeHeights((state) => state.setHeight);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      setHeight(id, height); // set once (store prevents overwrite)
    }
  }, [ref.current]); // only run on mount

  return (
    <div
      ref={ref}
      className="text-slate-800 border-[1px] shadow border-green-900 bg-white rounded-lg px-4 py-2 text-center w-[300px] text-sm font-['Poppins']"
    >
      <Handle type="target" position={Position.Top} />

      {data.label}
      <Handle type="source" position={Position.Right} />
      {/* <Handle type="source" position={Position.Bottom} /> */}
    </div>
  );
}
