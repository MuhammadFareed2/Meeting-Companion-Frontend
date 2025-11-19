import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { objectToFlow } from "../../utility/reactFlowUtility";
import { useUploadedMeetingStore } from "../../store/useUploadedMeetingStore";
import { RootNode } from "./recording-flow-node/RootNode";
import { UtteranceNode } from "./recording-flow-node/UtteranceNode";
import { MinutesNode } from "./recording-flow-node/MinutesNode";

export default function RecordingFlow() {
  const { uploadedMeeting, setUploadedMeeting } = useUploadedMeetingStore();
  const { nodes, edges } = objectToFlow(uploadedMeeting || {});

  const nodeTypes = {
    root: RootNode,
    utterance: UtteranceNode,
    minutes: MinutesNode,
  };

  return (
    <>
      <div className="shadow rounded-lg flex-1">
        <ReactFlow
          className="pattern"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>
    </>
  );
}
