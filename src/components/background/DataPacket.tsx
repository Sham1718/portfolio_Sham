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
  fill = "#67e8f9",
}: DataPacketProps) {
  return (
    <circle
      ref={packetRef}
      cx={x}
      cy={y}
      r="3.5"
      fill={fill}
      opacity="0"
      style={{ filter: "drop-shadow(0 0 3px rgba(103, 232, 249, 0.85))" }}
    />
  );
}
