import React from "react";
import { useUploadedMeetingStore } from "../../store/useUploadedMeetingStore";

export default function RecordingMom() {
  const { uploadedMeeting, setUploadedMeeting } = useUploadedMeetingStore();

  return (
    <>
      <div className="flex-1 h-full min-h-0 flex flex-col shadow rounded-lg overflow-y font-['Poppins']">
        <div className="w-full border-b-[1px] border-slate-400 p-4  flex justify-between items-center">
          <strong className="text-sm font-semibold text-slate-800">
            Minutes of the Meeting
          </strong>
        </div>
        <div className="flex flex-col h-full overflow-scroll gap-6 p-4">
          {uploadedMeeting?.minutesOfTheMeeting.map((item: any, index: any) => (
            <div className="flex flex-col gap-2" key={index}>
              <div className="flex justify-between gap-2">
                <strong className="text-sm font-semibold flex-1 text-slate-900">
                  {item.title}
                </strong>
                <p className="text-xs text-slate-800 ">{item.timeRange}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {item.tags.map((tag: any, i: any) => (
                  <div
                    className="p-1 text-[10px] uppercase font-semibold rounded-md bg-green-400 text-white"
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-900 leading-loose">
                <span className="font-semibold">Highlights: </span>
                <br />
                {item.highlights
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
                        <span className="font-bold">{time}</span>{" "}
                        <span className="italic">{quote}</span>
                      </div>
                    );
                  })}
              </p>

              <p className="text-xs text-slate-900 leading-loose">
                <span className="font-semibold">Summary: </span>

                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
