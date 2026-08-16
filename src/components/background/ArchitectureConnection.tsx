interface ArchitectureConnectionProps {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  activationRef: (element: SVGLineElement | null) => void;
}

export function ArchitectureConnection({
  id,
  from,
  to,
  activationRef,
}: ArchitectureConnectionProps) {
  return (
    <line
      ref={activationRef}
      data-connection={id}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#67e8f9"
      strokeOpacity="0.22"
      strokeWidth="1"
    />
  );
}
