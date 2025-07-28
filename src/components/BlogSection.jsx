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

// Icons for Blog Post Card (using simple SVGs)
const CommentIcon = ({ colorClass }) => (
  <svg className={`w-5 h-5 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.746-1.344L3 17l1.378-3.238A8.999 8.999 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM12 9H8V7h4v2zm0 3H8v-2h4v2z" clipRule="evenodd"></path>
  </svg>
);

const EyeIcon = ({ colorClass }) => (
  <svg className={`w-5 h-5 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
  </svg>
);

const ClockIcon = ({ colorClass }) => (
  <svg className={`w-5 h-5 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path>
  </svg>
);


// Reusable BlogPostCard Component
const BlogPostCard = ({ imageUrl, category, title, views, comments, readTime, onMouseEnter, onMouseLeave, isHovered, isVisible, animationDirection }) => {
  const isActive = isHovered; // Card is active only when hovered

  const cardBgClass = isActive ? 'bg-brandGreen' : 'bg-white';
  const categoryColorClass = isActive ? 'text-white' : 'text-brandGreen';
  const titleColorClass = isActive ? 'text-white' : 'text-gray-900';
  const metaColorClass = isActive ? 'text-white' : 'text-gray-600';
  const descriptionColorClass = isActive ? 'text-white' : 'text-gray-600';
  const buttonBgClass = isActive ? 'bg-white' : 'bg-brandGreen';
  const buttonTextColorClass = isActive ? 'text-brandGreen' : 'text-white';
  const iconColorClass = isActive ? 'text-white' : 'text-brandGreen'; // Icons inside meta-info

  // Animation classes for individual card (corrected to use translate-y for consistency)
  const slideInClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10'; // Always slide from bottom


  return (
    <div
      className={`flex flex-col shadow-xl rounded-xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-out
        ${cardBgClass}
        ${slideInClass}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full h-48 sm:h-64 lg:h-80 rounded-t-xl overflow-hidden"> {/* Responsive image height */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-grow"> {/* Responsive padding and added flex-grow */}
        <div className={`${categoryColorClass} text-sm sm:text-base font-semibold leading-6`}>
          {category}
        </div>
        <h3 className={`${titleColorClass} text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight sm:leading-8`}> {/* Responsive font size */}
          {title}
        </h3>
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${metaColorClass} text-sm sm:text-base font-medium leading-6`}> {/* Responsive gap */}
          <div className="flex items-center gap-1">
            <CommentIcon colorClass={iconColorClass} />
            <span>{comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <EyeIcon colorClass={iconColorClass} />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon colorClass={iconColorClass} />
            <span>{readTime}</span>
          </div>
        </div>
        <p className={`${descriptionColorClass} text-sm sm:text-base font-medium leading-6`}> {/* Responsive font size */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit suscipit egestas...
        </p>
        <button className={`px-6 py-3 sm:px-8 sm:py-4 ${buttonBgClass} rounded-full text-center shadow-md hover:opacity-90 transition-opacity mt-auto`}> {/* Responsive padding, mt-auto for sticky button */}
          <div className={`w-full text-center ${buttonTextColorClass} text-base sm:text-xl font-semibold leading-6`}>
            Read More
          </div>
        </button>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [sectionRef, sectionIsVisible] = useSectionVisibility(0.2); // Overall section visibility
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [cardVisibleStates, setCardVisibleStates] = useState(Array(3).fill(false)); // State for the 3 blog post cards
  const [hoveredCard, setHoveredCard] = useState(null); // State to track which card is hovered

  const blogPosts = [
    {
      id: 1,
      imageUrl: "https://placehold.co/388x320/87CEEB/000000?text=Farm+Crisis",
      category: "Tips",
      title: "Solving India’s Farm Labour Crisis: What We’re Learning in Nashik",
      views: "10K",
      comments: "10",
      readTime: "5 min ago",
    },
    {
      id: 2,
      imageUrl: "https://placehold.co/388x320/90EE90/000000?text=AI+in+Agri",
      category: "Insight",
      title: "5 Ways AI is Transforming Rural Labour Markets",
      views: "15K",
      comments: "50",
      readTime: "7 min ago",
    },
    {
      id: 3,
      imageUrl: "https://placehold.co/388x320/FFB6C1/000000?text=Future+Workforce",
      category: "Insight",
      title: "The Future of Bharat’s Agriculture Workforce",
      views: "20K",
      comments: "100",
      readTime: "10 min ago",
    },
  ];

  useEffect(() => {
    if (sectionIsVisible) {
      const timers = [];
      timers.push(setTimeout(() => setHeadlineVisible(true), 100));

      // Stagger individual cards
      blogPosts.forEach((_, index) => {
        timers.push(setTimeout(() => {
          setCardVisibleStates(prev => {
            const newStates = [...prev];
            newStates[index] = true;
            return newStates;
          });
        }, 300 + index * 150)); // Stagger each card by 150ms
      });

      return () => timers.forEach(timer => clearTimeout(timer));
    } else {
      // Hide all elements when the section scrolls out of view
      setHeadlineVisible(false);
      setCardVisibleStates(Array(blogPosts.length).fill(false)); // Reset all cards to hidden
    }
  }, [sectionIsVisible, blogPosts.length]);

  // Common animation classes for headline (slide up/down)
  const staggeredAnimationClasses = 'transition-all duration-700 ease-out';
  const hiddenStateClassesY = 'opacity-0 translate-y-10';
  const visibleStateClassesY = 'opacity-100 translate-y-0';


  return (
    <section
      ref={sectionRef} // Attach ref for overall section visibility
      className={`bg-white py-16 px-4 sm:px-6 lg:px-24`}
    >
      {/* Headline and Subheading */}
      <div className={`max-w-3xl mx-auto flex flex-col justify-center items-center gap-4 sm:gap-6 mb-12 sm:mb-16 text-center
        ${staggeredAnimationClasses}
        ${headlineVisible ? visibleStateClassesY : hiddenStateClassesY}
      `}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
          Blog And <span className="text-brandGreen">Articles</span>
        </h2>
        <p className="text-base font-medium leading-6 text-gray-600 max-w-full lg:max-w-none">
          Stay updated with insights and trends in the agriculture workforce sector.
        </p>
      </div>

      {/* Blog Post Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"> {/* Added items-stretch */}
        {blogPosts.map((post, index) => (
          <BlogPostCard
            key={post.id}
            imageUrl={post.imageUrl}
            category={post.category}
            title={post.title}
            views={post.views}
            comments={post.comments}
            readTime={post.readTime}
            isHovered={hoveredCard === post.id}
            onMouseEnter={() => setHoveredCard(post.id)}
            onMouseLeave={() => setHoveredCard(null)}
            // Animation props for individual card
            isVisible={cardVisibleStates[index]}
            animationDirection={index % 2 === 0 ? 'left' : 'right'} // Alternate direction for cards
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;