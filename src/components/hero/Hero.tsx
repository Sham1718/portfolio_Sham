import { RoleText } from "@/components/hero/RoleText";
import { ArchitectureScene } from "@/components/background/ArchitectureScene";
import { architectures } from "@/data/architectures";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center py-20 sm:py-24"
    >
      <ArchitectureScene architecture={architectures.hero} />
      <div className="relative z-10 w-full border-y border-border/70 py-10 sm:py-14 lg:py-16">
        <p className="font-mono text-[0.7rem] font-medium tracking-[0.18em] text-accent uppercase sm:text-sm">
          System / 01
        </p>
        <p className="mt-8 text-xl font-medium tracking-[-0.02em] text-foreground sm:mt-10 sm:text-2xl">
          Hello!
        </p>
        <h1
          id="hero-name"
          className="mt-4 max-w-5xl text-[clamp(3rem,7vw,7rem)] leading-[0.98] font-semibold tracking-[-0.06em] text-foreground"
        >
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
          <a
            href="#projects"
            className="border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            View Projects
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="absolute bottom-7 right-0 hidden font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase sm:block">
        Scroll ↓
      </div>
    </section>
  );
}
