interface DataPacketProps {
  packetRef: (element: SVGCircleElement | null) => void;
  x: number;
  y: number;
}

export function DataPacket({ packetRef, x, y }: DataPacketProps) {
  return <circle ref={packetRef} cx={x} cy={y} r="3" fill="#67e8f9" opacity="0" />;
}
