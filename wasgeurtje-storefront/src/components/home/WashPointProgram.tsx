"use client"

import React from "react"
import rewardImg from "../../public/images/reward-icon.svg"
import rewardCheck from "../../public/images/reward-check.svg"
import Image from "next/image"

// Define the type for each point
interface Point {
  title: string
  description: string
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
  ]

  return (
    <section className="bg-[#FCCE4E4D] py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="flex items-start md:items-center justify-center text-start md:text-center relative flex-col gap-3 mb-8">
          <Image
            className="hidden md:block"
            src={rewardImg}
            alt="reward icon"
          />
          <Image
            className="md:hidden block absolute right-4"
            src={rewardImg}
            alt="reward icon"
          />
          <h2 className="text-3xl md:text-4xl w-[170px] md:w-full font-bold text-[#814E1E] font-garamond">
            Reward Your Love of Laundry
          </h2>
          <p className="text-lg text-[#212529]">Wash Point Program</p>
        </div>

        {/* Points Container */}
        <div className="py-2 rounded-lg">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-[#D6AD614D] px-5 py-4 rounded-sm flex items-center md:items-start gap-4 mb-2 last:mb-0"
            >
              {/* Bullet */}
              <div className="w-5 h-5 rounded-full bg-[#D6AD61] flex-shrink-0 mt-1 flex items-center justify-center">
                <Image src={rewardCheck} alt="reward check icon" />
              </div>
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
  )
}

export default WashPointProgram
