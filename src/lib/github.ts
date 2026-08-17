import { GITHUB_USERNAME } from "@/data/github-config";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;
const MESSAGE_MAX = 60;

export interface GithubLatestActivity {
  repo: string;
  message: string;
  when: string;
}

export interface GithubStats {
  publicRepos: number;
  followers: number;
  latestActivity: GithubLatestActivity | null;
}

/** Small local relative-time formatter ("2 days ago") — no date library. */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.floor((Date.now() - then) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function truncate(text: string, max = MESSAGE_MAX): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

/**
 * Fetches the user's GitHub profile (repo/follower counts) and their latest
 * public PushEvent (repo, most recent commit message, relative timestamp).
 * Runs server-side only, cached with Next's `revalidate` so it refreshes
 * every hour rather than on every request or frozen at build time.
 *
 * Never throws: any failure (rate limiting, network, unset username) returns
 * null, and a missing/empty events feed simply omits latestActivity while
 * still returning the profile counts.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    // Placeholder guard — don't fetch a literal "REPLACE_ME" account.
    if (!GITHUB_USERNAME || GITHUB_USERNAME === "REPLACE_ME") return null;

    const [userRes, eventsRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public`, {
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    // Profile fetch failed → nothing usable to show.
    if (!userRes.ok) return null;
    const user = (await userRes.json()) as {
      public_repos?: number;
      followers?: number;
    };

    // Events are optional: failures and empty feeds just drop the activity
    // portion while the counts still render.
    let latestActivity: GithubLatestActivity | null = null;
    if (eventsRes.ok) {
      const events = (await eventsRes.json()) as Array<{
        type?: string;
        repo?: { name?: string };
        payload?: {
          commits?: Array<{ message?: string }>;
          head?: string;
        };
        created_at?: string;
      }>;
      if (Array.isArray(events)) {
        const push = events.find((event) => event?.type === "PushEvent");
        if (push?.repo?.name) {
          const repo = push.repo.name.replace(/^[^/]+\//, "");
          const commits = push.payload?.commits;
          let message = "";
          if (Array.isArray(commits) && commits.length > 0) {
            const last = commits[commits.length - 1];
            message = truncate(last?.message ?? "");
          } else if (push.payload?.head) {
            // GitHub truncates PushEvent payloads in the public events feed
            // (the commits array is usually absent), so fall back to fetching
            // the head commit for its real message. Same hourly cache.
            const commitRes = await fetch(
              `${GITHUB_API}/repos/${push.repo.name}/commits/${push.payload.head}`,
              { next: { revalidate: REVALIDATE_SECONDS } },
            );
            if (commitRes.ok) {
              const commit = (await commitRes.json()) as {
                commit?: { message?: string };
              };
              message = truncate(commit?.commit?.message ?? "");
            }
          }
          if (message) {
            latestActivity = {
              repo,
              message,
              when: relativeTime(push.created_at ?? ""),
            };
          }
        }
      }
    }

    return {
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : 0,
      followers: typeof user.followers === "number" ? user.followers : 0,
      latestActivity,
    };
  } catch {
    return null;
  }
}
