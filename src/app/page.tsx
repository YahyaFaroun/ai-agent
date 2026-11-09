"use client";

import { useState } from "react";
import DigitalRainBackground from "@/components/DigitalRainBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import ArslanChatDemo from "@/components/ArslanChatDemo";
import WaitlistSection from "@/components/WaitlistSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string>("BUSINESS");

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 flex flex-col overflow-x-hidden selection:bg-[#ff6b2b] selection:text-white">
      {/* Background Matrix Falling Numbers Effect */}
      <DigitalRainBackground />

      {/* Main Navigation */}
      <Navbar />

      <main className="flex-1 relative z-10">
        {/* 1. Hero Section with Prominent Zinc Avatar Arslan */}
        <HeroSection />

        {/* 2. Vorteile (4 Key Advantages) */}
        <AdvantagesSection />

        {/* 3. So funktioniert es (3 Steps) */}
        <HowItWorksSection />

        {/* 4. Unsere KI-Pakete (Pricing: Starter, Business, Enterprise) */}
        <PricingSection onSelectPackage={(pkg) => setSelectedPackage(pkg)} />

        {/* 5. Arslan – Dein KI-Berater (Demo Chat Interface) */}
        <ArslanChatDemo />

        {/* 6. Warteliste (Formular mit DSGVO-Einwilligung) */}
        <WaitlistSection
          selectedPackage={selectedPackage}
          onPackageChange={(pkg) => setSelectedPackage(pkg)}
        />

        {/* 7. FAQ (Häufige Fragen) */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
