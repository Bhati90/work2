// App.js (or your main layout file)
import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import WhyChooseSection from './components/WhyChooseSection/WhyChooseUsSection';
import ServiceSection from './components/ServiceSection';
import PricingSection from './components/PricingSecction';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContentSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ServiceSection />
      <PricingSection />
      <WhyChooseSection/>
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
