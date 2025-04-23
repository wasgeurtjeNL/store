/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import img1 from '@/public/usp-1.png'
import img2 from '@/public/usp-2.png'
import img3 from '@/public/usp-3.png'
import img4 from '@/public/usp-4.png'

interface USP {
  text: string;
  icon: any;
  alt: string;
}

const usps: USP[] = [
  { text: "No Parabens", icon: img1, alt: "no parabens icon" },
  { text: "No Micro Plastics", icon: img2, alt: "no micro icon" },
  { text: "Biodegradable", icon: img3, alt: "bio icon" },
  { text: "100% Vegan", icon: img4, alt: "vegan icon" },
];

const USPs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    containerRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const preventDefaultScroll = (e: Event) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    // Prevent default scrolling behavior during drag
    window.addEventListener('touchmove', preventDefaultScroll, { passive: false });
    return () => {
      window.removeEventListener('touchmove', preventDefaultScroll);
    };
  }, [isDragging]);

  return (
    <section className="bg-[#8A5529] py-4">
      <div className="max-w-5xl mx-auto px-4">
        <div
          ref={containerRef}
          className="flex flex-row md:flex-row overflow-x-hidden scrollbar-none hover:cursor-grab active:cursor-grabbing md:cursor-auto justify-around items-center text-white text-sm font-medium gap-6 md:gap-4 whitespace-nowrap select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {usps.map((usp, index) => (
            <div key={index} className="flex items-center gap-2 flex-shrink-0">
              <Image src={usp.icon} alt={usp.alt} />
              <span>{usp.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPs;