'use client';

import React from 'react';
import img1 from '@/public/work-1.png';
import img2 from '@/public/work-2.png';
import img3 from '@/public/work-3.png';
import img4 from '@/public/work-icon-1.png';
import img5 from '@/public/work-icon-2.png';
import img6 from '@/public/work-icon-3.png';
import Image, { StaticImageData } from 'next/image';
import arrowIcon from '@/public/arrow.png';

// Define the type for each step
interface Step {
  title: string;
  description: string;
  image: string | StaticImageData;
  iconText: string;
  icon: string | StaticImageData;
}

const HowWorks: React.FC = () => {
  const steps: Step[] = [
    {
      title: '1. Add a Splash of Elegance',
      description:
        'Measure a small cap-full of Wasgeurje’s concentrated laundry perfume and add it to your machine’s fabric softener compartment.',
      image: img1,
      iconText: 'Safe for All Fabrics',
      icon: img4,
    },
    {
      title: '2. Start Your Spin Cycle',
      description:
        'Compatible with all machines and fabrics, just start your wash as usual knowing our eco-friendly formula is gentle on fabrics and tough on odors.',
      image: img2,
      iconText: 'Works with Any Machine',
      icon: img5,
    },
    {
      title: '3. Experience Lasting Luxury',
      description:
        'Unfold fresh, fragrant laundry with a long-lasting Italian-inspired scent that elevates your everyday.',
      image: img3,
      iconText: 'Formulated for Sensitive Skin',
      icon: img6,
    },
  ];

  return (
    <section className="bg-[#D6AD611A] py-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-4 md:mb-8 text-[#212529]">
          <h2 className="text-[24px] md:text-[32px] font-semibold">How It Works</h2>
          <p className="text-base md:text-lg mt-2">Effortless Luxury for Your Laundry</p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col items-center gap-6 px-4 md:px-0 w-full">
          {/* Steps Row (Image and Content Together) */}
          <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 md:gap-10 w-full order-2 md:order-1">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step Section (Image and Content) */}
                <div className="flex flex-row md:flex-col gap-2 items-center">
                  {/* Image */}
                  <Image
                    src={step.image}
                    alt={step.title}
                    className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-lg md:mb-6"
                  />
                  {/* Title */}
                  <div className='flex flex-col text-start md:text-center'>
                  <h3 className="md:text-lg text-base font-bold text-[#814E1E] mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  {/* Description */}
                  <p className="md:text-base text-sm text-black md:mb-4">
                    {step.description}
                  </p>
                  </div>
                </div>
                {/* Arrow (not shown after the last step) */}
                {index < steps.length - 1 && (
                  <Image
                    src={arrowIcon}
                    alt="arrow icon"
                    className="w-auto h-4 -mt-[120px] hidden md:block"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Icons Section with White Background and Dividers */}
          <div className="bg-transparent md:bg-white py-3 w-full flex justify-between items-center rounded-lg md:gap-8 gap-4 order-1 md:order-2">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center justify-center text-center w-full gap-2">
                  <Image
                    src={step.icon}
                    alt={step.iconText}
                    className="w-auto md:h-10 h-6"
                  />
                  <span className="md:text-base text-xs text-[#212529]">
                    {step.iconText}
                  </span>
                </div>
                {/* Divider (not shown after the last step) */}
                {index < steps.length - 1 && (
                  <div className="border-l border-[#D6AD614D] h-10"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;