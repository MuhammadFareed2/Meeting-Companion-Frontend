import { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import UploadRecording from "../components/upload-video/UploadRecording";
import RecordingTranscript from "../components/upload-video/RecordingTranscript";
import RecordingMom from "../components/upload-video/RecordingMom";
import RecordingSummary from "../components/upload-video/RecordingSummary";
import RecordingFlow from "../components/upload-video/RecordingFlow";
import { useUploadedMeetingStore } from "../store/useUploadedMeetingStore";
import { createTranscript, generateMon } from "../APIs";

export default function UploadVideo() {
  const { uploadedMeeting, setUploadedMeeting } = useUploadedMeetingStore();

  // Track button states: 'active', 'completed', 'disabled'
  const [stepsStatus, setStepsStatus] = useState({
    transcript: "active",
    mom: "disabled",
    summary: "disabled",
  });

  const getTranscript = async () => {
    if (!uploadedMeeting) return;

    const obj = { meetingLink: uploadedMeeting.meetingAudio, _id: uploadedMeeting._id };
    const meetingWithTranscript = await createTranscript(obj);
    setUploadedMeeting(meetingWithTranscript);

    setStepsStatus({
      transcript: "completed",
      mom: "active",
      summary: "disabled",
    });
  };

  const getMom = async () => {
    if (!uploadedMeeting) return;

    const obj = { _id: uploadedMeeting._id, transcript: uploadedMeeting.utterances };
    const meetingWithMom = await generateMon(obj);
    setUploadedMeeting(meetingWithMom);

    setStepsStatus({
      transcript: "completed",
      mom: "completed",
      summary: "active",
    });
  };

  const getSummary = () => {
    // Summary logic here
    setStepsStatus({
      transcript: "completed",
      mom: "completed",
      summary: "completed",
    });
  };

  // Helper to get button classes
  const getButtonClass = (status: string) => {
    if (status === "active") return "bg-green-600 text-white cursor-pointer";
    if (status === "completed") return "bg-green-500 text-white cursor-not-allowed";
    return "bg-green-100 text-black cursor-not-allowed";
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 py-2 px-2 font-['Poppins'] box-border">
      <ScrollContainer
        className="md:w-full flex scroll-w-fix p-2 rounded-lg bg-gray-200 cursor-grab"
        vertical={false}
        hideScrollbars={true}
      >
        {/* Upload Status */}
        <div
          className={`flex-shrink-0 flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border-[1px] border-green-800 ${
            uploadedMeeting ? "bg-green-600 text-white" : "bg-green-100 text-black"
          }`}
        >
          {uploadedMeeting ? "Meeting uploaded." : "Upload meeting."}
        </div>

        {/* Transcript Button */}
        <div className="flex items-center flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-[1.5px] w-20 bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <button
            onClick={getTranscript}
            className={`flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border-[1px] border-green-800 ${getButtonClass(stepsStatus.transcript)}`}
            disabled={stepsStatus.transcript !== "active"}
          >
            Click here to convert to transcript
          </button>
        </div>

        {/* MOM Button */}
        <div className="flex items-center flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-[1.5px] w-20 bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <button
            onClick={getMom}
            className={`flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border-[1px] border-green-800 ${getButtonClass(stepsStatus.mom)}`}
            disabled={stepsStatus.mom !== "active"}
          >
            Click here to generate minutes of the meeting
          </button>
        </div>

        {/* Summary Button */}
        <div className="flex items-center flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-[1.5px] w-20 bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <button
            onClick={getSummary}
            className={`flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border-[1px] border-green-800 ${getButtonClass(stepsStatus.summary)}`}
            disabled={stepsStatus.summary !== "active"}
          >
            Get Meeting Summary
          </button>
        </div>
      </ScrollContainer>

      <div className="flex md:flex-row flex-col gap-2">
        <div className="flex flex-col gap-2 page md:w-[28%] w-full">
          <UploadRecording />
          <RecordingTranscript />
        </div>
        <div className="flex flex-col gap-2 page md:w-[28%] w-full">
          <RecordingMom />
          <RecordingSummary />
        </div>
        <RecordingFlow />
      </div>
    </div>
  );
}
