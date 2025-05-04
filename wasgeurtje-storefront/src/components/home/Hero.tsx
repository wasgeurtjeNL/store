/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import Image from "next/image"
import img1 from "../../public/images/icons/hero-icon-1.svg"
import img2 from "../../public/images/icons/hero-icon-2.svg"
import img3 from "../../public/images/icons/hero-icon-3.svg"
import stars from "../../public/images/star-rating.svg"
import curveImg from "../../public/images/curve.svg"
import heroLargeBgImage from "../../public/images/smellPerfume1.svg"
import heroSmallBgImage from "../../public/images/mobileDevices.svg"
import Link from "next/link"
interface IHeroBottomContent {
  title: string
  icon: any
}
const HeroBottomContents: IHeroBottomContent[] = [
  {
    title: "Safe For All Fabrics & Machines",
    icon: img1,
  },
  {
    title: "Formulated For Sensitive Skin",
    icon: img2,
  },
  {
    title: "Eco Friendly & Paraben Free",
    icon: img3,
  },
]

const Hero: React.FC = () => {
  return (
    <div>
      {/* Desktop View */}
      <div>
        <div className="relative mx-auto hidden md:block mb-32 w-full">
          <div
            className="heroBackground h-[681px]"
            style={{
              backgroundImage: `url(${heroLargeBgImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "top right",
              height: "681px",
            }}
          >
            <div
              className={`heroLeftBackground p-10  max-w-[679px] w-full h-full`}
              style={{
                background:
                  "linear-gradient(112.18deg, #d6ad61 44.47%, #fcce4e 116.93%)",
              }}
            >
              <div
                className="rounded-2xl bg-white px-3 inline-flex items-center"
                suppressHydrationWarning
              >
                <Image src={stars} alt="stars image" />{" "}
                <span className="pl-2">1400+ Reviews</span>
              </div>
              <h1 className="font-garamond font-semibold text-[56px] mt-10 max-w-[600px] w-full">
                Luxury Laundry Perfumes That Last Exceptionally Long
              </h1>
              <p className="mt-3 mb-5 text-2xl leading-[150%] max-w-[535px] w-full">
                Italian Inspired Fragrances Made With Premium <br /> Essential
                Oils
              </p>
              <Link
                href={`/categories/premium`}
                className="bg-black text-white py-2.5 px-4 md:px-6 lg:px-12 rounded mt-3"
              >
                Shop Premium Laundry
              </Link>
            </div>
          </div>
          {/* <BannerCurvedImage /> */}
          <div className="absolute -bottom-1 right-0 w-full">
            <Image src={curveImg} alt="curved image" />
          </div>
          <div className="bg-[#F3E6D0] w-full absolute -bottom-[120px] py-4 pb-5">
            <div className="flex items-center justify-around max-w-[1200px] mx-auto w-full">
              {HeroBottomContents.map((content, index) => (
                <div key={index}>
                  <div className="flex items-center flex-col gap-2">
                    <Image src={content.icon} alt={content.title} />
                    <h2 className="text-[#212529] text-lg">{content.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="h-20 bg-black mb-10">
            <Image
              src="/images/cards.jpg"
              alt="Brand Logos"
              width={1920}
              height={40}
            />
          </div> */}
        </div>
      </div>

      {/* Mobile View */}
      <div>
        <div className=" mx-auto block md:hidden">
          <div
            className={"heroBackground2"}
            style={{
              backgroundImage: `url(${heroSmallBgImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "700px !important",
            }}
          >
            <div className="md:p-12 p-8">
              <p className="flex mx-auto rounded-xl bg-white justify-center w-fit px-3">
                ⭐⭐️⭐️⭐️⭐️ <span className="pl-2">1400+ Reviews</span>
              </p>
              <h1 className="font-serif font-bold text-2xl mt-6 md:mt-10 text-center">
                Luxury Laundry Perfumes <br /> That Last Exceptionally Long
              </h1>
              <p className="mt-3 text-center">
                Italian Inspired Fragrances Made With <br /> Premium Essential
                Oils
              </p>
              <button className="bg-black flex mx-auto text-white py-2 px-6 md:px-2 rounded mt-96">
                Shop Premium Laundry
              </button>
            </div>
          </div>
          <div className="h-2 bg-[#D6AD614D]"></div>
          <div className="bg-[#F3E6D0] w-full p-4">
            <div className="flex items-center justify-around gap-2 w-full">
              {HeroBottomContents.map((content, index) => (
                <div key={index}>
                  <div className="flex items-center flex-col gap-2">
                    <Image
                      className="h-6 w-auto"
                      src={content.icon}
                      alt={content.title}
                    />
                    <h2 className="text-[#212529] text-xs text-center">
                      {content.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
