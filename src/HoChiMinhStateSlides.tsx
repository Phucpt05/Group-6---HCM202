import React, { useCallback, useMemo, useState } from "react";
import { FloatingChat } from "./components/chat/FloatingChat";
import { SourceProofModal } from "./components/chat/SourceProofModal";
import { ContentSection } from "./components/content/ContentSection";
import { ContentIndex } from "./components/home/ContentIndex";
import { ApplicationSection } from "./components/home/ApplicationSection";
import { HeroSection } from "./components/home/HeroSection";
import { OverviewSection } from "./components/home/OverviewSection";
import { TimelineSection } from "./components/home/TimelineSection";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { SectionProgress } from "./components/layout/SectionProgress";
import { SideSectionIndicator } from "./components/layout/SideSectionIndicator";
import { ReviewSection } from "./components/review/ReviewSection";
import { KnowledgeSegment } from "./data/hcm202KnowledgeBase";
import { LEARNING_SECTIONS, PRIMARY_NAV } from "./data/learningStructure";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollProgress } from "./hooks/useScrollProgress";

interface SourceState {
  page: number;
  title: string;
  quote?: string;
}

export default function HoChiMinhStateSlides() {
  const [source, setSource] = useState<SourceState | null>(null);
  const observedSections = useMemo(
    () => [...PRIMARY_NAV.map((item) => item.id), ...LEARNING_SECTIONS.map((item) => item.id)],
    []
  );
  const activeSection = useActiveSection(observedSections);
  const scrollProgress = useScrollProgress();
  const navigationSection = LEARNING_SECTIONS.some((section) => section.id === activeSection) ? "noi-dung" : activeSection;

  const openSource = useCallback((segment: KnowledgeSegment) => {
    setSource({ page: segment.page, title: segment.title, quote: segment.keyQuotes[0] });
  }, []);

  const navigateSource = useCallback((delta: number) => {
    setSource((current) => current ? { ...current, page: Math.min(164, Math.max(142, current.page + delta)) } : current);
  }, []);

  return (
    <div className="site-shell">
      <SectionProgress progress={scrollProgress} />
      <Header activeSection={navigationSection} />
      <SideSectionIndicator activeSection={activeSection} />
      <main>
        <HeroSection />
        <OverviewSection />
        <ContentIndex />
        {LEARNING_SECTIONS.map((section) => <ContentSection key={section.id} config={section} onOpenSource={openSource} />)}
        <ApplicationSection onOpenSource={openSource} />
        <TimelineSection onOpenSource={openSource} />
        <ReviewSection />
      </main>
      <Footer />
      <FloatingChat onOpenSource={openSource} />
      <SourceProofModal
        isOpen={Boolean(source)}
        pageNumber={source?.page ?? null}
        title={source?.title}
        quoteSnippet={source?.quote}
        onClose={() => setSource(null)}
        onNavigatePage={navigateSource}
      />
    </div>
  );
}
