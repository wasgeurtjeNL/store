'use client';

import React from 'react';
import Image from 'next/image';
import logoIcon from '@/public/logo-icon.png';

const OurStory: React.FC = () => {
  return (
    <div
  className="bg-cover bg-center flex items-center md:min-h-[343px] justify-center py-12"
  style={{
    backgroundImage: 'url(/story-desktop.png)',
  }}
>
  <div className="max-w-5xl mx-auto px-6 flex items-center gap-10 text-white">
    {/* Heading Section */}
    <div className="mb-6">
      <p className="md:text-lg text-base font-medium uppercase">
        Our Story
      </p>
      <h2 className="md:text-[32px] text-[24px] font-bold mt-2">
        Born from Passion, Crafted for Luxury
      </h2>
      <p className="text-base mt-4 max-w-2xl mx-auto">
        We started Wasgeurtje.nl in 2020 with a simple mission—to transform
        laundry into a luxurious ritual while staying true to our love for
        sustainability. Frustrated by short-lived, chemical-heavy scents in
        traditional products, we set out to create eco-friendly,
        paraben-free laundry perfumes that deliver long-lasting,
        sophisticated fragrance with every wash.
      </p>
    </div>

    {/* Logo Icon */}
    <div>
      <Image
        src={logoIcon}
        alt="logo icon"
        className="w-auto h-[187px] hidden md:block"
      />
    </div>
  </div>
</div>

  );
};

export default OurStory;