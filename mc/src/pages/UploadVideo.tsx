import { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import UploadRecording from "../components/upload-video/UploadRecording";
import RecordingTranscript from "../components/upload-video/RecordingTranscript";
import RecordingMom from "../components/upload-video/RecordingMom";
import RecordingSummary from "../components/upload-video/RecordingSummary";
import RecordingFlow from "../components/upload-video/RecordingFlow";
import { useUploadedMeetingStore } from "../store/useUploadedMeetingStore";
import { createTranscript, generateMon } from "../APIs";
import Loader from "../components/Loader";

type StepState = "active" | "completed" | "disabled";

export default function UploadVideo() {
  const { uploadedMeeting, setUploadedMeeting } = useUploadedMeetingStore();

  const [stepsStatus, setStepsStatus] = useState<{
    upload: StepState;
    transcript: StepState;
    mom: StepState;
    summary: StepState;
  }>({
    upload: "active",
    transcript: "disabled",
    mom: "disabled",
    summary: "disabled",
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // BUTTON CLASS HELPER
  const getButtonClass = (status: StepState) => {
    if (status === "active") return "bg-green-600 text-white cursor-pointer";
    if (status === "completed") return "bg-green-100 text-black cursor-not-allowed";
    return "bg-green-100 text-black cursor-not-allowed";
  };

  const onMeetingUploaded = (meeting: any) => {
    setUploadedMeeting(meeting);
    setStepsStatus({
      upload: "completed",
      transcript: "active",
      mom: "disabled",
      summary: "disabled",
    });
  };

  const getTranscript = async () => {
    if (!uploadedMeeting) return;
    setLoading(true); // start loader
    try {
      const obj = { meetingLink: uploadedMeeting.meetingAudio, _id: uploadedMeeting._id };
      const meetingWithTranscript = await createTranscript(obj);
      setUploadedMeeting(meetingWithTranscript);
      setStepsStatus({
        upload: "completed",
        transcript: "completed",
        mom: "active",
        summary: "disabled",
      });
    } catch (error) {
      console.error("Failed to get transcript:", error);
      alert("Failed to get transcript. Try again.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  const getMom = async () => {
    if (!uploadedMeeting) return;
    setLoading(true); // start loader
    try {
      const obj = { _id: uploadedMeeting._id, transcript: uploadedMeeting.utterances };
      const meetingWithMom = await generateMon(obj);
      setUploadedMeeting(meetingWithMom);
      setStepsStatus({
        upload: "completed",
        transcript: "completed",
        mom: "completed",
        summary: "active",
      });
    } catch (error) {
      console.error("Failed to generate MOM:", error);
      alert("Failed to generate MOM. Try again.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  const getSummary = () => {
    setStepsStatus({
      upload: "completed",
      transcript: "completed",
      mom: "completed",
      summary: "completed",
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 py-2 px-2 font-['Poppins'] box-border">
      {loading && <Loader />}
      <ScrollContainer
        className="md:w-full flex scroll-w-fix p-2 rounded-lg bg-gray-200 cursor-grab"
        vertical={false}
        hideScrollbars={true}
      >
        <button
          className={`flex-shrink-0 flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border border-green-800 ${getButtonClass(
            stepsStatus.upload
          )}`}
          disabled={stepsStatus.upload !== "active" || loading} // disable when loading
        >
          {uploadedMeeting ? "Meeting uploaded." : "Upload meeting."}
        </button>

        <div className="flex items-center flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-[1.5px] w-20 bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
        </div>

        <button
          onClick={getTranscript}
          className={`flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border border-green-800 ${getButtonClass(
            stepsStatus.transcript
          )}`}
          disabled={stepsStatus.transcript !== "active" || loading} // disable when loading
        >
          Click here to convert to transcript
        </button>

        <div className="flex items-center flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-[1.5px] w-20 bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
        </div>

        <button
          onClick={getMom}
          className={`flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border border-green-800 ${getButtonClass(
            stepsStatus.mom
          )}`}
          disabled={stepsStatus.mom !== "active" || loading} // disable when loading
        >
          Click here to generate minutes of the meeting
        </button>

        <div className="flex items-center flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-[1.5px] w-20 bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
        </div>

        <button
          onClick={getSummary}
          className={`flex items-center justify-center w-36 h-14 p-2 rounded-md text-[10px] border border-green-800 ${getButtonClass(
            stepsStatus.summary
          )}`}
          disabled={stepsStatus.summary !== "active" || loading} // disable when loading
        >
          Get Meeting Summary
        </button>
      </ScrollContainer>

      <div className="flex md:flex-row flex-col gap-2">
        <div className="flex flex-col gap-2 page md:w-[28%] w-full">
          <UploadRecording onUploaded={onMeetingUploaded} />
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
