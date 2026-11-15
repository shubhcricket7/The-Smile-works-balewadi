import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { DentistSection } from './components/DentistSection';
import { SmileGallerySection } from './components/SmileGallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingUtilities } from './components/FloatingUtilities';
import { CLINIC_CONFIG } from './config/clinicConfig';

export default function App() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    CLINIC_CONFIG.treatments[0].name
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookTreatment = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    scrollToSection('appointment');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAF9F5] text-[#252B2D]">
        <Navbar onBookClick={() => scrollToSection('appointment')} />

        <main>
          <Hero
            onBookClick={() => scrollToSection('appointment')}
            onExploreClick={() => scrollToSection('treatments')}
          />
          <AboutSection />
          <TreatmentsSection onBookTreatment={handleBookTreatment} />
          <WhyChooseUsSection />
          <DentistSection />
          <SmileGallerySection />
          <TestimonialsSection />
          <AppointmentSection preselectedTreatment={selectedTreatment} />
          <FaqSection />
          <LocationSection />
        </main>

        <Footer onSelectTreatment={handleBookTreatment} />
        <FloatingUtilities onBookClick={() => scrollToSection('appointment')} />
      </div>
    </MotionConfig>
  );
}
