import React, { useState, useEffect, useRef } from 'react';

// Reusable custom hook for scroll-triggered visibility (copied from previous components)
function useSectionVisibility(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
}

const ContactSection = () => {
  const [sectionRef, sectionIsVisible] = useSectionVisibility(0.2); // Overall section visibility
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [mainContentVisible, setMainContentVisible] = useState(false); // For the image & form container

  useEffect(() => {
    if (sectionIsVisible) {
      const timers = [];
      timers.push(setTimeout(() => setHeadlineVisible(true), 100));
      timers.push(setTimeout(() => setMainContentVisible(true), 300)); // Main content appears after headline

      return () => timers.forEach(timer => clearTimeout(timer));
    } else {
      // Hide all elements when the section scrolls out of view
      setHeadlineVisible(false);
      setMainContentVisible(false);
    }
  }, [sectionIsVisible]);

  // Common animation classes for headline (slide up/down)
  const staggeredAnimationClasses = 'transition-all duration-700 ease-out';
  const hiddenStateClassesY = 'opacity-0 translate-y-10';
  const visibleStateClassesY = 'opacity-100 translate-y-0';

  // Animation classes for main content (slide up/down, or from side if desired)
  const hiddenStateClassesMainContent = 'opacity-0 translate-y-10'; // Using Y for simplicity, can be X
  const visibleStateClassesMainContent = 'opacity-100 translate-y-0';


  return (
    <section
      ref={sectionRef} // Attach ref for overall section visibility
      className={`bg-white py-16 px-4 sm:px-6 lg:px-24`}
    >
      {/* Headline and Subheading */}
      <div className={`max-w-4xl mx-auto flex flex-col justify-center items-center gap-4 sm:gap-6 mb-12 sm:mb-16 text-center
        ${staggeredAnimationClasses}
        ${headlineVisible ? visibleStateClassesY : hiddenStateClassesY}
      `}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
          <span className="text-brandGreen">Contact</span> Us
        </h2>
        <p className="text-base font-medium leading-6 text-gray-600 max-w-full lg:max-w-none">
          Looking for skilled farm labour or want to partner with us? Fill out this form and our team will reach out within 24 hours.
        </p>
      </div>

      {/* Main container for image and form with hover effect */}
      <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row shadow-xl rounded-xl overflow-hidden
                  transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl
                  ${staggeredAnimationClasses}
                  ${mainContentVisible ? visibleStateClassesMainContent : hiddenStateClassesMainContent}
      `}>
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 h-64 sm:h-96 lg:h-auto bg-gray-600 relative overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex-1">
          <img
            src="https://placehold.co/897x560"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 bg-brandGreen rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none flex flex-col justify-start items-start gap-6 sm:gap-10 flex-1">
          <form className="w-full flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <label htmlFor="fullName" className="text-white text-base sm:text-xl font-semibold leading-6">Full name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className="w-full p-3 sm:p-4 rounded-full border border-white bg-transparent text-white placeholder-white outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <label htmlFor="email" className="text-white text-base sm:text-xl font-semibold leading-6">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 sm:p-4 rounded-full border border-white bg-transparent text-white placeholder-white outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <label htmlFor="message" className="text-white text-base sm:text-xl font-semibold leading-6">Message</label>
              <textarea
                id="message"
                placeholder="Enter your message"
                rows="4"
                className="w-full p-3 sm:p-4 rounded-xl border border-white bg-transparent text-white placeholder-white outline-none focus:ring-2 focus:ring-white resize-y text-sm sm:text-base
                           focus:bg-white focus:text-gray-900"
              ></textarea>
            </div>
            <button type="submit" className="w-full px-8 py-4 sm:px-10 sm:py-6 bg-white rounded-full text-brandGreen text-base sm:text-xl font-semibold leading-6 text-center mt-4 sm:mt-6 shadow-md hover:bg-gray-100 transition-colors duration-300 hover:scale-105">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
