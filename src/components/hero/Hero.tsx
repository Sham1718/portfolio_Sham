import { RoleText } from "@/components/hero/RoleText";

export function Hero() {
  return (
    <section id="hero" className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20 sm:py-24">
      <div className="w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        <p className="font-mono text-[0.7rem] font-medium tracking-[0.18em] text-accent uppercase sm:text-sm">
          System / 01
        </p>
        <p className="mt-8 text-xl font-medium tracking-[-0.02em] text-foreground sm:mt-10 sm:text-2xl">
          Hello!
        </p>
        <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7vw,7rem)] leading-[0.98] font-semibold tracking-[-0.06em] text-foreground">
          I am Shyam Bharaskar
        </h1>
        <div className="mt-8 sm:mt-10">
          <RoleText />
        </div>
        <p className="mt-8 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          Computer Engineering student focused on backend development, API
          design, security, databases, and scalable systems.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            title="Projects will be available in a later phase"
            className="border border-accent/70 bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          >
            View Projects
          </button>
          <button
            type="button"
            disabled
            title="GitHub URL has not been provided"
            className="border border-border bg-transparent px-5 py-3 text-sm font-medium text-muted transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          >
            GitHub
          </button>
        </div>
      </div>
      <div className="absolute bottom-7 right-0 hidden font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase sm:block">
        Scroll ↓
      </div>
    </section>
  );
}
