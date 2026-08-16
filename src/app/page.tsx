import { BootSequence } from "@/components/boot/BootSequence";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Engineering } from "@/components/sections/Engineering";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { ScrollArchitectureController } from "@/components/scroll/ScrollArchitectureController";

export default function Home() {
  return (
    <BootSequence>
      <ScrollArchitectureController>
        <Hero />
        <About />
        <Engineering />
        <Projects />
        <Journey />
        <TechStack />
        <Contact />
      </ScrollArchitectureController>
    </BootSequence>
  );
}
