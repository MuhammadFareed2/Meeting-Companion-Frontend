import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Modal from "../Modal";

import { useUploadedMeetingStore } from "../../store/useUploadedMeetingStore";
import { IMAGES } from "../../constant/images";
import { editTranscript } from "../../APIs";

export default function RecordingTranscript() {
  const { uploadedMeeting, setUploadedMeeting } = useUploadedMeetingStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const [isDraggable, setIsDraggable] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [initialUtterances, setInitialUtterances]: any = useState(null);
  const [isAddTranscriptModalOpen, setIsAddTranscriptModalOpen] =
    useState(false);
  const [newTranscriptForm, setNewTranscriptForm] = useState({
    speaker: "",
    text: "",
    atIndex: null,
  });

  const handleDragStart = (event: DragStartEvent) => {
    console.log("Drag started!", event.active.id);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = active.id as number;
      const newIndex = over?.id as number;
      const updatedUtterances = arrayMove(
        uploadedMeeting.utterances,
        oldIndex,
        newIndex
      );

      setUploadedMeeting({ ...uploadedMeeting, utterances: updatedUtterances });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleEnableDrag = () => {
    setIsDraggable(true);
    setInitialUtterances(uploadedMeeting?.utterances || []);
  };

  const handleCancelDragEdit = () => {
    setIsDraggable(false);
    setUploadedMeeting({ ...uploadedMeeting, utterances: initialUtterances });
    setInitialUtterances(null);
  };

  const handleSaveDragEdit = () => {
    setInitialUtterances(null);
  };

  const handleNewTranscriptModalOpen = () => {
    setIsAddTranscriptModalOpen(true);
  };

  const handleNewTranscriptModalClose = () => {
    setIsAddTranscriptModalOpen(false);
  };

  const [isEditable, setIsEditable] = useState<number | null>(null);

  return (
    <>
      {isAddTranscriptModalOpen && (
        <Modal>
          <div className="p-4 flex flex-col gap-4 w-72">
            <p className="text-slate-800 text-lg font-semibold">
              Add a transcript
            </p>
            <textarea
              className="outline leading-loose outline-none text-xs text-slate-600 p-2 box-border border-[1px] border-slate-600 rounded-lg max-h-20"
              style={{ resize: "none" }}
              placeholder="Transcript"
            ></textarea>
            <div className="flex gap-2">
              <button
                onClick={handleNewTranscriptModalClose}
                className="w-full flex justify-center cursor-pointer py-2"
              >
                Cancel
              </button>
              <button
                className={`w-full flex justify-center "bg-green-800 cursor-not-allowed"
                text-white py-2 rounded-full`}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="flex-1 h-full min-h-0 flex flex-col shadow rounded-lg overflow-y font-['Poppins']">
        <div className="w-full border-b-[1px] border-slate-400 p-4  flex justify-between items-center">
          <strong className="text-sm font-semibold text-slate-800">
            Transcript
          </strong>
          {isEditable == null && (
            <div className="flex items-center gap-2">
              {!isDraggable && (
                <button
                  onClick={handleNewTranscriptModalOpen}
                  className="cursor-pointer group"
                >
                  <img
                    className="w-4.5 group-hover:hidden"
                    src={IMAGES.RoundedPlusIcon}
                  />
                  <img
                    className="w-4.5 hidden group-hover:flex"
                    src={IMAGES.RoundedPlusIconGreen}
                  />
                </button>
              )}
              {!isDraggable ? (
                <button
                  className="cursor-pointer group"
                  onClick={handleEnableDrag}
                >
                  <img
                    className="w-3 group-hover:hidden"
                    src={IMAGES.PenIcon}
                  />
                  <img
                    className="w-3 hidden group-hover:flex"
                    src={IMAGES.PenGreenIcon}
                  />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    className="text-xs cursor-pointer hover:text-green-500"
                    onClick={() => setIsDraggable(false)}
                  >
                    Save
                  </button>
                  <button
                    className="text-xs cursor-pointer hover:text-green-500"
                    onClick={handleCancelDragEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={(uploadedMeeting?.utterances || [])?.map(
              (_: any, index: any) => index
            )}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4 h-full w-full overflow-x-visible overflow-y-scroll p-2 drag-con">
              {uploadedMeeting?.utterances?.map(
                (utterance: any, index: number) => (
                  <SortableItem
                    key={index}
                    id={index}
                    index={index}
                    utterance={utterance}
                    isDraggable={isDraggable}
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                  />
                )
              )}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId !== null ? (
              <SortableItem
                key={activeId}
                id={activeId}
                index={activeId}
                utterance={uploadedMeeting?.utterances[activeId]}
                isDraggable={isDraggable}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

const SortableItem = ({
  utterance,
  index,
  id,
  isDraggable,
  isEditable,
  setIsEditable,
}: any) => {
  const { uploadedMeeting, setUploadedMeeting } = useUploadedMeetingStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [editedText, setEditedText] = useState("");
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const handleEdit = (index: number) => {
    setEditedText(uploadedMeeting.utterances[index].text);
    setIsEditable(index);
  };

  const handleCancelEdit = (e: any) => {
    e.stopPropagation();
    setIsEditable(null);
  };

  const handleSaveEdit = async (index: number, e: any) => {
    e.stopPropagation();
    try {
      const updatedUtterances = [...uploadedMeeting.utterances];
      updatedUtterances[index].text = editedText.replace(/\s+/g, " ").trim();
      const obj = {
        _id: uploadedMeeting._id,
        utteranceId: updatedUtterances[index]._id,
        text: updatedUtterances[index].text,
      };
      console.log(obj);
      const updated = await editTranscript(obj);
      console.log(updated);
      setUploadedMeeting({ ...uploadedMeeting, utterances: updatedUtterances });
      setEditedText("");
      setIsEditable(null);
    } catch (err) {
      setEditedText("");
      setIsEditable(null);
    }
  };

  useEffect(() => {
    textareaRefs?.current.forEach((textarea) => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight + 16}px`;
      }
    });
  }, [uploadedMeeting]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex flex-col gap-2 p-2 relative bg-white ${
        isDraggable && "shadow"
      } rounded-md`}
    >
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2 ">
          {isDraggable && (
            <button className="w-5 cursor-grab" {...listeners}>
              <img
                className="w-full flex items-center justify-center"
                src={IMAGES.DragIcon}
              />
            </button>
          )}
          <div className="flex items-center gap-2">
            <p className="text-xs">{index + 1}</p>
            <p className="text-[10px] text-white p-1 rounded-md bg-green-500 w-fit">
              Speaker: {utterance.speaker}
            </p>
          </div>
        </div>

        {!isDraggable && (
          <>
            {isEditable !== index ? (
              <button
                className="cursor-pointer group"
                onClick={() => handleEdit(index)}
              >
                <img className="w-3 group-hover:hidden" src={IMAGES.PenIcon} />
                <img
                  className="w-3 hidden group-hover:flex"
                  src={IMAGES.PenGreenIcon}
                />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="text-xs cursor-pointer hover:text-green-500"
                  onClick={(e) => handleSaveEdit(index, e)}
                >
                  Save
                </button>
                <button
                  className="text-xs cursor-pointer hover:text-green-500"
                  onClick={(e) => handleCancelEdit(e)}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <textarea
        style={{ resize: "none" }}
        className="flex text-xs text-slate-600 p-2 box-border border-[1px] border-slate-600 rounded-lg w-full leading-loose outline-none overflow-hidden"
        disabled={isEditable !== index}
        value={isEditable === index ? editedText : utterance.text}
        onChange={(e) => setEditedText(e.target.value)}
        ref={(el) => {
          textareaRefs.current[index] = el;
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight + 16}px`;
        }}
      ></textarea>
      <div className="flex items-center justify-end gap-2 text-[10px] text-slate-600 absolute bottom-4 right-4">
        <p>
          {isEditable === index
            ? editedText
                .trim()
                .split(/\s+/)
                .filter((w) => w).length
            : utterance.text
                .trim()
                .split(/\s+/)
                .filter((w: any) => w).length}{" "}
          words
        </p>
        <p>-</p>
        <p>
          {isEditable === index ? editedText.length : utterance.text.length}{" "}
          letters
        </p>
      </div>
    </div>
  );
};
