import { useNodeHeights } from "../store/useNodeHeightStore";

let nodeId = 1;

export function objectToFlow(obj: any) {
  const nodes: any[] = [];
  const edges: any[] = [];

  const rootId = `node-${nodeId++}`;
  nodes.push({
    id: rootId,
    type: "root",
    data: { label: obj?.meetingName ?? "Meeting Info" },
    position: { x: 600, y: 0 },
  });

  const utteranceNodes: string[] = [];
  const minutesNodes: string[] = [];
  const { heights } = useNodeHeights.getState();

  let yOffset = 150;

  // Add utterance nodes
  if (Array.isArray(obj.utterances)) {
    obj.utterances.forEach((utterance: any) => {
      const id = `node-${nodeId++}`;
      const label = `${utterance.speaker ?? "Unknown"}: ${
        utterance.text ?? ""
      }`;

      nodes.push({
        id,
        type: "utterance",
        data: { label },
        position: {
          x: 300,
          y: yOffset,
        },
      });

      yOffset += (heights[id] ?? 150) + 100; // height + spacing
      utteranceNodes.push(id);
    });

    if (utteranceNodes.length > 0) {
      edges.push({
        id: `e-${rootId}-${utteranceNodes[0]}`,
        source: rootId,
        target: utteranceNodes[0],
      });
    }

    for (let i = 0; i < utteranceNodes.length - 1; i++) {
      edges.push({
        id: `e-${utteranceNodes[i]}-${utteranceNodes[i + 1]}`,
        source: utteranceNodes[i],
        target: utteranceNodes[i + 1],
      });
    }
  }

  // Add minutes of the meeting nodes
  if (Array.isArray(obj.minutesOfTheMeeting)) {
    let minutesYOffset = 150;

    obj.minutesOfTheMeeting.forEach((minute: any) => {
      const id = `node-${nodeId++}`;
      const label = `Chunk ${minute.chunk}: ${minute.title}\nTime: ${minute.timeRange}\nSummary: ${minute.summary}`;

      nodes.push({
        id,
        type: "minutes",
        data: {
          label,
          chunk: minute.chunk,
          title: minute.title,
          timeRange: minute.timeRange,
          summary: minute.summary,
          tags: minute.tags,
          highlights: minute.highlights,
        },
        position: {
          x: 900, // Position to the right of utterances
          y: minutesYOffset,
        },
      });

      minutesYOffset += (heights[id] ?? 200) + 100; // height + spacing
      minutesNodes.push(id);
    });
  }

  return { nodes, edges };
}
