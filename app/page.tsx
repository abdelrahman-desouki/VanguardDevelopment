"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import LineAnimation from "./components/lineanimat";
import CustomCursor from "./components/CustomCursor";
import InfoCard from "./components/InfoCard";
import StickyCardsSection from "./components/StickyCardsSection";
import AnimatedSlider from "./components/animatedslider";
import Footer from "./components/footer";

import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

export default function Home(): JSX.Element {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenisInstance(lenis);

    function raf(time: DOMHighResTimeStamp): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <main className="bg-[#fdfcf5]">
      <CustomCursor />
      <Navbar />
      <LineAnimation />

      {/* العنوان الرئيسي */}
      <h1 className="justify-text text-2xl md:text-3xl lg:text-4xl text-gray-900 font-semibold leading-tight max-w-6xl mx-auto px-4 mt-16 mb-16 bg-transparent md:pl-20 lg:pl-28">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cairo-based startup redefining
        luxury and sustainability in urban development by integrating nature
        with modern designs.
      </h1>

      <AnimatedSlider />
      <LineAnimation />

      {/* السكشن مع النص الثابت والكروت */}
      <StickyCardsSection />
      <LineAnimation />

      {/* Info Cards Section */}
      <div className="w-full flex flex-col items-center gap-12 md:gap-20 mt-12 px-4">
        <InfoCard
          imageSrc="/image1.jpg"
          title="Live in Harmony with Modern Luxury"
          description="Discover communities designed to elevate your lifestyle through innovative architecture and sustainable elegance."
          direction="right"
        />
        <InfoCard
          imageSrc="/image2.jpg"
          title="Where Urban Sophistication Meets Nature"
          description="We create vibrant spaces that balance comfort, design, and environmental responsibility."
          direction="left"
        />
        <InfoCard
          imageSrc="/image3.jpg"
          title="Luxury Meets Nature: Residential Spaces Redefined"
          description="We believe true luxury lies in harmony with nature. Our eco-conscious communities promote wellness and quality living."
          direction="right"
        />
      </div>

      {/* سكشن النص النهائي */}
      <div className="relative z-20 w-full bg-[#fdfcf5] py-12 md:py-16 mt-12 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800">
          Experience Urban Living in Harmony with Nature
        </h2>
        <p className="text-base leading-relaxed text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          Sleek, sustainable, and sophisticated — Vanguard Development
          reimagines luxury by blending innovative design with environmental
          responsibility. Our exclusive communities offer a seamless fusion of
          modern architecture and natural beauty, delivering an exceptional
          lifestyle in every detail.
        </p>
      </div>

      <Footer />
    </main>
  );
}
