import React, { useRef, useState } from "react";
import { uploadMeeting } from "../../APIs";
import Modal from "../Modal";
import Loader from "../Loader";
import { IMAGES } from "../../constant/images";
import { useUploadedMeetingStore } from "../../store/useUploadedMeetingStore";

export default function UploadRecording({ onUploaded }: any) {
  const [uploadedFile, setUploadedFile]: any = useState(null);
  const [uploadFileModalOpen, setUploadFileModalOpen] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingData, setMeetingData]: any = useState(null);
  const [showLoader, setShowLoader]: any = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // percentage
  const [duration, setDuration] = useState(0);

  const { setUploadedMeeting } = useUploadedMeetingStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleCancelUpload = () => {
    setUploadFileModalOpen(false);
    setMeetingTitle("");
  };

  const handleSaveToBack = async () => {
    setShowLoader(true);
    try {
      const formData = new FormData();
      formData.append("video", uploadedFile);
      formData.append("meetingName", meetingTitle);
      const meeting = await uploadMeeting(formData);
      console.log(meeting);
      setMeetingData(meeting);
      setUploadFileModalOpen(false);
      setMeetingTitle("");
      setUploadedMeeting(meeting);
      setShowLoader(false);

            if (onUploaded) onUploaded(meeting);

    } catch (err) {
      setUploadFileModalOpen(false);
      setMeetingTitle("");
      setShowLoader(false);
      setUploadedMeeting(null);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && duration) {
      setProgress((audio.currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (audio && duration) {
      audio.currentTime = (value / 100) * duration;
      setProgress(value);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      {showLoader && <Loader></Loader>}
      <div className="min-h-32 max-h-fit flex flex-col justify-between shadow rounded-lg bg-gray-200 border-green-900 border-4 font-['Poppins']">
        <input
          type="file"
          accept=".mp3, .mp4"
          id="add-meeting"
          hidden
          onChange={handleFileChange}
        />

        {!uploadedFile ? (
          <>
            <p className="text-sm text-gray-600 p-4">
              Click or drag your audio/video file here. Let’s keep things
              moving!
            </p>
            <div className="px-4 pb-4 w-full">
              <label
                htmlFor="add-meeting"
                className="w-full flex justify-center cursor-pointer bg-green-950 text-white py-2 rounded-full"
              >
                Add Meeting
              </label>
            </div>
          </>
        ) : meetingData ? (
          <>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              src={meetingData.meetingAudio}
            ></audio>
            <p className="text-sm text-white bg-green-800 p-4 truncate">
              {meetingData.meetingName}
            </p>
            <div className="upload-box-gradient h-full w-full flex items-center gap-2 p-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-md bg-green-950 flex items-center justify-center cursor-pointer"
              >
                {isPlaying ? (
                  <img className="w-3" src={IMAGES.PauseWhiteIcon} />
                ) : (
                  <img className="w-3" src={IMAGES.PlayIcon} />
                )}
              </button>
              <div className="w-full flex items-center h-8 rounded-md bg-green-950 px-2 relative">
                <p className="text-[10px] text-black -top-4 right-0 absolute">
                  {formatTime((progress / 100) * duration)} /{" "}
                  {formatTime(duration)}
                </p>
                <input
                  type="range"
                  className="audio-seek w-full bg-gray-200 accent-orange-400"
                  value={progress}
                  onChange={handleSeek}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {uploadFileModalOpen && (
              <Modal>
                <div className="p-4 flex flex-col gap-4 w-72">
                  <p className="text-slate-800 text-lg font-semibold">
                    Add meeting title
                  </p>
                  <input
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    value={meetingTitle}
                    className="p-2 border-[1px] border-slate-400 rounded-md outline"
                    maxLength={150}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelUpload}
                      className="w-full flex justify-center cursor-pointer py-2"
                    >
                      Cancel
                    </button>
                    <button
                      className={`w-full flex justify-center  ${
                        meetingTitle == ""
                          ? "bg-green-800 cursor-not-allowed"
                          : "bg-green-950 cursor-pointer"
                      }  text-white py-2 rounded-full`}
                      disabled={meetingTitle == ""}
                      onClick={handleSaveToBack}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Modal>
            )}
            <p className="text-sm text-white bg-green-950 p-4 truncate">
              {uploadedFile.name}
            </p>
            <div className="px-4 pb-4 w-full flex gap-2">
              <label
                htmlFor="add-meeting"
                className="w-full flex justify-center cursor-pointer bg-slate-200  py-2"
              >
                Change
              </label>
              <button
                onClick={() => setUploadFileModalOpen(true)}
                className="w-full flex justify-center cursor-pointer bg-green-950 text-white py-2 rounded-full"
              >
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
