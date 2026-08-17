interface ArchitectureConnectionProps {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  lineRef: (element: SVGLineElement | null) => void;
  opacity?: number;
}

export function ArchitectureConnection({
  id,
  from,
  to,
  lineRef,
  opacity = 0.42,
}: ArchitectureConnectionProps) {
  return (
    <line
      ref={lineRef}
      data-connection={id}
      className="arch-connection"
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="var(--accent)"
      strokeOpacity={opacity}
      strokeWidth="1"
    />
  );
}
