import { SOURCES } from "./atlasData.js";

export const SOURCE_TOTAL = 244;

export const EVIDENCE_POSTURES = [
  {
    id: "direct",
    label: "Direct",
    description: "Primary project data, operating systems, field demonstrations, or peer-reviewed evidence close to the claim."
  },
  {
    id: "roadmap",
    label: "Roadmap",
    description: "Agency, industry, or technical roadmaps that name targets, barriers, and plausible development paths."
  },
  {
    id: "analogue",
    label: "Analogue",
    description: "Evidence borrowed from adjacent industries or similar physics, clearly marked as inferential rather than proven."
  }
];

export function sourceStats() {
  return EVIDENCE_POSTURES.map((posture) => ({
    ...posture,
    count: SOURCES.filter((source) => source.ev === posture.id).length
  }));
}
