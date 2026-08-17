import { StatusLogStrip } from "@/components/status/StatusLogStrip";
import { UptimeClock } from "@/components/status/UptimeClock";

/**
 * Shared container for the two small "system status" details — the uptime
 * clock and the decorative request-log strip. They're meant to read as two
 * lines of the same running-system status panel, not separate elements.
 * Pure composition; both children are client components.
 */
export function SystemStatusPanel() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <UptimeClock />
      <StatusLogStrip />
    </div>
  );
}
