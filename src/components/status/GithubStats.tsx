import { getGithubStats } from "@/lib/github";

/**
 * Live GitHub stats widget — the one genuinely-live status element on the
 * site. A Server Component: fetches via getGithubStats() directly (no
 * client effect needed), so the numbers are baked into the server-rendered
 * HTML and refreshed by Next's revalidate cache. Renders nothing if the
 * fetch failed or the username is still the placeholder.
 *
 * Unlike the decorative uptime clock / status log, this content is real and
 * meaningful — no aria-hidden, reads normally in document order.
 */
export async function GithubStats() {
  const stats = await getGithubStats();
  if (!stats) return null;

  return (
    <div className="glass-panel p-4 font-mono text-[0.7rem] sm:min-w-[280px]">
      <p className="mb-2.5 text-[0.65rem] font-semibold tracking-[0.16em] text-accent/70 uppercase">
        {"// GitHub Live"}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted">REPOS:</span>
          <span className="font-semibold text-foreground">{stats.publicRepos}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted">FOLLOWERS:</span>
          <span className="font-semibold text-foreground">{stats.followers}</span>
        </div>
        {stats.latestActivity && (
          <p className="border-t border-border/50 pt-2 leading-relaxed text-muted">
            Last commit —{" "}
            <span className="text-foreground">{stats.latestActivity.message}</span>{" "}
            on <span className="text-accent">{stats.latestActivity.repo}</span>
            {stats.latestActivity.when && ` · ${stats.latestActivity.when}`}
          </p>
        )}
      </div>
    </div>
  );
}
