"use client";
import React from "react";
import img1 from "@/public/pr-category-1.png";
import img2 from "@/public/pr-category-2.png";
import img3 from "@/public/pr-category-3.png";
import img4 from "@/public/pr-category-4.png";
import Image, { StaticImageData } from "next/image";

interface Category {
  name: string;
  image: string | StaticImageData;
}

const categories: Category[] = [
  {
    name: "Best Sellers",
    image: img1,
  },
  {
    name: "Premium Perfumes",
    image: img2,
  },
  {
    name: "Trial Pack",
    image: img3,
  },
  {
    name: "Gift Sets",
    image: img4,
  },
];

const ShopCategories: React.FC = () => {
  return (
    <section className="py-8 px-4 md:px-0 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-start md:items-center"
          >
            {/* Category Image */}
            <Image
              src={category.image}
              alt={category.name}
              className="w-full h-auto rounded-lg mb-2 order-2 md:order-1"
            />
            {/* Category Label */}
            <p className="text-lg md:text-[24px] font-semibold text-start md:text-center text-[#212529] order-1 md:order-2">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-[#FCCE4E] to-[#D6AD61] text-black uppercase py-2 px-6 rounded text-sm md:text-base">
          Shop All Perfumes
        </button>
      </div>
    </section>
  );
};

export default ShopCategories;
