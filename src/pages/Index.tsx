import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import Differentiators from "@/components/Differentiators";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import OfferSection from "@/components/OfferSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCtaClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCtaClick={handleCtaClick} />
      <main>
        <Hero onCtaClick={handleCtaClick} />
        <ValueProposition />
        <ProblemSection />
        <SolutionSection />
        <Differentiators />
        <ComparisonTable />
        <Testimonials />
        <OfferSection onCtaClick={handleCtaClick} />
        <FAQ />
      </main>
      <Footer />
      <LeadModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Index;
