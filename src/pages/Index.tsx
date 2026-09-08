import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionGuide from "@/components/SectionGuide";
import MvpShowcase from "@/components/MvpShowcase";
import TrustCounter from "@/components/TrustCounter";
import ValueProposition from "@/components/ValueProposition";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import PaymentDemo from "@/components/PaymentDemo";
import ExpandedUseCases from "@/components/ExpandedUseCases";
import Differentiators from "@/components/Differentiators";
import ComparisonTable from "@/components/ComparisonTable";
import OfferSection from "@/components/OfferSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCtaClick={() => setIsModalOpen(true)} />
      <SectionGuide />
      <main>
        <Hero onCtaClick={() => setIsModalOpen(true)} />
        <MvpShowcase />
        <TrustCounter />
        <ValueProposition />
        <ProblemSection />
        <SolutionSection />
        <PaymentDemo />
        <ExpandedUseCases />
        <Differentiators />
        <ComparisonTable />
        <OfferSection onCtaClick={() => setIsModalOpen(true)} />
        <FAQ />
      </main>
      <Footer />
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
