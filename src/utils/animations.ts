
import { useEffect, useState } from 'react';

// Animation hook for elements entering the viewport
export function useAnimateOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-enter-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    const elements = document.querySelectorAll('.animate-enter');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

// Page transition hook
export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const pageExit = (callback: () => void) => {
    setIsTransitioning(true);
    document.body.classList.add('animate-fade-out');
    
    setTimeout(() => {
      callback();
      document.body.classList.remove('animate-fade-out');
      setIsTransitioning(false);
    }, 300);
  };
  
  return { pageExit, isTransitioning };
}

// Simple animation for elements (replacement for framer-motion)
export function getAnimationStyles(options: {
  initial?: { opacity?: number; y?: number; x?: number; scale?: number };
  animate?: { opacity?: number; y?: number; x?: number; scale?: number };
  transition?: { duration?: number; delay?: number };
}) {
  const { initial, animate, transition } = options;
  
  return {
    style: {
      opacity: animate?.opacity ?? 1,
      transform: `translate(${animate?.x ?? 0}px, ${animate?.y ?? 0}px) scale(${animate?.scale ?? 1})`,
      transition: `opacity ${transition?.duration ?? 0.3}s, transform ${transition?.duration ?? 0.3}s`,
      transitionDelay: transition?.delay ? `${transition.delay}s` : '0s'
    }
  };
}
