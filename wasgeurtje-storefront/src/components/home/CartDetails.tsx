import React from "react"
// import { BestSellerTrialPackImage } from "../images/Sustainably";
import bestSellerImg from "../../public/images/bestSeller.svg"
import Image from "next/image"

const CartDetails = () => {
  const productName = "Laundry Perfume Trial Pack"
  const description =
    "Not sure which fragrance to choose? Find your favorite with our best seller trial pack."
  const includes = "Includes: x5 10ml bottles"
  const perfumes = [
    "Morning Vapor",
    "Flower Rain",
    "Blossom Drip",
    "Sundance",
    "Full Moon",
  ]

  return (
    <div className="container mx-auto md:h-[520px] flex items-center justify-center">
      <div className="p-6 flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={bestSellerImg}
              alt="best seller image"
              className="w-full"
            />
            <div className="absolute top-4 left-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
              Best Seller
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white">
          <h1 className="text-2xl font-bold font-serif text-gray-800">
            {productName}
          </h1>
          <p className="text-gray-600">{description}</p>

          <p className="text-gray-700 font-semibold">{includes}</p>
          <hr className="bg-[#D6AD61] border border-[#D6AD61]" />
          <div>
            <p className="text-gray-700 font-semibold">Perfumes:</p>
            <p className="text-gray-600">{perfumes.join(" • ")}</p>
            <p className="text-gray-500 text-sm mt-2">
              &quot;*2-4 washes per bottle, depending on your preferred scent
              strength.&quot;
            </p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button className="bg-gradient-to-r from-[#FCCE4E] to-[#D6AD61] text-black uppercase py-2 px-6 rounded text-sm md:text-base flex items-center gap-2">
              ADD TO CART
              <span>£15</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDetails
