import { techIcons } from "@/data/tech-icons";
import { techStackData } from "@/data/tech-stack";

/** Radius (px) of the 3D ring. 25 items → ~70px of arc per node. */
const ORBIT_RADIUS = 280;

/**
 * Fallback badge label for any tech missing from the lookup (defensive —
 * every name in tech-stack.ts is currently covered in tech-icons.ts).
 */
const fallbackAbbreviation = (name: string) =>
  name.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase();

const techItems = techStackData.categories.flatMap((cat) =>
  cat.technologies.map((tech) => ({
    name: tech.name,
    role: tech.role,
    category: cat.category,
  })),
);

const itemCount = techItems.length;

function TechGlyph({ name }: { name: string }) {
  const entry = techIcons[name];
  if (entry?.icon) {
    return <entry.icon aria-hidden="true" />;
  }
  return (
    <span aria-hidden="true" className="tech-orbit-badge">
      {entry?.badge ?? fallbackAbbreviation(name)}
    </span>
  );
}

export function TechOrbit() {
  return (
    <div className="tech-orbit">
      {/* Desktop: continuously rotating 3D ring (hidden below sm) */}
      <div className="tech-orbit-scene">
        <div className="tech-orbit-ring">
          {techItems.map((item, i) => (
            <div
              key={item.name}
              className="tech-orbit-node"
              style={{
                transform: `rotateY(${(360 / itemCount) * i}deg) translateZ(${ORBIT_RADIUS}px)`,
              }}
            >
              <div
                className="tech-orbit-cell"
                role="img"
                tabIndex={0}
                aria-label={`${item.name} — ${item.category}`}
              >
                <TechGlyph name={item.name} />
                <span aria-hidden="true" className="tech-orbit-tooltip">
                  {item.name} <em>— {item.category}</em>
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 hidden text-center font-mono text-[0.65rem] tracking-[0.16em] text-muted sm:block">
          {"// "}
          {itemCount} technologies · hover to pause
        </p>
      </div>

      {/* Mobile fallback: static flex-wrap grid of the same icons/badges */}
      <div className="tech-orbit-grid">
        {techItems.map((item) => (
          <div key={item.name} className="tech-orbit-grid-item">
            <TechGlyph name={item.name} />
            <span className="tech-orbit-grid-label">{item.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .tech-orbit {
          width: 100%;
        }

        /* 3D scene + ring (desktop) */
        .tech-orbit-scene {
          display: none;
          height: 240px;
          perspective: 1000px;
        }

        .tech-orbit-ring {
          position: absolute;
          inset: 50% auto auto 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          animation: tech-orbit-spin 40s linear infinite;
        }

        .tech-orbit-ring:hover {
          animation-play-state: paused;
        }

        .tech-orbit-node {
          position: absolute;
          top: 0;
          left: 0;
          width: 56px;
          height: 56px;
          margin: -28px 0 0 -28px;
          backface-visibility: hidden;
        }

        .tech-orbit-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: var(--accent);
          opacity: 0.55;
          cursor: pointer;
          outline: none;
          transition: opacity 0.2s ease;
        }

        .tech-orbit-cell:hover,
        .tech-orbit-cell:focus-visible {
          opacity: 1;
        }

        .tech-orbit-cell:hover svg,
        .tech-orbit-cell:focus-visible svg {
          transform: scale(1.15);
        }

        .tech-orbit-cell svg {
          width: 48px;
          height: 48px;
          transition: transform 0.2s ease;
        }

        /* Fallback badge (no verified icon) — height matches the icon size,
           width sizes to the label so T5 and TextRank stay consistent */
        .tech-orbit-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          height: 48px;
          padding: 0 10px;
          border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
          background: color-mix(in srgb, var(--surface) 55%, transparent);
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          white-space: nowrap;
          color: var(--accent);
        }

        /* Hover tooltip */
        .tech-orbit-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          white-space: nowrap;
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--surface) 92%, transparent);
          border-radius: 3px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          color: var(--foreground);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }

        .tech-orbit-tooltip em {
          font-style: normal;
          color: var(--muted);
        }

        .tech-orbit-cell:hover .tech-orbit-tooltip,
        .tech-orbit-cell:focus-visible .tech-orbit-tooltip {
          opacity: 1;
        }

        /* Mobile fallback: static flex-wrap grid */
        .tech-orbit-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.25rem 1.5rem;
        }

        .tech-orbit-grid-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          width: 5.5rem;
          color: var(--accent);
        }

        .tech-orbit-grid-item svg {
          width: 36px;
          height: 36px;
        }

        /* Grid badges stay compact and match the smaller grid icons */
        .tech-orbit-grid-item .tech-orbit-badge {
          min-width: 36px;
          height: 36px;
          padding: 0 8px;
        }

        .tech-orbit-grid-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-align: center;
          line-height: 1.15;
        }

        @keyframes tech-orbit-spin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        /* sm breakpoint (40rem) — swap grid for the 3D ring */
        @media (min-width: 40rem) {
          .tech-orbit-scene {
            display: block;
          }

          .tech-orbit-grid {
            display: none;
          }
        }

        /* Respect reduced motion: static, evenly-distributed ring */
        @media (prefers-reduced-motion: reduce) {
          .tech-orbit-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
