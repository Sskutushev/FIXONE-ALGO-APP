import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Animated = ({ children, animation = 'fadeInUp', delay = 0, style = {}, className, ...props }) => {
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClasses = {
      fadeInUp: 'opacity-0 translate-y-8',
      fadeInLeft: 'opacity-0 -translate-x-8',
      fadeInRight: 'opacity-0 translate-x-8',
  };

  const visibleClasses = 'opacity-100 translate-y-0 translate-x-0';

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${className || ''} ${isVisible ? visibleClasses : animationClasses[animation]}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Animated;
