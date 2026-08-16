import type { ArchitectureNode as ArchitectureNodeModel } from "@/types/architecture";

interface ArchitectureNodeProps {
  node: ArchitectureNodeModel;
  groupRef: (element: SVGGElement | null) => void;
  activationRef: (element: SVGRectElement | null) => void;
  labelRef: (element: SVGTextElement | null) => void;
}

const depthOpacity = { far: 0.38, mid: 0.56, near: 0.72 } as const;

export function ArchitectureNode({
  node,
  groupRef,
  activationRef,
  labelRef,
}: ArchitectureNodeProps) {
  const { x, y, depth } = node.position;
  const width = Math.max(118, node.label.length * 7.4 + 28);
  const height = 34;

  return (
    <g
      ref={groupRef}
      transform={`translate(${x - width / 2} ${y - height / 2})`}
      opacity={depthOpacity[depth]}
    >
      <rect
        ref={activationRef}
        width={width}
        height={height}
        fill="#0a0f17"
        fillOpacity="0.86"
        stroke="#67e8f9"
        strokeOpacity="0.88"
        strokeWidth="1"
      />
      <path d={`M0 7H${width}`} stroke="#67e8f9" strokeOpacity="0.36" />
      <circle
        cx="11"
        cy="17"
        r="3"
        fill={node.status === "healthy" ? "#6ee7b7" : "#67e8f9"}
      />
      <text
        ref={labelRef}
        x="20"
        y="21"
        fill="#dcebf1"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="11"
        letterSpacing="0.8"
      >
        {node.label}
      </text>
    </g>
  );
}
