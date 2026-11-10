import DigitalRainBackground from "@/components/DigitalRainBackground";
import HeroSection from "@/components/HeroSection";
import ArslanChatDemo from "@/components/ArslanChatDemo";
import MultiStepInquiryForm from "@/components/MultiStepInquiryForm";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import LegalLinks from "@/components/LegalLinks";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 flex flex-col overflow-x-hidden selection:bg-[#ff6b2b] selection:text-white">
      {/* Animierte Matrix-Zahlen im Hintergrund */}
      <DigitalRainBackground />

      <main className="flex-1 relative z-10">
        {/* 1. Arslan-Avatar mit Matrix-Hintergrund */}
        <HeroSection />

        {/* 2. Direkt darunter das KI-Chatfeld */}
        <ArslanChatDemo />

        {/* 3. Mehrstufiges Anfrageformular (4 Schritte) */}
        <MultiStepInquiryForm />

        {/* 4. Drei KI-Pakete */}
        <PricingSection />

        {/* 5. Kompakter FAQ-Bereich */}
        <FaqSection />
      </main>

      {/* 6. Unauffällige Links zu Impressum und Datenschutz */}
      <LegalLinks />
    </div>
  );
}
