import React, { useState, useEffect, MouseEvent, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Play } from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  location: string;
  country: string;
  description: string;
  image: string;
  bgImage: string;
}

type ScreenType = "mobile" | "tablet" | "desktop";

const AnimatedSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenType, setScreenType] = useState<ScreenType>("desktop");
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slideStripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const currentDragX = useRef<number>(0);

  const DRAG_THRESHOLD = 50;

  useEffect(() => {
    const checkScreenType = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenType("mobile");
      else if (width < 1024) setScreenType("tablet");
      else setScreenType("desktop");
    };
    checkScreenType();
    window.addEventListener("resize", checkScreenType);
    return () => window.removeEventListener("resize", checkScreenType);
  }, []);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Live in Harmony with Modern Luxury",
      location: "MAJORCA",
      country: "North Coast",
      description:
        "Discover communities designed to elevate your lifestyle with innovative architecture and sustainable elegance.",
      image: "/img/image1.jpg",
      bgImage: "/img/image1.jpg",
    },
    {
      id: 2,
      title: "Where Urban Sophistication Meets Nature",
      location: "Taba",
      country: "Town in Egypt",
      description:
        "At Vanguard Development, we create vibrant spaces that balance comfort, design, and environmental responsibility.",
      image: "/img/image2.jpg",
      bgImage: "/img/image2.jpg",
    },
    {
      id: 3,
      title: "Redefining Luxury Through Nature",
      location: "Midi View Resort",
      country: "Marsa Matruh",
      description:
        "Explore refined living where modern design meets eco-conscious elegance in exclusive communities.",
      image: "/img/image3.jpg",
      bgImage: "/img/image3.jpg",
    },
    {
      id: 4,
      title: "Eco-Luxury Living in the Heart of Nature",
      location: "Costa",
      country: "Egypt",
      description:
        "Immerse yourself in tranquil luxury surrounded by lush landscapes and natural serenity.",
      image: "/img/image4.jpg",
      bgImage: "/img/image4.jpg",
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const handleMouseEnter = () => {
    if (!isDragging.current) setIsAutoPlay(false);
  };
  const handleMouseLeave = () => {
    if (!isDragging.current) setIsAutoPlay(true);
  };

  const handleArrowOrDotClick = (
    newSlideIndex: number,
    event?: MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    if (event) event.stopPropagation();
    setIsAutoPlay(false);
    setCurrentSlide(newSlideIndex);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
    handleArrowOrDotClick((currentSlide + 1) % slides.length, event);
  };

  const handlePrevClick = (event: MouseEvent<HTMLButtonElement>) => {
    handleArrowOrDotClick(
      (currentSlide - 1 + slides.length) % slides.length,
      event,
    );
  };

  const handleSlideCardClick = (
    index: number,
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      isDragging.current &&
      Math.abs(currentDragX.current - dragStartX.current) > 5
    )
      return;
    if (index !== currentSlide) {
      handleArrowOrDotClick(index, event);
    }
  };

  const handleDragStart = (
    event: MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if ("button" in event && event.button !== 0) return;
    isDragging.current = true;
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    dragStartX.current = clientX;
    currentDragX.current = clientX;
    setIsAutoPlay(false);
    if (slideStripRef.current) {
      slideStripRef.current.style.cursor = "grabbing";
    }
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);
    window.addEventListener("mouseleave", handleDragEnd);
  };

  const handleDragMove = (
    event: globalThis.MouseEvent | globalThis.TouchEvent,
  ) => {
    if (!isDragging.current) return;
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    currentDragX.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("touchmove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchend", handleDragEnd);
    window.removeEventListener("mouseleave", handleDragEnd);

    if (slideStripRef.current) {
      slideStripRef.current.style.cursor = "grab";
    }

    const diffX = currentDragX.current - dragStartX.current;
    if (Math.abs(diffX) > DRAG_THRESHOLD) {
      if (diffX < 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    isDragging.current = false;
    dragStartX.current = 0;
    currentDragX.current = 0;
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  // =================================================================================
  // --- START: التعديلات الرئيسية هنا ---
  // =================================================================================
  const getSlideDynamicStyle = (index: number) => {
    const offset = index - currentSlide;
    const isActive = index === currentSlide;

    // --- تعديل: إخفاء الكروت البعيدة بشكل أكثر سلاسة ---
    // بدلاً من إظهار كرت واحد فقط على كل جانب، يمكننا إخفاء الكروت التي تبتعد كثيراً
    const MAX_VISIBLE_SIDE_SLIDES = 1;
    if (Math.abs(offset) > MAX_VISIBLE_SIDE_SLIDES) {
      return {
        transform: `translateX(${offset * 100}px) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as "none",
        transition: "transform 0.7s ease-out, opacity 0.5s ease-out",
      };
    }

    let translateXValue: number,
      translateZValue: string,
      rotateYValue: number,
      scaleValue: number,
      finalOpacity: number;

    // --- تعديل: قيم جديدة للمسافات والأحجام لتكون أكثر توازناً ---
    if (isActive) {
      translateXValue = 0;
      translateZValue = "0px";
      rotateYValue = 0;
      scaleValue = 1;
      finalOpacity = 1;
    } else {
      // For side slides (offset is -1 or 1)
      switch (screenType) {
        case "mobile":
          translateXValue = offset * 90; // مسافة أفقية
          translateZValue = "-50px"; // عمق (للتأثير ثلاثي الأبعاد)
          rotateYValue = -offset * 15; // دوران
          scaleValue = 0.75; // حجم
          finalOpacity = 0.7; // شفافية
          break;
        case "tablet":
          translateXValue = offset * 110;
          translateZValue = "-80px";
          rotateYValue = -offset * 15;
          scaleValue = 0.8;
          finalOpacity = 0.65;
          break;
        default: // desktop
          translateXValue = offset * 145;
          translateZValue = "-120px";
          rotateYValue = -offset * 15;
          scaleValue = 0.8;
          finalOpacity = 0.6;
          break;
      }
    }

    // --- تعديل: منطق التوسيط عند الأطراف ---
    // هذا المنطق يهدف إلى دفع مجموعة الكروت قليلاً لتبدو في المنتصف
    // عندما تكون عند الشريحة الأولى أو الأخيرة
    let centeringAdjustment = 0;
    if (slides.length > 2) {
      // لا حاجة للتعديل إذا كان هناك كرتان فقط
      const isFirstSlideActive = currentSlide === 0;
      const isLastSlideActive = currentSlide === slides.length - 1;

      if (isFirstSlideActive && offset === 1) {
        // إذا كانت الشريحة الأولى هي النشطة، ادفع الكرت الأيمن لليسار قليلاً
        let adjustmentValue: number;
        switch (screenType) {
          case "mobile":
            adjustmentValue = 45;
            break;
          case "tablet":
            adjustmentValue = 55;
            break;
          default:
            adjustmentValue = 70;
            break;
        }
        centeringAdjustment = -adjustmentValue;
      } else if (isLastSlideActive && offset === -1) {
        // إذا كانت الأخيرة هي النشطة، ادفع الكرت الأيسر لليمين قليلاً
        let adjustmentValue: number;
        switch (screenType) {
          case "mobile":
            adjustmentValue = 45;
            break;
          case "tablet":
            adjustmentValue = 55;
            break;
          default:
            adjustmentValue = 70;
            break;
        }
        centeringAdjustment = adjustmentValue;
      }
    }
    translateXValue += centeringAdjustment;

    return {
      transform: `translateX(${translateXValue}px) translateZ(${translateZValue}) rotateY(${rotateYValue}deg) scale(${scaleValue})`,
      zIndex: isActive ? slides.length + 2 : slides.length - Math.abs(offset),
      opacity: finalOpacity,
      transition: "transform 0.7s ease-out, opacity 0.5s ease-out",
    };
  };
  // =================================================================================
  // --- END: التعديلات الرئيسية هنا ---
  // =================================================================================

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-900 select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${slides[currentSlide].bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(1.1) translateZ(0)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row h-full">
        <div
          className={`flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 
                         lg:py-0 ${screenType === "mobile" ? "pb-28 sm:pb-32" : screenType === "tablet" ? "md:pb-24" : "pb-16"}`}
        >
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" />
              <span className="text-white text-xs sm:text-sm font-medium">
                {slides[currentSlide].location}
              </span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
              <span
                key={`title-${currentSlide}`}
                className="inline-block"
                style={{ animation: "slideInLeft 0.8s ease-out forwards" }}
              >
                {slides[currentSlide].title}
              </span>
            </h1>
            <p
              key={`desc-${currentSlide}`}
              className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-5 sm:mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0"
              style={{
                animation: "slideInLeft 0.8s ease-out 0.2s forwards both",
              }}
            >
              {slides[currentSlide].description}
            </p>
            <button
              className="inline-flex items-center gap-2 sm:gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-xs sm:text-sm md:text-base mx-auto lg:mx-0"
              style={{
                animation: "slideInLeft 0.8s ease-out 0.4s forwards both",
              }}
              onClick={() => window.open('tel:+201500800501', '_self')}
            >
              <span className="font-bold">Call Us</span>
            </button>
          </div>
        </div>

        <div
          ref={slideStripRef}
          className="flex-1 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 order-first lg:order-last relative z-[25]"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          style={{ cursor: "grab", touchAction: "pan-y" }}
        >
          {/* --- تعديل: إزالة الـ gap من هنا للتحكم الكامل عبر transform --- */}
          <div
            className="flex w-full justify-center items-center relative"
            style={{ perspective: "1200px", WebkitPerspective: "1200px" }} // زيادة الـ perspective لعمق أفضل
          >
            {slides.map((slide, index) => {
              const slideStyle = getSlideDynamicStyle(index);
              return (
                <div
                  key={slide.id}
                  // --- تعديل: استخدام absolute positioning للتحكم الدقيق في الموضع ---
                  className="absolute cursor-pointer transition-transform duration-700 ease-out flex-shrink-0"
                  style={slideStyle}
                  onClick={(e) => handleSlideCardClick(index, e)}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <div
                    className={`
                    w-44 h-60 sm:w-52 sm:h-72 md:w-60 md:h-80 lg:w-64 lg:h-96 xl:w-72 xl:h-[400px]
                    rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl
                    ${index === currentSlide ? "ring-2 sm:ring-4 ring-yellow-400 ring-opacity-60" : ""}
                    hover:shadow-3xl transition-all duration-300 
                  `}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent select-none pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 lg:p-5 text-white select-none pointer-events-none">
                        <div className="text-[10px] xs:text-xs sm:text-sm opacity-80 mb-0.5 sm:mb-1 md:mb-1.5">
                          {slide.country}
                        </div>
                        <h3 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-0.5 sm:mb-1">
                          {slide.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[10px] xs:text-xs sm:text-sm opacity-80">
                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                          {slide.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 flex items-center z-40 gap-2 sm:gap-3 md:gap-3.5 bottom-5 sm:bottom-6 md:bottom-7 lg:bottom-8`}
      >
        <button
          type="button"
          onClick={handlePrevClick}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 active:scale-90"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <div className="flex gap-1 sm:gap-1.5 md:gap-2">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={(e) => handleArrowOrDotClick(index, e)}
              className={`h-2 sm:h-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-yellow-400 w-5 sm:w-6 md:w-7" : "bg-white/40 hover:bg-white/60 w-2 sm:w-2.5 md:w-2.5"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleNextClick}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 active:scale-90"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
      <div
        className={`absolute text-white font-bold opacity-40 z-40 text-xl sm:text-2xl md:text-3xl bottom-5 sm:bottom-[1.6rem] md:bottom-[1.8rem] lg:bottom-[2.1rem] right-4 sm:right-6 md:right-8`}
      >
        {String(currentSlide + 1).padStart(2, "0")}
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .select-none {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .text-\\[10px\\] {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSlider;
