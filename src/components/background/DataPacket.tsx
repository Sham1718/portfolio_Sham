interface DataPacketProps {
  packetRef: (element: SVGCircleElement | null) => void;
  x: number;
  y: number;
  fill?: string;
}

export function DataPacket({
  packetRef,
  x,
  y,
  fill = "var(--accent)",
}: DataPacketProps) {
  return (
    <circle
      ref={packetRef}
      cx={x}
      cy={y}
      r="3.5"
      fill={fill}
      opacity="0"
      style={{ filter: "drop-shadow(0 0 3px rgba(181, 101, 74, 0.85))" }}
    />
  );
}
