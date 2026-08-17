import type { ProjectArchitectureStep } from "@/data/projects";

interface ProjectArchitectureDiagramProps {
  steps: ProjectArchitectureStep[];
  compact?: boolean;
}

/**
 * Lightweight inline SVG architecture diagram for project previews and deep-dives.
 * Deliberately separate from the background ArchitectureScene — this is a small
 * decorative diagram embedded inside content, not the full-screen background.
 */
export function ProjectArchitectureDiagram({
  steps,
  compact = false,
}: ProjectArchitectureDiagramProps) {
  const nodeW = compact ? 110 : 160;
  const nodeH = compact ? 22 : 30;
  const verticalGap = compact ? 36 : 50;
  const cx = compact ? 70 : 100;
  const fontSize = compact ? 8 : 10;
  const labelFontSize = compact ? 7 : 8.5;

  const svgHeight = steps.length * verticalGap + (compact ? 16 : 24);
  const svgWidth = cx * 2 + (compact ? 20 : 30);

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      aria-hidden="true"
      role="img"
      className="w-full"
      style={{ maxHeight: compact ? "180px" : "360px" }}
    >
      {steps.map((step, i) => {
        const y = i * verticalGap + (compact ? 8 : 12);
        const hasNext = i < steps.length - 1;

        return (
          <g key={step.label}>
            {/* Connector line */}
            {hasNext && (
              <line
                x1={cx}
                y1={y + nodeH}
                x2={cx}
                y2={y + verticalGap}
                stroke="var(--accent)"
                strokeOpacity="0.30"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            )}

            {/* Node box */}
            <rect
              x={cx - nodeW / 2}
              y={y}
              width={nodeW}
              height={nodeH}
              rx="1.5"
              fill="var(--surface)"
              fillOpacity="0.9"
              stroke="var(--accent)"
              strokeOpacity="0.48"
              strokeWidth="0.75"
            />

            {/* Status dot */}
            <circle
              cx={cx - nodeW / 2 + (compact ? 7 : 9)}
              cy={y + nodeH / 2}
              r={compact ? 1.8 : 2.2}
              fill="var(--accent)"
              opacity="0.85"
            />

            {/* Node label */}
            <text
              x={cx - nodeW / 2 + (compact ? 14 : 18)}
              y={y + nodeH / 2 + fontSize * 0.38}
              fill="var(--foreground)"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize={fontSize}
              letterSpacing="0.6"
              opacity="0.9"
            >
              {step.label}
            </text>

            {/* Optional note label to the right */}
            {step.note && !compact && (
              <text
                x={cx + nodeW / 2 + 5}
                y={y + nodeH / 2 + labelFontSize * 0.38}
                fill="var(--accent)"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontSize={labelFontSize}
                letterSpacing="0.4"
                opacity="0.45"
              >
                {step.note}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
