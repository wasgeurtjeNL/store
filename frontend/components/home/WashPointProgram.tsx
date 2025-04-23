"use client";

import React from "react";

// Define the type for each point
interface Point {
  title: string;
  description: string;
}

const WashPointProgram: React.FC = () => {
  // Define the points
  const points: Point[] = [
    {
      title: "Sign Up and Start Earning:",
      description: "No extra steps required",
    },
    {
      title: "Collect Points with Every Purchase:",
      description: "Get rewarded for every euro spend",
    },
    {
      title: "Redeem for Exclusive Discounts:",
      description:
        "Use your points at checkout for free bottles and exclusive savings",
    },
    {
      title: "Unlock Exclusive Discounts:",
      description:
        "Unlock special rewards and surprises as you climb our loyalty tiers",
    },
  ];

  return (
    <section className="bg-[#FCCE4E4D] py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#814E1E]">
            Reward Your Love of Laundry
          </h2>
          <p className="text-lg md:text-xl text-[#814E1E] mt-2">
            Wash Point Program
          </p>
        </div>

        {/* Points Container */}
        <div className="bg-[#F7E8D5] p-6 rounded-lg">
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
              {/* Bullet */}
              <div className="w-5 h-5 rounded-full bg-[#D6AD61] flex-shrink-0 mt-1"></div>
              {/* Text */}
              <div>
                <p className="text-base md:text-lg font-semibold text-[#212529]">
                  {point.title}
                </p>
                <p className="text-sm md:text-base text-gray-500">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WashPointProgram;
