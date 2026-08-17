import type { CSSProperties } from "react";
import type { ArchitectureNode as ArchitectureNodeModel } from "@/types/architecture";

export const getNodeWidth = (label: string) =>
  Math.max(116, label.length * 7.5 + 28);

export const NODE_HEIGHT = 34;

export const depthOpacity = {
  far: 0.36,
  mid: 0.52,
  near: 0.72,
} as const;

interface ArchitectureNodeProps {
  node: ArchitectureNodeModel;
  /** Position within the scene, used to stagger the halo breathe animation. */
  index?: number;
  groupRef: (element: SVGGElement | null) => void;
  rectRef: (element: SVGRectElement | null) => void;
  lineRef: (element: SVGPathElement | null) => void;
  statusRef: (element: SVGCircleElement | null) => void;
  labelRef: (element: SVGTextElement | null) => void;
}

export function ArchitectureNode({
  node,
  index = 0,
  groupRef,
  rectRef,
  lineRef,
  statusRef,
  labelRef,
}: ArchitectureNodeProps) {
  const { x, y, depth } = node.position;
  const width = getNodeWidth(node.label);

  return (
    <g
      ref={groupRef}
      transform={`translate(${x - width / 2} ${y - NODE_HEIGHT / 2})`}
      opacity={depthOpacity[depth]}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Ambient breathing halo — a separate element GSAP never touches, so
          its opacity animation can't conflict with the packet pulse. */}
      <circle
        className="arch-halo"
        cx={width / 2}
        cy={NODE_HEIGHT / 2}
        r={NODE_HEIGHT}
        fill="var(--accent)"
        opacity="0.15"
        style={{ "--node-index": index } as CSSProperties}
      />
      <rect
        ref={rectRef}
        width={width}
        height={NODE_HEIGHT}
        fill="var(--surface)"
        fillOpacity="0.94"
        stroke="var(--accent)"
        strokeOpacity="0.62"
        strokeWidth="1"
        rx="2"
      />
      <path
        ref={lineRef}
        d={`M0 7H${width}`}
        stroke="var(--accent)"
        strokeOpacity="0.42"
      />
      <circle
        ref={statusRef}
        cx="11"
        cy="17"
        r="2.5"
        fill="var(--accent)"
        opacity="0.95"
      />
      <text
        ref={labelRef}
        x="20"
        y="21"
        fill="var(--foreground)"
        opacity="0.95"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="10.5"
        letterSpacing="0.8"
      >
        {node.label}
      </text>
    </g>
  );
}
