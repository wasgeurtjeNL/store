"use client"
import React, { useState } from "react"
import perfumeBottle from "../../public/images/perfumeBottle.svg"
import plusIcon from "../../public/images/plus-lg.svg"
import Image from "next/image"
// import perfumeBottle from "@/public/images/perfumeBottle.jpg";

interface PerfumeProps {
  name: string
  notes: string[]
  price: number
}

const perfumes: PerfumeProps[] = [
  {
    name: "Flower Rain",
    notes: ["Iris", "Sandalwood", "Orange"],
    price: 15.95,
  },
  {
    name: "Flower Rain",
    notes: ["Iris", "Sandalwood", "Orange"],
    price: 15.95,
  },
  {
    name: "Flower Rain",
    notes: ["Iris", "Sandalwood", "Orange"],
    price: 15.95,
  },
  {
    name: "Flower Rain",
    notes: ["Iris", "Sandalwood", "Orange"],
    price: 15.95,
  },
]

type Tab = {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: "best-sellers", label: "Best Sellers" },
  { id: "premium", label: "Premium" },
  { id: "collections", label: "Collections and Sets" },
]

const PerfumeCard: React.FC<PerfumeProps> = ({ name, notes, price }) => (
  <div className="border border-[#D6AD61] rounded-md shadow-sm">
    <div className="relative w-full underline  overflow-hidden">
      <Image
        height={128}
        width={128}
        src={perfumeBottle}
        alt={name}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg mt-2 text-[#814E1E]">{name}</h3>
      <hr className="text-[#D6AD614D]" />
      <div className="mt-1">
        <p className="text-sm text-[#212529CC] italic">Perfume Profile</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {notes.map((note) => (
            <span
              key={note}
              className="bg-[#D6AD611A] text-[#814E1E] border border-[#D6AD614D] rounded-full px-2 py-1 text-xs"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between bg-gradient-product-card">
      <div className="px-4 py-2 flex items-center justify-between w-full">
        <span className="text-base text-[#212529]">£{price.toFixed(2)}</span>
        <button className="bg-[#FCCE4E] hover:bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <Image src={plusIcon} alt="plus icon" />
        </button>
      </div>
    </div>
  </div>
)

const PerfumeGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("best-sellers")

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-[24px] md:text-[32px] font-semibold text-center mb-5 font-garamond">
          Find Your Perfect Perfume
        </h2>
        <div className="mb-6 flex flex-nowrap justify-center w-full overflow-auto">
          <div className="flex justify-center w-full md:w-fit space-x-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-2 px-4 transition-colors duration-200 -mb-[1px] ${
                  activeTab === tab.id
                    ? "text-[#814E1E] font-semibold border-b-2 border-[#814E1E]"
                    : "text-[#212529] hover:text-[#814E1E]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {perfumes.map((perfume, index) => (
            <PerfumeCard key={index} {...perfume} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-gradient-to-r from-[#FCCE4E] to-[#D6AD61] text-black uppercase py-2 px-6 rounded text-sm md:text-base">
            Shop All Perfumes
          </button>
        </div>
      </div>
    </div>
  )
}

export default PerfumeGrid
