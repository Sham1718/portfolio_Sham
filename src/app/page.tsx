import { BootSequence } from "@/components/boot/BootSequence";
import { Hero } from "@/components/hero/Hero";
import { ScrollArchitectureController } from "@/components/scroll/ScrollArchitectureController";
import { ArchitectureTestSections } from "@/components/sections/ArchitectureTestSections";

export default function Home() {
  return (
    <BootSequence>
      <ScrollArchitectureController>
        <Hero />
        <ArchitectureTestSections />
      </ScrollArchitectureController>
    </BootSequence>
  );
}
