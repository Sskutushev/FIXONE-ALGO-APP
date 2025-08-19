import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AnimatedSection = ({ children, animationClass }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={ref} className={`animate-on-scroll ${animationClass} ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
