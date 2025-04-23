'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';
import img1 from '@/public/sustain-1.png'
import img2 from '@/public/sustain-2.png'
import img3 from '@/public/sustain-3.png'
import img4 from '@/public/sustain-4.png'

// Define the type for each sustainability item
interface SustainabilityItem {
  text: string;
  icon: string | StaticImageData; 
}

const Sustainability: React.FC = () => {
  // Define the sustainability items
  const items: SustainabilityItem[] = [
    {
      text: 'No Parabens Or Microplastics',
      icon: img1,
    },
    {
      text: 'Biodegradable Ingredients',
      icon: img2,
    },
    {
      text: '100% Vegan & Cruelty Free',
      icon: img3,
    },
    {
      text: 'Bottles Made From Recycled Plastic',
      icon: img4,
    },
  ];

  return (
    <section className="bg-[#D6AD614D] py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="md:text-[40px] text-[28px] font-semibold text-[#814E1E]">
            Sustainably Scented, Consciously Crafted
          </h2>
          <p className="text-base md:text-lg text-[#212529] mt-2">
            Safe for your skin, your clothes, and the planet
          </p>
        </div>

        {/* Items Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Icon */}
              <div className="md:w-[72px] md:h-[72px] w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center p-2 mb-4">
                <Image src={item.icon} alt={item.text} />
              </div>
              {/* Text */}
              <p className="md:text-lg text-base text-[#212529] text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sustainability;