import { ArchitectureCanvas } from "@/components/background/ArchitectureCanvas";

export function SystemBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,62,78,0.2),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(103,232,249,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.07)_1px,transparent_1px)] [background-size:4rem_4rem] sm:[background-size:5rem_5rem]" />
      <ArchitectureCanvas />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(5,7,11,0.72))]" />
    </div>
  );
}
