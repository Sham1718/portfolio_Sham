"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { getLenis, scrollToSection } from "@/hooks/useLenis";
import { contactData } from "@/data/contact";

/** Top-level section ids, in page order — the same set useActiveSection tracks. */
const SECTION_IDS = [
  "hero",
  "about",
  "engineering",
  "projects",
  "journey",
  "tech-stack",
  "contact",
] as const;

const DISPLAY_NAMES: Record<string, string> = {
  hero: "Hero",
  about: "About",
  engineering: "Engineering",
  projects: "Projects",
  journey: "Journey",
  "tech-stack": "Tech Stack",
  contact: "Contact",
};

/** What selecting an item does. Kept as plain data so the filtered list
 *  stays render-pure; the actual dispatch happens in the event handler. */
type PaletteAction =
  | { type: "section"; id: string }
  | { type: "github" }
  | { type: "linkedin" }
  | { type: "email" };

interface PaletteItem {
  key: string;
  label: string;
  action: PaletteAction;
}

/** True when focus is inside a field the user might be typing into. */
function isEditable(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (el as HTMLElement).isContentEditable
  );
}

/**
 * Cmd/Ctrl+K command palette for quick navigation. Keyboard-only (no visible
 * trigger button): opens with Cmd+K (Mac) / Ctrl+K (elsewhere), closes with
 * Escape, backdrop click, or item selection. Styled plainly with glass-panel —
 * deliberately NOT the terminal chrome (that look is reserved for the boot
 * sequence and Contact section).
 *
 * Portals into document.body (same reason as CustomCursor/ScrollProgressRail):
 * the app sits inside BootSequence's permanently-translated wrapper, and a
 * non-none `translate` creates a containing block that would break the fixed
 * overlay. Portaling out keeps it viewport-pinned.
 */
export function CommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // The portal target (document.body) doesn't exist during SSR. Start
  // `mounted` false on BOTH server and client first render and flip it inside
  // an effect (default-then-effect, like ScrollProgressRail) so the trees
  // match during hydration. The palette is also closed by default.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // When the palette closes, return focus to whatever had it before opening
  // (preventScroll so the restore doesn't fight a subsequent Lenis scroll-to).
  // Runs on mount too, where lastFocusedRef is null — a no-op.
  useEffect(() => {
    if (open) return;
    const toRestore = lastFocusedRef.current;
    lastFocusedRef.current = null;
    toRestore?.focus({ preventScroll: true });
  }, [open]);

  // Auto-reset the inline "Copied!" confirmation ~1.5s after it appears.
  useEffect(() => {
    if (!copiedKey) return;
    const timer = setTimeout(() => setCopiedKey(null), 1500);
    return () => clearTimeout(timer);
  }, [copiedKey]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setHighlightedIndex(0);
    setCopiedKey(null);
  }, []);

  const openPalette = useCallback(() => {
    // Defensive: never hijack Cmd/Ctrl+K while the user is typing into a
    // text field (the palette's own input is handled via the open state).
    if (isEditable(document.activeElement)) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setHighlightedIndex(0);
    setCopiedKey(null);
    setOpen(true);
  }, []);

  // Global shortcuts: Cmd/Ctrl+K toggles the palette (preventDefault keeps
  // the browser's own search/address-bar shortcut from firing), Escape closes.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        if (open) close();
        else openPalette();
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, openPalette]);

  // Lock page scroll while open (restore exactly on close) and pause Lenis so
  // it doesn't keep trying to scroll against the lock.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = getLenis();
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [open]);

  // Move focus into the search input when the palette opens.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const githubUrl = contactData.links.find((l) => l.type === "github")?.href;
  const linkedinUrl = contactData.links.find((l) => l.type === "linkedin")?.href;
  const emailAddress = (
    contactData.links.find((l) => l.type === "email")?.href ?? ""
  ).replace(/^mailto:/i, "");

  /** Pure data — no closures, so filtering/rendering stays ref-free. */
  const sectionItems: PaletteItem[] = SECTION_IDS.map((id) => ({
    key: `section-${id}`,
    label: `Go to ${DISPLAY_NAMES[id]}`,
    action: { type: "section", id },
  }));

  const items: PaletteItem[] = [
    ...sectionItems,
    {
      key: "github",
      label: "Open GitHub",
      action: { type: "github" } as const,
    },
    {
      key: "linkedin",
      label: "Open LinkedIn",
      action: { type: "linkedin" } as const,
    },
    {
      key: "email",
      label: "Copy email",
      action: { type: "email" } as const,
    },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? items.filter((item) =>
        item.label.toLowerCase().includes(normalizedQuery),
      )
    : items;

  /** Runs the action for a selected item (event-handler context). */
  const runAction = (item: PaletteItem) => {
    switch (item.action.type) {
      case "section":
        scrollToSection(item.action.id);
        break;
      case "github":
        if (githubUrl) window.open(githubUrl, "_blank", "noopener,noreferrer");
        break;
      case "linkedin":
        if (linkedinUrl) {
          window.open(linkedinUrl, "_blank", "noopener,noreferrer");
        }
        break;
      case "email": {
        if (!emailAddress) break;
        navigator.clipboard
          .writeText(emailAddress)
          .then(() => setCopiedKey("email"))
          .catch(() => {
            // Clipboard unavailable (e.g. non-secure context) — stay quiet.
          });
        break;
      }
    }
  };

  // Closes first (so scroll is unlocked and focus restored) before running
  // the action, except for Copy email which keeps the palette open to show
  // its inline "Copied!" state. The close is batched, so the action runs one
  // frame later — by then React has committed the close and its cleanup
  // (overflow restored, Lenis restarted), so a Lenis scroll-to actually works.
  const selectItem = (item: PaletteItem, keepOpen = false) => {
    if (keepOpen) {
      runAction(item);
    } else {
      close();
      window.requestAnimationFrame(() => runAction(item));
    }
  };

  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const count = filtered.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (count > 0) setHighlightedIndex((i) => (i + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (count > 0) setHighlightedIndex((i) => (i - 1 + count) % count);
    } else if (e.key === "Enter") {
      // If a real button holds focus, let its native click fire instead.
      if ((e.target as HTMLElement).tagName === "BUTTON") return;
      e.preventDefault();
      const item = filtered[highlightedIndex];
      if (item) selectItem(item);
    } else if (e.key === "Tab") {
      // Trap Tab within the palette — don't let it escape to the page behind.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'input, button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = panelRef.current?.contains(active);
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="cmd-palette-overlay fixed inset-0 z-[10000] flex items-start justify-center px-4 pt-[18vh]"
      style={{
        backgroundColor: "color-mix(in srgb, var(--background) 78%, transparent)",
      }}
      onClick={close}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        className="cmd-palette-panel glass-panel w-full max-w-[520px] overflow-hidden rounded-md"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onPanelKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-border/60">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(0);
            }}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-palette-listbox"
            aria-activedescendant={
              filtered.length > 0
                ? `cmd-palette-option-${highlightedIndex}`
                : undefined
            }
            className="w-full bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted/70"
          />
        </div>

        {/* Filterable action list */}
        <div
          id="cmd-palette-listbox"
          role="listbox"
          aria-label="Commands"
          className="max-h-[42vh] overflow-y-auto py-1.5"
        >
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">
              No matches for “{query.trim()}”
            </p>
          ) : (
            filtered.map((item, index) => {
              const isHighlighted = index === highlightedIndex;
              const isCopied = item.key === copiedKey;
              return (
                <div
                  key={item.key}
                  id={`cmd-palette-option-${index}`}
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => selectItem(item, item.key === "email")}
                  className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-sm ${
                    isHighlighted
                      ? "bg-accent/15 text-accent"
                      : "text-foreground"
                  }`}
                >
                  <span>{isCopied ? "Copied!" : item.label}</span>
                  {item.key === "email" && (
                    <span className="text-[0.65rem] text-muted">
                      {isCopied ? "✓" : emailAddress}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcut hints */}
        <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[0.65rem] text-muted/80">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>

        <style>{`
          .cmd-palette-overlay {
            animation: cmd-palette-fade 0.15s ease-out;
          }
          .cmd-palette-panel {
            animation: cmd-palette-pop 0.15s ease-out;
          }
          @keyframes cmd-palette-fade {
            from { opacity: 0; }
          }
          @keyframes cmd-palette-pop {
            from { opacity: 0; transform: scale(0.96) translateY(-4px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .cmd-palette-overlay,
            .cmd-palette-panel {
              animation: none;
            }
          }
        `}</style>
      </div>
    </div>,
    document.body,
  );
}
