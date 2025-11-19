import React, { useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { useNodeHeights } from "../../../store/useNodeHeightStore";

export function MinutesNode({ id, data }: any) {
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
      className="text-slate-800 border-[1px] shadow border-green-900 bg-white rounded-lg px-4 py-3 text-left w-[400px] font-['Poppins']"
    >
      <Handle type="target" position={Position.Left} />

      {/* Title and Time Range */}
      <div className="flex justify-between gap-2 mb-2">
        <strong className="text-sm font-semibold flex-1 text-slate-900">
          {data.title}
        </strong>
        <p className="text-xs text-slate-800">{data.timeRange}</p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-3">
        {data.tags?.map((tag: any, i: any) => (
          <div
            className="p-1 text-[10px] uppercase font-semibold rounded-md bg-green-400 text-white"
            key={i}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Highlights */}
      {data.highlights && (
        <div className="mb-3">
          <span className="font-semibold text-xs">Highlights: </span>
          <br />
          {data.highlights
            ?.replace(/\s*\/n\s*/gi, "\n") // convert "/n" to real newline
            .split("\n")
            .filter((line: any) => line.trim() !== "") // remove empty lines
            .map((line: string, i: number) => {
              const match = line.match(
                /\*(\[\d{2}:\d{2}-\d{2}:\d{2}])\*\s*(.*)/
              );
              if (!match) return null;

              const [, time, quote] = match;

              return (
                <div key={i} className="mt-1">
                  <span className="font-bold text-xs">{time}</span>{" "}
                  <span className="italic text-xs">{quote}</span>
                </div>
              );
            })}
        </div>
      )}

      {/* Summary */}
      <p className="text-xs text-slate-900 leading-loose">
        <span className="font-semibold">Summary: </span>
        {data.summary}
      </p>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
