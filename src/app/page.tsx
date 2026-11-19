import DigitalRainBackground from "@/components/DigitalRainBackground";
import HeroSection from "@/components/HeroSection";
import ArslanChatDemo from "@/components/ArslanChatDemo";
import PositioningSection from "@/components/PositioningSection";
import PricingSection from "@/components/PricingSection";
import MultiStepInquiryForm from "@/components/MultiStepInquiryForm";
import FaqSection from "@/components/FaqSection";
import LegalLinks from "@/components/LegalLinks";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 flex flex-col overflow-x-hidden selection:bg-[#3ECF8E] selection:text-black font-mono">
      {/* Animierte Matrix-Zahlen im Hintergrund in Supabase-Grün (#3ECF8E) */}
      <DigitalRainBackground />

      <main className="flex-1 relative z-10">
        {/* 1. Alp Arsalan Avatar mit Bereitschaftsanzeige */}
        <HeroSection />

        {/* 2. Chatfenster direkt unter dem Avatar und der Bereitschaftsanzeige */}
        <ArslanChatDemo />

        {/* 3. Positionierung & zentrale Verkaufsargumente */}
        <PositioningSection />

        {/* 4. Leistungspakete (vor dem Wartelistenformular positioniert) */}
        <PricingSection />

        {/* 5. Wartelisten-Formular (4 Schritte mit Paketauswahl & Integrationsfeldern) */}
        <MultiStepInquiryForm />

        {/* 6. FAQ-Bereich mit allen 10 Fragen */}
        <FaqSection />
      </main>

      {/* 7. Footer mit Links zu Impressum und Datenschutz */}
      <LegalLinks />
    </div>
  );
}
