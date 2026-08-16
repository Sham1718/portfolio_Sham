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
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#67e8f9"
      strokeOpacity={opacity}
      strokeWidth="1"
    />
  );
}
