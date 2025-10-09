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
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustCounter from "@/components/TrustCounter";
import PaymentDemo from "@/components/PaymentDemo";
import VideoSection from "@/components/VideoSection";
import ExpandedUseCases from "@/components/ExpandedUseCases";
import NewsletterSignup from "@/components/NewsletterSignup";
import CalendarEmbed from "@/components/CalendarEmbed";
import BlockchainTransparency from "@/components/BlockchainTransparency";

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
        <TrustCounter />
        <ValueProposition />
        <VideoSection />
        <PaymentDemo />
        <ProblemSection />
        <SolutionSection />
        <ExpandedUseCases />
        <Differentiators />
        <BlockchainTransparency />
        <ComparisonTable />
        <Testimonials />
        <NewsletterSignup />
        <CalendarEmbed />
        <OfferSection onCtaClick={handleCtaClick} />
        <FAQ />
      </main>
      <Footer />
      <LeadModal isOpen={isModalOpen} onClose={handleModalClose} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
