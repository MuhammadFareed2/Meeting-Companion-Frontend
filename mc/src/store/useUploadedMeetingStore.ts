import { create } from "zustand";

type UploadedMeetingState = {
  uploadedMeeting: any;
  setUploadedMeeting: (value: any) => void;
};

export const useUploadedMeetingStore = create<UploadedMeetingState>((set) => ({
  uploadedMeeting: null,

  setUploadedMeeting: (value) => set({ uploadedMeeting: value }),
}));
