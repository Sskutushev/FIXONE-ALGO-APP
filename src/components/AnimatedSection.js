import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AnimatedSection = ({ children }) => {
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true, // This is handled by the hook's logic to unobserve
  });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;