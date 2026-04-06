import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1920',
    title: 'FACILITY MANAGEMENT',
    subtitle: 'Globally Recognized Certifications'
  },
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1920',
    title: 'CONSTRUCTION MANAGEMENT',
    subtitle: 'Master Construction Project Planning & Execution'
  },
  {
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&q=80&w=1920',
    title: 'CONSTRUCTION MANAGEMENT',
    subtitle: 'Professional Facility Management Training'
  }
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 40); // ~1.5s for average length text
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-sans drop-shadow-lg leading-snug text-center max-w-3xl">
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[3px] h-[0.8em] bg-white ml-1 align-baseline"
      />
    </h2>
  );
};

const quotes = [
  "Build your career with industry-recognized professional certifications.",
  "Empowering professionals in construction and facility management.",
  "Professional training designed for real-world project success."
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%'
    }),
    center: {
      x: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%'
    })
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -10000) {
      nextSlide();
    } else if (swipe > 10000) {
      prevSlide();
    }
  };

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] bg-[#f8f9fa] pt-20 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Side - Content */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-16 relative z-10 bg-white">
        <div className="max-w-xl w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ff4f01] mb-8 leading-[1.15] font-heading tracking-tight"
          >
            Master the <span className="text-black">Built</span> Environment <span className="text-black">Skills</span>
          </motion.h1>

          <div className="h-24 md:h-20 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex % quotes.length}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-black font-semibold leading-relaxed font-sans"
              >
                "{quotes[currentIndex % quotes.length]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/courses"
              className="bg-[#ff4f01] text-white px-8 py-4 rounded-xl text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#131d3b] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-[#131d3b] text-[#131d3b] px-8 py-4 rounded-xl text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#131d3b] hover:text-white transition-colors duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Slider */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden bg-gray-100">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.8, ease: "easeInOut" }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
              <TypewriterText text={slides[currentIndex].subtitle} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 text-[#131d3b] shadow-lg flex items-center justify-center hover:bg-[#ff4f01] hover:text-white transition-colors duration-300 opacity-0 lg:group-hover:opacity-100 lg:hover:opacity-100 backdrop-blur-sm z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 text-[#131d3b] shadow-lg flex items-center justify-center hover:bg-[#ff4f01] hover:text-white transition-colors duration-300 opacity-0 lg:group-hover:opacity-100 lg:hover:opacity-100 backdrop-blur-sm z-20"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-[#ff4f01]'
                  : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
