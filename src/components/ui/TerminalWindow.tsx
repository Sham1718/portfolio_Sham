import type { ReactNode } from "react";

interface TerminalWindowProps {
  /** Title-bar label, e.g. "shyam@portfolio:~" */
  label: string;
  /** Content area below the title bar */
  children: ReactNode;
  /**
   * Window width. "sm" (default) is the boot splash — min(85vw, 720px),
   * compact but not cramped. "lg" is the wide contact pane — min(90vw,
   * 880px). Both cap at 85/90vw so they never overflow small screens.
   */
  size?: "sm" | "lg";
}

/**
 * Shared terminal-window chrome, extracted from BootSequence so every
 * terminal on the site (boot overlay, Contact section) is visually
 * identical instead of two separately-maintained copies.
 */
export function TerminalWindow({
  label,
  children,
  size = "sm",
}: TerminalWindowProps) {
  const isLg = size === "lg";

  return (
    <div
      className={
        isLg
          ? "mx-auto w-full max-w-[min(90vw,880px)]"
          : "mx-auto w-full max-w-[min(85vw,720px)]"
      }
    >
      <div className="overflow-hidden rounded-md border border-border bg-surface shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* Title bar: window dots + process label. Chrome scales with the
            size so the sm splash doesn't read as lg content squeezed into a
            small frame (and lg keeps its verified proportions). */}
        <div
          className={`relative flex items-center border-b border-border bg-surface-elevated ${
            isLg ? "gap-1.5 px-4 py-2.5" : "gap-2 px-5 py-3"
          }`}
        >
          <span
            aria-hidden="true"
            className={`rounded-full bg-muted/50 ${
              isLg ? "size-2.5" : "size-3"
            }`}
          />
          <span
            aria-hidden="true"
            className={`rounded-full bg-muted/50 ${
              isLg ? "size-2.5" : "size-3"
            }`}
          />
          <span
            aria-hidden="true"
            className={`rounded-full bg-muted/50 ${
              isLg ? "size-2.5" : "size-3"
            }`}
          />
          <span
            className={`absolute left-1/2 -translate-x-1/2 font-mono tracking-wide text-muted ${
              isLg ? "text-[0.65rem]" : "text-[0.7rem]"
            }`}
          >
            {label}
          </span>
        </div>
        {/* Content area: subtle inset shadow so the screen reads recessed
            behind the title bar (the outer drop shadow is untouched). */}
        <div className="shadow-[inset_0_0_24px_rgba(0,0,0,0.25)]">
          {children}
        </div>
      </div>
    </div>
  );
}
